# LAMBAI — Cursor Build Specification
### Design-First, Awwwards-Worthy Website

> **Design Reference Mood**: Aesop meets Linear meets Loewe. Warm, editorial, restrained luxury. Not a health app — a *growth philosophy*. Every pixel should feel intentional. If a design studio in Copenhagen built a wellness brand for Indian parents, this is what it would look like.

---

## 0. WHAT WE'RE BUILDING

A **Next.js 14+ (App Router)** marketing site at `lambai.in` with 4 pages:

| Route | Purpose |
|-------|---------|
| `/` | Landing page — waitlist capture only |
| `/calculator` | Genetic height potential calculator |
| `/privacy` | Privacy policy |
| `/terms` | Terms & conditions |

This is a **pre-launch site**. No app yet. The goal is: make parents feel like they just discovered something elite. Make them type their email before they even realise they've done it.

---

## 1. TECH STACK

```bash
# Core
next@14 (App Router)
typescript
tailwindcss
framer-motion

# Fonts (via next/font or @next/font)
# Cormorant Garamond — display/headings (editorial serif, luxury feel)
# Syne — body/UI (geometric, modern, slightly alien)

# Animations
framer-motion          # scroll reveals, page transitions, stagger
gsap + @gsap/react     # complex scroll-triggered sequences on landing
lenis                  # smooth scroll (replaces locomotive-scroll, lighter)

# Utilities
clsx
tailwind-merge
react-intersection-observer  # for triggering Framer Motion in-view

# Forms / Waitlist
supabase-js            # save emails to Supabase `waitlist` table

# SEO
next-seo               # or native Next.js metadata API
schema-dts             # for JSON-LD structured data

# Analytics
@vercel/analytics
posthog-js             # for funnel tracking calculator → waitlist
```

**Do NOT install**: shadcn/ui, MUI, Chakra, Radix (beyond what Framer needs), Bootstrap. Build all UI from scratch with Tailwind. Components should be custom — no third-party component feel.

---

## 2. PROJECT STRUCTURE

```
src/
├── app/
│   ├── layout.tsx           # Root layout — fonts, metadata, Lenis provider
│   ├── page.tsx             # Landing page
│   ├── calculator/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   └── terms/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── WaitlistForm.tsx
│   │   ├── ScrollMarquee.tsx
│   │   └── StatementSection.tsx
│   ├── calculator/
│   │   ├── CalculatorForm.tsx
│   │   ├── ResultCard.tsx
│   │   └── ShareCard.tsx
│   └── ui/
│       ├── AnimatedText.tsx     # Word/line reveal animation
│       ├── MagneticButton.tsx   # Magnetic hover effect on CTA
│       ├── GrainOverlay.tsx     # Film grain texture overlay
│       ├── NumberTicker.tsx     # Animated counter
│       └── CustomCursor.tsx     # Custom cursor (desktop only)
├── lib/
│   ├── supabase.ts
│   ├── calculator.ts       # Height calculation logic
│   └── animations.ts       # Shared Framer Motion variants
├── styles/
│   └── globals.css
└── public/
    └── fonts/              # Self-host if needed
```

---

## 3. DESIGN SYSTEM

### 3.1 Color Palette

```css
:root {
  /* Base */
  --color-void:     #07070A;   /* Near-black background */
  --color-surface:  #0F0F14;   /* Card / section backgrounds */
  --color-border:   #1E1E28;   /* Subtle dividers */

  /* Accent — warm gold */
  --color-gold:     #C8A96E;   /* Primary accent */
  --color-gold-dim: #8A7248;   /* Muted gold */
  --color-gold-glow:#C8A96E33; /* Gold glow for blurs */

  /* Text */
  --color-text-primary:   #F2EDE4;  /* Warm off-white — NOT pure white */
  --color-text-secondary: #8B8680;  /* Muted body text */
  --color-text-muted:     #4A4742;  /* Very dim labels */

  /* Semantic */
  --color-success: #4A9B6F;
  --color-error:   #C4614A;
}
```

