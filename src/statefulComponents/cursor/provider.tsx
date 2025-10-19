import { createContext, useState, useEffect, useRef, ReactNode } from 'react';

export interface CursorContextType {
  isEnabled: boolean;
  toggleCursor: () => void;
  canUseCursor: boolean;
}

export const CursorContext = createContext<CursorContextType | undefined>(undefined);

interface CursorProviderProps {
  children: ReactNode;
}

interface Position {
  x: number;
  y: number;
}

export function CursorProvider({ children }: CursorProviderProps) {
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

  // Inject CSS rule once on mount
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = 'body.custom-cursor-enabled * { cursor: none !important; }';
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById('custom-cursor-style');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  // Toggle class based on cursor state
  useEffect(() => {
    if (isEnabled && canUseCursor) {
      document.body.classList.add('custom-cursor-enabled');
    } else {
      document.body.classList.remove('custom-cursor-enabled');
    }

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, [isEnabled, canUseCursor]);

  // Custom cursor tracking logic
  useEffect(() => {
    if (!isEnabled || !canUseCursor) return;

    // Performance optimized mouse move with RAF throttling
    const updatePosition = (e: MouseEvent): void => {
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

    window.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
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
            className={`pointer-events-none fixed left-0 top-0 z-[9999] h-6 w-6 rounded-full border-2 transition-[border-color,background-color,transform,box-shadow] duration-100 ${
              isHovering
                ? 'scale-150 border-primary bg-accent/30 shadow-lg shadow-accent/50'
                : 'border-primary bg-primary/20'
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
            className={`pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full transition-colors duration-100 ${
              isHovering ? 'bg-primary' : 'bg-primary'
            }`}
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
