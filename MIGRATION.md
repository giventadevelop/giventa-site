# Giventa Site — Next.js Migration

This branch (`feat/nextjs-migration`) migrates the marketing site from **Angular 11 + Spring Boot static** to **Next.js App Router**, following patterns from the `mosc-temp` project while preserving the original **Globex** HTML/CSS content.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 18, TypeScript |
| Styling | Globex legacy CSS (`public/globex/assets/css/`) |
| Legacy backend | Spring Boot 2.5 (unchanged under `src/main/java`) |

## Project layout

```
src/
  app/
    (site)/              # Marketing routes (/, /about-us, /services, /contact-us)
      _content/          # Auto-generated page bodies from Angular templates
      layout.tsx         # Globex shell (header, footer, static assets)
    layout.tsx           # Root HTML shell
    globals.css
  components/globex/     # Header, footer, static asset loader
  styles/globex-shell.css
public/globex/assets/    # Copied from src/main/ui/src/assets (Globex theme)
scripts/
  convert-angular-templates.mjs
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/home` | Redirects to `/` |
| `/about-us` | About Us |
| `/services` | Services |
| `/contact-us` | Contact Us |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Regenerating page content

After editing Angular templates in `src/main/ui/src/app/`:

```bash
npm run convert:templates
```

This re-generates `src/app/(site)/_content/*.tsx` and `src/components/globex/GlobexHeader.tsx` / `GlobexFooter.tsx`.

## Migration notes

- **mosc-temp pattern**: `GlobexStaticAssets` loads legacy CSS/JS from first paint (like `SyroStaticAssets`).
- **Original Angular app** remains in `src/main/ui/` for reference; not removed yet.
- **Spring Boot** still serves the old build from `src/main/resources/static/` until deployment switches to Next.js.
- Contact form still posts to `sendemail.php` (placeholder); wire to an API route when backend is ready.

## Build

```bash
npm run build
npm start
```

### Windows SWC note

If `next dev` fails with **Application Control policy blocked SWC**, your machine is blocking the native `@next/swc-win32-x64-msvc` binary. Options:

1. Allow the binary in your security policy, or install [Microsoft Visual C++ Redistributable (x64)](https://aka.ms/vs/17/release/vc_redist.x64.exe)
2. Use Node.js 64-bit (`node -p "process.arch"` should print `x64`)
3. Run on CI/Linux or WSL where SWC loads normally

**Do not add `.babelrc`** as a workaround — it disables SWC and breaks `npm run build` (missing `@babel/runtime`). Production builds require SWC.

TypeScript validation passes locally: `npx tsc --noEmit`
