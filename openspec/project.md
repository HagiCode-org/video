# Project Context

## Purpose
A Remotion-based video project for creating programmatic promotional videos for Hagicode - an AI-powered development platform. This project enables creating professional, data-driven video content through code, with the primary focus on producing a 35-second product introduction video optimized for short-form platforms (Douyin, Bilibili, Xiaohongshu).

## Project Overview
**Primary Deliverable**: Hagicode product introduction video (35 seconds / 1050 frames @ 30fps)

The video showcases Hagicode's core value proposition through a fast-paced, multi-scene composition:
- **Hook Scene** (0-5s): Pain point accumulation and problem introduction
- **Intro Scene** (5-12s): Brand introduction with screenshot showcase
- **Smart Scene** (12-17s): AI-powered intelligent development features
- **Convenient Scene** (17-22s): Convenience and workflow efficiency features
- **Fun Scene** (22-27s): Engaging and enjoyable development experience
- **CTA Scene** (27-35s): Call-to-action with website and GitHub links

## Tech Stack
- **Framework**: Remotion 4.0.405 - React-based video creation framework
- **Runtime**: React 19.2.3 with React DOM 19.2.3
- **Language**: TypeScript 5.9.3 (strict mode, ES2018 target)
- **Styling**: Tailwind CSS 4.0.0 with @remotion/tailwind-v4 integration
- **Validation**: Zod 3.22.3 for schema validation with @remotion/zod-types
- **Icons**: Lucide React 0.562.0
- **Build Tools**: Remotion CLI 4.0.405, ESLint 9.19.0, Prettier 3.6.0
- **Video Output**: JPEG format, auto-overwrite enabled, 1920x1080 Full HD at 30fps

## Project Conventions

### Code Style
- **TypeScript**: Strict mode enabled (`strict: true`), no unused locals, consistent casing enforcement
- **React**: Functional components with hooks, JSX transform set to `react-jsx`
- **File Organization**: Scene-based structure under `src/scenes/`, reusable components under `src/components/`
- **Naming**: PascalCase for components and scenes, camelCase for utilities and hooks
- **Comments**: Bilingual (English/Chinese) to support mixed-language development team

### Architecture Patterns
- **Composition Registry**: All video compositions defined in `Root.tsx` as `<Composition>` entries
- **Scene-Based Structure**: Each video segment is a self-contained scene component
- **Series Sequencing**: Uses `<Series>` and `<Series.Sequence>` for linear scene progression
- **Component Library**: Reusable UI components (FeatureCard, GlassCard, CTAButton, etc.)
- **Animation System**: Frame-based animations using `useCurrentFrame()`, `interpolate()`, and `spring()`
- **Layout Pattern**: `<AbsoluteFill>` for full-screen video frames
- **Deterministic Rendering**: All randomization uses seeded `random('seed')` for reproducible output

### Testing Strategy
- **ESLint**: Code quality checks via `npm run lint`
- **TypeScript**: Static type checking via `tsc`
- **Visual Preview**: Remotion Studio for real-time preview via `npm run dev`
- **Scene Testing**: Individual scenes exposed as separate compositions for isolated testing

### Git Workflow
- **Main Branch**: `main`
- **Commit Format**: Conventional commits encouraged (not enforced)
- **OpenSpec-Driven**: Major changes require proposals in `openspec/changes/`
- **Language**: Mixed Chinese/English commit messages accepted

## Domain Context

### Video Composition Concepts
- **Frame-Based Timing**: Videos composed of frames (default 30fps), not seconds
- **Frame Zero**: Animations start at frame 0, not frame 1
- **Duration Calculation**: Duration measured in frames (e.g., 1050 frames @ 30fps = 35 seconds)
- **Scene Sequencing**: Linear progression using `<Series.Sequence durationInFrames={N}>`
- **Deterministic Animation**: All animations must be reproducible across renders

### Hagicode Product Context
The video promotes Hagicode, an AI-assisted development platform featuring:
- **AI Integration**: Deep Claude Code SDK integration for intelligent code generation
- **OpenSpec Workflow**: Structured 9-stage proposal development process
- **Real-Time Collaboration**: SignalR-based team collaboration features
- **Enterprise Architecture**: Built on ASP.NET Core 10, Orleans 9.2.1, PostgreSQL
- **Project Management**: Git integration, automatic project analysis, SDD initialization

### Target Platforms
- **Douyin (TikTok China)**: Vertical/landscape video, fast pacing
- **Bilibili**: Tech-savvy developer audience
- **Xiaohongshu (Red)**: Lifestyle and productivity content

## Important Constraints
- **Remotion Config**: `remotion.config.ts` excluded from TypeScript compilation but used by CLI
- **Video Format**: Output locked to JPEG format for compatibility
- **Overwrite**: Enabled by default - previous renders overwritten without warning
- **Frame Precision**: Animations are frame-dependent, ensure consistent fps across renders
- **Webpack Configuration**: Tailwind v4 integration requires custom webpack override
- **Deterministic Requirement**: All random values must use seeded `random('seed')` function

## External Dependencies
- **@remotion/cli**: Command-line interface for rendering and preview
- **@remotion/tailwind-v4**: Tailwind CSS v4 integration plugin
- **@remotion/zod-types**: Runtime type validation for composition props
- **lucide-react**: Icon library for UI elements
- **remotion**: Core video rendering engine
- **tailwindcss**: Utility-first CSS framework (v4)
- **zod**: Schema validation library

