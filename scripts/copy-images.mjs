#!/usr/bin/env node
/**
 * Sync Globex image assets to public/images (matches original Angular `images/` paths).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(__dirname, '../src/main/ui/src/assets/images');
const target = path.join(__dirname, '../public/images');

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(source, target);
const count = fs.readdirSync(target, { recursive: true }).filter((f) => !String(f).includes(path.sep)).length;
console.log(`Copied images to public/images (${source})`);
