/*
  Warnings:

  - You are about to drop the column `all` on the `YoutubeStreamChatCount` table. All the data in the column will be lost.
  - You are about to drop the column `member` on the `YoutubeStreamChatCount` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "YoutubeStreamChatCount_videoId_all_createdAt_idx";

-- AlterTable
ALTER TABLE "YoutubeStreamChatCount" DROP COLUMN "all",
DROP COLUMN "member";
