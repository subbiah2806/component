# Dropdown Menu

A versatile dropdown menu component built on Radix UI with support for items, checkboxes, radio groups, labels, and nested submenus.

## Import

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from '@subbiah/reusable/components/ui/dropdown-menu';
```

## Features

- **Rich Item Types**: Support for standard items, checkbox items, and radio button items
- **Nested Submenus**: Create multi-level dropdown menus with submenu support
- **Keyboard Navigation**: Full keyboard accessibility with arrow keys, Enter, and Escape
- **Flexible Positioning**: Automatically positions menu to stay within viewport
- **Visual Feedback**: Hover and focus states with smooth animations
- **Customizable Styling**: No focus rings, subtle hover effects (muted/50 gray)
- **Scroll Prevention**: Optional modal prop to control background scroll behavior
- **Keyboard Shortcuts**: Display keyboard shortcuts for menu items
- **Grouping & Labels**: Organize menu items with labels and separators

## Basic Usage

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Visual:**

> A button that opens a dropdown menu below it when clicked. The menu displays three items: "Profile", "Settings", and "Logout" with a separator line between Settings and Logout. Items highlight with a subtle gray background on hover.

## Props

### DropdownMenu

| Prop           | Type                      | Default | Description                                         |
| -------------- | ------------------------- | ------- | --------------------------------------------------- |
| `modal`        | `boolean`                 | `true`  | Whether to prevent background scroll when menu open |
| `open`         | `boolean`                 | -       | Controlled open state                               |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback when open state changes                    |

### DropdownMenuTrigger

| Prop      | Type      | Default | Description                    |
| --------- | --------- | ------- | ------------------------------ |
| `asChild` | `boolean` | `false` | Merge props with child element |

### DropdownMenuContent

| Prop                | Type                                     | Default    | Description                                |
| ------------------- | ---------------------------------------- | ---------- | ------------------------------------------ |
| `sideOffset`        | `number`                                 | `4`        | Offset from trigger in pixels              |
| `align`             | `"start" \| "center" \| "end"`           | -          | Horizontal alignment                       |
| `side`              | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Side to position menu                      |
| `matchTriggerWidth` | `boolean`                                | `false`    | Make dropdown same width as trigger button |

### DropdownMenuItem

| Prop       | Type                     | Default | Description                    |
| ---------- | ------------------------ | ------- | ------------------------------ |
| `inset`    | `boolean`                | `false` | Add left padding for alignment |
| `disabled` | `boolean`                | `false` | Disable item interaction       |
| `onSelect` | `(event: Event) => void` | -       | Callback when item selected    |

### DropdownMenuCheckboxItem

| Prop              | Type                         | Default | Description                         |
| ----------------- | ---------------------------- | ------- | ----------------------------------- |
| `checked`         | `boolean \| "indeterminate"` | -       | Checked state of checkbox           |
| `onCheckedChange` | `(checked: boolean) => void` | -       | Callback when checked state changes |

### DropdownMenuRadioItem

| Prop    | Type     | Default | Description         |
| ------- | -------- | ------- | ------------------- |
| `value` | `string` | -       | Value of radio item |

### DropdownMenuLabel

| Prop    | Type      | Default | Description                    |
| ------- | --------- | ------- | ------------------------------ |
| `inset` | `boolean` | `false` | Add left padding for alignment |

## Examples

### With Icons and Shortcuts

```tsx
import { User, Settings, LogOut } from 'lucide-react';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>
      <User className="mr-2 h-4 w-4" />
      Profile
      <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="mr-2 h-4 w-4" />
      Settings
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <LogOut className="mr-2 h-4 w-4" />
      Logout
      <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

**Visual:**

> A dropdown menu with three items, each with an icon on the left and keyboard shortcut on the right. The logout option is separated from the others with a divider line.

### With Checkboxes

