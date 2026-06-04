/** Domain models mirroring JSON API responses (no real HTTP backend). */

export interface SiteConfig {
  organization: {
    name: string;
    url: string;
    logo: string;
    description: string;
  };
  defaultSeo: {
    siteName: string;
    baseUrl: string;
    defaultImage: string;
    twitterHandle: string;
  };
}

export interface ArticleSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
}

export interface Article extends ArticleSummary {
  body: string;
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface Product extends ProductSummary {
  description: string;
  images: string[];
  sku: string;
  brand: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface ArticlesApiResponse {
  featured: ArticleSummary[];
  articles: Article[];
}

export interface ProductsApiResponse {
  featured: ProductSummary[];
  products: Product[];
  testimonials: Testimonial[];
  relatedProductIds: Record<string, string[]>;
}
