
# stage 1

FROM node:alpine AS testdemoproject
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=testdemoproject /app/dist/testdemoproject /usr/share/nginx/html
EXPOSE 80