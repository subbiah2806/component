import { ReactNode } from "react";
import { ThemeProvider } from "./statefulComponents/theme/provider";
import { AudioProvider } from "./statefulComponents/audio/provider";
import { CursorProvider } from "./statefulComponents/cursor/provider";
import "./styles/index.css";

interface InitializeReusableChunksProps {
  children: ReactNode;
}

/**
 * ReusableChunkProvider - Unified provider for all component library contexts
 *
 * Wraps the application with all necessary context providers:
 * - ThemeProvider: Dark/light theme management
 * - AudioProvider: Application audio settings
 * - CursorProvider: Custom cursor state
 *
 * @example
 * ```tsx
 * import { ReusableChunkProvider } from '@subbiah/reusable';
 *
 * function App() {
 *   return (
 *     <ReusableChunkProvider>
 *       <YourApp />
 *     </ReusableChunkProvider>
 *   );
 * }
 * ```
 */
export function InitializeReusableChunks({
  children,
}: InitializeReusableChunksProps) {
  return (
    <ThemeProvider>
      <AudioProvider>
        <CursorProvider>{children}</CursorProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}
