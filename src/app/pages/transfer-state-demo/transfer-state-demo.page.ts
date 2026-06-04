import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FakeApiService } from '../../core/services/fake-api.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-transfer-state-demo-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './transfer-state-demo.page.html',
  styleUrl: './transfer-state-demo.page.scss',
})
export class TransferStateDemoPage {
  private readonly fakeApi = inject(FakeApiService);
  private readonly seo = inject(SeoService);

  readonly pattern = signal<'without' | 'with'>('without');
  readonly products$ = signal(this.fakeApi.getProductsWithoutTransferState());

  constructor() {
    this.seo.apply({
      title: 'TransferState Demo',
      description:
        'Compare duplicate JSON fetches during SSR vs caching with Angular TransferState.',
      canonicalPath: '/transfer-state-demo',
    });
  }

  runWithout(): void {
    this.fakeApi.clearLog();
    this.pattern.set('without');
    this.products$.set(this.fakeApi.getProductsWithoutTransferState());
  }

  runWith(): void {
    this.fakeApi.clearLog();
    this.pattern.set('with');
    this.products$.set(this.fakeApi.getProductsWithTransferState());
  }

  readonly log = () => this.fakeApi.fetchLog;
}
