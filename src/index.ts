// ============================================================================
// UI Components
// ============================================================================
export { Button, buttonVariants } from './components/ui/button';
export type { ButtonProps } from './components/ui/button';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/ui/card';

export { Input } from './components/ui/input';
export { Label } from './components/ui/label';
export { Separator } from './components/ui/separator';
export { Badge, badgeVariants } from './components/ui/badge';
export type { BadgeProps } from './components/ui/badge';
export { Textarea } from './components/ui/textarea';
export { Skeleton } from './components/ui/skeleton';

// ============================================================================
// Utility Components
// ============================================================================
export { default as DataFetchWrapper } from './components/DataFetchWrapper';
export { default as ScrollToTop } from './components/ScrollToTop';
export { default as SEO } from './components/SEO';
export { default as ErrorBoundary } from './components/ErrorBoundary';
export { default as ThemeToggle } from './components/ThemeToggle';
export { default as CursorToggle } from './components/CursorToggle';
export { default as BackgroundGradient } from './components/BackgroundGradient';

// ============================================================================
// Icon Components
// ============================================================================
export * from './components/icons';

// ============================================================================
// Contexts & Hooks
// ============================================================================
export { ThemeProvider, useThemeContext } from './contexts/ThemeContext';
export { AudioProvider, useAudioContext } from './contexts/AudioContext';
export { CursorProvider, useCursorContext } from './contexts/CursorContext';

// ============================================================================
// Providers
// ============================================================================
export { ComponentProvider } from './providers/ComponentProvider';

// ============================================================================
// Utilities
// ============================================================================
export { cn } from './lib/utils';
