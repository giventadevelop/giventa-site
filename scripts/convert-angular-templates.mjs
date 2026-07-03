#!/usr/bin/env node
/**
 * Converts Angular Globex HTML templates to JSX for Next.js pages.
 * Run: npm run convert:templates
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const UI = path.join(ROOT, 'src/main/ui/src/app');
const OUT = path.join(ROOT, 'src/app/(site)/_content');

const ROUTE_MAP = {
  "['/home']": '/',
  "['/about-us']": '/about-us',
  "['/services']": '/services',
  "['/contact-us']": '/contact-us',
};

function fixAssetPaths(jsx) {
  return jsx
    .replace(/src="images\//g, 'src="/images/')
    .replace(/url\(images\//g, 'url(/images/')
    .replace(/url\(\.\.\/\.\.\/assets\/images\//g, 'url(/images/')
    .replace(/url\(\.\.\/assets\/images\//g, 'url(/images/')
    .replace(/url\(\/assets\/images\//g, 'url(/images/')
    .replace(/src="\/globex\/assets\/images\//g, 'src="/images/')
    .replace(/url\(\/globex\/assets\/images\//g, 'url(/images/');
}

function convertInlineStyles(jsx) {
  return jsx.replace(/style="([^"]*)"/g, (_m, styleContent) => {
    const bgMatch = styleContent.match(/background-image:\s*url\(([^)]+)\)/);
    if (bgMatch) {
      return `style={{ backgroundImage: 'url(${bgMatch[1]})' }}`;
    }
    return `style={{ cssText: '${styleContent.replace(/'/g, "\\'")}' }}`;
  });
}

function convertHtmlToJsx(html) {
  let jsx = html;

  jsx = jsx.replace(/<router-outlet><\/router-outlet>/g, '');

  jsx = jsx.replace(/<a\s+([^>]*?)\[routerLink\]="(\[[^\]]+\])"([^>]*)>/g, (_m, before, route, after) => {
    const href = ROUTE_MAP[route] ?? '/';
    return `<a ${before}href="${href}"${after}>`;
  });

  jsx = jsx.replace(/\bclass=/g, 'className=');
  jsx = jsx.replace(/\bfor=/g, 'htmlFor=');
  jsx = fixAssetPaths(jsx);

  jsx = jsx.replace(/href="index\.html"/g, 'href="/"');
  jsx = jsx.replace(/href="about\.html"/g, 'href="/about-us"');
  jsx = jsx.replace(/href="services\.html"/g, 'href="/services"');
  jsx = jsx.replace(/href="contact\.html"/g, 'href="/contact-us"');

  const voidTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
  for (const tag of voidTags) {
    const re = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'gi');
    jsx = jsx.replace(re, (_m, attrs) => {
      if (attrs.trimEnd().endsWith('/')) return _m;
      return `<${tag}${attrs} />`;
    });
  }

  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, (_m, content) => `{/*${content}*/}`);
  jsx = convertInlineStyles(jsx);

  // React: static empty value="" must be defaultValue (uncontrolled inputs)
  jsx = jsx.replace(/\bvalue=""/g, 'defaultValue=""');

  // React boolean / camelCase attributes
  jsx = jsx.replace(/\ballowfullscreen=""/gi, 'allowFullScreen');
  jsx = jsx.replace(/\brequired=""/g, 'required');
  jsx = jsx.replace(/\bchecked=""/g, 'checked');
  jsx = jsx.replace(/\bselected=""/g, 'selected');
  jsx = jsx.replace(/\bdisabled=""/g, 'disabled');
  jsx = jsx.replace(/\breadonly=""/g, 'readOnly');
  jsx = jsx.replace(/\bautofocus=""/g, 'autoFocus');

  return jsx.trim();
}

function wrapAsComponent(name, jsxBody) {
  return `/* Auto-generated from Angular template — do not edit by hand; run npm run convert:templates */
export default function ${name}() {
  return (
    <>
${jsxBody
  .split('\n')
  .map((line) => (line ? `      ${line}` : ''))
  .join('\n')}
    </>
  );
}
`;
}

const pages = [
  { src: 'home/home.component.html', out: 'HomeContent.tsx', name: 'HomeContent' },
  { src: 'about-us/about-us.component.html', out: 'AboutUsContent.tsx', name: 'AboutUsContent' },
  { src: 'services/services.component.html', out: 'ServicesContent.tsx', name: 'ServicesContent' },
  { src: 'contact-us/contact-us.component.html', out: 'ContactUsContent.tsx', name: 'ContactUsContent' },
];

fs.mkdirSync(OUT, { recursive: true });

for (const page of pages) {
  const srcPath = path.join(UI, page.src);
  const html = fs.readFileSync(srcPath, 'utf8');
  const jsx = convertHtmlToJsx(html);
  fs.writeFileSync(path.join(OUT, page.out), wrapAsComponent(page.name, jsx), 'utf8');
  console.log(`Converted ${page.src} -> ${page.out}`);
}

const appHtml = fs.readFileSync(path.join(UI, 'app.component.html'), 'utf8');
const routerOutletIdx = appHtml.indexOf('<router-outlet>');
let headerHtml = appHtml.slice(0, routerOutletIdx);
const footerHtml = appHtml.slice(appHtml.indexOf('<!-- Main Footer -->'));

headerHtml = headerHtml
  .replace(/^\s*<div class="page-wrapper">\s*/s, '')
  .replace(/<div class="preloader"><\/div>\s*/s, '');

const headerJsx = convertHtmlToJsx(headerHtml);
const footerJsx = convertHtmlToJsx(footerHtml.replace(/<\/div>\s*<!--End pagewrapper-->\s*$/s, ''));

fs.mkdirSync(path.join(ROOT, 'src/components/globex'), { recursive: true });

fs.writeFileSync(
  path.join(ROOT, 'src/components/globex/GlobexHeader.tsx'),
  `/* Auto-generated from app.component.html */
export default function GlobexHeader() {
  return (
    <>
${headerJsx
  .split('\n')
  .map((line) => (line ? `      ${line}` : ''))
  .join('\n')}
    </>
  );
}
`,
  'utf8'
);

fs.writeFileSync(
  path.join(ROOT, 'src/components/globex/GlobexFooter.tsx'),
  `/* Auto-generated from app.component.html */
export default function GlobexFooter() {
  return (
    <>
${footerJsx
  .split('\n')
  .map((line) => (line ? `      ${line}` : ''))
  .join('\n')}
    </>
  );
}
`,
  'utf8'
);

console.log('Converted header and footer components.');
console.log('Done.');
