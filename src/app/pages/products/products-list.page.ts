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

  ngOnInit(): void {
    this.seo.apply({
      title: 'Product Catalog',
      description:
        'Browse demo products with optimized titles, meta tags, and Product schema on detail pages.',
      canonicalPath: '/products',
      image: '/images/og-default.jpg',
      type: 'website',
    });
  }
}
