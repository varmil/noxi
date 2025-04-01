-- CreateIndex
CREATE INDEX "YoutubeStreamSupersBundle_amountMicros_idx" ON "YoutubeStreamSupersBundle"("amountMicros" DESC);

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersBundle_amountMicros_videoId_idx" ON "YoutubeStreamSupersBundle"("amountMicros" DESC, "videoId");
