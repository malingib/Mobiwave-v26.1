import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml')
const SITE_URL = 'https://mobiwave.co.ke'

function fileForRoute(route) {
  if (route === '/') return path.join(distDir, 'index.html')
  const clean = route.replace(/\/+$/, '')
  return path.join(distDir, `${clean}.html`)
}

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? ''
}

async function routesFromSitemap() {
  const xml = await readFile(sitemapPath, 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .filter((loc) => loc.startsWith(SITE_URL))
    .map((loc) => new URL(loc).pathname || '/')
}

async function main() {
  const routes = [...new Set(await routesFromSitemap())]
  const failures = []

  for (const route of routes) {
    const file = fileForRoute(route)
    let html
    try {
      html = await readFile(file, 'utf8')
    } catch {
      failures.push(`${route}: missing prerendered HTML (${path.relative(rootDir, file)})`)
      continue
    }

    const title = firstMatch(html, /<title>([^<]+)<\/title>/i)
    const description = firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    const canonical = firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    const h1Count = (html.match(/<h1\b/gi) ?? []).length
    const robots = firstMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)

    if (!title) failures.push(`${route}: missing title`)
    if (!description) failures.push(`${route}: missing meta description`)
    if (canonical !== `${SITE_URL}${route === '/' ? '/' : route}`) {
      failures.push(`${route}: canonical is ${canonical || 'missing'}`)
    }
    if (h1Count !== 1) failures.push(`${route}: expected exactly one H1, found ${h1Count}`)
    if (!robots) failures.push(`${route}: missing robots directive`)
    if (!html.includes('id="mw-seo-schema"')) failures.push(`${route}: missing SEO JSON-LD`)
  }

  if (failures.length) {
    console.error(`SEO validation failed with ${failures.length} issue(s):`)
    failures.forEach((failure) => console.error(`  - ${failure}`))
    process.exit(1)
  }

  console.log(`SEO validation passed for ${routes.length} sitemap route(s).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
