/*
  Warnings:

  - You are about to drop the column `chatCount` on the `YoutubeStream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "YoutubeStream" DROP COLUMN "chatCount",
ADD COLUMN     "chatMessages" INTEGER NOT NULL DEFAULT 0;
