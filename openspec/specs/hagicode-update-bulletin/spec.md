# hagicode-update-bulletin Specification

## Purpose
TBD - created by archiving change hagicode-update-bulletin-template. Update Purpose after archive.
## Requirements
### Requirement: Data Schema Definition

The system SHALL provide a Zod schema that defines the structure of update bulletin data, ensuring type safety and runtime validation for all video content.

#### Scenario: Schema validates correct version format

- **GIVEN** a valid version string like "v1.2.0" or "1.2.0-beta"
- **WHEN** the data is validated against the schema
- **THEN** validation passes and the data is accepted

#### Scenario: Schema validates correct date format

- **GIVEN** a date string in "YYYY-MM-DD" format
- **WHEN** the data is validated against the schema
- **THEN** validation passes and the date is accepted

#### Scenario: Schema rejects invalid data

- **GIVEN** an invalid data structure (missing required fields, wrong types)
- **WHEN** the data is validated against the schema
- **THEN** validation fails with a descriptive error message

#### Scenario: Schema enforces array limits

- **GIVEN** update data with highlights or minorItems arrays
- **WHEN** the number of items exceeds the maximum limit
- **THEN** validation fails with a clear error about the limit

---

### Requirement: Dynamic Video Duration Calculation

The system SHALL automatically calculate the total video duration based on the content volume, ensuring appropriate pacing for each section.

#### Scenario: Duration increases with more highlights

- **GIVEN** 3 highlight items (15 seconds each)
- **WHEN** the total duration is calculated
- **THEN** the duration includes base time plus 45 seconds for highlights

#### Scenario: Duration includes all sections

- **GIVEN** a complete update data set
- **WHEN** the total duration is calculated
- **THEN** it equals header(5s) + summary(10s) + highlights(N×15s) + minor(10s) + footer(5s)

#### Scenario: Duration minimum is enforced

- **GIVEN** an update with minimal content (no highlights, no minor items)
- **WHEN** the total duration is calculated
- **THEN** the minimum duration is at least 30 seconds (header + summary + footer)

---

### Requirement: Update Header Component

The system SHALL provide a header component that displays the version number and release date with appropriate animations.

#### Scenario: Header displays version and date

- **GIVEN** version "v1.2.0" and date "2026-01-17"
- **WHEN** the header is rendered
- **THEN** both values are clearly visible with proper formatting

#### Scenario: Header animates in smoothly

- **GIVEN** the video starts playing
- **WHEN** the header section begins (0-5 seconds)
- **THEN** the logo fades in with scale animation and text slides in from below

#### Scenario: Header uses brand colors

- **GIVEN** the theme configuration with primary colors
- **WHEN** the header is rendered
- **THEN** it uses the defined primary gradient colors for the logo

---

### Requirement: Update Summary Component

The system SHALL provide a summary component that displays statistics about the update (features, bug fixes, improvements) with animated counters.

#### Scenario: Summary shows correct counts

- **GIVEN** data with 3 features, 5 bug fixes, and 8 improvements
- **WHEN** the summary is rendered
- **THEN** each category displays the correct count

#### Scenario: Summary animates numbers

- **GIVEN** the summary section begins (5-15 seconds)
- **WHEN** the counters animate
- **THEN** numbers count up from 0 to their final value over 2 seconds

#### Scenario: Summary displays optional summary text

- **GIVEN** a summary string in the update data
- **WHEN** the summary is rendered
- **THEN** the summary text appears below the statistics

---

### Requirement: Highlight Items Display

The system SHALL display highlight items sequentially, each showing title, description, optional screenshot, and tags.

#### Scenario: Single highlight displays correctly

- **GIVEN** one highlight with title, description, and screenshot
- **WHEN** it is rendered
- **THEN** all content is visible with proper spacing and the screenshot is shown

#### Scenario: Multiple highlights play in sequence

- **GIVEN** 3 highlight items
- **WHEN** the highlights section plays
- **THEN** each highlight plays for 15 seconds before transitioning to the next

#### Scenario: Highlight renders without screenshot

