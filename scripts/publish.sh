#!/usr/bin/env bash
set -e
set -o pipefail

# ===== Config =====
APP_NAME="safedrop-prod-front"
IMAGE_NAME="${APP_NAME}:latest"
TAR_FILE="${APP_NAME}.tar"
VPS_USER="heng"
VPS_IP="69.171.74.188"
VPS_PATH="/var/www/safedrop"
CONTAINER_NAME="${APP_NAME}"
FRONTEND_PORT=3005   # <--- change this if you want to run frontend on a different port

timestamp() { echo "[$(date '+%Y-%m-%d %H:%M:%S')]"; }

echo "$(timestamp) === Step 1: Copy Docker image to VPS ==="
if scp "build/${TAR_FILE}" "${VPS_USER}@${VPS_IP}:${VPS_PATH}/"; then
    echo "$(timestamp) ✅ Image copied successfully."
else
    echo "$(timestamp) ❌ Failed to copy image."
    exit 1
fi

echo "$(timestamp) === Step 2: Deploy frontend container on VPS ==="
ssh "${VPS_USER}@${VPS_IP}" bash -s <<EOF
set -e
timestamp() { echo "[\$(date '+%Y-%m-%d %H:%M:%S')]"; }

echo "\$(timestamp) Removing old Docker image (if exists)..."
docker rmi -f ${IMAGE_NAME} >/dev/null 2>&1 || true

echo "\$(timestamp) Loading new Docker image..."
docker load -i ${VPS_PATH}/${TAR_FILE} >/dev/null

echo "\$(timestamp) Stopping existing container (if any)..."
docker stop ${CONTAINER_NAME} >/dev/null 2>&1 || true

echo "\$(timestamp) Removing old container (if any)..."
docker rm ${CONTAINER_NAME} >/dev/null 2>&1 || true

echo "\$(timestamp) Running new container..."
docker run -d \
  --name ${CONTAINER_NAME} \
  -p ${FRONTEND_PORT}:80 \
  --restart unless-stopped \
  -e NODE_ENV=production \
  ${IMAGE_NAME} >/dev/null

echo "\$(timestamp) ✅ Frontend container deployed and running on port ${FRONTEND_PORT}."
EOF

echo "$(timestamp) ✅ Remote deployment finished successfully."
