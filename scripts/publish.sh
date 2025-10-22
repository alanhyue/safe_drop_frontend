#!/bin/bash
set -e
set -o pipefail

# ===== Config =====
APP_NAME="safedrop-prod"
IMAGE_NAME="safedrop-prod:latest"
TAR_FILE="safedrop-prod.tar"
VPS_USER="heng"
VPS_IP="69.171.74.188"
VPS_PATH="/var/www/safedrop"

timestamp() { echo "[$(date '+%Y-%m-%d %H:%M:%S')]"; }

echo "$(timestamp) === Step 1: Copy Docker image to VPS ==="
if scp build/${TAR_FILE} ${VPS_USER}@${VPS_IP}:${VPS_PATH}/; then
    echo "$(timestamp) ✅ Image copied successfully."
else
    echo "$(timestamp) ❌ Failed to copy image."
    exit 1
fi

echo "$(timestamp) === Step 2: Deploy container on VPS ==="
ssh ${VPS_USER}@${VPS_IP} bash -s << 'EOF'
timestamp() { echo "[$(date '+%Y-%m-%d %H:%M:%S')]"; }

echo "$(timestamp) Removing old Docker image (if exists)..."
if docker rmi -f safedrop-prod:latest &>/dev/null; then
    echo "$(timestamp) ✅ Old image removed."
else
    echo "$(timestamp) ⚠ No old image found or already removed."
fi

echo "$(timestamp) Loading Docker image..."
if docker load -i /var/www/safedrop/safedrop-prod.tar &>/dev/null; then
    echo "$(timestamp) ✅ Image loaded successfully."
else
    echo "$(timestamp) ❌ Failed to load image."
    exit 1
fi

echo "$(timestamp) Stopping existing container (if any)..."
docker stop safedrop-prod &>/dev/null || echo "$(timestamp) ⚠ No running container to stop."

echo "$(timestamp) Removing existing container (if any)..."
docker rm safedrop-prod &>/dev/null || echo "$(timestamp) ⚠ No container to remove."

echo "$(timestamp) Running new container..."
docker run -d \
  --name safedrop-prod \
  -p 3005:80 \
  --restart unless-stopped \
  -e NODE_ENV=production \
  -v /var/www/safedrop/data:/workspace/backend/data \
  -v /var/www/safedrop/logs:/logs \
  safedrop-prod:latest &>/dev/null && echo "$(timestamp) ✅ Container started successfully."

echo "$(timestamp) Deployment complete!"
EOF

echo "$(timestamp) ✅ Remote deployment script finished."
