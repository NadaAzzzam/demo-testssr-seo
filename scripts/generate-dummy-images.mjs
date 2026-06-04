import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
mkdirSync(root, { recursive: true });

function svg(label, w, h, c1, c2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="50%" y="50%" fill="#fff" font-family="Segoe UI,system-ui,sans-serif" font-size="${Math.round(h / 14)}" font-weight="600" text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>`;
}

const images = [
  ['og-default.svg', 'OG Default', 1200, 630, '#1a237e', '#3949ab'],
  ['logo-academy.svg', 'SSR Academy', 200, 200, '#3d5afe', '#5c6bc0'],
  ['blog-ssr.svg', 'SSR Article', 800, 480, '#00695c', '#00897b'],
  ['blog-seo.svg', 'SEO Article', 800, 480, '#6a1b9a', '#8e24aa'],
  ['blog-transfer.svg', 'TransferState', 800, 480, '#e65100', '#fb8c00'],
  ['product-jacket.svg', 'Jacket', 800, 600, '#1565c0', '#42a5f5'],
  ['product-jacket-alt.svg', 'Jacket Alt', 800, 600, '#0d47a1', '#1976d2'],
  ['product-shoes.svg', 'Runner Shoes', 800, 600, '#37474f', '#607d8b'],
  ['product-bottle.svg', 'Water Bottle', 800, 600, '#00838f', '#26c6da'],
  ['product-mat.svg', 'Yoga Mat', 800, 600, '#558b2f', '#9ccc65'],
  ['avatar-1.svg', 'SM', 80, 80, '#5e35b1', '#7e57c2'],
  ['avatar-2.svg', 'OK', 80, 80, '#c62828', '#ef5350'],
];

for (const [file, label, w, h, c1, c2] of images) {
  writeFileSync(join(root, file), svg(label, w, h, c1, c2), 'utf8');
}

console.log(`Generated ${images.length} dummy SVG images in public/images/`);
