# Update Bulletin Screenshot Resources

This directory contains placeholder images for the Hagicode Update Bulletin video template.

## Required Screenshots

For the example data to work correctly, place the following images here:

1. `ai-codegen.png` - Screenshot for AI code generation feature
2. `openspec-ui.png` - Screenshot for OpenSpec UI optimization
3. `session-mgmt.png` - Screenshot for session management feature

## Image Specifications

- **Format**: PNG or JPG
- **Recommended size**: 1200x800 or 16:9 aspect ratio
- **Maximum file size**: 2MB per image

## Temporary Placeholders

If you don't have actual screenshots yet, you can:

1. Create simple colored placeholders
2. Use the template without screenshots (they're optional)
3. Comment out the screenshot fields in the data

## Adding New Screenshots

1. Place your screenshot files in this directory
2. Update the `screenshot` field in `example-data.ts`:

```typescript
screenshot: '/images/update-bulletin/your-screenshot.png'
```

3. The video will automatically load and display them
