import { cn } from '../lib/utils';

interface BackgroundGradientProps {
  /** Optional className for the container */
  className?: string;
  /** Number of floating orbs (default: 3) */
  orbCount?: number;
}

/**
 * BackgroundGradient - Animated floating gradient orbs background
 *
 * Creates animated floating gradient spheres with blur effect for a modern aesthetic.
 * Fully responsive and works with dark mode.
 *
 * @example
 * ```tsx
 * <BackgroundGradient />
 * // or with custom orb count
 * <BackgroundGradient orbCount={5} />
 * ```
 */
export default function BackgroundGradient({ className, orbCount = 3 }: BackgroundGradientProps) {
  const orbColors = [
    'bg-primary/30',
    'bg-secondary/30',
    'bg-accent/20',
    'bg-success/20',
    'bg-warning/20',
  ];

  const orbAnimations = [
    'animate-float-1',
    'animate-float-2',
    'animate-float-1',
    'animate-float-2',
    'animate-float-1',
  ];

  return (
    <div
      className={cn('pointer-events-none fixed inset-0 z-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      {/* Gradient orbs */}
      {Array.from({ length: Math.min(orbCount, 5) }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'absolute rounded-full blur-3xl',
            orbColors[index % orbColors.length],
            orbAnimations[index % orbAnimations.length]
          )}
          style={{
            width: `${300 + index * 50}px`,
            height: `${300 + index * 50}px`,
            top: `${10 + index * 20}%`,
            left: `${10 + index * 15}%`,
            opacity: 0.6 - index * 0.1,
          }}
        />
      ))}
    </div>
  );
}
