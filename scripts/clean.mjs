import { rmSync } from 'node:fs';

for (const path of ['docs/.vuepress/.temp', 'docs/.vuepress/.cache', 'dist']) {
  rmSync(path, { recursive: true, force: true });
}
