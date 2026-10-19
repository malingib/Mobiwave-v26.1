import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml')
const SITE_URL = 'https://mobiwave.co.ke'
// The generic shell title shared by every un-prerendered route. A sitemap page
// still carrying it was served index.html instead of its own prerendered HTML.
const SHELL_TITLE_PREFIX = 'Bulk SMS, USSD'

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? ''
}

async function readDistHtml(route) {
  const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  return readFile(path.join(distDir, filename), 'utf8')
}

async function sitemapRoutes() {
  const xml = await readFile(sitemapPath, 'utf8')
  const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].replace(SITE_URL, '') || '/')
    .filter((route) => route.startsWith('/'))
  if (!routes.includes('/')) routes.unshift('/')
  return [...new Set(routes)]
}

// Every prerendered page must reference assets that actually shipped. A stale
// or partly-rebuilt dist/ otherwise deploys HTML pointing at bundle hashes that
// no longer exist, and every page renders blank.
async function checkAssetIntegrity(files) {
  const failures = []
  const referenced = new Map()

  for (const file of files) {
    const html = await readFile(file, 'utf8')
    for (const match of html.matchAll(/["'](\/assets\/[A-Za-z0-9._-]+\.(?:js|css))["']/g)) {
      if (!referenced.has(match[1])) referenced.set(match[1], path.relative(rootDir, file))
    }
  }

  if (referenced.size === 0) failures.push('no bundled JavaScript or CSS is referenced by any page')

  for (const [asset, source] of referenced) {
    try {
      await stat(path.join(distDir, asset))
    } catch {
      failures.push(`${source} references ${asset}, which is not in dist/assets/`)
    }
  }

  return failures
}

async function checkPrerenderCoverage(routes) {
  const failures = []

  for (const route of routes) {
    let html
    try {
      html = await readDistHtml(route)
    } catch {
      failures.push(`${route}: missing prerendered HTML (would serve the index.html shell)`)
      continue
    }

    if (route === '/') continue

    const title = firstMatch(html, /<title>([^<]+)<\/title>/i)
    if (!title) failures.push(`${route}: <title> is missing`)
    else if (title.startsWith(SHELL_TITLE_PREFIX)) failures.push(`${route}: serves the generic shell title, not page-specific HTML`)
  }

  return failures
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
    if (route === '/privacy' && !html.includes('Information We Collect')) failures.push('/privacy: expected privacy content is missing')
    if (route === '/terms' && !html.includes('Service Usage')) failures.push('/terms: expected terms content is missing')
  }

  const routes = await sitemapRoutes()
  failures.push(...(await checkPrerenderCoverage(routes)))

  const htmlFiles = (await readdir(distDir, { recursive: true, withFileTypes: false }))
    .filter((entry) => typeof entry === 'string' && entry.endsWith('.html'))
    .map((entry) => path.join(distDir, entry))
  failures.push(...(await checkAssetIntegrity(htmlFiles)))

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
