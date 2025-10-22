#!/usr/bin/env bash
set -e

APP_NAME="safedrop-prod-front"
IMAGE_NAME="${APP_NAME}:latest"
TAR_FILE="${APP_NAME}.tar"
BUILD_DIR="build"

mkdir -p "${BUILD_DIR}"

echo "========================================"
echo " Building ${APP_NAME} (prod runtime only)"
echo "========================================"

# Ensure build artifacts exist
if [ ! -d "frontend/.next/standalone" ]; then
  echo "❌ Error: .next/standalone not found. Please build inside your dev container first."
  exit 1
fi

# Build minimal runtime image
docker build -t "${IMAGE_NAME}" -f Dockerfile.prod .

echo "Saving image to ${BUILD_DIR}/${TAR_FILE}..."
docker save -o "${BUILD_DIR}/${TAR_FILE}" "${IMAGE_NAME}"

echo "✅ Done! Built and saved ${IMAGE_NAME}"
