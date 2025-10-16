import { ReactNode, AnchorHTMLAttributes } from 'react';

/**
 * Link component props interface
 * Extends native anchor attributes while providing Material Design styling
 */
interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /**
   * Visual variant of the link
   * @default 'text'
   */
  variant?: 'text' | 'underlined' | 'button';

  /**
   * Color theme of the link
   * @default 'primary'
   */
  color?: 'primary' | 'accent' | 'neutral' | 'inherit';

  /**
   * Icon displayed before the link text
   */
  startIcon?: ReactNode;

  /**
   * Icon displayed after the link text
   */
  endIcon?: ReactNode;

  /**
   * Whether this is an external link (shows external icon)
   * @default false
   */
  external?: boolean;

  /**
   * Internal navigation path (for React Router)
   * Use this for internal links within your application
   */
  to?: string;

  /**
   * External URL
   * Use this for external links outside your application
   */
  href?: string;

  /**
   * Link content
   */
  children: ReactNode;
}

/**
 * Link Component
 *
 * A flexible link component with Material Design styling, supporting both internal
 * and external navigation. Can be used standalone or integrated with React Router.
 *
 * @example
 * ```tsx
 * // External link
 * <Link href="https://example.com" external>Visit Site</Link>
 *
 * // Internal link (use with React Router)
 * <Link to="/about">About</Link>
 *
 * // With icons
 * <Link to="/home" startIcon={<HomeIcon />}>Home</Link>
 *
 * // Button variant
 * <Link href="/download" variant="button" color="accent">Download</Link>
 * ```
 */
export function Link({
  variant = 'text',
  color = 'primary',
  startIcon,
  endIcon,
  external = false,
  to,
  href,
  className = '',
  children,
  ...props
}: LinkProps) {
  // Determine if this is an external link
  const isExternal = external || (href && !to);
  const linkHref = href || to || '#';

  // Base styles - common to all variants
  const baseStyles = 'inline-flex items-center gap-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium';

  // Color styles - using theme colors with dark mode support
  const colorStyles = {
    primary: 'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 focus:ring-primary-500',
    accent: 'text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 focus:ring-accent-500',
    neutral: 'text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 focus:ring-neutral-500',
    inherit: 'text-inherit hover:opacity-80 focus:ring-neutral-500',
  };

  // Variant styles - different visual presentations
  const variantStyles = {
    text: '',
    underlined: 'underline underline-offset-2 hover:underline-offset-4 decoration-2',
    button: 'px-4 py-2 rounded-lg bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30 bg-current',
  };

  // Combine all classes
  const classes = `${baseStyles} ${colorStyles[color]} ${variantStyles[variant]} ${className}`.trim();

  // External link icon (Material Design inspired)
  const externalIcon = isExternal && (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );

  return (
    <a
      href={linkHref}
      className={classes}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {startIcon}
      <span>{children}</span>
      {endIcon || externalIcon}
    </a>
  );
}

export type { LinkProps };