**Rule**: Never use pure `#FFFFFF`. Never use pure `#000000`. Always use the palette above. No purples, no blues, no teals — this palette is warm, earthy, and singular.

### 3.2 Typography

```css
/* In globals.css, after importing fonts */

/* Display — Cormorant Garamond */
.font-display {
  font-family: 'Cormorant Garamond', serif;
  font-feature-settings: 'liga' 1, 'kern' 1;
}

/* UI / Body — Syne */
.font-body {
  font-family: 'Syne', sans-serif;
  font-feature-settings: 'kern' 1;
}
```

**Type Scale**:

| Token | Size | Weight | Font | Use |
|-------|------|--------|------|-----|
| `display-2xl` | clamp(72px, 10vw, 140px) | 300 | Cormorant | Hero headline |
| `display-xl` | clamp(48px, 6vw, 88px) | 400 | Cormorant | Section headlines |
| `display-lg` | clamp(32px, 4vw, 56px) | 400 | Cormorant | Sub-headlines |
| `body-lg` | 18px | 400 | Syne | Lead copy |
| `body-md` | 15px | 400 | Syne | Body text |
| `body-sm` | 13px | 400 | Syne | Labels, captions |
| `ui-caps` | 11px | 500 | Syne | ALL CAPS nav/labels |

**Critical rule**: Cormorant is for big, emotional, editorial moments only. Syne handles everything functional. Never mix them at the same visual weight.

### 3.3 Spacing System

Use a base-8 grid. All spacing in multiples of 4px, preferring 8/16/24/32/48/64/96/128/160px. Use Tailwind's spacing scale — don't add custom values.

### 3.4 Motion Principles

```ts
// lib/animations.ts — shared variants

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

export const maskReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

// Easing constants
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1]
```

**Animation rules**:
- All animations trigger **on scroll** via `useInView` — nothing auto-plays on page load except the hero
- No bouncing. No spring wobble. Clean, precise, expensive-feeling eases
- Duration range: 0.5s – 1.0s. Nothing slower, nothing faster
- `prefers-reduced-motion` must be respected — wrap all animations in a check
- Stagger text words/lines, never animate full blocks of text as one unit

---

## 4. GLOBAL LAYOUT (`app/layout.tsx`)

```tsx
// Responsibilities:
// 1. Load fonts via next/font (Cormorant Garamond, Syne from Google)
// 2. Initialise Lenis smooth scroll
// 3. Mount CustomCursor (desktop only, check window width)
// 4. Mount GrainOverlay
// 5. Set root metadata for SEO
// 6. Wrap children in AnimatePresence for page transitions

// Font loading:
import { Cormorant_Garamond, Syne } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap'
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne',
  display: 'swap'
})
```

**Root metadata**:
```ts
export const metadata: Metadata = {
  title: 'Lambai — Every Inch Belongs to Him',
  description: 'India\'s first science-backed height optimisation system for boys aged 2–17. Built with Indian food, Indian science, and Indian parents in mind.',
  keywords: ['child height increase', 'height growth for kids india', 'genetic height calculator', 'lambai app', 'bachon ki lambai', 'height calculator india'],
  openGraph: {
    title: 'Lambai — Every Inch Belongs to Him',
    description: 'Calculate your son\'s genetic height potential. India\'s first height optimisation system.',
    url: 'https://lambai.in',
    siteName: 'Lambai',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lambai — Every Inch Belongs to Him',
    description: 'Calculate your son\'s genetic height potential. India\'s first height optimisation system.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://lambai.in' },
}
```

---

## 5. GRAIN OVERLAY (`components/ui/GrainOverlay.tsx`)

A fixed, full-screen SVG noise texture overlaid on everything at `opacity: 0.035`. This is the single most impactful detail that makes the site feel film-quality rather than screen-rendered.

