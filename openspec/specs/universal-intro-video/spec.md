# universal-intro-video Specification

## Purpose
TBD - created by archiving change hagicode-universal-intro-video. Update Purpose after archive.
## Requirements
### Requirement: Universal Intro Video Composition

The system SHALL provide a `HagicodeUniversalIntro` composition that serves as a standardized 7-second opening video for Hagicode promotional content.

#### Scenario: Composition renders successfully

- **WHEN** the composition is rendered in Remotion Studio
- **THEN** the composition SHALL display with a duration of 420 frames at 60fps
- **AND** the composition SHALL use 1920x1080 resolution
- **AND** the composition SHALL appear in the Remotion Studio sidebar

### Requirement: Three-Act Scene Structure

The system SHALL implement a five-act scene structure that progresses sequentially through brand introduction, problem elimination showcase, efficiency demonstration, fun experience, and summary.

#### Scenario: Scene progression completes in order

- **WHEN** the video plays from start to finish
- **THEN** Scene 1 (Brand Intro) SHALL play from frame 0-60
- **AND** Scene 2 (Smart Controllable) SHALL play from frame 60-240
- **AND** Scene 3 (Multi-thread Efficient) SHALL play from frame 240-330
- **AND** Scene 4 (Fun Experience) SHALL play from frame 330-390
- **AND** Scene 5 (Outro Summary) SHALL play from frame 390-420

#### Scenario: Scene transitions are clean

- **WHEN** moving between scenes
- **THEN** each scene SHALL end exactly where the next begins
- **AND** there SHALL be no gaps or overlaps between scenes

### Requirement: Brand Intro Scene

The system SHALL provide a brand introduction scene displaying the Hagicode name, tagline, and GitHub address.

#### Scenario: Brand intro displays correctly

- **WHEN** Scene 1 renders
- **THEN** the system SHALL display "Hagicode" as the primary title
- **AND** the system SHALL display "AI 开发助手" as the subtitle
- **AND** the system SHALL display the GitHub URL
- **AND** the final frame SHALL be suitable as a static cover image

### Requirement: Smart Controllable Scene (Problem Smash)

The system SHALL provide a scene showcasing Hagicode eliminating AI development problems through a "smash" animation.

#### Scenario: Problem cards display before smash

- **WHEN** Scene 2 renders from frame 0-30
- **THEN** the system SHALL display 6 problem cards in a grid layout
- **AND** the cards SHALL display the following problems:
  - AI 经常返工
  - AI 意外修改了不在范围内的文件
  - AI 无法理解项目结构
  - AI 产生了幻觉
  - AI 没有正确的验收结果
  - AI 总是听不懂人话
- **AND** each card SHALL use glass morphism styling with warning color accents

#### Scenario: Hagicode logo drops and impacts

- **WHEN** Scene 2 renders from frame 30-60
- **THEN** the Hagicode logo SHALL drop from the top of the screen
- **AND** the logo SHALL accelerate with simulated gravity
- **AND** an impact flash SHALL occur at frame 60

#### Scenario: Problem cards shatter and debris falls

- **WHEN** Scene 2 renders from frame 60-90
- **THEN** the problem cards SHALL appear to shatter
- **AND** debris pieces SHALL fly toward the trash bin with physics-based arcs
- **AND** the debris SHALL be rendered using GPU-accelerated CSS transforms

#### Scenario: Trash bin collects debris and closes

- **WHEN** Scene 2 renders from frame 90-180
- **THEN** the debris SHALL enter the trash bin
- **AND** the trash bin lid SHALL close at frame 150
- **AND** a success indicator SHALL appear when complete

### Requirement: Multi-thread Efficient Scene

The system SHALL provide a scene demonstrating multi-threading efficiency with thread count visualization and percentage chart.

#### Scenario: Thread visualization animates from 1 to 5

- **WHEN** Scene 3 renders
- **THEN** the thread count SHALL animate from 1 thread to 5 threads
- **AND** the animation SHALL complete within the first 45 frames of the scene

#### Scenario: Efficiency chart animates from 20% to 100%

- **WHEN** Scene 3 renders
- **THEN** the percentage SHALL animate from 20% to 100%
- **AND** the animation SHALL be synchronized with the thread visualization
- **AND** the system SHALL display "效能提升 100%" and "效能提升 5 倍" text

### Requirement: Fun Experience Scene

The system SHALL provide a scene demonstrating the enjoyable development experience through mood transformation and feature highlights.

#### Scenario: Fun experience displays features

- **WHEN** Scene 4 renders
- **THEN** the system SHALL display a mood transformation (bored to happy)
- **AND** the system SHALL display feature cards for:
  - 丰富的主题定制
  - 丰富的音效定制
  - 丰富的样式定制
  - 有趣的成就系统
  - 明确的历史简报
  - 历史详细情况记录

### Requirement: Outro Summary Scene

The system SHALL provide a summary scene displaying the brand name and three core value propositions.

#### Scenario: Outro displays summary

- **WHEN** Scene 5 renders
- **THEN** the system SHALL display "Hagicode" brand name
- **AND** the system SHALL display three features:
  - 智能可控（消除 AI 开发常见问题）
  - 高效多线程（效能提升 5 倍）
  - 有趣体验（定制化与成就系统）
