# external-rendering Specification

## Purpose
TBD - created by archiving change yaml-config-driven-video-rendering-system. Update Purpose after archive.
## Requirements
### Requirement: CLI Entry Point

The system SHALL provide a command-line interface script that accepts YAML configuration files as input and triggers video rendering.

#### Scenario: CLI script accepts configuration file path

- **GIVEN** the CLI script `render-video.js` is executed with `--config` flag
- **WHEN** a valid YAML file path is provided
- **THEN** the script loads and validates the configuration
- **AND** proceeds to render the video

#### Scenario: CLI script validates required arguments

- **GIVEN** the CLI script is executed without required arguments
- **WHEN** the `--config` flag is missing
- **THEN** the script displays usage instructions
- **AND** exits with error code 1

#### Scenario: CLI script supports optional output path

- **GIVEN** the CLI script is executed with `--output` flag
- **WHEN** a custom output path is specified
- **THEN** the rendered video is saved to the specified path
- **AND** parent directories are created if needed

#### Scenario: CLI script provides verbose logging

- **GIVEN** the CLI script is executed with `--verbose` flag
- **WHEN** rendering is in progress
- **THEN** detailed logging information is displayed
- **INCLUDING** config loading, validation, and render progress

---

### Requirement: YAML Configuration Parsing

The system SHALL parse YAML configuration files and validate them against composition-specific schemas.

#### Scenario: Valid YAML configuration is parsed correctly

- **GIVEN** a YAML file with valid structure and data types
- **WHEN** the configuration is loaded
- **THEN** all fields are parsed into JavaScript objects
- **AND** data types match schema expectations

#### Scenario: Invalid YAML syntax is rejected

- **GIVEN** a YAML file with syntax errors (indentation, special characters)
- **WHEN** the configuration is loaded
- **THEN** a `YamlParseError` is thrown
- **AND** error message indicates the line number and type of syntax error
- **AND** the script exits with error code 1

#### Scenario: Schema validation errors are reported clearly

- **GIVEN** a YAML file with valid syntax but invalid data (missing required fields, wrong types)
- **WHEN** the configuration is validated
- **THEN** a `DataValidationError` is thrown
- **AND** error message lists all validation failures
- **AND** error messages indicate field path and expected format

#### Scenario: Configuration file missing is handled

- **GIVEN** a path to a non-existent YAML file
- **WHEN** the configuration is loaded
- **THEN** a `DataLoadError` is thrown
- **AND** error message indicates the file was not found
- **AND** the script exits with error code 1

---

### Requirement: Schema Validation

The system SHALL validate YAML configurations against Zod schemas, ensuring type safety and data integrity.

#### Scenario: Schema validates required fields

- **GIVEN** a YAML configuration with all required fields present
- **WHEN** validation is performed
- **THEN** validation passes
- **AND** the configuration is accepted for rendering

#### Scenario: Schema enforces data type constraints

- **GIVEN** a YAML configuration with wrong data types (e.g., string instead of number)
- **WHEN** validation is performed
- **THEN** validation fails
- **AND** error message indicates the field and expected type

#### Scenario: Schema validates array limits

- **GIVEN** a YAML configuration with arrays exceeding maximum size
- **WHEN** validation is performed
- **THEN** validation fails
- **AND** error message indicates the maximum allowed items

#### Scenario: Schema validates format patterns

- **GIVEN** a YAML configuration with version or date fields in wrong format
- **WHEN** validation is performed
- **THEN** validation fails
- **AND** error message shows the expected format pattern

---

### Requirement: Composition Resolution

The system SHALL resolve the composition ID from the YAML configuration and invoke the correct Remotion composition.

#### Scenario: Valid composition ID is resolved

- **GIVEN** a YAML configuration with `metadata.composition: "HagicodeUpdateBulletin"`
- **WHEN** the composition is resolved
- **THEN** the HagicodeUpdateBulletin component is targeted for rendering
- **AND** the correct schema is used for validation

#### Scenario: Invalid composition ID is rejected

- **GIVEN** a YAML configuration with unknown composition ID
- **WHEN** the composition is resolved
- **THEN** an error is thrown
- **AND** error message lists valid composition IDs

#### Scenario: Composition-specific duration is calculated

- **GIVEN** a YAML configuration with update bulletin data
- **WHEN** the duration is calculated
- **THEN** the total duration is based on content volume (highlights + minor items)
- **AND** the calculated duration is passed to Remotion CLI

---

### Requirement: Remotion CLI Integration

The system SHALL invoke the Remotion CLI with the correct parameters to render the video.

#### Scenario: Remotion CLI is invoked with props

- **GIVEN** a validated YAML configuration
- **WHEN** the render process starts
- **THEN** Remotion CLI is spawned with `--props` containing the configuration data
- **AND** the composition ID is passed as argument
- **AND** output path is specified with `--output` flag

#### Scenario: Render progress is monitored

- **GIVEN** a render process is running
- **WHEN** frames are being rendered
- **THEN** progress information is displayed if `--verbose` is enabled
- **AND** the final output path is shown on completion

#### Scenario: Render failures are handled

- **GIVEN** a render process fails (e.g., composition not found, asset missing)
- **WHEN** the process exits with non-zero code
- **THEN** the CLI script exits with the same error code
- **AND** error message from Remotion is displayed to the user

#### Scenario: Successful render produces output

