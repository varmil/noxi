-- CreateTable
CREATE TABLE "YoutubeStreamChatBundleQueue" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamChatBundleQueue_pkey" PRIMARY KEY ("id")
);
