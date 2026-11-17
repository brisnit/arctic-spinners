# Arctic Spinners — Storefront Redesign (Prototype)

A modern e-commerce redesign for **Arctic Spinners**, the hand-assembled in-line spinner first designed in 1967 by fishing guide Jack Wadkins in Bear Lake, Michigan. Doug Richardson now runs the company from Luckey, Ohio.

The prototype is built with real content from [arcticspinner.com](https://arcticspinner.com/): the full 51-product catalog, prices, weight options, hardware specs, customer testimonials and catch photos, the dealer directory, contact details, and the brand history. It does **not** modify the live site and it does **not** process payments.

> Creative direction: **“Made to Catch. Built to Last.”** The design is bright and editorial, with condensed display type, lots of white space, and the lures as the hero.

---

## Quick start

Requires **Node.js 20.9+** (developed on Node 24) and npm.

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (prerenders every page, including all 51 product pages) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js config) |
| `npm run typecheck` | TypeScript, no emit |
| `npm run check` | Typecheck + lint + build |

Optional environment variable (see `.env.example`):

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://arcticspinner.com` | Canonical URL for metadata, sitemap and product JSON-LD |

---

## Deploying to Vercel

The app is a standard Next.js project and needs no extra configuration.

1. Import the GitHub repository in Vercel (framework preset: **Next.js**).
2. Optionally set `NEXT_PUBLIC_SITE_URL` to the deployment's domain.
3. Deploy. Build command `next build`, output handled automatically.

---

## What’s included

### Pages

| Route | Description |
| --- | --- |
| `/` | Homepage with an immersive hero, a trust strip, a tabbed collection grid, “Why Arctic Spinners” benefits and stats, Shop by Color, a lifestyle story, a customer-stories carousel and newsletter signup |
| `/shop` | Full catalog: search, color / weight / availability / price filters, five sort orders, active-filter chips, Load More, and a mobile filter sheet. Filters live in the URL, so links like `/shop?color=glow` can be shared |
| `/shop/[slug]` | Product detail page (51, statically generated): gallery with hover zoom and detail views, weight selector, quantity, Add to Cart, specs, craftsmanship, a related testimonial, related products, a sticky mobile Add to Cart bar, and Product JSON-LD |
| `/our-story` | Editorial history, 1967 to today, with archival imagery from the original site |
| `/testimonials` | All seven customer stories (verbatim) plus a catch-photo gallery with a lightbox |
| `/dealers` | 47-dealer directory with search, state filter, “Use my location” distance sorting, and directions links |
| `/contact` | Verified contact details and a validated contact form (`?topic=dealer` pre-selects dealer inquiries) |
| `/checkout` | **Demonstration** checkout. Clearly labeled; collects no payment details; places no order |
| `/account` | Placeholder explaining that accounts arrive once a commerce backend is connected |
| `/privacy`, `/terms` | **Placeholder** pages. Legal copy still to be supplied |

### Shopping cart

- Slide-out drawer with add, remove, quantity steppers and an automatic subtotal
- Quick Add from product cards; multi-weight lures show an inline weight picker
- Persisted to `localStorage` and synced across tabs
- Animated cart count in the header, an empty state, and a mobile-friendly checkout button

### UX and quality

- Mobile-first layouts. No horizontal overflow at 390px on any page (tested)
- Keyboard support: skip link, visible focus rings, `/` opens search, and Escape or arrow keys work in dialogs and the lightbox
- Animations use Motion (`motion/react`) and respect `prefers-reduced-motion`
- SEO: per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`, Product structured data
- Unknown product URLs return a real **404**. See `src/proxy.ts` for why that file is needed

---

## Tech stack

- **Next.js 16** (App Router, Turbopack, Cache Components, Partial Prefetching)
- **React 19**, **TypeScript**
- **Tailwind CSS v4** with brand tokens in `src/app/globals.css`
- **shadcn/ui** on Base UI primitives (Sheet, Accordion, Slider, Checkbox, etc.)
- **Lucide** icons (Facebook and Instagram marks are inline SVGs, since Lucide v1 removed brand icons)
- **Motion** for React

### Design tokens

| Token | Hex | Use |
| --- | --- | --- |
| Arctic Blue | `#087EBD` | Primary brand, primary buttons |
| Electric Blue | `#15B8F4` | Highlights, focus rings |
| Deep Navy | `#102B3F` | Headlines, contrast surfaces |
| Pure White | `#FFFFFF` | Primary background |
| Ice Gray | `#F2F7FA` | Secondary surfaces, product tiles |
| Signal Orange | `#FF6B35` | Promo accents, select CTAs |

