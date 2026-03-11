-- CreateTable
CREATE TABLE "feature_interests" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "featureId" TEXT NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feature_interests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "feature_interests_featureId_idx" ON "feature_interests"("featureId");

-- CreateIndex
CREATE INDEX "feature_interests_userId_idx" ON "feature_interests"("userId");

-- AddForeignKey
ALTER TABLE "feature_interests" ADD CONSTRAINT "feature_interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
