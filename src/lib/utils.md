# Utilities

## cn(...inputs: ClassValue[]): string

Merges and deduplicates Tailwind CSS class names.

```tsx
import { cn } from '@subbiah/reusable/lib/utils';

cn('px-4 py-2'); // "px-4 py-2"
cn('p-4', 'p-6'); // "p-6" (later overrides earlier)
cn('base', isActive && 'active'); // conditional classes
```
