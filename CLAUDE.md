# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Next.js 15, localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
npm run start    # Start production server (requires build first)
```

## Architecture

This is a **single-page landing site** for Inception Woman Lab (a women-led venture studio in Málaga, backed by Niage Consulting). The entire UI lives in one file:

- **`components/InceptionWomanLab.tsx`** — the whole page. It exports a default component that composes all sections in order: `Hero → Ticker → TeamSection → Incubadoras → Statement → SectionConstruimosCompanias → SectionTargetProfile → SectionCredencialesNiage → SectionLasStartupsNoEscalanSolas → AlliancesSection → Footer`.
- **`app/page.tsx`** — just renders `<InceptionWomanLab />`.
- **`app/layout.tsx`** — sets metadata (SEO, OG tags, JSON-LD schema), loads Roboto from Google Fonts, inlines `<script type="application/ld+json">`.

### Key patterns inside `InceptionWomanLab.tsx`

- **`NodeAnimation` class** — a Canvas-based scroll-driven particle animation (yellow `#ffd600` + pink `#FF007A` nodes with connecting lines). Three sections instantiate it with different `NodoModo` values (`"derecha"`, `"izquierda"`, `"esquinas"`). Always call `anim.destroy()` in the `useEffect` cleanup.
- **`ImageWithFallback`** — wraps `<img>` and falls back to an Unsplash placeholder on error. Used throughout instead of Next.js `<Image>` (the `eslint-disable` comment is intentional; remote image domains are configured in `next.config.ts`).
- **`Copete`** — small yellow uppercase label used as a section eyebrow.
- Static data arrays (`TEAM_DATA`, `ALIANZAS_LOGOS`, `RED_MARCAS`, `CONFIG_NODOS`) are defined at module level.

### Styling

- **Tailwind CSS 3** with two brand color extensions: `pink-iwl` (`#FF007A`) and `yellow-iwl` (`#ffd600`). Prefer using these hex values directly in arbitrary Tailwind classes since the extensions aren't aliased into short utilities.
- **`font-zalando`** — custom CSS class in `globals.css` that uses `Zalando Sans Expanded` (proprietary font; falls back to `system-ui`). Place the font file at `public/fonts/ZalandoSansExpanded-Bold.woff2` and uncomment the `@font-face` block in `globals.css` to enable it.
- **`font-roboto`** — loaded via `next/font/google` and exposed as `--font-roboto` CSS variable.
- **`animate-marquee-slow`** — custom Tailwind animation (45s linear infinite) defined in `tailwind.config.ts`.
- **`.bg-noise`** — SVG data-URI noise overlay used as a fixed full-screen layer with `mix-blend-screen`.

### External assets

- Hero video hosted on Cloudinary (`res.cloudinary.com` is allowlisted in `next.config.ts`).
- Team and section images from Unsplash (`images.unsplash.com` allowlisted).
- All placeholder images will swap to Unsplash fallback automatically via `ImageWithFallback` on load error.
