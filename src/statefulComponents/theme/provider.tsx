import { useState, useEffect, ReactNode, RefObject } from 'react';
import { ThemeContext, Theme, ThemeContextType } from './context';

interface ThemeProviderProps {
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function ThemeProvider({ children, containerRef }: ThemeProviderProps) {
  // Initialize theme state from localStorage or system preference
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const theme = localStorage.getItem('theme');
    return (
      theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  useEffect(() => {
    // Apply theme class to the container element instead of document.documentElement
    const container = containerRef.current;
    if (!container) return;

    if (isDark) {
      container.classList.add('dark');
    } else {
      container.classList.remove('dark');
    }
  }, [isDark, containerRef]);

  const toggleTheme = (): void => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    const container = containerRef.current;
    if (container) {
      if (newTheme) {
        container.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        container.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  const theme: Theme = isDark ? 'dark' : 'light';

  const value: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
