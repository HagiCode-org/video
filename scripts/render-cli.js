#!/usr/bin/env node
// Hagicode Video Renderer - CLI Handler
// Main Node.js handler for cross-platform video rendering via YAML configuration

const { spawn } = require('child_process');
const path = require('path');
const { loadConfigFile, ConfigLoadError } = require('./config-loader');
const { processVideo } = require('./ffmpeg-processor');

// Chalk for colored console output (from eslint dependency)
const chalk = require('chalk');

/**
 * Print usage information
 */
function printUsage() {
  console.log(chalk.cyan('\nUsage: render [data-file.yaml] [options]\n'));
  console.log(chalk.cyan('Arguments:'));
  console.log(chalk.cyan('  data-file.yaml    Path to YAML data file (optional, default: public/data/update-bulletin/maximum-data.yaml)\n'));
  console.log(chalk.cyan('Options:'));
  console.log(chalk.cyan('  --output <path>       Output video path (default: out/myvideo.mp4)'));
  console.log(chalk.cyan('  --composition <id>    Override composition ID'));
  console.log(chalk.cyan('  --skip-audio          Skip FFmpeg post-processing (concatenation and background music)'));
  console.log(chalk.cyan('  --verbose             Enable detailed logging'));
  console.log(chalk.cyan('  --help                Show this help message\n'));
  console.log(chalk.cyan('Examples:'));
  console.log(chalk.gray('  render'));
  console.log(chalk.gray('  render data/update-v1.2.0.yaml'));
  console.log(chalk.gray('  render data/examples/update-bulletin.yaml --output out/my-video.mp4'));
  console.log(chalk.gray('  render data.yaml --composition HagicodeUpdateBulletin --verbose'));
  console.log(chalk.gray('  render --skip-audio  # Skip FFmpeg post-processing\n'));
}

/**
 * Parse command-line arguments
 * @param {string[]} args - Command-line arguments
 * @returns {object} Parsed arguments
 */
function parseArguments(args) {
  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  const result = {
    dataFile: 'public/data/update-bulletin/maximum-data.yaml', // Default to maximum-data.yaml
    outputPath: 'out/myvideo.mp4', // Default output path
    composition: null,
    verbose: false,
    skipAudio: false, // Skip FFmpeg post-processing
  };

  // First argument is the data file (optional)
  if (args.length > 0 && !args[0].startsWith('--')) {
    result.dataFile = args[0];
  }

  // Parse options
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--output':
        if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
          result.outputPath = args[i + 1];
          i++;
        } else {
          console.error(chalk.red('Error: --output requires a path argument'));
          process.exit(1);
        }
        break;

      case '--composition':
        if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
          result.composition = args[i + 1];
          i++;
        } else {
          console.error(chalk.red('Error: --composition requires an ID argument'));
          process.exit(1);
        }
        break;

      case '--skip-audio':
        result.skipAudio = true;
        break;

      case '--verbose':
        result.verbose = true;
        break;

      default:
        if (arg.startsWith('--')) {
          console.error(chalk.red(`Error: Unknown option: ${arg}`));
          console.log(chalk.cyan('\nUse --help to see available options\n'));
          process.exit(1);
        }
        break;
    }
  }

  return result;
}

/**
 * Invoke Remotion CLI to render video
 * @param {string} compositionId - Composition ID
 * @param {object} data - Video data
 * @param {object} options - Render options
 * @returns {Promise<number>} Exit code (0 = success)
 */
async function invokeRemotionCLI(compositionId, data, options) {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const os = require('os');
    const path = require('path');

    // Create a temporary JSON file for props
    const tmpDir = os.tmpdir();
    const propsFile = path.join(tmpDir, `remotion-props-${Date.now()}.json`);

    try {
      // Write props to temporary file
      fs.writeFileSync(propsFile, JSON.stringify(data), 'utf8');

      // Build Remotion CLI arguments
      const remotionArgs = [
        'remotion',
        'render',
        compositionId,
        `--props=${propsFile}`,
        `--output=${options.outputPath}`,
        '--overwrite',
      ];

      if (options.verbose) {
        console.log(chalk.gray('Invoking Remotion CLI:'));
        console.log(chalk.gray(`  npx ${remotionArgs.join(' ')}`));
        console.log();
      }

      // Spawn Remotion CLI process
      const child = spawn('npx', remotionArgs, {
        stdio: options.verbose ? 'inherit' : 'pipe',
        shell: true,
      });

      // Capture output if not verbose
      if (!options.verbose) {
        child.stdout.on('data', (data) => {
          console.log(data.toString().trim());
        });

        child.stderr.on('data', (data) => {
          console.error(data.toString().trim());
        });
      }

      // Handle process exit
      child.on('close', (code) => {
        // Clean up temporary file
        try {
          if (fs.existsSync(propsFile)) {
            fs.unlinkSync(propsFile);
          }
        } catch (cleanupError) {
          // Ignore cleanup errors
        }

        if (code === 0) {
          resolve(code);
        } else {
          reject(new Error(`Remotion CLI exited with code ${code}`));
        }
      });

      // Handle spawn errors
      child.on('error', (error) => {
        // Clean up temporary file
        try {
          if (fs.existsSync(propsFile)) {
            fs.unlinkSync(propsFile);
          }
        } catch (cleanupError) {
          // Ignore cleanup errors
        }

        reject(new Error(`Failed to spawn Remotion CLI: ${error.message}`));
      });

    } catch (error) {
      // Clean up temporary file if write failed
      try {
        if (fs.existsSync(propsFile)) {
          fs.unlinkSync(propsFile);
        }
      } catch (cleanupError) {
        // Ignore cleanup errors
      }

      throw error;
    }
  });
}

