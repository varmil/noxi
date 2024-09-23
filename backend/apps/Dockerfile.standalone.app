#
# e.g.
# 
# docker build \
# --build-arg BUILD_CMD="npm run app -- pubsubhubbub build" \
# --build-arg START_CMD="npm run app -- pubsubhubbub prod" \
# -t your-image-name \
# -f ./Dockerfile.standalone.app \
# backend
#

ARG BUILD_CMD
ARG START_CMD

FROM node:20-slim AS deps
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app/backend
COPY ./package*.json ./
COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN npm i --production=false
RUN npx prisma generate


# build the app
FROM node:20-slim AS builder
ARG BUILD_CMD
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app/backend
COPY . .
COPY --from=deps /app/backend/node_modules ./node_modules
RUN $BUILD_CMD && npm prune --production


# Production image, copy all the files and start
FROM node:20-slim AS runner
ARG START_CMD
ENV NODE_ENV production
ENV ENV_START_CMD $START_CMD
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app/backend
COPY --from=builder /app/backend/scripts ./scripts
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package.json ./package.json
ENTRYPOINT ["sh", "-c", "$ENV_START_CMD"]