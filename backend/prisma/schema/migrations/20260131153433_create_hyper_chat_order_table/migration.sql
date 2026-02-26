/*
  Warnings:

  - You are about to drop the column `status` on the `HyperChat` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentId` on the `HyperChat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `HyperChat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `HyperChat` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "HyperChat_channelId_status_createdAt_idx";

-- DropIndex
DROP INDEX "HyperChat_status_createdAt_idx";

-- AlterTable
ALTER TABLE "HyperChat" DROP COLUMN "status",
DROP COLUMN "stripePaymentId",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "orderId" INTEGER;

-- CreateTable
CREATE TABLE "HyperChatOrder" (
    "id" SERIAL NOT NULL,
    "stripePaymentIntentId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "HyperChatOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HyperChatOrder_stripePaymentIntentId_key" ON "HyperChatOrder"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "HyperChatOrder_userId_createdAt_idx" ON "HyperChatOrder"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "HyperChatOrder_status_createdAt_idx" ON "HyperChatOrder"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "HyperChat_orderId_key" ON "HyperChat"("orderId");

-- AddForeignKey
ALTER TABLE "HyperChatOrder" ADD CONSTRAINT "HyperChatOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HyperChat" ADD CONSTRAINT "HyperChat_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "HyperChatOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
