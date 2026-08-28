@AGENTS.md

# Abans Smartphones — Prototype

A high-fidelity marketing/commerce prototype for **Abans Smartphones** (Sri Lanka), a multi-brand
smartphone retailer. Users browse and compare here; the actual purchase happens on an external
Abans storefront, so every buy action is an **outbound handoff**, not an in-app cart.

The bar for craft is the Apple website: quiet confidence, generous whitespace, precise typography,
motion that feels physical rather than decorative.

---

## 1. Stack & Conventions

| Thing | Choice |
|---|---|
| Framework | Next.js 16.3.2, App Router |
| React | 19.2 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens in `app/globals.css`) |
| Animation | `motion` (Framer Motion) for scroll/gesture/layout motion; plain CSS for hovers and simple transitions |
| Images | `next/image` always — never a bare `<img>` |
| Data | Typed mock data in `lib/data/*.ts`. No backend, no API routes. |

**Next.js 16 reminders**

- Server Components by default. Add `"use client"` only where a component needs state, effects,
  event handlers, or `motion`. Push `"use client"` to the leaf, never to a page or layout.
- `params` and `searchParams` are **Promises** — `const { slug } = await params`.
- Consult `node_modules/next/dist/docs/` before reaching for an API you half-remember.

**Code conventions**

- Components: `PascalCase.tsx`, one component per file, named exports.
- Props interfaces named `<Component>Props`, declared above the component.
- No barrel files. Import from the exact path.
- No inline hex values in JSX or CSS — use tokens (`bg-primary`, `text-ink-2`, `rounded-pill`).
- No arbitrary Tailwind values (`p-[17px]`) unless a token genuinely does not exist.
- Prices, titles and copy live in the data layer, never hardcoded in a component.

---

## 2. Project Structure

```
app/
  layout.tsx                  Fonts, metadata, AnnouncementBar + Navbar + Footer
  page.tsx                    Home
  globals.css                 Tailwind import + @theme tokens + base layer
  products/
    page.tsx                  Listing (filters via searchParams)
    [slug]/page.tsx           Product detail
components/
  layout/                     AnnouncementBar, Navbar, MobileMenu, Footer, Container, Section
  ui/                         Button, IconButton, Badge, Pill, Tabs, Card, SectionHeader, Divider
  motion/                     Reveal, Stagger, Parallax, HoverLift, Marquee, CountUp
  home/                       Hero, BrandGrid, OfferStrip, ProductRail, OfferBanner,
                              Spotlight, TrustBar, BlogSection, Newsletter
  product/                    ProductCard, ProductGrid, ProductGallery, SpecList,
                              PriceBlock, BuyCta, FilterBar, SortSelect
lib/
  types.ts                    Product, Brand, Banner, BlogPost, TrustItem, Offer
  data/                       products.ts, brands.ts, banners.ts, blog.ts, trust.ts, nav.ts
  format.ts                   formatLKR, discountPercent, titleCase
  motion.ts                   Shared variants, durations, easings
hooks/                        useScrollProgress, useMediaQuery, useReducedMotion, useInView
public/
  fonts/                      SF Pro woff2 files
  images/{banners,brands,products,blog}/
```

---

## 3. Design Tokens

Everything below is declared once in `app/globals.css` under `@theme`. **Never** redefine or
hand-roll these values elsewhere.

### 3.1 Color

**Primary — `#791F7E`.** Tints and shades of a single hue; `primary-600` is the brand color.

```
--color-primary-50:  #F7F2F7
--color-primary-100: #EFE4F0
--color-primary-200: #DFC9E0
--color-primary-300: #C9A5CB
--color-primary-400: #AF79B2
--color-primary-500: #944C98
--color-primary-600: #791F7E   ← brand
--color-primary-700: #671A6B
--color-primary-800: #551658
--color-primary-900: #431145
--color-primary-950: #300C32
```

**Surfaces**

