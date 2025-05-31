-- CreateIndex
CREATE INDEX "CheerTicketLog_userId_claimedAt_idx" ON "CheerTicketLog"("userId", "claimedAt");

-- CreateIndex
CREATE INDEX "CheerTicketUsage_userId_usedAt_usedCount_idx" ON "CheerTicketUsage"("userId", "usedAt", "usedCount");

-- CreateIndex
CREATE INDEX "CheerTicketUsage_channelId_usedAt_usedCount_idx" ON "CheerTicketUsage"("channelId", "usedAt", "usedCount");
