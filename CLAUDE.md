# Component Library (@subbiah/reusable)

Reusable component library built with React, TypeScript, and Tailwind CSS. This is a sharable npm package used across multiple projects.

**IMPORTANT**: Any changes inside ./src triggers `/update-docs sync-changes` - Update docs of all files that got changed.

## Tech Stack

### Core Framework

- **React**: 19.2.0 (peer dependency)
- **TypeScript**: 5.4.5
- **Build System**: ESM modules with bundler resolution

### Styling

- **Tailwind CSS**: 3.4.3 (peer dependency)
- **PostCSS**: 8.4.38
- **Autoprefixer**: 10.4.19
- **Tailwind Plugins**:
  - `@tailwindcss/typography`: 0.5.19
  - `tailwindcss-animate`: 1.0.7

### UI Components & Libraries

- **Radix UI**: Headless UI primitives
  - `@radix-ui/react-dialog`: 1.1.15
  - `@radix-ui/react-label`: 2.1.7
  - `@radix-ui/react-separator`: 1.1.7
  - `@radix-ui/react-slot`: 1.2.3
- **Lucide React**: 0.546.0 (icon library)
- **shadcn/ui**: Component architecture pattern

### Utilities

- **class-variance-authority**: 0.7.1 (CVA for component variants)
- **clsx**: 2.1.1 (className manipulation)
- **tailwind-merge**: 3.3.1 (merge Tailwind classes)
- **react-hook-form**: 7.65.0 (form management)
- **react-helmet-async**: 2.0.5 (document head management)

## Code Structure

```
modules/component/
├── src/                          # Source code
│   ├── components/              # React components
│   │   └── ui/                  # shadcn/ui components
│   ├── statefulComponents/      # Components with internal state
│   ├── icons/                   # Custom icon components
│   ├── lib/                     # Utility functions and helpers
│   └── styles/                  # Global styles and CSS
├── components.json              # shadcn/ui configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Package manifest

```

## Package Exports

The library uses explicit exports in package.json:

- `./styles` - Global CSS styles
- `./tailwind.config` - Tailwind configuration for consumers
- `./initializeReusableChunks` - Library initialization component
- `./*` - Direct access to source files

## Usage Notes

- This is a library package, not a standalone application
- No build step required - consumers import from source
- TypeScript type checking available via `npm run type-check`
- Designed to work with React 19 and Tailwind CSS 3.4+

## Documentation

### Main Documentation

- **[how_to_use_this_library.md](./how_to_use_this_library.md)** - Root documentation file with installation, setup, and component index

## shadcn/ui MCP Integration

This library uses shadcn/ui components and can leverage the Model Context Protocol (MCP) for AI-assisted component discovery and installation.

### Using MCP with AI Assistants

Once configured, you can use natural language commands to interact with component registries:

**Example Prompts:**

- "Show me all available components in the shadcn registry"
- "Add the button, dialog and card components to my project"
- "Create a contact form using components from the shadcn registry"

### MCP Capabilities

The shadcn MCP server provides:

- **Browse Components** - List all available components, blocks, and templates from any configured registry
- **Search Across Registries** - Find specific components by name or functionality
- **Install with Natural Language** - Add components using conversational commands
- **Multiple Registry Support** - Access shadcn/ui default registry, third-party registries, and private registries

### Troubleshooting MCP

If components aren't loading:

1. Check `components.json` configuration
2. Restart Claude Code MCP client
3. Verify network
4. Ensure proper dependencies are installed

**Documentation**: https://ui.shadcn.com/docs/mcp
