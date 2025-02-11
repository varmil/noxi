-- CreateIndex
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX "YoutubeStream_title_idx" ON "YoutubeStream" USING GIN ("title" gin_trgm_ops);
