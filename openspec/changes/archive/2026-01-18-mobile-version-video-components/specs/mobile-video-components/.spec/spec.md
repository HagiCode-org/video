# mobile-video-components Specification

## Purpose

Define the core capabilities for mobile-optimized video components in the Hagicode video project, enabling creation of vertical video content (1080x1920) for mobile-first platforms like Douyin, Bilibili mobile, Xiaohongshu, and TikTok.

## Requirements

### Requirement: Mobile Video Canvas Configuration

The system SHALL support mobile video compositions with 1080x1920 vertical resolution at 60fps for smooth animations.

#### Scenario: Mobile canvas dimensions are correct

- **WHEN** a mobile composition is configured in Root.tsx
- **THEN** the width SHALL be 1080 pixels
- **AND** the height SHALL be 1920 pixels
- **AND** the aspect ratio SHALL be 9:16 (portrait)

#### Scenario: Mobile frame rate is consistent

- **WHEN** a mobile composition renders
- **THEN** the frame rate SHALL be 60fps for smooth animations
- **AND** the frame rate SHALL match desktop compositions for consistency

### Requirement: Mobile Typography System

The system SHALL provide mobile-specific typography constants optimized for 1080x1920 vertical resolution and readability on mobile devices.

#### Scenario: Mobile font sizes are defined

- **WHEN** mobileVideoTypography is imported from theme.ts
- **THEN** hero font size SHALL be 140px (13% of canvas width)
- **AND** title font size SHALL be 100-110px
- **AND** body font size SHALL be 48-52px (4.4-4.8% of canvas width)
- **AND** button font size SHALL be 44-48px
- **AND** label/caption font size SHALL be 38-42px

#### Scenario: Mobile font weights are appropriate

- **WHEN** mobile components render text
- **THEN** display/headings SHALL use weight 700-800
- **AND** subheadings SHALL use weight 600
- **AND** body text SHALL use weight 500
- **AND** labels SHALL use weight 400

#### Scenario: Mobile line heights ensure readability

- **WHEN** multi-line text is rendered on mobile
- **THEN** tight line height (1.1) SHALL be used for hero titles
- **AND** normal line height (1.3) SHALL be used for body text
- **AND** relaxed line height (1.5) SHALL be used for long content

### Requirement: Mobile Layout System

The system SHALL provide mobile-specific layout constants including safe zones, spacing, and grid systems optimized for 1080x1920 vertical resolution.

#### Scenario: Mobile safe zones prevent cutoff

- **WHEN** mobileVideoLayout is imported from theme.ts
- **THEN** horizontal safe zone SHALL be 60px (5.5% of 1080px width)
- **AND** vertical safe zone SHALL be 80px (4% of 1920px height)
- **AND** content SHALL remain within these boundaries

#### Scenario: Mobile spacing is optimized

- **WHEN** mobile layouts are designed
- **THEN** vertical gaps between elements SHALL be 30-40px
- **AND** horizontal padding SHALL be 60px (safe zone)
- **AND** vertical padding SHALL be 80px (safe zone)
- **AND** card padding SHALL be 32-40px

#### Scenario: Mobile grid uses single column

- **WHEN** mobile content requires grid layout
- **THEN** default grid SHALL be 1 column (full width)
- **AND** 2-column grids MAY be used for card pairs (480px each with gaps)
- **AND** 3+ column grids SHALL NOT be used (insufficient width)

### Requirement: Mobile Component Naming Convention

The system SHALL use consistent naming conventions for mobile components to distinguish them from desktop versions.

#### Scenario: Mobile composition files are named correctly

- **WHEN** mobile composition files are created
- **THEN** they SHALL use the suffix "Mobile" (e.g., `HagicodeUniversalIntroMobile.tsx`)
- **AND** they SHALL be co-located with desktop compositions in `src/compositions/`

#### Scenario: Mobile scene files are named correctly

- **WHEN** mobile scene files are created
- **THEN** they SHALL use the suffix "Mobile" (e.g., `BrandIntroSceneMobile.tsx`)
- **AND** they SHALL be located in `src/scenes/intro-mobile/` directory

#### Scenario: Mobile component files are named correctly