Typography: **Barlow Condensed** (display) and **Inter** (UI and body), loaded with `next/font`.

---

## Project structure

```
src/
  app/                    Routes (App Router), sitemap, robots, not-found
  components/
    cart/                 Cart drawer, quantity stepper, demo checkout
    home/                 Homepage sections
    layout/               Announcement bar, header, search, mobile nav, footer
    product/              Product card, quick add, gallery, purchase panel, LureImage
    shop/                 Catalog + URL-synced filter hook
    shared/               Reveal animation, swatches, forms, dealer directory, etc.
    ui/                   shadcn/ui primitives
  data/
    products.source.json  Catalog captured from the current store
    dealers.source.json   Dealer locator export
    testimonials.ts       Verbatim testimonials + catch photos
  lib/
    catalog.ts            Product model, color families, related products
    cart-store.ts         Cart store (useSyncExternalStore + localStorage)
    site.ts               Contact info, social links, announcement bar config
    types.ts              Commerce types
  proxy.ts                True 404s for unknown product slugs
scripts/
  cutout.swift            Product-photo subject isolation (Apple Vision)
```

### Connecting a real commerce backend

The data model in `src/lib/types.ts` mirrors Shopify / WooCommerce concepts:

- `Product`: handle/slug, title, price (integer cents), availability, images, color metadata
- `ProductVariant`: one per weight option (`1/4 oz`, `5/16 oz`, `1/2 oz`) with its own price and availability
- `CartLine`: `{ variantId, quantity }`

To go live:

1. Replace `src/lib/catalog.ts`’s JSON source with Storefront API / Store API queries. The rest of the UI uses only the `Product` type.
2. Swap the `cart` actions in `src/lib/cart-store.ts` for API cart mutations.
3. Point the checkout button at the platform’s hosted checkout and remove `/checkout`.
4. Wire `subscribe()` in `newsletter-form.tsx` and the submit handler in `contact-form.tsx` to real services.

---

## Content sources and accuracy

All of the following comes from arcticspinner.com and was captured in November 2026:

- **Catalog:** all 51 products, named as in the store, at $6.99 each. Weight options come from each product page, and GLOW-Orange is marked out of stock, as it is on the live store.
- **Specs:** “All Arctic Spinner Fishing Lures come equipped with a ‘Split Ring’ for easy hook setup… shipped with a Treble Hook setup with an extra single hook included just in case.”
- **Brand copy:** the 1967 origin, Jack Wadkins, Bear Lake MI, Doug Richardson of Luckey OH, “hand assembled with professional care”, the Brian Kelly 2007 article, and the 2011 and 2012 color notes from the original history page.
- **Testimonials:** the seven testimonials are reproduced verbatim with their original catch photos. No star ratings are shown, because the source has none.
- **Dealers:** 47 locations from the site’s Agile Store Locator.
- **Contact:** 419-320-4406 · Operations@ArcticSpinner.com · Facebook `/luremaker` · Instagram `@arcticspinners`.

The prototype invents no free-shipping policy, discounts, reviews, ratings or product specs.

### Product photography

- Each lure has one photo on the current store, shot on gray paper. `scripts/cutout.swift` uses Apple’s Vision framework (on-device subject lifting) to isolate the lure from **its own photo**, producing the transparent PNGs in `public/images/products/cutout/`. No photo was replaced with imagery of a different product.
- 46 of 51 cutouts were clean. Five (`brown-nickel-black`, `glow-white`, `chartreuse-nickel-chartreuse`, `yellow-nickel-yellow`, `black-black-gold`) lost parts of the skirt, so they fall back to the original photo.
- Original photos are kept in `public/images/products/` and appear in each product gallery as “Original photo”.
- Detail views (“Blade & body”, “Skirt & hooks”) are crops of the same real photo.

