import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { RenderMode, ServerRoute } from '@angular/ssr';

const dataDir = join(process.cwd(), 'src/assets/data');

async function readSlugs(file: string, arrayKey: string): Promise<Record<string, string>[]> {
  const json = JSON.parse(await readFile(join(dataDir, file), 'utf-8')) as Record<
    string,
    Array<{ slug: string }>
  >;
  return json[arrayKey].map(({ slug }) => ({ slug }));
}

/**
 * Server routing: static paths and JSON-driven slugs are prerendered at build time.
 * Product/blog detail pages use getPrerenderParams so GitHub Pages (static) can host the demo.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },
  {
    path: 'products/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return readSlugs('products.json', 'products');
    },
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return readSlugs('articles.json', 'articles');
    },
  },
  { path: 'seo-comparison', renderMode: RenderMode.Prerender },
  { path: 'google-preview', renderMode: RenderMode.Prerender },
  { path: 'recipes', renderMode: RenderMode.Prerender },
  { path: 'transfer-state-demo', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
