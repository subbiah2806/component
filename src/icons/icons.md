# Icons

Collection of standardized SVG icon components with consistent sizing and styling patterns.

## Import

```tsx
// Import individual icons as needed
import {
  IconArrowRight,
  IconArrowLeft,
  IconHome,
  IconEmail,
  IconPhone,
  IconLocation,
  IconLinkedIn,
  IconGitHub,
  IconCheckCircle,
  IconAlertCircle,
  IconAlertTriangle,
  IconClose,
  IconFolder,
  IconBriefcase,
  IconInbox,
  IconLoading,
  IconSpinner
} from '@subbiah/reusable/icons';
```

## Features

- **Scalable Sizing**: Uses `1em` width/height for font-size based scaling
- **Color Inheritance**: Uses `currentColor` for stroke/fill to inherit text color
- **Consistent Stroke**: All icons use 2px stroke width by default
- **Class Support**: Accepts className for custom styling
- **SVG Props**: Supports all standard SVG attributes
- **Prefix Convention**: All icons prefixed with "Icon" for autocomplete

## Basic Usage

```tsx
<IconHome className="h-6 w-6 text-primary" />
```

**Visual:**

> Home icon rendered at 24x24px (h-6 w-6) in primary color

## Props

All icon components accept:

| Prop        | Type                            | Description                              |
| ----------- | ------------------------------- | ---------------------------------------- |
| `className` | `string`                        | Tailwind classes for size, color, etc.   |
| `...props`  | `SVGProps<SVGSVGElement>`       | All standard SVG attributes              |

## Icon Categories

### Navigation Icons

```tsx
import { IconArrowRight, IconArrowLeft, IconHome } from '@subbiah/reusable/icons';

<IconArrowRight className="h-5 w-5" />
<IconArrowLeft className="h-5 w-5" />
<IconHome className="h-5 w-5" />
```

**Visual:**

> **IconArrowRight**: Right-pointing arrow with horizontal line and arrowhead
>
> **IconArrowLeft**: Left-pointing chevron arrow
>
> **IconHome**: House icon with door and roof outline

### Contact Icons

```tsx
import { IconEmail, IconPhone, IconLocation } from '@subbiah/reusable/icons';

<IconEmail className="h-5 w-5" />
<IconPhone className="h-5 w-5" />
<IconLocation className="h-5 w-5" />
```

**Visual:**

> **IconEmail**: Envelope with folded flap
>
> **IconPhone**: Traditional phone handset
>
> **IconLocation**: Map pin with circle center

### Social Icons

```tsx
import { IconLinkedIn, IconGitHub } from '@subbiah/reusable/icons';

<IconLinkedIn className="h-6 w-6 text-blue-600" />
<IconGitHub className="h-6 w-6 text-gray-900 dark:text-white" />
```

**Visual:**

