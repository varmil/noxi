-- CreateTable
CREATE TABLE "CheerTicketUsage" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "usedCount" INTEGER NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CheerTicketUsage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheerTicketUsage" ADD CONSTRAINT "CheerTicketUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
