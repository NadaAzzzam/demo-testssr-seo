import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductSummary } from '../../../core/models/content.models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <article class="card">
      <!-- ngSrc + width/height would be used with NgOptimizedImage in production -->
      <a [routerLink]="['/products', product().slug]">
        <img
          [src]="product().image"
          [alt]="product().name + ' product photo'"
          width="400"
          height="300"
          loading="lazy"
          decoding="async"
          (error)="onImgError($event)"
        />
      </a>
      <div class="card-body">
        <span class="badge">{{ product().category }}</span>
        <h3>
          <a [routerLink]="['/products', product().slug]">{{ product().name }}</a>
        </h3>
        <p>{{ product().shortDescription }}</p>
        <p class="price">{{ product().price | currency: product().currency }}</p>
      </div>
    </article>
  `,
  styles: `
    .card {
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      background: var(--surface);
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    img {
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      display: block;
    }
    .card-body {
      padding: 1rem;
      flex: 1;
    }
    h3 {
      margin: 0.35rem 0;
      font-size: 1.05rem;
    }
    h3 a {
      color: inherit;
      text-decoration: none;
    }
    .badge {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--accent);
    }
    .price {
      font-weight: 700;
      margin-top: 0.5rem;
    }
  `,
})
export class ProductCardComponent {
  readonly product = input.required<ProductSummary>();

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith('/images/product-jacket.svg')) return;
    img.src = '/images/product-jacket.svg';
  }
}
