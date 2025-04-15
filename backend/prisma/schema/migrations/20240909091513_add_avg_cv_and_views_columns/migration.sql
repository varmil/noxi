-- AlterTable
ALTER TABLE "YoutubeStream" ADD COLUMN     "averageConcurrentViewers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
