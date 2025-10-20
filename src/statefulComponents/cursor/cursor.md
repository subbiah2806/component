# Cursor

Custom animated cursor system with provider, context hook, and toggle button for enhanced mouse interactions.

## Import

```tsx
import { useCursorContext } from '@subbiah/reusable/statefulComponents/cursor/provider';
import CursorToggle from '@subbiah/reusable/statefulComponents/cursor/toggle';
```

## Provider Initialization

**CursorProvider is automatically initialized in `InitializeReusableChunks`.**

You do **not** need to manually wrap your app with `CursorProvider` - it's already included when you use `InitializeReusableChunks` at your app root.

## Features

- **Custom Cursor**: Animated ring cursor with inner dot
- **Hover Effects**: Scales up and changes color on interactive elements
- **Smart Detection**: Only enables on devices with fine pointer (desktop/laptop)
- **Reduced Motion**: Respects prefers-reduced-motion preference
- **Performance**: RAF-throttled position updates for 60fps
- **Auto-Detection**: Detects buttons, links, and .clickable elements
- **LocalStorage**: Saves cursor preference across sessions
- **Toggle Component**: Pre-built enable/disable button

## Basic Usage

```tsx
import CursorToggle from '@subbiah/reusable/statefulComponents/cursor/toggle';

function Header() {
  return (
    <header>
      <CursorToggle />
    </header>
  );
}
```

**Visual:**

> Custom cursor: ring (24x24px) following mouse with inner dot (8x8px). Cursor scales up and glows when hovering buttons/links. Toggle button shows on desktop only.

## Components

### CursorProvider

Provider component that manages cursor state, rendering, and tracking.

**Props:**

| Prop       | Type        | Description               |
| ---------- | ----------- | ------------------------- |
| `children` | `ReactNode` | **Required**. App content |

### CursorToggle

Pre-built button component for enabling/disabling custom cursor.

**Props:**

| Prop       | Type         | Description                              |
| ---------- | ------------ | ---------------------------------------- |
| `onToggle` | `() => void` | Optional callback when toggle is clicked |

### useCursorContext

Hook to access cursor state and controls.

**Returns:**

```tsx
{
  isEnabled: boolean,         // True if custom cursor is enabled and supported
  toggleCursor: () => void,   // Function to toggle cursor
  canUseCursor: boolean       // True if device supports custom cursor
}
```

## Examples

### Example 1: Using Toggle Button

```tsx
import CursorToggle from '@subbiah/reusable/statefulComponents/cursor/toggle';

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <CursorToggle />
    </header>
  );
}
```

**Visual:**

> Header with cursor toggle button (only visible on desktop with fine pointer). Shows Circle icon when enabled, MousePointer2 when disabled.

### Example 2: Using Cursor Context

```tsx
import { useCursorContext } from '@subbiah/reusable/statefulComponents/cursor/provider';

function CursorIndicator() {
  const { isEnabled, canUseCursor } = useCursorContext();

  if (!canUseCursor) {
    return <p>Custom cursor not supported on this device</p>;
  }

  return <div>Custom cursor: {isEnabled ? 'Enabled ✓' : 'Disabled ✗'}</div>;
}
```

**Visual:**

> Component displays cursor availability and current state

### Example 3: Programmatic Control

```tsx
import { useCursorContext } from '@subbiah/reusable/statefulComponents/cursor/provider';

function Settings() {
  const { isEnabled, toggleCursor, canUseCursor } = useCursorContext();

  if (!canUseCursor) return null;

  return (
    <label>
      <input type="checkbox" checked={isEnabled} onChange={toggleCursor} />
      Enable custom cursor
    </label>
  );
}
```

**Visual:**

> Settings checkbox for cursor control (only shown on supported devices)

### Example 4: Marking Elements as Clickable

```tsx
function CustomCard() {
  return (
    <div className="clickable rounded border p-4">
      {/* This div will trigger cursor hover effect even though it's not a button/link */}
      <h3>Clickable Card</h3>
      <p>Hover to see cursor effect</p>
    </div>
  );
}
```

