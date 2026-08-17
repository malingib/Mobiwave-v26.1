import { spawn } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml')
// Use a per-run port so a stale preview process from an interrupted build
// cannot serve old HTML with asset filenames from a previous build.
const PORT = 4174 + (process.pid % 1000)
const BASE_URL = `http://localhost:${PORT}`
const SITE_URL = 'https://mobiwave.co.ke'

const BLOCKED_HOSTS = [
  'googletagmanager.com',
  'google-analytics.com',
  'mobiwaveai.co.ke',
  'sentry.io',
]

async function routesFromSitemap() {
  const xml = await readFile(sitemapPath, 'utf8')
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const routes = locs
    .map((loc) => loc.replace(SITE_URL, '') || '/')
    .filter((r) => r.startsWith('/'))
  if (!routes.includes('/')) routes.unshift('/')
  return [...new Set(routes)]
}

function fileForRoute(route) {
  if (route === '/') return path.join(distDir, 'index.html')
  const clean = route.replace(/\/+$/, '')
  return path.join(distDir, `${clean}.html`)
}

function waitForServer() {
  const tryOnce = () => fetch(`${BASE_URL}/`).then((r) => r.ok).catch(() => false)
  return new Promise((resolve, reject) => {
    const started = Date.now()
    const check = async () => {
      if (await tryOnce()) return resolve()
      if (Date.now() - started > 60000) return reject(new Error('vite preview did not start in time'))
      setTimeout(check, 250)
    }
    check()
  })
}

async function scrollThroughPage(page) {
  await page.evaluate(async () => {
    const height = document.body.scrollHeight
    for (let y = 0; y < height; y += Math.max(300, window.innerHeight / 2)) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
    window.scrollTo(0, 0)
  })
  await new Promise((r) => setTimeout(r, 500))
}

async function main() {
  const routes = await routesFromSitemap()
  console.log(`Prerendering ${routes.length} routes: ${routes.join(', ')}`)

  const previewCommand = process.execPath
  const previewScript = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js')
  const preview = spawn(
    previewCommand,
    [previewScript, 'preview', '--port', String(PORT), '--strictPort'],
    { cwd: rootDir, stdio: 'ignore', shell: false },
  )

  const failures = []
  let browser
  try {
    await waitForServer()
    browser = await chromium.launch()
    const context = await browser.newContext({
      userAgent: 'MobiWavePrerender/1.0 (+https://mobiwave.co.ke)',
    })

    for (const route of routes) {
      const page = await context.newPage()
      await page.route('**/*', (routeCall) => {
        const url = routeCall.request().url()
        if (BLOCKED_HOSTS.some((h) => url.includes(h))) return routeCall.abort()
        return routeCall.continue()
      })

      const file = fileForRoute(route)
      await mkdir(path.dirname(file), { recursive: true })

      try {
        const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'load', timeout: 60000 })
        if (!response || !response.ok()) {
          throw new Error(`route returned HTTP ${response?.status() ?? 'no response'}`)
        }
        await page.waitForSelector('script#mw-seo-schema', { state: 'attached', timeout: 30000 })
        await page.waitForTimeout(800)
        await scrollThroughPage(page)

        const html = await page.content()
        await writeFile(file, html)
        const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1)
        console.log(`  ${route} -> ${file} (${kb} kB)`)
      } catch (err) {
        failures.push(`${route}: ${err.message}`)
        console.error(`  ! failed to prerender ${route}: ${err.message}`)
      } finally {
        await page.close()
      }
    }
  } finally {
    if (browser) await browser.close()
    preview.kill('SIGTERM')
  }

  if (failures.length) {
    throw new Error(`Prerender failed for ${failures.length} route(s):\n${failures.join('\n')}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
