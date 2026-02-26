-- AlterTable
ALTER TABLE "HyperTrain" DROP COLUMN "endedAt";

-- DropIndex
DROP INDEX IF EXISTS "HyperTrain_group_endedAt_idx";

-- CreateIndex
CREATE INDEX "HyperTrain_group_expiresAt_idx" ON "HyperTrain"("group", "expiresAt");
