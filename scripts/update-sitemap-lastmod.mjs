import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const sitemapPath = new URL('../public/sitemap.xml', import.meta.url);
let lastmod = '';
try {
  lastmod = execFileSync('git', ['log', '-1', '--format=%cs', '--', 'src', 'public', 'index.html'], { encoding: 'utf8' }).trim();
} catch (error) {
  // Some restricted CI runners surface EPERM after git has already produced
  // stdout. Preserve that valid result instead of failing the build.
  lastmod = error.stdout?.toString().trim() ?? '';
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
  throw new Error(`Could not determine a valid sitemap date: ${lastmod}`);
}

const sitemap = readFileSync(sitemapPath, 'utf8').replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${lastmod}</lastmod>`);
writeFileSync(sitemapPath, sitemap);

const seoPath = new URL('../src/components/SEOHead.tsx', import.meta.url);
const seo = readFileSync(seoPath, 'utf8').replace(/const LASTMOD = '\d{4}-\d{2}-\d{2}';/, `const LASTMOD = '${lastmod}';`);
writeFileSync(seoPath, seo);
console.log(`Updated sitemap lastmod to ${lastmod}`);
