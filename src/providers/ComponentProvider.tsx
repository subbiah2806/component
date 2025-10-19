import { ReactNode } from "react";
import { ThemeProvider } from "../contexts/Theme/provider";
import { AudioProvider } from "../contexts/Audio/provider";
import { CursorProvider } from "../contexts/Cursor/provider";

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
 * import { ComponentProvider } from '@subbiah/reusable';
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
