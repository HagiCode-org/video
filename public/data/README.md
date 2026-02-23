# Data Directory

This directory contains YAML data files for the Hagicode video templates.

## Structure

```
data/
└── update-bulletin/
    ├── example-data.yaml       # Complete example data
    ├── minimal-data.yaml       # Minimal test data
    └── maximum-data.yaml       # Maximum boundary test data
```

## Format

Data files use YAML 1.2 format with UTF-8 encoding. All files are validated against the Zod schema defined in `src/compositions/schema.ts`.

### Schema Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | Yes | Version number (format: v1.2.0 or 1.2.0) |
| `releaseDate` | string | Yes | Release date (format: YYYY-MM-DD) |
| `summary` | string | No | Version summary |
| `highlights` | array | Yes | Major highlights (0-20 items) |
| `minorItems` | array | Yes | Minor items (0-20 items) |

## Modifying Data

1. Edit the corresponding YAML file
2. Ensure proper YAML indentation (use spaces, not tabs)
3. Restart the dev server to see changes
4. Data is automatically validated on load

## Validation

All data is validated at runtime using Zod schemas. Invalid data will cause clear error messages indicating the specific field and issue.
