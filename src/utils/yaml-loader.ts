// YAML loader utility for Hagicode Update Bulletin
// Provides build-time and runtime YAML data loading with Zod validation

import * as yaml from 'js-yaml';
import { staticFile } from 'remotion';
import { validateUpdateData, type UpdateBulletinData } from '../compositions/schema';

/**
 * Custom error types for YAML loading failures
 */
export class YamlParseError extends Error {
  constructor(message: string, public readonly cause: Error) {
    super(message);
    this.name = 'YamlParseError';
  }
}

export class DataLoadError extends Error {
  constructor(message: string, public readonly cause: Error) {
    super(message);
    this.name = 'DataLoadError';
  }
}

export class DataValidationError extends Error {
  constructor(message: string, public readonly cause: unknown) {
    super(message);
    this.name = 'DataValidationError';
  }
}

/**
 * Parse YAML string content into a JavaScript object
 * @param content - YAML format string
 * @returns Parsed object (unknown type)
 * @throws YamlParseError if YAML syntax is invalid
 */
export function parseYamlContent(content: string): unknown {
  try {
    return yaml.load(content, {
      schema: yaml.FAILSAFE_SCHEMA, // Use safe schema to avoid code execution
      filename: 'data.yaml',
    });
  } catch (error) {
    throw new YamlParseError(
      `YAML parsing failed: ${error instanceof Error ? error.message : String(error)}`,
      error as Error
    );
  }
}

/**
 * Runtime async loader for YAML data
 * Uses fetch API to load YAML files from the public directory
 * @param relativePath - Path relative to public/data/ (e.g., 'update-bulletin/example-data.yaml')
 * @returns Promise<UpdateBulletinData>
 * @throws DataLoadError if file cannot be fetched
 * @throws YamlParseError if YAML syntax is invalid
 * @throws DataValidationError if data does not match schema
 */
export async function loadYamlRuntime(relativePath: string): Promise<UpdateBulletinData> {
  const fullPath = staticFile(`data/${relativePath}`);

  try {
    const response = await fetch(fullPath);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();
    const parsed = parseYamlContent(content);
    return validateUpdateData(parsed);
  } catch (error) {
    if (error instanceof YamlParseError) {
      throw error;
    }
    if (error instanceof DataValidationError) {
      throw error;
    }
    throw new DataLoadError(
      `Failed to load YAML file (${relativePath}): ${error instanceof Error ? error.message : String(error)}`,
      error as Error
    );
  }
}

/**
 * Validate path to prevent directory traversal attacks
 * @param relativePath - Path to validate
 * @throws Error if path is invalid
 */
function validatePath(relativePath: string): void {
  const normalized = relativePath.replace(/\\/g, '/');
  if (normalized.startsWith('..') || normalized.startsWith('/')) {
    throw new Error('Invalid path: path traversal detected');
  }
  if (normalized.includes('..')) {
    throw new Error('Invalid path: path traversal detected');
  }
}

/**
 * Cache for loaded YAML data to avoid repeated parsing
 */
const dataCache = new Map<string, UpdateBulletinData>();

/**
 * Load YAML data from file system at build time (Node.js environment only)
 * This function only works in Node.js context, not in browser
 * @param relativePath - Path relative to public/data/ (e.g., 'update-bulletin/maximum-data.yaml')
 * @returns UpdateBulletinData
 * @throws DataLoadError if file cannot be read
 * @throws YamlParseError if YAML syntax is invalid
 * @throws DataValidationError if data does not match schema
 */
export function loadYamlBuildTime(relativePath: string): UpdateBulletinData {
  validatePath(relativePath);

  if (dataCache.has(relativePath)) {
    return dataCache.get(relativePath)!;
  }

  try {
    // Dynamic require for fs and path (only available in Node.js)
    const fs = require('fs');
    const path = require('path');

    // Resolve path from project root to public/data/
    const projectRoot = process.cwd();
    const fullPath = path.join(projectRoot, 'public', 'data', relativePath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${relativePath}`);
    }

    // Read file content
    const content = fs.readFileSync(fullPath, 'utf-8');

    // Parse and validate
    const parsed = parseYamlContent(content);
    const validated = validateUpdateData(parsed);

    // Cache the result
    dataCache.set(relativePath, validated);

    return validated;
  } catch (error) {
    if (error instanceof YamlParseError) {
      throw new YamlParseError(
        `YAML parsing failed (${relativePath}): ${error.message}`,
        error.cause
      );
    }
    if (error instanceof Error && 'errors' in error) {
      // Zod validation error
      throw new DataValidationError(
        `Data validation failed (${relativePath}): ${error.message}`,
        error
      );
    }
    throw new DataLoadError(
      `Failed to load YAML file (${relativePath}): ${error instanceof Error ? error.message : String(error)}`,
      error as Error
    );
  }
}

/**
 * Load YAML data from a webpack-bundled inline string
 * This is used when YAML data is imported using webpack's ?raw suffix
 * @param relativePath - Path relative to public/data/ (for cache key)
 * @param data - YAML data as string (imported via webpack ?raw)
 * @returns UpdateBulletinData
 */
export function loadYamlWebpackInline(relativePath: string, data: string): UpdateBulletinData {
  validatePath(relativePath);

  if (dataCache.has(relativePath)) {
    return dataCache.get(relativePath)!;
  }

  try {
    // Parse and validate
    const parsed = parseYamlContent(data);
    const validated = validateUpdateData(parsed);

    // Cache the result
    dataCache.set(relativePath, validated);

    return validated;
  } catch (error) {
    if (error instanceof YamlParseError) {
      throw new YamlParseError(
        `YAML parsing failed (${relativePath}): ${error.message}`,
        error.cause
      );
    }
    if (error instanceof Error && 'errors' in error) {
      // Zod validation error
      throw new DataValidationError(
        `Data validation failed (${relativePath}): ${error.message}`,
        error
      );
    }
    throw new DataLoadError(
      `Failed to load YAML file (${relativePath}): ${error instanceof Error ? error.message : String(error)}`,
      error as Error
    );
  }
}

/**
 * Load YAML data with optional caching (synchronous, requires pre-loaded data)
 * This is used when YAML data is loaded inline at module initialization
 * @param relativePath - Path relative to public/data/
 * @param data - Pre-loaded YAML data as string
 * @param useCache - Whether to use cached data if available (default: true)
 * @returns UpdateBulletinData
 */
export function loadYamlInline(relativePath: string, data: string, useCache = true): UpdateBulletinData {
  validatePath(relativePath);

  if (useCache && dataCache.has(relativePath)) {
    return dataCache.get(relativePath)!;
  }

  try {
    const parsed = parseYamlContent(data);
    const validated = validateUpdateData(parsed);

    if (useCache) {
      dataCache.set(relativePath, validated);
    }

    return validated;
  } catch (error) {
    if (error instanceof YamlParseError) {
      throw new YamlParseError(
        `YAML parsing failed (${relativePath}): ${error.message}`,
        error.cause
      );
    }
    if (error instanceof Error && 'errors' in error) {
      // Zod validation error
      throw new DataValidationError(
        `Data validation failed (${relativePath}): ${error.message}`,
        error
      );
    }
    throw new DataLoadError(
      `Failed to load YAML file (${relativePath}): ${error instanceof Error ? error.message : String(error)}`,
      error as Error
    );
  }
}

/**
 * Clear the YAML data cache
 * Useful for testing or when YAML files are updated
 */
export function clearYamlCache(): void {
  dataCache.clear();
}
