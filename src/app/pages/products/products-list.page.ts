import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';
import { SeoService } from '../../core/services/seo.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { UrlSeoNoteComponent } from '../../shared/components/url-seo-note/url-seo-note.component';

/** Product list — primary catalog route requested for the demo. */
@Component({
  selector: 'app-products-list-page',
  standalone: true,
  imports: [AsyncPipe, ProductCardComponent, UrlSeoNoteComponent],
  templateUrl: './products-list.page.html',
  styleUrl: './products-list.page.scss',
})
export class ProductsListPage implements OnInit {
  readonly products$ = inject(MockDataService).getAllProducts();
  private readonly seo = inject(SeoService);

  private readonly catalogTitle = 'Product Catalog';
  private readonly catalogDescription =
    'Browse demo products with optimized titles, meta tags, and Product schema on detail pages.';

  ngOnInit(): void {
    this.products$.subscribe((products) => {
      const listUrl = this.seo.absoluteUrl('/products');
      this.seo.apply({
        title: this.catalogTitle,
        description: this.catalogDescription,
        canonicalPath: '/products',
        image: '/images/og-default.jpg',
        type: 'website',
        structuredData: this.seo.buildItemListSchema({
          name: this.catalogTitle,
          description: this.catalogDescription,
          url: listUrl,
          items: products.map((product) => ({
            name: product.name,
            url: this.seo.absoluteUrl(`/products/${product.slug}`),
            image: product.image,
          })),
        }),
        structuredDataType: 'ItemList',
      });
    });
  }
}
