# Stage 1: Build the frontend
FROM node:22-alpine AS build
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ ./
RUN npm run build
# CMD ["tail", "-f", "/dev/null"]

# Stage 2: Serve the frontend with Nginx
FROM nginx:alpine
COPY ./containers/frontend/app.conf /etc/nginx/conf.d/
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
