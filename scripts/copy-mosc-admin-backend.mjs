/**
 * Copies admin/backend infrastructure from mosc-temp into giventa-site.
 * Keeps Giventa Globex marketing pages in src/app/(site)/ unchanged.
 * Excludes MOSC public frontend (/mosc, /mosc-redesign, /mosc-old) and mosc Header/Footer.
 *
 * Usage: npm run copy:mosc-admin
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.resolve(ROOT, '../mosc-temp');
const DEST = ROOT;

const SKIP_COMPONENTS = new Set([
  'mosc-redesign',
  'Header.tsx',
  'Footer.tsx',
  'Header_original_backup.tsx',
  'Footer_original_backup.tsx',
  'ConditionalLayout.tsx',
]);

function copyDir(srcRel, destRel, opts = {}) {
  const src = path.join(SRC, srcRel);
  const dest = path.join(DEST, destRel);
  const { excludeDirs = [], excludeFiles = [] } = opts;
  if (!fs.existsSync(src)) {
    console.warn('SKIP (missing):', srcRel);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (excludeDirs.includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(path.join(srcRel, entry.name), path.join(destRel, entry.name), opts);
    } else if (!excludeFiles.includes(entry.name)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(srcRel, destRel) {
  const src = path.join(SRC, srcRel);
  const dest = path.join(DEST, destRel);
  if (!fs.existsSync(src)) {
    console.warn('SKIP file:', srcRel);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log('Copied:', destRel);
}

console.log('Syncing admin backend from mosc-temp → giventa-site\n');

// App routes: admin + auth + API + backend support (not MOSC public)
for (const route of ['admin', '(auth)', 'auth', 'api', 'event', 'membership', 'profile']) {
  copyDir(`src/app/${route}`, `src/app/${route}`);
}

copyDir('src/pages', 'src/pages');

// Lib — preserve giventa marketing helpers
const preserveLib = ['siteContact.ts', 'serviceDetails.ts'];
const libBackup = {};
for (const f of preserveLib) {
  const p = path.join(DEST, 'src/lib', f);
  if (fs.existsSync(p)) libBackup[f] = fs.readFileSync(p);
}
copyDir('src/lib', 'src/lib');
for (const [f, content] of Object.entries(libBackup)) {
  fs.writeFileSync(path.join(DEST, 'src/lib', f), content);
}

copyDir('src/types', 'src/types');
copyDir('src/hooks', 'src/hooks');
copyDir('src/contexts', 'src/contexts');
copyDir('src/services', 'src/services');
copyDir('src/data', 'src/data');
copyDir('src/config', 'src/config');

// Components — all except MOSC public shell
const componentsSrc = path.join(SRC, 'src/components');
for (const entry of fs.readdirSync(componentsSrc, { withFileTypes: true })) {
  if (SKIP_COMPONENTS.has(entry.name)) continue;
  const from = path.join(componentsSrc, entry.name);
  const to = path.join(DEST, 'src/components', entry.name);
  if (entry.isDirectory()) {
    copyDir(`src/components/${entry.name}`, `src/components/${entry.name}`);
  } else {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
}

copyFile('services/eventMediaService.ts', 'src/services/eventMediaService.ts');
copyFile('components.json', 'components.json');

console.log('\nDone. Giventa-specific files preserved:');
console.log('  - src/app/(site)/* (Globex marketing pages)');
console.log('  - src/components/globex/*');
console.log('  - src/lib/siteContact.ts, serviceDetails.ts');
console.log('\nAfter sync, verify: src/middleware.ts, src/app/layout.tsx, next.config.mjs');
