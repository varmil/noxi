-- CreateTable
CREATE TABLE "ChannelSubscriberMilestone" (
    "id" BIGSERIAL NOT NULL,
    "channelId" TEXT NOT NULL,
    "milestone" INTEGER NOT NULL,
    "postedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelSubscriberMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChannelSubscriberMilestone_channelId_idx" ON "ChannelSubscriberMilestone"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelSubscriberMilestone_channelId_milestone_key" ON "ChannelSubscriberMilestone"("channelId", "milestone");

-- AddForeignKey
ALTER TABLE "ChannelSubscriberMilestone" ADD CONSTRAINT "ChannelSubscriberMilestone_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
