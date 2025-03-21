-- CreateTable
CREATE TABLE "ChannelMembershipSummaryLatest" (
    "channelId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "amountMicros" BIGINT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelMembershipSummaryLatest_pkey" PRIMARY KEY ("channelId","period")
);

-- CreateIndex
CREATE INDEX "ChannelMembershipSummaryLatest_period_amountMicros_idx" ON "ChannelMembershipSummaryLatest"("period", "amountMicros");

-- AddForeignKey
ALTER TABLE "ChannelMembershipSummaryLatest" ADD CONSTRAINT "ChannelMembershipSummaryLatest_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
