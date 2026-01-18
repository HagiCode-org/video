#!/bin/bash
# Hagicode Video Renderer - Unix/Linux Entry Point
# This script provides a user-friendly interface for rendering videos via Docker

# Chalk for colored console output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
GRAY='\033[0;90m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

IMAGE_NAME="hagicode-renderer:latest"
REBUILD=false
RENDER_ARGS=()
BUILD_ARGS=()

# Parse arguments for --no-cache flag
while [[ $# -gt 0 ]]; do
    case $1 in
        --no-cache)
            REBUILD=true
            BUILD_ARGS+=("--no-cache")
            shift
            ;;
        *)
            RENDER_ARGS+=("$1")
            shift
            ;;
    esac
done

# Print banner
print_banner() {
    echo -e "${CYAN}🎬 Hagicode Video Renderer${NC}"
    echo -e "${GRAY}Docker-enabled rendering environment${NC}"
    echo ""
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_banner
    echo -e "${RED}❌ Error: Docker is not installed or not in PATH${NC}"
    echo ""
    echo "To use this renderer, please install Docker:"
    echo "  - Linux: https://docs.docker.com/engine/install/"
    echo "  - macOS: https://docs.docker.com/desktop/install/mac-install/"
    echo ""
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    print_banner
    echo -e "${RED}❌ Error: Docker daemon is not running${NC}"
    echo ""
    echo "Please start Docker:"
    echo "  - Linux: sudo systemctl start docker"
    echo "  - macOS: Open Docker Desktop from Applications"
    echo ""
    exit 1
fi

# Check if image exists, build if not or --no-cache is specified
if ! docker image inspect "${IMAGE_NAME}" &> /dev/null; then
    REBUILD=true
fi

if [ "$REBUILD" = true ]; then
    print_banner
    if [ "$REBUILD" = true ] && [ "${#BUILD_ARGS[@]}" -gt 0 ]; then
        echo -e "${YELLOW}Building Docker image with --no-cache flag (this may take 3-5 minutes)...${NC}"
    else
        echo -e "${YELLOW}Docker image not found. Building image (this may take 3-5 minutes)...${NC}"
    fi
    echo ""

    # Build the image
    if docker build "${BUILD_ARGS[@]}" -t "${IMAGE_NAME}" .; then
        echo ""
        echo -e "${GREEN}✓ Docker image built successfully${NC}"
        echo ""
    else
        echo ""
        echo -e "${RED}❌ Failed to build Docker image${NC}"
        echo ""
        echo "Possible causes:"
        echo "  1. Network issues: Check your internet connection"
        echo "  2. Dependency conflicts: Check package.json for errors"
        echo "  3. Disk space: Ensure at least 5GB free space"
        echo ""
        exit 1
    fi
fi

# Run the container with the simplified command (using ENTRYPOINT)
# Note: We only mount public/data (input) and out (output) directories
# Source code is already baked into the Docker image
docker run --rm \
    -v "${PWD}/public/data:/workspace/public/data" \
    -v "${PWD}/public/audio:/workspace/public/audio" \
    -v "${PWD}/public/video:/workspace/public/video" \
    -v "${PWD}/out:/workspace/out" \
    "${IMAGE_NAME}" \
    "${RENDER_ARGS[@]}"

# Exit with the Docker container's exit code
exit $?
