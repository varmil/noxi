-- DropTable
DROP TABLE "YoutubeStreamChatCount";

-- CreateTable
CREATE TABLE "YoutubeStreamChatCount" (
    "id" BIGSERIAL NOT NULL,
    "videoId" TEXT NOT NULL,
    "all" INTEGER NOT NULL DEFAULT 0,
    "member" INTEGER NOT NULL DEFAULT 0,
    "nextPageToken" TEXT,
    "latestPublishedAt" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamChatCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "YoutubeStreamChatCount_videoId_createdAt_idx" ON "YoutubeStreamChatCount"("videoId", "createdAt");
