-- CreateTable
CREATE TABLE "YoutubeStreamSupersSummary" (
    "id" SERIAL NOT NULL,
    "channelId" TEXT NOT NULL,
    "last7days" BIGINT NOT NULL,
    "last30days" BIGINT NOT NULL,
    "last90days" BIGINT NOT NULL,
    "last1year" BIGINT NOT NULL,
    "thisWeek" BIGINT NOT NULL,
    "thisMonth" BIGINT NOT NULL,
    "thisYear" BIGINT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YoutubeStreamSupersSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last7days_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "last7days");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last30days_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "last30days");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last90days_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "last90days");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_last1year_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "last1year");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_thisWeek_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "thisWeek");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_thisMonth_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "thisMonth");

-- CreateIndex
CREATE INDEX "YoutubeStreamSupersSummary_channelId_createdAt_thisYear_idx" ON "YoutubeStreamSupersSummary"("channelId", "createdAt", "thisYear");

-- AddForeignKey
ALTER TABLE "YoutubeStreamSupersBundle" ADD CONSTRAINT "YoutubeStreamSupersBundle_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeStreamSupersSummary" ADD CONSTRAINT "YoutubeStreamSupersSummary_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
