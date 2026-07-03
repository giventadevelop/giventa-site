#!/usr/bin/env node
/**
 * Replace Globex gray placeholder images (dimension labels) with real stock photos.
 * Run after fetch:images for any assets still showing 1920x1000 / 350x400 etc.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES = path.join(__dirname, '../public/images');
const GLOBEX = path.join(__dirname, '../public/globex/assets/images');

const STOCK = {
  team: [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=350&h=400&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=350&h=400&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=350&h=400&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=350&h=400&fit=crop&auto=format&q=80',
  ],
  news: [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=370&h=270&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=370&h=270&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=370&h=270&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=370&h=270&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=370&h=270&fit=crop&auto=format&q=80',
  ],
  gallery: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=570&h=445&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=570&h=445&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=570&h=445&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=570&h=445&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=570&h=445&fit=crop&auto=format&q=80',
  ],
  hero: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1000&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1000&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1000&fit=crop&auto=format&q=80',
  ],
  client: 'https://images.unsplash.com/photo-1611532736598-6b5e34830964?w=270&h=85&fit=crop&auto=format&q=80',
  appointment:
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=471&h=580&fit=crop&auto=format&q=80',
  thumb: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&auto=format&q=80',
  avatar: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=80',
  ],
};

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { rejectUnauthorized: false }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          download(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

function isPlaceholderFile(filePath) {
  if (!fs.existsSync(filePath)) return true;
  const size = fs.statSync(filePath).size;
  const rel = path.relative(IMAGES, filePath).replace(/\\/g, '/');

  if (rel.startsWith('resource/team-') && size < 8000) return true;
  if (rel.startsWith('resource/news-') && size < 8000) return true;
  if (rel.startsWith('clients/') && size < 8000) return true;
  if (/^logo(-2|-small)?\.png$/.test(rel) && size < 8000) return true;
  if (rel.startsWith('resource/post-thumb-') && size < 8000) return true;
  if (rel === 'resource/appointment.jpg' && size < 12000) return true;
  if (rel.startsWith('resource/testimonial-icon-') && size < 8000) return true;
  if (rel.startsWith('gallery/') && size < 9000) return true;
  if (rel.startsWith('main-slider/image-') && size < 50000) return true;

  if (size < 2000) {
    const text = fs.readFileSync(filePath).toString('latin1');
    if (/\d{2,4}x\d{2,4}/.test(text)) return true;
  }
  return false;
}

async function writeBoth(rel, data) {
  const dest = path.join(IMAGES, rel);
  const mirror = path.join(GLOBEX, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, data);
  fs.mkdirSync(path.dirname(mirror), { recursive: true });
  fs.writeFileSync(mirror, data);
}

function stockUrlFor(rel) {
  if (rel.startsWith('resource/team-')) {
    const idx = parseInt(rel.match(/team-(\d+)/)?.[1] || '1', 10) - 1;
    return STOCK.team[idx % STOCK.team.length];
  }
  if (rel.startsWith('resource/news-')) {
    const idx = parseInt(rel.match(/news-(\d+)/)?.[1] || '1', 10) - 1;
    return STOCK.news[idx % STOCK.news.length];
  }
  if (rel.startsWith('gallery/')) {
    const idx = parseInt(rel.match(/gallery\/(\d+)/)?.[1] || '1', 10) - 1;
    return STOCK.gallery[idx % STOCK.gallery.length];
  }
  if (rel.startsWith('main-slider/image-')) {
    const idx = parseInt(rel.match(/image-(\d+)/)?.[1] || '1', 10) - 1;
    return STOCK.hero[idx % STOCK.hero.length];
  }
  if (rel.startsWith('clients/')) return STOCK.client;
  if (rel === 'resource/appointment.jpg') return STOCK.appointment;
  if (rel.startsWith('resource/post-thumb-')) return STOCK.thumb;
  if (rel === 'resource/testimonial-icon-1.png') return STOCK.avatar[0];
  if (rel === 'resource/testimonial-icon-2.png') return STOCK.avatar[1];
  return null;
}

function collectFiles(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectFiles(full, base));
    else out.push(path.relative(base, full).replace(/\\/g, '/'));
  }
  return out;
}

async function main() {
  const files = collectFiles(IMAGES).filter(
    (f) => !f.endsWith('.svg') && f !== 'missing_images_home_screen_shot.png' && !f.startsWith('_')
  );

  for (const rel of files) {
    const dest = path.join(IMAGES, rel);
    if (!isPlaceholderFile(dest)) {
      continue;
    }
    const url = stockUrlFor(rel);
    if (!url) {
      console.log(`Skip (no stock mapping): ${rel}`);
      continue;
    }
    try {
      const data = await download(url);
      await writeBoth(rel, data);
      console.log(`Replaced ${rel} (${data.length} bytes)`);
    } catch (err) {
      console.warn(`Failed ${rel}: ${err.message}`);
    }
  }
}

main();
