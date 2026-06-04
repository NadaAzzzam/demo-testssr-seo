import { Routes } from '@angular/router';

/**
 * Lazy-loaded routes keep initial bundle small — each feature loads on demand.
 * Home and product list are the primary demo entry points.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    title: 'Home',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products-list.page').then((m) => m.ProductsListPage),
    title: 'Products',
  },
  {
    path: 'products/:slug',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.page').then((m) => m.ProductDetailPage),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/blog-detail/blog-detail.page').then((m) => m.BlogDetailPage),
  },
  {
    path: 'seo-comparison',
    loadComponent: () =>
      import('./pages/seo-comparison/seo-comparison.page').then((m) => m.SeoComparisonPage),
    title: 'SEO Comparison',
  },
  {
    path: 'google-preview',
    loadComponent: () =>
      import('./pages/google-preview/google-preview.page').then((m) => m.GooglePreviewPage),
    title: 'Google Search Preview',
  },
  {
    path: 'recipes',
    loadComponent: () => import('./pages/recipes/recipes.page').then((m) => m.RecipesPage),
    title: 'Code Recipes',
  },
  {
    path: 'transfer-state-demo',
    loadComponent: () =>
      import('./pages/transfer-state-demo/transfer-state-demo.page').then(
        (m) => m.TransferStateDemoPage
      ),
    title: 'TransferState',
  },
  { path: '**', redirectTo: '' },
];
