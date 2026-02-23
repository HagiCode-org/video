@echo off
REM Hagicode Video Renderer - Windows Entry Point
REM This script provides a user-friendly interface for rendering videos via Docker

setlocal enabledelayedexpansion

set IMAGE_NAME=hagicode-renderer:latest
set REBUILD=0

REM Parse arguments for --no-cache flag
set RENDER_ARGS=
set BUILD_ARGS=
:parse_args
if "%~1"=="--no-cache" (
    set REBUILD=1
    set BUILD_ARGS=!BUILD_ARGS! --no-cache
    shift
    goto :parse_args
)
if not "%~1"=="" (
    set RENDER_ARGS=!RENDER_ARGS! %~1
    shift
    goto :parse_args
)

REM Print banner
echo.
echo [Hagicode Video Renderer]
echo Docker-enabled rendering environment
echo.

REM Check if Docker is installed
where docker >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [ERROR] Docker is not installed or not in PATH
    echo.
    echo To use this renderer, please install Docker:
    echo   - Windows: https://docs.docker.com/desktop/install/windows-install/
    echo.
    exit /b 1
)

REM Check if Docker daemon is running
docker info >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    echo [ERROR] Docker daemon is not running
    echo.
    echo Please start Docker Desktop from the Start Menu
    echo.
    exit /b 1
)

REM Check if image exists, build if not or --no-cache is specified
docker image inspect %IMAGE_NAME% >nul 2>&1
if !ERRORLEVEL! NEQ 0 (
    set REBUILD=1
)

if !REBUILD!==1 (
    echo [INFO] Building Docker image ^(this may take 3-5 minutes^)...
    if "!BUILD_ARGS!"=="--no-cache" (
        echo [INFO] Using --no-cache flag, rebuilding all layers...
    )
    echo.

    REM Build the image
    docker build !BUILD_ARGS! -t %IMAGE_NAME% .
    if !ERRORLEVEL! NEQ 0 (
        echo.
        echo [ERROR] Failed to build Docker image
        echo.
        echo Possible causes:
        echo   1. Network issues: Check your internet connection
        echo   2. Dependency conflicts: Check package.json for errors
        echo   3. Disk space: Ensure at least 5GB free space
        echo.
        exit /b 1
    )

    echo.
    echo [SUCCESS] Docker image built successfully
    echo.
)

REM Run the container with the simplified command (using ENTRYPOINT)
REM Note: We only mount public/data (input) and out (output) directories
REM Source code is already baked into the Docker image
docker run --rm ^
  -v "%CD%\public\data:/workspace/public/data" ^
  -v "%CD%\public\audio:/workspace/public/audio" ^
  -v "%CD%\public\video:/workspace/public/video" ^
  -v "%CD%\out:/workspace/out" ^
  %IMAGE_NAME% !RENDER_ARGS!

REM Exit with the Docker container's exit code
exit /b !ERRORLEVEL!
