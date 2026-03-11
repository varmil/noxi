-- AlterTable
ALTER TABLE "FeatureInterest" RENAME CONSTRAINT "feature_interests_pkey" TO "FeatureInterest_pkey";

-- RenameForeignKey
ALTER TABLE "FeatureInterest" RENAME CONSTRAINT "feature_interests_userId_fkey" TO "FeatureInterest_userId_fkey";

-- RenameIndex
ALTER INDEX "feature_interests_featureId_idx" RENAME TO "FeatureInterest_featureId_idx";

-- RenameIndex
ALTER INDEX "feature_interests_userId_idx" RENAME TO "FeatureInterest_userId_idx";
