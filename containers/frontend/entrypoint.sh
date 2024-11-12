#!/bin/sh

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm could not be found, please install Node.js and npm first."
    exit 1
fi

# Check if package.json exists in /app/frontend
if [ ! -f "/app/frontend/package.json" ]; then
    echo "package.json not found in /app/frontend. Are you in the correct folder?"
    exit 1
fi

# Navigate to /app/frontend to install dependencies
echo "Navigating to /app/frontend..."
cd /app/frontend

# Install dependencies
echo "Installing dependencies in /app/frontend..."
npm --loglevel verbose install

# Start the React app
echo "Starting the React app..."
npm start
