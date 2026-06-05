import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';

/**
 * Teaching page that answers two very common questions from the team:
 *
 *  1. "How does a page end up looking like THAT in Google?"
 *     → A live SERP (Search Engine Results Page) preview built purely from the
 *       same SEO fields (title, meta description, robots, canonical URL) the SeoService
 *       writes into the `<head>`. Toggle SSR on/off and With/Without SEO to see
 *       how the snippet changes — including the empty `<app-root>` case.
 *
 *  2. "What was that google-site-verification record we pasted into Namecheap?"
 *     → A guided, screenshot-style walkthrough of verifying a Domain property in
 *       Google Search Console via a DNS TXT record at your registrar.
 */
@Component({
  selector: 'app-google-preview-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './google-preview.page.html',
  styleUrl: './google-preview.page.scss',
})
export class GooglePreviewPage implements OnInit {
  private readonly seo = inject(SeoService);

  /** Editable demo inputs — these mirror the real SEO meta fields. */
  readonly domain = signal('zen-academy.com');
  readonly path = signal('/blog/understanding-ssr');
  readonly title = signal('Understanding Server-Side Rendering in Angular');
  readonly description = signal(
    'A practical guide to SSR, hydration and SEO meta tags — with real before/after examples for frontend teams.'
  );

  /** Demo toggles. */
  readonly seoEnabled = signal(true);
  readonly ssrEnabled = signal(true);

  /** The TXT verification record Google generates (matches the screenshot). */
  readonly verificationRecord = signal(
    'google-site-verification=tvuW-J34Bx0WNatkPg2nZNykOqFxesEMLTSjo'
  );
  readonly copied = signal(false);

  /** Google truncates titles (~60 chars) and descriptions (~155 chars). */
  readonly titleLimit = 60;
  readonly descLimit = 155;

  /** What Google actually shows as the clickable blue link. */
  readonly displayTitle = computed(() => {
    if (!this.seoEnabled()) {
      // No <title> set → Google falls back to the domain or guessed text.
      return this.domain();
    }
    return this.truncate(this.title(), this.titleLimit);
  });

  readonly displayDescription = computed(() => {
    if (!this.seoEnabled()) {
      // No meta description → Google scrapes random page text (often messy).
      return 'No description available. Google will guess a snippet from page text…';
    }
    return this.truncate(this.description(), this.descLimit);
  });

  /** Breadcrumb-style URL Google renders above the title. */
  readonly displayUrl = computed(() => {
    const clean = this.path().replace(/^\//, '').split('/').filter(Boolean);
    return [this.domain(), ...clean].join(' › ');
  });

  readonly faviconLetter = computed(() => this.domain().charAt(0).toUpperCase() || '?');

  readonly titleCount = computed(() => this.title().length);
  readonly descCount = computed(() => this.description().length);

  ngOnInit(): void {
    this.seo.apply({
      title: 'Google Search Preview & Domain Verification',
      description:
        'See how SEO meta tags turn into a Google search result, and how a domain is verified in Search Console via a DNS TXT record.',
      canonicalPath: '/google-preview',
      image: '/images/og-default.jpg',
    });
  }

  copyRecord(): void {
    const value = this.verificationRecord();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => undefined);
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1800);
  }

  private truncate(value: string, max: number): string {
    const trimmed = value.trim();
    return trimmed.length > max ? `${trimmed.slice(0, max).trimEnd()}…` : trimmed;
  }
}
