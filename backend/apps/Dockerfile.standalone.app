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

FROM node:24-slim AS deps
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app/backend
COPY ./package*.json ./
COPY ./prisma/schema ./prisma/schema
RUN npm i --production=false


# build the app
FROM node:24-slim AS builder
ARG BUILD_CMD
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app/backend
COPY . .
COPY --from=deps /app/backend/node_modules ./node_modules
COPY --from=deps /app/backend/prisma/generated/client ./prisma/generated/client
RUN $BUILD_CMD && npm prune --production


# Production image, copy all the files and start
# NOTE: Batch > Image Streamingを使う場合 cd /app/backend を入れないと
# ENTRYPOINTに対するWORKDIRが無視されるのでエラーになる
FROM node:24-slim AS runner
ARG START_CMD
ENV NODE_ENV production
ENV ENV_START_CMD $START_CMD
RUN apt-get update -y && apt-get install -y openssl
RUN npm config set update-notifier false
WORKDIR /app/backend
COPY --from=builder /app/backend/scripts ./scripts
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/prisma/generated/client ./prisma/generated/client
COPY --from=builder /app/backend/package.json ./package.json
ENTRYPOINT ["sh", "-c", "cd /app/backend && $ENV_START_CMD"]
