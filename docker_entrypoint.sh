#!/bin/bash
# Hagicode Video Renderer - Docker Container Entrypoint
# This script simplifies command execution inside the Docker container
# Users don't need to specify the full node command

# Default data file if no arguments provided
DEFAULT_DATA_FILE="public/data/update-bulletin/maximum-data.yaml"

# If no arguments provided, use default data file
if [ $# -eq 0 ]; then
  exec node /workspace/scripts/render-cli.js "$DEFAULT_DATA_FILE"
fi

# Execute the render script with all provided arguments
# The node_modules are pre-built in the image, so no need to install dependencies
exec node /workspace/scripts/render-cli.js "$@"
