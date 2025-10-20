# BackgroundGradient

Animated floating gradient orbs background component for modern, eye-catching visual effects.

## Import

```tsx
import BackgroundGradient from '@subbiah/reusable/components/BackgroundGradient';
```

## Features

- **Animated Orbs**: Floating gradient spheres with smooth animations
- **Blur Effect**: Heavy blur (blur-3xl) for soft gradient appearance
- **Customizable Count**: Control number of orbs (1-5)
- **Theme Aware**: Uses theme colors (primary, secondary, etc.) with transparency
- **Non-Interactive**: Pointer-events disabled, won't interfere with content

## Basic Usage

```tsx
<BackgroundGradient />
```

**Visual:**

> Three large floating gradient orbs with blur effect, positioned across the viewport, slowly animating with float animations

## Props

| Prop        | Type     | Default | Description                                    |
| ----------- | -------- | ------- | ---------------------------------------------- |
| `className` | `string` | -       | Additional CSS classes for container           |
| `orbCount`  | `number` | `3`     | Number of floating orbs (max 5)                |

## Examples

### Example 1: Default Background

```tsx
<BackgroundGradient />
```

**Visual:**

> Three semi-transparent gradient orbs positioned at different locations, heavily blurred, with floating animations

### Example 2: Single Orb

```tsx
<BackgroundGradient orbCount={1} />
```

**Visual:**

> Single large gradient orb with primary color, positioned at top-left, gently floating

### Example 3: Maximum Orbs

```tsx
<BackgroundGradient orbCount={5} />
```

**Visual:**

> Five gradient orbs in various theme colors (primary, secondary, success, warning) spread across viewport, all animating independently

### Example 4: Hero Section

```tsx
<section className="relative min-h-screen">
  <BackgroundGradient orbCount={3} />
  <div className="relative z-10">
    <h1>Welcome to Our Site</h1>
    <p>Beautiful gradient background</p>
  </div>
</section>
```

**Visual:**

> Hero section with animated gradient background behind content. Content has higher z-index to appear above orbs

### Example 5: Custom Positioning

```tsx
<BackgroundGradient className="opacity-50" orbCount={2} />
```

**Visual:**

> Two gradient orbs with reduced opacity (50%), creating subtle background effect

### Example 6: Dark Mode Section

```tsx
<div className="dark">
  <BackgroundGradient orbCount={4} />
  <div className="relative z-10 text-white">
    <h2>Dark Mode Content</h2>
  </div>
</div>
```

**Visual:**

> Four gradient orbs adapted for dark mode, using theme's dark mode color variants

## Orb Colors

The component uses these theme colors (in order):
1. `bg-primary/30` (30% opacity)
2. `bg-secondary/30` (30% opacity)
3. `bg-primary/10` (10% opacity)
4. `bg-success/20` (20% opacity - if orbCount ≥ 4)
5. `bg-warning/20` (20% opacity - if orbCount = 5)

## Orb Animations

- **animate-float-1**: First animation pattern
- **animate-float-2**: Second animation pattern (alternating with float-1)

Orbs alternate between these animations for varied movement.

## Accessibility

- Uses `aria-hidden="true"` (purely decorative)
- `pointer-events-none` ensures no interaction interference
- Does not affect focus order or keyboard navigation
- Should not contain important information or interactive elements

## TypeScript

```tsx
interface BackgroundGradientProps {
  className?: string;
  orbCount?: number;
}
```

## Notes

- Fixed positioning (`fixed inset-0`) covers entire viewport
- Z-index 0 (`z-0`) places it behind most content
- Overflow hidden prevents orbs from creating scrollbars
- Orb count capped at 5 maximum
- Each orb has unique size, position, and opacity via inline styles
- Orb 2 has special hardcoded dimensions (300x300px at specific position)
- Other orbs have calculated dimensions: `300 + index * 50` pixels
- Orbs are positioned via percentage-based top/left values
- Opacity decreases for higher index orbs (0.6 - index * 0.1)
- Uses absolute positioning for each orb
- Rounded-full for circular orb shape
- blur-3xl for strong blur effect
- Animations defined in Tailwind config