```
--color-page:        #FAFAFA   Page background (light)
--color-surface:     #F2F2F2   Cards / product cards on light backgrounds
--color-surface-alt: #FFFFFF   Cards on dark backgrounds; also elevated cards on light
--color-dark:        #171717   Dark section background
--color-dark-alt:    #0A0A0A   Deepest dark (footer, spotlight)
```

**Text — grays only, never pure black**

```
--color-ink-1: #171717   Headings, prices
--color-ink-2: #404040   Body copy
--color-ink-3: #737373   Secondary / meta / labels
--color-ink-4: #A3A3A3   Disabled, struck-through prices, captions
--color-line:  #E5E5E5   Hairlines (use sparingly)
--color-line-strong: #D4D4D4
```

On dark sections: `#FFFFFF` for headings, `rgba(255,255,255,0.72)` for body,
`rgba(255,255,255,0.48)` for meta, `rgba(255,255,255,0.16)` for hairlines.

**Accents** — `#16A34A` success/in-stock, `#DC2626` sale/urgency (use for the discount badge only
if primary reads as too quiet; primary is the default).

Rules:
- Never introduce a hue outside this set. Brand logos are the only exception.
- Primary is for actions, active state and small emphasis — not for large filled areas.
- Contrast floor is 4.5:1 for body, 3:1 for large text. `primary-600` on `#FAFAFA` is 8.6:1.

### 3.2 Typography

**SF Pro.** Self-host in `public/fonts/`, loaded with `next/font/local` as `--font-sf`.

```css
font-family: var(--font-sf), "SF Pro Display", "SF Pro Text", -apple-system,
             BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
```

Weights: 400 Regular, 500 Medium, 600 Semibold. **Never use 700+** — Apple-grade type gets its
weight from size and tracking, not boldness.

| Token | Size | Weight | Tracking | Line height | Use |
|---|---|---|---|---|---|
| `display` | `clamp(2.5rem, 6vw, 4.5rem)` | 600 | -0.03em | 1.05 | Hero headline |
| `h1` | `clamp(2rem, 4.5vw, 3.5rem)` | 600 | -0.025em | 1.08 | Page title |
| `h2` | `clamp(1.75rem, 3.2vw, 2.5rem)` | 600 | -0.02em | 1.12 | Section title |
| `h3` | `clamp(1.25rem, 2vw, 1.75rem)` | 600 | -0.015em | 1.2 | Card headline |
| `h4` | `1.125rem` | 600 | -0.01em | 1.3 | Sub-headline |
| `body-lg` | `1.125rem` | 400 | 0 | 1.55 | Section intro |
| `body` | `1rem` | 400 | 0 | 1.6 | Default |
| `body-sm` | `0.875rem` | 400 | 0 | 1.55 | Meta, captions |
| `label` | `0.75rem` | 500 | 0.06em | 1.2 | UPPERCASE eyebrows, spec labels |

- **All titles and headings are Title Case.** So are button labels, tab labels and nav items.
  Body copy is sentence case.
- Measure caps at `65ch` for paragraphs, `20ch` for display headlines.
- Optical alignment: large headings get `text-balance`, paragraphs get `text-pretty`.

### 3.3 Radius

```
--radius-sm:   8px    Chips, small inputs
--radius-md:   12px   Inputs, small cards
--radius-lg:   20px   Content cards, blog cards, tiles
--radius-xl:   28px   Banners, hero, large panels
--radius-pill: 9999px Buttons, tabs, tags, badges, filter chips, avatars
--radius-none: 0px    Product cards ONLY
```

**Product cards are square-cornered. Zero radius, no exceptions.** Everything else is rounded.

### 3.4 Shadow

Minimal, and only to signal interaction — never as default decoration.

```
--shadow-sm: 0 1px 2px rgba(23,23,23,0.04)
--shadow-md: 0 6px 20px rgba(23,23,23,0.06)
--shadow-lg: 0 16px 40px rgba(23,23,23,0.08)
```

