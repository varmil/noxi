-- AlterTable: Add order column to Group table
ALTER TABLE "Group" ADD COLUMN "order" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex: Add index for order column (performance improvement)
CREATE INDEX "Group_order_idx" ON "Group"("order");
