import { ReactNode, HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'outlined' | 'elevated' | 'plain';
  elevation?: 0 | 1 | 2 | 3 | 4;
  size?: 'small' | 'medium' | 'large';
  rounded?: 'none' | 'small' | 'medium' | 'large' | 'full';
  hoverable?: boolean;
  clickable?: boolean;
  children: ReactNode;
}

export function Container({
  variant = 'card',
  elevation = 0,
  size = 'medium',
  rounded = 'medium',
  hoverable = false,
  clickable = false,
  className = '',
  children,
  ...props
}: ContainerProps) {
  // Size styles (padding derived from size)
  const sizeStyles = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  // Variant styles
  const variantStyles = {
    card: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
    outlined: 'border border-neutral-300 dark:border-neutral-600',
    elevated: 'bg-white dark:bg-neutral-800',
    plain: 'bg-transparent',
  };

  // Elevation styles
  const elevationStyles = {
    0: '',
    1: 'shadow-sm',
    2: 'shadow-md',
    3: 'shadow-lg',
    4: 'shadow-xl',
  };

  // Rounded styles
  const roundedStyles = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-lg',
    large: 'rounded-xl',
    full: 'rounded-full',
  };

  // Interaction styles
  const hoverStyles = hoverable ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1' : '';
  const cursorStyles = clickable ? 'cursor-pointer' : '';

  // Combine classes
  const classes = `${sizeStyles[size]} ${variantStyles[variant]} ${elevationStyles[elevation]} ${roundedStyles[rounded]} ${hoverStyles} ${cursorStyles} ${className}`.trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export type { ContainerProps };
