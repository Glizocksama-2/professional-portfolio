# Premium Design System Blueprint
This document serves as the absolute visual and technical blueprint for all high-end, responsive web applications built within this ecosystem.

---

## 1. Design Aesthetics & Color Palette

The core identity is a premium hybrid of the **Stitch Archetype** and **Swiss Industrial Telemetry**. 

### Core Palette
*   **Substrate (Backgrounds):** Pure Carbon Black (`#000000`) for premium entry heroes; transitioning to semi-transparent frosted overlays (`rgba(0,0,0,0.6)`) with a backdrop blur of `12px` (`backdrop-blur-md`) to reveal moving backgrounds.
*   **Ink (Text):** High-contrast off-white (`#F4F4F0` or `rgba(244, 244, 240, 0.9)`) for primary copy, and green off-white tint (`rgba(200, 220, 200, 0.6)`) for secondary subtext.
*   **Accent Color (Hazard Signal):** Acid Lime/Volt Green (`#d2ff00` or `#10B981` Emerald) used strictly for markers, tags, triggers, active borders, and highlights. **Neons/AI-purple gradients are banned.**
*   **Borders:** Fine, low-opacity green borders (`1px solid rgba(16, 185, 129, 0.1)`) separating layout containers.

---

## 2. Typography Guidelines

All displays and copy must respect clean, high-end tracking and font configurations.

*   **Display / Headings:**
    *   **Font Family:** Use `Outfit`, `Cabinet Grotesk`, `Geist`, or `Satoshi`. **Inter is strictly banned for display contexts.**
    *   **Weights:** Heavy/Black (`800` or `900`).
    *   **Letter Spacing:** Tight tracking (`-0.025em`).
    *   **Line Height:** Compact leading (`1.1`).
*   **Body Copy:**
    *   **Font Family:** Match the heading family (at weight `400`).
    *   **Letter Spacing:** Normal (`0em`).
    *   **Line Height:** Generous leading (`1.65`).
    *   **Width Constraints:** Set maximum paragraph width to `65ch` to guarantee readability.

---

## 3. Structural Layouts & Grid Architecture

Standard templates are rejected in favor of responsive, asymmetrical visual weight.

*   **Hero Blocks:** Left-aligned headers and splits only. **Center-aligned hero layouts are banned.**
*   **Feature Areas:** Use asymmetric Bento Grids or alternating rows with precise column counts (defined using CSS Grid instead of Flexbox math).
*   **Cards:** Rounded cards (`rounded-3xl` or `2.5rem` radius) with diffused shadows:
    *   **Shadow Definition:** Wide spread, `40px` blur, `-15px` offset.
    *   **Borders:** `1px` semi-transparent border matching the accent color.
*   **Viewports & Portals:** Display platforms and interactive showcases using 3D perspective grids (e.g. `ThreeDHoverGallery` with custom depths and aspect ratios).

---

## 4. Animation & Performance Standards

Interactive designs must feel alive through micro-animations while preserving a perfect Google Lighthouse performance index.

*   **TextRoll Animation:**
    *   Apply the staggered letter rolling hover animation (`TextRoll`) to nameplates, section headings, database statistics, and interactive buttons.
    *   Stripe all spaces `" "` into `"\u00a0"` (non-breaking space) inside custom string mappers to prevent character collapse in CSS block containers.
*   **WebGL / Shader Backdrops:**
    *   Always lazy-load 3D components using dynamic Next.js imports (`ssr: false`) to bypass SSR compilation errors.
    *   Cap 3D canvas rendering quality: `pixelDensity={0.5}` or lower.
    *   **Disable custom GPU grain shaders** (`grain="off"`) to reduce per-pixel math overhead.
*   **Ticker & Scroll Containment:**
    *   Every loop running on standard ticks (e.g. `gsap.ticker` or Canvas loops) **must be bound to an IntersectionObserver**. 
    *   Automatically pause loop rendering when the target container is scrolled out of the active viewport.

---

## 5. Quality & Copywriting Rules

*   **No Placeholders:** All content lists, user logs, names, and metrics must be organic, realistic industry data. Generic strings like "Acme", "Sarah Chan", or "John Doe" are banned.
*   **Banned AI Copywriting Clichés:** Never use words like *"Elevate"*, *"Seamless"*, *"Unleash"*, *"Next-Gen"*, *"Revolutionize"*, or *"Transform"*.
*   **Loading Indicators:** Standard spinning circles are banned. Use proportional skeletons with subtle horizontal shimmers exclusively.
*   **Responsive Multi-Device Rules:** Stack multi-column bento blocks vertically on screen sizes `< 768px`. Horizontals scroll indicators should never cause unexpected overflow.
