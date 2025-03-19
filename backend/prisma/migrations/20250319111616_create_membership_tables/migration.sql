-- CreateTable
CREATE TABLE "ChannelMembershipSummary" (
    "id" BIGSERIAL NOT NULL,
    "channelId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "rankingType" TEXT NOT NULL,
    "amountMicros" BIGINT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelMembershipSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamMembership" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "isGift" BOOLEAN NOT NULL,
    "authorChannelId" TEXT NOT NULL,
    "authorDisplayName" TEXT NOT NULL,
    "authorProfileImageUrl" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamMembershipBundle" (
    "videoId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "amountMicros" BIGINT NOT NULL,
    "count" INTEGER NOT NULL,
    "actualStartTime" TIMESTAMPTZ(3) NOT NULL,
    "actualEndTime" TIMESTAMPTZ(3),
    "group" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamMembershipBundle_pkey" PRIMARY KEY ("videoId")
);

-- CreateIndex
CREATE INDEX "ChannelMembershipSummary_period_rankingType_createdAt_idx" ON "ChannelMembershipSummary"("period", "rankingType", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelMembershipSummary_channelId_period_rankingType_creat_key" ON "ChannelMembershipSummary"("channelId", "period", "rankingType", "createdAt");

-- CreateIndex
CREATE INDEX "StreamMembership_videoId_createdAt_idx" ON "StreamMembership"("videoId", "createdAt");

-- CreateIndex
CREATE INDEX "StreamMembership_group_createdAt_idx" ON "StreamMembership"("group", "createdAt");

-- CreateIndex
CREATE INDEX "StreamMembershipBundle_actualStartTime_amountMicros_idx" ON "StreamMembershipBundle"("actualStartTime", "amountMicros");

-- CreateIndex
CREATE INDEX "StreamMembershipBundle_actualEndTime_amountMicros_idx" ON "StreamMembershipBundle"("actualEndTime", "amountMicros");

-- CreateIndex
CREATE INDEX "StreamMembershipBundle_channelId_actualStartTime_amountMicr_idx" ON "StreamMembershipBundle"("channelId", "actualStartTime", "amountMicros");

-- CreateIndex
CREATE INDEX "StreamMembershipBundle_channelId_actualEndTime_amountMicros_idx" ON "StreamMembershipBundle"("channelId", "actualEndTime", "amountMicros");

-- CreateIndex
CREATE INDEX "StreamMembershipBundle_group_actualStartTime_amountMicros_idx" ON "StreamMembershipBundle"("group", "actualStartTime", "amountMicros");

-- CreateIndex
CREATE INDEX "StreamMembershipBundle_group_actualEndTime_amountMicros_idx" ON "StreamMembershipBundle"("group", "actualEndTime", "amountMicros");

-- CreateIndex
CREATE INDEX "StreamMembershipBundle_createdAt_group_idx" ON "StreamMembershipBundle"("createdAt", "group");

-- AddForeignKey
ALTER TABLE "ChannelMembershipSummary" ADD CONSTRAINT "ChannelMembershipSummary_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamMembershipBundle" ADD CONSTRAINT "StreamMembershipBundle_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