```tsx
const [showPanel, setShowPanel] = useState(true);
const [showSidebar, setShowSidebar] = useState(false);

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">View</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Toggle Views</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
      Show Panel
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
      Show Sidebar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

**Visual:**

> A dropdown menu titled "Toggle Views" with two checkbox items. Checked items display a checkmark icon on the left. Each item can be toggled independently.

### With Radio Group

```tsx
const [theme, setTheme] = useState('light');

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Theme: {theme}</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>;
```

**Visual:**

> A dropdown menu with three radio button options. The selected option displays a filled circle indicator on the left. Only one option can be selected at a time.

### With Nested Submenu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">More Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>New File</DropdownMenuItem>
    <DropdownMenuItem>New Folder</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Email</DropdownMenuItem>
        <DropdownMenuItem>Copy Link</DropdownMenuItem>
        <DropdownMenuItem>Social Media</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Visual:**

> A dropdown menu with items and a submenu. The "Share" item has a right-facing chevron icon indicating it opens another menu. Hovering over "Share" reveals a nested menu to the right with sharing options.

### With Groups

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Edit</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Edit Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Cut</DropdownMenuItem>
      <DropdownMenuItem>Copy</DropdownMenuItem>
      <DropdownMenuItem>Paste</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Find</DropdownMenuItem>
      <DropdownMenuItem>Replace</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

**Visual:**

> A dropdown menu organized into groups with labels and separators. "Cut", "Copy", and "Paste" are in one group, while "Find" and "Replace" are in another group below, separated by a horizontal line.

### Preventing Background Scroll

```tsx
<DropdownMenu modal={false}>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Download Resume</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Download as DOCX</DropdownMenuItem>
    <DropdownMenuItem>Download as PDF</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Visual:**

> A dropdown menu that doesn't lock background scrolling when opened. The background page remains scrollable while the menu is open, preventing UI jumps.

### Matching Trigger Width

```tsx
<DropdownMenu modal={false}>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="lg">
      <Download className="mr-2 h-5 w-5" />
      Download Resume
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" matchTriggerWidth>
    <DropdownMenuItem>
      <FileText className="mr-2 h-4 w-4" />
      Download as DOCX
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Download className="mr-2 h-4 w-4" />
      Download as PDF
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Visual:**

> A dropdown menu that matches the exact width of its trigger button. The menu content expands to fill the full width of the "Download Resume" button, creating a cohesive and polished appearance.

## Accessibility

- **Keyboard Navigation**:
  - `Space` or `Enter` to open menu from trigger
  - `Arrow keys` to navigate between items
  - `Enter` to select an item
  - `Escape` to close menu
- **Focus Management**: Focus automatically moves to first item when menu opens
- **Screen Reader Support**: Proper ARIA attributes for menu structure, roles, and states
- **Visual Indicators**: Checkmarks for selected checkbox/radio items, chevron for submenus
- **Disabled State**: Disabled items are not focusable and clearly indicated visually

## TypeScript

```tsx
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

// Dropdown Menu Content with matchTriggerWidth option
type DropdownMenuContentProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
  matchTriggerWidth?: boolean;
};

// Dropdown Menu Item with inset option
type DropdownMenuItemProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
};

// Dropdown Menu Checkbox Item
type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

// Dropdown Menu Radio Item
type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>;

// Dropdown Menu Label with inset option
type DropdownMenuLabelProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
};
```

## Notes

- Built on Radix UI Dropdown Menu primitives for robust accessibility
- Use `asChild` prop on trigger to merge with your custom button/trigger component
- Set `modal={false}` to prevent background scroll lock (useful for preventing UI jumps)
- Use `matchTriggerWidth` prop on content to make dropdown match the trigger button width
- Items have no focus rings and use subtle gray hover effects (`hover:bg-muted/50`)
- Content automatically positions to stay within viewport bounds
- Submenus can be nested multiple levels deep
- Use `DropdownMenuShortcut` to display keyboard shortcuts (visual only, doesn't implement shortcuts)
- Separators help organize related menu items into logical groups
- All components are fully typed with TypeScript for excellent IDE support
