# Design System

> A sophisticated, warm-toned design system inspired by Vercel's precision and Claude's approachable aesthetics.

## Design Philosophy

### Core Principles
- **Clarity**: Every element serves a purpose
- **Warmth**: Inviting, human-centered color palette
- **Precision**: Intentional spacing and typography
- **Accessibility**: WCAG AAA contrast ratios where possible

### Visual Language
- **Aesthetic**: Modern minimalism with warm undertones
- **Inspiration**: Vercel's structural elegance + Claude's friendly warmth
- **Mood**: Focused, sophisticated, welcoming

---

## Color System

### Semantic Color Palette

Our color system uses Claude's signature warm tones with precise semantic naming.

#### Neutrals (Warm Grays)
```css
--color-bg-primary:     #0A0908    /* Deep warm black - Main background */
--color-bg-secondary:   #161412    /* Rich charcoal - Cards, surfaces */
--color-bg-tertiary:    #221F1D    /* Warm gray - Elevated surfaces */
--color-bg-hover:       #2A2724    /* Interactive hover state */

--color-border-subtle:  #2A2724    /* Hairline borders */
--color-border-default: #3D3935    /* Standard borders */
--color-border-strong:  #524D48    /* Emphasized borders */

--color-text-primary:   #F5F2EE    /* High contrast - Headings */
--color-text-secondary: #D4CFC8    /* Body text */
--color-text-tertiary:  #8E8880    /* Muted text, labels */
--color-text-disabled:  #5A5550    /* Disabled states */
```

#### Claude Brand Colors
```css
--color-accent-primary:   #D97757  /* Warm copper - Primary actions */
--color-accent-hover:     #E68B6D  /* Lighter copper - Hover states */
--color-accent-subtle:    #4A3428  /* Muted copper - Backgrounds */

--color-amber-50:  #FFF9F5
--color-amber-100: #FFE8D9
--color-amber-200: #FFD1B3
--color-amber-400: #FFB088
--color-amber-600: #D97757  /* Primary */
--color-amber-800: #A04F35
```

#### Functional Colors
```css
--color-success:   #4CAF50  /* Confirmations */
--color-warning:   #FF9800  /* Alerts */
--color-error:     #F44336  /* Errors */
--color-info:      #2196F3  /* Information */
```

### Tailwind Color Extensions

```js
// Add to tailwind.config.js
colors: {
  // Claude warm neutrals
  'neutral': {
    950: '#0A0908',
    900: '#161412',
    850: '#221F1D',
    800: '#2A2724',
    700: '#3D3935',
    600: '#524D48',
    500: '#8E8880',
    400: '#B3AEA8',
    300: '#D4CFC8',
    200: '#E8E4DF',
    100: '#F5F2EE',
    50:  '#FDFCFB',
  },
  // Claude accent (warm copper/amber)
  'accent': {
    950: '#2D1810',
    900: '#4A3428',
    800: '#6B4735',
    700: '#8C5A42',
    600: '#A04F35',
    500: '#D97757',  // Primary
    400: '#E68B6D',
    300: '#F4A889',
    200: '#FFC4A5',
    100: '#FFE0D2',
    50:  '#FFF9F5',
  }
}
```

---

## Typography

### Font Stack

```css
/* Sans-serif - UI Elements */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* Monospace - Code */
font-family: ui-monospace, 'SF Mono', Monaco, 'Cascadia Code',
             'Consolas', monospace;
```

> **Note**: Using system fonts for optimal performance and native feel. Consider Geist Sans/Mono if you want Vercel's exact aesthetic.

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Color |
|---------|------|--------|-------------|----------------|-------|
| **Display** | 48px (3rem) | 600 | 1.1 | -0.02em | `text-primary` |
| **H1** | 36px (2.25rem) | 600 | 1.2 | -0.01em | `text-primary` |
| **H2** | 28px (1.75rem) | 600 | 1.3 | -0.01em | `text-primary` |
| **H3** | 20px (1.25rem) | 600 | 1.4 | 0 | `text-primary` |
| **Body Large** | 16px (1rem) | 400 | 1.6 | 0 | `text-secondary` |
| **Body** | 14px (0.875rem) | 400 | 1.5 | 0 | `text-secondary` |
| **Body Small** | 13px (0.8125rem) | 400 | 1.5 | 0 | `text-secondary` |
| **Caption** | 12px (0.75rem) | 500 | 1.4 | 0.01em | `text-tertiary` |
| **Label** | 11px (0.6875rem) | 600 | 1.4 | 0.05em | `text-tertiary` |
| **Code** | 13px (0.8125rem) | 400 | 1.5 | 0 | `text-secondary` |