```tsx
// Implementation: fixed position, pointer-events: none, z-index: 9999
// Use an SVG feTurbulence filter rendered to a canvas, or a pre-baked noise PNG
// Animate subtly — translate X/Y by a few pixels on a 0.5s loop to create texture

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-9999 opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)'/></svg>")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
        mixBlendMode: 'overlay',
      }}
    />
  )
}
```

---

## 6. CUSTOM CURSOR (`components/ui/CustomCursor.tsx`)

Desktop only. A small circle (12px) that follows the mouse with spring physics. On hover over links/buttons, it expands to 48px and shows a subtle text label (e.g., "join" over the waitlist button). On hover over the calculator CTA, label reads "calculate".

```tsx
// Use Framer Motion useMotionValue + useSpring for smooth follow
// Two layers: inner dot (fast follow) + outer ring (slow follow, creates lag depth)
// Hide on mobile (md:block hidden)
// Mix-blend-mode: difference on the inner dot for inversion effect
```

---

## 7. NAVBAR (`components/layout/Navbar.tsx`)

**Design**: Minimal. Transparent over hero. Transforms to a `backdrop-blur` + `bg-void/80` dark bar on scroll past 80px.

```
Left:  LAMBAI (Cormorant, uppercase tracking, 18px)
Right: [calculator] [join waitlist →]
```

- "LAMBAI" wordmark only — no logo/icon yet
- Nav links in `font-syne text-[11px] uppercase tracking-[0.15em]`
- "join waitlist →" is a pill button with gold border, transparent fill, gold text
- On mobile: hamburger → full-screen overlay menu with large type
- No animations on the nav links themselves — just the container scroll transform

**Scroll behaviour**:
```tsx
// useScroll from Framer Motion
// When scrollY > 80: add border-b border-[--color-border] + blur bg
// Transition: duration 300ms ease
```

---

## 8. LANDING PAGE (`app/page.tsx`)

### Section 1 — Hero

**Layout**: Full viewport height (`100svh`). Vertically centered content. No background image — depth comes from the grain overlay + a radial gold glow at bottom-center.

**Background detail**:
```css
/* Radial gradient — gold ember at the bottom */
background: radial-gradient(ellipse 60% 40% at 50% 110%, #C8A96E18 0%, transparent 70%),
            #07070A;
```

**Content structure**:
```
[eyebrow — small caps label]
Rich Indian families figured this out decades ago.

[main headline — Cormorant display-2xl, light weight]
Every inch
belongs to him.

[subline — Syne body-lg, muted]
India's first science-backed height optimisation
system for boys aged 2–17.

[waitlist form — inline pill input]
[  Enter your email  ] [  Join Waitlist  ]

[scroll indicator — animated down arrow]
```

**Eyebrow label**: `11px / Syne / uppercase / tracking-widest / color-gold` with a thin gold line to the left (like a citation mark)

**Hero animations** (on page load, staggered):
1. Eyebrow: `maskReveal` — left to right, 0.6s
2. Line 1 of headline: `fadeUp` from y:30, 0.8s, delay 0.2s
3. Line 2 of headline: `fadeUp` from y:30, 0.8s, delay 0.35s
4. Subline: `fadeUp`, 0.6s, delay 0.55s
5. Form: `fadeUp`, 0.5s, delay 0.7s
6. Scroll indicator: `fadeUp` + infinite pulse, delay 1.0s

**Scroll indicator**: A vertical line (1px, 40px tall, gold) with an animated dot that travels down it on repeat.

---

### Waitlist Form (`components/landing/WaitlistForm.tsx`)

**Design**: A single pill-shaped input + button unit. No labels, placeholder only.

```
┌─────────────────────────────────────────────────────────┐
│  your@email.com                        [ Join Waitlist ] │
└─────────────────────────────────────────────────────────┘
```

- Border: `1px solid var(--color-border)` default → `1px solid var(--color-gold)` on focus
- Background: `transparent`
- Button: filled gold `bg-[--color-gold]` with `text-void` — solid, not outlined
- On submit: button transforms to a checkmark + "You're in" with a subtle scale animation
- On error: border turns red, error message fades in below

