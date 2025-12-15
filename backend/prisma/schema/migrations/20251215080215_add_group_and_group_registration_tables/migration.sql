-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconSrc" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupRegistration" (
    "id" SERIAL NOT NULL,
    "groupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconSrc" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "appliedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "GroupRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GroupRegistration_status_appliedAt_idx" ON "GroupRegistration"("status", "appliedAt");

-- CreateIndex
CREATE INDEX "GroupRegistration_appliedAt_idx" ON "GroupRegistration"("appliedAt");
