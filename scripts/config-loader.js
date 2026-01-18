// Config Loader - Data file parsing and validation module
// Provides YAML data loading, validation, and composition detection for CLI rendering

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Custom error types for configuration loading
 */
class ConfigLoadError extends Error {
  constructor(message, code, cause = null) {
    super(message);
    this.name = 'ConfigLoadError';
    this.code = code;
    this.cause = cause;
  }
}

/**
 * Parse YAML file content with error handling
 * @param {string} content - YAML file content
 * @param {string} filePath - File path for error messages
 * @returns {object} Parsed YAML data
 * @throws {ConfigLoadError} If YAML parsing fails
 */
function parseYamlContent(content, filePath) {
  try {
    return yaml.load(content, {
      schema: yaml.FAILSAFE_SCHEMA,
      filename: filePath,
    });
  } catch (error) {
    throw new ConfigLoadError(
      `YAML parsing failed: ${error.message}`,
      'YAML_PARSE_ERROR',
      error
    );
  }
}

/**
 * Validate path to prevent directory traversal attacks
 * @param {string} filePath - Path to validate
 * @throws {ConfigLoadError} If path is invalid
 */
function validatePath(filePath) {
  const normalized = path.normalize(filePath).replace(/\\/g, '/');

  // Check for path traversal attempts
  if (normalized.includes('..')) {
    throw new ConfigLoadError(
      'Invalid path: path traversal detected',
      'PATH_TRAVERSAL_ERROR'
    );
  }

  // Check if path is absolute (should be relative)
  if (path.isAbsolute(filePath)) {
    throw new ConfigLoadError(
      'Invalid path: absolute paths not allowed',
      'ABSOLUTE_PATH_ERROR'
    );
  }
}

/**
 * Detect composition ID from data structure
 * @param {object} data - Parsed YAML data
 * @returns {string} Composition ID
 * @throws {ConfigLoadError} If composition cannot be detected
 */
function detectCompositionId(data) {
  // Check if data matches UpdateBulletin schema structure
  if (data.version && data.releaseDate) {
    return 'HagicodeUpdateBulletin';
  }

  // Default to HagicodeUpdateBulletin for now
  // In future, can add more composition detection logic
  return 'HagicodeUpdateBulletin';
}

/**
 * Validate data against composition schema (basic validation)
 * Note: Full Zod validation happens in Remotion during render
 * @param {object} data - Parsed YAML data
 * @param {string} compositionId - Composition ID
 * @throws {ConfigLoadError} If validation fails
 */
function validateDataSchema(data, compositionId) {
  if (compositionId === 'HagicodeUpdateBulletin') {
    // Basic validation for UpdateBulletin
    if (!data.version) {
      throw new ConfigLoadError(
        'Missing required field: version',
        'VALIDATION_ERROR'
      );
    }

    // Version format validation
    const versionRegex = /^v?\d+\.\d+\.\d+(-.*)?$/;
    if (!versionRegex.test(data.version)) {
      throw new ConfigLoadError(
        `Invalid version format: ${data.version} (expected v1.2.0 or 1.2.0)`,
        'VALIDATION_ERROR'
      );
    }

    if (!data.releaseDate) {
      throw new ConfigLoadError(
        'Missing required field: releaseDate',
        'VALIDATION_ERROR'
      );
    }

    // Date format validation
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.releaseDate)) {
      throw new ConfigLoadError(
        `Invalid date format: ${data.releaseDate} (expected YYYY-MM-DD)`,
        'VALIDATION_ERROR'
      );
    }

    // Array size validation
    if (data.highlights && data.highlights.length > 20) {
      throw new ConfigLoadError(
        `Too many highlights: ${data.highlights.length} (max 20)`,
        'VALIDATION_ERROR'
      );
    }

    if (data.minorItems && data.minorItems.length > 20) {
      throw new ConfigLoadError(
        `Too many minor items: ${data.minorItems.length} (max 20)`,
        'VALIDATION_ERROR'
      );
    }
  }
}

/**
 * Load and validate YAML data file
 * @param {string} dataFilePath - Path to YAML data file
 * @param {object} options - Options object
 * @param {string} options.composition - Override composition ID (optional)
 * @returns {object} Object containing data and compositionId
 * @throws {ConfigLoadError} If file loading or validation fails
 */
function loadConfigFile(dataFilePath, options = {}) {
  // Validate file path
  validatePath(dataFilePath);

  // Resolve full path from project root
  const projectRoot = process.cwd();
  const fullPath = path.resolve(projectRoot, dataFilePath);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new ConfigLoadError(
      `Data file not found: ${dataFilePath}`,
      'FILE_NOT_FOUND'
    );
  }

  // Check if it's a file (not a directory)
  const stats = fs.statSync(fullPath);
  if (!stats.isFile()) {
    throw new ConfigLoadError(
      `Path is not a file: ${dataFilePath}`,
      'NOT_A_FILE'
    );
  }

  // Read file content
  let content;
  try {
    content = fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    throw new ConfigLoadError(
      `Failed to read file: ${error.message}`,
      'FILE_READ_ERROR',
      error
    );
  }

  // Parse YAML content
  const data = parseYamlContent(content, dataFilePath);

  // Validate data is an object
  if (typeof data !== 'object' || data === null) {
    throw new ConfigLoadError(
      'YAML data must be an object',
      'INVALID_DATA_TYPE'
    );
  }

  // Detect or use provided composition ID
  const compositionId = options.composition || detectCompositionId(data);

  // Validate against composition schema
  validateDataSchema(data, compositionId);

  return {
    data,
    compositionId,
    filePath: fullPath,
  };
}

module.exports = {
  ConfigLoadError,
  loadConfigFile,
  detectCompositionId,
  validateDataSchema,
  parseYamlContent,
};