- **WHEN** mobile component files are created
- **THEN** they SHALL use the suffix "Mobile" (e.g., `SceneLayoutMobile.tsx`)
- **AND** they SHALL be located in `src/components/intro-mobile/` directory

### Requirement: Mobile Layout Adaptations

The system SHALL adapt desktop layouts to mobile format using single-column stacks and full-width components.

#### Scenario: Multi-column grids become single column

- **WHEN** a desktop layout uses 3-column grid
- **THEN** the mobile version SHALL use 1-column stacked layout
- **AND** each item SHALL be full-width (960px with 60px padding)

#### Scenario: Horizontal layouts become vertical

- **WHEN** a desktop layout uses horizontal arrangement
- **THEN** the mobile version SHALL use vertical stacking
- **AND** elements SHALL be arranged top-to-bottom

#### Scenario: Card grids adapt to mobile

- **WHEN** a desktop uses 3x2 card grid
- **THEN** the mobile version MAY use 2x3 grid (2 columns, 3 rows) if cards fit
- **OR** the mobile version MAY use 1x6 stack (1 column, 6 rows) for better readability

### Requirement: Mobile Animation Consistency

The system SHALL maintain animation timing and behavior consistency between desktop and mobile versions.

#### Scenario: Animation durations match desktop

- **WHEN** a mobile scene renders
- **THEN** scene durations SHALL match desktop versions (same frame count)
- **AND** animations SHALL use the same fps (60fps)

#### Scenario: Animation patterns are reused

- **WHEN** mobile animations are implemented
- **THEN** they SHALL reuse the same animation functions (spring, interpolate)
- **AND** they SHALL use similar easing functions
- **AND** they SHALL maintain the same visual style

### Requirement: Mobile Content Capacity

The system SHALL optimize content capacity for mobile format with fewer items per screen/page.

#### Scenario: Pagination adapts to mobile

- **WHEN** desktop version shows 4 items per page
- **THEN** mobile version SHALL show 2 items per page
- **AND** total page count SHALL increase accordingly

#### Scenario: Text length is optimized

- **WHEN** content is written for mobile
- **THEN** body text SHALL not exceed 60 characters per line
- **AND** titles SHALL not exceed 14 characters per line
- **AND** longer text SHALL wrap to multiple lines

### Requirement: Independent Mobile Compositions

The system SHALL register mobile compositions as separate entries in Root.tsx, independent from desktop versions.

#### Scenario: Mobile compositions are registered

- **WHEN** Root.tsx is inspected
- **THEN** mobile compositions SHALL be registered with unique IDs
- **AND** each SHALL have width=1080, height=1920
- **AND** each SHALL have fps=60
- **AND** each SHALL appear in Remotion Studio sidebar

#### Scenario: Mobile and desktop coexist

- **WHEN** both desktop and mobile compositions exist
- **THEN** they SHALL be independently selectable in Remotion Studio
- **AND** rendering one SHALL NOT affect the other
- **AND** both SHALL use the same theme utilities

### Requirement: Mobile Theme Extension

The system SHALL extend the existing theme.ts file with mobile-specific constants without duplicating shared values.

#### Scenario: Theme has mobile sections

- **WHEN** theme.ts is inspected
- **THEN** it SHALL contain `mobileVideoTypography` section
- **AND** it SHALL contain `mobileVideoLayout` section
- **AND** both sections SHALL export TypeScript interfaces

#### Scenario: Mobile theme reuses colors

- **WHEN** mobile components render
- **THEN** they SHALL use the same `colors` object as desktop
- **AND** they SHALL NOT redefine color palettes
- **AND** they SHALL maintain visual consistency

### Requirement: Mobile Rendering Output

The system SHALL render mobile compositions to 1080x1920 MP4 files suitable for mobile platforms.

#### Scenario: Mobile render produces correct format

- **WHEN** `npx remotion render HagicodeUniversalIntroMobile` is executed
- **THEN** the output file SHALL be 1080x1920 resolution
- **AND** the format SHALL be MP4
- **AND** the frame rate SHALL be 60fps

#### Scenario: Mobile render is independent

- **WHEN** mobile and desktop videos are rendered
- **THEN** each SHALL produce separate output files
- **AND** rendering one SHALL NOT affect the other
- **AND** both SHALL be usable on their target platforms
