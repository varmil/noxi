-- CreateTable
CREATE TABLE "YoutubeStreamSupersBundleQueue" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamSupersBundleQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YoutubeStreamSupersBundle" (
    "videoId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "amountMicros" BIGINT NOT NULL,
    "count" INTEGER NOT NULL,
    "actualStartTime" TIMESTAMPTZ(3) NOT NULL,
    "actualEndTime" TIMESTAMPTZ(3) NOT NULL,
    "group" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamSupersBundle_pkey" PRIMARY KEY ("videoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeStreamSupersBundleQueue_videoId_key" ON "YoutubeStreamSupersBundleQueue"("videoId");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersBundle_actualStartTime_amountMicros_idx" ON "YoutubeStreamSupersBundle"("actualStartTime", "amountMicros");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersBundle_actualEndTime_amountMicros_idx" ON "YoutubeStreamSupersBundle"("actualEndTime", "amountMicros");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersBundle_channelId_actualStartTime_amountM_idx" ON "YoutubeStreamSupersBundle"("channelId", "actualStartTime", "amountMicros");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersBundle_channelId_actualEndTime_amountMic_idx" ON "YoutubeStreamSupersBundle"("channelId", "actualEndTime", "amountMicros");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersBundle_group_actualStartTime_amountMicro_idx" ON "YoutubeStreamSupersBundle"("group", "actualStartTime", "amountMicros");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersBundle_group_actualEndTime_amountMicros_idx" ON "YoutubeStreamSupersBundle"("group", "actualEndTime", "amountMicros");
