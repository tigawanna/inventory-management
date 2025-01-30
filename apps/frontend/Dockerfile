
ARG NODE_VERSION=23
ARG PROJECT="frontend"
ARG PORT=5000

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
# FROM node:${NODE_VERSION}-alpine AS runner
# ARG PROJECT
# ARG PORT

# # Install only needed dependencies
# RUN apk add --no-cache gcompat

# # Create non-root user
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nodejs
# USER nodejs

# WORKDIR /app
# COPY --from=builder --chown=nodejs:nodejs /app .
# WORKDIR /app/apps/${PROJECT}

# ENV PORT=${PORT}
# ENV NODE_ENV=production
# EXPOSE ${PORT}

# CMD ["node", "dist//srcindex.js"]


# # Use an official Nginx image to serve the built application
# FROM nginx:alpine

# # Copy the built application from the build stage
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy custom Nginx configuration if needed
# # COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]


# sudo docker build --no-cache --progress=plain -t inventory-api -f apps/backend/Dockerfile .
# sudo docker build --no-cache --progress=plain -t inventory-ui -f apps/frontend/Dockerfile .
