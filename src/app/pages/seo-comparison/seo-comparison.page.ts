import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

/**
 * Side-by-side teaching page: unoptimized vs optimized `<head>`.
 * Toggle modes and inspect Elements → head in DevTools.
 */
@Component({
  selector: 'app-seo-comparison-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './seo-comparison.page.html',
  styleUrl: './seo-comparison.page.scss',
})
export class SeoComparisonPage implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);

  readonly mode = signal<'bad' | 'good'>('bad');

  ngOnInit(): void {
    this.applyMode('bad');
  }

  ngOnDestroy(): void {
    this.applyMode('good');
  }

  setMode(next: 'bad' | 'good'): void {
    this.mode.set(next);
    this.applyMode(next);
  }

  private applyMode(mode: 'bad' | 'good'): void {
    if (mode === 'bad') {
      this.seo.applyUnoptimized();
      return;
    }
    this.seo.apply({
      title: 'SEO Comparison — Optimized Example',
      description:
        'This page demonstrates proper title, meta description, robots, canonical URL, Open Graph, Twitter Cards, and JSON-LD.',
      canonicalPath: '/seo-comparison',
      image: '/images/og-default.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'SEO Comparison',
        description: 'Educational comparison of SEO patterns in Angular',
      },
    });
  }
}
