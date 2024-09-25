/*
  Warnings:

  - Added the required column `latestPublishedAt` to the `YoutubeStreamChatCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "YoutubeStreamChatCount" ADD COLUMN     "latestPublishedAt" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "nextPageToken" TEXT;
