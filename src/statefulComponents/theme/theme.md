# Theme

Complete dark mode theme management system with provider, context hook, and toggle button.

## Import

```tsx
import { useThemeContext } from '@subbiah/reusable/statefulComponents/theme/provider';
import ThemeToggle from '@subbiah/reusable/statefulComponents/theme/toggle';
```

## Provider Initialization

**ThemeProvider is automatically initialized in `InitializeReusableChunks`.**

You do **not** need to manually wrap your app with `ThemeProvider` - it's already included when you use `InitializeReusableChunks` at your app root.

## Features

- **Light & Dark Modes**: Full theme switching capability
- **System Preference Detection**: Respects user's OS theme preference
- **LocalStorage Persistence**: Saves theme choice across sessions
- **Auto DOM Updates**: Automatically adds/removes 'dark' class on documentElement
- **Toggle Component**: Pre-built button for theme switching
- **Context Hook**: Access theme state anywhere in your app

## Basic Usage

```tsx
import ThemeToggle from '@subbiah/reusable/statefulComponents/theme/toggle';

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

**Visual:**

> Toggle button shows sun icon in dark mode, moon icon in light mode. Clicking toggles between themes

## Components

### ThemeProvider

Provider component that manages theme state and exposes context.

**Props:**

| Prop       | Type        | Description               |
| ---------- | ----------- | ------------------------- |
| `children` | `ReactNode` | **Required**. App content |

### ThemeToggle

Pre-built button component for toggling theme.

**Props:** None (uses theme context internally)

### useThemeContext

Hook to access theme state and controls.

**Returns:**

```tsx
{
  theme: 'light' | 'dark',      // Current theme
  isDark: boolean,               // True if dark mode
  toggleTheme: () => void        // Function to toggle theme
}
```

## Examples

### Example 1: Using Toggle Button

```tsx
import ThemeToggle from '@subbiah/reusable/statefulComponents/theme/toggle';

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  );
}
```

**Visual:**

> Header with theme toggle button on the right. Button is circular, outline variant, shows sun/moon icon based on current theme

### Example 2: Using Theme Context

```tsx
import { useThemeContext } from '@subbiah/reusable/statefulComponents/theme/provider';

function ThemeIndicator() {
  const { theme, isDark } = useThemeContext();

  return (
    <div>
      Current theme: {theme}
      {isDark && <span>🌙</span>}
      {!isDark && <span>☀️</span>}
    </div>
  );
}
```

**Visual:**

> Component displays current theme name and emoji indicator based on theme state

### Example 3: Programmatic Theme Change

```tsx
import { useThemeContext } from '@subbiah/reusable/statefulComponents/theme/provider';

function Settings() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div>
      <p>Current: {theme}</p>
      <Button onClick={toggleTheme}>Switch to {theme === 'dark' ? 'light' : 'dark'} mode</Button>
    </div>
  );
}
```

**Visual:**

> Settings panel with current theme display and button to switch themes programmatically

### Example 4: Theme-Aware Component

```tsx
import { useThemeContext } from '@subbiah/reusable/statefulComponents/theme/provider';

function Logo() {
  const { isDark } = useThemeContext();

  return <img src={isDark ? '/logo-dark.svg' : '/logo-light.svg'} alt="Logo" />;
}
```

**Visual:**

> Component that renders different logo based on current theme

### Example 5: Custom Toggle Button

```tsx
import { useThemeContext } from '@subbiah/reusable/statefulComponents/theme/provider';

function CustomThemeToggle() {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <button onClick={toggleTheme} className="rounded-lg border px-4 py-2">
      {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```

**Visual:**

> Custom toggle button with emoji and text label

## How It Works

### Initialization

1. On mount, checks `localStorage` for saved theme
2. If no saved theme, checks system preference via `matchMedia('(prefers-color-scheme: dark)')`
3. Applies theme by adding/removing 'dark' class on `document.documentElement`

### Theme Toggle

1. User clicks toggle button
2. `toggleTheme()` function updates state
3. Updates localStorage with new preference
4. Adds/removes 'dark' class on documentElement
5. All theme-aware CSS updates automatically

### LocalStorage Keys

- Key: `'theme'`
- Values: `'light'` or `'dark'`

## ThemeToggle Details

**Visual:**

> Circular button (rounded-full), outline variant, icon size (h-5 w-5), includes transition-colors
>
> - Dark mode: Shows Sun icon
> - Light mode: Shows Moon icon
> - Has aria-label for accessibility
> - Uses clickable class for cursor interaction

## Accessibility

- ThemeToggle has `aria-label="Toggle theme"` for screen readers
- Visual theme changes have sufficient contrast
- Respects system preference by default
- Theme preference persists across sessions
- Smooth transition-colors on icon change

## TypeScript

```tsx
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

// Usage
const { theme, isDark, toggleTheme } = useThemeContext();
```

## Notes

- ThemeProvider is **automatically initialized in `InitializeReusableChunks`** - no manual setup required
- 'dark' class is added to `document.documentElement` (not body)
- Your Tailwind config should have `darkMode: 'class'`
- Theme persists in localStorage under key 'theme'
- Default theme is system preference or light if no preference
- ThemeToggle uses Button component from UI library
- Icons from lucide-react (Sun, Moon)
- SSR-safe: checks for `window` before accessing
- Context throws error if used outside ThemeProvider
- Theme updates are immediate (no delay)
- Uses outline button variant for toggle
- Icon has 5x5 size (h-5 w-5)