## Project Structure
```
src/
├── Root.tsx                    # Composition registry - defines all video entries
├── HagicodeIntroVideo.tsx      # Main 35-second video composition
├── HelloWorld.tsx              # Original template composition (reference)
├── HelloWorld/                 # Template example components
│   ├── Logo.tsx
│   ├── Title.tsx
│   ├── Subtitle.tsx
│   ├── Arc.tsx
│   ├── Atom.tsx
│   └── constants.ts
├── scenes/                     # Video scene components
│   ├── HookScene.tsx           # Pain point introduction (0-5s)
│   ├── IntroScene.tsx          # Brand introduction (5-12s)
│   ├── SmartScene.tsx          # AI features showcase (12-17s)
│   ├── ConvenientScene.tsx     # Convenience features (17-22s)
│   ├── FunSceneNew.tsx         # Engagement features (22-27s)
│   ├── CTAScene.tsx            # Call-to-action (27-35s)
│   ├── FeaturesAccumulationScene.tsx
│   ├── FeaturesScene.tsx
│   ├── AdvantagesScene.tsx
│   ├── EfficientScene.tsx
│   └── [Additional Scenes]     # Other scene variations
├── components/                 # Reusable UI components
│   ├── FeatureCard.tsx         # Feature showcase card
│   ├── GlassCard.tsx           # Glassmorphism card container
│   ├── CTAButton.tsx           # Call-to-action button
│   ├── Logo.tsx                # Hagicode logo component
│   ├── ScreenshotCarousel.tsx  # Screenshot carousel
│   ├── ScreenshotShowcase.tsx  # Screenshot display
│   ├── AnimatedText.tsx        # Animated text component
│   ├── AnimatedParticleBackground.tsx
│   ├── DataMetric.tsx
│   ├── TextOverlay.tsx
│   └── Transition.tsx
├── index.css                   # Global styles
└── index.ts                    # Application entry point

openspec/
├── project.md                  # This file
├── AGENTS.md                   # OpenSpec workflow guidelines
├── PROPOSAL_DESIGN_GUIDELINES.md  # Design doc standards (Chinese)
├── specs/                      # Current specifications
└── changes/                    # Change proposals
    └── archive/
        └── 2026-01-14-hagicode-product-intro-video-with-remotion/
            ├── proposal.md
            ├── design.md
            └── tasks.md
```

## Development Commands
```bash
npm run dev        # Start Remotion Studio for visual preview
npm run build      # Bundle the project for production
npm run lint       # Run ESLint and TypeScript checks
npm run upgrade    # Upgrade Remotion dependencies to latest versions
```

## Video Rendering
```bash
# Render the main Hagicode intro video
npx remotion render HagicodeIntro

# Render individual scenes for testing
npx remotion render HookScene
npx remotion render IntroScene
npx remotion render SmartScene

# Render with custom output location
npx remotion render HagicodeIntro --output=./videos/hagicode-intro.mp4

# Render with custom props (if schema defined)
npx remotion render HelloWorld --props='{"titleText":"Custom Title"}'
```

## Remotion AI Reference

AI agents working on this project should reference Remotion documentation for:

- **Project Structure**: Entry files, Root files, and composition setup
- **Component Rules**: Using `<Video>`, `<Img>`, `<Audio>`, `<Gif>` tags with `@remotion/media` and `@remotion/gif`
- **Layout Patterns**: `<AbsoluteFill>`, `<Sequence>`, `<Series>`, `<TransitionSeries>` for timing and layering
- **Animation Helpers**: `useCurrentFrame()`, `interpolate()`, `spring()`, `random()`, `useVideoConfig()`
- **Asset Management**: Remote URLs vs `staticFile()` for public folder assets
- **Lambda Rendering**: Cloud rendering setup with AWS Lambda (if needed for scalability)

### Key Remotion Patterns
- All code must be **deterministic** - use `random('seed')` instead of `Math.random()`
- Frame numbers start at **0** (not 1)
- Default specs: 1920x1080, 30fps
- Use TypeScript for all components
- Import from `remotion`, `@remotion/media`, `@remotion/gif`, `@remotion/transitions`
- Use `<Series>` for sequential scenes, `<Sequence>` for overlapped timing

## Scene Development Guidelines

### Creating New Scenes
1. Create scene file in `src/scenes/SceneName.tsx`
2. Import and add to `Root.tsx` as a separate composition for testing
3. Integrate into `HagicodeIntroVideo.tsx` using `<Series.Sequence>`
4. Use reusable components from `src/components/` where possible
5. Ensure animations are frame-based and deterministic

### Component Development
1. Create reusable components in `src/components/ComponentName.tsx`
2. Use TypeScript interfaces for props
3. Support common animation types: `slideLeft`, `slideRight`, `fadeIn`, `scaleIn`
4. Use theme colors from `src/utils/theme.ts` if available
5. Follow existing component patterns for consistency

### Timing and Duration
- Calculate duration: `seconds × 30 = frames`
- Scene transitions: Use `<Series.Sequence>` for clean cuts
- Pauses: Extend sequence duration to hold final frame
- Test scenes individually before integrating into main video

## Related Projects
- **Hagicode Source**: `/home/newbe36524/repos/newbe36524/pcode` - Main product codebase
- **Hagicode Docs**: `/home/newbe36524/repos/newbe36524/pcode-docs` - Product documentation
- **Proposal Archive**: `openspec/changes/archive/2026-01-14-hagicode-product-intro-video-with-remotion/` - Original project proposal

## Current Status
- **Phase**: Production
- **Main Video**: HagicodeIntroVideo (35 seconds) - Complete
- **Reference**: HelloWorld template retained for learning/reference
- **OpenSpec Change**: `hagicode-product-intro-video-with-remotion` - ExecutionCompleted