/**
 * Main render function
 * @param {string} dataFilePath - Path to YAML data file
 * @param {object} options - Render options
 */
async function renderVideo(dataFilePath, options) {
  try {
    console.log(chalk.cyan('\n🎬 Hagicode Video Renderer\n'));

    // Load and validate configuration
    if (options.verbose) {
      console.log(chalk.gray('Loading data file...'));
    }

    const config = loadConfigFile(dataFilePath, {
      composition: options.composition,
    });

    console.log(chalk.green('✓ Data file loaded successfully'));
    console.log(chalk.gray(`  File: ${dataFilePath}`));
    console.log(chalk.gray(`  Composition: ${config.compositionId}`));

    if (options.verbose) {
      console.log(chalk.gray(`  Output: ${options.outputPath}`));
      console.log();
    } else {
      console.log();
    }

    // Ensure output directory exists
    const fs = require('fs');
    const outputDir = path.dirname(options.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      if (options.verbose) {
        console.log(chalk.gray(`Created output directory: ${outputDir}`));
      }
    }

    // Invoke Remotion CLI
    if (options.verbose) {
      console.log(chalk.gray('Step 1: Rendering main video with Remotion...\n'));
    } else {
      console.log(chalk.gray('Rendering main video...'));
    }

    const exitCode = await invokeRemotionCLI(config.compositionId, config.data, options);

    if (exitCode === 0) {
      console.log();
      console.log(chalk.green('✓ Main video rendered successfully'));
      console.log(chalk.gray(`  Output: ${options.outputPath}`));

      // Determine header and tail video paths based on composition
      const isMobile = config.compositionId === 'HagicodeReleaseNotesMobile';
      const headerPath = isMobile ? 'public/video/header_mobile.mp4' : 'public/video/header.mp4';
      const tailPath = isMobile ? 'public/video/tail_mobile.mp4' : 'public/video/tail.mp4';

      // Step 2: FFmpeg post-processing (concatenation and audio)
      if (!options.skipAudio) {
        console.log();
        if (options.verbose) {
          console.log(chalk.gray('Step 2: Post-processing with FFmpeg...\n'));
        } else {
          console.log(chalk.gray('Post-processing video...'));
        }

        try {
          const finalOutput = await processVideo(options.outputPath, options.outputPath, {
            headerPath,
            tailPath,
            verbose: options.verbose,
          });

          console.log();
          console.log(chalk.green('✓ Post-processing completed'));
          console.log(chalk.gray(`  Final output: ${finalOutput}`));
        } catch (ffmpegError) {
          console.log();
          console.error(chalk.yellow('⚠ FFmpeg post-processing failed:'));
          console.error(chalk.yellow(`  ${ffmpegError.message}`));
          console.log();
          console.log(chalk.gray('Tip: Use --skip-audio to skip post-processing'));
          console.log(chalk.gray('Tip: Install FFmpeg: https://ffmpeg.org/download.html'));
          console.log();
          console.log(chalk.gray(`The main video is still available at: ${options.outputPath}`));
        }
      } else {
        if (options.verbose) {
          console.log(chalk.gray('Skipped FFmpeg post-processing'));
        }
      }

      console.log();
    }

    return exitCode;

  } catch (error) {
    console.log();
    console.error(chalk.red('✗ Render failed'));

    if (error instanceof ConfigLoadError) {
      console.error(chalk.red(`  Error Code: ${error.code}`));
      console.error(chalk.red(`  Message: ${error.message}`));

      if (error.cause && error.cause.message) {
        console.error(chalk.gray(`  Details: ${error.cause.message}`));
      }
    } else {
      console.error(chalk.red(`  Message: ${error.message}`));
    }

    console.log();
    process.exit(1);
  }
}

// Main entry point
(async () => {
  const args = process.argv.slice(2);
  const options = parseArguments(args);

  await renderVideo(options.dataFile, options);
})();
