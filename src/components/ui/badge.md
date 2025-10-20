# Badge

Compact label component with multiple style variants for displaying status, categories, or metadata.

## Import

```tsx
import { Badge } from '@subbiah/reusable/components/ui/badge';
```

## Features

- **Multiple Variants**: 5 style variants (default, primary, secondary, destructive, outline)
- **Compact Design**: Small, rounded design with minimal padding
- **Focus Support**: Built-in focus ring for keyboard accessibility
- **Flexible Content**: Accepts any child content (text, icons, etc.)

## Basic Usage

```tsx
<Badge>Default</Badge>
```

**Visual:**

> A small rounded label with transparent background, border, and text in current color. Compact padding and semibold text.

## Props

| Prop        | Type                                                                             | Default     | Description                    |
| ----------- | -------------------------------------------------------------------------------- | ----------- | ------------------------------ |
| `variant`   | `"default" \| "primary" \| "secondary" \| "destructive" \| "outline"`            | `"default"` | Visual style variant           |
| `className` | `string`                                                                         | -           | Additional CSS classes         |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>`                                           | -           | Standard div attributes        |

## Variants

### Default

```tsx
<Badge variant="default">Default</Badge>
```

**Visual:**

> Transparent background with border in border color, text inherits parent color

### Primary

```tsx
<Badge variant="primary">Primary</Badge>
```

**Visual:**

> Transparent background with semi-transparent primary border (50% opacity), text inherits parent color

### Secondary

```tsx
<Badge variant="secondary">Secondary</Badge>
```

**Visual:**

> Secondary background color with secondary foreground text, no border (border-transparent)

### Destructive

```tsx
<Badge variant="destructive">Destructive</Badge>
```

**Visual:**

> Destructive/red background with destructive foreground text, subtle shadow, no border

### Outline

```tsx
<Badge variant="outline">Outline</Badge>
```

**Visual:**

> Transparent background with border, foreground text color

## Examples

### Example 1: Status Badges

```tsx
<div className="flex gap-2">
  <Badge variant="secondary">Active</Badge>
  <Badge variant="destructive">Inactive</Badge>
  <Badge variant="outline">Pending</Badge>
</div>
```

**Visual:**

> Three badges in a row: "Active" with secondary background, "Inactive" with red background, "Pending" with outline style

### Example 2: Badge with Icon

```tsx
import { Check } from 'lucide-react';

<Badge variant="primary">
  <Check className="h-3 w-3 mr-1" />
  Verified
</Badge>
```

**Visual:**

> Badge with checkmark icon on the left followed by "Verified" text, primary border styling

### Example 3: Count Badge

```tsx
<Badge variant="destructive">5</Badge>
```

**Visual:**

> Small circular badge with red background showing the number "5", commonly used for notification counts

### Example 4: Tag List

```tsx
<div className="flex flex-wrap gap-2">
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>Tailwind</Badge>
  <Badge>Next.js</Badge>
</div>
```

**Visual:**

> Multiple badges arranged in a wrappable row with consistent spacing, each displaying a technology name

### Example 5: Badge in Table Cell

```tsx
<td>
  {status === 'completed' ? (
    <Badge variant="secondary">Completed</Badge>
  ) : (
    <Badge variant="outline">In Progress</Badge>
  )}
</td>
```

**Visual:**

> Conditional badge rendering in table cell: green/secondary badge for completed, outline badge for in progress

## Accessibility

- Uses `<div>` element (can be enhanced with role if needed)
- Focus ring for keyboard navigation (focus:ring-2)
- Sufficient color contrast for all variants
- Can include `aria-label` for screen readers when used for status

## TypeScript

```tsx
interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
```

## Notes

- Uses `text-xs` for small font size
- Padding is compact (`px-2.5 py-0.5`) for minimal space usage
- Font is semibold (`font-semibold`) for emphasis
- Rounded corners (`rounded-md`) for modern appearance
- Supports focus states with ring offset for accessibility
- Inline-flex display for content alignment
- All variants support theme colors for light/dark mode compatibility
