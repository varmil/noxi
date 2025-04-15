-- CreateTable
CREATE TABLE "ChannelSupersRanking" (
    "id" BIGSERIAL NOT NULL,
    "channelId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "rankingType" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelSupersRanking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChannelSupersRanking_period_rankingType_createdAt_idx" ON "ChannelSupersRanking"("period", "rankingType", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelSupersRanking_channelId_period_rankingType_createdAt_key" ON "ChannelSupersRanking"("channelId", "period", "rankingType", "createdAt");

-- AddForeignKey
ALTER TABLE "ChannelSupersRanking" ADD CONSTRAINT "ChannelSupersRanking_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
