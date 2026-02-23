## ADDED Requirements

### Requirement: Docker Containerized Rendering Environment

The system SHALL provide a Docker containerized rendering environment that encapsulates Node.js, Remotion CLI, FFmpeg, and pre-built node_modules, ensuring consistent rendering across different platforms and immediate container usability.

#### Scenario: Docker image includes all required dependencies

- **GIVEN** the Dockerfile is built with `docker build -t hagicode-renderer:latest`
- **WHEN** the image build completes
- **THEN** Node.js 20.x is installed in the container
- **AND** Remotion CLI 4.0.405 is available via `npx remotion`
- **AND** FFmpeg is installed and accessible
- **AND** project dependencies are installed via `npm ci` into the image
- **AND** node_modules is pre-built and ready for immediate use
- **AND** Chinese fonts (fonts-noto-cjk) are installed for text rendering

#### Scenario: Docker image build uses layer caching for efficiency

- **GIVEN** the Dockerfile with optimized layer order
- **WHEN** the image is built multiple times
- **THEN** package.json changes trigger dependency re-installation
- **AND** source code changes only re-copy the application layer
- **AND** unchanged layers are cached from previous builds
- **AND** build time is significantly reduced for incremental changes

#### Scenario: Docker image size is optimized

- **GIVEN** the .dockerignore file excludes unnecessary files
- **WHEN** the image is built
- **THEN** out/ directory is excluded from the build context
- **AND** .git directory is excluded from the build context
- **AND** final image size is less than 1.5GB

#### Scenario: Container starts immediately with pre-built dependencies

- **GIVEN** the Docker image with pre-built node_modules
- **WHEN** a container is started
- **THEN** node_modules is already available in the container
- **AND** no dependency installation is required at runtime
- **AND** rendering can begin immediately

#### Scenario: Docker image includes ENTRYPOINT script for simplified usage

- **GIVEN** the Dockerfile with ENTRYPOINT configuration
- **WHEN** the image is built
- **THEN** docker_entrypoint.sh is copied to /usr/local/bin/
- **AND** the script is made executable with chmod +x
- **AND** ENTRYPOINT is set to /usr/local/bin/docker_entrypoint.sh
- **AND** users can run containers without specifying the full node command

---

### Requirement: Docker-Only CLI Support

The system SHALL use Docker containers for all rendering operations, removing dependency on local Node.js and FFmpeg installations.

#### Scenario: Render scripts use Docker by default

- **GIVEN** the render.sh or render.bat script
- **WHEN** executed without any flags
- **THEN** the script checks Docker availability
- **AND** verifies Docker daemon is running
- **AND** runs rendering inside a Docker container
- **AND** mounts the project directory to /workspace in the container

#### Scenario: Docker mode auto-builds image if needed

- **GIVEN** the render.sh or render.bat script
- **WHEN** the hagicode-renderer:latest image does not exist
- **THEN** the script automatically builds the image
- **AND** displays build progress to the user
- **AND** proceeds with rendering after successful build

#### Scenario: Docker mode skips build if image exists

- **GIVEN** the render.sh or render.bat script
- **WHEN** the hagicode-renderer:latest image already exists
- **THEN** the script skips the build step
- **AND** proceeds directly to container rendering
- **AND** container startup takes less than 2 seconds

#### Scenario: Docker mode mounts volumes correctly

- **GIVEN** the render.sh or render.bat script
- **WHEN** the container is started
- **THEN** the current working directory is mounted to /workspace
- **AND** input YAML files are accessible from the container
- **AND** output video files are written to the host's out/ directory
- **AND** file changes on the host are visible inside the container

#### Scenario: Docker mode preserves all CLI arguments

- **GIVEN** the render.sh or render.bat script
- **WHEN** additional arguments are provided (e.g., --output, --verbose, --composition)
- **THEN** all arguments are passed through to the containerized render-cli.js
- **AND** the rendering behavior is consistent across all platforms
- **AND** output paths are resolved correctly relative to the mounted volume

#### Scenario: Docker command is simplified through ENTRYPOINT

- **GIVEN** the Docker image with docker_entrypoint.sh configured as ENTRYPOINT
- **WHEN** a user runs `docker run --rm -v "${PWD}:/workspace" hagicode-renderer:latest data.yaml`
- **THEN** the container automatically executes the render-cli.js script
- **AND** the user does not need to specify the full command `node scripts/render-cli.js`
- **AND** the user does not need to specify the working directory `-w /workspace`
- **AND** all additional arguments are properly passed through

#### Scenario: Docker ENTRYPOINT provides help when no arguments

- **GIVEN** the Docker image with docker_entrypoint.sh
- **WHEN** a user runs `docker run --rm hagicode-renderer:latest` without arguments
- **THEN** the entrypoint script displays usage information
- **AND** shows example commands
- **AND** exits with error code 1

---

### Requirement: Docker Environment Validation

The system SHALL validate Docker environment prerequisites before attempting containerized rendering and provide clear error messages for common issues.

#### Scenario: Docker not installed is detected

- **GIVEN** the render.sh or render.bat script
- **WHEN** Docker is not installed on the host system
- **THEN** the script displays "Error: Docker is not installed or not in PATH"
- **AND** provides platform-specific installation links (Windows/macOS/Linux)
- **AND** exits with error code 1

#### Scenario: Docker daemon not running is detected

- **GIVEN** the render.sh or render.bat script
- **WHEN** Docker is installed but the daemon is not running
- **THEN** the script displays "Error: Docker daemon is not running"
- **AND** provides instructions to start Docker (Docker Desktop, systemctl)
- **AND** exits with error code 1

#### Scenario: Docker build failures are reported clearly

