-- CreateTable
CREATE TABLE "MembershipPrice" (
    "channelId" TEXT NOT NULL,
    "priceMicros" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'JPY',

    CONSTRAINT "MembershipPrice_pkey" PRIMARY KEY ("channelId")
);
