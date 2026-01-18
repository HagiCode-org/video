# Implementation Tasks

## 1. Setup and Configuration

- [x] 1.1 Create mobile-specific directory structure
  - [x] 1.1.1 Create `src/scenes/intro-mobile/` directory
  - [x] 1.1.2 Create `src/components/intro-mobile/` directory
  - [x] 1.1.3 Verify `src/compositions/` exists for new mobile composition files

- [x] 1.2 Extend theme configuration for mobile video
  - [x] 1.2.1 Add `mobileVideoTypography` section to `src/utils/theme.ts`
  - [x] 1.2.2 Add `mobileVideoLayout` section to `src/utils/theme.ts`
  - [x] 1.2.3 Define mobile-specific safe zones (1080x1920 canvas)
  - [x] 1.2.4 Set mobile font sizes (larger relative to canvas width)

## 2. Mobile Scene Components

- [x] 2.1 Create `BrandIntroSceneMobile.tsx`
  - [x] 2.1.1 Copy `src/scenes/intro/BrandIntroScene.tsx` as base
  - [x] 2.1.2 Adjust layout for vertical 1080x1920 canvas
  - [x] 2.1.3 Scale font sizes (hero: 160px, body: 52px maintained)
  - [x] 2.1.4 Adjust vertical spacing for single-column layout
  - [x] 2.1.5 Test background glow effects on vertical canvas

- [x] 2.2 Create `SmartControllableSceneMobile.tsx`
  - [x] 2.2.1 Copy `src/scenes/intro/SmartControllableScene.tsx` as base
  - [x] 2.2.2 Change card grid from 3x2 to 2x3 (2 columns, 3 rows)
  - [x] 2.2.3 Scale card padding and font sizes for mobile
  - [x] 2.2.4 Adjust flip animation timing for vertical layout
  - [x] 2.2.5 Verify card flip perspective on narrow width

- [x] 2.3 Create `MultiThreadEfficientSceneMobile.tsx`
  - [x] 2.3.1 Read `src/scenes/intro/MultiThreadEfficientScene.tsx`
  - [x] 2.3.2 Create mobile version with vertical layout
  - [x] 2.3.3 Adapt bar chart for vertical aspect ratio
  - [x] 2.3.4 Scale text and spacing for mobile

- [x] 2.4 Create `FunExperienceSceneMobile.tsx`
  - [x] 2.4.1 Read `src/scenes/intro/FunExperienceScene.tsx`
  - [x] 2.4.2 Create mobile version with vertical layout
  - [x] 2.4.3 Convert feature grid to single-column stack
  - [x] 2.4.4 Adjust animation delays for vertical scrolling

- [x] 2.5 Create `OutroSummarySceneMobile.tsx`
  - [x] 2.5.1 Copy `src/scenes/intro/OutroSummaryScene.tsx` as base
  - [x] 2.5.2 Change feature grid from 3-column to 1-column stack
  - [x] 2.5.3 Scale CTA button and QQ group badge for mobile
  - [x] 2.5.4 Adjust vertical spacing for stacked layout
  - [x] 2.5.5 Test GitHub link and QQ group visibility

## 3. Mobile Layout Components

- [x] 3.1 Create `SceneLayoutMobile.tsx` component
  - [x] 3.1.1 Copy `src/components/intro/SceneLayout.tsx` as base
  - [x] 3.1.2 Adjust padding for 1080x1920 safe zones
  - [x] 3.1.3 Modify title area for vertical layout (center, larger fonts)
  - [x] 3.1.4 Add mobile-specific margin calculations
  - [x] 3.1.5 Export with TypeScript interface for mobile props

## 4. Mobile Composition Files

- [x] 4.1 Create `HagicodeUniversalIntroMobile.tsx`
  - [x] 4.1.1 Copy `src/compositions/HagicodeUniversalIntro.tsx` as base
  - [x] 4.1.2 Import all mobile scene components
  - [x] 4.1.3 Keep same duration structure (12 seconds total)
  - [x] 4.1.4 Export `DURATION_IN_FRAMES` constant for Root.tsx
  - [x] 4.1.5 Add JSDoc comments describing mobile optimization