> **IconLinkedIn**: LinkedIn logo (filled), typically blue (#0A66C2)
>
> **IconGitHub**: GitHub octocat logo (filled), typically black or white

### Status Icons

```tsx
import {
  IconCheckCircle,
  IconAlertCircle,
  IconAlertTriangle,
  IconClose
} from '@subbiah/reusable/icons';

<IconCheckCircle className="h-5 w-5 text-green-500" />
<IconAlertCircle className="h-5 w-5 text-yellow-500" />
<IconAlertTriangle className="h-5 w-5 text-red-500" />
<IconClose className="h-5 w-5" />
```

**Visual:**

> **IconCheckCircle**: Circle with checkmark inside, typically green
>
> **IconAlertCircle**: Circle with "i" information icon, typically yellow/orange
>
> **IconAlertTriangle**: Triangle with exclamation mark, typically red
>
> **IconClose**: X/cross for closing, universal design

### Action Icons

```tsx
import { IconFolder, IconBriefcase, IconInbox } from '@subbiah/reusable/icons';

<IconFolder className="h-5 w-5" />
<IconBriefcase className="h-5 w-5" />
<IconInbox className="h-5 w-5" />
```

**Visual:**

> **IconFolder**: Folder icon with tab
>
> **IconBriefcase**: Briefcase/suitcase with handle
>
> **IconInbox**: Inbox tray with documents

### Loading Icons

```tsx
import { IconLoading, IconSpinner } from '@subbiah/reusable/icons';

<IconLoading className="h-8 w-8 text-primary animate-spin" />
<IconSpinner className="h-8 w-8 text-primary animate-spin" />
```

**Visual:**

> **IconLoading**: Partial circle arc (animated spinner), 25% opacity base with solid arc
>
> **IconSpinner**: Circular spinner with two arcs at different opacities (25% and 75%)

## Examples

### Example 1: Icon with Text

```tsx
<button className="flex items-center gap-2">
  <IconArrowRight className="h-4 w-4" />
  Next Page
</button>
```

**Visual:**

> Button with arrow icon on left and text on right, vertically centered with 8px gap

### Example 2: Colored Icon

```tsx
<IconCheckCircle className="h-6 w-6 text-green-600" />
```

**Visual:**

> Green checkmark in circle, 24x24px

### Example 3: Large Icon

```tsx
<IconInbox className="h-24 w-24 text-gray-400" />
```

**Visual:**

> Large inbox icon (96x96px) in muted gray color

### Example 4: Icon Button

```tsx
<button className="p-2 rounded-full hover:bg-gray-100">
  <IconClose className="h-5 w-5" />
</button>
```

**Visual:**

> Circular button with close/X icon, gray background on hover

### Example 5: Loading Indicator

```tsx
<div className="flex items-center gap-2">
  <IconLoading className="h-5 w-5 animate-spin text-primary" />
  <span>Loading...</span>
</div>
```

**Visual:**

> Spinning loader icon next to "Loading..." text

### Example 6: Social Links

```tsx
<div className="flex gap-4">
  <a href="https://linkedin.com" className="text-blue-600 hover:text-blue-800">
    <IconLinkedIn className="h-6 w-6" />
  </a>
  <a href="https://github.com" className="text-gray-900 hover:text-gray-700">
    <IconGitHub className="h-6 w-6" />
  </a>
</div>
```

**Visual:**

> LinkedIn and GitHub icons as clickable links with hover effects

### Example 7: Status Badge

```tsx
<div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
  <IconCheckCircle className="h-4 w-4 text-green-600" />
  <span className="text-sm text-green-800">Complete</span>
</div>
```

**Visual:**

> Green badge with checkmark icon and "Complete" text

### Example 8: Icon with Animation

```tsx
<IconSpinner className="h-8 w-8 animate-spin text-primary" />
```

**Visual:**

> Spinning icon that rotates continuously (use with animate-spin class)

## Common Size Classes

```tsx
// Extra small (16px)
<IconHome className="h-4 w-4" />

// Small (20px)
<IconHome className="h-5 w-5" />

// Medium (24px)
<IconHome className="h-6 w-6" />

// Large (32px)
<IconHome className="h-8 w-8" />

// Extra large (48px)
<IconHome className="h-12 w-12" />
```

## Accessibility

- All icons accept aria-label for screen readers
- Use aria-hidden="true" for decorative icons
- Provide text alternatives for icons that convey meaning
- Icons inherit text color for proper contrast
- Use semantic HTML when icons are interactive (buttons, links)

## TypeScript

```tsx
import { SVGProps } from 'react';

// All icon components have this signature
function Icon(props: SVGProps<SVGSVGElement>): JSX.Element

// Usage with typed props
const iconProps: SVGProps<SVGSVGElement> = {
  className: 'h-6 w-6 text-blue-500',
  'aria-label': 'Home icon'
};

<IconHome {...iconProps} />
```

## Notes

- Width and height default to `1em` (scales with font-size)
- Use className to set explicit size (h-* w-*)
- ViewBox is `0 0 24 24` for all icons
- Default stroke width is 2px
- Stroke linecap and linejoin are rounded
- Social icons (LinkedIn, GitHub) use fill instead of stroke
- Loading icons designed for use with `animate-spin`
- All icons are pure SVG (no dependencies except React)
- Icons are tree-shakeable (only import what you use)
- No default colors - always use currentColor or explicit colors
- Compatible with all Tailwind color utilities
- Icons automatically adapt to dark mode when using theme colors
