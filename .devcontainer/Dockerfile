# Use official Python 3.11 slim image as base
FROM python:3.11-slim

# Install system dependencies: Node.js, npm, git, curl, build tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl gnupg lsb-release \
    git build-essential bash \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt /workspace/backend/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r /workspace/backend/requirements.txt

# Copy frontend package files and install Node dependencies
COPY frontend/package*.json /workspace/frontend/
RUN cd /workspace/frontend && npm install

# Expose backend and frontend ports
EXPOSE 3000

# Default command: start backend and frontend in dev mode
# CMD ["sh", "-c", "uvicorn backend.app.main:app --host 0.0.0.0 --port 5000 --reload & cd frontend && npm run dev"]
