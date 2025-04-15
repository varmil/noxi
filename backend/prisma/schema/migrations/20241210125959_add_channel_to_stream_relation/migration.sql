-- AddForeignKey
ALTER TABLE "YoutubeStream" ADD CONSTRAINT "YoutubeStream_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
