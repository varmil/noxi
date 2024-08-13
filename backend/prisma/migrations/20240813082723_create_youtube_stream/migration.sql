-- CreateTable
CREATE TABLE "YoutubeStream" (
    "videoId" TEXT NOT NULL,
    "publishedAt" TIMESTAMPTZ(3) NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnails" JSONB NOT NULL,
    "tags" TEXT[],
    "categoryId" SMALLINT NOT NULL,
    "defaultLanguage" TEXT,
    "duration" TEXT,
    "scheduledStartTime" TIMESTAMPTZ(3) NOT NULL,
    "actualStartTime" TIMESTAMPTZ(3),
    "actualEndTime" TIMESTAMPTZ(3),
    "maxViewerCount" INTEGER NOT NULL DEFAULT 0,
    "chatCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStream_pkey" PRIMARY KEY ("videoId")
);

-- CreateIndex
CREATE INDEX "YoutubeStream_channelId_idx" ON "YoutubeStream"("channelId");

-- CreateIndex
CREATE INDEX "YoutubeStream_status_idx" ON "YoutubeStream"("status");
