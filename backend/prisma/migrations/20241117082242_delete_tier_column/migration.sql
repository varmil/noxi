/*
  Warnings:

  - You are about to drop the column `tier` on the `YoutubeStreamSuperChat` table. All the data in the column will be lost.
  - You are about to drop the column `tier` on the `YoutubeStreamSuperSticker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "YoutubeStreamSuperChat" DROP COLUMN "tier";

-- AlterTable
ALTER TABLE "YoutubeStreamSuperSticker" DROP COLUMN "tier";
