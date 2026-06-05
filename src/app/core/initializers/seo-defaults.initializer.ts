import { inject, provideAppInitializer } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MockDataService } from '../services/mock-data.service';
import { SeoService } from '../services/seo.service';

/** Loads site.json before bootstrap so every prerendered route gets the correct baseUrl. */
export function provideSeoDefaults() {
  return provideAppInitializer(() => {
    const mockData = inject(MockDataService);
    const seo = inject(SeoService);

    return firstValueFrom(mockData.getSiteConfig()).then((site) => {
      seo.setSiteDefaults({
        baseUrl: site.defaultSeo.baseUrl,
        defaultImage: site.defaultSeo.defaultImage,
        siteName: site.defaultSeo.siteName,
        twitterHandle: site.defaultSeo.twitterHandle,
      });
    });
  });
}
