# FixCel Website

Computer store and repair shop website for **FixCel** — Sta Rosa, Laguna, Philippines.

Built with **React 18 + TypeScript + Vite + Tailwind CSS**, deployed to **GitHub Pages**.

---

## Pages

| Route | Description |
|---|---|
| `/#/repair` | Repair services with pricing and turnaround times (default) |
| `/#/laptops` | Used & second-hand laptops for sale |
| `/#/accessories` | Laptop parts and accessories |
| `/#/about` | About FixCel |
| `/#/contact` | Contact information |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Production Build

```bash
npm run build
```

Output is written to the `dist/` folder. Preview it locally before deploying:

```bash
npm run preview
```

Open [http://localhost:4173](http://localhost:4173) to verify the production build.

---

## Deploy to GitHub Pages

The `deploy` script builds the project and pushes `dist/` to the `gh-pages` branch.

```bash
npm run deploy
```

Requirements:
- The repository must be hosted on GitHub.
- GitHub Pages must be configured to serve from the **`gh-pages` branch**.
- The `CNAME` file (`public/CNAME`) must contain your custom domain (`fixcel.net`) — it is already included and copied to `dist/` automatically on every build.

### First-time GitHub Pages setup

1. Push the repository to GitHub if you haven't already.
2. Go to **Settings → Pages** in your GitHub repository.
3. Under **Branch**, select `gh-pages` and click **Save**.
4. Under **Custom domain**, enter `fixcel.net` and click **Save**.
5. Run `npm run deploy` — the site will be live at `https://fixcel.net` within a few minutes.

### Subsequent deploys

```bash
npm run deploy
```

That's it — one command builds and publishes.

---

## Updating Content

All content is stored in plain TypeScript files — no CMS or database needed.

| File | What to edit |
|---|---|
| `src/data/laptops.ts` | Used laptop inventory (model, specs, price, condition) |
| `src/data/accessories.ts` | Parts and accessories for sale |
| `src/data/repairs.ts` | Repair services, price ranges, and turnaround times |
| `src/pages/AboutPage.tsx` | About Us text and highlights |
| `src/pages/ContactPage.tsx` | Address, phone, email, hours |

### Adding a laptop

Open `src/data/laptops.ts` and add an entry to the array:

```ts
{
  id: 10,                          // unique number
  brand: 'HP',
  model: 'ProBook 450 G8',
  processor: 'Intel Core i5-1135G7',
  ram: '8 GB',
  storage: '256 GB SSD',
  display: '15.6" FHD',
  price: 15000,                    // price in Philippine Peso
  condition: 'Good',               // 'Excellent' | 'Good' | 'Fair'
  gradient: 'from-sky-600 to-sky-900',  // Tailwind gradient classes
},
```

### Adding a repair service item

Open `src/data/repairs.ts` and add to the relevant category's `items` array:

```ts
{ name: 'USB Port Repair', priceRange: '₱300 – ₱800', turnaround: 'Same day' },
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Build tool and dev server |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first styling |
| [React Router v6](https://reactrouter.com/) | Client-side routing (HashRouter) |
| [react-helmet-async](https://github.com/staylor/react-helmet-async) | Per-page SEO meta tags |
| [gh-pages](https://github.com/tschaub/gh-pages) | GitHub Pages deployment |
