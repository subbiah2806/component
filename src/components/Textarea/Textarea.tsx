import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'outlined' | 'filled' | 'standard';
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  showCharCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'outlined',
      label,
      helperText,
      error = false,
      errorMessage,
      showCharCount = false,
      className = '',
      id,
      value,
      maxLength,
      ...props
    },
    ref
  ) => {
    // Generate ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    // Calculate character count
    const currentLength = value ? String(value).length : 0;

    // Base styles
    const baseStyles = 'w-full transition-all duration-200 focus:outline-none resize-none';

    // Variant styles
    const variantStyles = {
      outlined: `border-2 rounded-lg px-4 py-2.5 ${
        error
          ? 'border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-200'
          : 'border-slate-300 dark:border-slate-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900'
      } bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100`,
      filled: `border-0 border-b-2 rounded-t-lg px-4 py-2.5 ${
        error
          ? 'border-red-600 focus:border-red-600'
          : 'border-slate-300 dark:border-slate-600 focus:border-blue-600'
      } bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100`,
      standard: `border-0 border-b-2 px-0 py-2 ${
        error
          ? 'border-red-600 focus:border-red-600'
          : 'border-slate-300 dark:border-slate-600 focus:border-blue-600'
      } bg-transparent text-slate-900 dark:text-slate-100`,
    };

    // Disabled styles
    const disabledStyles = props.disabled ? 'opacity-60 cursor-not-allowed' : '';

    // Combine textarea classes
    const textareaClasses = `${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`.trim();

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={`block text-sm font-medium mb-1.5 ${
              error
                ? 'text-red-600 dark:text-red-400'
                : 'text-slate-700 dark:text-slate-300'
            } ${props.disabled ? 'opacity-60' : ''}`}
          >
            {label}
            {props.required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}

        {/* Textarea element - SPREADS ALL PROPS */}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={textareaClasses}
          aria-invalid={error}
          aria-describedby={
            error && errorMessage
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          {...props}
        />

        {/* Footer: Helper text/error + character count */}
        <div className="flex items-start justify-between gap-2 mt-1.5">
          {/* Helper text or error message */}
          {(helperText || errorMessage) && (
            <p
              id={error && errorMessage ? `${textareaId}-error` : `${textareaId}-helper`}
              className={`text-sm flex-1 ${
                error
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {error && errorMessage ? errorMessage : helperText}
            </p>
          )}

          {/* Character count */}
          {showCharCount && maxLength && (
            <p
              className={`text-sm whitespace-nowrap ${
                currentLength > maxLength
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export type { TextareaProps };
