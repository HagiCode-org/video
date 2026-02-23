// FFmpeg Processor - Video concatenation and audio merging
// Handles post-processing of rendered videos with FFmpeg

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

/**
 * Check if FFmpeg is installed and accessible
 * @returns {Promise<boolean>} True if FFmpeg is available
 */
async function checkFFmpegAvailable() {
  return new Promise((resolve) => {
    const child = spawn('ffmpeg', ['-version'], {
      stdio: 'ignore',
      shell: true,
    });

    child.on('close', (code) => {
      resolve(code === 0);
    });

    child.on('error', () => {
      resolve(false);
    });
  });
}

/**
 * Get video duration using FFprobe
 * @param {string} videoPath - Path to video file
 * @returns {Promise<number>} Duration in seconds
 */
async function getVideoDuration(videoPath) {
  return new Promise((resolve, reject) => {
    const child = spawn('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      videoPath
    ], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0 && stdout.trim()) {
        const duration = parseFloat(stdout.trim());
        if (!isNaN(duration)) {
          resolve(duration);
        } else {
          reject(new Error(`Invalid duration output: ${stdout}`));
        }
      } else {
        reject(new Error(`FFprobe failed: ${stderr}`));
      }
    });

    child.on('error', (error) => {
      reject(new Error(`Failed to spawn FFprobe: ${error.message}`));
    });
  });
}

/**
 * Concatenate videos: header + main + tail
 * @param {string} headerPath - Path to header video
 * @param {string} mainVideoPath - Path to main video
 * @param {string} tailPath - Path to tail video
 * @param {string} outputPath - Path for output video
 * @param {boolean} verbose - Enable verbose logging
 * @returns {Promise<void>}
 */
async function concatenateVideos(headerPath, mainVideoPath, tailPath, outputPath, verbose = false) {
  return new Promise((resolve, reject) => {
    // Use the directory of the output file for temp files
    const tmpDir = path.dirname(outputPath);
    const concatListPath = path.join(tmpDir, `concat-list-${Date.now()}.txt`);

    try {
      // Write concat list file
      const concatList = [
        `file '${path.resolve(headerPath).replace(/\\/g, '/')}'`,
        `file '${path.resolve(mainVideoPath).replace(/\\/g, '/')}'`,
        `file '${path.resolve(tailPath).replace(/\\/g, '/')}'`,
      ].join('\n');

      fs.writeFileSync(concatListPath, concatList, 'utf8');

      // Build FFmpeg command
      const ffmpegArgs = [
        '-f', 'concat',
        '-safe', '0',
        '-i', concatListPath,
        '-c', 'copy',
        '-y',
        outputPath,
      ];

      if (verbose) {
        console.log('\nConcatenating videos:');
        console.log(`  Header: ${headerPath}`);
        console.log(`  Main: ${mainVideoPath}`);
        console.log(`  Tail: ${tailPath}`);
        console.log(`  Output: ${outputPath}\n`);
      }

      // Spawn FFmpeg process
      const child = spawn('ffmpeg', ffmpegArgs, {
        stdio: verbose ? 'inherit' : 'pipe',
        shell: true,
      });

      // Capture output if not verbose
      if (!verbose) {
        child.stderr.on('data', (data) => {
          const output = data.toString().trim();
          // Only show progress
          if (output.includes('frame=') || output.includes('time=')) {
            process.stdout.write('\r' + output);
          }
        });
      }

      // Handle process exit
      child.on('close', (code) => {
        // Clean up concat list file only (not the output video)
        try {
          if (fs.existsSync(concatListPath)) {
            fs.unlinkSync(concatListPath);
          }
          // Don't clean up temp directory yet - we still need the concatenated video
        } catch (cleanupError) {
          // Ignore cleanup errors
        }

        if (!verbose) {
          process.stdout.write('\n');
        }

        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`FFmpeg concatenation failed with exit code ${code}`));
        }
      });

      // Handle spawn errors
      child.on('error', (error) => {
        // Clean up temp file
        try {
          if (fs.existsSync(concatListPath)) {
            fs.unlinkSync(concatListPath);
          }
        } catch (cleanupError) {
          // Ignore cleanup errors
        }

        reject(new Error(`Failed to spawn FFmpeg: ${error.message}`));
      });

    } catch (error) {
      // Clean up temp file if write failed
      try {
        if (fs.existsSync(concatListPath)) {
          fs.unlinkSync(concatListPath);
        }
      } catch (cleanupError) {
        // Ignore cleanup errors
      }

      throw error;
    }
  });
}

