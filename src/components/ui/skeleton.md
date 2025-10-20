# Skeleton

Loading placeholder component with pulse animation for content that's being fetched.

## Import

```tsx
import { Skeleton } from '@subbiah/reusable/components/ui/skeleton';
```

## Features

- **Pulse Animation**: Smooth pulsing effect via Tailwind animate-pulse
- **Flexible Sizing**: Easily customizable with className
- **Theme Aware**: Semi-transparent primary color adapts to theme
- **Rounded Corners**: Modern rounded appearance

## Basic Usage

```tsx
<Skeleton className="h-12 w-12" />
```

**Visual:**

> A rounded square (48x48px) with semi-transparent primary background that smoothly pulsates between lighter and darker shades

## Props

| Prop        | Type                                      | Default | Description                          |
| ----------- | ----------------------------------------- | ------- | ------------------------------------ |
| `className` | `string`                                  | -       | Additional CSS classes (size, shape) |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>`    | -       | Standard div attributes              |

## Examples

### Example 1: Text Line Skeleton

```tsx
<Skeleton className="h-4 w-full" />
```

**Visual:**

> Full-width horizontal bar, 16px height, pulsating animation simulating a line of text loading

### Example 2: Multiple Text Lines

```tsx
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

**Visual:**

> Three stacked skeleton lines with spacing, last line shorter (75% width) to simulate paragraph loading

### Example 3: Avatar Skeleton

```tsx
<Skeleton className="h-12 w-12 rounded-full" />
```

**Visual:**

> Circular skeleton (48x48px) pulsating, perfect for loading avatar placeholder

### Example 4: Card Loading State

```tsx
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-1/2" />
    <Skeleton className="h-4 w-3/4 mt-2" />
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </CardContent>
</Card>
```

**Visual:**

> Complete card skeleton with header (title + description skeletons) and content area (paragraph skeletons)

### Example 5: List with Skeletons

```tsx
<div className="space-y-4">
  {Array.from({ length: 3 }).map((_, i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ))}
</div>
```

**Visual:**

> Three rows with circular avatar skeleton on left and two text line skeletons on right, simulating user list loading

### Example 6: Button Skeleton

```tsx
<Skeleton className="h-10 w-32" />
```

**Visual:**

> Rectangular skeleton (40px height, 128px width) with rounded corners, simulating button loading

### Example 7: Image Skeleton

```tsx
<Skeleton className="h-64 w-full" />
```

**Visual:**

> Full-width rectangular skeleton, 256px height, simulating image placeholder

### Example 8: Conditional Loading

```tsx
{isLoading ? (
  <Skeleton className="h-8 w-full" />
) : (
  <h1>{title}</h1>
)}
```

**Visual:**

> Shows pulsating skeleton while loading, then replaces with actual content when loaded

## Accessibility

- Uses `<div>` element (semantic role can be added if needed)
- Purely visual indicator (can add aria-label="Loading" if needed)
- Animation respects prefers-reduced-motion (via Tailwind's animate-pulse)
- Should be replaced with actual content when loading completes

## TypeScript

```tsx
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>)
```

## Notes

- Uses `animate-pulse` from Tailwind for smooth pulsing animation
- Background is semi-transparent primary color (`bg-primary/10` = 10% opacity)
- Rounded corners (`rounded-md`) for modern appearance
- No default size - must specify via className (h-* w-*)
- Respects reduced motion preferences automatically
- Combine with other Tailwind utilities for custom shapes:
  - Circle: `rounded-full`
  - Pill: `rounded-full h-8`
  - Square: `aspect-square`
- Common patterns:
  - Text line: `h-4`
  - Heading: `h-6` or `h-8`
  - Button: `h-10`
  - Avatar: `h-12 w-12 rounded-full`
