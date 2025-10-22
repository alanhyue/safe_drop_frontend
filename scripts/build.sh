#!/usr/bin/env bash
set -e
set -o pipefail

APP_NAME="safedrop-prod-front"
IMAGE_NAME="${APP_NAME}:latest"
TAR_FILE="${APP_NAME}.tar"
BUILD_DIR="build"
PLATFORM="linux/amd64"  # Force AMD64 build

mkdir -p "${BUILD_DIR}"

echo "========================================"
echo " Building ${APP_NAME} (prod runtime only)"
echo " Platform: ${PLATFORM}"
echo "========================================"

# Ensure build artifacts exist
if [ ! -d "frontend/.next/standalone" ]; then
  echo "❌ Error: .next/standalone not found. Please build inside your dev container first."
  exit 1
fi

# Ensure buildx is initialized
if ! docker buildx inspect default >/dev/null 2>&1; then
    echo "⚠ buildx builder not found. Creating one..."
    docker buildx create --use --name default
fi

# Build minimal runtime image using buildx for AMD64
docker buildx build \
    --platform "${PLATFORM}" \
    -t "${IMAGE_NAME}" \
    -f Dockerfile.prod \
    . \
    --load

# Save the image to tar
echo "Saving image to ${BUILD_DIR}/${TAR_FILE}..."
docker save -o "${BUILD_DIR}/${TAR_FILE}" "${IMAGE_NAME}"

echo "✅ Done! Built and saved ${IMAGE_NAME} for ${PLATFORM}"
