import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="cols">
        <div class="col about">
          <strong>Angular SSR &amp; SEO Demo</strong>
          <p>Knowledge-sharing project. No real API — data from <code>/assets/data/*.json</code>.</p>
          <p class="hint">💡 Keep View Page Source + the Network tab open while navigating.</p>
        </div>

        <nav class="col" aria-label="Demo pages">
          <span class="col-title">Explore</span>
          <a routerLink="/seo-comparison">SEO comparison</a>
          <a routerLink="/google-preview">Google preview</a>
          <a routerLink="/recipes">Code recipes</a>
          <a routerLink="/transfer-state-demo">TransferState lab</a>
        </nav>

        <nav class="col" aria-label="External SEO tools">
          <span class="col-title">SEO tools</span>
          <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener">
            Rich Results Test ↗
          </a>
          <a href="https://validator.schema.org/" target="_blank" rel="noopener">
            Schema validator ↗
          </a>
          <a href="https://search.google.com/search-console" target="_blank" rel="noopener">
            Search Console ↗
          </a>
          <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener">
            LinkedIn Post Inspector ↗
          </a>
        </nav>
      </div>
    </footer>
  `,
  styles: `
    .site-footer {
      margin-top: 3rem;
      padding: 2.25rem 1.5rem;
      border-top: 1px solid var(--border);
      background: var(--surface);
      color: var(--muted);
      font-size: 0.875rem;
    }
    .cols {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 1.5rem 2rem;
    }
    @media (max-width: 720px) {
      .cols {
        grid-template-columns: 1fr;
      }
    }
    .about strong {
      color: var(--text);
    }
    .about p {
      margin: 0.4rem 0 0;
      max-width: 42ch;
    }
    .col {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .col-title {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text);
      margin-bottom: 0.2rem;
    }
    .col a {
      color: var(--muted);
      text-decoration: none;
      width: fit-content;
    }
    .col a:hover {
      color: var(--accent);
    }
  `,
})
export class SiteFooterComponent {}
