import { ReactNode, useEffect, useState, useRef } from 'react';
import { ThemeProvider } from './statefulComponents/theme/provider';
import { AudioProvider } from './statefulComponents/audio/provider';
import { CursorProvider } from './statefulComponents/cursor/provider';
import './styles/index.css';

interface InitializeReusableChunksProps {
  children: ReactNode;
  /**
   * If true, applies ID "reusables-app-root" to body element for full-page styling.
   * If false/undefined, applies ID to container div for scoped styling (Shadow DOM).
   * @default false
   */
  applyToBody?: boolean;
}

/**
 * InitializeReusableChunks - Unified provider for all component library contexts
 *
 * Wraps the application with all necessary context providers:
 * - ThemeProvider: Dark/light theme management
 * - AudioProvider: Application audio settings
 * - CursorProvider: Custom cursor state
 *
 * Applies ID "reusables-app-root" based on applyToBody prop:
 * - applyToBody={true}: Applies ID to body element (regular web app with full-page styling)
 * - applyToBody={false}: Applies ID to container div (Shadow DOM/Chrome extension with scoped styling)
 *
 * This ensures:
 * - Shadow DOM isolation in Chrome extensions
 * - Scoped CSS styles that don't leak to host pages
 * - Custom cursor containment within the scoped area
 * - Proper background/foreground application to body when needed
 *
 * @example
 * ```tsx
 * import { InitializeReusableChunks } from '@subbiah/reusable';
 *
 * // Regular web app - apply to body
 * function App() {
 *   return (
 *     <InitializeReusableChunks applyToBody={true}>
 *       <YourApp />
 *     </InitializeReusableChunks>
 *   );
 * }
 *
 * // Chrome extension - scoped to container
 * function ExtensionApp() {
 *   return (
 *     <InitializeReusableChunks applyToBody={false}>
 *       <YourApp />
 *     </InitializeReusableChunks>
 *   );
 * }
 * ```
 */
export function InitializeReusableChunks({
  children,
  applyToBody = false,
}: InitializeReusableChunksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  // Set target element and apply ID based on applyToBody
  useEffect(() => {
    if (applyToBody) {
      // Apply ID to body element
      document.body.setAttribute('id', 'reusables-app-root');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTargetElement(document.body);
    } else {
      // Use container ref
      setTargetElement(containerRef.current);
    }

    return () => {
      // Cleanup: remove ID from body if it was added
      if (applyToBody && document.body.id === 'reusables-app-root') {
        document.body.removeAttribute('id');
      }
    };
  }, [applyToBody]);

  return (
    <div ref={containerRef} {...(applyToBody ? {} : { id: 'reusables-app-root' })}>
      <ThemeProvider targetElement={targetElement}>
        <AudioProvider>
          <CursorProvider targetElement={targetElement}>{children}</CursorProvider>
        </AudioProvider>
      </ThemeProvider>
    </div>
  );
}
