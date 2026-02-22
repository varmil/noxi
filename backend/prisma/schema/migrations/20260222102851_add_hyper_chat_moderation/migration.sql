-- CreateTable
CREATE TABLE "HyperChatModeration" (
    "hyperChatId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "HyperChatModeration_pkey" PRIMARY KEY ("hyperChatId")
);

-- CreateIndex
CREATE INDEX "HyperChatModeration_status_idx" ON "HyperChatModeration"("status");

-- AddForeignKey
ALTER TABLE "HyperChatModeration" ADD CONSTRAINT "HyperChatModeration_hyperChatId_fkey" FOREIGN KEY ("hyperChatId") REFERENCES "HyperChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
