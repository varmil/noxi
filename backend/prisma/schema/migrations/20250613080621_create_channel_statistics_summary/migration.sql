-- CreateTable
CREATE TABLE "ChannelSubscriberCountSummary" (
    "id" BIGINT NOT NULL,
    "channelId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelSubscriberCountSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelVideoCountSummary" (
    "id" BIGINT NOT NULL,
    "channelId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelVideoCountSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelViewCountSummary" (
    "id" BIGINT NOT NULL,
    "channelId" TEXT NOT NULL,
    "count" BIGINT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelViewCountSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChannelSubscriberCountSummary_channelId_createdAt_count_idx" ON "ChannelSubscriberCountSummary"("channelId", "createdAt", "count");

-- CreateIndex
CREATE INDEX "ChannelVideoCountSummary_channelId_createdAt_count_idx" ON "ChannelVideoCountSummary"("channelId", "createdAt", "count");

-- CreateIndex
CREATE INDEX "ChannelViewCountSummary_channelId_createdAt_count_idx" ON "ChannelViewCountSummary"("channelId", "createdAt", "count");

-- AddForeignKey
ALTER TABLE "ChannelSubscriberCountSummary" ADD CONSTRAINT "ChannelSubscriberCountSummary_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelVideoCountSummary" ADD CONSTRAINT "ChannelVideoCountSummary_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelViewCountSummary" ADD CONSTRAINT "ChannelViewCountSummary_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
