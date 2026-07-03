#!/usr/bin/env node
/**
 * Download real image assets from giventa.com (production) to replace Globex template placeholders.
 * Usage: npm run fetch:images
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const TARGET_ROOT = path.join(ROOT, 'public/images');
const GLOBEX_MIRROR = path.join(ROOT, 'public/globex/assets/images');
const BASE_URL = process.env.GIVENTA_IMAGE_BASE_URL || 'https://giventa.com/assets/images';

function collectImageFiles(dir, base = dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectImageFiles(full, base));
    } else if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(entry.name)) {
      files.push(path.relative(base, full).replace(/\\/g, '/'));
    }
  }
  return files;
}

function download(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { rejectUnauthorized: false }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        download(new URL(res.headers.location, url).href).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy(new Error(`Timeout: ${url}`));
    });
  });
}

async function main() {
  if (!fs.existsSync(TARGET_ROOT)) {
    console.error('Missing public/images — run npm run copy:images first');
    process.exit(1);
  }

  const files = [
    'giventalogo_180x60_menu_bar.png',
    ...collectImageFiles(TARGET_ROOT).filter(
      (f) => f !== 'missing_images_home_screen_shot.png' && !f.startsWith('_')
    ),
  ];

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const rel of files) {
    const url = `${BASE_URL}/${rel}`;
    const dest = path.join(TARGET_ROOT, rel);
    const mirror = path.join(GLOBEX_MIRROR, rel);

    try {
      const localSize = fs.existsSync(dest) ? fs.statSync(dest).size : 0;
      const data = await download(url);
      if (data.length < 1000 && localSize > 0) {
        console.warn(`Skip (tiny response): ${rel}`);
        skipped++;
        continue;
      }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, data);
      fs.mkdirSync(path.dirname(mirror), { recursive: true });
      fs.writeFileSync(mirror, data);
      console.log(`OK ${rel} (${data.length} bytes)`);
      ok++;
    } catch (err) {
      console.warn(`FAIL ${rel}: ${err.message}`);
      failed++;
    }
  }

  console.log(`Done: ${ok} downloaded, ${skipped} skipped, ${failed} failed (${files.length} total)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
