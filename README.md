# Pranavya Yoga — Mindful Movement & Holistic Studio Theme

Pranavya Yoga is a premium, multi-page commercial website theme built with **Astro 7.x** and **Tailwind CSS v4** (`@tailwindcss/vite`). Crafted specifically for yoga studios, meditation centers, wellness retreats, mindful lifestyle practitioners, and boutique wellness ecommerce.

---

## 🌟 Highlights & Features

- **4 Unique Homepage Designs:** Distinct layouts tailored for studios, modern dynamic flows, serene retreat centers, and editorial wellness insights.
- **Robust Content Collections:** Type-safe Markdown collections for Classes, Shop Products, Events, Retreats, Instructors, and Blog Posts with validated Zod schemas.
- **Ecommerce-Ready Shop:** Product catalog with grid/list view toggles, facet filters, product detail galleries, related products, and persistent client cart and wishlist.
- **Interactive Class Schedule:** Day-of-week and style filterable schedule grid for easy booking and planning.
- **Rich Media Support:** Integrated audio meditation players, custom HTML5 video overlays with pulsing controls, and Swiper carousels.
- **Built-in SEO & Performance:** Zero-dependency XML sitemap generation, robots.txt, dynamic canonical URLs, and full Open Graph / Twitter card metadata.
- **Pure Modern Tech Stack:** Astro 7.x, Tailwind CSS v4, TypeScript, vanilla client state via `localStorage` events, and Swiper.

---

## 💻 Tech Stack & System Requirements

