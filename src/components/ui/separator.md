# Separator

Visual divider component built on Radix UI for separating content horizontally or vertically.

## Import

```tsx
import { Separator } from '@subbiah/reusable/components/ui/separator';
```

## Features

- **Horizontal & Vertical**: Support for both orientations
- **Accessible**: Built on Radix UI Separator primitive with ARIA support
- **Decorative by Default**: Non-interactive visual element
- **Theme Aware**: Uses theme border color for consistency

## Basic Usage

```tsx
<Separator />
```

**Visual:**

> A thin horizontal line (1px height) spanning full width in the theme's border color

## Props

| Prop          | Type                                                        | Default        | Description                                       |
| ------------- | ----------------------------------------------------------- | -------------- | ------------------------------------------------- |
| `orientation` | `"horizontal" \| "vertical"`                                | `"horizontal"` | Direction of the separator                        |
| `decorative`  | `boolean`                                                   | `true`         | Whether the separator is purely decorative        |
| `className`   | `string`                                                    | -              | Additional CSS classes                            |
| `...props`    | `React.ComponentPropsWithoutRef<typeof SeparatorPrimitive>` | -              | All Radix Separator primitive props               |

## Variants

### Horizontal Separator

```tsx
<Separator orientation="horizontal" />
```

**Visual:**

> Full width (w-full), 1px height (h-[1px]), horizontal line in border color

### Vertical Separator

```tsx
<Separator orientation="vertical" />
```

**Visual:**

> Full height (h-full), 1px width (w-[1px]), vertical line in border color

## Examples

### Example 1: Separating Content Sections

```tsx
<div>
  <div className="py-4">
    <h2>Section 1</h2>
    <p>Content for section 1</p>
  </div>
  <Separator />
  <div className="py-4">
    <h2>Section 2</h2>
    <p>Content for section 2</p>
  </div>
</div>
```

**Visual:**

> Two content sections with padding, separated by a thin horizontal line between them

### Example 2: Vertical Menu Divider

```tsx
<div className="flex items-center h-8 space-x-4">
  <Button variant="ghost">Home</Button>
  <Separator orientation="vertical" />
  <Button variant="ghost">About</Button>
  <Separator orientation="vertical" />
  <Button variant="ghost">Contact</Button>
</div>
```

**Visual:**

> Three buttons in a row with vertical separator lines between them, separators match button height

### Example 3: Card Section Divider

```tsx
<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
  </CardHeader>
  <Separator />
  <CardContent className="pt-6">
    <p>User information goes here</p>
  </CardContent>
</Card>
```

**Visual:**

> Card with header, separator line below header, and content section below separator

### Example 4: Sidebar Navigation

```tsx
<nav className="w-64 p-4">
  <div className="space-y-2">
    <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
    <Button variant="ghost" className="w-full justify-start">Projects</Button>
  </div>
  <Separator className="my-4" />
  <div className="space-y-2">
    <Button variant="ghost" className="w-full justify-start">Settings</Button>
    <Button variant="ghost" className="w-full justify-start">Logout</Button>
  </div>
</nav>
```

**Visual:**

> Sidebar with two groups of navigation buttons separated by a horizontal line with vertical margin

### Example 5: List with Separators

```tsx
<ul className="divide-y">
  <li className="py-3">Item 1</li>
  <li className="py-3">Item 2</li>
  <li className="py-3">Item 3</li>
</ul>
```

**Visual:**

> Three list items with separator lines between each item (using Tailwind's divide-y utility)

### Example 6: Semantic Separator

```tsx
<Separator decorative={false} />
```

**Visual:**

> Identical visual appearance but marked as non-decorative for screen readers (has semantic meaning)

## Accessibility

- Built on Radix UI Separator primitive
- Uses proper ARIA roles (`separator` or `none` if decorative)
- `decorative={true}` by default (visual only, hidden from screen readers)
- Set `decorative={false}` for semantic separators that convey meaning
- Shrink-0 prevents separator from collapsing in flex layouts

## TypeScript

```tsx
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>
```

## Notes

- Uses theme's `bg-border` color for consistency
- Horizontal: `h-[1px] w-full`
- Vertical: `h-full w-[1px]`
- `shrink-0` prevents collapsing in flex containers
- ForwardRef enabled for direct DOM access
- Decorative by default (won't be announced by screen readers)
- Client-side component (uses 'use client' directive)
- Fully theme-aware for light/dark mode
