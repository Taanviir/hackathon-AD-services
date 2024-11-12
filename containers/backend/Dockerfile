# Use official Python image
FROM python:3.12-alpine

# Set environment variable for Django settings
ENV PYTHONUNBUFFERED 1
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

WORKDIR /app/backend

# Install system dependencies required for spaCy and building packages
RUN apk update && \
    apk add --no-cache gcc g++ musl-dev libffi-dev

# Install dependencies
COPY requirements.txt ./
RUN pip install --root-user-action=ignore --no-cache-dir -r requirements.txt

# Download spaCy model
RUN python -m spacy download en_core_web_sm

EXPOSE 8000

# Use entrypoint script to handle migrations and start server
ENTRYPOINT ["sh", "/app/entrypoint.sh"]

# Run Django's development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
