#!/bin/sh

# Navigate to /app/frontend to install dependencies
echo "Navigating to /app/frontend..."
cd /app/frontend

# Check if package.json exists in /app/frontend
if [ ! -f "package.json" ]; then
    echo "package.json not found in /app/frontend. Are you in the correct folder?"
    exit 1
fi

# Install dependencies
echo "Installing dependencies in /app/frontend..."
npm install

# Start the React app
echo "Starting the React app..."
npm start
