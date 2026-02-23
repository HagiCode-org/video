# hagicode-update-bulletin Specification Delta

## ADDED Requirements

### Requirement: Mobile Update Bulletin Composition

The system SHALL provide a `HagicodeUpdateBulletinMobile` composition that renders update bulletin videos optimized for mobile platforms (1080x1920 vertical resolution).

#### Scenario: Mobile composition renders successfully

- **WHEN** the composition is rendered in Remotion Studio
- **THEN** the composition SHALL use 1080x1920 resolution (9:16 portrait)
- **AND** the composition SHALL support the same data schema as desktop version
- **AND** the composition SHALL calculate duration dynamically based on content
- **AND** the composition SHALL appear in the Remotion Studio sidebar

#### Scenario: Mobile composition is independent

- **WHEN** the mobile composition renders
- **THEN** it SHALL NOT affect the desktop HagicodeUpdateBulletin behavior
- **AND** it SHALL use separate mobile component implementations
- **AND** it SHALL be independently renderable to MP4

### Requirement: Mobile Update Header Component

The system SHALL provide a mobile-optimized header component that displays the version number and release date with vertical layout and larger fonts.

#### Scenario: Mobile header displays correctly

- **GIVEN** version "v1.2.0" and date "2026-01-17"
- **WHEN** the mobile header is rendered
- **THEN** the version SHALL be displayed with 80-100px font size
- **AND** the date SHALL be displayed with 48-52px font size
- **AND** both elements SHALL be centered and stacked vertically
- **AND** the logo SHALL be sized appropriately for 1080px width

#### Scenario: Mobile header animates smoothly

- **GIVEN** the mobile video starts playing
- **WHEN** the header section begins (0-4 seconds)
- **THEN** the logo SHALL fade in with scale animation
- **AND** text SHALL slide in from below with staggered timing
- **AND** all animations SHALL complete within the allocated duration

### Requirement: Mobile Highlight Items Display

The system SHALL display highlight items sequentially in mobile format with single-column stacked layout and full-width cards.

#### Scenario: Mobile highlight displays correctly

- **GIVEN** one highlight with title, description, and screenshot
- **WHEN** it is rendered in mobile format
- **THEN** all content SHALL be stacked vertically
- **AND** the screenshot SHALL be full-width (approximately 960px with padding)
- **AND** title SHALL use 64-72px font
- **AND** description SHALL use 48-52px font

#### Scenario: Multiple mobile highlights play in sequence

- **GIVEN** 3 highlight items
- **WHEN** the mobile highlights section plays
- **THEN** each highlight SHALL play for 5 seconds (150 frames @ 30fps)
- **AND** transitions SHALL be clean cuts between highlights
- **AND** all content SHALL remain within safe zones

#### Scenario: Mobile highlight displays tags

- **GIVEN** a highlight with tags ["feature", "ai"]
- **WHEN** it is rendered in mobile format
- **THEN** tags SHALL be displayed as wrapped badges below the description
- **AND** each tag SHALL have 40-44px font
- **AND** tags SHALL wrap to multiple lines if needed

### Requirement: Mobile Minor Items List Display

The system SHALL display a list of minor updates in mobile format with vertical stacking and 2 items per page (instead of 4).

#### Scenario: Mobile minor items display correctly

- **GIVEN** 10 minor items with various categories
- **WHEN** the mobile list is rendered
- **THEN** each page SHALL display 2 items (instead of 4 on desktop)
- **AND** items SHALL be stacked vertically with full-width layout
- **AND** the system SHALL create 5 pages for 10 items
- **AND** each page SHALL display for 5 seconds

#### Scenario: Mobile items animate in sequentially

- **GIVEN** the mobile minor items section begins
- **WHEN** items appear on a page
- **THEN** the 2 items SHALL fade in with staggered timing
- **AND** both items SHALL be fully visible within the 5-second page duration

#### Scenario: Mobile categories have distinct colors

- **GIVEN** items with different categories (feature, bugfix, improvement)
- **WHEN** the mobile list is rendered
- **THEN** each category SHALL have a distinct visual color indicator
- **AND** category badges SHALL be sized appropriately for mobile (40-44px font)

### Requirement: Mobile Update Bulletin Components

The system SHALL provide mobile-optimized versions of update bulletin components (header, highlight item, minor items page, footer).

#### Scenario: Mobile components exist

- **WHEN** the codebase is inspected
- **THEN** mobile-specific components SHALL exist:
  - `UpdateHeaderMobile.tsx` (or equivalent)
  - `HighlightItemMobile.tsx` (or equivalent)
  - `MinorItemsPageMobile.tsx` (or equivalent)
- **AND** each component SHALL be separate from desktop versions
- **AND** each component SHALL accept the same props interfaces as desktop versions

#### Scenario: Mobile components reuse theme

- **WHEN** mobile components render
- **THEN** they SHALL use the same color palette as desktop (colors from theme.ts)
- **AND** they SHALL use mobile-specific typography constants
- **AND** they SHALL use mobile-specific layout constants

### Requirement: Mobile Composition Registration

The system SHALL register the `HagicodeUpdateBulletinMobile` composition in `Root.tsx`.

#### Scenario: Mobile composition appears in sidebar

- **GIVEN** Remotion Studio is running
- **WHEN** the compositions list is viewed
- **THEN** "HagicodeUpdateBulletinMobile" appears in the sidebar
- **AND** it is separate from "HagicodeUpdateBulletin"

#### Scenario: Mobile composition has correct configuration

- **GIVEN** the mobile composition registration
- **WHEN** its properties are inspected
- **THEN** it has fps=30 (or 60), width=1080, height=1920
- **AND** it uses the same UpdateBulletinDataSchema as desktop
- **AND** it uses the same example data as defaultProps
