/** Configuration passed to SeoService for each route. */

export type StructuredDataType = 'Organization' | 'Article' | 'Product' | 'none';

export interface SeoConfig {
  title: string;
  description: string;
  /** Path only, e.g. `/products/zen-flow-runner` — canonical is built from baseUrl */
  canonicalPath: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  /** Usually `index, follow`; can be `noindex, nofollow` for private/staging pages. */
  robots?: string;
  structuredData?: Record<string, unknown>;
  structuredDataType?: StructuredDataType;
  /** When true, intentionally skips SEO updates (used on /seo-comparison "bad" panel). */
  skipSeo?: boolean;
}
