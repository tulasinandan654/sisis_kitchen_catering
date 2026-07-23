#!/bin/bash

# Sisi's Kitchen Deployment Script
# This script builds and deploys the application to a server

set -e

echo "=========================================="
echo "Sisi's Kitchen Catering - Deployment"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="sisis-kitchen"
DEPLOY_DIR="/var/www/$PROJECT_NAME"
BACKUP_DIR="/var/backups/$PROJECT_NAME"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Check if running as root
if [ "$EUID" -ne 0 ]; then
   echo -e "${RED}Error: This script must be run as root${NC}"
   exit 1
fi

echo -e "${BLUE}[1/5] Creating backup...${NC}"
mkdir -p "$BACKUP_DIR"
if [ -d "$DEPLOY_DIR/dist" ]; then
    cp -r "$DEPLOY_DIR/dist" "$BACKUP_DIR/dist_$TIMESTAMP"
    echo -e "${GREEN}✓ Backup created${NC}"
else
    echo -e "${BLUE}→ No previous build to backup${NC}"
fi

echo -e "${BLUE}[2/5] Installing dependencies...${NC}"
cd "$DEPLOY_DIR"
npm install --production
echo -e "${GREEN}✓ Dependencies installed${NC}"

echo -e "${BLUE}[3/5] Building application...${NC}"
npm run build
echo -e "${GREEN}✓ Build completed${NC}"

echo -e "${BLUE}[4/5] Verifying build...${NC}"
if [ ! -d "$DEPLOY_DIR/dist" ]; then
    echo -e "${RED}Error: Build directory not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build verified${NC}"

echo -e "${BLUE}[5/5] Reloading Nginx...${NC}"
nginx -t > /dev/null 2>&1
if [ $? -eq 0 ]; then
    systemctl reload nginx
    echo -e "${GREEN}✓ Nginx reloaded${NC}"
else
    echo -e "${RED}Error: Nginx configuration is invalid${NC}"
    exit 1
fi

echo -e "${GREEN}=========================================="
echo "Deployment completed successfully!"
echo "=========================================="
echo -e "Timestamp: $TIMESTAMP${NC}"