Cards sit flat by default and gain `--shadow-md` on hover. Do not stack shadows. Do not use shadows
on dark sections — separate with background tone instead.

### 3.5 Borders

Prefer background contrast over borders. Use a `1px solid var(--color-line)` hairline only for:
input fields, secondary buttons, table rows, and the nav bottom edge when scrolled. Never outline a
card that already has its own background.

### 3.6 Spacing & Layout

4px base scale. Section rhythm:

```
--space-section:       clamp(4rem, 8vw, 7.5rem)     vertical padding per section
--space-section-sm:    clamp(3rem, 5vw, 4.5rem)     compact sections (newsletter, brand marquee)
--space-section-strip: clamp(1rem, 1.5vw, 1.5rem)    thin bands (trust bar)
--container-max:    1280px
--gutter:           1.25rem mobile / 2rem tablet / 4rem desktop
--grid-gap:         1.5rem
```

All content goes through `<Container>`. 12-column grid on desktop, 6 on tablet, 4 on mobile.
Breakpoints are Tailwind defaults: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.

### 3.7 Motion

```
--ease-out:    cubic-bezier(0.16, 1, 0.30, 1)    entrances, reveals  (default)
--ease-inout:  cubic-bezier(0.65, 0, 0.35, 1)    moves, carousels
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1) playful pops (rare)

--dur-fast: 200ms   hovers, color, opacity
--dur-base: 320ms   transforms, card lift
--dur-slow: 600ms   scroll reveals
--dur-xl:   900ms   hero and parallax
```

---

## 4. Components

### 4.1 Buttons — all fully pill-shaped (`--radius-pill`)

| Variant | Idle | Hover | Active | Use |
|---|---|---|---|---|
| `primary` | `primary-600` bg, white text | `primary-700` | `primary-800` | Main CTA |
| `secondary` | transparent, `1px` `line-strong` border, `ink-1` text | border `ink-1`, bg `surface` | bg `line` | Alt action |
| `tertiary` | no bg/border, `primary-600` text | bg `primary-50` | bg `primary-100` | Inline / "View All" |
| `on-dark-outline` | transparent, `1px rgba(255,255,255,.4)`, white text | bg `rgba(255,255,255,.12)`, border white | bg `rgba(255,255,255,.2)` | Dark sections |
| `on-dark-solid` | white bg, `ink-1` text | `#F2F2F2` | `#E5E5E5` | Dark section primary |

Sizes: `sm` h-40 px-20 text-sm · `md` h-48 px-28 text-base · `lg` h-56 px-36 text-base.
Transition `background-color, border-color, color, transform var(--dur-fast) var(--ease-out)`.
Hover adds `scale(1.02)`; active `scale(0.98)`. Focus: `outline: 2px solid var(--color-primary-400);
outline-offset: 2px`. Disabled: `ink-4` text, `line` bg, no motion.

Tabs, tags, filter chips and badges use the same pill radius and the same variant logic
(active chip = primary filled; inactive = `surface` bg, `ink-3` text).

### 4.2 Product Card — the signature component

Matches the supplied reference exactly.

**Image tile** (the card proper)
- **1:1 aspect ratio**, `--radius-none`, no border, no shadow.
- Background `surface` (`#F2F2F2`) on light sections; `surface-alt` (`#FFFFFF`) on dark sections.
- Padding `clamp(20px, 4%, 40px)`.
- Product image is a **3:2 source**, `object-contain`, **centered both axes**, capped at ~70% of the
  tile width. It must never touch the tile edge.
- Optional spec rail, right-aligned inside the tile, vertically centered: rows of
  `value` (`0.8125rem/600 ink-1`) over `LABEL` (`label` token, `ink-3`, uppercase), separated by
  hairlines. Typically RAM · Storage · Display Size.
- Optional discount badge: pill, `primary-600`, white, `label` type, top-left of the tile.

