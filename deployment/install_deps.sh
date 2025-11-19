#!/bin/bash
set -e

APP_DIR="/home/ec2-user/myapp"

echo "Installing production dependencies..."
cd $APP_DIR || exit 1

# Unzip if release.zip present (CodeDeploy usually unpacks files, but this ensures)
if [ -f release.zip ]; then
  echo "Unzipping release.zip..."
  unzip -o release.zip -d .
fi

# Install only production dependencies
if [ -f package.json ]; then
  npm ci --only=production
else
  echo "No package.json found in $APP_DIR"
  exit 1
fi

# Fix permissions
chown -R ec2-user:ec2-user $APP_DIR || true
