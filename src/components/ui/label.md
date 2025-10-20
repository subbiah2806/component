# Label

Accessible form label component built on Radix UI primitives with consistent styling.

## Import

```tsx
import { Label } from '@subbiah/reusable/components/ui/label';
```

## Features

- **Accessibility First**: Built on Radix UI Label primitive for best practices
- **Peer State Support**: Automatically disabled when associated input is disabled
- **Consistent Styling**: Small, medium-weight text with proper line height
- **Full HTML Support**: All standard label attributes supported

## Basic Usage

```tsx
<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

**Visual:**

> A small, medium-weight text label above an input field. Text is in foreground color with no vertical padding

## Props

| Prop        | Type                                                    | Default | Description                       |
| ----------- | ------------------------------------------------------- | ------- | --------------------------------- |
| `htmlFor`   | `string`                                                | -       | ID of the associated form element |
| `className` | `string`                                                | -       | Additional CSS classes            |
| `...props`  | `React.ComponentPropsWithoutRef<typeof LabelPrimitive>` | -       | All Radix Label primitive props   |

## Examples

### Example 1: Basic Label with Input

```tsx
<div className="space-y-2">
  <Label htmlFor="username">Username</Label>
  <Input id="username" type="text" />
</div>
```

**Visual:**

> Label text "Username" above input field with 8px vertical spacing. Clicking label focuses the input

### Example 2: Required Field Label

```tsx
<Label htmlFor="email">
  Email Address <span className="text-destructive">*</span>
</Label>
<Input id="email" type="email" required />
```

**Visual:**

> Label with red asterisk indicating required field. Asterisk in destructive/red color

### Example 3: Label for Disabled Input

```tsx
<div className="space-y-2">
  <Label htmlFor="disabled">Disabled Field</Label>
  <Input id="disabled" disabled />
</div>
```

**Visual:**

> Label automatically gets reduced opacity (70%) and not-allowed cursor when associated input is disabled via peer state

### Example 4: Label with Checkbox

```tsx
<div className="flex items-center space-x-2">
  <input type="checkbox" id="terms" className="peer" />
  <Label htmlFor="terms">I agree to the terms and conditions</Label>
</div>
```

**Visual:**

> Checkbox next to label text in horizontal layout. Clicking label toggles checkbox

### Example 5: Label with Description

```tsx
<div className="space-y-2">
  <Label htmlFor="password">Password</Label>
  <Input id="password" type="password" />
  <p className="text-muted-foreground text-sm">Must be at least 8 characters</p>
</div>
```

**Visual:**

> Label above input with helper text below in muted color providing additional guidance

### Example 6: Inline Label with Radio

```tsx
<div className="flex items-center space-x-2">
  <input type="radio" id="option1" name="options" className="peer" />
  <Label htmlFor="option1">Option 1</Label>
</div>
<div className="flex items-center space-x-2">
  <input type="radio" id="option2" name="options" className="peer" />
  <Label htmlFor="option2">Option 2</Label>
</div>
```

**Visual:**

> Radio buttons with labels in horizontal layout. Clicking label selects corresponding radio button

## Accessibility

- Built on Radix UI Label primitive for proper accessibility
- Automatically associates with form elements via `htmlFor`
- Clicking label focuses associated form element
- Peer-disabled styles provide visual feedback
- Proper cursor states (pointer when enabled, not-allowed when disabled)
- Works with screen readers to announce form element labels

## TypeScript

```tsx
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>;
```

## Notes

- Uses `text-sm` for small font size
- Font weight is medium (`font-medium`) for clear hierarchy
- Line height is tight (`leading-none`) for compact appearance
- Peer-disabled state: `peer-disabled:cursor-not-allowed peer-disabled:opacity-70`
- No vertical padding for flexibility in layout
- ForwardRef enabled for direct DOM access
- Works seamlessly with all form components (Input, Textarea, Checkbox, Radio, etc.)
- Inherits theme colors for light/dark mode compatibility