- **GIVEN** a render process completes successfully
- **WHEN** the process exits with code 0
- **THEN** the CLI script displays success message
- **AND** exits with code 0
- **AND** the video file exists at the specified output path

---

### Requirement: Template System

The system SHALL provide YAML template files that demonstrate proper configuration format and serve as starting points for custom videos.

#### Scenario: Template file exists for update bulletin

- **GIVEN** the `templates/update-bulletin.yaml` file
- **WHEN** it is used with the CLI script
- **THEN** it contains all required fields with valid example values
- **AND** it includes inline comments explaining each field
- **AND** it successfully renders a video

#### Scenario: Template file exists for universal intro

- **GIVEN** the `templates/universal-intro.yaml` file
- **WHEN** it is used with the CLI script
- **THEN** it contains the universal intro composition configuration
- **AND** it successfully renders a video

#### Scenario: Template README provides usage documentation

- **GIVEN** the `templates/README.md` file
- **WHEN** a user reads the documentation
- **THEN** it explains how to use templates
- **AND** it describes all available configuration fields
- **AND** it provides examples for common use cases

#### Scenario: Template demonstrates optional vs required fields

- **GIVEN** a template YAML file
- **WHEN** a user inspects the file
- **THEN** required fields are clearly marked in comments
- **AND** optional fields show default values or are commented out
- **AND** the structure is self-documenting

---

### Requirement: Error Handling

The system SHALL provide clear, actionable error messages for all failure modes.

#### Scenario: File not found error is descriptive

- **GIVEN** a non-existent configuration file path
- **WHEN** the CLI script attempts to load it
- **THEN** error message indicates "File not found"
- **AND** shows the invalid file path
- **AND** suggests checking the path

#### Scenario: YAML syntax error shows location

- **GIVEN** a YAML file with syntax errors
- **WHEN** parsing fails
- **THEN** error message includes line number
- **AND** error message describes the syntax issue
- **AND** suggests checking indentation or special characters

#### Scenario: Schema validation error lists all issues

- **GIVEN** a YAML file with multiple validation errors
- **WHEN** validation fails
- **THEN** error message lists all validation failures
- **AND** each error shows field path and expected format
- **AND** errors are numbered for easy reference

#### Scenario: Render error includes context

- **GIVEN** a render failure during video generation
- **WHEN** the error occurs
- **THEN** error message includes the composition ID
- **AND** error message includes the output path
- **AND** error message suggests checking Remotion logs

---

### Requirement: Security Validation

The system SHALL validate file paths to prevent directory traversal attacks and ensure safe file access.

#### Scenario: Path traversal is prevented

- **GIVEN** a configuration file path with `..` sequences (e.g., `../../etc/passwd`)
- **WHEN** the path is validated
- **THEN** validation fails
- **AND** error message indicates "Invalid path: path traversal detected"
- **AND** the script exits without accessing files outside project

#### Scenario: Absolute paths are handled safely

- **GIVEN** an absolute path to a YAML file
- **WHEN** the path is validated
- **THEN** the file is accessed if within allowed directories
- **OR** validation fails if outside allowed directories

#### Scenario: YAML code execution is prevented

- **GIVEN** a YAML file with malicious code execution attempts
- **WHEN** the YAML is parsed
- **THEN** the FAILSAFE_SCHEMA is used
- **AND** no code is executed
- **AND** only data structures are parsed

---

### Requirement: Backward Compatibility

The system SHALL not break existing Remotion Studio workflow or composition definitions.

#### Scenario: Remotion Studio still works

- **GIVEN** the project with CLI rendering added
- **WHEN** `npm run dev` is executed
- **THEN** Remotion Studio opens normally
- **AND** all compositions are visible in the sidebar
- **AND** preview rendering works as before

#### Scenario: Existing compositions are unchanged

- **GIVEN** the HagicodeUpdateBulletin composition
- **WHEN** inspected in Root.tsx
- **THEN** no changes to the component implementation
- **AND** no changes to the composition registration
- **AND** existing defaultProps are preserved

#### Scenario: Shared schemas work for both workflows

- **GIVEN** the UpdateBulletinDataSchema
- **WHEN** used in CLI or Remotion Studio
- **THEN** validation works identically in both contexts
- **AND** TypeScript types are consistent
- **AND** error messages are consistent

---

### Requirement: Documentation

The system SHALL provide comprehensive documentation for CLI usage and configuration format.

#### Scenario: README explains CLI usage

- **GIVEN** the README-CLI-RENDERING.md file
- **WHEN** a new user reads the documentation
- **THEN** it explains how to install dependencies
- **AND** it shows basic usage examples
- **AND** it documents all command-line flags

#### Scenario: Configuration reference is complete

- **GIVEN** the configuration reference documentation
- **WHEN** a user looks up a field
- **THEN** all fields are documented with types and descriptions
- **AND** required vs optional fields are marked
- **AND** examples are provided for complex fields

#### Scenario: Troubleshooting guide covers common issues

- **GIVEN** the troubleshooting section in README
- **WHEN** a user encounters an error
- **THEN** common errors are listed with solutions
- **AND** error messages are explained
- **AND** next steps are suggested

#### Scenario: Code comments explain implementation

- **GIVEN** the CLI source code
- **WHEN** a developer reads the code
- **THEN** complex logic is explained with comments
- **AND** function parameters are documented with JSDoc
- **AND** error conditions are documented

