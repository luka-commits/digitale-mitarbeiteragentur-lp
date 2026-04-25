# Digitale Mitarbeiteragentur — Design System

Design-Tokens und Komponenten-Specs für die LP. Identisch geforkt von Pocket-CEO-Agency-LP — Tokens funktionieren brand-agnostisch. Wenn Felipe eigene Brand-Farben oder Typo festlegt, werden die Variablen unten überschrieben; Komponenten-Logik bleibt.

---

## Design Philosophy

**Editorial Enterprise.** Light, confident, typography-led. Premium without being sterile. Warm enough to feel founder-led, restrained enough to feel enterprise-credible.

Three non-negotiables:
1. **Typography does the heavy lifting** — not color, not illustration
2. **Whitespace is a feature** — density signals cheapness
3. **Texture over gradients** — subtle grain keeps it human, not corporate-SaaS

---

## Color System

**Status:** Palette aus Pocket-CEO-Fork übernommen (Navy + Burnt Orange). Wenn Felipe finale Brand-Assets hat, wird das Palette hier ersetzt — alle LP-Tokens greifen zentral aus `colors_and_type.css`. Navy + Burnt Orange ist als Platzhalter sinnvoll (Bloomberg/HBR-Anmutung, restrained angewendet).

### Core palette

| Token | Hex | Role |
|---|---|---|
| `--base` | `#FAFAF7` | Primary background — off-white, slightly warm |
| `--surface` | `#F0EEE8` | Card backgrounds, section dividers |
| `--ink` | `#0A0A0A` | Primary text, headlines |
| `--ink-soft` | `#4A4A4A` | Body text, secondary |
| `--ink-mute` | `#8A8A8A` | Captions, metadata, micro-copy |
| `--navy` | `#153AA1` | **Signature** — CTAs, stats, eyebrows, icons |
| `--navy-dark` | `#0F2D7A` | Button hover, emphasis states |
| `--navy-tint` | `#E8EDF8` | Subtle tag backgrounds, hover fills |
| `--orange` | `#D7620F` | **Accent — sparse only.** Max 1–2 moments per page |
| `--ink-invert` | `#FAFAF7` | Text on dark sections |
| `--dark-band` | `#00185E` | Final CTA section (deep navy, matches PDF cover system) |

### Usage rules

- **Base / Surface / Ink** carry 95% of the page
- **Navy** is the workhorse accent — all CTAs, stat numbers, eyebrow labels, icon strokes, key highlights
- **Orange** is a ceremonial accent — appears **1–2 times per page maximum**. Use it to mark a brand-moment (logo dot, underline on a key word, single stat highlight). Never as a button background, never as body-copy color.
- **Dark Band (`#00185E`)** reserved for the final CTA section.
- **No gradients.** No shadows beyond `1px / 2% opacity` subtle card separation.

### Orange placement rules (strict)

The ONE orange element on a given page should be the most intentional mark on that page. Candidates:
- Ein Unterstrich auf einem einzelnen Schlüsselwort in der Hero-Headline
- Eine einzelne Kennzahl im Metric-Strip
- Das Arrow-Icon im Final-CTA
- Der Logo-Akzent (wenn finales Logo einen Farb-Akzent vorsieht)

Pick ONE of these per page. Never two simultaneously on the same viewport.

### Forbidden

- Any third signature color
- Gradient backgrounds
- Orange on large surfaces (backgrounds, buttons, section fills)

---

## Typography

### Font stack

| Role | Font | Source | Weight used |
|---|---|---|---|
| Display | **General Sans** | Fontshare (free) | 500, 600, 700 |
| Body | **Inter** | Google Fonts (free) | 400, 500, 600 |
| Mono | **JetBrains Mono** | Google Fonts (free) | 400, 500 |

**Upgrade path (paid):** Swap General Sans → **Söhne** if budget allows (~$350 license). Söhne adds subtle sophistication. Not required to launch.

### Type scale

| Name | Size (desktop) | Size (mobile) | Line-height | Weight | Font |
|---|---|---|---|---|---|
| Display XL | 96px | 56px | 1.02 | 600 | Display |
| Display L | 72px | 44px | 1.05 | 600 | Display |
| Display M | 48px | 34px | 1.1 | 600 | Display |
| H1 | 40px | 30px | 1.15 | 600 | Display |
| H2 | 32px | 26px | 1.2 | 600 | Display |
| H3 | 24px | 20px | 1.3 | 500 | Display |
| Body L | 20px | 18px | 1.5 | 400 | Body |
| Body | 16px | 16px | 1.6 | 400 | Body |
| Body S | 14px | 14px | 1.5 | 400 | Body |
| Caption | 13px | 13px | 1.4 | 400 | Body |
| Eyebrow | 12px | 12px | 1.3 | 500 | **Mono**, tracked +0.12em, UPPERCASE |
| Stat | 14px | 14px | 1.4 | 500 | Mono |

### Rules

