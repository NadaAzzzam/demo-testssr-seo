import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MockDataService } from '../../core/services/mock-data.service';

/** Lazy chunk loaded via @defer on the home page. */
@Component({
  selector: 'app-home-testimonials',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (testimonials$ | async; as items) {
      <div class="quotes">
        @for (t of items; track t.id) {
          <blockquote>
            <p>"{{ t.quote }}"</p>
            <footer>
              <img [src]="t.avatar" [alt]="t.author + ' avatar'" width="40" height="40" loading="lazy" />
              <span>{{ t.author }} — {{ t.role }}</span>
            </footer>
          </blockquote>
        }
      </div>
    }
  `,
  styles: `
    .quotes {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }
    blockquote {
      margin: 0;
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: var(--surface);
    }
    footer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.75rem;
      font-size: 0.85rem;
      color: var(--muted);
    }
    img {
      border-radius: 50%;
      object-fit: cover;
    }
  `,
})
export class HomeTestimonialsComponent {
  readonly testimonials$ = inject(MockDataService).getTestimonials();
}
