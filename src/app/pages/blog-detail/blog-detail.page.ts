import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { MockDataService } from '../../core/services/mock-data.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './blog-detail.page.html',
  styleUrl: './blog-detail.page.scss',
})
export class BlogDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mockData = inject(MockDataService);
  private readonly seo = inject(SeoService);

  readonly article$ = this.route.paramMap.pipe(
    map((p) => p.get('slug') ?? ''),
    switchMap((slug) => this.mockData.getArticleBySlug(slug))
  );

  ngOnInit(): void {
    this.article$.subscribe((article) => {
      if (!article) {
        return;
      }
      const url = this.seo.absoluteUrl(`/blog/${article.slug}`);
      this.seo.apply({
        title: article.title,
        description: article.excerpt,
        canonicalPath: `/blog/${article.slug}`,
        image: article.image,
        type: 'article',
        structuredData: this.seo.buildArticleSchema({
          title: article.title,
          description: article.excerpt,
          image: article.image,
          author: article.author,
          publishedAt: article.publishedAt,
          url,
        }),
        structuredDataType: 'Article',
      });
    });
  }
}
