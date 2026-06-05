import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideSeoDefaults } from './core/initializers/seo-defaults.initializer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSeoDefaults(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    /**
     * Hydration reuses server-rendered DOM on the client.
     * withEventReplay() replays user clicks that happened before hydration finished.
     * It also enables Angular's built-in HttpClient transfer cache for normal GET/HEAD
     * requests; see fake-api.service.ts for a manual TransferState demo that opts out.
     */
    provideClientHydration(withEventReplay()),
    /** withFetch() enables HttpClient during SSR (Node fetch for JSON assets). */
    provideHttpClient(withFetch()),
  ],
};
