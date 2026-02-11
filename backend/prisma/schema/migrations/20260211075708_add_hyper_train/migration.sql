-- CreateTable
CREATE TABLE "HyperTrain" (
    "id" SERIAL NOT NULL,
    "channelId" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "totalPoint" INTEGER NOT NULL,
    "startedAt" TIMESTAMPTZ(3) NOT NULL,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "endedAt" TIMESTAMPTZ(3),

    CONSTRAINT "HyperTrain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HyperTrainContribution" (
    "id" SERIAL NOT NULL,
    "hyperTrainId" INTEGER NOT NULL,
    "hyperChatId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "point" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HyperTrainContribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HyperTrain_channelId_expiresAt_idx" ON "HyperTrain"("channelId", "expiresAt");

-- CreateIndex
CREATE INDEX "HyperTrain_group_endedAt_idx" ON "HyperTrain"("group", "endedAt");

-- CreateIndex
CREATE UNIQUE INDEX "HyperTrainContribution_hyperChatId_key" ON "HyperTrainContribution"("hyperChatId");

-- CreateIndex
CREATE INDEX "HyperTrainContribution_hyperTrainId_createdAt_idx" ON "HyperTrainContribution"("hyperTrainId", "createdAt");

-- AddForeignKey
ALTER TABLE "HyperTrainContribution" ADD CONSTRAINT "HyperTrainContribution_hyperTrainId_fkey" FOREIGN KEY ("hyperTrainId") REFERENCES "HyperTrain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
