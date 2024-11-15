# Stage 1: Build the frontend
FROM node:22-alpine AS build
WORKDIR /app
# COPY ./frontend/package*.json ./
COPY ./frontend/ ./
RUN npm install
RUN npm run build

# Stage 2: Serve the frontend with Nginx
FROM nginx:alpine
COPY ./containers/frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
