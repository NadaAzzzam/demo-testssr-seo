/**
 * Downloads real Unsplash photos into public/images/ for the demo catalog,
 * blog cards, avatars, and social (og:image) previews.
 *
 * Re-run anytime: npm run generate:images
 */
import { mkdirSync, unlinkSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
mkdirSync(root, { recursive: true });

function unsplash(photoId, { w, h, q = 80 } = {}) {
  const params = new URLSearchParams({ fit: 'crop', q: String(q) });
  if (w) params.set('w', String(w));
  if (h) params.set('h', String(h));
  return `https://images.unsplash.com/${photoId}?${params}`;
}

function picsum(id, w, h) {
  return `https://picsum.photos/id/${id}/${w}/${h}.jpg`;
}

/** @type {{ file: string; label: string; url: string }[]} */
const photos = [
  {
    file: 'og-default.jpg',
    label: 'Social preview',
    url: unsplash('photo-1476480862126-209bfaa8edc8', { w: 1200, h: 630 }),
  },
  {
    file: 'product-jacket.jpg',
    label: 'Aurora jacket',
    url: unsplash('photo-1551028719-00167b16eac5', { w: 800, h: 600 }),
  },
  {
    file: 'product-jacket-alt.jpg',
    label: 'Jacket alt angle',
    url: unsplash('photo-1591047139829-d91aecb6caea', { w: 800, h: 600 }),
  },
  {
    file: 'product-shoes.jpg',
    label: 'Zen Flow Runner',
    url: unsplash('photo-1542291026-7eec264c27ff', { w: 800, h: 600 }),
  },
  {
    file: 'product-bottle.jpg',
    label: 'Hydra bottle',
    url: unsplash('photo-1602143407151-7111542de6e8', { w: 800, h: 600 }),
  },
  {
    file: 'product-mat.jpg',
    label: 'Yoga mat',
    url: picsum(453, 800, 600),
  },
  {
    file: 'blog-ssr.jpg',
    label: 'SSR article',
    url: unsplash('photo-1498050108023-c5249f4df085', { w: 800, h: 480 }),
  },
  {
    file: 'blog-seo.jpg',
    label: 'SEO article',
    url: picsum(119, 800, 480),
  },
  {
    file: 'blog-transfer.jpg',
    label: 'TransferState article',
    url: unsplash('photo-1558494949-ef010cbdcc31', { w: 800, h: 480 }),
  },
  {
    file: 'avatar-1.jpg',
    label: 'Testimonial avatar 1',
    url: unsplash('photo-1494790108377-be9c29b29330', { w: 160, h: 160 }),
  },
  {
    file: 'avatar-2.jpg',
    label: 'Testimonial avatar 2',
    url: unsplash('photo-1507003211169-0a1dd7228f2d', { w: 160, h: 160 }),
  },
];

const legacyFiles = [
  'og-default.png',
  'og-default.svg',
  'product-jacket.png',
  'product-jacket.svg',
  'product-jacket-alt.png',
  'product-jacket-alt.svg',
  'product-shoes.png',
  'product-shoes.svg',
  'product-bottle.png',
  'product-bottle.svg',
  'product-mat.png',
  'product-mat.svg',
  'blog-ssr.svg',
  'blog-seo.svg',
  'blog-transfer.svg',
  'avatar-1.svg',
  'avatar-2.svg',
];

function svgLogo(label, w, h, c1, c2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" rx="24" fill="url(#g)"/>
  <text x="50%" y="54%" fill="#fff" font-family="Segoe UI,system-ui,sans-serif" font-size="72" font-weight="700" text-anchor="middle">SSR</text>
</svg>`;
}

async function downloadPhoto({ file, label, url }) {
  const dest = join(root, file);
  const res = await fetch(url, { headers: { 'User-Agent': 'demo-testssr-seo-image-fetch' } });
  if (!res.ok) {
    throw new Error(`${file}: HTTP ${res.status}`);
  }
  const bytes = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, bytes);
  console.log(`  ${label}: ${file} (${Math.round(bytes.length / 1024)} KB)`);
}

for (const file of legacyFiles) {
  const path = join(root, file);
  if (existsSync(path)) {
    unlinkSync(path);
  }
}

writeFileSync(join(root, 'logo-academy.svg'), svgLogo('SSR Academy', 200, 200, '#3d5afe', '#5c6bc0'), 'utf8');

console.log('Downloading Unsplash photos...');
for (const photo of photos) {
  await downloadPhoto(photo);
}

console.log(`Done: ${photos.length} photos + logo-academy.svg in public/images/`);
