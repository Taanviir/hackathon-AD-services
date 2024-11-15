#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Run formatter
black .

# Run migrations
echo "Running database migrations..."
python manage.py makemigrations
python manage.py migrate
pip freeze > requirements.txt

# Start the Django server
echo "Starting Django server..."
exec "$@"
