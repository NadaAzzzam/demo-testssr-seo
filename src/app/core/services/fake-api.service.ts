import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { delay, map, Observable, of, tap } from 'rxjs';
import { ProductSummary } from '../models/content.models';

/** TransferState key — must be unique per dataset. */
const PRODUCTS_LIST_KEY = makeStateKey<ProductSummary[]>('demo_products_list');

export interface FetchLogEntry {
  phase: 'server' | 'browser';
  usedTransferState: boolean;
  timestamp: number;
  message: string;
}

/**
 * Demonstrates duplicate fetches during SSR vs TransferState optimization.
 *
 * Angular hydration already includes an HttpClient transfer cache for normal
 * GET/HEAD requests. This lab disables that automatic cache per request with
 * `{ transferCache: false }` so the before/after demonstrates manual
 * TransferState clearly.
 *
 * **Without TransferState:** Node fetches JSON on the server; the browser fetches
 * again after hydration → duplicate work and slower TTI.
 *
 * **With TransferState:** Server stores the response in inline state; the browser
 * reads it synchronously on the first subscription — no second HTTP call.
 */
@Injectable({ providedIn: 'root' })
export class FakeApiService {
  private readonly http = inject(HttpClient);
  private readonly transferState = inject(TransferState);
  private readonly platformId = inject(PLATFORM_ID);

  /** In-memory log for the Transfer State Demo UI */
  readonly fetchLog: FetchLogEntry[] = [];

  /**
   * BAD pattern for SSR: always hits HttpClient on both server and browser.
   */
  getProductsWithoutTransferState(): Observable<ProductSummary[]> {
    const phase = isPlatformServer(this.platformId) ? 'server' : 'browser';
    this.log(phase, false, `HttpClient GET products.json — no TransferState (${phase})`);

    return this.http
      .get<{ products: ProductSummary[] }>('/assets/data/products.json', {
        transferCache: false,
      })
      .pipe(
        delay(400),
        map((res) => res.products),
        tap(() => this.log(phase, false, `Response received on ${phase}`))
      );
  }

  /**
   * GOOD pattern: server fetches once; browser reuses TransferState.
   */
  getProductsWithTransferState(): Observable<ProductSummary[]> {
    const cached = this.transferState.get(PRODUCTS_LIST_KEY, null);

    if (cached) {
      const phase = isPlatformBrowser(this.platformId) ? 'browser' : 'server';
      this.log(phase, true, 'Read products from TransferState — skipped HTTP on browser');
      return of(cached);
    }

    const phase = isPlatformServer(this.platformId) ? 'server' : 'browser';
    this.log(phase, true, `HttpClient GET products.json (${phase}) — will store in TransferState`);

    return this.http
      .get<{ products: ProductSummary[] }>('/assets/data/products.json', {
        transferCache: false,
      })
      .pipe(
        delay(400),
        map((res) => res.products),
        tap((products) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(PRODUCTS_LIST_KEY, products);
            this.log('server', true, 'Saved products to TransferState for browser hydration');
          }
        })
      );
  }

  clearLog(): void {
    this.fetchLog.length = 0;
  }

  private log(phase: 'server' | 'browser', usedTransferState: boolean, message: string): void {
    this.fetchLog.push({
      phase,
      usedTransferState,
      timestamp: Date.now(),
      message,
    });
  }
}
