-- CreateTable
CREATE TABLE "YoutubeStreamSupersSummaryLatest" (
    "channelId" TEXT NOT NULL,
    "last7Days" BIGINT NOT NULL,
    "last30Days" BIGINT NOT NULL,
    "last90Days" BIGINT NOT NULL,
    "last1Year" BIGINT NOT NULL,
    "thisWeek" BIGINT NOT NULL,
    "thisMonth" BIGINT NOT NULL,
    "thisYear" BIGINT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamSupersSummaryLatest_pkey" PRIMARY KEY ("channelId")
);

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummaryLatest_channelId_last7Days_idx" ON "YoutubeStreamSupersSummaryLatest"("channelId", "last7Days");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummaryLatest_channelId_last30Days_idx" ON "YoutubeStreamSupersSummaryLatest"("channelId", "last30Days");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummaryLatest_channelId_last90Days_idx" ON "YoutubeStreamSupersSummaryLatest"("channelId", "last90Days");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummaryLatest_channelId_last1Year_idx" ON "YoutubeStreamSupersSummaryLatest"("channelId", "last1Year");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummaryLatest_channelId_thisWeek_idx" ON "YoutubeStreamSupersSummaryLatest"("channelId", "thisWeek");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummaryLatest_channelId_thisMonth_idx" ON "YoutubeStreamSupersSummaryLatest"("channelId", "thisMonth");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummaryLatest_channelId_thisYear_idx" ON "YoutubeStreamSupersSummaryLatest"("channelId", "thisYear");

-- AddForeignKey
ALTER TABLE "YoutubeStreamSupersSummaryLatest" ADD CONSTRAINT "YoutubeStreamSupersSummaryLatest_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
