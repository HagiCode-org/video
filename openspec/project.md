# Project Context

## Purpose
A Remotion-based video project for programmatic video creation using React. This project enables creating videos through code, allowing for dynamic, data-driven, and reproducible video content.

## Tech Stack
- **Framework**: Remotion 4.0.405 - React-based video creation framework
- **Runtime**: React 19.2.3 with React DOM 19.2.3
- **Language**: TypeScript 5.9.3 (target: ES2018)
- **Styling**: Tailwind CSS 4.0.0 with @remotion/tailwind-v4 integration
- **Validation**: Zod 3.22.3 for schema validation with @remotion/zod-types
- **Build Tools**: Remotion CLI 4.0.405, ESLint 9.19.0, Prettier 3.6.0
- **Video Output**: JPEG format, auto-overwrite enabled

## Project Conventions

### Code Style
- **TypeScript**: Strict mode enabled, no unused locals, consistent casing enforced
- **React**: Functional components with hooks, JSX transform (react-jsx)
- **File Organization**: Component-based structure with co-located styles and constants
- **Naming**: PascalCase for components, camelCase for utilities and hooks

### Architecture Patterns
- **Composition-Based**: Videos are defined as `Composition` entries in `Root.tsx`
- **Component Hierarchy**: Atomic design pattern - `Logo`, `Title`, `Subtitle`, `Arc`, `Atom` components
- **Animation**: Uses Remotion's `spring()`, `interpolate()`, and `Sequence` for timing
- **Schema Validation**: Zod schemas define component props for type safety
- **Absolute Positioning**: `AbsoluteFill` layout pattern for video frames

### Testing Strategy
- ESLint for code quality: `npm run lint`
- TypeScript type checking via `tsc`
- Visual preview via Remotion Studio: `npm run dev`

### Git Workflow
- **Main Branch**: `main`
- **Feature Branch**: `feature` (current active branch)
- **Commit Format**: Conventional commits not enforced, but clear messages encouraged
- **OpenSpec-Driven**: Major changes require proposals in `openspec/changes/`

## Domain Context
- **Video Composition**: Videos are composed of frames (default 30fps), with components rendering on specific frame ranges
- **Sequence Timing**: Components can be delayed using `<Sequence from={frame}>` for timed entry
- **Animation Physics**: Spring-based animations with damping, frame-based interpolation
- **Resolution**: Default 1920x1080 (Full HD) output
- **Duration**: Measured in frames, not seconds (150 frames @ 30fps = 5 seconds)

## Important Constraints
- **Remotion Config**: `remotion.config.ts` is excluded from TypeScript compilation but used by CLI
- **Video Format**: Output locked to JPEG format for compatibility
- **Overwrite**: Enabled by default - previous renders will be overwritten without warning
- **Frame Precision**: Animations are frame-dependent, not time-dependent
- **Webpack Override**: Tailwind v4 integration requires custom webpack config

## External Dependencies
- **Remotion**: Core video rendering engine and CLI tools
- **Zod**: Runtime type validation for component props
- **Tailwind CSS**: Utility-first CSS framework (v4 with V4 plugin)
- **React 19**: Latest React version for UI rendering

## Project Structure
```
src/
├── Root.tsx           # Composition registry and sidebar entries
├── HelloWorld.tsx     # Main video composition with animations
├── HelloWorld/
│   ├── Logo.tsx       # Animated logo component
│   ├── Title.tsx      # Title text component
│   ├── Subtitle.tsx   # Subtitle component
│   ├── Arc.tsx        # Decorative arc element
│   ├── Atom.tsx       # Decorative atom element
│   └── constants.ts   # Shared constants
└── index.css          # Global styles

openspec/
├── project.md         # This file
├── AGENTS.md          # OpenSpec workflow guidelines
├── PROPOSAL_DESIGN_GUIDELINES.md  # Design doc standards (Chinese)
├── specs/             # Current specifications
└── changes/           # Change proposals
```

## Development Commands
```bash
npm run dev        # Start Remotion Studio for preview
npm run build      # Bundle the project
npm run lint       # Run ESLint and TypeScript checks
npm run upgrade    # Upgrade Remotion dependencies
```

## Video Rendering
```bash
# Render a composition
npx remotion render HelloWorld

# Render with custom props
npx remotion render HelloWorld --prop='{"titleText":"Custom Title"}'
```

## Remotion AI Reference

AI agents working on this project should reference the comprehensive Remotion usage guide in [remotion.llm.txt](remotion.llm.txt) for:

- **Project Structure**: Entry files, Root files, and composition setup
- **Component Rules**: Using `<Video>`, `<Img>`, `<Audio>`, `<Gif>` tags with `@remotion/media` and `@remotion/gif`
- **Layout Patterns**: `<AbsoluteFill>`, `<Sequence>`, `<Series>`, `<TransitionSeries>` for timing and layering
- **Animation Helpers**: `useCurrentFrame()`, `interpolate()`, `spring()`, `random()`, `useVideoConfig()`
- **Asset Management**: Remote URLs vs `staticFile()` for public folder assets
- **Lambda Rendering**: Cloud rendering setup with AWS Lambda

### Key Remotion Patterns
- All code must be **deterministic** - use `random('seed')` instead of `Math.random()`
- Frame numbers start at **0**
- Default specs: 1920x1080, 30fps
- Use TypeScript for all components
- Import from `remotion`, `@remotion/media`, `@remotion/gif`, `@remotion/transitions`
