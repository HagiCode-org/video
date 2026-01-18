# Hagicode Video Renderer - Docker Image
# This Dockerfile creates a containerized environment for Remotion video rendering
# Base image: Node.js 20 LTS on Debian with Huawei Cloud mirrors for China

# ========== Base Image ==========
# Using Node.js 20 LTS on Debian Bullseye (full, not slim) for better font support
# Full Debian image includes more fonts and better emoji support
FROM node:20-bullseye

# Set working directory
WORKDIR /workspace

# ========== System Dependencies ==========
# Configure Debian mirrors for faster downloads in China
# Using Huawei Cloud mirrors for apt packages
RUN sed -i 's/deb.debian.org/mirrors.huaweicloud.com/g' /etc/apt/sources.list && \
    sed -i 's/security.debian.org/mirrors.huaweicloud.com/g' /etc/apt/sources.list

# Install FFmpeg, fonts, and Chrome dependencies for Remotion
# Chrome dependencies are required for Puppeteer/Chromium used by Remotion
RUN apt-get update && \
    apt-get install -y \
        # FFmpeg and fonts
        ffmpeg \
        fonts-liberation \
        fonts-noto-cjk \
        # Additional fonts for better emoji and unicode support
        fonts-noto-color-emoji \
        fonts-symbola \
        fonts-wqy-zenhei \
        # Chrome/Chromium dependencies for Remotion
        libnss3 \
        libdbus-1-3 \
        libatk1.0-0 \
        libgbm1 \
        libasound2 \
        libxrandr2 \
        libxkbcommon0 \
        libxfixes3 \
        libxcomposite1 \
        libxdamage1 \
        libatk-bridge2.0-0 \
        libpango-1.0-0 \
        libcairo2 \
        libcups2 \
        libxshmfence1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ========== Node.js Dependencies ==========
# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Configure npm to use Taobao registry for faster downloads in China
RUN npm config set registry https://registry.npmmirror.com

RUN npm i -g npm@latest

# Install dependencies using npm install to auto-detect platform
# This ensures the correct platform-specific binaries are installed
RUN npm ci

# Install Chrome browser for Remotion
RUN npx remotion browser ensure

# Reset npm registry to default (optional, for consistency)
RUN npm config set registry https://registry.npmjs.org

# ========== Source Code ==========
# Copy project source code
# Note: .dockerignore excludes unnecessary files (including node_modules)
COPY . .

# ========== Entrypoint Script ==========
# Copy and configure the entrypoint script
COPY docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod +x /usr/local/bin/docker_entrypoint.sh

# ========== Verification ==========
# Verify Remotion CLI is available (using 'versions' command)
RUN npx remotion versions || true

# Verify FFmpeg is available
RUN ffmpeg -version | head -n 1

# ========== Entrypoint ==========
# Set the entrypoint to simplify command execution
# Users can now run: docker run hagicode-renderer data.yaml
# Instead of: docker run hagicode-renderer node scripts/render-cli.js data.yaml
ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]

# Default working directory
WORKDIR /workspace
