-- DropIndex
DROP INDEX "YoutubeStream_status_idx";

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "group" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "YoutubeStream" ADD COLUMN     "group" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "Channel_group_idx" ON "Channel"("group");

-- CreateIndex
CREATE INDEX "YoutubeStream_status_group_idx" ON "YoutubeStream"("status", "group");
