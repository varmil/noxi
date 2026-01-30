-- AlterTable: Add normalizedEmail column
ALTER TABLE "users" ADD COLUMN "normalizedEmail" TEXT;

-- Populate normalizedEmail for existing records
-- Gmail/Googlemail: remove +alias, remove dots, lowercase, unify domain to gmail.com
-- Others: remove +alias, lowercase
UPDATE "users"
SET "normalizedEmail" = CASE
  WHEN LOWER(SPLIT_PART(email, '@', 2)) IN ('gmail.com', 'googlemail.com') THEN
    REPLACE(SPLIT_PART(SPLIT_PART(LOWER(email), '+', 1), '@', 1), '.', '') || '@gmail.com'
  ELSE
    SPLIT_PART(LOWER(email), '+', 1)
END
WHERE email IS NOT NULL;

-- CreateIndex: Add unique constraint
CREATE UNIQUE INDEX "users_normalizedEmail_key" ON "users"("normalizedEmail");
