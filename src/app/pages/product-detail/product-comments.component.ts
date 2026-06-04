import { Component, input } from '@angular/core';

/** Simulated heavy widget — intentionally deferred on product detail. */
@Component({
  selector: 'app-product-comments',
  standalone: true,
  template: `
    <ul class="comments">
      <li>
        <strong>Alex</strong>
        <p>Great {{ productName() }} — arrived fast. (Demo comment)</p>
      </li>
      <li>
        <strong>Priya</strong>
        <p>SEO note: comments are below the fold and deferred so LCP stays on the hero image.</p>
      </li>
    </ul>
  `,
  styles: `
    .comments {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 0.75rem;
    }
    li {
      padding: 0.75rem 1rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--surface);
    }
  `,
})
export class ProductCommentsComponent {
  readonly productName = input.required<string>();
}
