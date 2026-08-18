import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const SITE_URL = 'https://mobiwave.co.ke'

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? ''
}

async function readDistHtml(route) {
  const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  return readFile(path.join(distDir, filename), 'utf8')
}

async function main() {
  const failures = []
  const homepage = await readDistHtml('/')
  const assetsDir = path.join(distDir, 'assets')
  const assetNames = await readdir(assetsDir)
  const initialBundle = assetNames.find((name) => /^index-[\w-]+\.js$/.test(name))

  if (!initialBundle) {
    failures.push('initial JavaScript bundle is missing')
  } else {
    const { size } = await stat(path.join(assetsDir, initialBundle))
    if (size > 550 * 1024) {
      failures.push(`initial JavaScript bundle is ${(size / 1024).toFixed(1)} kB (budget: 550 kB)`)
    }
  }

  if (homepage.includes('code-path=')) {
    failures.push('homepage contains development code-path attributes')
  }

  for (const route of ['/privacy', '/terms']) {
    let html
    try {
      html = await readDistHtml(route)
    } catch {
      failures.push(`${route}: missing prerendered HTML`)
      continue
    }

    const canonical = firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    const robots = firstMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)
    const title = firstMatch(html, /<title>([^<]+)<\/title>/i)

    if (canonical !== `${SITE_URL}${route}`) failures.push(`${route}: canonical is ${canonical || 'missing'}`)
    if (!robots.includes('noindex')) failures.push(`${route}: robots must include noindex`)
    if (!title || title.startsWith('Bulk SMS, USSD')) failures.push(`${route}: page-specific title is missing`)
  }

  if (failures.length) {
    console.error(`Production build validation failed with ${failures.length} issue(s):`)
    failures.forEach((failure) => console.error(`  - ${failure}`))
    process.exit(1)
  }

  console.log('Production build validation passed.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
