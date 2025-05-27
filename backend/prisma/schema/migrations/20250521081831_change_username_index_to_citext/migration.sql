CREATE EXTENSION IF NOT EXISTS citext;

-- AlterTable
ALTER TABLE "CheerTicketUsage" ADD COLUMN     "gender" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "username" SET DATA TYPE CITEXT;
