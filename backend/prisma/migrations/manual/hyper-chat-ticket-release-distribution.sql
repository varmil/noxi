-- リリース時配布: 全アクティブユーザーに7枚のハイパーチャットチケットを配布
-- 実行前に必ず本番DBのバックアップを取ること
-- 実行タイミング: マイグレーション適用後、リリース時に1回のみ実行

-- 全ユーザーに7枚配布（30日間有効）
INSERT INTO "HyperChatTicket" ("userId", "expiresAt", "sourceType", "createdAt")
SELECT
  u.id,
  NOW() + INTERVAL '30 days',
  'release',
  NOW()
FROM "users" u
CROSS JOIN generate_series(1, 7);

-- 配布結果の確認クエリ
-- SELECT
--   "sourceType",
--   COUNT(*) as ticket_count,
--   COUNT(DISTINCT "userId") as user_count
-- FROM "HyperChatTicket"
-- GROUP BY "sourceType";
