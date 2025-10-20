# Form

Complete form management solution integrating React Hook Form with accessible, composable form components.

## Import

```tsx
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useForm,
} from '@subbiah/reusable/components/ui/form';
```

## Features

- **React Hook Form Integration**: Full power of react-hook-form with elegant components
- **Accessibility**: Proper ARIA labeling and error associations
- **Validation**: Built-in error display and field state management
- **Composable**: Flexible components for any form layout
- **Type-Safe**: Full TypeScript support with type inference

## Basic Usage

```tsx
import { useForm } from '@subbiah/reusable/components/ui/form';
import { Input } from '@subbiah/reusable/components/ui/input';

const form = useForm({
  defaultValues: {
    username: '',
  },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="johndoe" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>;
```

**Visual:**

> Form with "Username" label, input field with placeholder, helper text below in muted color, and error messages (if any) in red

## Components

### Form

Form provider that wraps your form and provides context.

**Props:** Same as React Hook Form's `FormProvider`

### FormField

Controller component that connects a field to React Hook Form.

| Prop      | Type                    | Description                           |
| --------- | ----------------------- | ------------------------------------- |
| `control` | `Control<TFieldValues>` | Form control from useForm             |
| `name`    | `TName`                 | Field name (typed)                    |
| `render`  | `Function`              | Render prop with field and fieldState |

### FormItem

Wrapper for individual form field with spacing.

| Prop        | Type                                   | Description            |
| ----------- | -------------------------------------- | ---------------------- |
| `className` | `string`                               | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>` | Standard div props     |

### FormLabel

Label for form fields with error state styling.

| Prop        | Type                                           | Description            |
| ----------- | ---------------------------------------------- | ---------------------- |
| `className` | `string`                                       | Additional CSS classes |
| `...props`  | `React.ComponentPropsWithoutRef<typeof Label>` | Label component props  |

### FormControl

Wrapper for form input controls with proper ARIA attributes.

| Prop       | Type                                          | Description |
| ---------- | --------------------------------------------- | ----------- |
| `...props` | `React.ComponentPropsWithoutRef<typeof Slot>` | Slot props  |

### FormDescription

Helper text for form fields.

| Prop        | Type                                         | Description            |
| ----------- | -------------------------------------------- | ---------------------- |
| `className` | `string`                                     | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLParagraphElement>` | Standard p props       |

### FormMessage

Error message display for form fields.

| Prop        | Type                                         | Description               |
| ----------- | -------------------------------------------- | ------------------------- |
| `className` | `string`                                     | Additional CSS classes    |
| `children`  | `React.ReactNode`                            | Custom message (optional) |
| `...props`  | `React.HTMLAttributes<HTMLParagraphElement>` | Standard p props          |

## Examples

### Example 1: Login Form

```tsx
const form = useForm({
  defaultValues: {
    email: '',
    password: '',
  },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="you@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Login</Button>
  </form>
</Form>;
```

**Visual:**

> Two-field form with email and password inputs, labels above each, error messages below when validation fails, and submit button

### Example 2: Form with Validation

```tsx
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
});

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: '',
    email: '',
  },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Must be at least 3 characters</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>;
```

**Visual:**

> Form with zod validation, shows error messages in destructive red below fields when validation fails

### Example 3: Form with Textarea

```tsx
<FormField
  control={form.control}
  name="bio"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Bio</FormLabel>
      <FormControl>
        <Textarea placeholder="Tell us about yourself" className="resize-none" {...field} />
      </FormControl>
      <FormDescription>Brief description about yourself</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

**Visual:**

> Multi-line textarea with label, helper text, and error message support

### Example 4: Form with Select/Checkbox

```tsx
<FormField
  control={form.control}
  name="newsletter"
  render={({ field }) => (
    <FormItem className="flex items-center space-x-2">
      <FormControl>
        <input type="checkbox" checked={field.value} onChange={field.onChange} />
      </FormControl>
      <FormLabel className="!mt-0">Subscribe to newsletter</FormLabel>
    </FormItem>
  )}
/>
```

**Visual:**

> Checkbox with label in horizontal layout, no top margin on label

### Example 5: Multi-step Form

```tsx
const [step, setStep] = useState(1);

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    {step === 1 && (
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )}
    {step === 2 && (
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )}
    <div className="flex gap-2">
      {step > 1 && (
        <Button type="button" onClick={() => setStep(step - 1)}>
          Back
        </Button>
      )}
      {step < 2 ? (
        <Button type="button" onClick={() => setStep(step + 1)}>
          Next
        </Button>
      ) : (
        <Button type="submit">Submit</Button>
      )}
    </div>
  </form>
</Form>;
```

**Visual:**

> Form that changes fields based on current step, with back/next/submit buttons

## Accessibility

- Automatic ARIA labeling via `htmlFor` and `id` association
- Error messages linked via `aria-describedby`
- Invalid fields marked with `aria-invalid`
- FormDescription provides additional context via `aria-describedby`
- Focus management handled by React Hook Form
- Label turns red when field has error

## TypeScript

```tsx
// Fully typed with React Hook Form
const form = useForm<{
  username: string;
  email: string;
}>({
  defaultValues: {
    username: '',
    email: '',
  },
});

// Field names are type-checked
<FormField
  control={form.control}
  name="username" // ✓ Typed
  // name="invalid" // ✗ Type error
  render={({ field }) => <FormItem>{/* ... */}</FormItem>}
/>;
```

## Notes

- FormItem uses `space-y-2` for consistent vertical spacing
- FormLabel shows destructive color when field has error
- FormDescription uses `text-sm text-muted-foreground`
- FormMessage uses `text-sm font-medium text-destructive`
- Each FormItem generates unique IDs for proper ARIA association
- Uses React Hook Form's Controller for field management
- FormControl uses Radix Slot for polymorphic rendering
- Error messages only show when field has error
- Form state is fully controlled by React Hook Form
- Supports all React Hook Form features (validation, async validation, etc.)
