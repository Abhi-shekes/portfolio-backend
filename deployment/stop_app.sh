#!/bin/bash
set -e
echo "Stopping any running node server processes (if present)..."
pkill -f "node server.js" || true
pkill -f "node .*server.js" || true
# if using pm2, uncomment:
# pm2 stop all || true
