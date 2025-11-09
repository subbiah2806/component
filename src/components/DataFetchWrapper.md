# DataFetchWrapper

Smart wrapper component that handles loading, error, and empty states for data fetching operations.

## Import

```tsx
import DataFetchWrapper from '@subbiah/reusable/components/DataFetchWrapper';
```

## Features

- **Loading State**: Animated spinner with customizable message
- **Error State**: Error display with icon and formatted message
- **Empty State**: Centered empty UI with optional custom icon, title, and message
- **Success State**: Renders children when data loads successfully
- **Customizable**: Override loading/empty messages, titles, and optionally provide empty state icon

## Basic Usage

```tsx
<DataFetchWrapper isLoading={isLoading} error={error} isEmpty={!data?.length}>
  <YourComponent data={data} />
</DataFetchWrapper>
```

**Visual:**

> Shows loading spinner while fetching, error box if failed, empty inbox if no data, or renders children when data is loaded successfully

## Props

| Prop             | Type                      | Default               | Description                                         |
| ---------------- | ------------------------- | --------------------- | --------------------------------------------------- |
| `isLoading`      | `boolean`                 | -                     | **Required**. Loading state indicator               |
| `error`          | `string \| Error \| null` | -                     | Error to display (string, Error object, or null)    |
| `isEmpty`        | `boolean`                 | `false`               | Whether data is empty                               |
| `children`       | `ReactNode`               | -                     | **Required**. Content to render when data is loaded |
| `className`      | `string`                  | `''`                  | Additional CSS classes for wrapper                  |
| `loadingMessage` | `string`                  | `'Loading...'`        | Custom loading message                              |
| `emptyMessage`   | `string`                  | `'No data available'` | Custom empty state message                          |
| `emptyTitle`     | `string`                  | `'No Data'`           | Custom empty state title                            |
| `emptyIcon`      | `ReactNode`               | -                     | Optional icon to render in empty state              |

## State Priority

States are checked in this order:

1. **Loading**: Shows if `isLoading` is true
2. **Error**: Shows if `error` is truthy
3. **Empty**: Shows if `isEmpty` is true
4. **Success**: Renders `children`

## Examples

### Example 1: Basic Data Fetch

```tsx
const { data, isLoading, error } = useQuery('users', fetchUsers);

<DataFetchWrapper isLoading={isLoading} error={error} isEmpty={!data?.length}>
  <UserList users={data} />
</DataFetchWrapper>;
```

**Visual:**

> Shows spinner during fetch, displays UserList when loaded, shows error box if fetch fails, shows empty inbox if no users

### Example 2: Custom Empty State with Icon

```tsx
import { ShoppingCart } from 'lucide-react';

<DataFetchWrapper
  isLoading={isLoading}
  error={error}
  isEmpty={!products?.length}
  loadingMessage="Fetching products..."
  emptyTitle="No Products Found"
  emptyMessage="Try adjusting your filters."
  emptyIcon={<ShoppingCart className="h-16 w-16 text-muted-foreground" aria-hidden="true" />}
>
  <ProductGrid products={products} />
</DataFetchWrapper>
```

**Visual:**

> Loading shows "Fetching products...", empty state shows shopping cart icon (64px) with "No Products Found" title and custom filter message

### Example 3: Error Handling

```tsx
<DataFetchWrapper
  isLoading={false}
  error={new Error('Failed to connect to server')}
  isEmpty={false}
>
  <div>This won't render due to error</div>
</DataFetchWrapper>
```

**Visual:**

> Red error box with alert triangle icon showing "Failed to connect to server"

### Example 4: Empty State Without Icon

```tsx
<DataFetchWrapper
  isLoading={false}
  error={null}
  isEmpty={true}
  emptyTitle="No Messages"
  emptyMessage="Your inbox is empty"
>
  <MessageList />
</DataFetchWrapper>
```

**Visual:**

> Centered empty state with "No Messages" title and "Your inbox is empty" message (no icon)

### Example 5: With Custom Styling

```tsx
<DataFetchWrapper
  isLoading={isLoading}
  error={error}
  isEmpty={!data?.length}
  className="min-h-[400px]"
>
  <DataTable data={data} />
</DataFetchWrapper>
```

**Visual:**

> Wrapper has minimum height of 400px, centers loading/error/empty states vertically

### Example 6: Empty State with Custom Icon

```tsx
import { Inbox } from 'lucide-react';

<DataFetchWrapper
  isLoading={isLoading}
  error={error}
  isEmpty={!messages?.length}
  emptyTitle="No Messages"
  emptyMessage="Your inbox is empty"
  emptyIcon={<Inbox className="h-16 w-16 text-muted-foreground" aria-hidden="true" />}
>
  <MessageList messages={messages} />
</DataFetchWrapper>
```

**Visual:**

> Empty state shows inbox icon (64px) with "No Messages" title and "Your inbox is empty" message

### Example 7: Nested Fetch

```tsx
<DataFetchWrapper isLoading={usersLoading} error={usersError} isEmpty={!users?.length}>
  <div>
    <h2>Users</h2>
    <DataFetchWrapper isLoading={postsLoading} error={postsError} isEmpty={!posts?.length}>
      <PostsList posts={posts} />
    </DataFetchWrapper>
  </div>
</DataFetchWrapper>
```

**Visual:**

> Nested data fetching: outer wrapper for users, inner wrapper for posts. Each handles its own loading/error/empty states

## Visual States

### Loading State

> Centered spinner (Loader2 icon) with 48px size in primary color, animated spin, loading message below in muted color

### Error State

> Red-bordered box with red background tint, alert triangle icon (24px) on left, "Error" heading in semibold, error message below

### Empty State

> Centered layout with optional custom icon (typically 64px), title in semibold text-foreground (text-lg), empty message below in text-muted-foreground (text-sm)

### Success State

> Renders children directly with wrapper's className applied

## Accessibility

- Loading spinner uses `text-primary` for theme-aware color
- Error icon has `aria-hidden="true"` (text provides context)
- Empty icon has `aria-hidden="true"` (text provides context)
- All states use semantic HTML structure
- Proper color contrast in all states
- Loading animation respects prefers-reduced-motion

## TypeScript

```tsx
interface DataFetchWrapperProps {
  isLoading: boolean;
  error?: string | Error | null;
  isEmpty?: boolean;
  children: ReactNode;
  className?: string;
  loadingMessage?: string;
  emptyMessage?: string;
  emptyTitle?: string;
  emptyIcon?: ReactNode;
}
```

## Notes

- Full width by default (`w-full`)
- Uses lucide-react icons (Loader2 for loading, AlertTriangle for errors)
- Loading spinner is 48px (`h-12 w-12`) with `animate-spin`
- Error state uses bordered alert box with icon (24px) and destructive styling
- Empty state uses centered layout with 32px padding (`p-8`)
- Empty state icon is optional - only rendered if `emptyIcon` prop is provided
- Empty state structure: optional icon, title (text-lg), message (text-sm)
- Error message supports Error objects, strings, or booleans
- `emptyIcon` can be any ReactNode (typically a Lucide icon with `h-16 w-16` sizing)
- Children only render when not loading, no error, and not empty
- Title and message can be customized for empty state independently
