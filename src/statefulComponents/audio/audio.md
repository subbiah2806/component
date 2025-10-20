# Audio

Global audio feedback system with provider, context hook, and toggle button for click sounds.

## Import

```tsx
import { useAudioContext } from '@subbiah/reusable/statefulComponents/audio/provider';
import { AudioToggle } from '@subbiah/reusable/statefulComponents/audio/toggle';
```

## Provider Initialization

**AudioProvider is automatically initialized in `InitializeReusableChunks`.**

You do **not** need to manually wrap your app with `AudioProvider` - it's already included when you use `InitializeReusableChunks` at your app root.

## Features

- **Click Sound Effects**: Plays subtle click sound on all clicks when unmuted
- **Mute Toggle**: Enable/disable audio feedback
- **LocalStorage Persistence**: Saves mute preference across sessions
- **Web Audio API**: Uses modern AudioContext for sound generation
- **Global Listener**: Single event listener for entire app (performant)
- **Toggle Component**: Pre-built mute/unmute button

## Basic Usage

```tsx
import { AudioToggle } from '@subbiah/reusable/statefulComponents/audio/toggle';

function Header() {
  return (
    <header>
      <AudioToggle />
    </header>
  );
}
```

**Visual:**

> Toggle button shows speaker icon when unmuted, muted speaker icon when muted. Every click plays sound when unmuted

## Components

### AudioProvider

Provider component that manages audio state and click sound playback.

**Props:**

| Prop       | Type         | Description                |
| ---------- | ------------ | -------------------------- |
| `children` | `ReactNode`  | **Required**. App content  |

### AudioToggle

Pre-built button component for toggling mute state.

**Props:** None (uses audio context internally)

### useAudioContext

Hook to access audio state and controls.

**Returns:**

```tsx
{
  isMuted: boolean,           // True if audio is muted
  toggleMute: () => void      // Function to toggle mute state
}
```

## Examples

### Example 1: Using Toggle Button

```tsx
import { AudioToggle } from '@subbiah/reusable/statefulComponents/audio/toggle';

function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>My App</h1>
      <AudioToggle />
    </header>
  );
}
```

**Visual:**

> Header with audio toggle button on the right. Button is circular, outline variant, shows Volume2 icon when unmuted, VolumeX when muted

### Example 2: Using Audio Context

```tsx
import { useAudioContext } from '@subbiah/reusable/statefulComponents/audio/provider';

function AudioIndicator() {
  const { isMuted } = useAudioContext();

  return (
    <div>
      Audio: {isMuted ? 'Muted 🔇' : 'On 🔊'}
    </div>
  );
}
```

**Visual:**

> Component displays current audio state with emoji indicator

### Example 3: Programmatic Mute Control

```tsx
import { useAudioContext } from '@subbiah/reusable/statefulComponents/audio/provider';

function Settings() {
  const { isMuted, toggleMute } = useAudioContext();

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={!isMuted}
          onChange={toggleMute}
        />
        Enable click sounds
      </label>
    </div>
  );
}
```

**Visual:**

> Settings checkbox that controls audio state (checked = unmuted, unchecked = muted)

### Example 4: Custom Toggle Button

```tsx
import { useAudioContext } from '@subbiah/reusable/statefulComponents/audio/provider';

function CustomAudioToggle() {
  const { isMuted, toggleMute } = useAudioContext();

  return (
    <button
      onClick={toggleMute}
      className="px-4 py-2 rounded-lg border"
    >
      {isMuted ? '🔇 Enable Sound' : '🔊 Mute Sound'}
    </button>
  );
}
```

**Visual:**

> Custom toggle button with emoji and text label

## How It Works

### Initialization

1. On mount, checks `localStorage` for saved mute preference
2. If no preference, defaults to **unmuted** (false)
3. Sets up single global click listener on document
4. Creates audio element reference for future use

### Click Sound Generation

When any element is clicked (and audio is unmuted):

1. Creates new AudioContext
2. Creates oscillator (sine wave at 800Hz)
3. Creates gain node for volume control (0.3 initial, fades to 0.01)
4. Plays 100ms sound with exponential fade out
5. Auto-cleans up after sound completes

### Mute Toggle

1. User clicks toggle button
2. `toggleMute()` function updates state
3. Updates localStorage with new preference
4. Updates audio element muted property (if exists)

### LocalStorage Keys

- Key: `'audioMuted'`
- Values: `'true'` or `'false'`

## Sound Characteristics

- **Frequency**: 800Hz
- **Waveform**: Sine wave
- **Duration**: 100ms
- **Initial Volume**: 0.3
- **Fade**: Exponential ramp to 0.01 over 100ms
- **Type**: Subtle, non-intrusive click

## AudioToggle Details

**Visual:**

> Circular button (rounded-full), outline variant, icon size (h-5 w-5), includes transition-colors
> - Unmuted: Shows Volume2 icon (speaker with sound waves)
> - Muted: Shows VolumeX icon (speaker with X)
> - Has aria-label for accessibility
> - Uses clickable class for cursor interaction

## Accessibility

- AudioToggle has `aria-label="Toggle mute"` for screen readers
- Audio feedback is optional (can be disabled)
- Preference persists across sessions
- Visual indicator (icon) shows current state
- Does not interfere with screen reader audio
- Smooth transition-colors on icon change

## TypeScript

```tsx
interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

// Usage
const { isMuted, toggleMute } = useAudioContext();
```

## Notes

- AudioProvider is **automatically initialized in `InitializeReusableChunks`** - no manual setup required
- Uses Web Audio API (AudioContext or webkitAudioContext)
- Single document-level click listener for performance
- playClickSound function is memoized with useCallback
- Audio element is created but loop functionality not currently used
- Default state is **unmuted** (user must opt-out)
- localStorage saves preference as string ('true' or 'false')
- AudioToggle uses Button component from UI library
- Icons from lucide-react (Volume2, VolumeX)
- Context throws error if used outside AudioProvider
- Click listener uses passive: true for better scroll performance
- Audio reference cleaned up on unmount
- Sound playback is non-blocking and async
- Compatible with webkit browsers (Safari, older Chrome)
- Uses requestAnimationFrame pattern for stable playClickSound reference
