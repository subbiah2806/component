import { HTMLAttributes } from 'react';

/**
 * ThemeToggle Component
 *
 * A 3-state theme toggle switch for light, system, and dark modes.
 * Provides a visual slider that moves between three positions.
 *
 * @example
 * ```tsx
 * <ThemeToggle
 *   theme="system"
 *   onThemeChange={setTheme}
 *   variant="inline"
 * />
 * ```
 */

export type ThemeMode = 'light' | 'system' | 'dark';

export interface ThemeToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current theme mode */
  theme: ThemeMode;

  /** Callback when theme changes */
  onThemeChange: (theme: ThemeMode) => void;

  /** Visual variant */
  variant?: 'inline' | 'floating';

  /** Size of the toggle */
  size?: 'small' | 'medium' | 'large';
}

export function ThemeToggle({
  theme,
  onThemeChange,
  variant = 'inline',
  size = 'medium',
  className = '',
  ...props
}: ThemeToggleProps) {
  // Size configurations
  const sizeConfig = {
    small: {
      container: 'h-8',
      button: 'w-8 h-8 text-sm',
      icon: 'text-base',
    },
    medium: {
      container: 'h-10',
      button: 'w-10 h-10 text-base',
      icon: 'text-lg',
    },
    large: {
      container: 'h-12',
      button: 'w-12 h-12 text-lg',
      icon: 'text-xl',
    },
  };

  const config = sizeConfig[size];

  // Variant styles
  const variantStyles = {
    inline: 'inline-flex',
    floating: 'fixed bottom-6 right-6 shadow-lg',
  };

  // Base container styles
  const containerClasses = `
    ${variantStyles[variant]}
    ${config.container}
    items-center
    bg-neutral-100 dark:bg-neutral-800
    border border-neutral-300 dark:border-neutral-600
    rounded-full
    p-1
    gap-1
    transition-all duration-200
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Button base styles
  const buttonBaseClasses = `
    ${config.button}
    flex items-center justify-center
    rounded-full
    transition-all duration-200
    cursor-pointer
    focus:outline-none
    focus:ring-2
    focus:ring-primary-500
    focus:ring-offset-2
  `;

  // Active/inactive button styles
  const getButtonClasses = (mode: ThemeMode) => {
    const isActive = theme === mode;
    return `
      ${buttonBaseClasses}
      ${
        isActive
          ? 'bg-primary-600 text-white shadow-md'
          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      }
    `.trim().replace(/\s+/g, ' ');
  };

  // Handle theme change
  const handleThemeChange = (newTheme: ThemeMode) => {
    if (newTheme !== theme) {
      onThemeChange(newTheme);
    }
  };

  // Icons
  const icons = {
    light: '☀️',
    system: '💻',
    dark: '🌙',
  };

  return (
    <div
      className={containerClasses}
      role="group"
      aria-label="Theme selector"
      {...props}
    >
      {/* Light Mode Button */}
      <button
        type="button"
        onClick={() => handleThemeChange('light')}
        className={getButtonClasses('light')}
        aria-label="Light mode"
        aria-pressed={theme === 'light'}
        title="Light mode"
      >
        <span className={config.icon} role="img" aria-label="Sun icon">
          {icons.light}
        </span>
      </button>

      {/* System Mode Button */}
      <button
        type="button"
        onClick={() => handleThemeChange('system')}
        className={getButtonClasses('system')}
        aria-label="System mode"
        aria-pressed={theme === 'system'}
        title="System mode"
      >
        <span className={config.icon} role="img" aria-label="Computer icon">
          {icons.system}
        </span>
      </button>

      {/* Dark Mode Button */}
      <button
        type="button"
        onClick={() => handleThemeChange('dark')}
        className={getButtonClasses('dark')}
        aria-label="Dark mode"
        aria-pressed={theme === 'dark'}
        title="Dark mode"
      >
        <span className={config.icon} role="img" aria-label="Moon icon">
          {icons.dark}
        </span>
      </button>
    </div>
  );
}
