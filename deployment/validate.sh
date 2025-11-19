#!/bin/bash
set -e

# Change port if your app uses a different one
PORT=3000

# Try health endpoint first, then root
echo "Validating service..."
curl -sS -f "http://localhost:${PORT}/api/health" >/dev/null 2>&1 && exit 0
curl -sS -f "http://localhost:${PORT}/" >/dev/null 2>&1 && exit 0

echo "Validation failed: service not responding on port ${PORT}"
exit 1
