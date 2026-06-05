import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, shareReplay } from 'rxjs';
import {
  Article,
  ArticleSummary,
  ArticlesApiResponse,
  Product,
  ProductSummary,
  ProductsApiResponse,
  SiteConfig,
  Testimonial,
} from '../models/content.models';

/**
 * Simulates REST APIs by loading static JSON from `/assets/data/*.json`.
 *
 * `delay(300)` mimics network latency so you can compare SSR timing and
 * TransferState behavior in DevTools.
 */
@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  private readonly siteConfig$ = this.http
    .get<SiteConfig>('/assets/data/site.json')
    .pipe(shareReplay(1));

  private readonly articlesBundle$ = this.http
    .get<ArticlesApiResponse>('/assets/data/articles.json')
    .pipe(delay(300), shareReplay(1));

  private readonly productsBundle$ = this.http
    .get<ProductsApiResponse>('/assets/data/products.json')
    .pipe(delay(300), shareReplay(1));

  /** Simulated GET /api/site */
  getSiteConfig(): Observable<SiteConfig> {
    return this.siteConfig$;
  }

  /** Simulated GET /api/articles */
  getArticlesBundle(): Observable<ArticlesApiResponse> {
    return this.articlesBundle$;
  }

  getFeaturedArticles(): Observable<ArticleSummary[]> {
    return this.getArticlesBundle().pipe(map((r) => r.featured));
  }

  getArticleBySlug(slug: string): Observable<Article | undefined> {
    return this.getArticlesBundle().pipe(
      map((r) => r.articles.find((a) => a.slug === slug))
    );
  }

  /** Simulated GET /api/products */
  getProductsBundle(): Observable<ProductsApiResponse> {
    return this.productsBundle$;
  }

  getFeaturedProducts(): Observable<ProductSummary[]> {
    return this.getProductsBundle().pipe(map((r) => r.featured));
  }

  getAllProducts(): Observable<ProductSummary[]> {
    return this.getProductsBundle().pipe(map((r) => r.products));
  }

  getProductBySlug(slug: string): Observable<Product | undefined> {
    return this.getProductsBundle().pipe(
      map((r) => r.products.find((p) => p.slug === slug))
    );
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.getProductsBundle().pipe(map((r) => r.testimonials));
  }

  getRelatedProducts(productId: string): Observable<ProductSummary[]> {
    return this.getProductsBundle().pipe(
      map((bundle) => {
        const ids = bundle.relatedProductIds[productId] ?? [];
        return bundle.products.filter((p) => ids.includes(p.id));
      })
    );
  }
}
