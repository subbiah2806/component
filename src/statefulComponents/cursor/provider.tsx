import { useState, useEffect, useRef, ReactNode, RefObject } from 'react';
import { CursorContext, CursorContextType } from './context';

interface CursorProviderProps {
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
}

interface Position {
  x: number;
  y: number;
}

export function CursorProvider({ children, containerRef }: CursorProviderProps) {
  // Check device capabilities
  const canUseCursor =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize cursor state from localStorage, default to enabled
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('customCursorEnabled');
    // Default to true if no preference is stored and device supports it
    return stored === null ? canUseCursor : stored === 'true';
  });

  // Custom cursor position and hover state
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const rafId = useRef<number | null>(null);
  const currentPosition = useRef<Position>({ x: 0, y: 0 });

  const toggleCursor = (): void => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('customCursorEnabled', String(newValue));
  };

  // Inject CSS rule scoped to #reusables-app-root
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = '#reusables-app-root.custom-cursor-enabled * { cursor: none !important; }';

    // Find the style parent (could be in Shadow DOM or document head)
    const container = containerRef?.current;
    const styleParent =
      container?.getRootNode() instanceof ShadowRoot
        ? (container.getRootNode() as ShadowRoot)
        : document.head;

    styleParent.appendChild(style);

    return () => {
      const styleElement = styleParent.querySelector('#custom-cursor-style');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [containerRef]);

  // Toggle class based on cursor state - scoped to #reusables-app-root
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    if (isEnabled && canUseCursor) {
      container.classList.add('custom-cursor-enabled');
    } else {
      container.classList.remove('custom-cursor-enabled');
    }

    return () => {
      container.classList.remove('custom-cursor-enabled');
    };
  }, [isEnabled, canUseCursor, containerRef]);

  // Custom cursor tracking logic - scoped to #reusables-app-root
  useEffect(() => {
    if (!isEnabled || !canUseCursor) return;

    const container = containerRef?.current;
    if (!container) return;

    // Performance optimized mouse move with RAF throttling
    const updatePosition = (e: MouseEvent): void => {
      // Check if mouse is within the scoped container
      const target = e.target as HTMLElement;
      const isInsideContainer = container.contains(target);

      if (!isInsideContainer) {
        // Hide cursor when outside container
        setPosition({ x: -9999, y: -9999 });
        setIsHovering(false);
        return;
      }

      // Calculate position relative to viewport (works in Shadow DOM)
      currentPosition.current = { x: e.clientX, y: e.clientY };

      // Cancel previous RAF if it exists
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Schedule update on next frame
      rafId.current = requestAnimationFrame(() => {
        setPosition(currentPosition.current);
      });
    };

    const handleMouseOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const container = containerRef.current;

      // Only handle hover if inside the scoped container
      if (!container || !container.contains(target)) {
        setIsHovering(false);
        return;
      }

      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('clickable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = (): void => {
      // Hide cursor when leaving the container
      setPosition({ x: -9999, y: -9999 });
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, {
      passive: true,
    } as AddEventListenerOptions);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      container.removeEventListener('mouseleave', handleMouseLeave, {
        passive: true,
      } as AddEventListenerOptions);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isEnabled, canUseCursor]);

  const value: CursorContextType = {
    isEnabled: isEnabled && canUseCursor,
    toggleCursor,
    canUseCursor,
  };

  return (
    <CursorContext.Provider value={value}>
      {children}

      {/* Render custom cursor automatically if enabled */}
      {isEnabled && canUseCursor && (
        <>
          {/* Main cursor ring */}
          <div
            className={`pointer-events-none fixed left-0 top-0 z-[9999] h-6 w-6 rounded-full border-2 border-primary transition-[border-color,background-color,transform,box-shadow] duration-100 ${
              isHovering ? 'scale-150 bg-accent/30 shadow-lg shadow-accent/50' : 'bg-primary/20'
            }`}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: isHovering ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%)',
            }}
            aria-hidden="true"
          />
          {/* Inner dot */}
          <div
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-primary transition-colors duration-100"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
            aria-hidden="true"
          />
        </>
      )}
    </CursorContext.Provider>
  );
}
