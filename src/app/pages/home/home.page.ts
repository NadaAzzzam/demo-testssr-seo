import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MockDataService } from '../../core/services/mock-data.service';
import { SeoService } from '../../core/services/seo.service';
import { ArticleCardComponent } from '../../shared/components/article-card/article-card.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { UrlSeoNoteComponent } from '../../shared/components/url-seo-note/url-seo-note.component';
import { HomeTestimonialsComponent } from './home-testimonials.component';

/**
 * Home Page
 *
 * **SSR:** Hero copy, featured articles, and featured products are rendered on the
 * server when you use `async` pipe with HttpClient data — check View Source.
 *
 * **Hydration:** After HTML arrives, Angular attaches event listeners and reconciles
 * the client app with the server DOM without a full re-render.
 */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ArticleCardComponent,
    ProductCardComponent,
    UrlSeoNoteComponent,
    HomeTestimonialsComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit {
  private readonly mockData = inject(MockDataService);
  private readonly seo = inject(SeoService);

  readonly vm$ = combineLatest({
    articles: this.mockData.getFeaturedArticles(),
    products: this.mockData.getFeaturedProducts(),
    site: this.mockData.getSiteConfig(),
  });

  ngOnInit(): void {
    this.mockData.getSiteConfig().subscribe((site) => {
      this.seo.setSiteDefaults({
        baseUrl: site.defaultSeo.baseUrl,
        defaultImage: site.defaultSeo.defaultImage,
        siteName: site.defaultSeo.siteName,
        twitterHandle: site.defaultSeo.twitterHandle,
      });

      const orgSchema = this.seo.buildOrganizationSchema(site.organization);
      this.seo.apply({
        title: 'Home — Learn SSR, Hydration & SEO',
        description: site.organization.description,
        canonicalPath: '/',
        image: site.defaultSeo.defaultImage,
        type: 'website',
        structuredData: orgSchema,
        structuredDataType: 'Organization',
      });
    });
  }
}
