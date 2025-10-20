# Input

Styled text input component with consistent appearance and full HTML input functionality.

## Import

```tsx
import { Input } from '@subbiah/reusable/components/ui/input';
```

## Features

- **Full HTML Support**: All standard input types and attributes
- **Consistent Styling**: Unified design across light and dark themes
- **Focus States**: Clear visual feedback with ring on focus
- **File Input Support**: Special styling for file inputs
- **Responsive Text**: Adaptive font size (base on mobile, sm on desktop)

## Basic Usage

```tsx
<Input type="text" placeholder="Enter your name" />
```

**Visual:**

> A rounded text input with subtle border, transparent background, and placeholder text in muted color. Height is 36px (h-9), full width, with focus ring

## Props

| Prop        | Type                                      | Default  | Description                                              |
| ----------- | ----------------------------------------- | -------- | -------------------------------------------------------- |
| `type`      | `string`                                  | `"text"` | HTML input type (text, email, password, number, etc.)    |
| `className` | `string`                                  | -        | Additional CSS classes                                   |
| `...props`  | `React.ComponentProps<'input'>`           | -        | All standard input props (value, onChange, disabled etc) |

## Examples

### Example 1: Basic Text Input

```tsx
<Input
  type="text"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

**Visual:**

> Standard text input with placeholder, border, padding, and focus ring on interaction

### Example 2: Password Input

```tsx
<Input
  type="password"
  placeholder="Enter password"
  required
/>
```

**Visual:**

> Password input with obscured characters (dots), same styling as text input

### Example 3: Number Input

```tsx
<Input
  type="number"
  placeholder="Age"
  min={0}
  max={120}
/>
```

**Visual:**

> Number input with up/down arrows for incrementing/decrementing value

### Example 4: Email Input with Validation

```tsx
<Input
  type="email"
  placeholder="email@example.com"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
/>
```

**Visual:**

> Email input with browser validation, shows error state if invalid email format

### Example 5: Disabled Input

```tsx
<Input
  type="text"
  value="Read Only Value"
  disabled
/>
```

**Visual:**

> Input with reduced opacity (50%), disabled cursor (not-allowed), and no interaction

### Example 6: File Input

```tsx
<Input
  type="file"
  accept="image/*"
  onChange={(e) => handleFileUpload(e.target.files)}
/>
```

**Visual:**

> File input with special button styling for "Choose File" button, showing selected filename

### Example 7: Search Input

```tsx
<Input
  type="search"
  placeholder="Search..."
  className="pr-10"
/>
```

**Visual:**

> Search input with extra right padding for optional search icon, may show clear button on some browsers

### Example 8: Input with Label

```tsx
<div className="space-y-2">
  <Label htmlFor="username">Username</Label>
  <Input
    id="username"
    type="text"
    placeholder="johndoe"
  />
</div>
```

**Visual:**

> Label above input with proper spacing (space-y-2), input linked via htmlFor/id

## Accessibility

- Uses semantic `<input>` element
- Supports all ARIA attributes
- Focus visible ring for keyboard users
- Disabled state prevents interaction and shows not-allowed cursor
- Placeholder uses muted-foreground color for sufficient contrast
- Compatible with Label component for proper labeling

## TypeScript

```tsx
const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>
```

## Notes

- Height is fixed at 36px (`h-9`) for consistency
- Full width by default (`w-full`)
- Transparent background (`bg-transparent`) adapts to theme
- Border color uses theme's border color
- Shadow-sm for subtle depth
- Focus ring uses theme's ring color
- Text size is responsive: base on mobile (`text-base`), small on desktop (`md:text-sm`)
- File input has special styling for file button with medium font weight
- Disabled state has 50% opacity and not-allowed cursor
- ForwardRef enabled for direct DOM access
- Transition-colors for smooth visual feedback