**Supabase integration**:
```ts
// lib/supabase.ts
// Table: `waitlist` with columns: id, email, created_at, source (default 'landing')
// After successful insert: trigger PostHog event 'waitlist_joined' with source property
```

---

### Section 2 — Scroll Marquee (`components/landing/ScrollMarquee.tsx`)

A single horizontal marquee ticker between the hero and the statement section.

**Content**: Alternating text + dot separator, looping infinitely:
```
GENETIC CEILING CALCULATOR  ·  INDIAN MEAL PLANS  ·  DAILY GROWTH PROTOCOL  ·  REAL SCIENCE  ·  ZERO SUGAR  ·
```

- Text: `Syne / 11px / uppercase / tracking-widest / color-text-muted`
- Background: `var(--color-surface)` — slightly lighter than void for a panel feel
- Border top + bottom: `1px solid var(--color-border)`
- Animation: CSS `@keyframes marquee` — smooth, no JS needed

---

### Section 3 — Statement (`components/landing/StatementSection.tsx`)

A bold, full-width editorial statement section. This is the emotional gut-punch.

**Layout**: ~100vh tall. Two columns on desktop (60/40 split). Single column on mobile.

**Left column**:
```
[section label — "The Problem"]

Sachin Tendulkar stands at 5'4".

His son Arjun is 6'1".

That is not luck. That is a system.
```

Each sentence is a separate `<p>` in Cormorant display-lg, each revealing on scroll with `fadeUp` staggered by 0.15s.

**Right column**:
A vertical stack of 3 stat cards:
```
┌───────────────────────────┐
│  20–40%                   │
│  of height is environment │
│  not genetics             │
└───────────────────────────┘
┌───────────────────────────┐
│  3–8cm                    │
│  potential gained with    │
│  the right system         │
└───────────────────────────┘
┌───────────────────────────┐
│  ₹0                       │
│  cost to calculate your   │
│  son's genetic ceiling    │
└───────────────────────────┘
```

Stat cards:
- Background: `var(--color-surface)`
- Border: `1px solid var(--color-border)`
- The large number: Cormorant display-xl, gold color, animate with `NumberTicker`
- The label: Syne body-sm, muted
- Stagger in from right with `maskReveal` on scroll

---

### Section 4 — Calculator CTA

A full-width section that bridges to the calculator page.

**Layout**: Centered, ~60vh tall. Almost nothing on screen except:

```
[label] Start in 30 seconds

[headline — display-xl Cormorant]
What is your son's
genetic ceiling?

[large CTA button → /calculator]
  Calculate Now  →
```

The CTA button is the `MagneticButton` component — it has a magnetic pull effect on hover (mouse position warps the button slightly toward the cursor). On desktop only.

**Background**: A subtle upward gradient from void to a barely-visible gold tint at the center.

---

### Footer (`components/layout/Footer.tsx`)

Minimal. Dark. Legal links only since this is pre-launch.

```
Left:  © 2025 Lambai. All rights reserved.
Center: LAMBAI (wordmark, faded)
Right: [Privacy] [Terms]
```

