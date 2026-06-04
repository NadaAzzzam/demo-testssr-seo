import { Component, input, signal } from '@angular/core';

/**
 * Reusable, copy-to-clipboard code block with a titled header and language badge.
 *
 * Code is passed as a plain string input and rendered via interpolation, so the
 * snippet text is never parsed as an Angular template — safe for `{{ }}`, `@`, etc.
 */
@Component({
  selector: 'app-code-snippet',
  standalone: true,
  template: `
    <figure class="snippet">
      <figcaption>
        <div class="meta">
          <span class="dots"><i></i><i></i><i></i></span>
          @if (title()) {
            <span class="title">{{ title() }}</span>
          }
          @if (file()) {
            <span class="file">{{ file() }}</span>
          }
        </div>
        <div class="right">
          <span class="lang">{{ lang() }}</span>
          <button type="button" class="copy" (click)="copy()">
            {{ copied() ? '✓ Copied' : 'Copy' }}
          </button>
        </div>
      </figcaption>
      <pre><code>{{ code() }}</code></pre>
    </figure>
  `,
  styles: `
    .snippet {
      margin: 0 0 1.25rem;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid #232a3d;
      box-shadow: var(--shadow-md);
      background: #0f1322;
    }
    figcaption {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.6rem 0.9rem;
      background: #161b2e;
      border-bottom: 1px solid #232a3d;
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      min-width: 0;
    }
    .dots {
      display: inline-flex;
      gap: 0.3rem;
      flex: none;
    }
    .dots i {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #3a425a;
    }
    .dots i:nth-child(1) { background: #ff5f57; }
    .dots i:nth-child(2) { background: #febc2e; }
    .dots i:nth-child(3) { background: #28c840; }
    .title {
      color: #e7ebf6;
      font-size: 0.84rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .file {
      color: #7e88a3;
      font-size: 0.76rem;
      font-family: 'Cascadia Code', ui-monospace, monospace;
    }
    .right {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex: none;
    }
    .lang {
      color: #8b93ad;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .copy {
      border: 1px solid #2c344a;
      background: #1d2438;
      color: #cdd5ea;
      font-size: 0.74rem;
      font-weight: 600;
      padding: 0.3rem 0.7rem;
      border-radius: 7px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .copy:hover {
      background: #28324d;
      border-color: var(--accent);
      color: #fff;
    }
    pre {
      margin: 0;
      padding: 1rem 1.1rem;
      overflow-x: auto;
    }
    code {
      background: none;
      border: none;
      padding: 0;
      font-family: 'Cascadia Code', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.82rem;
      line-height: 1.65;
      color: #c7cee0;
      white-space: pre;
      tab-size: 2;
    }
  `,
})
export class CodeSnippetComponent {
  readonly title = input('');
  readonly file = input('');
  readonly lang = input('ts');
  readonly code = input('');

  readonly copied = signal(false);

  copy(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.code()).catch(() => undefined);
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1800);
  }
}