- **Framework:** [Astro 7.x](https://astro.build/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Language:** TypeScript 7.x
- **State Management:** Vanilla TypeScript with browser `localStorage` persistence and custom DOM events (zero extra runtime dependencies)
- **Sliders & Carousels:** [Swiper](https://swiperjs.com/)
- **Animations:** [AOS](https://michalsnik.github.io/aos/) (Animate on Scroll)
- **Node.js Requirement:** Node.js `>= 22.12.0` (or LTS compatible)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The site will be available locally at `http://localhost:4321/`.

### 3. Build for Production
```bash
npm run build
```
This compiles all static HTML pages, assets, and the `sitemap.xml` file into the `./dist/` directory.

### 4. Preview the Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```text
myapp/
├── public/                  # Static assets (images, logos, audio, video, fonts)
│   ├── audio/               # Demo meditation audio tracks
│   ├── fonts/               # Local font files (Creato Display)
│   ├── video/               # Demo stock video clips
│   ├── favicon.svg          # Site favicon
│   └── robots.txt           # Search engine crawler directives
├── src/
│   ├── components/          # Reusable Astro and TypeScript UI components
│   │   ├── about/           # About page components
│   │   ├── account/         # Member account dashboard components
│   │   ├── blogs/           # Blog listing and detail components
│   │   ├── bookClass/       # Booking form components
│   │   ├── cart/            # Shopping cart drawer and page components
│   │   ├── checkout/        # Checkout flow components
│   │   ├── classes/         # Yoga class components
│   │   ├── common/          # Shared components (headings, cards, FAQ, testimonials)
│   │   ├── events/          # Workshop and event components
│   │   ├── footer/          # Footer variants (home, inner, index-2, index-3)
│   │   ├── header/          # Header variants (floating pill, inner, sticky, mega-menus)
│   │   ├── index/           # Homepage 1 sections
│   │   ├── index-2/         # Homepage 2 sections
│   │   ├── index-3/         # Homepage 3 sections
│   │   ├── index-4/         # Homepage 4 sections
│   │   ├── membership/      # Membership plans and perks
│   │   ├── retreats/        # Retreats and immersion components
│   │   ├── schedule/        # Filterable class schedule
│   │   ├── shop/            # Catalog, filters, and product detail components
│   │   └── team/            # Instructor team cards and layouts
│   ├── content/             # Markdown content collections
│   │   ├── blog/            # Blog articles (*.md)
│   │   ├── classes/         # Yoga class details (*.md)
│   │   ├── events/          # Workshops and studio events (*.md)
│   │   ├── products/        # Shop products and merchandise (*.md)
│   │   ├── retreats/        # Yoga retreats (*.md)
│   │   ├── team/            # Instructor profiles (*.md)
│   │   └── schemas/         # Zod schemas for type-safe content validation
│   ├── data/                # Static catalogs and filter options
│   ├── layouts/             # Master layout template (Layout.astro)
│   ├── pages/               # Route templates and API endpoints
│   │   ├── sitemap.xml.ts   # Dynamic build-time XML sitemap endpoint
│   │   └── ...              # 36 static page templates and 6 dynamic [slug] routes
│   ├── styles/              # Global CSS, Tailwind v4 theme, and modular stylesheets
│   └── utils/               # Helper utilities (blogSlug.ts)
├── astro.config.mjs         # Astro project and Vite configuration
├── package.json             # Scripts and dependencies
├── LICENSES.md              # Third-party licensing, fonts, and media attribution
└── README.md                # Documentation guide
```

---

## ⚙️ Configuration & Production Domain Setup

### 1. Set Your Production Domain
Open `astro.config.mjs` and update the `site` property with your live production URL:
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://yourdomain.com', // Replace with your production domain
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### 2. Update `robots.txt`
Edit `public/robots.txt` to point to your live domain's sitemap:
```txt
User-agent: *
Allow: /

# Sitemap Reference
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## ✍️ Content Management (Editing Content Collections)

All core business data is managed through Markdown files inside `src/content/`. Each collection has a strictly typed schema in `src/content/schemas/`.

### 1. Adding or Editing a Class
Create or modify a Markdown file in `src/content/classes/` (e.g., `vinyasa-flow.md`):
```markdown
---
title: "Vinyasa Flow"
pageTitle: "Vinyasa Flow Yoga Class"
pageDescription: "Build strength, heat, and mindful connection with dynamic breath-synchronized sequences."
listingTitle: "Vinyasa Flow"
listingCategory: "Dynamic & Energizing"
listingDescription: "Synchronize movement and breath."
mainImage: "/nav-class-2.webp"
mainImageAlt: "Vinyasa Flow Class"
expectTitle: "What to Expect"
expectSubtitle: "Flow with Grace"
expectDescription: "A vigorous sequence linked through deliberate breathwork."
intensityLevel: "Medium - High"
category: "Flow"
---
```

### 2. Adding or Editing a Shop Product
Create or modify a Markdown file in `src/content/products/` (e.g., `manduka-pro-yoga-mat.md`):
```markdown
---
title: "Manduka PRO Yoga Mat 6mm"
slug: "manduka-pro-yoga-mat"
sku: "MAN-PRO-01"
price: "$138.00"
category: "Mats"
rating: 4.9
reviewCount: 42
images:
  main: "/product-1.webp"
  gallery:
    - "/product-1.webp"
    - "/product-2.webp"
shortDescription: "Ultra-dense cushioning and unparalleled grip for a lifetime of practice."
---
```

---

## 🎨 Design System & Theme Customization

Pranavya Yoga uses Tailwind CSS v4 design tokens defined in `src/styles/global.css`:

```css
/* src/styles/global.css */
@theme {
  /* Brand Color Palette */
  --color-primary: #673e2c;         /* Earth Brown / Primary Brand */
  --color-thunder-100: #2d2d2d;     /* Deep Neutral Dark */
  --color-whitesmoke-100: #f7f5f4;  /* Warm Light Background */
  --color-whitesmoke-200: #fbfaf9;  /* Off-white */
  --color-bronco-100: #b39f95;      /* Warm Beige Accent */
  --color-yellow-100: #ffc107;      /* Rating Stars */

  /* Typography */
  --font-primary: 'Work Sans', sans-serif;
  --font-secondary: 'Baskervville', serif;
  --font-third: 'Creato Display', sans-serif;
}
```
You can modify brand colors or add custom tokens in this file, and they will immediately propagate across all components.

---

## 🔌 Buyer Integration Notices (Demo Limitations)

This template is designed for commercial flexibility. Certain interactive features operate in **client-side demo simulation mode** and are designed to be connected to your backend of choice:

1. **Shopping Cart & Checkout Flow:**
   - The cart drawer, wishlist, and counter badges use **vanilla TypeScript and browser `localStorage`** synchronized across components via custom DOM events (`cart-updated`, `wishlist-updated`).
   - The `/checkout/` page simulates customer order intake. For live commercial transactions, connect this flow to **Shopify Storefront API**, **Stripe Checkout**, **Medusa**, **Snipcart**, or your preferred payment gateway.
2. **Booking & Contact Forms:**
   - The booking form (`/bookClass/`), contact form (`/contactUs/`), and newsletter subscription forms include client validation.
   - To receive submissions, attach an endpoint provider such as **Formspree**, **Resend**, **Basin**, or an Astro server API route.
3. **Member Authentication & Account Pages:**
   - The login, registration, forgot-password, and account dashboard (`/account/`) provide fully styled UI states.
   - For live membership systems, integrate an authentication service such as **Supabase Auth**, **Auth.js**, **Firebase**, or custom JWT sessions.

---

## 🚢 Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub / GitLab.
2. Import the project into Vercel.
3. Vercel automatically detects Astro. Build command: `npm run build`, Output directory: `dist`.
4. Deploy!

### Deploying to Netlify
1. Create a new site from your Git provider.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy site!

### Deploying to Cloudflare Pages
1. In Cloudflare Pages, connect your repository.
2. Framework preset: **Astro**.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy!

---

## 📜 Licensing & Attribution

- Open-source dependencies and code frameworks are licensed under the MIT License.
- Included Google Fonts (`Work Sans`, `Baskervville`, `Agbalumo`) are licensed under the SIL Open Font License (OFL).
- Demo stock media (audio tracks in `public/audio/`, video clips in `public/video/`, and local font files in `public/fonts/`) are included for presentation only.
- For complete details, see [LICENSES.md](./LICENSES.md).
