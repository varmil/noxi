-- AlterTable
ALTER TABLE "StreamChatDeletingQueue" RENAME CONSTRAINT "YoutubeStreamChatBundleQueue_pkey" TO "StreamChatDeletingQueue_pkey";

-- RenameIndex
ALTER INDEX "YoutubeStreamChatBundleQueue_videoId_key" RENAME TO "StreamChatDeletingQueue_videoId_key";