- **GIVEN** a highlight without a screenshot URL
- **WHEN** it is rendered
- **THEN** the layout adjusts to show only title, description, and tags

#### Scenario: Highlight displays tags

- **GIVEN** a highlight with tags ["feature", "ai"]
- **WHEN** it is rendered
- **THEN** tags are displayed as styled badges with appropriate colors

---

### Requirement: Minor Items List Display

The system SHALL display a list of minor updates (bug fixes, improvements) in a scrollable or paginated format.

#### Scenario: List displays all items

- **GIVEN** 10 minor items with various categories
- **WHEN** the list is rendered
- **THEN** all items are visible with their category, title, and optional description

#### Scenario: Items animate in sequentially

- **GIVEN** the minor items section begins
- **WHEN** items appear
- **THEN** they fade in one by one with a 0.5 second delay between each

#### Scenario: Categories have distinct colors

- **GIVEN** items with different categories (feature, bugfix, improvement)
- **WHEN** the list is rendered
- **THEN** each category has a distinct visual color indicator

#### Scenario: Long lists are handled gracefully

- **GIVEN** 20 minor items (maximum)
- **WHEN** the list is rendered
- **THEN** all items fit within the 10-second duration with appropriate pacing

---

### Requirement: Update Footer Component

The system SHALL provide a footer component with the Hagicode logo and closing message.

#### Scenario: Footer displays logo

- **GIVEN** the footer section begins (last 5 seconds)
- **WHEN** it is rendered
- **THEN** the Hagicode logo appears centered with scale animation

#### Scenario: Footer shows closing message

- **GIVEN** the default or custom tagline
- **WHEN** the footer is rendered
- **THEN** a "Thank you" or custom message appears below the logo

---

### Requirement: Example Data Provision

The system SHALL include a complete example data set that demonstrates all features and serves as a template for real updates.

#### Scenario: Example data is valid

- **GIVEN** the example-data.ts file
- **WHEN** it is validated against the schema
- **THEN** all validation passes without errors

#### Scenario: Example demonstrates all features

- **GIVEN** the example data
- **WHEN** it is inspected
- **THEN** it includes at least 2 highlights, 5 minor items, and all optional fields

---

### Requirement: Root Composition Registration

The system SHALL register the new HagicodeUpdateBulletin composition in Root.tsx for access in Remotion Studio.

#### Scenario: Composition appears in sidebar

- **GIVEN** Remotion Studio is running
- **WHEN** the compositions list is viewed
- **THEN** "HagicodeUpdateBulletin" appears in the sidebar

#### Scenario: Composition has correct configuration

- **GIVEN** the composition registration
- **WHEN** its properties are inspected
- **THEN** it has fps=30, width=1920, height=1080, and example data as defaults

---

### Requirement: Component Reuse

The system SHALL reuse existing components from the project where appropriate to maintain visual consistency.

#### Scenario: Reuses Logo component

- **GIVEN** the existing Logo component in src/components/
- **WHEN** header and footer are rendered
- **THEN** they use the Logo component for consistent branding

#### Scenario: Reuses theme utilities

- **GIVEN** the theme configuration in src/utils/theme.ts
- **WHEN** any component is rendered
- **THEN** it uses the defined colors, typography, and spacing

#### Scenario: Reuses animation utilities

- **GIVEN** the animation functions in src/utils/animations.ts
- **WHEN** animations are applied
- **THEN** they use fadeIn, slideUp, or spring functions for consistency

---

### Requirement: Asset Flexibility

The system SHALL support both local files (via staticFile) and remote URLs for screenshot assets.

#### Scenario: Local screenshot loads correctly

- **GIVEN** a screenshot path like "/images/screenshot.png"
- **WHEN** the component renders
- **THEN** the image loads using staticFile() from the public directory

#### Scenario: Remote URL screenshot loads correctly

- **GIVEN** a screenshot URL like "https://example.com/screenshot.png"
- **WHEN** the component renders
- **THEN** the image loads from the remote URL

#### Scenario: Missing screenshot is handled gracefully

- **GIVEN** a highlight without a screenshot field
- **WHEN** the component renders
- **THEN** no error occurs and the layout adjusts appropriately

