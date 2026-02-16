-- AlterTable
ALTER TABLE "HyperChat" ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HyperChatOrder" ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HyperTrainContribution" ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL DEFAULT false;
