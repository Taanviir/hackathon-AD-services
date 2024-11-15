# Use official Node.js image
FROM node:22-alpine

COPY entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

WORKDIR /app/frontend

EXPOSE 3000

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
