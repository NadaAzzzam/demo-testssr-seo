import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
export class RecipesPage implements OnInit, AfterViewInit {
  private readonly seo = inject(SeoService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.seo.apply({
      title: 'Code Recipes — Reusable SSR & SEO Snippets',
      description:
        'Copy-paste Angular recipes for SSR, hydration, TransferState, and SEO meta tags, canonical URLs, Open Graph and JSON-LD.',
      canonicalPath: '/recipes',
      image: '/images/og-default.jpg',
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const scrollIfPresent = (fragment: string | null): void => {
      if (!fragment) {
        return;
      }
      requestAnimationFrame(() => this.scrollToElement(fragment));
    };

    scrollIfPresent(this.route.snapshot.fragment);

    this.route.fragment
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(scrollIfPresent);
  }

  /** In-page TOC: Angular does not scroll same-route #fragments reliably. */
  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.scrollToElement(sectionId);
    void this.router.navigate([], {
      fragment: sectionId,
      replaceUrl: true,
      queryParamsHandling: 'preserve',
    });
  }

  private scrollToElement(sectionId: string): void {
    this.document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
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
    // provideClientHydration() also enables HttpClient transfer cache by default.
    provideClientHydration(withEventReplay()),

    // withFetch() lets HttpClient run during SSR (Node fetch).
    provideHttpClient(withFetch()),
  ],
};`;

  readonly httpTransferCache = `// Angular hydration includes HttpClient transfer cache by default.
// Server: cache matching HttpClient GET/HEAD responses.
// Browser: reuse them during initial hydration instead of requesting again.

import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

provideClientHydration(
  withHttpTransferCacheOptions({
    // Exclude user-specific or frequently-changing endpoints.
    filter: (req) => !req.url.includes('/api/profile'),
  })
);

// Per request: opt out when a response must not be serialized into HTML.
this.http.get('/api/live-stock', { transferCache: false });`;

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

  // 3. Robots — index public pages; noindex private/staging pages
  this.meta.updateTag({
    name: 'robots',
    content: config.robots ?? 'index, follow, max-image-preview:large',
  });

  // 4. Canonical — the one true URL for this content (avoids duplicates)
  this.setCanonical(canonicalUrl);

  // 5. Open Graph — link previews on LinkedIn, Slack, Facebook
  this.meta.updateTag({ property: 'og:title', content: config.title });
  this.meta.updateTag({ property: 'og:description', content: config.description });
  this.meta.updateTag({ property: 'og:image', content: imageUrl });
  this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
  this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });

  // 6. Twitter Card — X/Twitter previews
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

  readonly transferState = `// Manual TransferState is useful for non-HttpClient data, custom caches,
// or demos where you opt out of Angular's automatic HttpClient transfer cache.
// Avoid the SSR "double fetch": cache the server response, reuse it on the client.
const PRODUCTS_KEY = makeStateKey<Product[]>('products');

getProducts(): Observable<Product[]> {
  const cached = this.transferState.get(PRODUCTS_KEY, null);
  if (cached) {
    return of(cached); // browser: read synchronously, no second HTTP call
  }
  return this.http.get<Product[]>('/api/products', { transferCache: false }).pipe(
    tap((data) => {
      if (isPlatformServer(this.platformId)) {
        this.transferState.set(PRODUCTS_KEY, data); // server: stash for the browser
      }
    })
  );
}`;

  readonly missedChecks = `SSR/SEO checklist before shipping a real Angular route:

1. View Page Source, not only Elements. The real title, text, and JSON-LD must be in raw HTML.
2. Each indexable route needs one unique title, description, canonical URL, and robots rule.
3. Use noindex on staging/private pages. Do not block those pages in robots.txt if you expect noindex to be seen.
4. Use absolute PNG/JPG social images, ideally around 1200x630. Do not rely on SVG for og:image.
5. Keep one stable, lowercase, hyphenated URL per page. Redirect old slugs with 301s.
6. Add a sitemap.xml for real deployments and keep canonical URLs in it consistent.
7. Validate structured data with Google's Rich Results Test and Schema.org Validator.
8. Check HttpClient transfer cache: default is automatic; opt out for private or highly dynamic data.`;
}
