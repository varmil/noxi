-- DropIndex: Remove unique constraint from normalizedEmail
-- エイリアスによる複数アカウント作成を許可し、特典配布時のみチェックする方式に変更
DROP INDEX "users_normalizedEmail_key";

-- CreateIndex: Add non-unique index for query performance
CREATE INDEX "users_normalizedEmail_idx" ON "users"("normalizedEmail");
