-- CreateTable
CREATE TABLE "ChannelRegistration" (
    "channelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "defaultLanguage" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "subscriberCount" INTEGER NOT NULL,
    "liveStreamCount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "appliedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ChannelRegistration_pkey" PRIMARY KEY ("channelId")
);

-- CreateIndex
CREATE INDEX "ChannelRegistration_status_appliedAt_idx" ON "ChannelRegistration"("status", "appliedAt");

-- CreateIndex
CREATE INDEX "ChannelRegistration_appliedAt_idx" ON "ChannelRegistration"("appliedAt");
