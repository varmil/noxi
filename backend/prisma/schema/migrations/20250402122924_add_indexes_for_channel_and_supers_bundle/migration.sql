-- CreateIndex
CREATE INDEX "Channel_group_id_idx" ON "Channel"("group", "id");

-- CreateIndex
CREATE INDEX "Channel_gender_id_idx" ON "Channel"("gender", "id");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersBundle_channelId_amountMicros_idx" ON "YoutubeStreamSupersBundle"("channelId", "amountMicros" DESC);