- **AND** the system SHALL display GitHub/website link

### Requirement: Problem Card Component

The system SHALL provide a `ProblemCard` component that displays individual AI development problems.

#### Scenario: Problem card displays correctly

- **WHEN** text prop is "AI 经常返工"
- **THEN** the component SHALL display the text in a glass morphism card
- **AND** the card SHALL have a warning color accent
- **AND** the card SHALL be sized to fit in a 3x2 grid

#### Scenario: Problem card shatters at impact

- **WHEN** visibleUntil frame is reached
- **THEN** the card SHALL disappear or show shatter animation
- **AND** the component SHALL not render after the specified frame

### Requirement: Smash Effect Component

The system SHALL provide a `SmashEffect` component that orchestrates the logo drop and impact animation.

#### Scenario: Logo drops with gravity

- **WHEN** triggerFrame is 5 and impactFrame is 10
- **THEN** the logo SHALL start dropping at frame 5
- **AND** the logo SHALL reach impact point at frame 10
- **AND** the drop animation SHALL use accelerating motion

#### Scenario: Impact flash occurs

- **WHEN** the impactFrame is reached
- **THEN** a white flash overlay SHALL appear briefly
- **AND** the flash SHALL fade out within 1-2 frames
- **AND** the flash opacity SHALL not exceed 0.7

### Requirement: Trash Bin Component

The system SHALL provide a `TrashBin` component that collects debris and shows completion.

#### Scenario: Trash bin displays correctly

- **WHEN** the component renders
- **THEN** a trash bin icon SHALL be displayed at the specified position
- **AND** the icon SHALL be sized appropriately for visibility

#### Scenario: Trash bin lid closes

- **WHEN** lidCloseAt frame is reached
- **THEN** the trash bin lid SHALL rotate to closed position
- **AND** the animation SHALL complete smoothly

#### Scenario: Success indicator appears

- **WHEN** debris collection is complete
- **THEN** a success checkmark SHALL appear
- **AND** optional "solved" text MAY be displayed

### Requirement: Thread Visualization Component

The system SHALL provide a `ThreadVisualization` component that displays thread count as animated visual nodes.

#### Scenario: Thread count displays correctly

- **WHEN** threadCount prop is 3
- **THEN** the component SHALL display 3 active thread nodes
- **AND** the component SHALL display 2 inactive nodes (for max 5)

#### Scenario: Thread animation is smooth

- **WHEN** threadCount prop changes from 1 to 5 over 45 frames
- **THEN** the node appearance SHALL interpolate smoothly
- **AND** the animation SHALL use spring physics or easing

### Requirement: Efficiency Chart Component

The system SHALL provide an `EfficiencyChart` component that displays percentage as an animated bar chart.

#### Scenario: Percentage bar animates correctly

- **WHEN** percentage prop changes from 20 to 100
- **THEN** the bar height SHALL animate from 20% to 100% of container height
- **AND** the bar color SHALL use a gradient (red → yellow → green)
- **AND** the percentage label SHALL update accordingly

### Requirement: Theme Consistency

The system SHALL use colors, typography, and spacing from `src/utils/theme.ts` for all intro video components.

#### Scenario: Colors match theme

- **WHEN** any intro component renders
- **THEN** primary elements SHALL use `colors.primary.from` (#3B82F6)
- **AND** AI features SHALL use `colors.secondary.from` (#8B5CF6)
- **AND** warning/problem cards SHALL use error colors (red/orange)
- **AND** background SHALL use `colors.background.dark` (#0F172A)

### Requirement: Deterministic Animation

The system SHALL ensure all animations are deterministic using seeded random functions.

#### Scenario: Animation is reproducible

- **WHEN** the video is rendered multiple times
- **THEN** all animations SHALL produce identical output frame-by-frame
- **AND** any random debris paths SHALL use `random('seed')` function
- **AND** debris trajectories SHALL be pre-calculated using deterministic math

### Requirement: Composition Registration

The system SHALL register the `HagicodeUniversalIntro` composition in `Root.tsx`.

#### Scenario: Composition appears in sidebar

- **WHEN** Remotion Studio loads
- **THEN** "HagicodeUniversalIntro" SHALL appear in the composition list
- **AND** clicking it SHALL load the composition for preview

#### Scenario: Individual scenes are testable

- **WHEN** individual scene components are registered as compositions
- **THEN** each scene SHALL be independently previewable
- **AND** scene compositions SHALL have appropriate durations

### Requirement: Performance Constraints

The system SHALL ensure the animations perform well within the 7-second constraint.

#### Scenario: Debris particle count is limited

- **WHEN** the smash animation renders
- **THEN** the total debris particles SHALL not exceed 40
- **AND** all particles SHALL use CSS transforms for GPU acceleration

#### Scenario: Animation complexity is appropriate

- **WHEN** Scene 2 renders (180 frames at 60fps)
- **THEN** all animations SHALL complete within the frame budget
- **AND** no animation SHALL exceed its allocated frame range

