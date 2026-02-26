/*
  Warnings:

  - A unique constraint covering the columns `[ticketId]` on the table `HyperChat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HyperChat" ADD COLUMN     "ticketId" INTEGER;

-- CreateTable
CREATE TABLE "HyperChatTicket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "usedAt" TIMESTAMPTZ(3),
    "sourceType" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HyperChatTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HyperChatTicketProgress" (
    "userId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "lastLoginKey" TEXT NOT NULL,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "HyperChatTicketProgress_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "HyperChatTicket_userId_expiresAt_usedAt_idx" ON "HyperChatTicket"("userId", "expiresAt", "usedAt");

-- CreateIndex
CREATE UNIQUE INDEX "HyperChat_ticketId_key" ON "HyperChat"("ticketId");

-- AddForeignKey
ALTER TABLE "HyperChatTicket" ADD CONSTRAINT "HyperChatTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HyperChatTicketProgress" ADD CONSTRAINT "HyperChatTicketProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HyperChat" ADD CONSTRAINT "HyperChat_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "HyperChatTicket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