### Utility Classes

```css
/* Headings */
.text-display { @apply text-5xl font-semibold tracking-tight text-neutral-100; }
.text-h1 { @apply text-4xl font-semibold tracking-tight text-neutral-100; }
.text-h2 { @apply text-3xl font-semibold tracking-tight text-neutral-100; }
.text-h3 { @apply text-xl font-semibold text-neutral-100; }

/* Body */
.text-body-lg { @apply text-base text-neutral-300; }
.text-body { @apply text-sm text-neutral-300; }
.text-body-sm { @apply text-xs text-neutral-300; }

/* Meta */
.text-caption { @apply text-xs font-medium text-neutral-500; }
.text-label { @apply text-xs font-semibold uppercase tracking-wider text-neutral-500; }
```

---

## Spacing System

Following Vercel's 4px base unit for consistency.

### Scale
```
4px  → spacing-1  → 0.25rem
8px  → spacing-2  → 0.5rem
12px → spacing-3  → 0.75rem
16px → spacing-4  → 1rem
24px → spacing-6  → 1.5rem
32px → spacing-8  → 2rem
48px → spacing-12 → 3rem
64px → spacing-16 → 4rem
96px → spacing-24 → 6rem
```

### Layout Patterns
- **Container padding**: `px-6 lg:px-8`
- **Section spacing**: `py-12 lg:py-16`
- **Component gaps**: `gap-4` (cards), `gap-6` (sections)
- **Button padding**: `px-4 py-2` (default), `px-6 py-3` (large)

---

## Components

### Buttons

#### Primary Button
```tsx
<button className="
  px-4 py-2
  bg-accent-500 hover:bg-accent-400
  text-white font-medium text-sm
  rounded-lg
  transition-colors duration-150
  shadow-sm hover:shadow-md
">
  Get Started
</button>
```

#### Secondary Button
```tsx
<button className="
  px-4 py-2
  bg-neutral-850 hover:bg-neutral-800
  text-neutral-200 font-medium text-sm
  border border-neutral-700 hover:border-neutral-600
  rounded-lg
  transition-all duration-150
">
  Learn More
</button>
```

#### Ghost Button
```tsx
<button className="
  px-3 py-1.5
  text-neutral-400 hover:text-neutral-200
  hover:bg-neutral-850
  font-medium text-sm
  rounded-md
  transition-colors duration-150
">
  Cancel
</button>
```

### Cards & Surfaces

#### Default Card
```tsx
<div className="
  bg-neutral-900
  border border-neutral-700
  rounded-xl
  p-6
  hover:border-neutral-600
  transition-colors duration-200
">
  {/* Content */}
</div>
```

#### Glass Card (Overlay)
```tsx
<div className="
  bg-neutral-900/60
  backdrop-blur-md
  border border-neutral-700/50
  rounded-xl
  p-6
  shadow-xl
">
  {/* Content */}
</div>
```

#### Elevated Surface
```tsx
<div className="
  bg-neutral-850
  border border-neutral-700
  rounded-lg
  p-4
  shadow-lg
">
  {/* Content */}
</div>
```

### Input Fields

```tsx
<input className="
  w-full px-4 py-2.5
  bg-neutral-900
  border border-neutral-700
  rounded-lg
  text-neutral-200 placeholder:text-neutral-500
  focus:outline-none
  focus:border-accent-500
  focus:ring-2 focus:ring-accent-500/20
  transition-all duration-150
" />
```

### Code Blocks

