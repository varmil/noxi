-- DropIndex
DROP INDEX "Channel_group_idx";

-- CreateIndex
CREATE INDEX "Channel_group_subscriberCount_idx" ON "Channel"("group", "subscriberCount");

-- CreateIndex
CREATE INDEX "Channel_publishedAt_idx" ON "Channel"("publishedAt");

-- CreateIndex
CREATE INDEX "YoutubeStream_status_scheduledStartTime_idx" ON "YoutubeStream"("status", "scheduledStartTime");

-- CreateIndex
CREATE INDEX "YoutubeStream_status_actualStartTime_idx" ON "YoutubeStream"("status", "actualStartTime");
