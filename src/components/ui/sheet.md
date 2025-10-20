# Sheet

Modal drawer/sheet component built on Radix Dialog with slide-in animations from four directions.

## Import

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetPortal,
  SheetOverlay
} from '@subbiah/reusable/components/ui/sheet';
```

## Features

- **Four Directions**: Slide from top, bottom, left, or right
- **Overlay**: Semi-transparent dark backdrop
- **Accessible**: Full keyboard navigation and focus management
- **Auto-close Button**: Built-in X button in top-right corner
- **Smooth Animations**: Slide and fade animations via Radix

## Basic Usage

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Sheet description goes here</SheetDescription>
    </SheetHeader>
    <div>Content goes here</div>
  </SheetContent>
</Sheet>
```

**Visual:**

> Button that when clicked opens a slide-in panel from the right side with dark overlay backdrop, title, description, and auto-close X button

## Props

### Sheet

| Prop          | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| Root props from Radix Dialog | - | open, onOpenChange, defaultOpen, modal |

### SheetTrigger

| Prop       | Type      | Description                                       |
| ---------- | --------- | ------------------------------------------------- |
| `asChild`  | `boolean` | Render as child component (recommended)           |

### SheetContent

| Prop        | Type                                         | Default   | Description                              |
| ----------- | -------------------------------------------- | --------- | ---------------------------------------- |
| `side`      | `"top" \| "bottom" \| "left" \| "right"`     | `"right"` | Direction from which sheet slides in     |
| `className` | `string`                                     | -         | Additional CSS classes                   |
| `children`  | `React.ReactNode`                            | -         | Sheet content                            |

### SheetHeader, SheetFooter

| Prop        | Type                                      | Description            |
| ----------- | ----------------------------------------- | ---------------------- |
| `className` | `string`                                  | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLDivElement>`    | Standard div props     |

### SheetTitle, SheetDescription

| Prop        | Type                                            | Description                |
| ----------- | ----------------------------------------------- | -------------------------- |
| `className` | `string`                                        | Additional CSS classes     |
| `...props`  | Props from Radix Dialog Title/Description       | Standard props             |

## Variants

### Right Sheet (Default)

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Right</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Right Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

**Visual:**

> Panel slides in from right side, max width sm (640px), full height, with right border

### Left Sheet

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Left Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

**Visual:**

> Panel slides in from left side, max width sm (640px), full height, with left border

### Top Sheet

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Top</Button>
  </SheetTrigger>
  <SheetContent side="top">
    <SheetHeader>
      <SheetTitle>Top Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

**Visual:**

> Panel slides down from top, full width, with bottom border

### Bottom Sheet

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Bottom</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Bottom Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

**Visual:**

> Panel slides up from bottom, full width, with top border

## Examples

### Example 1: Navigation Menu

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" size="icon">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    <nav className="flex flex-col gap-4 mt-6">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </SheetContent>
</Sheet>
```

**Visual:**

> Hamburger menu icon that opens left-side navigation sheet with links

### Example 2: Form in Sheet

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Add User</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Add New User</SheetTitle>
      <SheetDescription>
        Enter the user details below
      </SheetDescription>
    </SheetHeader>
    <form className="space-y-4 mt-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
    </form>
    <SheetFooter className="mt-6">
      <Button type="submit">Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

**Visual:**

> Button opens right-side sheet with form inputs and submit button in footer

### Example 3: Controlled Sheet

```tsx
const [open, setOpen] = useState(false);

<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild>
    <Button>Open Controlled</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Controlled Sheet</SheetTitle>
    </SheetHeader>
    <p>This sheet's state is controlled externally.</p>
    <Button onClick={() => setOpen(false)}>Close via State</Button>
  </SheetContent>
</Sheet>
```

**Visual:**

> Sheet with external state control, can be closed programmatically or via UI

### Example 4: Programmatic Close

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Confirm Action</SheetTitle>
    </SheetHeader>
    <p className="py-4">Are you sure you want to proceed?</p>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button onClick={handleConfirm}>Confirm</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

**Visual:**

> Sheet with cancel and confirm buttons in footer, both close the sheet when clicked

### Example 5: Sheet Without Header

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Quick View</Button>
  </SheetTrigger>
  <SheetContent>
    <div className="mt-8">
      <p>Content without a formal header</p>
    </div>
  </SheetContent>
</Sheet>
```

**Visual:**

> Sheet with only close button and content, no header section

## Accessibility

- Built on Radix UI Dialog primitive
- Keyboard navigation (Escape to close, Tab to cycle)
- Focus trap when open (focus stays within sheet)
- Auto-focus on first focusable element
- Close button has aria-label and screen reader text ("Close")
- SheetTitle provides accessible name for dialog
- Overlay click closes sheet by default
- Proper ARIA attributes (role, aria-describedby, etc.)

## TypeScript

```tsx
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}
```

## Notes

- Uses Radix Dialog as base (`Sheet = SheetPrimitive.Root`)
- Overlay is semi-transparent black (`bg-black/80`)
- Z-index is high (`z-50`) to appear above most content
- SheetContent has padding (`p-6`) and gap spacing (`gap-4`)
- Animations are smooth (300ms close, 500ms open duration)
- Side variants:
  - Right/Left: 75% width on mobile (`w-3/4`), max 640px on desktop (`sm:max-w-sm`)
  - Top/Bottom: Full width (`inset-x-0`)
- Close button is positioned absolutely (top-right, 16px from edges)
- SheetHeader: Centered text on mobile, left-aligned on desktop
- SheetFooter: Column layout on mobile, row layout on desktop
- Client-side component (uses 'use client' directive)
