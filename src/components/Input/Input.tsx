import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'outlined' | 'filled' | 'standard';
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'outlined',
      label,
      helperText,
      error = false,
      errorMessage,
      startIcon,
      endIcon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // Generate ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Base styles
    const baseStyles = 'w-full transition-all duration-200 focus:outline-none';

    // Variant styles
    const variantStyles = {
      outlined: `border-2 rounded-lg px-4 py-2.5 ${
        error
          ? 'border-error-600 focus:border-error-600 focus:ring-2 focus:ring-error-200'
          : 'border-neutral-300 dark:border-neutral-600 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900'
      } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100`,
      filled: `border-0 border-b-2 rounded-t-lg px-4 py-2.5 ${
        error
          ? 'border-error-600 focus:border-error-600'
          : 'border-neutral-300 dark:border-neutral-600 focus:border-primary-600'
      } bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100`,
      standard: `border-0 border-b-2 px-0 py-2 ${
        error
          ? 'border-error-600 focus:border-error-600'
          : 'border-neutral-300 dark:border-neutral-600 focus:border-primary-600'
      } bg-transparent text-neutral-900 dark:text-neutral-100`,
    };

    // Disabled styles
    const disabledStyles = props.disabled
      ? 'opacity-60 cursor-not-allowed'
      : '';

    // Icon padding adjustments
    const iconPadding = startIcon ? 'pl-10' : endIcon ? 'pr-10' : '';

    // Combine input classes
    const inputClasses = `${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${iconPadding} ${className}`.trim();

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium mb-1.5 ${
              error
                ? 'text-error-600 dark:text-error-400'
                : 'text-neutral-700 dark:text-neutral-300'
            } ${props.disabled ? 'opacity-60' : ''}`}
          >
            {label}
            {props.required && <span className="text-error-600 ml-1">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Start icon */}
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none">
              {startIcon}
            </div>
          )}

          {/* Input element - SPREADS ALL PROPS */}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={error}
            aria-describedby={
              error && errorMessage
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />

          {/* End icon */}
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>

        {/* Helper text or error message */}
        {(helperText || errorMessage) && (
          <p
            id={error && errorMessage ? `${inputId}-error` : `${inputId}-helper`}
            className={`text-sm mt-1.5 ${
              error
                ? 'text-error-600 dark:text-error-400'
                : 'text-neutral-600 dark:text-neutral-400'
            }`}
          >
            {error && errorMessage ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export type { InputProps };
