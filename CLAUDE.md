# @subbiah/reusable - Component Library

A reusable component library built with React, TypeScript, Tailwind CSS, and shadcn/ui. This library provides UI components, context providers, and utilities for building modern web applications.

## Package Information

- **Package Name**: `@subbiah/reusable` (singular, not plural)
- **Version**: 1.0.0
- **Type**: ES Module
- **License**: MIT

## Installation & Linking

This library is used locally via npm link:

```bash
# In the component library directory
cd modules/component
npm install
npm link

# In your project (e.g., portfolio)
cd modules/portfolio
npm link @subbiah/reusable
```

## Usage in Projects

### 1. Import Styles

Import the component library styles in your `main.tsx` or `index.tsx`:

```tsx
import "@subbiah/reusable/styles";
```

### 2. Wrap App with ComponentProvider

The `ComponentProvider` includes all necessary context providers (Theme, Audio, Cursor):

```tsx
import { ComponentProvider, ErrorBoundary } from "@subbiah/reusable";

<ErrorBoundary>
  <ComponentProvider>
    <App />
  </ComponentProvider>
</ErrorBoundary>;
```

### 3. Use Components

**IMPORTANT**: Import directly from component files, NOT from a barrel index file.

```tsx
// UI Components
import { Button } from "@subbiah/reusable/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@subbiah/reusable/components/ui/card";
import { Input } from "@subbiah/reusable/components/ui/input";
import { Badge } from "@subbiah/reusable/components/ui/badge";

// Utility Components
import DataFetchWrapper from "@subbiah/reusable/components/DataFetchWrapper";
import BackgroundGradient from "@subbiah/reusable/components/BackgroundGradient";

// Icons
import { IconLoading, IconError } from "@subbiah/reusable/components/icons";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### 4. Use Context Hooks

```tsx
import { useThemeContext } from "@subbiah/reusable/contexts/ThemeContext";
import { useCursorContext } from "@subbiah/reusable/contexts/CursorContext";
import { useAudioContext } from "@subbiah/reusable/contexts/AudioContext";

function MyComponent() {
  const { isDark, toggleTheme } = useThemeContext();
  const { isEnabled, toggleCursor } = useCursorContext();
  const { isMuted, toggleMute } = useAudioContext();

  return <div>Theme is {isDark ? "dark" : "light"}</div>;
}
```

### 5. Use Utilities

```tsx
import { cn } from "@subbiah/reusable/lib/utils";

function MyComponent() {
  return (
    <div className={cn("base-class", someCondition && "conditional-class")}>
      Content
    </div>
  );
}
```

## Library Structure

```
src/
├── components/
│   ├── ui/                    # UI Components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   ├── badge.tsx
│   │   ├── textarea.tsx
│   │   └── skeleton.tsx
│   ├── icons/
│   │   └── index.tsx          # All icons in one file
│   ├── DataFetchWrapper.tsx   # Universal loading/error/empty state handler
│   ├── ScrollToTop.tsx        # Scroll to top on route change
│   ├── SEO.tsx                # SEO metadata component
│   ├── ErrorBoundary.tsx      # React error boundary
│   ├── ThemeToggle.tsx        # Dark/light mode toggle
│   ├── CursorToggle.tsx       # Custom cursor toggle
│   └── BackgroundGradient.tsx # Animated gradient background
├── contexts/
│   ├── ThemeContext.tsx       # Theme management (dark/light)
│   ├── AudioContext.tsx       # Audio settings
│   └── CursorContext.tsx      # Custom cursor state
├── providers/
│   └── ComponentProvider.tsx  # Unified provider wrapping all contexts
├── lib/
│   └── utils.ts               # Utility functions (cn helper)
├── styles/
│   └── index.css              # Global styles, CSS variables, Tailwind
└── index.ts                   # Main export file
```

## Available Components

### UI Components

- **Button** - Configurable button with variants (default, destructive, outline, secondary, ghost, link) and sizes (default, sm, lg, icon)
- **Card** - Composable card system with `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **Input** - Standard input component
- **Textarea** - Multi-line text input
- **Badge** - Status and tag components with variants
- **Label** - Form label component
- **Separator** - Divider/separator component
- **Skeleton** - Loading skeleton placeholder

### Utility Components

- **DataFetchWrapper** - Handles loading, error, and empty states consistently across the app
- **SEO** - Metadata and structured data management (requires `react-helmet-async`)
- **ErrorBoundary** - Catches and displays React errors gracefully
- **ThemeToggle** - Toggle between dark/light themes
- **CursorToggle** - Toggle custom cursor (only shows on devices with fine pointer)
- **BackgroundGradient** - Animated floating gradient orbs for modern aesthetic

### Icons

All icons are in `src/components/icons/index.tsx` with the "Icon" prefix:

**Navigation**: `IconArrowRight`, `IconArrowLeft`, `IconHome`
**Contact**: `IconEmail`, `IconPhone`, `IconLocation`
**Social**: `IconLinkedIn`, `IconGitHub`
**Status**: `IconCheckCircle`, `IconAlertCircle`, `IconAlertTriangle`, `IconClose`
**Action**: `IconFolder`, `IconBriefcase`, `IconInbox`
**Loading**: `IconLoading`, `IconSpinner`

## Styling System

### Tailwind CSS & shadcn/ui Dark Matter Theme

This library uses the **shadcn/ui Dark Matter theme** with OKLCH color space for vibrant, perceptually uniform colors.

### Color Variables

