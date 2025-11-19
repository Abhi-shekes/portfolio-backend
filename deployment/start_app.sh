#!/bin/bash
set -e

APP_DIR="/home/ec2-user/myapp"
LOG="$APP_DIR/out.log"

cd $APP_DIR || exit 1

# ensure any previous processes are stopped
pkill -f "node server.js" || true

# If your app reads PORT from env, ensure it's set by systemd or process manager.
# Start the node app in background (simple approach).
nohup node server.js > "$LOG" 2>&1 &

# Optional: write PID for future stop or debugging
echo $! > /tmp/myapp.pid || true

echo "Started node server (logs -> $LOG)"
