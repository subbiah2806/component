# ErrorBoundary

React error boundary component that catches JavaScript errors in component tree and displays a fallback UI.

## Import

```tsx
import ErrorBoundary from '@subbiah/reusable/components/ErrorBoundary';
```

## Features

- **Error Catching**: Catches errors in child component tree
- **Fallback UI**: Beautiful error screen with recovery options
- **Development Mode**: Shows error details and stack trace in dev
- **Recovery Actions**: Try Again and Go Home buttons
- **Error Logging**: Logs errors to console (extensible to error tracking services)

## Basic Usage

```tsx
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

**Visual:**

> Renders children normally. If an error occurs, shows full-screen error UI with gradient background, error icon, message, and action buttons

## Props

| Prop       | Type         | Default | Description                                            |
| ---------- | ------------ | ------- | ------------------------------------------------------ |
| `children` | `ReactNode`  | -       | **Required**. Components to wrap with error boundary   |
| `isDev`    | `boolean`    | `false` | Show error details (error message and stack trace)     |

## Examples

### Example 1: Wrap Entire App

```tsx
import ErrorBoundary from '@subbiah/reusable/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary isDev={import.meta.env.DEV}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ErrorBoundary>
  );
}
```

**Visual:**

> Error boundary wraps entire app. Any error in routing or components shows error UI instead of white screen

### Example 2: Wrap Specific Section

```tsx
<div className="dashboard">
  <Header />
  <ErrorBoundary>
    <Sidebar />
  </ErrorBoundary>
  <ErrorBoundary>
    <MainContent />
  </ErrorBoundary>
  <Footer />
</div>
```

**Visual:**

> Sidebar and MainContent have separate error boundaries. Error in sidebar won't crash main content (and vice versa)

### Example 3: Development Mode

```tsx
<ErrorBoundary isDev={true}>
  <ProblematicComponent />
</ErrorBoundary>
```

**Visual:**

> Shows error details box with error message and expandable stack trace for debugging

### Example 4: Production Mode

```tsx
<ErrorBoundary isDev={false}>
  <App />
</ErrorBoundary>
```

**Visual:**

> Shows user-friendly error message without technical details. Cleaner UI for end users

### Example 5: With Custom Error

```tsx
function BuggyComponent() {
  throw new Error('Something went wrong in this component!');
}

<ErrorBoundary isDev={true}>
  <BuggyComponent />
</ErrorBoundary>
```

**Visual:**

> Catches thrown error and displays error screen with "Something went wrong in this component!" message

### Example 6: Nested Error Boundaries

```tsx
<ErrorBoundary>
  <Layout>
    <ErrorBoundary>
      <CriticalSection />
    </ErrorBoundary>
    <ErrorBoundary>
      <OptionalSection />
    </ErrorBoundary>
  </Layout>
</ErrorBoundary>
```

**Visual:**

> Inner boundaries catch section-specific errors. Outer boundary catches layout/global errors. Provides granular error isolation

## Error Screen Details

### User-Friendly Elements

> Gradient background from background to secondary color, centered card with backdrop blur, error icon in red circular background (48px), "Something went wrong" title (3xl, bold), apologetic message

### Developer Elements (isDev={true})

> Additional box with light background showing error details: error message in monospace red text, expandable "Component Stack Trace" details with full stack in monospace

### Action Buttons

> Two buttons: "Try Again" (primary, resets error state) and "Go to Home" (outline, navigates to /), both full-width on mobile, side-by-side on desktop

### Support Text

> Small monospace text at bottom: "If the problem persists, please contact support or refresh the page."

## Accessibility

- Uses semantic HTML structure
- Error icon has `aria-hidden="true"` (text provides context)
- Focus management handled by button elements
- Clear call-to-action buttons with proper labels
- Screen-readable error messages
- High contrast error screen

## TypeScript

```tsx
interface ErrorBoundaryProps {
  children: ReactNode;
  isDev?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}
```

## Notes

- Class component (required for error boundaries)
- Uses `getDerivedStateFromError` for state updates
- Uses `componentDidCatch` for error logging
- Logs to console by default
- TODO comment suggests integrating error tracking service (Sentry, LogRocket)
- Try Again button calls `handleReset` which resets error state
- Go Home button navigates to `/` via `window.location.href`
- Error details only shown when `isDev={true}`
- Full-screen layout (`min-h-screen`)
- Responsive design (mobile-first)
- Uses theme colors (card, destructive, muted-foreground, etc.)
- Stack trace is expandable via `<details>` element
- Does NOT catch errors in:
  - Event handlers (use try/catch)
  - Asynchronous code (use try/catch)
  - Server-side rendering
  - Errors in error boundary itself