- **GIVEN** the render.sh or render.bat script
- **WHEN** the Docker image build fails
- **THEN** the script displays the full build error log
- **AND** lists common causes (network issues, dependency conflicts, disk space)
- **AND** provides a link to troubleshooting documentation
- **AND** exits with error code 1

#### Scenario: Volume mount failures are handled

- **GIVEN** the render.sh or render.bat script
- **WHEN** volume mount fails (e.g., permission issues on Linux/macOS)
- **THEN** the script displays "Error: Failed to mount project directory"
- **AND** provides platform-specific permission fixes (chmod, chown)
- **AND** suggests checking Docker Desktop file sharing settings on Windows
- **AND** exits with error code 1

---

---

### Requirement: Docker Rendering Documentation

The system SHALL provide comprehensive documentation for Docker-based rendering, including setup instructions, usage examples, and troubleshooting guides.

#### Scenario: README-DOCKER.md explains Docker prerequisites

- **GIVEN** the README-DOCKER.md file
- **WHEN** a new user reads the documentation
- **THEN** it lists Docker version requirements (20.10+ or Docker Desktop 4.0+)
- **AND** it provides installation links for Windows/macOS/Linux
- **AND** it explains WSL2 backend recommendation for Windows
- **AND** it describes disk space requirements (5GB+)

#### Scenario: README-DOCKER.md provides quick start guide

- **GIVEN** the README-DOCKER.md file
- **WHEN** a user wants to get started quickly
- **THEN** it shows the one-time image build command
- **AND** it shows the basic rendering command
- **AND** it provides examples with custom output paths and compositions
- **AND** it explains how to use docker run directly

#### Scenario: README-DOCKER.md explains pre-built dependencies

- **GIVEN** the README-DOCKER.md file
- **WHEN** a user reads about the Docker image
- **THEN** it explains node_modules is pre-built in the image
- **AND** it clarifies container starts immediately without dependency installation
- **AND** it explains all FFmpeg processing happens in the container

#### Scenario: README-DOCKER.md includes troubleshooting section

- **GIVEN** the README-DOCKER.md file
- **WHEN** a user encounters Docker issues
- **THEN** it documents common errors (Docker not running, build failures, permissions)
- **AND** it provides platform-specific solutions for each error
- **AND** it includes links to Docker official documentation
- **AND** it suggests checking Docker status and logs

#### Scenario: README-DOCKER.md documents performance characteristics

- **GIVEN** the README-DOCKER.md file
- **WHEN** a user wants to understand performance implications
- **THEN** it shows benchmark results for Docker rendering
- **AND** it explains first-time build overhead (3-5 minutes)
- **AND** it explains container startup overhead (< 2 seconds)
- **AND** it provides resource limit examples (--cpus, --memory)

#### Scenario: README-DOCKER.md includes Windows-specific guidance

- **GIVEN** the README-DOCKER.md file on Windows
- **WHEN** a Windows user reads the documentation
- **THEN** it recommends WSL2 backend over Hyper-V
- **AND** it explains Docker Desktop file sharing configuration
- **AND** it provides performance optimization tips for Windows
- **AND** it documents known Windows-specific issues

---

### Requirement: Docker Compose Integration

The system SHALL provide an optional docker-compose.yml file to simplify container management and enable advanced Docker features.

#### Scenario: docker-compose.yml provides one-command rendering

- **GIVEN** the docker-compose.yml file
- **WHEN** a user executes `docker-compose run renderer node scripts/render-cli.js data.yaml`
- **THEN** the container is built if needed
- **AND** the project directory is automatically mounted
- **AND** the rendering command is executed inside the container
- **AND** the container is automatically cleaned up after completion

#### Scenario: docker-compose.yml includes resource limit examples

- **GIVEN** the docker-compose.yml file
- **WHEN** a user wants to limit container resource usage
- **THEN** the file includes commented-out resource limit examples
- **AND** it shows how to set CPU limits (--cpus)
- **AND** it shows how to set memory limits (--memory)
- **AND** it explains how to activate the limits (uncomment or override)

#### Scenario: docker-compose.yml is optional

- **GIVEN** the Docker-based rendering system
- **WHEN** a user prefers direct docker run commands
- **THEN** docker-compose.yml is not required for basic usage
- **AND** render.sh and render.bat work without docker-compose installed
- **AND** documentation clarifies that docker-compose is optional

---

## MODIFIED Requirements

### Requirement: CLI Entry Point

The system SHALL provide a command-line interface script that accepts YAML configuration files as input and triggers video rendering using Docker containers.

#### Scenario: CLI script accepts configuration file path

- **GIVEN** the CLI script `render.sh` or `render.bat` is executed
- **WHEN** a valid YAML file path is provided
- **THEN** the script validates Docker environment
- **AND** runs rendering inside a Docker container
- **AND** mounts the project directory to the container
- **AND** proceeds to render the video using containerized dependencies

#### Scenario: CLI script validates required arguments

- **GIVEN** the CLI script is executed without required arguments
- **WHEN** the `--config` flag (or positional argument) is missing
- **THEN** the script displays usage instructions
- **AND** shows Docker rendering examples
- **AND** exits with error code 1

#### Scenario: CLI script supports optional output path

- **GIVEN** the CLI script is executed with `--output` flag
- **WHEN** a custom output path is specified
- **THEN** the rendered video is saved to the mounted volume
- **AND** parent directories are created if needed

#### Scenario: CLI script provides verbose logging

- **GIVEN** the CLI script is executed with `--verbose` flag
- **WHEN** rendering is in progress
- **THEN** detailed logging is displayed from container
- **AND** logging includes Docker build progress and container status

