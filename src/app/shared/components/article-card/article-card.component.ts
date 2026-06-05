import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleSummary } from '../../../core/models/content.models';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <article class="card">
      <a [routerLink]="['/blog', article().slug]">
        <img
          [src]="article().image"
          [alt]="'Cover image for article: ' + article().title"
          width="400"
          height="240"
          loading="lazy"
          (error)="onImgError($event)"
        />
      </a>
      <div class="card-body">
        <time [attr.datetime]="article().publishedAt">{{ article().publishedAt | date: 'mediumDate' }}</time>
        <h3>
          <a [routerLink]="['/blog', article().slug]">{{ article().title }}</a>
        </h3>
        <p>{{ article().excerpt }}</p>
        <span class="meta">{{ article().readMinutes }} min read · {{ article().author }}</span>
      </div>
    </article>
  `,
  styles: `
    .card {
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      background: var(--surface);
    }
    img {
      width: 100%;
      aspect-ratio: 5/3;
      object-fit: cover;
    }
    .card-body {
      padding: 1rem;
    }
    time {
      font-size: 0.8rem;
      color: var(--muted);
    }
    h3 a {
      color: inherit;
      text-decoration: none;
    }
    .meta {
      font-size: 0.8rem;
      color: var(--muted);
    }
  `,
})
export class ArticleCardComponent {
  readonly article = input.required<ArticleSummary>();

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith('/images/blog-ssr.jpg')) return;
    img.src = '/images/blog-ssr.jpg';
  }
}
