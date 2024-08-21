-- CreateTable
CREATE TABLE "YoutubeStreamViewerCount" (
    "videoId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamViewerCount_pkey" PRIMARY KEY ("videoId")
);

-- CreateTable
CREATE TABLE "YoutubeStreamChatCount" (
    "videoId" TEXT NOT NULL,
    "all" INTEGER NOT NULL DEFAULT 0,
    "member" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamChatCount_pkey" PRIMARY KEY ("videoId")
);

-- CreateIndex
CREATE INDEX "YoutubeStreamViewerCount_videoId_createdAt_idx" ON "YoutubeStreamViewerCount"("videoId", "createdAt");

-- CreateIndex
CREATE INDEX "YoutubeStreamChatCount_videoId_createdAt_idx" ON "YoutubeStreamChatCount"("videoId", "createdAt");
