#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Run formatter
black .

# Run migrations
echo "Running database migrations..."
python manage.py makemigrations em_auth opinion_requests
python manage.py migrate

# Start the Django server
echo "Starting Django server..."

sh ./create_test_users.sh

python manage.py runserver "0.0.0.0:8000"
