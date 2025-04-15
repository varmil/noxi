-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnails" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "defaultLanguage" TEXT,
    "playlistId" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL,
    "subscriberCount" INTEGER NOT NULL,
    "videoCount" INTEGER NOT NULL,
    "keywords" JSONB NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);