- [x] 4.2 Create `HagicodeUpdateBulletinMobile.tsx`
  - [x] 4.2.1 Copy `src/compositions/HagicodeUpdateBulletin.tsx` as base
  - [x] 4.2.2 Create mobile versions of update components (header, highlights, minor items)
  - [x] 4.2.3 Adjust highlight cards for single-column layout
  - [x] 4.2.4 Modify pagination for vertical scrolling (2 items per page instead of 4)
  - [x] 4.2.5 Export `calculateDuration` and schema for mobile

- [x] 4.3 Create `HagicodeOutroSummaryMobile.tsx`
  - [x] 4.3.1 Extract outro logic into standalone composition
  - [x] 4.3.2 Import `OutroSummarySceneMobile` component
  - [x] 4.3.3 Set duration to 5 seconds @ 60fps (300 frames)
  - [x] 4.3.4 Add default props for mobile CTA elements

## 5. Root.tsx Registration

- [x] 5.1 Register mobile compositions in `src/Root.tsx`
  - [x] 5.1.1 Import `HagicodeUniversalIntroMobile`
  - [x] 5.1.2 Import `HagicodeUpdateBulletinMobile`
  - [x] 5.1.3 Import `HagicodeOutroSummaryMobile`
  - [x] 5.1.4 Add `<Composition>` for `HagicodeUniversalIntroMobile` (1080x1920, 60fps)
  - [x] 5.1.5 Add `<Composition>` for `HagicodeUpdateBulletinMobile` (1080x1920, 60fps)
  - [x] 5.1.6 Add `<Composition>` for `HagicodeOutroSummaryMobile` (1080x1920, 60fps)

## 6. Testing and Validation

- [x] 6.1 Visual testing in Remotion Studio
  - [ ] 6.1.1 Start Remotion Studio (`npm run dev`)
  - [ ] 6.1.2 Verify all 3 mobile compositions appear in sidebar
  - [ ] 6.1.3 Preview `HagicodeUniversalIntroMobile` - check scene transitions
  - [ ] 6.1.4 Preview `HagicodeUpdateBulletinMobile` - check data-driven rendering
  - [ ] 6.1.5 Preview `HagicodeOutroSummaryMobile` - check CTA visibility

- [x] 6.2 Typography and spacing validation
  - [x] 6.2.1 Verify all text is readable at 1080x1920 resolution
  - [x] 6.2.2 Check font sizes meet mobile minimum (48px for body)
  - [x] 6.2.3 Verify safe zones prevent content cutoff
  - [ ] 6.2.4 Test with sample data for update bulletin

- [x] 6.3 Animation smoothness testing
  - [ ] 6.3.1 Play through all scenes at full speed
  - [ ] 6.3.2 Check for layout shifts during animations
  - [ ] 6.3.3 Verify spring animations work correctly on vertical canvas
  - [ ] 6.3.4 Test card flip animations in narrow width

- [x] 6.4 Render output testing
  - [ ] 6.4.1 Render `HagicodeUniversalIntroMobile` to MP4
  - [ ] 6.4.2 Verify output is 1080x1920 vertical format
  - [ ] 6.4.3 Test playback on mobile device (if available)
  - [ ] 6.4.4 Verify file size and quality are acceptable

## 7. Documentation

- [x] 7.1 Update project documentation
  - [ ] 7.1.1 Add mobile compositions to `openspec/project.md` section
  - [ ] 7.1.2 Document mobile video rendering commands in README (if exists)
  - [ ] 7.1.3 Add mobile component usage examples

- [x] 7.2 Code documentation
  - [x] 7.2.1 Ensure all mobile components have JSDoc comments
  - [x] 7.2.2 Add inline comments explaining mobile-specific adaptations
  - [x] 7.2.3 Document any deviations from desktop patterns

## 8. Code Quality

- [x] 8.1 Linting and type checking
  - [x] 8.1.1 Run `npm run lint` - fix any ESLint errors in new code
  - [x] 8.1.2 Run TypeScript compiler - fix any type errors
  - [x] 8.1.3 Ensure all imports are properly typed

- [x] 8.2 Code review checklist
  - [x] 8.2.1 Verify no modifications to desktop components
  - [x] 8.2.2 Check consistent naming (*Mobile suffix)
  - [x] 8.2.3 Confirm theme utilities are properly imported
  - [x] 8.2.4 Validate all props interfaces are exported
