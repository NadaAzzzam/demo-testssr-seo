import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoConfig } from '../models/seo.models';

/**
 * Central SEO manager for the demo.
 *
 * **SEO (Search Engine Optimization)** — techniques that help search engines
 * understand and rank your pages: unique titles, meta descriptions, robots rules,
 * canonical URLs, Open Graph / Twitter tags, and JSON-LD structured data.
 *
 * On SSR, Meta and Title updates run on the server too, so crawlers receive
 * complete `<head>` content in the initial HTML response.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  private baseUrl = 'https://demo.local/angular-ssr-seo';
  private defaultImage = '/images/og-default.svg';
  private siteName = 'Angular SSR & SEO Demo';
  private twitterHandle = '@angular';

  setSiteDefaults(config: {
    baseUrl: string;
    defaultImage: string;
    siteName: string;
    twitterHandle: string;
  }): void {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.defaultImage = config.defaultImage;
    this.siteName = config.siteName;
    this.twitterHandle = config.twitterHandle;
  }

  /**
   * Applies full SEO package: title, description, robots, canonical, OG, Twitter, JSON-LD.
   */
  apply(config: SeoConfig): void {
    if (config.skipSeo) {
      return;
    }

    const canonicalUrl = this.absoluteUrl(config.canonicalPath);
    const imageUrl = this.absoluteUrl(config.image ?? this.defaultImage);
    const pageTitle = `${config.title} | ${this.siteName}`;

    // Dynamic page title — shown in browser tab and search results
    this.title.setTitle(pageTitle);

    // Meta description — often used as the snippet in Google results
    this.updateMetaTag('name', 'description', config.description);

    // Robots — page-level crawling/indexing hint. Keep staging/private pages noindex.
    this.updateMetaTag('name', 'robots', config.robots ?? 'index, follow, max-image-preview:large');

    /**
     * Canonical URL tells search engines the preferred URL for this content.
     * Prevents duplicate-content issues when the same page is reachable via
     * multiple paths or query strings.
     */
    this.setCanonical(canonicalUrl);

    // Open Graph — how the page appears when shared on Facebook, LinkedIn, Slack, etc.
    this.updateMetaTag('property', 'og:title', config.title);
    this.updateMetaTag('property', 'og:description', config.description);
    this.updateMetaTag('property', 'og:image', imageUrl);
    this.updateMetaTag('property', 'og:url', canonicalUrl);
    this.updateMetaTag('property', 'og:type', config.type ?? 'website');
    this.updateMetaTag('property', 'og:site_name', this.siteName);

    // Twitter Card — X/Twitter link previews
    this.updateMetaTag('name', 'twitter:card', 'summary_large_image');
    this.updateMetaTag('name', 'twitter:title', config.title);
    this.updateMetaTag('name', 'twitter:description', config.description);
    this.updateMetaTag('name', 'twitter:image', imageUrl);
    if (this.twitterHandle) {
      this.updateMetaTag('name', 'twitter:site', this.twitterHandle);
    }

    if (config.structuredData) {
      this.setJsonLd(config.structuredData);
    } else {
      this.removeJsonLd();
    }
  }

  /** Resets to generic / unoptimized head (for seo-comparison "without SEO" demo). */
  applyUnoptimized(): void {
    this.title.setTitle('Angular App');
    this.removeCanonical();
    this.removeJsonLd();

    ['description', 'robots', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:site'].forEach((name) =>
      this.meta.removeTag(`name="${name}"`)
    );

    ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:site_name'].forEach((prop) =>
      this.meta.removeTag(`property="${prop}"`)
    );
  }

  buildOrganizationSchema(org: {
    name: string;
    url: string;
    logo: string;
    description: string;
  }): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: org.name,
      url: this.absoluteUrl('/'),
      logo: this.absoluteUrl(org.logo),
      description: org.description,
    };
  }

  buildArticleSchema(article: {
    title: string;
    description: string;
    image: string;
    author: string;
    publishedAt: string;
    url: string;
  }): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: this.absoluteUrl(article.image),
      author: { '@type': 'Person', name: article.author },
      datePublished: article.publishedAt,
      mainEntityOfPage: { '@type': 'WebPage', '@id': article.url },
    };
  }

  buildProductSchema(product: {
    name: string;
    description: string;
    image: string;
    sku: string;
    brand: string;
    price: number;
    currency: string;
    inStock: boolean;
    rating: number;
    reviewCount: number;
    url: string;
  }): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: this.absoluteUrl(product.image),
      sku: product.sku,
      brand: { '@type': 'Brand', name: product.brand },
      offers: {
        '@type': 'Offer',
        url: product.url,
        priceCurrency: product.currency,
        price: product.price,
        availability: product.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    };
  }

  absoluteUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalized}`;
  }

  private updateMetaTag(attr: 'name' | 'property', selector: string, content: string): void {
    const tag = attr === 'name' ? `name="${selector}"` : `property="${selector}"`;
    if (this.meta.getTag(tag)) {
      this.meta.updateTag({ [attr]: selector, content });
    } else {
      this.meta.addTag({ [attr]: selector, content });
    }
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private removeCanonical(): void {
    this.document.head.querySelector('link[rel="canonical"]')?.remove();
  }

  /**
   * JSON-LD structured data — machine-readable hints for Google rich results.
   * Validators: https://search.google.com/test/rich-results
   */
  private setJsonLd(data: Record<string, unknown>): void {
    this.removeJsonLd();
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'app-json-ld';
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  private removeJsonLd(): void {
    this.document.getElementById('app-json-ld')?.remove();
  }
}
