-- CreateTable
CREATE TABLE "CheerTicket" (
    "userId" INTEGER NOT NULL,
    "totalCount" INTEGER NOT NULL,
    "lastClaimedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "CheerTicket_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "CheerTicketLog" (
    "id" BIGSERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "claimedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "CheerTicketLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheerTicket" ADD CONSTRAINT "CheerTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheerTicketLog" ADD CONSTRAINT "CheerTicketLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
