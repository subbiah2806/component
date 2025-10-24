# @subbiah/reusable Component Library

Complete documentation for the reusable component library built with React, TypeScript, and Tailwind CSS.

## Installation

```bash
npm install github:subbiah2806/component
```

**Peer Dependencies:** Requires React 19.2.0+ and Tailwind CSS 3.4.3+ (should already be in your project)

## Setup

### 1. Configure TypeScript

Add path mapping to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@subbiah/reusable/*": ["./node_modules/@subbiah/reusable/src/*"]
    }
  }
}
```

This enables clean imports like `import { Button } from '@subbiah/reusable/components/ui/button'`.

### 2. Configure Tailwind

Use the library's tailwind configuration as your base config:

```js
// tailwind.config.js
import baseConfig from '@subbiah/reusable/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  // Add your custom overrides here if needed
};
```

### 3. Initialize Reusable Chunks (Required)

Wrap your root app component with `InitializeReusableChunks` to set up the library:

```tsx
import { InitializeReusableChunks } from '@subbiah/reusable/InitializeReusableChunks';

function App() {
  return (
    <InitializeReusableChunks>
      <YourApp />
    </InitializeReusableChunks>
  );
}
```

**Important:** `InitializeReusableChunks` automatically:

- Imports all necessary styles (`@subbiah/reusable/styles`)
- Initializes **Providers** for statefulComponents

You **do not** need to manually wrap your app with these providers - they are already included!

## Component Documentation

### Setup & Configuration

- **[InitializeReusableChunks](./src/InitializeReusableChunks.md)** - Required wrapper component that sets up all providers and styles

### UI Components

Located in `@subbiah/reusable/components/ui/`

- **[Button](./src/components/ui/button.md)** - Versatile button with multiple variants, sizes, and polymorphic rendering
- **[Card](./src/components/ui/card.md)** - Flexible container with semantic sub-components for structured layouts
- **[Badge](./src/components/ui/badge.md)** - Compact label for status, categories, or metadata
- **[Input](./src/components/ui/input.md)** - Styled text input with consistent appearance
- **[Textarea](./src/components/ui/textarea.md)** - Multi-line text input component
- **[Label](./src/components/ui/label.md)** - Accessible form label built on Radix UI
- **[Separator](./src/components/ui/separator.md)** - Visual divider for horizontal or vertical separation
- **[Skeleton](./src/components/ui/skeleton.md)** - Loading placeholder with pulse animation
- **[Sheet](./src/components/ui/sheet.md)** - Modal drawer/sheet with slide-in animations from four directions
- **[Form](./src/components/ui/form/form.md)** - Complete form management with React Hook Form integration

### Stateful Components

Located in `@subbiah/reusable/statefulComponents/`

- **[Theme](./src/statefulComponents/theme/theme.md)** - Dark mode theme management with provider, context, and toggle
- **[Audio](./src/statefulComponents/audio/audio.md)** - Global audio feedback system with click sounds and mute control
- **[Cursor](./src/statefulComponents/cursor/cursor.md)** - Custom animated cursor with hover effects and device detection

### Utility Components

- **[DataFetchWrapper](./src/components/DataFetchWrapper.md)** - Smart wrapper for loading, error, and empty states
- **[BackgroundGradient](./src/components/BackgroundGradient.md)** - Animated floating gradient orbs background
- **[ErrorBoundary](./src/components/ErrorBoundary.md)** - React error boundary with fallback UI

### Icons

- **[Icons](./src/icons/icons.md)** - Collection of standardized SVG icons (navigation, contact, social, status, actions, loading)

### Utilities

- **[Utility Functions](./src/lib/utils.md)** - Helper functions including `cn()` for class name merging

### Styles

- **[Global Styles](./src/styles/styles.md)** - Theme system, CSS variables, custom animations, and utility classes

## TypeScript Support

All components are fully typed with TypeScript. Import types directly:

```tsx
import type { ButtonProps } from '@subbiah/reusable/components/ui/button';
```

## Styling

Components use Tailwind CSS and support:

- Custom `className` prop for additional styles
- Full Tailwind utility classes

---

**Last Updated:** Auto-generated on commit
**Version:** 2.0.0
