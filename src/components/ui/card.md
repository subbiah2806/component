# Card

Flexible container component with semantic sub-components for structured content layout.

## Import

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@subbiah/reusable/components/ui/card';
```

## Features

- **Semantic Structure**: Pre-built components for header, title, description, content, and footer
- **Glass Morphism**: Semi-transparent background (70% opacity) with modern aesthetic
- **Flexible Layout**: Composable sub-components for any content structure
- **Responsive**: Works seamlessly across all screen sizes

## Basic Usage

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content area</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Visual:**

> A rounded container with subtle border, semi-transparent background, and shadow. Header has vertical spacing, content is padded, and footer contains action buttons aligned left

## Props

### Card

| Prop        | Type                                   | Default | Description            |
| ----------- | -------------------------------------- | ------- | ---------------------- |
| `className` | `string`                               | -       | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>` | -       | Standard div props     |

### CardHeader

| Prop        | Type                                   | Default | Description            |
| ----------- | -------------------------------------- | ------- | ---------------------- |
| `className` | `string`                               | -       | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>` | -       | Standard div props     |

### CardTitle

| Prop        | Type                                   | Default | Description            |
| ----------- | -------------------------------------- | ------- | ---------------------- |
| `className` | `string`                               | -       | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>` | -       | Standard div props     |

### CardDescription

| Prop        | Type                                   | Default | Description            |
| ----------- | -------------------------------------- | ------- | ---------------------- |
| `className` | `string`                               | -       | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>` | -       | Standard div props     |

### CardContent

| Prop        | Type                                   | Default | Description            |
| ----------- | -------------------------------------- | ------- | ---------------------- |
| `className` | `string`                               | -       | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>` | -       | Standard div props     |

### CardFooter

| Prop        | Type                                   | Default | Description            |
| ----------- | -------------------------------------- | ------- | ---------------------- |
| `className` | `string`                               | -       | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>` | -       | Standard div props     |

## Examples

### Example 1: Simple Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Welcome</CardTitle>
    <CardDescription>Get started with our platform</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Click the button below to begin your journey.</p>
  </CardContent>
  <CardFooter>
    <Button>Get Started</Button>
  </CardFooter>
</Card>
```

**Visual:**

> Clean card with title "Welcome" in semibold font, muted description text below, main content paragraph, and a primary button in the footer

### Example 2: Content-Only Card

```tsx
<Card>
  <CardContent>
    <p>This card only has content, no header or footer.</p>
  </CardContent>
</Card>
```

**Visual:**

> Minimal card with only content padding (p-6), no header or footer sections

### Example 3: Card with Multiple Actions

```tsx
<Card>
  <CardHeader>
    <CardTitle>Confirm Action</CardTitle>
    <CardDescription>This action cannot be undone</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Are you sure you want to proceed?</p>
  </CardContent>
  <CardFooter className="flex gap-2">
    <Button variant="outline">Cancel</Button>
    <Button variant="destructive">Delete</Button>
  </CardFooter>
</Card>
```

**Visual:**

> Confirmation card with title, warning description, message content, and two buttons (Cancel outlined, Delete destructive) with gap spacing

### Example 4: Card Grid Layout

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
  <Card>
    <CardHeader>
      <CardTitle>Feature 1</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Description of feature 1</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Feature 2</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Description of feature 2</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Feature 3</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Description of feature 3</p>
    </CardContent>
  </Card>
</div>
```

**Visual:**

> Three cards in a responsive grid (1 column on mobile, 3 on desktop), each with title and description, evenly spaced with gap-4

### Example 5: Card with Custom Styling

```tsx
<Card className="from-primary/10 to-secondary/10 border-primary/50 bg-gradient-to-br">
  <CardHeader>
    <CardTitle className="text-primary">Highlighted Card</CardTitle>
    <CardDescription>This card stands out with custom colors</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Custom gradient background and colored border</p>
  </CardContent>
</Card>
```

**Visual:**

> Card with gradient background from primary to secondary colors, primary-colored border, and title text in primary color

## Accessibility

- Uses semantic `<div>` elements that can be enhanced with ARIA labels if needed
- Proper heading hierarchy with CardTitle for screen readers
- CardDescription uses muted colors to visually differentiate secondary information
- All sub-components support standard HTML attributes for accessibility

## TypeScript

```tsx
// All components use standard React.HTMLAttributes<HTMLDivElement>
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>;
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>;
const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>;
const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>;
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>;
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>;
```

## Notes

- Card uses `rounded-xl` for extra rounded corners
- Background is semi-transparent (`bg-card/70`) for glass morphism effect
- CardHeader has vertical spacing (`space-y-1.5`) and padding (`p-6`)
- CardContent has padding (`p-6`) with top padding removed (`pt-0`) to flow from header
- CardFooter has padding (`p-6`) with top padding removed (`pt-0`) and uses flexbox for button layout
- CardDescription uses `text-muted-foreground` for subtle appearance
- CardTitle uses `font-semibold` and `tracking-tight` for clean typography
- All components are forwardRef-enabled for ref access
