-- CreateTable
CREATE TABLE "ExchangeRate" (
    "currency" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("currency")
);
