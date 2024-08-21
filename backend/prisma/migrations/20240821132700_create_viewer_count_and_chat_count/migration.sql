-- CreateTable
CREATE TABLE "YoutubeStreamViewerCount" (
    "id" SERIAL NOT NULL,
    "videoId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamViewerCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YoutubeStreamChatCount" (
    "id" SERIAL NOT NULL,
    "videoId" TEXT NOT NULL,
    "all" INTEGER NOT NULL DEFAULT 0,
    "member" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamChatCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "YoutubeStreamViewerCount_videoId_createdAt_idx" ON "YoutubeStreamViewerCount"("videoId", "createdAt");

-- CreateIndex
CREATE INDEX "YoutubeStreamChatCount_videoId_createdAt_idx" ON "YoutubeStreamChatCount"("videoId", "createdAt");
