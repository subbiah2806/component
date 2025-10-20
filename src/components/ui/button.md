# Button

Versatile button component with multiple style variants, sizes, and polymorphic rendering capabilities.

## Import

```tsx
import { Button } from '@subbiah/reusable/components/ui/button';
```

## Features

- **Multiple Variants**: 6 pre-built style variants (default, destructive, outline, secondary, ghost, link)
- **Flexible Sizing**: 4 size options (default, sm, lg, icon)
- **Polymorphic Rendering**: Use `asChild` to render as any component while maintaining button styles
- **Accessible**: Full keyboard navigation and ARIA support
- **Icon Support**: Automatic icon sizing and spacing with `gap-2`

## Basic Usage

```tsx
<Button>Click me</Button>
```

**Visual:**

> A rounded button with primary background color, white text, medium padding, and hover effect that slightly darkens the background

## Props

| Prop        | Type                                                                                  | Default     | Description                                                   |
| ----------- | ------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- |
| `variant`   | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"`         | `"default"` | Visual style variant                                          |
| `size`      | `"default" \| "sm" \| "lg" \| "icon"`                                                 | `"default"` | Button size                                                   |
| `asChild`   | `boolean`                                                                             | `false`     | Render as child component (uses Radix Slot)                   |
| `className` | `string`                                                                              | -           | Additional CSS classes                                        |
| `...props`  | `React.ButtonHTMLAttributes<HTMLButtonElement>`                                       | -           | All standard button props (onClick, disabled, type, etc.)     |

## Variants

### Default

```tsx
<Button variant="default">Default Button</Button>
```

**Visual:**

> Primary colored background with white text, subtle shadow, hover effect darkens to 90% opacity

### Destructive

```tsx
<Button variant="destructive">Delete</Button>
```

**Visual:**

> Red/destructive colored background with white text, subtle shadow, hover effect darkens to 90% opacity

### Outline

```tsx
<Button variant="outline">Outline Button</Button>
```

**Visual:**

> Transparent background with border, inherits text color, hover adds subtle accent background

### Secondary

```tsx
<Button variant="secondary">Secondary</Button>
```

**Visual:**

> Secondary colored background with secondary foreground text, subtle shadow, hover darkens to 80% opacity

### Ghost

```tsx
<Button variant="ghost">Ghost Button</Button>
```

**Visual:**

> Transparent background, no border, hover adds subtle accent background and changes text color

### Link

```tsx
<Button variant="link">Link Style</Button>
```

**Visual:**

> Appears as an underlined link with primary color, no background or border

## Sizes

### Small

```tsx
<Button size="sm">Small Button</Button>
```

**Visual:**

> Height: 32px (h-8), compact horizontal padding (px-3), smaller text (text-xs)

### Default

```tsx
<Button size="default">Default Size</Button>
```

**Visual:**

> Height: 36px (h-9), standard padding (px-4 py-2), medium text (text-sm)

### Large

```tsx
<Button size="lg">Large Button</Button>
```

**Visual:**

> Height: 40px (h-10), expanded padding (px-8), medium text (text-sm)

### Icon

```tsx
<Button size="icon">
  <Icon className="h-4 w-4" />
</Button>
```

**Visual:**

> Square button (h-9 w-9), perfect for icons, no extra padding

## Examples

### Example 1: Button with Icon

```tsx
import { Download } from 'lucide-react';

<Button>
  <Download className="h-4 w-4" />
  Download
</Button>
```

**Visual:**

> Button with icon and text side-by-side, automatic gap spacing (gap-2), icon auto-sized to 16px

### Example 2: Loading Button

```tsx
import { Loader2 } from 'lucide-react';

<Button disabled>
  <Loader2 className="h-4 w-4 animate-spin" />
  Loading...
</Button>
```

**Visual:**

> Disabled button with spinning loader icon, reduced opacity (50%), pointer-events disabled

### Example 3: Polymorphic Link Button

```tsx
import { Link } from 'react-router-dom';

<Button asChild>
  <Link to="/dashboard">Go to Dashboard</Link>
</Button>
```

**Visual:**

> Renders as a Link component but styled as a button, maintains all button styles while functioning as a navigation link

### Example 4: Icon-Only Button

```tsx
import { Settings } from 'lucide-react';

<Button variant="ghost" size="icon">
  <Settings className="h-5 w-5" />
</Button>
```

**Visual:**

> Square button with only an icon, transparent background, hover shows subtle accent

### Example 5: Full Width Button

```tsx
<Button className="w-full">Full Width Button</Button>
```

**Visual:**

> Button spans entire container width while maintaining height and padding

## Accessibility

- Uses semantic `<button>` element with proper ARIA attributes
- Supports keyboard navigation (Enter, Space)
- Disabled state prevents interaction and reduces opacity
- Icon-only buttons should include `aria-label` for screen readers
- Focus visible ring for keyboard users

## TypeScript

```tsx
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

## Notes

- SVG icons within buttons automatically sized to 16px (h-4 w-4) via `[&_svg]` selector
- Uses `gap-2` for automatic spacing between content (icons + text)
- Disabled buttons have `pointer-events-none` and 50% opacity
- Focus ring uses theme's `ring` color for consistency
- Combines well with `lucide-react` icons
- Uses Radix UI Slot for polymorphic rendering when `asChild={true}`