**Meta block** (below the tile, outside it, no background)
- Title: `body` / 400 / `ink-1`, Title Case, two lines max with ellipsis. Top margin 16px.
- Price row: current price `1.375rem / 600 / ink-1`; original price beside it,
  `1rem / 400 / ink-4`, `line-through`. Format `LKR 549,999` — always `LKR` prefix, comma grouping,
  no decimals. Use `formatLKR()`.

**Interaction**
- Whole card is one link to `/products/[slug]`.
- Hover: image `scale(1.04)`, tile background lightens toward `#FFFFFF` (or dims on dark), title
  shifts to `primary-600`. All `var(--dur-base) var(--ease-out)`.
- Never lift or shadow a product card — it stays flush. Lift is for content cards only.

### 4.3 Other Cards

Blog, offer, trust and brand cards use `--radius-lg`, `surface` or `surface-alt` background, no
border, `--shadow-sm` at rest. Hover lifts `translateY(-4px)` with `--shadow-md`.

---

## 5. Pages

### 5.1 Home — section order

1. **Announcement Bar** — thin, `primary-600` bg, white `body-sm`, dismissible, rotating messages.
2. **Navbar** — sticky. Transparent over the hero, then on scroll: `rgba(250,250,250,0.72)` +
   `backdrop-blur(20px)` + hairline bottom, height 80 → 64px. Logo, links
   (Home · Products · Accessories · Blog · Contact), search, wishlist, mobile hamburger →
   full-screen sheet with staggered link entrance.
3. **Hero Banner** — carousel. **3:1 on desktop, 4:5 on mobile.** Autoplay 6s, pause on hover,
   pill progress indicators, drag on touch. Slide copy animates in on a stagger; slide image gets a
   slow `scale(1.06) → 1` Ken Burns and a light parallax on scroll-out.
4. **Brand Grid** — 12 brands: Apple, Xiaomi, Motorola, OPPO, Vivo, Realme, itel, Tecno, Infinix,
   JBL, Sudio, Mibro. **6×2 on desktop, 2×6 on mobile.** Each tile: `surface` bg, `--radius-lg`,
   grayscale logo at 60% opacity → full color on hover with a `-4px` lift. Reveal on a 0.05s stagger.
5. **Offers Strip** — 2–3 promo tiles (`--radius-xl`), image + eyebrow + Title Case headline +
   tertiary CTA. Subtle parallax on the tile artwork.
6. **Best Sellers** — pill tabs (All / Apple / Xiaomi / …) above a horizontally scrollable rail of
   product cards. 5 per view desktop, 2.2 peeking on mobile. Arrow controls fade in on hover.
7. **Offer Banner** — full-bleed dark section, parallax background, `display` headline, on-dark
   buttons. Breaks up the light rhythm.
8. **New Arrivals** — 4-up grid desktop / 2-up mobile, "View All" tertiary button.
9. **Spotlight** — one flagship phone. Sticky/pinned layout: image holds while copy and spec
   callouts scroll past. This is the most Apple-like moment on the page; make it earn that.
10. **Trust Bar** — Authorized Dealer · Abans Warranty · TRCSL Approved · Island-wide Delivery.
    A thin `surface` band on the `strip` rhythm — `ink-1` icon beside a Title Case label, no
    support copy. 4-up desktop, 2-up mobile.
11. **Blog** — 3 latest posts, 16:9 covers, category pill, date, Title Case heading.
12. **Newsletter** — `primary-50` band, pill input + primary button.
13. **Footer** — `dark-alt` bg, 4 link columns, brand list, socials, payment marks, legal row.

### 5.2 Products (Listing)

Breadcrumb → page title + result count → sticky `FilterBar` (pill chips: brand, price band, RAM,
storage; active chips filled primary with an × ) + sort select → responsive grid
(4 / 3 / 2 columns) → "Load More" secondary button. Filter state lives in `searchParams`. Grid items
reveal on a stagger; re-filtering animates with `layout` and `AnimatePresence`.

