# Dockerfile for Frontend
FROM node:14-alpine
WORKDIR /app
RUN npm install -g http-server
COPY public /app/public
EXPOSE 3000
CMD ["http-server", "public", "-p", "3000"]

