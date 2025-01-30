
ARG NODE_VERSION=23
ARG PROJECT="frontend"
ARG PORT=3000

# Alpine image
FROM node:${NODE_VERSION}-alpine AS base
RUN apk update
RUN apk add --no-cache gcompat

# Setup pnpm and turbo on the alpine base
RUN npm install pnpm turbo --global
RUN pnpm config set store-dir ~/.pnpm-store

# Prune projects
FROM base AS pruner
ARG PROJECT

WORKDIR /app
COPY . .
RUN turbo prune --scope=${PROJECT} --docker

# Build the project
FROM base AS builder
ARG PROJECT

WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

# First install dependencies
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Copy source code
COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=${PROJECT}
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src



# Final image
FROM nginx:alpine AS runner
ARG PORT=80

# Copy the built application from the builder stage
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

# Add custom nginx config to handle SPA routing
RUN echo $'\
server { \n\
    listen 80; \n\
    location / { \n\
        root /usr/share/nginx/html; \n\
        index index.html index.htm; \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]

# build command from the root directory of the monorepo

# 1. Build the image (current command)
# sudo docker build -t inventory-ui -f apps/frontend/Dockerfile .

# 2. Run the container
# sudo docker run -d \
#   --name inventory-frontend \
#   -p 3000:80 \
#   inventory-ui

# 3. Verify container is running
# sudo docker ps

# 4. Check logs if needed
# sudo docker logs inventory-frontend

# 5. Access the application
# Open browser at http://localhost:3000

# 6. Stop and remove the container
# sudo docker stop inventory-frontend
# sudo docker rm inventory-frontend