### 5.3 Products/[slug] (Detail)

Two columns on desktop, stacked on mobile:

- **Left** — gallery. 1:1 `surface` tiles, square corners, thumbnail rail below (vertical on
  desktop), crossfade between images.
- **Right** — brand eyebrow, Title Case title, `PriceBlock` (current + struck + discount pill),
  color swatches, storage pills, key spec list, stock badge, then **`BuyCta`**: a primary pill
  button that opens the external Abans store in a new tab
  (`target="_blank" rel="noopener noreferrer"`), with a secondary "Find A Store" beside it.
- Below: full specification table (hairline rows only), delivery/warranty accordion, and a
  "You May Also Like" product rail.

The right column is `position: sticky` on desktop while the gallery scrolls.

---

## 6. Motion Rules

Shared variants live in `lib/motion.ts`. Never write one-off variants inside a component.

**Scroll reveal** (the default for every section)
```ts
{ hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.30, 1] } } }
```
Applied via `<Reveal>` with `whileInView`, `viewport={{ once: true, margin: "-80px" }}`.

**Stagger** — parent `staggerChildren: 0.06`, `delayChildren: 0.08`. Cap a stagger group at ~8
items; beyond that it drags.

**Parallax** — `useScroll` + `useTransform`, translate range **±10% maximum**. Backgrounds move
slower than foreground. Never parallax text the user is trying to read.

**Hover** — CSS, not JS, wherever possible. Content cards lift `-4px`; images scale `1.04`; links
get an underline that grows from the left; icons nudge 2px in their direction of travel.

**Page/route transitions** — 240ms crossfade + 8px rise on the main content.

**Loading**
- Route-level `loading.tsx` with skeletons that match the real layout (`surface` blocks,
  square for product tiles, pill for buttons) and a slow shimmer.
- Images: `next/image` with `placeholder="blur"`, fading in over 400ms.
- Initial page load: a brief brand mark fade, no spinner. Never block first paint for more than
  ~600ms.

**Non-negotiables**
- Animate only `transform` and `opacity`. Never animate `width`, `height`, `top` or `left`.
- Everything is wrapped by `prefers-reduced-motion: reduce` → no transforms, no parallax,
  no autoplay; opacity fades may remain at 0.01s.
- Nothing animates on hover for touch devices (`@media (hover: hover)`).
- If a scroll effect drops below 60fps on a mid-range laptop, simplify it. Smooth beats clever.

---

## 7. Content & Copy

- Currency is always `LKR` with comma grouping, no decimals: `LKR 549,999`.
- Titles, headings, buttons, tabs and nav labels are **Title Case**. Body copy is sentence case.
- Product names follow the manufacturer's own casing (`iPhone 17 Pro`, `itel Super 26 Ultra`).
- Section headers: optional uppercase `label` eyebrow, Title Case `h2`, optional one-line `body-lg`
  sub in `ink-3`, and an optional right-aligned tertiary "View All".
- Placeholder copy must read like real retail copy. No lorem ipsum, ever.

---

## 8. Quality Bar

Before calling any page done:

- [ ] Renders correctly at 375, 768, 1024, 1440 and 1920px.
- [ ] No horizontal scroll at any width.
- [ ] Every interactive element has visible hover, active **and** focus-visible states.
- [ ] Keyboard reachable in a sensible order; carousels are arrow-key operable.
- [ ] All images have meaningful `alt`; decorative ones have `alt=""`.
- [ ] Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and one `h1` per page.
- [ ] `prefers-reduced-motion` verified.
- [ ] No layout shift — every image and banner has explicit dimensions or an aspect-ratio box.
- [ ] Zero hardcoded colors, fonts, radii or durations outside `globals.css`.
- [ ] `npm run lint` and `npx tsc --noEmit` are clean.
