/*
  Warnings:

  - You are about to drop the column `last1year` on the `YoutubeStreamSupersSummary` table. All the data in the column will be lost.
  - You are about to drop the column `last30days` on the `YoutubeStreamSupersSummary` table. All the data in the column will be lost.
  - You are about to drop the column `last7days` on the `YoutubeStreamSupersSummary` table. All the data in the column will be lost.
  - You are about to drop the column `last90days` on the `YoutubeStreamSupersSummary` table. All the data in the column will be lost.
  - Added the required column `last1Year` to the `YoutubeStreamSupersSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last30Days` to the `YoutubeStreamSupersSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last7Days` to the `YoutubeStreamSupersSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last90Days` to the `YoutubeStreamSupersSummary` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last1year_idx";

-- DropIndex
DROP INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last30days_idx";

-- DropIndex
DROP INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last7days_idx";

-- DropIndex
DROP INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last90days_idx";

-- AlterTable
ALTER TABLE "YoutubeStreamSupersSummary" DROP COLUMN "last1year",
DROP COLUMN "last30days",
DROP COLUMN "last7days",
DROP COLUMN "last90days",
ADD COLUMN     "last1Year" BIGINT NOT NULL,
ADD COLUMN     "last30Days" BIGINT NOT NULL,
ADD COLUMN     "last7Days" BIGINT NOT NULL,
ADD COLUMN     "last90Days" BIGINT NOT NULL;

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last7Days_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "last7Days");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last30Days_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "last30Days");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last90Days_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "last90Days");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last1Year_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "last1Year");