- **Display headlines never italic.** Use weight for emphasis.
- **Eyebrows always Mono + tracked + uppercase.** Signature move — keep consistent.
- **Stats always Mono.** Numbers get their own typographic language.
- **Line length max 64ch** for body copy. No walls of text.
- **Weight-contrast > size-contrast.** A 600 headline next to a 400 body does more than two different sizes.

---

## Spacing / Layout

### Grid
- **Max content width:** 1280px
- **Gutters:** 24px mobile, 48px desktop
- **Column system:** 12-col desktop, 4-col mobile

### Spacing scale (all values in px)
```
2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160
```

### Section padding (vertical)
- Desktop: `128px top/bottom` for major sections, `96px` for lighter ones
- Mobile: `80px top/bottom` for major, `64px` for lighter

### Whitespace principle
**If a section feels dense, remove a row. Don't optimize for scroll length — optimize for clarity per scroll-inch.**

---

## Components

### Button — Primary
```
Background: --navy
Text: --ink-invert
Padding: 14px 24px
Border-radius: 6px
Font: Inter 500, 16px
Hover: background --navy-dark, transform: translateY(-1px)
Active: transform: translateY(0)
Transition: 150ms ease
```

### Button — Ghost
```
Background: transparent
Text: --ink
Border: 1.5px solid --ink
Padding: 13px 23px (match primary visually)
Border-radius: 6px
Font: Inter 500, 16px
Hover: background --ink, text --ink-invert
```

### Button — Ghost on Dark
```
Same as Ghost but:
Text: --ink-invert
Border: 1.5px solid --ink-invert
Hover: background --ink-invert, text --ink
```

### Card (generic content)
```
Background: --surface
Border: 1px solid rgba(10,10,10,0.06)
Border-radius: 8px
Padding: 32px (desktop) / 24px (mobile)
Hover: border-color rgba(10,10,10,0.15), transition 200ms
```

### Metric Block
```
Stat number: Display L, --navy, JetBrains Mono alternative for pure number feel
Label: Caption, --ink-mute, uppercase, tracked
Example:
  24/7
  VERFÜGBAR
```

### Eyebrow label
```
Font: JetBrains Mono 12px 500
Color: --navy
Letter-spacing: 0.12em
Text-transform: uppercase
Margin-bottom: 16px (before headline)
```

### Tag pill (for capability lists)
```
Background: --navy-tint
Text: --navy-dark
Padding: 4px 10px
Border-radius: 4px
Font: Inter 500, 13px
```

### FAQ accordion
```
Border-bottom: 1px solid rgba(10,10,10,0.08)
Padding: 24px 0
Question: H3 weight, --ink
Answer: Body L, --ink-soft, 16px margin-top
Icon: + / − in --navy, 20px
```

---

## Imagery

### Photography
- **Founder/team photos:** editorial black-and-white, natural light, candid-professional (not stock-studio). Face + shoulders, shot at waist-up for large-format display.
- **Case study heroes:** dark, editorial, industrial/office-contextual — never stock office-photography.
- **No smiling-team-in-meeting-room** stock.

### Illustrations
- **No custom illustrations** on Master Page 1. They'd fight the editorial-enterprise tone.
- **System diagrams** (for case studies, process) are ok — clean, monochrome, technical. Like wireframe sketches.

### Texture
- **Grain overlay** on hero background. SVG noise filter, 4% opacity. Creates warmth without busyness.

```html
<svg style="position:absolute; inset:0; width:100%; height:100%; opacity:0.04; pointer-events:none;">
  <filter id="noise">
    <feTurbulence baseFrequency="0.85" numOctaves="2" seed="7"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)"/>
</svg>
```

### Icons
- **Lucide icons** (lucide.dev) — free, consistent, monoline
- Default stroke: 1.5px, color `--ink` or `--navy` based on context
- Size: 20px body, 24px headlines, 32px feature-callouts

---

## Motion

- **Subtle only.** No hero video playing on autoload. No particle effects.
- **Fade-in-on-scroll** for section reveals (200–400ms, ease-out)
- **Button hover:** 1px Y-shift, 150ms
- **Accordion:** height transition 250ms ease
- **No parallax.** Messes with grain texture + feels dated.

---

## Accessibility

- **Contrast:** Ink on Base = 19.3:1 (AAA). Navy on Base = 6.1:1 (AA). Check Navy-on-White (#FFFFFF) too if ever used on product UI.
- **Focus states:** 2px outline `--navy`, 2px offset, visible on all interactive elements
- **Min tap target:** 44x44px (buttons, accordion triggers)
- **Prefers-reduced-motion:** disable fade-ins, accordion transitions still animate height

---

## File Conventions

- All CSS uses custom properties (tokens above)
- Tailwind config extends these tokens, nothing hardcoded in JSX/HTML
- Images: SVG for logos/icons, WebP for photography (fallback JPG), MP4/HLS for video (never GIF)

---

## Upgrade Paths (v2, post-launch)

1. **Söhne license** → replace General Sans (~$350)
2. **Custom illustration set** (3–5 hero marks) — if we want to stand out beyond the editorial-typography lane
3. **Motion polish** — Lottie for process section, GSAP for hero entrance
4. **Dark-mode variant** — only if engagement data justifies it
