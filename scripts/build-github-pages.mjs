import { spawnSync } from 'node:child_process';

const baseHref = process.env.BASE_HREF || '/demo-testssr-seo/';

const result = spawnSync(
  'npx',
  ['ng', 'build', '--configuration=github-pages', '--base-href', baseHref],
  { stdio: 'inherit', shell: true },
);

process.exit(result.status ?? 1);
