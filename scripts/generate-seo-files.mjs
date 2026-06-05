/**
 * Writes sitemap.xml and robots.txt into the built browser output.
 * Uses SITE_BASE_URL when set (GitHub Pages), otherwise site.json defaultSeo.baseUrl.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dataDir = join(root, 'src', 'assets', 'data');
const browser = join(root, 'dist', 'demo-testssr-seo', 'browser');

if (!existsSync(browser)) {
  console.log('generate-seo-files: dist/browser missing — skipping.');
  process.exit(0);
}

const site = JSON.parse(readFileSync(join(dataDir, 'site.json'), 'utf-8'));
const products = JSON.parse(readFileSync(join(dataDir, 'products.json'), 'utf-8'));
const articles = JSON.parse(readFileSync(join(dataDir, 'articles.json'), 'utf-8'));

const baseUrl = (process.env.SITE_BASE_URL ?? site.defaultSeo.baseUrl).replace(/\/$/, '');

const staticPaths = [
  '/',
  '/products',
  '/seo-comparison',
  '/google-preview',
  '/recipes',
  '/transfer-state-demo',
];

function loc(path) {
  if (path === '/') {
    return `${baseUrl}/`;
  }
  return `${baseUrl}${path}`;
}

const urls = [
  ...staticPaths.map((path) => ({ path, changefreq: 'weekly', priority: path === '/' ? '1.0' : '0.8' })),
  ...products.products.map((p) => ({
    path: `/products/${p.slug}`,
    changefreq: 'weekly',
    priority: '0.9',
  })),
  ...articles.articles.map((a) => ({
    path: `/blog/${a.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${loc(path)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${loc('/sitemap.xml')}
`;

mkdirSync(browser, { recursive: true });
writeFileSync(join(browser, 'sitemap.xml'), sitemap);
writeFileSync(join(browser, 'robots.txt'), robots);

console.log(`generate-seo-files: wrote sitemap.xml (${urls.length} URLs) and robots.txt for ${baseUrl}`);