To regenerate cutouts (macOS 14+):

```bash
swiftc -O scripts/cutout.swift -o /tmp/cutout
/tmp/cutout public/images/products/<slug>.jpg public/images/products/cutout/<slug>.png
```

---

## Outstanding items and placeholders

**Placeholder imagery.** These are labeled on the page with a small “Placeholder photo” chip; set `showPlaceholderLabels` in `src/lib/site.ts` to hide the chips.

| File | Used in | Source / license |
| --- | --- | --- |
| `public/images/lifestyle/river-cast-placeholder.jpg` | Homepage hero, OG image | [Fly fishing on the South Santiam](https://commons.wikimedia.org/wiki/File:Fly_fishing_on_the_South_Santiam.jpg), Wikimedia Commons, CC0 |
| `public/images/lifestyle/manistee-river-placeholder.jpg` | Homepage lifestyle story | [HMNF Manistee River](https://commons.wikimedia.org/wiki/File:HMNF_Manistee-River_(21954866322).jpg), USDA Forest Service, public domain |

Replace both with brand photography: ideally anglers fishing Arctic Spinners on Michigan or Great Lakes water.

**Product photography needed.** These groups share one identical photo file on the current store (verified by file hash). A notice appears on the affected product pages.

- Black-Black-Green, Black-Black-Purple, GLOW-Black-Green, GLOW-Black-Purple
- Black-Black-Orange / GLOW-Black-Orange
- GLOW-Orange / Orange-Orange-Orange
- GLOW-Pink / Pink-Pink-Pink
- GLOW-Yellow / Yellow-Yellow-Yellow
- GLOW-White-Green / White-Green-White
- Orange-Orange-Brass / Orange-Orange-Nickel

Many older (2020) photos are low resolution (about 180×400px), and new studio photography would lift the whole store.

**Source data issues.** Most are carried over as published; one is corrected.

- Blue-Nickel-Blue has a “list price” of $4.99, which is *lower* than its $6.99 price. This is treated as a data error, so no sale is shown.
- GLOW-Orange is out of stock and has no weight options listed.
- Several product pages on the current store show a different product’s name in their description field (for example, Black-Black-Green’s description reads “GLOW-Black-Purple”). Those descriptions weren’t used.
- Dealer directory: Slez’s Bait & Tackle (Lake Station, ZIP 46405) is listed under Michigan; it’s been **corrected to Indiana**. Lakeside Fishing Shop’s ZIP and phone duplicate Bussing Bait & Tackle’s, and Traverse Bay Tackle’s phone has nine digits. Both are shown as published and should be confirmed with the dealers. “Geenville” is kept as published.

**Not yet connected.**

- Payments and checkout. `/checkout` is a clearly labeled demo.
- The newsletter (no mailing platform yet) and the contact form (no backend yet). Both validate input and say clearly that nothing was sent; the contact form offers a prefilled email instead.
- Customer accounts.
- Privacy Policy and Terms. Legal copy is required.
- No mailing address is published on the current site, so none is shown.

---

## Testing performed

- `npm run typecheck`, `npm run lint` and `npm run build` all pass (67 prerendered routes).
- A scripted browser run (Playwright with Chrome, 53 checks) covered:
  - Quick Add, both single-weight and with the weight picker
  - Drawer quantity changes, subtotal math, removal, and persistence after reload
  - Search
  - Each shop filter, sorting, Load More, empty state, and deep links
  - Adding to cart from a product page, and the sold-out state
  - The 404 status for unknown products
  - Checkout validation and the demo completion screen
  - Contact and newsletter validation and success states
  - Dealer search and state filtering
  - The mobile menu, mobile filter sheet, and mobile sticky Add to Cart
  - No horizontal overflow at 390px on every page

  No runtime console errors occurred.
