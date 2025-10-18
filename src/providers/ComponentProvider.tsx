import { ReactNode } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AudioProvider } from '../contexts/AudioContext';
import { CursorProvider } from '../contexts/CursorContext';

interface ComponentProviderProps {
  children: ReactNode;
}

/**
 * ComponentProvider - Unified provider for all component library contexts
 *
 * Wraps the application with all necessary context providers:
 * - ThemeProvider: Dark/light theme management
 * - AudioProvider: Application audio settings
 * - CursorProvider: Custom cursor state
 *
 * @example
 * ```tsx
 * import { ComponentProvider } from '@subbiah/component';
 *
 * function App() {
 *   return (
 *     <ComponentProvider>
 *       <YourApp />
 *     </ComponentProvider>
 *   );
 * }
 * ```
 */
export function ComponentProvider({ children }: ComponentProviderProps) {
  return (
    <ThemeProvider>
      <AudioProvider>
        <CursorProvider>{children}</CursorProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}
