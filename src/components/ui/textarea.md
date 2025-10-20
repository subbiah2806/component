# Textarea

Styled multi-line text input component with consistent appearance and full HTML textarea functionality.

## Import

```tsx
import { Textarea } from '@subbiah/reusable/components/ui/textarea';
```

## Features

- **Multi-line Input**: Resizable text area for longer content
- **Consistent Styling**: Matches Input component design
- **Minimum Height**: Default 60px minimum height
- **Focus States**: Clear visual feedback with ring on focus
- **Responsive Text**: Adaptive font size (base on mobile, sm on desktop)

## Basic Usage

```tsx
<Textarea placeholder="Enter your message" />
```

**Visual:**

> A rounded multi-line text input with subtle border, transparent background, and placeholder text in muted color. Minimum height of 60px, full width, with focus ring

## Props

| Prop        | Type                               | Default | Description                                               |
| ----------- | ---------------------------------- | ------- | --------------------------------------------------------- |
| `className` | `string`                           | -       | Additional CSS classes                                    |
| `...props`  | `React.ComponentProps<'textarea'>` | -       | All standard textarea props (value, onChange, rows, etc.) |

## Examples

### Example 1: Basic Textarea

```tsx
<Textarea
  placeholder="Tell us about yourself..."
  value={bio}
  onChange={(e) => setBio(e.target.value)}
/>
```

**Visual:**

> Multi-line input with placeholder, border, padding, and focus ring. User can drag the corner to resize

### Example 2: Fixed Rows Textarea

```tsx
<Textarea rows={5} placeholder="Enter your comment" />
```

**Visual:**

> Textarea with 5 visible rows initially, maintains minimum height, still resizable by user

### Example 3: Non-resizable Textarea

```tsx
<Textarea className="resize-none" placeholder="Fixed size textarea" rows={4} />
```

**Visual:**

> Textarea with 4 rows that cannot be resized by the user, no resize handle in corner

### Example 4: Disabled Textarea

```tsx
<Textarea value="This content cannot be edited" disabled />
```

**Visual:**

> Textarea with reduced opacity (50%), disabled cursor (not-allowed), and no interaction

### Example 5: Textarea with Character Limit

```tsx
const [text, setText] = useState('');
const maxLength = 500;

<div className="space-y-2">
  <Textarea
    value={text}
    onChange={(e) => setText(e.target.value)}
    maxLength={maxLength}
    placeholder="Enter your thoughts..."
  />
  <p className="text-muted-foreground text-right text-sm">
    {text.length}/{maxLength}
  </p>
</div>;
```

**Visual:**

> Textarea with character counter below showing "45/500", counter updates as user types, input stops accepting text at limit

### Example 6: Textarea with Label

```tsx
<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Type your message here" required />
</div>
```

**Visual:**

> Label above textarea with proper spacing, linked via htmlFor/id, required attribute enforced

### Example 7: Auto-growing Textarea

```tsx
<Textarea className="max-h-[300px] min-h-[100px]" placeholder="This textarea has a max height" />
```

**Visual:**

> Textarea that can grow from 100px to 300px maximum height, with scrollbar appearing when content exceeds max height

## Accessibility

- Uses semantic `<textarea>` element
- Supports all ARIA attributes
- Focus visible ring for keyboard users
- Disabled state prevents interaction and shows not-allowed cursor
- Placeholder uses muted-foreground color for sufficient contrast
- Compatible with Label component for proper labeling
- Resizable by default for user control

## TypeScript

```tsx
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>;
```

## Notes

- Minimum height is 60px (`min-h-[60px]`)
- Full width by default (`w-full`)
- Transparent background (`bg-transparent`) adapts to theme
- Border color uses theme's border color
- Shadow-sm for subtle depth
- Focus ring uses theme's ring color
- Text size is responsive: base on mobile (`text-base`), small on desktop (`md:text-sm`)
- Disabled state has 50% opacity and not-allowed cursor
- ForwardRef enabled for direct DOM access
- Resizable by default (can be disabled with `resize-none` className)
- Transition-colors for smooth visual feedback
- Consistent padding (`px-3 py-2`) with Input component