**Visual:**

> Custom cursor scales up and glows when hovering div with 'clickable' class

### Example 5: Custom Toggle with Callback

```tsx
import CursorToggle from '@subbiah/reusable/statefulComponents/cursor/toggle';

function Header() {
  const handleToggle = () => {
    console.log('Cursor toggled');
    // Additional logic here
  };

  return <CursorToggle onToggle={handleToggle} />;
}
```

**Visual:**

> Toggle button that executes custom callback when clicked

## How It Works

### Device Detection

On mount, checks:

1. Fine pointer capability via `matchMedia('(pointer: fine)')`
2. Motion preference via `matchMedia('(prefers-reduced-motion: reduce)')`
3. Only enables if has fine pointer AND no reduced motion preference

### Initialization

1. Checks localStorage for saved preference
2. If no preference, enables by default on supported devices
3. Injects CSS rule to hide native cursor: `body.custom-cursor-enabled * { cursor: none !important; }`
4. Adds 'custom-cursor-enabled' class to body when active

### Cursor Tracking

1. Listens to mousemove events (passive)
2. Uses requestAnimationFrame to throttle updates to 60fps
3. Updates position state which moves cursor elements via inline styles
4. Listens to mouseover events to detect hoverable elements

### Hover Detection

Triggers on elements that are:

- `<button>` tags
- `<a>` tags
- Inside a `<button>` or `<a>` (via closest())
- Have class `clickable`

### LocalStorage Keys

- Key: `'customCursorEnabled'`
- Values: `'true'` or `'false'`

## Cursor Visual Details

### Main Ring

> 24x24px circle, 2px border in primary color, semi-transparent primary background (20% opacity), positioned at cursor location with translate(-50%, -50%)

**Hover State:**

> Scales to 1.5x, accent background (30% opacity), shadow glow in accent color, border changes to primary color

### Inner Dot

> 8x8px circle, solid primary color, positioned at cursor center with translate(-50%, -50%), no scale change on hover

### Animation

- Position updates: Transform-based (GPU accelerated)
- Hover transition: 100ms duration for border-color, background-color, transform, box-shadow
- Smooth following via RAF throttling

## CursorToggle Details

**Visual:**

> Circular button (rounded-full), outline variant, icon size (h-5 w-5), includes transition-colors
>
> - Enabled: Shows Circle icon (filled)
> - Disabled: Shows MousePointer2 icon
> - Has aria-label and title for accessibility
> - Returns null on touch devices (not rendered)

## Accessibility

- Respects prefers-reduced-motion system preference
- CursorToggle has descriptive aria-label and title
- Only shows on devices that support it (fine pointer)
- Custom cursor elements have aria-hidden="true" (decorative)
- Does not interfere with keyboard navigation
- Native cursor is properly hidden only when custom cursor active
- Smooth transition-colors on toggle icon change

## TypeScript

```tsx
interface CursorContextType {
  isEnabled: boolean;
  toggleCursor: () => void;
  canUseCursor: boolean;
}

interface Position {
  x: number;
  y: number;
}

// Usage
const { isEnabled, toggleCursor, canUseCursor } = useCursorContext();
```

## Notes

- CursorProvider is **automatically initialized in `InitializeReusableChunks`** - no manual setup required
- Custom cursor elements are rendered by provider (not manually)
- Uses position: fixed with z-index 9999 for cursor elements
- Cursor elements use pointer-events-none to not interfere with clicks
- Uses RAF throttling for optimal performance
- Single mousemove listener for efficiency
- CSS rule is injected once and cleaned up on unmount
- Default enabled on supported devices (user must opt-out)
- localStorage saves preference as string ('true' or 'false')
- CursorToggle uses Button component from UI library
- Icons from lucide-react (MousePointer2, Circle)
- Context throws error if used outside CursorProvider
- Touch devices and devices with coarse pointer do not show toggle
- Compatible with SSR (checks for window before access)
- RAF cancels previous frame on rapid movement for smooth animation
