-- CreateTable
CREATE TABLE "YoutubeStreamSuperChat" (
    "id" BIGSERIAL NOT NULL,
    "videoId" TEXT NOT NULL,
    "amountMicros" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "amountDisplayString" TEXT NOT NULL,
    "userComment" TEXT NOT NULL,
    "tier" INTEGER NOT NULL,
    "group" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamSuperChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YoutubeStreamSuperSticker" (
    "id" BIGSERIAL NOT NULL,
    "videoId" TEXT NOT NULL,
    "amountMicros" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "amountDisplayString" TEXT NOT NULL,
    "stickerId" TEXT NOT NULL,
    "tier" INTEGER NOT NULL,
    "group" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamSuperSticker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "YoutubeStreamSuperChat_videoId_createdAt_idx" ON "YoutubeStreamSuperChat"("videoId", "createdAt");

-- CreateIndex
CREATE INDEX "YoutubeStreamSuperChat_videoId_amountMicros_idx" ON "YoutubeStreamSuperChat"("videoId", "amountMicros");

-- CreateIndex
CREATE INDEX "YoutubeStreamSuperChat_videoId_currency_idx" ON "YoutubeStreamSuperChat"("videoId", "currency");

-- CreateIndex
CREATE INDEX "YoutubeStreamSuperChat_group_createdAt_idx" ON "YoutubeStreamSuperChat"("group", "createdAt");

-- CreateIndex
CREATE INDEX "YoutubeStreamSuperChat_group_amountMicros_createdAt_idx" ON "YoutubeStreamSuperChat"("group", "amountMicros", "createdAt");

-- CreateIndex
CREATE INDEX "YoutubeStreamSuperSticker_videoId_createdAt_idx" ON "YoutubeStreamSuperSticker"("videoId", "createdAt");

-- CreateIndex
CREATE INDEX "YoutubeStreamSuperSticker_videoId_amountMicros_idx" ON "YoutubeStreamSuperSticker"("videoId", "amountMicros");

-- CreateIndex
CREATE INDEX "YoutubeStreamSuperSticker_videoId_currency_idx" ON "YoutubeStreamSuperSticker"("videoId", "currency");

-- CreateIndex
CREATE INDEX "YoutubeStreamSuperSticker_group_createdAt_idx" ON "YoutubeStreamSuperSticker"("group", "createdAt");

-- CreateIndex
CREATE INDEX "YoutubeStreamSuperSticker_group_amountMicros_createdAt_idx" ON "YoutubeStreamSuperSticker"("group", "amountMicros", "createdAt");
