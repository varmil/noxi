/*
  Warnings:

  - You are about to drop the column `rankingType` on the `ChannelMembershipSummary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[channelId,period,createdAt]` on the table `ChannelMembershipSummary` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ChannelMembershipSummary_channelId_period_rankingType_creat_key";

-- DropIndex
DROP INDEX "ChannelMembershipSummary_period_rankingType_createdAt_idx";

-- AlterTable
ALTER TABLE "ChannelMembershipSummary" DROP COLUMN "rankingType";

-- CreateIndex
CREATE INDEX "ChannelMembershipSummary_period_createdAt_idx" ON "ChannelMembershipSummary"("period", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelMembershipSummary_channelId_period_createdAt_key" ON "ChannelMembershipSummary"("channelId", "period", "createdAt");
