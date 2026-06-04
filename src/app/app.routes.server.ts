import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Server routing: dynamic product/blog slugs use SSR on demand.
 * Static paths can be prerendered at build time.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },
  { path: 'seo-comparison', renderMode: RenderMode.Prerender },
  { path: 'google-preview', renderMode: RenderMode.Prerender },
  { path: 'recipes', renderMode: RenderMode.Prerender },
  { path: 'transfer-state-demo', renderMode: RenderMode.Prerender },
  { path: 'products/**', renderMode: RenderMode.Server },
  { path: 'blog/**', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];
