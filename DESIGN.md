# L'Essence — Design System

## Design Read

**Reading this as:** premium-consumer e-commerce (fragrances) for design-conscious buyers, with a luxury-minimalist language, leaning toward Tailwind v4 + Geist + intentional spatial-motion.

## Three Dials

- **DESIGN_VARIANCE: 7** — Premium consumer, clean but not generic
- **MOTION_INTENSITY: 6** — Fluid hover/scroll, not cinematic
- **VISUAL_DENSITY: 3** — Airy, gallery-like, product-first

## Typography

### Stack
- **Display / Headings:** `Geist` (weight 600-700)
- **Body:** `Geist` (weight 400-500)
- **Mono (prices / SKU):** `Geist Mono`

### Scale
- Hero H1: `text-5xl md:text-6xl lg:text-7xl` (max 6 words)
- Section H2: `text-3xl md:text-4xl`
- Body: `text-base` (16px), `leading-relaxed`, `max-w-[65ch]`
- Captions / Labels: `text-sm`, `text-muted-foreground`

### Rules
- No serif (premium ≠ forced editorial)
- `text-wrap: balance` on h1-h3
- Italic used only within same family, never serif injection
- Tracking: `tracking-tight` on display, `tracking-wide` on uppercase labels

## Color

### Strategy: Cold Luxury
- Silver-grey + deep charcoal + single saturated accent
- Body bg: `zinc-50` (true neutral, not cream/beige/warm-paper)
- Surface: `white`
- Ink: `zinc-950`
- Muted: `zinc-500`
- **Accent:** `emerald-600` (rich, saturated, memorable — NOT purple/blue glow)
- Dark mode: `zinc-950` bg, `zinc-100` text

### Contrast
- Body text ≥ 4.5:1 against bg
- Buttons: AA minimum, tested before ship
- No pure black (#000) or pure white (#fff)

## Shape

- **Corner radius:** consistent 12px for cards, 9999px (pill) for buttons/inputs
- No mixed system: cards 12px, buttons pill, inputs pill
- Shadows: tinted to bg hue, never pure black

## Layout

- **Hero:** min-h-[100dvh], NOT h-screen
- **Max width:** `max-w-[1400px] mx-auto`
- **Grid over flex-math:** always CSS Grid for 2D
- **Asymmetric variance:** split layouts, offset padding, not all centered
- **Eyebrow restraint:** max 1 per 3 sections
- **Section repetition ban:** each section uses a different layout family

## Motion

- **Library:** Motion (`framer-motion`) + native CSS transitions
- **Reduced motion:** mandatory `useReducedMotion()` check
- **No infinite loops on cards**
- **Hover on cards:** animate border/shadow/background, NEVER the image
- **Scroll reveals:** `whileInView` with `viewport={{ once: true }}`
- **Spray animations:** contextual, family-color-mapped, celebratory on add-to-cart

## Component Rules

- Cards ONLY when elevation communicates hierarchy
- Form labels above input
- No placeholder-as-label
- Loading: skeletal, not spinner
- Empty states: beautifully composed
- One accent color per page (emerald), locked

## Asset Strategy

- Hero needs a real visual (product photography or generated)
- Logo wall = real SVG logos only, no text wordmarks
- Bento grids: 2-3 cells need real visual variation (image, gradient, pattern)
