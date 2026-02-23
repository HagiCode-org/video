# universal-intro-video Specification Delta

## ADDED Requirements

### Requirement: Mobile Universal Intro Composition

The system SHALL provide a `HagicodeUniversalIntroMobile` composition that serves as a standardized 12-second opening video for Hagicode promotional content optimized for mobile platforms (1080x1920 vertical resolution).

#### Scenario: Mobile composition renders successfully

- **WHEN** the composition is rendered in Remotion Studio
- **THEN** the composition SHALL display with a duration of 720 frames at 60fps
- **AND** the composition SHALL use 1080x1920 resolution (9:16 portrait)
- **AND** the composition SHALL appear in the Remotion Studio sidebar

#### Scenario: Mobile composition is independent

- **WHEN** the mobile composition renders
- **THEN** it SHALL NOT affect the desktop composition behavior
- **AND** it SHALL use separate mobile scene components
- **AND** it SHALL be independently renderable to MP4

### Requirement: Mobile Brand Intro Scene

The system SHALL provide a mobile-optimized brand introduction scene displaying the Hagicode name, tagline, and contact information with vertical layout.

#### Scenario: Mobile brand intro displays correctly

- **WHEN** mobile Scene 1 renders
- **THEN** the system SHALL display "HagiCode" as the primary title with 140px font size
- **AND** the system SHALL display "哈基码" as the subtitle with 72px font size
- **AND** the system SHALL display "让你可以同时处理十个需求" as the tagline
- **AND** the system SHALL display GitHub and QQ group links at the bottom
- **AND** all text SHALL be centered and stacked vertically

#### Scenario: Mobile safe zones are respected

- **WHEN** the mobile brand intro renders
- **THEN** content SHALL stay within 60px horizontal and 80px vertical safe zones
- **AND** no text SHALL be cut off on any edge of the 1080x1920 canvas

### Requirement: Mobile Smart Controllable Scene

The system SHALL provide a mobile-optimized scene showcasing Hagicode eliminating AI development problems through card flip animations in a 2x3 grid layout.

#### Scenario: Mobile problem cards display in grid

- **WHEN** mobile Scene 2 renders
- **THEN** the system SHALL display 6 problem cards in a 2x3 grid (2 columns, 3 rows)
- **AND** each card SHALL be approximately 480px wide with 24px gaps
- **AND** the cards SHALL display the same problems as desktop version

#### Scenario: Mobile card flip animations work

- **WHEN** mobile Scene 2 renders
- **THEN** cards SHALL flip from problem (red) to solution (green) with staggered timing
- **AND** flip animations SHALL use 3D perspective optimized for narrow width
- **AND** all text SHALL remain readable during rotation

### Requirement: Mobile Multi-thread Efficient Scene

The system SHALL provide a mobile-optimized scene demonstrating multi-threading efficiency with vertical bar chart layout.

#### Scenario: Mobile efficiency chart displays

- **WHEN** mobile Scene 3 renders
- **THEN** the thread count SHALL animate from 1 to 5 threads
- **AND** the efficiency chart SHALL use vertical layout (stacked bars instead of horizontal)
- **AND** percentage text SHALL be sized appropriately for 1080px width

### Requirement: Mobile Fun Experience Scene

The system SHALL provide a mobile-optimized scene demonstrating the enjoyable development experience through single-column stacked feature cards.

#### Scenario: Mobile fun experience displays features

- **WHEN** mobile Scene 4 renders
- **THEN** the system SHALL display feature cards in a single-column vertical stack
- **AND** each card SHALL be full-width (approximately 960px with padding)
- **AND** the system SHALL display the same features as desktop version (themes, sounds, styles, achievements, history)

### Requirement: Mobile Outro Summary Scene

The system SHALL provide a mobile-optimized summary scene displaying the brand name and three core value propositions in a stacked layout.

#### Scenario: Mobile outro displays summary

- **WHEN** mobile Scene 5 renders
- **THEN** the system SHALL display "HagiCode" brand name with 140px font
- **AND** the system SHALL display three feature cards stacked vertically:
  - 🎯 智能可控 - 引导 AI 更聪明
  - ⚡ 发挥最大效率 - 多 Agent 并发协作
  - ✨ 有趣体验 - 让编程充满乐趣
- **AND** the system SHALL display GitHub CTA button and QQ group badge

#### Scenario: Mobile CTA elements are visible

- **WHEN** the mobile outro renders
- **THEN** the GitHub button SHALL be full-width with 48px font
- **AND** the QQ group badge SHALL be centered with 42px font
- **AND** both elements SHALL have adequate touch target sizes (minimum 80px height)

### Requirement: Mobile Typography and Spacing

The system SHALL use mobile-specific typography and spacing constants optimized for 1080x1920 vertical resolution.

#### Scenario: Mobile font sizes are appropriate

- **WHEN** any mobile scene renders
- **THEN** hero titles SHALL use 140px font (13% of canvas width)
- **AND** body text SHALL use 48-52px font (4.4-4.8% of canvas width)
- **AND** all text SHALL be readable at 100% scale on mobile devices

#### Scenario: Mobile spacing is optimized

- **WHEN** mobile layouts render
- **THEN** vertical gaps between elements SHALL be 30-40px
- **AND** horizontal padding SHALL respect 60px safe zones
- **AND** vertical padding SHALL respect 80px safe zones

### Requirement: Mobile Composition Registration

The system SHALL register the `HagicodeUniversalIntroMobile` composition in `Root.tsx`.

#### Scenario: Mobile composition appears in sidebar

- **WHEN** Remotion Studio loads
- **THEN** "HagicodeUniversalIntroMobile" SHALL appear in the composition list
- **AND** clicking it SHALL load the mobile composition for preview
- **AND** the composition SHALL be configured for 1080x1920 at 60fps

#### Scenario: Desktop and mobile compositions coexist

- **WHEN** Root.tsx is loaded
- **THEN** both HagicodeUniversalIntro and HagicodeUniversalIntroMobile SHALL be registered
- **AND** both SHALL be independently selectable in Remotion Studio
- **AND** rendering one SHALL NOT affect the other
