import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <a routerLink="/" class="brand">
        <span class="brand-mark">SSR</span>
        <span class="brand-text">Angular SSR &amp; SEO Demo</span>
      </a>
      <nav aria-label="Main">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
        <a routerLink="/products" routerLinkActive="active">Products</a>
        <a routerLink="/blog/understanding-ssr" routerLinkActive="active">Sample Article</a>
        <a routerLink="/seo-comparison" routerLinkActive="active">SEO Compare</a>
        <a routerLink="/google-preview" routerLinkActive="active">Google Preview</a>
        <a routerLink="/recipes" routerLinkActive="active">Recipes</a>
        <a routerLink="/transfer-state-demo" routerLinkActive="active">TransferState</a>
      </nav>
    </header>
  `,
  styles: `
    .site-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: inherit;
      font-weight: 700;
    }
    .brand-mark {
      background: var(--accent);
      color: #fff;
      padding: 0.2rem 0.45rem;
      border-radius: 6px;
      font-size: 0.75rem;
    }
    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1rem;
    }
    nav a {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.9rem;
    }
    nav a.active,
    nav a:hover {
      color: var(--text);
    }
    @media (max-width: 720px) {
      .site-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `,
})
export class SiteHeaderComponent {}
