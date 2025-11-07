import { ReactNode, useRef } from 'react';
import { ThemeProvider } from './statefulComponents/theme/provider';
import { AudioProvider } from './statefulComponents/audio/provider';
import { CursorProvider } from './statefulComponents/cursor/provider';
import './styles/index.css';

interface InitializeReusableChunksProps {
  children: ReactNode;
}

/**
 * InitializeReusableChunks - Unified provider for all component library contexts
 *
 * Wraps the application with all necessary context providers:
 * - ThemeProvider: Dark/light theme management
 * - AudioProvider: Application audio settings
 * - CursorProvider: Custom cursor state
 *
 * All content is wrapped in a div with ID "reusables-app-root" for:
 * - Shadow DOM isolation in Chrome extensions
 * - Scoped CSS styles that don't leak to host pages
 * - Custom cursor containment within the scoped area
 *
 * @example
 * ```tsx
 * import { InitializeReusableChunks } from '@subbiah/reusable';
 *
 * function App() {
 *   return (
 *     <InitializeReusableChunks>
 *       <YourApp />
 *     </InitializeReusableChunks>
 *   );
 * }
 * ```
 */
export function InitializeReusableChunks({ children }: InitializeReusableChunksProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div id="reusables-app-root" ref={containerRef}>
      <ThemeProvider containerRef={containerRef}>
        <AudioProvider>
          <CursorProvider containerRef={containerRef}>{children}</CursorProvider>
        </AudioProvider>
      </ThemeProvider>
    </div>
  );
}
