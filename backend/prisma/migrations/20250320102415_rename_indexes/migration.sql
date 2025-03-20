-- AlterTable
ALTER TABLE "StreamChatEventsBundleQueue" RENAME CONSTRAINT "YoutubeStreamSupersBundleQueue_pkey" TO "StreamChatEventsBundleQueue_pkey";

-- RenameIndex
ALTER INDEX "YoutubeStreamSupersBundleQueue_videoId_key" RENAME TO "StreamChatEventsBundleQueue_videoId_key";
