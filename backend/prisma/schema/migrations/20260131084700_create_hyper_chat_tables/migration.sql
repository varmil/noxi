-- CreateTable
CREATE TABLE "HyperChat" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stripePaymentId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HyperChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HyperChatLike" (
    "id" SERIAL NOT NULL,
    "hyperChatId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HyperChatLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HyperChat_channelId_createdAt_idx" ON "HyperChat"("channelId", "createdAt");

-- CreateIndex
CREATE INDEX "HyperChat_channelId_status_createdAt_idx" ON "HyperChat"("channelId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "HyperChat_userId_createdAt_idx" ON "HyperChat"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "HyperChat_status_createdAt_idx" ON "HyperChat"("status", "createdAt");

-- CreateIndex
CREATE INDEX "HyperChatLike_userId_idx" ON "HyperChatLike"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HyperChatLike_hyperChatId_userId_key" ON "HyperChatLike"("hyperChatId", "userId");

-- AddForeignKey
ALTER TABLE "HyperChat" ADD CONSTRAINT "HyperChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HyperChatLike" ADD CONSTRAINT "HyperChatLike_hyperChatId_fkey" FOREIGN KEY ("hyperChatId") REFERENCES "HyperChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HyperChatLike" ADD CONSTRAINT "HyperChatLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
