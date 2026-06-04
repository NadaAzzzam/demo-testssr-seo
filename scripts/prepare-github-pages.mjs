/**
 * Patches SEO/data JSON for GitHub Pages project-site URLs before a static build.
 * Set SITE_BASE_URL, e.g. https://yourname.github.io/demo-testssr-seo
 */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dataDir = join(root, 'src', 'assets', 'data');
const backupDir = join(root, '.github-pages-backup');
const siteBaseUrl = process.env.SITE_BASE_URL?.replace(/\/$/, '');

if (!siteBaseUrl) {
  console.log('prepare-github-pages: SITE_BASE_URL not set — skipping JSON patch.');
  process.exit(0);
}

if (existsSync(backupDir)) {
  rmSync(backupDir, { recursive: true, force: true });
}
mkdirSync(backupDir, { recursive: true });

for (const file of ['site.json', 'products.json', 'articles.json']) {
  cpSync(join(dataDir, file), join(backupDir, file));
}

const basePath = new URL(siteBaseUrl).pathname.replace(/\/$/, '') || '';

function prefixRootPath(value) {
  if (typeof value !== 'string' || !value.startsWith('/')) {
    return value;
  }
  return `${basePath}${value}`;
}

function patchPaths(value) {
  if (typeof value === 'string') {
    return prefixRootPath(value);
  }
  if (Array.isArray(value)) {
    return value.map(patchPaths);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, patchPaths(v)]));
  }
  return value;
}

const sitePath = join(dataDir, 'site.json');
const site = JSON.parse(readFileSync(sitePath, 'utf-8'));
site.organization.url = siteBaseUrl;
site.defaultSeo.baseUrl = siteBaseUrl;
site.defaultSeo.defaultImage = prefixRootPath(site.defaultSeo.defaultImage);
site.organization.logo = prefixRootPath(site.organization.logo);
writeFileSync(sitePath, `${JSON.stringify(site, null, 2)}\n`);

for (const file of ['products.json', 'articles.json']) {
  const filePath = join(dataDir, file);
  const json = JSON.parse(readFileSync(filePath, 'utf-8'));
  writeFileSync(filePath, `${JSON.stringify(patchPaths(json), null, 2)}\n`);
}

console.log(`prepare-github-pages: patched assets for ${siteBaseUrl}`);
