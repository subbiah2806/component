# Link Component

A flexible link component with Material Design styling, supporting both internal and external navigation.

## Features

- Multiple visual variants (text, underlined, button)
- Color themes (primary, accent, neutral, inherit)
- Support for icons (start/end)
- Automatic external link handling
- React Router ready
- Dark mode support
- Full TypeScript support
- Accessibility compliant

## Usage

### Basic Link

```tsx
import { Link } from '@subbiah/component';

// External link
<Link href="https://example.com">Visit Example</Link>

// External link with icon
<Link href="https://example.com" external>Visit Example</Link>
```

### Internal Navigation (React Router)

```tsx
// Use 'to' prop for internal routes
<Link to="/about">About Us</Link>
<Link to="/contact" color="accent">Contact</Link>
```

### Variants

```tsx
// Text (default)
<Link href="/home">Home</Link>

// Underlined
<Link href="/about" variant="underlined">About</Link>

// Button style
<Link href="/download" variant="button">Download</Link>
```

### Colors

```tsx
<Link href="#" color="primary">Primary Link</Link>
<Link href="#" color="accent">Accent Link</Link>
<Link href="#" color="neutral">Neutral Link</Link>
<Link href="#" color="inherit">Inherit Parent Color</Link>
```

### With Icons

```tsx
import { HomeIcon, DownloadIcon } from '@subbiah/component/icons';

<Link to="/home" startIcon={<HomeIcon />}>
  Home
</Link>

<Link href="/download.pdf" endIcon={<DownloadIcon />}>
  Download PDF
</Link>
```

### React Router Integration

The Link component uses regular `<a>` tags by default. To integrate with React Router:

**Option 1: Use as-is with 'to' prop**
```tsx
// The component will use href={to}, which works with browser navigation
<Link to="/about">About</Link>
```

**Option 2: Wrap with React Router's Link**
```tsx
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@subbiah/component';

<RouterLink to="/about">
  <Link>About</Link>
</RouterLink>
```

**Option 3: Create a custom wrapper**
```tsx
// In your app
import { Link as RouterLink } from 'react-router-dom';
import { Link as BaseLink, LinkProps } from '@subbiah/component';

export function Link({ to, href, ...props }: LinkProps) {
  if (to && !href) {
    return (
      <RouterLink to={to}>
        <BaseLink {...props} />
      </RouterLink>
    );
  }
  return <BaseLink to={to} href={href} {...props} />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'underlined' \| 'button'` | `'text'` | Visual variant of the link |
| `color` | `'primary' \| 'accent' \| 'neutral' \| 'inherit'` | `'primary'` | Color theme |
| `startIcon` | `ReactNode` | - | Icon before text |
| `endIcon` | `ReactNode` | - | Icon after text |
| `external` | `boolean` | `false` | Shows external link icon |
| `to` | `string` | - | Internal route path |
| `href` | `string` | - | External URL |
| `children` | `ReactNode` | - | Link content |

Plus all standard HTML anchor attributes except `href` (use `href` or `to` prop instead).

## Accessibility

- Proper focus states with keyboard navigation
- External links include `target="_blank"` and `rel="noopener noreferrer"`
- Icons are marked as `aria-hidden`
- Semantic HTML with `<a>` tags

## Dark Mode

The component automatically adapts to dark mode using Tailwind's `dark:` variants and the theme colors.

## Examples

### Navigation Menu
```tsx
<nav>
  <Link to="/" color="inherit">Home</Link>
  <Link to="/about" color="inherit">About</Link>
  <Link to="/contact" color="inherit">Contact</Link>
</nav>
```

### Call-to-Action
```tsx
<Link
  href="/signup"
  variant="button"
  color="accent"
>
  Get Started
</Link>
```

### Footer Links
```tsx
<footer>
  <Link href="https://twitter.com/example" external>Twitter</Link>
  <Link href="https://github.com/example" external>GitHub</Link>
  <Link to="/privacy" variant="underlined">Privacy Policy</Link>
</footer>
```
