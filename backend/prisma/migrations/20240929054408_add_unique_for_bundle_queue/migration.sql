/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `YoutubeStreamChatBundleQueue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "YoutubeStreamChatBundleQueue_videoId_key" ON "YoutubeStreamChatBundleQueue"("videoId");