```tsx
<pre className="
  bg-neutral-950
  border border-neutral-800
  rounded-lg
  p-4
  overflow-x-auto
  font-mono text-sm text-neutral-300
">
  <code>{/* Code content */}</code>
</pre>
```

---

## Effects & Animations

### Transitions
```css
/* Standard transition for interactive elements */
transition-all duration-150 ease-out

/* Slower transition for complex animations */
transition-all duration-300 ease-in-out
```

### Shadows

```css
/* Subtle elevation */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3)

/* Default card shadow */
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4),
           0 2px 4px -1px rgba(0, 0, 0, 0.3)

/* Elevated/modal shadow */
shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5),
           0 10px 10px -5px rgba(0, 0, 0, 0.3)
```

### Focus States
```css
/* Accent-colored focus ring */
focus:outline-none
focus:ring-2
focus:ring-accent-500/40
focus:border-accent-500
```

### Hover Glow (Special Effects)
```css
/* Subtle glow on primary buttons */
hover:shadow-[0_0_20px_rgba(217,119,87,0.3)]
```

---

## Layout

### Container Widths
```css
max-w-sm   /* 384px  - Narrow content */
max-w-2xl  /* 672px  - Reading width */
max-w-4xl  /* 896px  - Standard content */
max-w-6xl  /* 1152px - Wide layouts */
max-w-7xl  /* 1280px - Full width */
```

### Breakpoints
```css
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Small desktops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large screens */
```

### Grid Patterns
```tsx
/* Two-column responsive layout */
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

/* Three-column card grid */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## Dark Mode Best Practices

### Contrast Guidelines
- **Text on dark backgrounds**: Minimum 7:1 contrast ratio
- **Interactive elements**: Clear hover/focus states
- **Borders**: Use subtle borders (not pure white) for depth

### Layer System
Think in layers of elevation:
1. **Base**: `bg-neutral-950` - App background
2. **Surface**: `bg-neutral-900` - Cards, panels
3. **Elevated**: `bg-neutral-850` - Modals, popovers
4. **Overlay**: `bg-neutral-900/60 backdrop-blur` - Temporary UI

### Avoid Pure Black/White
- Never use `#000000` or `#FFFFFF` directly
- Always use warm-toned neutrals for better eye comfort
- Pure white can cause eye strain in dark mode

---

## Accessibility

### Color Contrast
- **AAA Standard**: 7:1 for body text (14px+)
- **AA Standard**: 4.5:1 minimum for all text
- Test with tools: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Focus states must be clearly visible
- Logical tab order (use `tabindex` sparingly)

### Screen Readers
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Include `aria-label` for icon-only buttons
- Provide alt text for images

---

## Animation Guidelines

### Performance
```tsx
/* Use transforms for smooth animations */
transform translate-y-0 hover:-translate-y-1

/* Prefer GPU-accelerated properties */
- transform
- opacity
- filter (backdrop-blur, etc.)

/* Avoid animating these (causes reflow) */
- width/height
- padding/margin
- top/left
```

### Timing Functions
```css
ease-out    /* Starting interactions (hover in) */
ease-in     /* Ending interactions (hover out) */
ease-in-out /* Smooth both ways (modals, transitions) */
```

### Duration Scale
```
75ms   - Instant feedback (button press)
150ms  - Quick interactions (hover)
300ms  - Standard transitions (modals)
500ms  - Slow, intentional (page transitions)
```

---

## Implementation Checklist

When implementing a new component:

- [ ] Uses semantic color tokens (not hardcoded hex)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Keyboard accessible
- [ ] Clear focus states
- [ ] Smooth transitions (150-300ms)
- [ ] Meets WCAG AA contrast standards
- [ ] Documented in this design system

---

## Resources

### Design Tools
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix Colors](https://www.radix-ui.com/colors) - Color scale inspiration
- [Vercel Design](https://vercel.com/design) - Reference implementation

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/) - Testing tools

### Typography
- [Modern Font Stacks](https://modernfontstacks.com/) - System font combinations
- [Type Scale](https://type-scale.com/) - Typography calculator
