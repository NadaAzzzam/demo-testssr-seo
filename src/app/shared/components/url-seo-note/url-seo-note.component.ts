import { Component, input } from '@angular/core';

/**
 * Teaching callout that contrasts SEO-friendly URLs with patterns to avoid.
 *
 * Why URLs matter for SEO (talking points for the session):
 *  - The path is a ranking signal and the green breadcrumb users read in results.
 *  - Descriptive, keyword-bearing slugs ("/products/zen-flow-runner") beat opaque
 *    IDs ("/p?id=8842") for both crawlers and humans.
 *  - Too many query params create near-duplicate URLs (?sort, ?ref, ?utm…) that
 *    waste crawl budget and split ranking signals — keep canonical clean.
 *  - Keep them short, lowercase, hyphen-separated, and stable (don't change slugs).
 */
@Component({
  selector: 'app-url-seo-note',
  standalone: true,
  template: `
    <aside class="url-note">
      <header>
        <span class="tag">URL &amp; route SEO</span>
        <h3>{{ heading() }}</h3>
      </header>

      <div class="cols">
        <div class="col do">
          <span class="col-title">✓ What we do</span>
          <ul>
            @for (item of good(); track item) {
              <li><code>{{ item }}</code></li>
            }
          </ul>
        </div>
        <div class="col avoid">
          <span class="col-title">✕ What we avoid</span>
          <ul>
            @for (item of bad(); track item) {
              <li><code>{{ item }}</code></li>
            }
          </ul>
        </div>
      </div>

      @if (tip()) {
        <p class="tip">💡 {{ tip() }}</p>
      }
    </aside>
  `,
  styles: `
    .url-note {
      margin: 1.5rem 0;
      padding: 1.1rem 1.3rem 1.25rem;
      border: 1px solid var(--border);
      border-left: 4px solid var(--accent);
      border-radius: 12px;
      background: var(--surface);
      box-shadow: var(--shadow-sm);
    }
    header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.85rem;
    }
    header h3 {
      margin: 0;
      font-size: 1.02rem;
    }
    .tag {
      background: var(--accent-soft);
      color: var(--accent-dark);
      border: 1px solid #cdd6ff;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      flex: none;
    }
    .cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (max-width: 640px) {
      .cols {
        grid-template-columns: 1fr;
      }
    }
    .col {
      border-radius: 10px;
      padding: 0.85rem 1rem;
      border: 1px solid var(--border);
    }
    .col.do {
      background: var(--good-soft);
      border-color: var(--good-border);
    }
    .col.avoid {
      background: var(--bad-soft);
      border-color: var(--bad-border);
    }
    .col-title {
      display: block;
      font-weight: 700;
      font-size: 0.82rem;
      margin-bottom: 0.5rem;
    }
    .col.do .col-title {
      color: var(--good);
    }
    .col.avoid .col-title {
      color: var(--bad);
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 0.4rem;
    }
    li code {
      display: block;
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 0.35rem 0.55rem;
      font-size: 0.8rem;
      word-break: break-all;
    }
    .col.avoid li code {
      text-decoration: line-through;
      text-decoration-color: rgba(192, 57, 43, 0.45);
      color: #8a4b43;
    }
    .tip {
      margin: 0.9rem 0 0;
      font-size: 0.86rem;
      color: var(--muted);
    }
  `,
})
export class UrlSeoNoteComponent {
  readonly heading = input('Why this URL is built this way');
  readonly good = input<string[]>([]);
  readonly bad = input<string[]>([]);
  readonly tip = input<string>('');
}
