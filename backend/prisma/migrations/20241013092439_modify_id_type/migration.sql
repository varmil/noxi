/*
  Warnings:

  - The primary key for the `YoutubeStreamSuperChat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `YoutubeStreamSuperSticker` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "YoutubeStreamSuperChat" DROP CONSTRAINT "YoutubeStreamSuperChat_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "YoutubeStreamSuperChat_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "YoutubeStreamSuperChat_id_seq";

-- AlterTable
ALTER TABLE "YoutubeStreamSuperSticker" DROP CONSTRAINT "YoutubeStreamSuperSticker_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "YoutubeStreamSuperSticker_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "YoutubeStreamSuperSticker_id_seq";
