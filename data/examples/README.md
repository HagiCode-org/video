# YAML Data Examples

This directory contains example YAML data files for rendering Hagicode videos via CLI.

## Available Examples

### update-bulletin-example.yaml
A comprehensive example showcasing all features of the update bulletin video template:
- Version and release date
- Summary section
- Multiple highlights with screenshots and tags
- Multiple minor items across different categories

**Usage:**
```bash
# Windows
render.bat data/examples/update-bulletin-example.yaml --output out/example.mp4

# Unix/Linux
./render.sh data/examples/update-bulletin-example.yaml --output out/example.mp4
```

### update-bulletin-simple.yaml
A minimal example for quick testing:
- Basic version and release date
- Single highlight item
- Single minor item

**Usage:**
```bash
# Windows
render.bat data/examples/update-bulletin-simple.yaml --output out/simple.mp4

# Unix/Linux
./render.sh data/examples/update-bulletin-simple.yaml --output out/simple.mp4
```

## Data File Format

Update bulletin data files follow this structure:

```yaml
# Version (required)
# Format: v1.2.0 or 1.2.0
version: v1.2.0

# Release date (required)
# Format: YYYY-MM-DD
releaseDate: 2026-01-18

# Summary (optional)
# Brief description of this update
summary: This update includes new features and bug fixes.

# Highlights (optional, max 20 items)
# Major features/updates to showcase
highlights:
  - id: unique-id          # Optional: unique identifier
    title: Feature Title    # Required: feature title
    description: Details   # Required: feature description
    screenshot: /path.png   # Optional: screenshot path
    tags:                  # Optional: category tags
      - feature
      - ai

# Minor items (optional, max 20 items)
# Smaller updates, bug fixes, improvements
minorItems:
  - category: feature      # Required: item category
    title: Item title      # Required: item title
    description: Details   # Optional: item description
```

## Field Reference

### Required Fields

| Field | Type | Format | Description |
|-------|------|--------|-------------|
| `version` | string | `v1.2.0` or `1.2.0` | Version number |
| `releaseDate` | string | `YYYY-MM-DD` | Release date |

### Optional Fields

| Field | Type | Max Size | Description |
|-------|------|----------|-------------|
| `summary` | string | - | Version summary |
| `highlights` | array | 20 items | Major features/updates |
| `minorItems` | array | 20 items | Minor updates/fixes |

### Highlight Item Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | No | Unique identifier |
| `title` | string | **Yes** | Feature title |
| `description` | string | **Yes** | Feature description |
| `screenshot` | string | No | Screenshot path |
| `tags` | array | No | Category tags |

### Minor Item Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `category` | enum | **Yes** | Item category |
| `title` | string | **Yes** | Item title |
| `description` | string | No | Item description |

### Category Options

Valid values for `category` and `tags`:
- `feature` - New features
- `bugfix` - Bug fixes
- `improvement` - Improvements
- `ai` - AI-related features
- `ui` - UI/UX changes
- `performance` - Performance improvements
- `other` - Other changes

## Creating Custom Data Files

1. **Copy an example**: Start with `update-bulletin-simple.yaml`
2. **Edit the content**: Update version, date, and items
3. **Validate the format**: Ensure proper YAML syntax
4. **Test the render**: Use the render script to generate video

```bash
# Test your custom data file
render.bat data/my-custom-video.yaml --output out/test.mp4 --verbose
```

## Tips

- Use **consistent version format** (prefer `v1.2.0` format)
- Keep **descriptions concise** (1-2 sentences per item)
- Use **relevant tags** to categorize highlights
- Order **highlights by importance** (first items appear first in video)
- Use **meaningful IDs** for highlights (useful for reference)
- Test with **`--verbose`** flag to see detailed logging

## Error Handling

If you encounter errors:

1. **YAML Parse Error**: Check YAML syntax (indentation, colons, quotes)
2. **Validation Error**: Ensure all required fields are present and correctly formatted
3. **File Not Found**: Verify the file path is correct relative to project root
4. **Schema Error**: Check field types and values match the schema

For more information, see [README-RENDERING.md](../../README-RENDERING.md)
