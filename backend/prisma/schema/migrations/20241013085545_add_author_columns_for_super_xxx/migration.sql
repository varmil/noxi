/*
  Warnings:

  - Added the required column `authorChannelId` to the `YoutubeStreamSuperChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorDisplayName` to the `YoutubeStreamSuperChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorIsChatSponsor` to the `YoutubeStreamSuperChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorProfileImageUrl` to the `YoutubeStreamSuperChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorChannelId` to the `YoutubeStreamSuperSticker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorDisplayName` to the `YoutubeStreamSuperSticker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorIsChatSponsor` to the `YoutubeStreamSuperSticker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorProfileImageUrl` to the `YoutubeStreamSuperSticker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "YoutubeStreamSuperChat" ADD COLUMN     "authorChannelId" TEXT NOT NULL,
ADD COLUMN     "authorDisplayName" TEXT NOT NULL,
ADD COLUMN     "authorIsChatSponsor" BOOLEAN NOT NULL,
ADD COLUMN     "authorProfileImageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "YoutubeStreamSuperSticker" ADD COLUMN     "authorChannelId" TEXT NOT NULL,
ADD COLUMN     "authorDisplayName" TEXT NOT NULL,
ADD COLUMN     "authorIsChatSponsor" BOOLEAN NOT NULL,
ADD COLUMN     "authorProfileImageUrl" TEXT NOT NULL;
