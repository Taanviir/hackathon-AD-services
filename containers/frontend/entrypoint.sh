#!/bin/sh

# Navigate to /app/frontend to install dependencies
echo "Navigating to /app/frontend..."
cd /app/frontend

# Check if package.json exists in /app/frontend
if [ ! -f "package.json" ]; then
    echo "package.json not found in /app/frontend. Are you in the correct folder?"
    exit 1
fi

# Check for package-lock.json and decide whether to use npm ci or npm install
if [ -f "package-lock.json" ]; then
    echo "package-lock.json found. Installing dependencies with npm ci..."
    npm ci
else
    echo "package-lock.json not found. Installing dependencies with npm install..."
    npm install
fi

# Start the React app
echo "Starting the React app..."
npm start
