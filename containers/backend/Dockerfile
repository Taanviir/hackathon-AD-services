# Use official Python image
FROM python:3.13-slim

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean

# Set environment variable for Django settings
ENV PYTHONUNBUFFERED 1
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

WORKDIR /app/backend

# Install dependencies
COPY requirements.txt ./
RUN pip install --root-user-action=ignore --no-cache-dir -r requirements.txt

EXPOSE 8000

# Use entrypoint script to handle migrations and start server
ENTRYPOINT ["/app/entrypoint.sh"]
