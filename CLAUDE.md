# Component Library (@subbiah/reusable)

Reusable component library built with React, TypeScript, and Tailwind CSS. This is a sharable npm package used across multiple projects.

**IMPORTANT**: Any changes inside ./src triggers `/update-component-docs sync-changes` - Update docs of all files that got changed.

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

## Creative Components & Code Inspiration

### ReactBits.dev

For creative and advanced component implementations, extract code from **https://reactbits.dev/**

**Usage:**

- Browse ReactBits.dev for creative component patterns and implementations
- Extract relevant code snippets for inspiration
- Adapt code to match this library's tech stack (React 19, TypeScript, Tailwind CSS)
- Ensure components follow shadcn/ui patterns and conventions
- Update documentation after adding new creative components

**When to use ReactBits.dev:**

- Need creative UI patterns (animations, interactions, layouts)
- Looking for advanced component implementations
- Want modern React patterns and best practices
- Seeking design inspiration for custom components

**Adding ReactBits components:**

```bash
npx shadcn@latest add https://reactbits.dev/r/[component-name]
```

### Aceternity UI

Beautiful, modern UI components with animations and effects from **https://ui.aceternity.com/components**

**Usage:**

- Browse Aceternity UI for premium-quality animated components
- Components include: 3D cards, particle effects, aurora backgrounds, animated tabs, etc.
- All components are built with React, TypeScript, Tailwind CSS, and Framer Motion
- Copy-paste ready components with excellent documentation

**When to use Aceternity UI:**

- Need stunning visual effects and animations
- Building landing pages or marketing sites
- Want premium-looking UI components
- Looking for modern, eye-catching interactions

**Installation:**

- Visit https://ui.aceternity.com/components
- Browse component gallery
- Copy component code and adapt to library structure
- Install required dependencies (usually includes `framer-motion`)

### Third-Party shadcn/ui Registries

CLI-compatible third-party registries you can add to `components.json`:

#### Official Third-Party Registries

1. **Magic UI** - https://magicui.design
   - 150+ free and open-source animated components
   - Focus: Landing pages, marketing sites, animations
   - Registry: Can be added via namespace configuration

2. **Aceternity UI** - https://ui.aceternity.com
   - Beautiful components with Tailwind CSS and Framer Motion
   - Focus: Premium animated components, 3D effects, particle effects
   - Already documented in this file (see Aceternity UI section above)

3. **Shadcn Blocks** - https://www.shadcnblocks.com
   - Premium collection of 631+ uniquely crafted blocks and components
   - Focus: Pre-built sections, authentication support for private registries
   - Registry: Supports namespaced registries with API key authentication

4. **Origin UI** - https://originui.com
   - Advanced component set beyond original shadcn/ui
   - Focus: Extended functionality, complex components
   - Registry: CLI compatible

5. **Cult UI** - https://cult-ui.com
   - Apple OS-inspired components with bold designs
   - Focus: MacOS/iOS aesthetic, premium design
   - Registry: CLI compatible

6. **Kokonut UI** - https://kokonutui.com
   - 100+ UI components built with Tailwind CSS
   - Focus: Comprehensive component library
   - Registry: CLI compatible

7. **Neobrutalism Components** - https://neobrutalism.dev
   - Collection in neo-brutalism style
   - Focus: Bold, brutalist design aesthetic
   - Registry: CLI compatible

#### Configuring Multiple Registries

Add registries to `components.json` using namespaces:

```json
{
  "registries": {
    "@magicui": "https://magicui.design/r/{name}",
    "@originui": "https://originui.com/r/{name}",
    "@cultui": "https://cult-ui.com/r/{name}"
  }
}
```

**With Authentication (Private Registries):**

```json
{
  "registries": {
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}",
        "X-API-Key": "${API_KEY}"
      }
    }
  }
}
```

**Installing from Namespaced Registries:**

```bash
npx shadcn@latest add @magicui/animated-beam
npx shadcn@latest add @originui/advanced-table
npx shadcn@latest add @cultui/dock
```

### Awesome shadcn/ui

Curated list of resources, components, and extensions from **https://github.com/birobirobiro/awesome-shadcn-ui**

**What's included:**

- **Component Libraries**: Third-party shadcn/ui compatible component collections
- **Templates & Starters**: Pre-built projects using shadcn/ui
- **Themes**: Color schemes and design systems
- **Tools**: Utilities, generators, and development tools
- **Learning Resources**: Tutorials, articles, and guides

**Usage:**

- Explore the GitHub repository for component discoveries
- Find third-party registries and component libraries
- Learn from real-world implementations
- Discover tools to improve development workflow

### Integration Guidelines

**For all external components:**

1. Extract/install component code
2. Convert to TypeScript if needed (JSX → TSX)
3. Adapt imports to use library's path structure
4. Follow shadcn/ui component patterns
5. Add proper TypeScript type definitions
6. Ensure Tailwind CSS compatibility
7. Test component functionality
8. Document in `how_to_use_this_library.md`
9. Run `/update-docs sync-changes` to update documentation (if available)

**Quality checklist:**

- ✅ TypeScript types properly defined
- ✅ Responsive design implemented
- ✅ Accessible (ARIA attributes, keyboard navigation)
- ✅ Dark mode compatible
- ✅ Dependencies documented
- ✅ Usage examples provided
