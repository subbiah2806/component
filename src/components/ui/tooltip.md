# Tooltip

A popup component that displays informative text when hovering over or focusing on a trigger element.

## Import

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@subbiah/reusable/components/ui/tooltip';
```

## Features

- **Accessible**: Built on Radix UI with full ARIA support
- **Keyboard Navigation**: Shows on focus for keyboard users
- **Positioning**: Smart positioning with collision detection
- **Animation**: Smooth fade-in and zoom animations
- **Instant Display**: No delay on hover (delayDuration: 0)
- **Customizable**: Support for custom styling and content

## Basic Usage

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Visual:**

> A small popup appears instantly above the button on hover, showing the tooltip text with a popover background, border, and shadow

## Components

### TooltipProvider

Wrapper component that provides context for all tooltips. Required at the root level.

```tsx
<TooltipProvider>
  {/* Your tooltips here */}
</TooltipProvider>
```

### Tooltip

The root tooltip component. Manages state for a single tooltip.

### TooltipTrigger

The element that triggers the tooltip. Use `asChild` to render as any component.

### TooltipContent

The content displayed in the tooltip popup.

## Props

### TooltipContent Props

| Prop          | Type                                  | Default | Description                                   |
| ------------- | ------------------------------------- | ------- | --------------------------------------------- |
| `sideOffset`  | `number`                              | `4`     | Distance in pixels from the trigger element   |
| `side`        | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Preferred side to display the tooltip         |
| `align`       | `"start" \| "center" \| "end"`        | `"center"` | Alignment relative to the trigger           |
| `className`   | `string`                              | -       | Additional CSS classes                        |
| `...props`    | `React.ComponentProps<typeof TooltipPrimitive.Content>` | - | All Radix Tooltip Content props |

## Examples

### Example 1: Basic Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Visual:**

> Tooltip appears instantly above the button with popover background, border, and shadow

### Example 2: Icon Button with Tooltip

```tsx
import { Trash2 } from 'lucide-react';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Delete item</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Visual:**

> Icon-only button with tooltip showing "Delete item" on hover

### Example 3: Positioned Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Save</Button>
    </TooltipTrigger>
    <TooltipContent side="right" sideOffset={10}>
      <p>Save your changes</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Visual:**

> Tooltip appears to the right of the button with 10px offset

### Example 4: Multiple Tooltips

```tsx
<TooltipProvider>
  <div className="flex gap-2">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Save className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Save</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete</p>
      </TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>
```

**Visual:**

> Two buttons side by side, each with their own tooltip

### Example 5: Custom Styled Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Info</Button>
    </TooltipTrigger>
    <TooltipContent className="max-w-xs">
      <p className="text-sm">
        This is a longer tooltip with custom max-width and smaller text
      </p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Visual:**

> Tooltip with constrained width and smaller text size

## Accessibility

- Full keyboard navigation support (shows on focus)
- ARIA attributes automatically managed by Radix UI
- Screen reader compatible
- ESC key to dismiss
- Respects `prefers-reduced-motion`
- Portal rendering avoids z-index issues

## TypeScript

```tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
>
```

## Notes

- **TooltipProvider Required**: Must wrap all tooltips in `TooltipProvider`
- **Use asChild**: Always use `asChild` on `TooltipTrigger` for proper composition
- **Animation**: Includes smooth fade-in/out and zoom animations
- **Portal Rendering**: Tooltip content is rendered in a portal for proper z-index stacking
- **Smart Positioning**: Automatically adjusts position based on available space
- **No Delay**: Tooltips appear instantly on hover (delayDuration: 0)
- **Styling**: Uses popover background with border and shadow (not primary color)
- **Works with Disabled Elements**: For disabled buttons, wrap in a `<span>` as trigger
