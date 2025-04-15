/*
  Warnings:

  - You are about to drop the column `nextPageToken` on the `YoutubeStreamChatCount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "YoutubeStreamChatCount" DROP COLUMN "nextPageToken";
