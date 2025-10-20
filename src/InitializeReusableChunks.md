# InitializeReusableChunks

Setup component that initializes all necessary providers and styles for the component library.

## Import

```tsx
import { InitializeReusableChunks } from '@subbiah/reusable/InitializeReusableChunks';
```

## Overview

`InitializeReusableChunks` is a wrapper component that sets up all required context providers and imports global styles. This is the **required** first step when using the component library in your application.

**What it provides:**
- Theme management (dark/light mode)
- Audio feedback system
- Custom cursor functionality
- Global styles and CSS variables

## Props

| Prop       | Type        | Description                              |
| ---------- | ----------- | ---------------------------------------- |
| `children` | `ReactNode` | Your application components to be wrapped |

## Basic Usage

Wrap your root application component with `InitializeReusableChunks`:

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

## What Gets Initialized

### 1. ThemeProvider
Provides dark/light theme management throughout your app. Access via `useTheme()` hook.

### 2. AudioProvider
Enables global audio feedback (click sounds, interactions). Access via `useAudio()` hook.

### 3. CursorProvider
Manages custom animated cursor state. Access via `useCursor()` hook.

### 4. Global Styles
Automatically imports all necessary CSS including:
- Tailwind base, components, and utilities
- Theme CSS variables
- Custom animations
- Scrollbar and focus styling

## Examples

### Example 1: Basic Setup

```tsx
import { InitializeReusableChunks } from '@subbiah/reusable/InitializeReusableChunks';
import { Button } from '@subbiah/reusable/components/ui/button';

function App() {
  return (
    <InitializeReusableChunks>
      <div className="min-h-screen bg-background">
        <h1 className="text-foreground">My App</h1>
        <Button>Click Me</Button>
      </div>
    </InitializeReusableChunks>
  );
}

export default App;
```

### Example 2: With React Router

```tsx
import { InitializeReusableChunks } from '@subbiah/reusable/InitializeReusableChunks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <InitializeReusableChunks>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </InitializeReusableChunks>
  );
}
```

### Example 3: Accessing Initialized Features

```tsx
import { InitializeReusableChunks } from '@subbiah/reusable/InitializeReusableChunks';
import { useTheme } from '@subbiah/reusable/statefulComponents/theme/context';
import { useAudio } from '@subbiah/reusable/statefulComponents/audio/context';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  const { isEnabled: audioEnabled } = useAudio();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <p>Audio: {audioEnabled ? 'On' : 'Off'}</p>
    </div>
  );
}

function App() {
  return (
    <InitializeReusableChunks>
      <MyComponent />
    </InitializeReusableChunks>
  );
}
```

## TypeScript

```tsx
interface InitializeReusableChunksProps {
  children: ReactNode;
}

function InitializeReusableChunks({ children }: InitializeReusableChunksProps): JSX.Element;
```

## Notes

- **Required**: You must wrap your app with this component to use the library
- Place it at the root of your application, outside any routing
- Only use once per application (at the top level)
- All child components automatically have access to theme, audio, and cursor contexts
- No configuration needed - works out of the box with sensible defaults
- If you need to customize provider behavior, import and compose providers manually instead
