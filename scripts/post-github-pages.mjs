/**
 * GitHub Pages extras: SPA 404 fallback + .nojekyll + restore patched JSON
 */
import { copyFileSync, cpSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const browser = join(root, 'dist', 'demo-testssr-seo', 'browser');
const backupDir = join(root, '.github-pages-backup');
const dataDir = join(root, 'src', 'assets', 'data');
const indexHtml = join(browser, 'index.html');

copyFileSync(indexHtml, join(browser, '404.html'));
writeFileSync(join(browser, '.nojekyll'), '');

if (existsSync(backupDir)) {
  for (const file of ['site.json', 'products.json', 'articles.json']) {
    cpSync(join(backupDir, file), join(dataDir, file));
  }
  rmSync(backupDir, { recursive: true, force: true });
  console.log('post-github-pages: restored src/assets/data from backup');
}

console.log('post-github-pages: wrote 404.html and .nojekyll');
