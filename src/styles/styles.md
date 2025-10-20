# Global Styles

Global CSS styles and theme variables for the component library.

## Import

```tsx
import '@subbiah/reusable/styles';
```

**Note:** Styles are automatically imported when using `InitializeReusableChunks`. Manual import is only needed if not using the setup component.

## CSS Variables

Theme variables you can reference in your code:

| Variable                 | Purpose                         |
| ------------------------ | ------------------------------- |
| `--background`           | Main background color           |
| `--foreground`           | Main text color                 |
| `--card`                 | Card background                 |
| `--card-foreground`      | Card text color                 |
| `--primary`              | Primary action color            |
| `--primary-foreground`   | Primary action text color       |
| `--secondary`            | Secondary action color          |
| `--secondary-foreground` | Secondary action text color     |
| `--muted`                | Muted background                |
| `--muted-foreground`     | Muted text                      |
| `--accent`               | Accent background               |
| `--accent-foreground`    | Accent text                     |
| `--destructive`          | Destructive action color (red)  |
| `--border`               | Border color                    |
| `--input`                | Input border color              |
| `--ring`                 | Focus ring color                |
| `--success`              | Success state color (green)     |
| `--warning`              | Warning state color (yellow)    |
| `--radius`               | Border radius (0.75rem default) |

**Usage:**

```tsx
<div className="bg-background text-foreground">
  <h1 className="text-primary">Hello World</h1>
  <p className="text-muted-foreground">Subtitle</p>
</div>
```

## Custom Classes

### .clickable

Interactive class for clickable elements with hover and active states.

**Styles:** `cursor-pointer select-none transition-all duration-200 hover:opacity-80 active:scale-95`

**Example:**

```tsx
<div className="clickable" onClick={handleClick}>
  Click me
</div>
```

### .card

Pre-styled card container with rounded corners, padding, and hover effects.

**Styles:** `rounded-lg bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-medium`

**Example:**

```tsx
<div className="card">
  <h2>Card Title</h2>
  <p>Card content</p>
</div>
```

## Custom Animations

### .animate-float-1

Floating animation for gradient orbs and decorative elements.

**Duration:** 20s (infinite loop)

**Example:**

```tsx
<div className="bg-primary/20 animate-float-1 absolute rounded-full blur-3xl">
  {/* Floating gradient orb */}
</div>
```

### .animate-float-2

Alternative floating animation pattern.

**Duration:** 15s (infinite loop)

**Example:**

```tsx
<div className="bg-secondary/20 animate-float-2 absolute rounded-full blur-3xl">
  {/* Floating gradient orb */}
</div>
```

## Notes

- All CSS variables automatically switch between light and dark modes via the `.dark` class
- CSS variables support opacity modifiers (e.g., `bg-primary/50` for 50% opacity)
- The theme uses OKLCH color space for perceptually uniform colors across light/dark modes
- Custom animations are primarily used by the `BackgroundGradient` component
