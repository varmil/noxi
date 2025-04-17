-- AlterTable
ALTER TABLE "NextContinuation" RENAME CONSTRAINT "YoutubeStreamChatCount_pkey" TO "NextContinuation_pkey";

-- RenameIndex
ALTER INDEX "YoutubeStreamChatCount_videoId_createdAt_idx" RENAME TO "NextContinuation_videoId_createdAt_idx";