/**
 * Add background music to video
 * @param {string} videoPath - Path to video file
 * @param {string} audioPath - Path to audio file
 * @param {string} outputPath - Path for output video
 * @param {object} options - Options
 * @param {number} options.audioVolume - Audio volume (default: 0.3 for 30%)
 * @param {boolean} options.loopAudio - Loop audio to match video length (default: true)
 * @param {boolean} verbose - Enable verbose logging
 * @returns {Promise<void>}
 */
async function addBackgroundMusic(videoPath, audioPath, outputPath, options = {}, verbose = false) {
  const {
    audioVolume = 0.3,
    loopAudio = true,
    fadeOutDuration = 3, // Fade out duration in seconds
  } = options;

  return new Promise(async (resolve, reject) => {
    try {
      // Resolve to absolute paths and normalize for Windows
      const absoluteVideoPath = path.resolve(videoPath);
      const absoluteAudioPath = path.resolve(audioPath);
      const absoluteOutputPath = path.resolve(outputPath);

      // Verify input files exist
      if (!fs.existsSync(absoluteVideoPath)) {
        throw new Error(`Video file not found: ${absoluteVideoPath}`);
      }
      if (!fs.existsSync(absoluteAudioPath)) {
        throw new Error(`Audio file not found: ${absoluteAudioPath}`);
      }

      // Get video duration for fade out calculation
      const videoDuration = await getVideoDuration(absoluteVideoPath);
      const fadeStartTime = Math.max(0, videoDuration - fadeOutDuration);

      // Build FFmpeg command with fade out effect
      // afade filter: t=out - fade out at end, st=startTime - start fade at this time
      const ffmpegArgs = [
        '-i', absoluteVideoPath,
        '-i', absoluteAudioPath,
        '-filter_complex', `[1:a]volume=${audioVolume},afade=t=out:st=${fadeStartTime}:d=${fadeOutDuration}[aout]`,
        '-map', '0:v',
        '-map', '[aout]',
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-shortest',
        '-y',
        absoluteOutputPath,
      ];

      if (verbose) {
        console.log('\nAdding background music:');
        console.log(`  Video: ${absoluteVideoPath}`);
        console.log(`  Audio: ${absoluteAudioPath}`);
        console.log(`  Output: ${absoluteOutputPath}`);
        console.log(`  Volume: ${audioVolume * 100}%`);
        console.log(`  Fade out: Last ${fadeOutDuration} seconds`);
        console.log(`  Video duration: ${videoDuration.toFixed(2)}s`);
        console.log(`  Fade starts at: ${fadeStartTime.toFixed(2)}s\n`);

        // Verify files exist
        console.log('File verification:');
        console.log(`  Video exists: ${fs.existsSync(absoluteVideoPath)}`);
        console.log(`  Audio exists: ${fs.existsSync(absoluteAudioPath)}\n`);

        console.log('FFmpeg command:');
        console.log(`  ffmpeg ${ffmpegArgs.map(arg => arg.includes(' ') ? `"${arg}"` : arg).join(' ')}\n`);
      }

      // Spawn FFmpeg process
      const child = spawn('ffmpeg', ffmpegArgs, {
        stdio: verbose ? 'inherit' : ['ignore', 'pipe', 'pipe'],
        shell: true,
      });

      let stderr = '';

      // Capture stderr for error reporting
      child.stderr.on('data', (data) => {
        const output = data.toString();
        stderr += output;
        // Only show progress if not verbose
        if (!verbose) {
          const lines = output.trim().split('\n');
          const lastLine = lines[lines.length - 1];
          if (lastLine.includes('frame=') || lastLine.includes('time=')) {
            process.stdout.write('\r' + lastLine);
          }
        }
      });

      // Capture stdout (FFmpeg uses stderr for most output)
      if (!verbose) {
        child.stdout.on('data', (data) => {
          const output = data.toString().trim();
          if (output) {
            console.log(output);
          }
        });
      }

      // Handle process exit
      child.on('close', (code) => {
        if (!verbose) {
          process.stdout.write('\n');
        }

        if (code === 0) {
          resolve();
        } else {
          // Provide detailed error information
          if (verbose && stderr) {
            console.error('FFmpeg stderr output:');
            console.error(stderr);
          }

          const errorDetails = stderr.includes('No such file or directory')
            ? `Input file not found. Video: ${absoluteVideoPath}, Audio: ${absoluteAudioPath}`
            : stderr.includes('Invalid data')
            ? 'Invalid audio format'
            : `Unknown FFmpeg error (exit code ${code})`;

          reject(new Error(`FFmpeg audio mixing failed: ${errorDetails}`));
        }
      });

      // Handle spawn errors
      child.on('error', (error) => {
        reject(new Error(`Failed to spawn FFmpeg: ${error.message}`));
      });

    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Process video: concatenate header/main/tail and add background music
 * @param {string} mainVideoPath - Path to main rendered video
 * @param {string} finalOutputPath - Path for final output video
 * @param {object} options - Processing options
 * @param {string} options.headerPath - Path to header video (default: public/video/header.mp4)
 * @param {string} options.tailPath - Path to tail video (default: public/video/tail.mp4)
 * @param {string} options.audioPath - Path to background audio (default: public/audio/Tobu,Diviners - Geometry.mp3)
 * @param {number} options.audioVolume - Audio volume (default: 0.3)
 * @param {boolean} options.skipAudio - Skip adding background music (default: false)
 * @param {boolean} options.verbose - Enable verbose logging (default: false)
 * @returns {Promise<string>} Path to final processed video
 */
async function processVideo(mainVideoPath, finalOutputPath, options = {}) {
  const {
    headerPath = 'public/video/header.mp4',
    tailPath = 'public/video/tail.mp4',
    audioPath = 'public/audio/Geometry.mp3',
    audioVolume = 0.3,
    skipAudio = false,
    verbose = false,
  } = options;

  // Check if FFmpeg is available
  const ffmpegAvailable = await checkFFmpegAvailable();
  if (!ffmpegAvailable) {
    throw new Error(
      'FFmpeg is not installed or not accessible.\n' +
      'Please install FFmpeg:\n' +
      '  Windows: https://ffmpeg.org/download.html#build-windows\n' +
      '  macOS: brew install ffmpeg\n' +
      '  Linux: sudo apt install ffmpeg\n\n' +
      'Or use --skip-audio to skip post-processing.'
    );
  }

  // Verify all input files exist
  const filesToCheck = [
    { path: headerPath, name: 'Header video' },
    { path: mainVideoPath, name: 'Main video' },
    { path: tailPath, name: 'Tail video' },
  ];

  if (!skipAudio) {
    filesToCheck.push({ path: audioPath, name: 'Background audio' });
  }

  for (const file of filesToCheck) {
    if (!fs.existsSync(file.path)) {
      throw new Error(`${file.name} not found: ${file.path}`);
    }
  }

  // Create temporary directory for intermediate files
  const outputDir = path.dirname(finalOutputPath);
  const tmpDir = path.join(outputDir, '.tmp');

  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  try {
    // Step 1: Concatenate videos (header + main + tail)
    if (verbose) {
      console.log('Step 1: Concatenating videos...\n');
    }

    const concatenatedVideo = path.join(tmpDir, `concatenated-${Date.now()}.mp4`);
    await concatenateVideos(headerPath, mainVideoPath, tailPath, concatenatedVideo, verbose);

    if (verbose) {
      console.log('✓ Videos concatenated successfully\n');
    } else {
      console.log('✓ Videos concatenated');
    }

    // Step 2: Add background music (if not skipped)
    if (skipAudio) {
      // Just move concatenated video to final output
      if (fs.existsSync(finalOutputPath)) {
        fs.unlinkSync(finalOutputPath);
      }
      fs.renameSync(concatenatedVideo, finalOutputPath);

      if (verbose) {
        console.log('Skipped adding background music\n');
      }

      return finalOutputPath;
    }

    if (verbose) {
      console.log('Step 2: Adding background music...\n');
    }

    try {
      // Add background music to concatenated video, output to a temp file first
      const tempOutput = path.join(tmpDir, `final-${Date.now()}.mp4`);

      // Resolve all paths to absolute paths
      const absoluteConcatenatedVideo = path.resolve(concatenatedVideo);
      const absoluteAudioPath = path.resolve(audioPath);
      const absoluteTempOutput = path.resolve(tempOutput);

      // Verify concatenated video exists before adding audio
      if (!fs.existsSync(absoluteConcatenatedVideo)) {
        throw new Error(`Concatenated video not found: ${absoluteConcatenatedVideo}`);
      }

      if (verbose) {
        console.log('File paths for audio mixing:');
        console.log(`  Concatenated video: ${absoluteConcatenatedVideo}`);
        console.log(`  Audio source: ${absoluteAudioPath}`);
        console.log(`  Temp output: ${absoluteTempOutput}`);
        console.log(`  Concatenated exists: ${fs.existsSync(absoluteConcatenatedVideo)}`);
        console.log(`  Audio exists: ${fs.existsSync(absoluteAudioPath)}\n`);
      }

      await addBackgroundMusic(absoluteConcatenatedVideo, absoluteAudioPath, absoluteTempOutput, {
        audioVolume,
        loopAudio: true,
        verbose,
      });

      // If audio mixing succeeded, move temp file to final output
      const absoluteFinalOutput = path.resolve(finalOutputPath);
      if (fs.existsSync(absoluteFinalOutput)) {
        fs.unlinkSync(absoluteFinalOutput);
      }
      fs.renameSync(absoluteTempOutput, absoluteFinalOutput);

      if (verbose) {
        console.log('✓ Background music added successfully\n');
      } else {
        console.log('✓ Background music added');
      }
    } catch (audioError) {
      // Audio mixing failed, but we have the concatenated video
      console.log();
      console.error(chalk.yellow('⚠ Background music addition failed'));
      console.error(chalk.yellow(`  ${audioError.message}`));
      console.log();
      console.log(chalk.gray('Falling back to concatenated video without background music...'));

      // Move concatenated video to final output
      if (fs.existsSync(finalOutputPath)) {
        fs.unlinkSync(finalOutputPath);
      }
      fs.renameSync(concatenatedVideo, finalOutputPath);

      console.log(chalk.gray('✓ Video saved without background music'));
      console.log();
      console.log(chalk.gray('Tip: The video still has header + main content + tail'));
      console.log(chalk.gray('Tip: Use --skip-audio to skip audio processing in future'));
    }

    // Clean up intermediate file
    try {
      if (fs.existsSync(concatenatedVideo)) {
        fs.unlinkSync(concatenatedVideo);
      }
    } catch (cleanupError) {
      // Ignore cleanup errors
    }

    // Clean up temp directory if empty
    try {
      const files = fs.readdirSync(tmpDir);
      if (files.length === 0) {
        fs.rmdirSync(tmpDir);
      }
    } catch (e) {
      // Ignore
    }

    return finalOutputPath;

  } catch (error) {
    // Clean up temp directory on error
    try {
      if (fs.existsSync(tmpDir)) {
        const files = fs.readdirSync(tmpDir);
        files.forEach(file => {
          try {
            fs.unlinkSync(path.join(tmpDir, file));
          } catch (e) {
            // Ignore
          }
        });
        fs.rmdirSync(tmpDir);
      }
    } catch (cleanupError) {
      // Ignore cleanup errors
    }

    throw error;
  }
}

module.exports = {
  checkFFmpegAvailable,
  getVideoDuration,
  concatenateVideos,
  addBackgroundMusic,
  processVideo,
};
