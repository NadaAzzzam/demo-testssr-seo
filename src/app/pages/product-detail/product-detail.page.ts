import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { MockDataService } from '../../core/services/mock-data.service';
import { SeoService } from '../../core/services/seo.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { UrlSeoNoteComponent } from '../../shared/components/url-seo-note/url-seo-note.component';
import { ProductCommentsComponent } from './product-comments.component';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, ProductCardComponent, UrlSeoNoteComponent, ProductCommentsComponent],
  templateUrl: './product-detail.page.html',
  styleUrl: './product-detail.page.scss',
})
export class ProductDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mockData = inject(MockDataService);
  private readonly seo = inject(SeoService);

  private readonly slug$ = this.route.paramMap.pipe(map((p) => p.get('slug') ?? ''));

  readonly product$ = this.slug$.pipe(
    switchMap((slug) => this.mockData.getProductBySlug(slug))
  );

  readonly related$ = this.slug$.pipe(
    switchMap((slug) =>
      this.mockData.getProductBySlug(slug).pipe(
        switchMap((p) => (p ? this.mockData.getRelatedProducts(p.id) : of([])))
      )
    )
  );

  ngOnInit(): void {
    this.product$.subscribe((product) => {
      if (!product) {
        return;
      }
      const url = this.seo.absoluteUrl(`/products/${product.slug}`);
      this.seo.apply({
        title: product.name,
        description: product.shortDescription,
        canonicalPath: `/products/${product.slug}`,
        image: product.image,
        type: 'product',
        structuredData: this.seo.buildProductSchema({
          name: product.name,
          description: product.description,
          image: product.image,
          sku: product.sku,
          brand: product.brand,
          price: product.price,
          currency: product.currency,
          inStock: product.inStock,
          rating: product.rating,
          reviewCount: product.reviewCount,
          url,
        }),
        structuredDataType: 'Product',
      });
    });
  }
}
