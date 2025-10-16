import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'filled' | 'outlined' | 'text';
  color?: 'primary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
}

export function Button({
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  loading = false,
  startIcon,
  endIcon,
  fullWidth = false,
  type = 'button',
  disabled = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Size styles (padding derived from size)
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  // Variant styles
  const filledStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:ring-primary-500',
    accent: 'bg-accent-600 text-white hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-600 focus:ring-accent-500',
    neutral: 'bg-neutral-600 text-white hover:bg-neutral-700 dark:bg-neutral-500 dark:hover:bg-neutral-600 focus:ring-neutral-500',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
    warning: 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500',
    error: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
  };

  const outlinedStyles = {
    primary: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950 focus:ring-primary-500',
    accent: 'border-2 border-accent-600 text-accent-600 hover:bg-accent-50 dark:border-accent-400 dark:text-accent-400 dark:hover:bg-accent-950 focus:ring-accent-500',
    neutral: 'border-2 border-neutral-600 text-neutral-600 hover:bg-neutral-50 dark:border-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-800 focus:ring-neutral-500',
    success: 'border-2 border-success-600 text-success-600 hover:bg-success-50 dark:border-success-400 dark:text-success-400 focus:ring-success-500',
    warning: 'border-2 border-warning-600 text-warning-600 hover:bg-warning-50 dark:border-warning-400 dark:text-warning-400 focus:ring-warning-500',
    error: 'border-2 border-error-600 text-error-600 hover:bg-error-50 dark:border-error-400 dark:text-error-400 focus:ring-error-500',
  };

  const textStyles = {
    primary: 'text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-950 focus:ring-primary-500',
    accent: 'text-accent-600 hover:bg-accent-50 dark:text-accent-400 dark:hover:bg-accent-950 focus:ring-accent-500',
    neutral: 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800 focus:ring-neutral-500',
    success: 'text-success-600 hover:bg-success-50 dark:text-success-400 focus:ring-success-500',
    warning: 'text-warning-600 hover:bg-warning-50 dark:text-warning-400 focus:ring-warning-500',
    error: 'text-error-600 hover:bg-error-50 dark:text-error-400 focus:ring-error-500',
  };

  // Select variant styles
  let variantClasses = '';
  if (variant === 'filled') {
    variantClasses = filledStyles[color];
  } else if (variant === 'outlined') {
    variantClasses = outlinedStyles[color];
  } else {
    variantClasses = textStyles[color];
  }

  // Full width
  const widthClass = fullWidth ? 'w-full' : '';

  // Combine classes
  const classes = `${baseStyles} ${sizeStyles[size]} ${variantClasses} ${widthClass} ${className}`.trim();

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : startIcon}
      {children}
      {!loading && endIcon}
    </button>
  );
}

export type { ButtonProps };
