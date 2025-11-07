import { useState, useEffect, ReactNode } from 'react';
import { ThemeContext, Theme, ThemeContextType } from './context';

interface ThemeProviderProps {
  children: ReactNode;
  /**
   * The target element where theme classes should be applied.
   * Can be either the container div or body element.
   */
  targetElement: HTMLElement | null;
}

export function ThemeProvider({ children, targetElement }: ThemeProviderProps) {
  // Initialize theme state from localStorage or system preference
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const theme = localStorage.getItem('theme');
    return (
      theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  useEffect(() => {
    // Apply theme class to the target element
    if (!targetElement) return;

    if (isDark) {
      targetElement.classList.add('dark');
    } else {
      targetElement.classList.remove('dark');
    }
  }, [isDark, targetElement]);

  const toggleTheme = (): void => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (targetElement) {
      if (newTheme) {
        targetElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        targetElement.classList.remove('dark');
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
