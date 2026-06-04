import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    /**
     * Hydration reuses server-rendered DOM on the client.
     * withEventReplay() replays user clicks that happened before hydration finished.
     */
    provideClientHydration(withEventReplay()),
    /** withFetch() enables HttpClient during SSR (Node fetch for JSON assets). */
    provideHttpClient(withFetch()),
  ],
};
