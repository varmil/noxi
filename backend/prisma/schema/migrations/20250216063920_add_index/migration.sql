-- CreateIndex
CREATE INDEX "Channel_gender_idx" ON "Channel"("gender");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersBundle_createdAt_group_idx" ON "YoutubeStreamSupersBundle"("createdAt", "group");
