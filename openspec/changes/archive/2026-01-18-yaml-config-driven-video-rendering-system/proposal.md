# Change: YAML Configuration-Driven Video Rendering System

## Why

The current Hagicode video rendering system requires hardcoding configuration values directly in source code, making it difficult to create multiple video variations without modifying and redeploying the codebase. This limits flexibility for:
- Non-developers who need to create custom video content
- CI/CD pipelines that need to generate videos dynamically
- External systems that want to integrate video generation capabilities

## What Changes

- **Add OS-specific CLI entry points**: Create `render.bat` (Windows) and `render.sh` (Unix/Linux) as user-friendly interfaces
- **Implement internal Node.js handler**: Create `scripts/render-cli.js` for cross-platform rendering logic
- **YAML data file support**: Pass rendering configuration through YAML data files (not full video configuration)
- **Reuse existing Zod schemas**: Leverage current validation infrastructure for data file parsing
- **Add template data files**: Create example YAML data files for common video scenarios
- **Add configuration validation**: Provide clear error messages when YAML data is invalid

## Code Flow Changes

```mermaid
flowchart TD
    A[User runs OS-specific script] --> B{Windows?}
    B -->|Yes| C[render.bat]
    B -->|No| D[render.sh]
    C --> E[Invoke Node.js handler]
    D --> E
    E --> F[Parse command-line args]
    F --> G{Data file exists?}
    G -->|No| H[Show error and exit]
    G -->|Yes| I[Read YAML data file]
    I --> J[Parse YAML content]
    J --> K{Valid YAML?}
    K -->|No| L[Show parse error and exit]
    K -->|Yes| M[Validate against Zod schema]
    M --> N{Valid schema?}
    N -->|No| O[Show validation error and exit]
    N -->|Yes| P[Resolve composition ID]
    P --> Q[Invoke Remotion CLI]
    Q --> R[Render video]
    R --> S[Output result/status]

    style A fill:#e1f5ff
    style C fill:#fff3cd
    style D fill:#fff3cd
    style E fill:#e1f5ff
    style S fill:#d4edda
    style H fill:#f8d7da
    style L fill:#f8d7da
    style O fill:#f8d7da
```

## Architecture Changes

```mermaid
graph TB
    subgraph "User Interface Layer"
        WIN[render.bat<br/>Windows Entry]
        UNIX[render.sh<br/>Unix/Linux Entry]
    end

    subgraph "Core Logic"
        CLI[scripts/render-cli.js<br/>Node.js Handler]
        CONFIG[ConfigLoader<br/>YAML Parser + Validator]
    end

    subgraph "Data Layer"
        DATA[YAML Data Files<br/>Video Content Only]
        TEMPLATES[templates/<br/>Example Data Files]
    end

    subgraph "Existing Components"
        ROOT[Root.tsx<br/>Composition Registry]
        COMP[HagicodeUpdateBulletin<br/>Video Composition]
        SCHEMA[schema.ts<br/>Zod Validation]
        YAML[yaml-loader.ts<br/>YAML Utilities]
    end

    WIN --> CLI
    UNIX --> CLI
    CLI --> CONFIG
    CONFIG --> SCHEMA
    CONFIG --> YAML
    CONFIG --> ROOT
    ROOT --> COMP

    DATA -.-> CLI
    TEMPLATES -.-> CONFIG

    style WIN fill:#fff3cd
    style UNIX fill:#fff3cd
    style CLI fill:#e1f5ff
    style CONFIG fill:#e1f5ff
    style DATA fill:#d4edda
    style TEMPLATES fill:#d4edda
```

## Impact

### Affected Specs
- **NEW**: `external-rendering` - External video rendering via CLI and YAML configuration

### Affected Code
- **NEW**: `render.bat` - Windows batch script entry point
- **NEW**: `render.sh` - Unix/Linux shell script entry point
- **NEW**: `scripts/render-cli.js` - Cross-platform Node.js rendering handler
- **NEW**: `scripts/config-loader.js` - Data file parsing and validation module
- **NEW**: `data/` - YAML data file directory for video content
- **NEW**: `data/examples/` - Example YAML data files for common scenarios
- **MODIFY**: `src/compositions/schema.ts` - Reuse existing schemas for data validation

### Benefits
- **OS-Native Interface**: Users run native scripts (.bat on Windows, .sh on Unix) without Node.js knowledge
- **Data-Driven**: YAML files contain only video content data, not technical configuration
- **Cross-Platform**: Single Node.js handler works across all operating systems
- **Accessibility**: Non-developers can edit YAML data files for video content
- **Automation**: CI/CD pipelines can generate videos via script execution
- **Separation of Concerns**: Data (YAML) separated from logic (Node.js handler)

### Risks
- **Schema Drift**: YAML data schemas may diverge from actual composition props
  - **Mitigation**: Reuse existing Zod schemas, add validation tests
- **Script Compatibility**: .bat and .sh scripts must handle paths correctly on different OSes
  - **Mitigation**: Thorough testing on Windows, Linux, macOS; use Node.js for path handling
- **File Access**: Scripts need proper file system permissions
  - **Mitigation**: Add error handling for permission issues, document requirements
- **Remotion API Changes**: Future Remotion versions may change CLI interface
  - **Mitigation**: Pin Remotion version, document compatibility requirements

### Migration Path
- **Phase 1**: Implement OS-specific entry scripts and Node.js handler with basic YAML data support
- **Phase 2**: Create example data files and documentation
- **Phase 3**: Add advanced features (multiple compositions, batch rendering)
- **Rollback**: Existing Remotion Studio workflow remains unchanged, no breaking changes

### Backward Compatibility
- ✅ **No breaking changes** - Existing compositions and workflows unchanged
- ✅ **Optional feature** - CLI rendering is additive, not replacing Remotion Studio
- ✅ **Shared schemas** - Both workflows use same Zod validation
