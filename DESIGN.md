# Design System & Style Guide

## Core Philosophy
- **Aesthetic:** "Sophisticated Dark Mode" / "Warm Industrial".
- **Vibe:** Focused, educational, minimalist, premium.
- **Inspiration:** Claude UI, Editorial coding blogs, Zen aesthetics.

## Color Palette (Tailwind Extended)

The design relies heavily on the `stone` scale for a warmer, more natural greyscale than standard `gray` or `slate`.

### Backgrounds
- **App Background:** `bg-stone-950` (#0c0a09) - Almost black, warm undertone.
- **Surface/Card:** `bg-stone-900` (#1c1917) or `bg-stone-900/40` (translucent).
- **Surface Highlight:** `bg-stone-800` (#292524).

### Text
- **Headings:** `text-stone-100` (#f5f5f4) or `text-stone-200`.
- **Body:** `text-stone-300` (#d6d3d1) - High readability without eye strain.
- **Muted/Meta:** `text-stone-500` (#78716c) - For labels, timestamps, hints.

### Accents & Interactables
- **Primary Action (Inverted):** `bg-stone-200` text `stone-950`. High contrast against the dark background.
- **Brand Accent:** Terracotta / Burnt Orange (`#c2410c`) - Used sparingly for emphasis.
- **Borders:** `border-stone-800` (subtle dividers) or `border-stone-700` (hover states).

## Typography

### Font Families
1.  **Sans (UI):** `Inter` - Clean, modern, high legibility. Used for body text, inputs, buttons.
2.  **Serif (Headings):** `Merriweather` - Adds an editorial/book-like feel. Used for H1, H2, and scenario descriptions.
3.  **Mono (Code):** `Fira Code` - Developer-focused. Used for code blocks, IDs.

### Hierarchy
- **H1 (Setup Title):** Serif, Light weight (`font-light`), Large (`text-4xl`+), `text-stone-100`.
- **H2 (Scenario):** Serif, Light weight, `text-xl`, `text-stone-200`.
- **Labels:** Sans, Bold, Uppercase, Small (`text-xs`), Tracking wide (`tracking-widest`), `text-stone-500`.
- **Code:** Mono, `text-sm`, `text-stone-300`.

## Component Patterns

### Buttons
*   **Primary:**
    *   `bg-stone-200 text-stone-950`
    *   `hover:bg-white`
    *   `shadow-[0_0_15px_rgba(255,255,255,0.1)]` (Subtle glow)
    *   Rounded: `rounded-md`
*   **Secondary/Ghost:**
    *   `text-stone-500 hover:text-stone-200`
    *   `hover:bg-stone-800`
    *   `border-stone-700` (for outlined variants)

### Cards & Surfaces
*   **Base:** `bg-stone-900/40` (Glass-ish) or `bg-stone-900`.
*   **Border:** `border border-stone-800`.
*   **Interaction:**
    *   Selected state: `border-stone-200 bg-stone-900`.
    *   Hover state: Subtle border lighten (`border-stone-700`).
    *   Disabled: `opacity-80`.

### Code Blocks
*   **Container:** `bg-stone-950/30` or `bg-stone-900`.
*   **Font:** `Fira Code`.
*   **Color:** `text-stone-300`.
*   **Scroll:** Horizontal overflow with custom minimal scrollbar.

## Effects & Animation
*   **Fade In:** `animate-fade-in` (0.5s ease-out, translate Y 10px -> 0).
*   **Backdrop Blur:** `backdrop-blur-md` used in Header and sticky footers/overlays.
*   **Scrollbars:** Custom minimal styling. Thin (`6px`), Thumb `bg-stone-800`, Track transparent.

## Layout
*   **Container:** 
    *   `max-w-4xl` for focused content (Setup Screen).
    *   `max-w-7xl` for split views (Challenge Screen).
*   **Spacing:** Generous padding (`py-12`, `gap-8`) to create "breathing room" (Negative Space).
*   **Responsiveness:**
    *   Stacked columns on Mobile.
    *   Side-by-side (Grid) on Desktop (`lg:` breakpoint).
