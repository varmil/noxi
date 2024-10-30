-- AddForeignKey
ALTER TABLE "YoutubeStreamSuperChat" ADD CONSTRAINT "YoutubeStreamSuperChat_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "YoutubeStream"("videoId") ON DELETE CASCADE ON UPDATE CASCADE;