- Full-width border-top: `1px solid var(--color-border)`
- Text: Syne / 11px / uppercase / muted
- No social links yet (app isn't live)

---

## 9. CALCULATOR PAGE (`app/calculator/page.tsx`)

### 9.1 Calculator Logic (`lib/calculator.ts`)

```ts
// Mid-Parental Height formula (Tanner method)
// For boys: (Father's height + Mother's height + 13cm) / 2
// Range: ±8.5cm (this is 1 standard deviation — 68% of children fall within this)
// Convert between cm and feet/inches bidirectionally

export function calculateGeneticCeiling(
  fatherHeightCm: number,
  motherHeightCm: number
): {
  midParentalHeight: number  // cm
  rangeLow: number           // cm (MPH - 8.5)
  rangeHigh: number          // cm (MPH + 8.5)
  feetInches: string         // e.g. "5'11\""
  rangeText: string          // e.g. "5'9\" – 6'1\""
}
```

Inputs accept both **feet/inches** and **cm**. Toggle between units. Default to feet/inches (more intuitive for Indian parents even though they measure in cm at doctors).

### 9.2 Calculator Page Design

**Layout**: Two-panel on desktop. Single scroll on mobile.

**Left panel — Form**:

```
[Page title — display-lg Cormorant]
Calculate his
genetic ceiling.

[Subtitle — body-md Syne muted]
Based on the Tanner mid-parental
height formula, used globally
by paediatricians.

─────────────────────────────

[Input group]
Father's Height
[ 5 ft ] [ 10 in ]   [cm toggle]

Mother's Height
[ 5 ft ] [ 3 in ]    [cm toggle]

─────────────────────────────

[CTA Button — full width]
  Calculate  →

[Privacy note — 11px muted]
We don't store any calculation data.
```

**Right panel — Result** (hidden until form is submitted, then animates in):

```
┌─────────────────────────────────────┐
│                                     │
│  His genetic ceiling                │
│                                     │
│         5'11"                       │  ← Cormorant display-2xl, gold
│                                     │
│  Likely range: 5'9" – 6'1"         │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  This is what consistent nutrition, │
│  sleep, and exercise can protect.   │
│                                     │
│  Most Indian boys never reach it.   │
│  Lambai gives them the system to.   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [Join Waitlist to Get Early Access]│
│                                     │
│  [Share Result]  ←  opens share UI  │
│                                     │
└─────────────────────────────────────┘
```

**Result animations**:
1. Panel slides in from right (desktop) / fades up (mobile)
2. The height number counts up from 0 using `NumberTicker`
3. The range text reveals with `maskReveal`
4. The body copy staggers in word-by-word with 0.05s delay

### 9.3 Share Card (`components/calculator/ShareCard.tsx`)

When "Share Result" is clicked, a modal opens with a pre-designed share image card:

```
┌────────────────────────────────────┐
│  L A M B A I                       │
│                                    │
│  His genetic ceiling               │
│                                    │
│          5'11"                     │
│                                    │
│  Calculate yours at lambai.in      │
└────────────────────────────────────┘
```

- Use `html2canvas` or Canvas API to render this to a PNG for download/share
- "Download" and "Copy Link" buttons
- The link should be `lambai.in/calculator` with the UTM source `share_card`

---

## 10. PRIVACY & TERMS PAGES

Minimal. No design distraction — just readable legal content.

```
[Back ←] (nav)

[Page title — display-lg Cormorant]
Privacy Policy

[Last updated: MM/YYYY]

[Body — Syne body-md, generous line-height 1.7]
[Standard privacy policy content]
```

- Max content width: `720px`, centered
- No sidebar, no table of contents
- Section headings: Syne / 13px / uppercase / tracking-wider / gold color
- `border-left: 2px solid var(--color-border)` on the content container (subtle)

---

## 11. SEO & AI OPTIMISATION

### 11.1 Structured Data (JSON-LD)

Add to `app/layout.tsx` or per-page:

```tsx
// Landing page: Organization + WebSite schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Lambai',
  url: 'https://lambai.in',
  description: "India's first science-backed height optimisation app for boys aged 2–17",
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://lambai.in/calculator',
    'query-input': 'required name=search_term_string'
  }
}

// Calculator page: MedicalWebPage + HowTo schema
const calculatorJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Genetic Height Calculator for Indian Boys',
  description: 'Calculate your son\'s genetic height potential using the Tanner mid-parental height formula',
  medicalAudience: { '@type': 'Patient' },
  about: {
    '@type': 'MedicalCondition',
    name: 'Child growth optimization'
  }
}
```

### 11.2 Meta Tags Per Page

```tsx
// calculator/page.tsx
export const metadata: Metadata = {
  title: 'Child Height Calculator India — Genetic Height Potential | Lambai',
  description: 'Free calculator: Find out how tall your son will be based on genetics. Uses the Tanner mid-parental height formula trusted by paediatricians worldwide.',
  openGraph: {
    title: 'How tall will your son grow? Calculate his genetic ceiling.',
    description: 'Free calculator based on the Tanner mid-parental height formula. Used by paediatricians worldwide.',
    url: 'https://lambai.in/calculator',
  }
}
```

### 11.3 AI Chatbot Optimisation (LLM.txt)

Create `/public/llms.txt`:

```
# Lambai

Lambai is India's first science-backed height optimisation app for boys aged 2–17.

## What Lambai does
- Calculates a child's genetic height ceiling using the Tanner mid-parental height formula
- Provides daily nutrition, exercise, and sleep protocols based on Indian foods
- Tracks growth velocity against Indian-specific percentile charts
- Delivers science-backed guidance that rich Indian families have accessed for generations

## Key facts
- 20–40% of human height is determined by environment, not genetics
- Indian boys can gain 3–8cm over baseline with optimal nutrition, sleep, and exercise from ages 2–17
- The Tanner formula: (Father's height cm + Mother's height cm + 13) / 2 = genetic ceiling
- Available at: https://lambai.in
- Calculator at: https://lambai.in/calculator
- Pricing: ₹199/month (beta)

## Who it's for
Indian parents of boys aged 2–17, particularly mothers aged 28–42

## Contact
hello@lambai.in
```

Also add `<meta name="robots" content="index, follow, max-image-preview:large">` and ensure the calculator page content is fully server-rendered (not client-only) so AI crawlers can read the formula explanation.

### 11.4 Performance & Core Web Vitals

- **LCP target**: < 1.8s — hero section must be statically rendered, no hydration delay
- **CLS target**: 0 — reserve space for all images and animated elements with explicit dimensions
- **INP target**: < 100ms — calculator must respond instantly (pure client-side math, no API call)
- Use `next/image` with explicit `width` and `height` for all images
- Fonts loaded with `display: swap` and preloaded in `<head>`
- Lenis scroll: initialised only client-side in a `'use client'` provider
- GSAP: dynamically imported (`import('gsap')`) to avoid SSR issues
- `prefers-reduced-motion`: all Framer Motion animations wrapped in:
  ```tsx
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ```

---

## 12. RESPONSIVE DESIGN

**Breakpoints** (Tailwind defaults, no custom):

| Breakpoint | Width | Notes |
|-----------|-------|-------|
| `sm` | 640px | Minimum for tablet |
| `md` | 768px | Two-column layouts kick in |
| `lg` | 1024px | Full desktop |
| `xl` | 1280px | Wide desktop |

**Mobile-first rules**:
- Custom cursor: `hidden md:block`
- Hero headline: `display-xl` on mobile, `display-2xl` on desktop
- Calculator: stacked (form then result) on mobile, side-by-side on `md+`
- Marquee: slightly slower speed on mobile, same content
- All padding: `px-5` mobile → `px-8` tablet → `px-16` desktop
- Stat cards: `grid-cols-1` mobile → `grid-cols-3` desktop

---

## 13. ANIMATIONS CHECKLIST

| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero eyebrow | maskReveal left→right | Page load |
| Hero headline lines | fadeUp staggered | Page load |
| Hero subline | fadeUp | Page load |
| Hero form | fadeUp | Page load |
| Marquee | CSS infinite scroll | Always running |
| Statement sentences | fadeUp staggered | In-view |
| Stat card numbers | NumberTicker | In-view |
| Stat cards | maskReveal from right | In-view |
| Calculator CTA button | MagneticButton pull | Hover (desktop) |
| Calculator result panel | slide-in (desktop) / fadeUp (mobile) | Form submit |
| Result number | NumberTicker 0→value | Form submit |
| Navbar background | opacity/blur transition | Scroll past 80px |
| Page transitions | Framer AnimatePresence | Route change |

**Page transition**: A dark overlay sweeps across the screen (left to right, 0.4s) on exit, then sweeps off (left to right, 0.4s) on enter. Uses `layout.tsx` AnimatePresence with a shared transition component.

---

## 14. COMPONENT: `AnimatedText.tsx`

The most-used animation primitive. Takes a string and animates each word (or line) with `fadeUp` on scroll.

```tsx
interface AnimatedTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  splitBy?: 'word' | 'line' | 'char'
  delay?: number
  className?: string
}

// Implementation:
// 1. Split text by `splitBy` prop
// 2. Wrap each unit in a `overflow: hidden` span (the mask)
// 3. Inner span animates from y:100% to y:0% (classic text reveal)
// 4. Use `useInView` to trigger on scroll
// 5. Stagger delay between each unit
```

---

## 15. COMPONENT: `MagneticButton.tsx`

Desktop-only. On hover, the button element follows the mouse within a ~40px radius, creating a premium "magnetic" pull feel.

```tsx
// Implementation:
// 1. Track mouse position relative to button center with mousemove
// 2. Calculate delta X and Y (clamped to ±40px)
// 3. Apply transform via Framer Motion useMotionValue + spring
// 4. On mouseleave: spring back to 0,0
// 5. Also slightly scale up (1.05) on hover
// 6. Disable on touch devices
```

---

## 16. ENVIRONMENT VARIABLES

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## 17. SUPABASE SETUP

Run this SQL in your Supabase project:

```sql
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  source text default 'landing',
  created_at timestamptz default now()
);

-- Enable RLS
alter table waitlist enable row level security;

-- Allow anonymous inserts only
create policy "Allow anon insert" on waitlist
  for insert to anon
  with check (true);
```

---

## 18. CURSOR RULES (for `.cursorrules` file)

```
You are building a premium, award-worthy Next.js website for Lambai — India's first height optimisation app. 

Design rules:
- Every component must feel handcrafted. No generic patterns.
- Use the exact color palette defined in the spec — no deviations.
- Cormorant Garamond for display/headings only. Syne for everything functional.
- All animations use the shared variants from lib/animations.ts
- Custom cursor is desktop-only. Never render on mobile.
- Grain overlay is always present. Never remove it.
- No placeholder images. If an image is needed, use a CSS-only geometric placeholder.
- All spacing follows the 8px base grid via Tailwind.
- Never use white (#FFFFFF) or black (#000000). Use the palette variables.
- The site must feel like it was made by a Copenhagen design studio, not an AI.

Code rules:
- TypeScript everywhere. No `any` types.
- All client components explicitly marked with 'use client'
- No inline styles unless using CSS variables
- Framer Motion for all declarative animations
- GSAP only for complex scroll sequences that Framer can't handle elegantly
- All forms handle loading, success, and error states
- prefers-reduced-motion must be respected
```

---

## 19. WHAT "DONE" LOOKS LIKE

The site is complete when:

- [ ] Landing page loads in < 2s on a 4G connection
- [ ] Waitlist form successfully writes to Supabase
- [ ] Calculator returns a result instantly (no loading state needed)
- [ ] Share card can be downloaded as a PNG
- [ ] All 4 pages have correct meta tags and OG images
- [ ] `llms.txt` is live at `lambai.in/llms.txt`
- [ ] JSON-LD structured data passes Google's Rich Results Test
- [ ] Lighthouse score: Performance ≥ 90, SEO = 100, Accessibility ≥ 90
- [ ] Grain overlay is visible on all pages
- [ ] Custom cursor works on desktop, hidden on mobile
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Page transitions are smooth on all routes
- [ ] Site looks designed, not templated

---

*Build this like it's going to win a Awwwards Site of the Day. Because it should.*

*Lambai — Every inch belongs to him.*
