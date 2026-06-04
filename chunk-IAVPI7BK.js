import{a as A}from"./chunk-ZAVMCNRU.js";import{a as I,c as U}from"./chunk-FS34ZVPI.js";import"./chunk-ZHBFPEYG.js";import{l as R}from"./chunk-DFFTPAKI.js";import{Ja as S,M as O,Nb as v,W as d,Ya as x,_a as E,aa as M,ba as y,cb as c,db as n,ea as C,eb as t,fb as m,g as k,gb as u,hb as p,ib as P,mb as g,nb as _,oa as T,ob as w,tb as e,ub as h,va as o,vb as D}from"./chunk-36ANJLTF.js";function L(a){a||(a=d(y));let s=new k(r=>{if(a.destroyed){r.next();return}return a.onDestroy(r.next.bind(r))});return r=>r.pipe(O(s))}function q(a,s){if(a&1&&(u(0,"span",3),e(1),p()),a&2){let r=w();o(),h(r.title())}}function F(a,s){if(a&1&&(u(0,"span",4),e(1),p()),a&2){let r=w();o(),h(r.file())}}var b=class a{title=v("");file=v("");lang=v("ts");code=v("");copied=C(!1);copy(){typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText(this.code()).catch(()=>{}),this.copied.set(!0),setTimeout(()=>this.copied.set(!1),1800)}static \u0275fac=function(r){return new(r||a)};static \u0275cmp=S({type:a,selectors:[["app-code-snippet"]],inputs:{title:[1,"title"],file:[1,"file"],lang:[1,"lang"],code:[1,"code"]},decls:17,vars:5,consts:[[1,"snippet"],[1,"meta"],[1,"dots"],[1,"title"],[1,"file"],[1,"right"],[1,"lang"],["type","button",1,"copy",3,"click"]],template:function(r,i){r&1&&(u(0,"figure",0)(1,"figcaption")(2,"div",1)(3,"span",2),P(4,"i")(5,"i")(6,"i"),p(),x(7,q,2,1,"span",3),x(8,F,2,1,"span",4),p(),u(9,"div",5)(10,"span",6),e(11),p(),u(12,"button",7),_("click",function(){return i.copy()}),e(13),p()()(),u(14,"pre")(15,"code"),e(16),p()()()),r&2&&(o(7),E(i.title()?7:-1),o(),E(i.file()?8:-1),o(3),h(i.lang()),o(2),D(" ",i.copied()?"\u2713 Copied":"Copy"," "),o(3),h(i.code()))},styles:[".snippet[_ngcontent-%COMP%]{margin:0 0 1.25rem;border-radius:14px;overflow:hidden;border:1px solid #232a3d;box-shadow:var(--shadow-md);background:#0f1322}figcaption[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding:.6rem .9rem;background:#161b2e;border-bottom:1px solid #232a3d}.meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.7rem;min-width:0}.dots[_ngcontent-%COMP%]{display:inline-flex;gap:.3rem;flex:none}.dots[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{width:11px;height:11px;border-radius:50%;background:#3a425a}.dots[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:nth-child(1){background:#ff5f57}.dots[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:nth-child(2){background:#febc2e}.dots[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:nth-child(3){background:#28c840}.title[_ngcontent-%COMP%]{color:#e7ebf6;font-size:.84rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file[_ngcontent-%COMP%]{color:#7e88a3;font-size:.76rem;font-family:Cascadia Code,ui-monospace,monospace}.right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.6rem;flex:none}.lang[_ngcontent-%COMP%]{color:#8b93ad;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase}.copy[_ngcontent-%COMP%]{border:1px solid #2c344a;background:#1d2438;color:#cdd5ea;font-size:.74rem;font-weight:600;padding:.3rem .7rem;border-radius:7px;cursor:pointer;transition:all .15s ease}.copy[_ngcontent-%COMP%]:hover{background:#28324d;border-color:var(--accent);color:#fff}pre[_ngcontent-%COMP%]{margin:0;padding:1rem 1.1rem;overflow-x:auto}code[_ngcontent-%COMP%]{background:none;border:none;padding:0;font-family:Cascadia Code,Fira Code,ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.82rem;line-height:1.65;color:#c7cee0;white-space:pre;tab-size:2}"]})};var H=class a{seo=d(A);document=d(M);platformId=d(T);route=d(I);router=d(U);destroyRef=d(y);ngOnInit(){this.seo.apply({title:"Code Recipes \u2014 Reusable SSR & SEO Snippets",description:"Copy-paste Angular recipes for SSR, hydration, TransferState, and SEO meta tags, canonical URLs, Open Graph and JSON-LD.",canonicalPath:"/recipes",image:"/images/og-default.svg"})}ngAfterViewInit(){if(!R(this.platformId))return;let s=r=>{r&&requestAnimationFrame(()=>this.scrollToElement(r))};s(this.route.snapshot.fragment),this.route.fragment.pipe(L(this.destroyRef)).subscribe(s)}scrollToSection(s,r){r.preventDefault(),R(this.platformId)&&(this.scrollToElement(s),this.router.navigate([],{fragment:s,replaceUrl:!0,queryParamsHandling:"preserve"}))}scrollToElement(s){this.document.getElementById(s)?.scrollIntoView({behavior:"smooth",block:"start"})}enableSsrCli=`# Add SSR + hydration to an existing Angular app
ng add @angular/ssr

# Dev server (CSR + SSR)            Production SSR build
npm start                           npm run build && npm run serve:ssr`;clientConfig=`import { ApplicationConfig } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // Reuse server-rendered DOM instead of re-rendering on the client.
    // withEventReplay() replays clicks made before hydration finished.
    // provideClientHydration() also enables HttpClient transfer cache by default.
    provideClientHydration(withEventReplay()),

    // withFetch() lets HttpClient run during SSR (Node fetch).
    provideHttpClient(withFetch()),
  ],
};`;httpTransferCache=`// Angular hydration includes HttpClient transfer cache by default.
// Server: cache matching HttpClient GET/HEAD responses.
// Browser: reuse them during initial hydration instead of requesting again.

import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

provideClientHydration(
  withHttpTransferCacheOptions({
    // Exclude user-specific or frequently-changing endpoints.
    filter: (req) => !req.url.includes('/api/profile'),
  })
);

// Per request: opt out when a response must not be serialized into HTML.
this.http.get('/api/live-stock', { transferCache: false });`;serverConfig=`import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

// Server = browser config + server-only providers
export const config = mergeApplicationConfig(appConfig, serverConfig);`;serverRoutes=`import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static pages: render once at build time (fastest, cacheable)
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },

  // Dynamic slugs: render on each request on the server
  { path: 'products/**', renderMode: RenderMode.Server },
  { path: 'blog/**', renderMode: RenderMode.Server },

  { path: '**', renderMode: RenderMode.Server },
];`;seoServiceApply=`// The reusable core: write title + meta into <head>.
// On SSR this runs on the server too, so crawlers get full <head> in the HTML.
apply(config: SeoConfig): void {
  const canonicalUrl = this.absoluteUrl(config.canonicalPath);
  const imageUrl = this.absoluteUrl(config.image ?? this.defaultImage);

  // 1. Title \u2014 browser tab + the blue link in Google
  this.title.setTitle(config.title + ' | ' + this.siteName);

  // 2. Description \u2014 the grey snippet under the link
  this.meta.updateTag({ name: 'description', content: config.description });

  // 3. Robots \u2014 index public pages; noindex private/staging pages
  this.meta.updateTag({
    name: 'robots',
    content: config.robots ?? 'index, follow, max-image-preview:large',
  });

  // 4. Canonical \u2014 the one true URL for this content (avoids duplicates)
  this.setCanonical(canonicalUrl);

  // 5. Open Graph \u2014 link previews on LinkedIn, Slack, Facebook
  this.meta.updateTag({ property: 'og:title', content: config.title });
  this.meta.updateTag({ property: 'og:description', content: config.description });
  this.meta.updateTag({ property: 'og:image', content: imageUrl });
  this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
  this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });

  // 6. Twitter Card \u2014 X/Twitter previews
  this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  this.meta.updateTag({ name: 'twitter:title', content: config.title });
  this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
}`;seoUsage=`// Call it once per route, in ngOnInit. That's the whole SEO contract for a page.
export class ProductDetailPage implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.apply({
      title: product.name,
      description: product.shortDescription,
      canonicalPath: '/products/' + product.slug,
      image: product.image,
      type: 'product',
    });
  }
}`;canonical=`// Canonical tells Google "index THIS url", collapsing ?utm/?sort duplicates.
private setCanonical(url: string): void {
  const head = this.document.head;
  let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    head.appendChild(link);
  }
  link.setAttribute('href', url);
}`;jsonLd=`// JSON-LD = machine-readable facts \u2192 rich results (stars, price, breadcrumbs).
// Test at https://search.google.com/test/rich-results
private setJsonLd(data: Record<string, unknown>): void {
  this.document.getElementById('app-json-ld')?.remove();
  const script = this.document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'app-json-ld';
  script.textContent = JSON.stringify(data);
  this.document.head.appendChild(script);
}

// Example payload for a product page:
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Zen Flow Runner',
  offers: { '@type': 'Offer', price: 129, priceCurrency: 'USD' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.8, reviewCount: 312 },
};`;transferState=`// Manual TransferState is useful for non-HttpClient data, custom caches,
// or demos where you opt out of Angular's automatic HttpClient transfer cache.
// Avoid the SSR "double fetch": cache the server response, reuse it on the client.
const PRODUCTS_KEY = makeStateKey<Product[]>('products');

getProducts(): Observable<Product[]> {
  const cached = this.transferState.get(PRODUCTS_KEY, null);
  if (cached) {
    return of(cached); // browser: read synchronously, no second HTTP call
  }
  return this.http.get<Product[]>('/api/products', { transferCache: false }).pipe(
    tap((data) => {
      if (isPlatformServer(this.platformId)) {
        this.transferState.set(PRODUCTS_KEY, data); // server: stash for the browser
      }
    })
  );
}`;missedChecks=`SSR/SEO checklist before shipping a real Angular route:

1. View Page Source, not only Elements. The real title, text, and JSON-LD must be in raw HTML.
2. Each indexable route needs one unique title, description, canonical URL, and robots rule.
3. Use noindex on staging/private pages. Do not block those pages in robots.txt if you expect noindex to be seen.
4. Use absolute PNG/JPG social images, ideally around 1200x630. Do not rely on SVG for og:image.
5. Keep one stable, lowercase, hyphenated URL per page. Redirect old slugs with 301s.
6. Add a sitemap.xml for real deployments and keep canonical URLs in it consistent.
7. Validate structured data with Google's Rich Results Test and Schema.org Validator.
8. Check HttpClient transfer cache: default is automatic; opt out for private or highly dynamic data.`;static \u0275fac=function(r){return new(r||a)};static \u0275cmp=S({type:a,selectors:[["app-recipes-page"]],decls:104,vars:11,consts:[[1,"page-head"],[1,"eyebrow"],[1,"toc","card"],[1,"toc-label"],["href","#ssr",3,"click"],["href","#seo",3,"click"],["href","#structured",3,"click"],["href","#transfer",3,"click"],["href","#missed",3,"click"],["id","ssr",1,"recipe-group"],[1,"group-lead"],["title","Add SSR to any Angular app","lang","bash",3,"code"],["title","Browser providers \u2014 hydration + fetch","file","app.config.ts",3,"code"],["title","Server providers","file","app.config.server.ts",3,"code"],["title","Per-route render strategy (prerender vs server)","file","app.routes.server.ts",3,"code"],["title","Automatic HttpClient transfer cache","file","app.config.ts",3,"code"],["id","seo",1,"recipe-group"],["title","The reusable SeoService.apply() core","file","core/services/seo.service.ts",3,"code"],["title","Using it in a page (one call per route)","file","pages/product-detail/product-detail.page.ts",3,"code"],[1,"callout","bad"],[1,"ico"],["id","structured",1,"recipe-group"],["title","Canonical link helper",3,"code"],["title","JSON-LD structured data",3,"code"],["id","transfer",1,"recipe-group"],["title","Cache on the server, reuse on the client",3,"code"],["id","missed",1,"recipe-group"],["title","Pre-ship SSR/SEO checklist","lang","text",3,"code"],[1,"callout","good"]],template:function(r,i){r&1&&(n(0,"section",0)(1,"span",1),e(2,"Copy \xB7 Paste \xB7 Reuse"),t(),n(3,"h1"),e(4,"Code recipes"),t(),n(5,"p"),e(6," The exact SSR & SEO patterns this demo uses, packaged as self-contained snippets. Hit "),n(7,"strong"),e(8,"Copy"),t(),e(9," and drop them into any Angular 17+ standalone project \u2014 no need to dig through this repo. "),t()(),n(10,"div",2)(11,"span",3),e(12,"Jump to"),t(),n(13,"a",4),g("click",function(l){return i.scrollToSection("ssr",l)}),e(14,"SSR & Hydration"),t(),n(15,"a",5),g("click",function(l){return i.scrollToSection("seo",l)}),e(16,"SEO meta tags"),t(),n(17,"a",6),g("click",function(l){return i.scrollToSection("structured",l)}),e(18,"Canonical & JSON-LD"),t(),n(19,"a",7),g("click",function(l){return i.scrollToSection("transfer",l)}),e(20,"TransferState"),t(),n(21,"a",8),g("click",function(l){return i.scrollToSection("missed",l)}),e(22,"Missed checks"),t()(),n(23,"section",9)(24,"h2"),e(25,"\u2460 SSR & Hydration"),t(),n(26,"p",10),e(27," Turn a client-only Angular app into a server-rendered one. The server sends complete HTML (great for SEO + first paint); the browser then "),n(28,"em"),e(29,"hydrates"),t(),e(30," it instead of re-rendering. "),t(),m(31,"app-code-snippet",11)(32,"app-code-snippet",12)(33,"app-code-snippet",13)(34,"app-code-snippet",14)(35,"app-code-snippet",15),t(),n(36,"section",16)(37,"h2"),e(38,"\u2461 SEO meta tags"),t(),n(39,"p",10),e(40," One small service writes every tag a page needs. Because it runs during SSR, crawlers receive a fully-populated "),n(41,"code"),e(42,"<head>"),t(),e(43," without executing JavaScript. "),t(),m(44,"app-code-snippet",17)(45,"app-code-snippet",18),n(46,"div",19)(47,"span",20),e(48,"\u26A0\uFE0F"),t(),n(49,"div")(50,"strong"),e(51,"OG image gotcha:"),t(),e(52," social crawlers (LinkedIn, Facebook, X) generally do "),n(53,"strong"),e(54,"not"),t(),e(55," render "),n(56,"code"),e(57,".svg"),t(),e(58," for "),n(59,"code"),e(60,"og:image"),t(),e(61,". Use a raster "),n(62,"strong"),e(63,"PNG/JPG around 1200\xD7630"),t(),e(64," with an absolute URL. This demo ships SVG placeholders for simplicity \u2014 swap them for real images before sharing links publicly. "),t()()(),n(65,"section",21)(66,"h2"),e(67,"\u2462 Canonical URL & JSON-LD"),t(),n(68,"p",10),e(69," Canonical tags fix duplicate-URL problems; JSON-LD unlocks rich results (stars, price, FAQ). "),t(),m(70,"app-code-snippet",22)(71,"app-code-snippet",23),t(),n(72,"section",24)(73,"h2"),e(74,"\u2463 TransferState (skip the double fetch)"),t(),n(75,"p",10),e(76," Without this, SSR fetches data on the server "),n(77,"em"),e(78,"and"),t(),e(79," the browser fetches it again after hydration. TransferState ships the server result inside the HTML so the client reads it for free. Angular's built-in HttpClient transfer cache already handles many GET requests; manual TransferState is still useful for custom data sources or explicit cache control. "),t(),m(80,"app-code-snippet",25),t(),n(81,"section",26)(82,"h2"),e(83,"\u2464 Things people usually miss"),t(),n(84,"p",10),e(85," This checklist catches the common SSR/SEO gaps that do not show up just by clicking around the hydrated app. "),t(),m(86,"app-code-snippet",27),t(),n(87,"div",28)(88,"span",20),e(89,"\u{1F4CB}"),t(),n(90,"div"),e(91," These mirror the real files in "),n(92,"code"),e(93,"src/app/"),t(),e(94,". Want to see them in action first? Use "),n(95,"strong"),e(96,"SEO Compare"),t(),e(97,", "),n(98,"strong"),e(99,"Google Preview"),t(),e(100," and the "),n(101,"strong"),e(102,"TransferState"),t(),e(103," lab from the nav, then come back here to copy the implementation. "),t()()),r&2&&(o(31),c("code",i.enableSsrCli),o(),c("code",i.clientConfig),o(),c("code",i.serverConfig),o(),c("code",i.serverRoutes),o(),c("code",i.httpTransferCache),o(9),c("code",i.seoServiceApply),o(),c("code",i.seoUsage),o(25),c("code",i.canonical),o(),c("code",i.jsonLd),o(9),c("code",i.transferState),o(6),c("code",i.missedChecks))},dependencies:[b],styles:["[_nghost-%COMP%]{display:block}em[_ngcontent-%COMP%]{font-style:italic;color:var(--text)}.toc[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1rem;padding:.85rem 1.2rem;margin:1.25rem 0 2rem}.toc-label[_ngcontent-%COMP%]{font-size:.75rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}.toc[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.88rem;font-weight:600;text-decoration:none;color:var(--accent);padding:.25rem .6rem;border-radius:999px;background:var(--accent-soft)}.toc[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background:#dde3ff}.recipe-group[_ngcontent-%COMP%]{margin-top:2.5rem;scroll-margin-top:5rem}.recipe-group[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.35rem;margin-bottom:.4rem}.group-lead[_ngcontent-%COMP%]{color:var(--muted);max-width:72ch;margin:0 0 1.25rem}.callout[_ngcontent-%COMP%]{margin-top:2rem}"]})};export{H as RecipesPage};