Colors are defined as OKLCH values **without** the `oklch()` wrapper to support opacity modifiers:

```css
:root {
  --primary: 0.6716 0.1368 48.513;
  --secondary: 0.536 0.0398 196.028;
  --destructive: 0.6368 0.2078 25.3313;
  --success: 0.65 0.18 150;
  --warning: 0.75 0.15 85;
  /* ... more colors */
}
```

Usage:

```tsx
<div className="bg-primary">         // Solid primary background
<div className="bg-primary/20">      // 20% opacity
<div className="text-destructive">   // Destructive text color
```

**CRITICAL**: Always use semantic color names (primary, secondary, destructive, success, warning, muted, accent, background, foreground), **NEVER** use default Tailwind colors like `bg-blue-500` or `text-gray-900`.

### Dark Mode

Dark mode is managed by the `ThemeContext` and applies the `.dark` class to the document root. All colors automatically adapt.

### Custom Animations

- `animate-fade-in` - Fade in effect
- `animate-slide-up` - Slide up with fade
- `animate-slide-in` - Slide in from right
- `animate-float-1` - Floating animation (for BackgroundGradient)
- `animate-float-2` - Alternative floating animation

## Context Providers

### ThemeContext

Manages dark/light theme with localStorage persistence and system preference detection.

```tsx
const { theme, isDark, toggleTheme } = useThemeContext();
```

### AudioContext

Manages application audio settings (currently handles click sounds).

```tsx
const { isMuted, toggleMute } = useAudioContext();
```

### CursorContext

Manages custom cursor state (only on devices with fine pointer, respects `prefers-reduced-motion`).

```tsx
const { isEnabled, toggleCursor, canUseCursor } = useCursorContext();
```

## Adding New Components

**IMPORTANT**: If any new component is required, create it in this library (`@subbiah/reusable`), not in individual projects.

### Steps to Add a Component:

1. **Create the component file** in `src/components/` or `src/components/ui/`
2. **Follow shadcn/ui patterns**:
   - Use `React.forwardRef` for ref support
   - Use `cn()` utility for className merging
   - Support `className` prop for customization
   - Use semantic color variables
3. **Export in `src/index.ts`**
4. **Document usage** in this CLAUDE.md file
5. **Test in a project** (e.g., portfolio)

### Example:

```tsx
// src/components/ui/alert.tsx
import * as React from "react";
import { cn } from "../lib/utils";

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-card rounded-lg border p-4", className)}
    {...props}
  />
));
Alert.displayName = "Alert";

export { Alert };
```

```ts
// src/index.ts
export { Alert } from "./components/ui/alert";
```

## TypeScript Conventions

- **Strict mode enabled** - All code must be type-safe
- **No `any` type** - Use `unknown` if truly needed, then narrow with type guards
- **Named exports preferred** - Use named exports for components
- **Interface over type** - Use interfaces for props
- **Readonly for immutable data** - Mark props as readonly when appropriate

## Testing

Run type-checking:

```bash
npm run type-check
```

## Peer Dependencies

Projects using this library must have:

- `react` >= 18.0.0
- `tailwindcss` >= 3.0.0

## Tailwind Configuration

Projects should extend the component library's Tailwind config:

```js
// tailwind.config.js
import baseConfig from "@subbiah/reusable/tailwind.config";

export default {
  ...baseConfig,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "nodemodules/@subbiah/reusable/src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [...(baseConfig.plugins || [])],
};
```

## Best Practices

1. **Always use ComponentProvider** - Wraps all necessary contexts
2. **Use DataFetchWrapper** - For consistent loading/error/empty states
3. **Use semantic colors** - Never use default Tailwind colors
4. **Dark mode support** - All components must work in both light and dark modes
5. **Accessibility** - Use semantic HTML, ARIA labels, keyboard navigation
6. **Mobile-first** - Design for mobile, enhance for desktop
7. **Type safety** - No `any` types, proper TypeScript everywhere
8. **Clean code** - Follow SOLID principles, DRY, meaningful names

## Common Patterns

### DataFetchWrapper Pattern

```tsx
import { DataFetchWrapper } from "@subbiah/reusable";

function MyComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <DataFetchWrapper
      isLoading={isLoading}
      error={error}
      isEmpty={!data?.length}
      loadingMessage="Loading users..."
      emptyMessage="No users found"
    >
      <UserList users={data} />
    </DataFetchWrapper>
  );
}
```

### Icon Usage Pattern

```tsx
import { IconLoading, IconError, IconSuccess } from '@subbiah/reusable';

// Icons scale with parent font size (width/height are 1em)
<IconLoading className="text-primary" style={{ fontSize: '24px' }} />

// With animation
<IconLoading className="animate-spin text-primary" style={{ fontSize: '32px' }} />
```

### Button Variants Pattern

```tsx
import { Button } from '@subbiah/reusable';

<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="link">Link Style</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><IconPlus /></Button>
```

## Troubleshooting

### Component library not found

```bash
cd modules/component && npm link
cd modules/portfolio && npm link @subbiah/reusable
```

### Styles not applied

Ensure you're importing styles:

```tsx
import "@subbiah/reusable/styles";
```

### Type errors in icon components

Ensure `skipLibCheck: true` is enabled in your `tsconfig.json`.

### Dark mode not working

Ensure `ComponentProvider` or `ThemeProvider` wraps your app.

---

**Remember**: This library is the single source of truth for all shared components. If you need a component, add it here, not in individual projects.
