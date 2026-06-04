import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

/**
 * "Copy-paste recipes" page — the SSR & SEO patterns from this project, presented
 * as self-contained, reusable snippets so teammates can lift them into other apps
 * without opening the source tree.
 *
 * Snippets are stored as plain strings (rendered via interpolation in the
 * CodeSnippetComponent) and mirror the real implementation files in this repo.
 */
@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [CodeSnippetComponent],
  templateUrl: './recipes.page.html',
  styleUrl: './recipes.page.scss',
})
export class RecipesPage implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.apply({
      title: 'Code Recipes — Reusable SSR & SEO Snippets',
      description:
        'Copy-paste Angular recipes for SSR, hydration, TransferState, and SEO meta tags, canonical URLs, Open Graph and JSON-LD.',
      canonicalPath: '/recipes',
      image: '/images/og-default.svg',
    });
  }

  // ---------- SSR recipes ----------

  readonly enableSsrCli = `# Add SSR + hydration to an existing Angular app
ng add @angular/ssr

# Dev server (CSR + SSR)            Production SSR build
npm start                           npm run build && npm run serve:ssr`;

  readonly clientConfig = `import { ApplicationConfig } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // Reuse server-rendered DOM instead of re-rendering on the client.
    // withEventReplay() replays clicks made before hydration finished.
    provideClientHydration(withEventReplay()),

    // withFetch() lets HttpClient run during SSR (Node fetch).
    provideHttpClient(withFetch()),
  ],
};`;

  readonly serverConfig = `import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

// Server = browser config + server-only providers
export const config = mergeApplicationConfig(appConfig, serverConfig);`;

  readonly serverRoutes = `import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static pages: render once at build time (fastest, cacheable)
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },

  // Dynamic slugs: render on each request on the server
  { path: 'products/**', renderMode: RenderMode.Server },
  { path: 'blog/**', renderMode: RenderMode.Server },

  { path: '**', renderMode: RenderMode.Server },
];`;

  // ---------- SEO recipes ----------

  readonly seoServiceApply = `// The reusable core: write title + meta into <head>.
// On SSR this runs on the server too, so crawlers get full <head> in the HTML.
apply(config: SeoConfig): void {
  const canonicalUrl = this.absoluteUrl(config.canonicalPath);
  const imageUrl = this.absoluteUrl(config.image ?? this.defaultImage);

  // 1. Title — browser tab + the blue link in Google
  this.title.setTitle(config.title + ' | ' + this.siteName);

  // 2. Description — the grey snippet under the link
  this.meta.updateTag({ name: 'description', content: config.description });

  // 3. Canonical — the one true URL for this content (avoids duplicates)
  this.setCanonical(canonicalUrl);

  // 4. Open Graph — link previews on LinkedIn, Slack, Facebook
  this.meta.updateTag({ property: 'og:title', content: config.title });
  this.meta.updateTag({ property: 'og:description', content: config.description });
  this.meta.updateTag({ property: 'og:image', content: imageUrl });
  this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
  this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });

  // 5. Twitter Card — X/Twitter previews
  this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  this.meta.updateTag({ name: 'twitter:title', content: config.title });
  this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
}`;

  readonly seoUsage = `// Call it once per route, in ngOnInit. That's the whole SEO contract for a page.
export class ProductDetailPage implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.apply({
      title: product.name,
      description: product.shortDescription,
      canonicalPath: '/products/' + product.slug,
      image: product.image,
      type: 'product',
    });
  }
}`;

  readonly canonical = `// Canonical tells Google "index THIS url", collapsing ?utm/?sort duplicates.
private setCanonical(url: string): void {
  const head = this.document.head;
  let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    head.appendChild(link);
  }
  link.setAttribute('href', url);
}`;

  readonly jsonLd = `// JSON-LD = machine-readable facts → rich results (stars, price, breadcrumbs).
// Test at https://search.google.com/test/rich-results
private setJsonLd(data: Record<string, unknown>): void {
  this.document.getElementById('app-json-ld')?.remove();
  const script = this.document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'app-json-ld';
  script.textContent = JSON.stringify(data);
  this.document.head.appendChild(script);
}

// Example payload for a product page:
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Zen Flow Runner',
  offers: { '@type': 'Offer', price: 129, priceCurrency: 'USD' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.8, reviewCount: 312 },
};`;

  readonly transferState = `// Avoid the SSR "double fetch": cache the server response, reuse it on the client.
const PRODUCTS_KEY = makeStateKey<Product[]>('products');

getProducts(): Observable<Product[]> {
  const cached = this.transferState.get(PRODUCTS_KEY, null);
  if (cached) {
    return of(cached); // browser: read synchronously, no second HTTP call
  }
  return this.http.get<Product[]>('/api/products').pipe(
    tap((data) => {
      if (isPlatformServer(this.platformId)) {
        this.transferState.set(PRODUCTS_KEY, data); // server: stash for the browser
      }
    })
  );
}`;
}
