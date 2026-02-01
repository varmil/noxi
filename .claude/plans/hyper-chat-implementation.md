# ハイパーチャット機能 実装計画

## 概要

YouTubeのスーパーチャットのような有料コメント機能「ハイパーチャット」を実装する。
既存の「応援チケット」機能を進化・置換する形で導入。
4つのサブ機能（ハイパーチャット、ハイパートレイン、ハイパーレベル、チケット）で構成。

**関連Issue**:
- 親: #2726 ハイパーチャット機能の開発
- Sub: #2773 ハイパートレイン、#2774 ハイパーレベル、#2775 チケット

**アイコン**: `messages-square`（lucide）を一貫して使用

---

## フェーズ分割（7段階リリース）

| Phase | 機能 | 概要 | 依存関係 |
|-------|------|------|----------|
| 0 | **既存機能クリーンアップ** | 応援チケット関連をコメントアウト/削除 | なし |
| 1 | **MVP: ハイパーチャット基本** | 購入・保存・決済 | Phase 0 |
| 2 | **表示機能** | 吹き出し表示、ローテーション、履歴 | Phase 1 |
| 3 | **エンゲージメント** | いいね、プリセット、購入導線追加 | Phase 2 |
| 4 | **チケット** | 無料チケット配布・使用 | Phase 1 |
| 5 | **ハイパートレイン** | 集団応援でトレイン発動 | Phase 1-2 |
| 6 | **ハイパーレベル** | VIP制度、バッジ表示 | Phase 1 |

---

## Phase 0: 既存機能クリーンアップ

### 対象（コメントアウト or 削除）
- 応援チケット関連機能すべて
- ファンランキング
- 応援ランキング
- CheerTicket / CheerTicketUsage 関連のUI・API

### 対象ファイル（主要）
- `web/features/cheer-channel/` - 全体
- `web/apis/cheer-tickets/` - 全体
- `web/apis/cheer-ticket-usages/` - 全体
- `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/profile/ChannelProfile.tsx` - 応援チケットボタン部分
- `backend/apps/closed-api-server/src/presentation/cheer-tickets/` - 全体
- `backend/apps/closed-api-server/src/presentation/cheer-ticket-usages/` - 全体

---

## Phase 1: MVP（最優先）

### 機能範囲
- Lite(300円)/Standard(1,000円)/Max(10,000円)の3段階購入
- メッセージ入力（文字数制限: 60/140/300文字）※ドメイン層でバリデート
- Stripe都度決済（Stripe Elements）
- GPTモデレーション + NGワード
- チャンネル詳細ページに購入ボタン配置
- 基本的な履歴保存

### データモデル（Prisma）

```prisma
// backend/prisma/schema/models/hyper-chat.prisma

model HyperChat {
  id              Int      @id @default(autoincrement())
  userId          Int
  channelId       String
  group           String
  gender          String
  tier            String   // "lite", "standard", "max"
  message         String
  stripePaymentId String?
  status          String   @default("pending") // pending, completed, failed
  likeCount       Int      @default(0)
  createdAt       DateTime @default(now()) @db.Timestamptz(3)

  user  User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  likes HyperChatLike[]

  @@index([channelId, createdAt])
  @@index([userId, createdAt])
  @@index([status, createdAt])
}

model HyperChatLike {
  id          Int      @id @default(autoincrement())
  hyperChatId Int
  userId      Int
  createdAt   DateTime @default(now()) @db.Timestamptz(3)

  hyperChat HyperChat @relation(fields: [hyperChatId], references: [id], onDelete: Cascade)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([hyperChatId, userId])
}
```

### Tier設定（ドメイン層で定義）

```typescript
export const TIER_CONFIG = {
  lite: { price: 300, maxChars: 60, rotationSlots: 1 },
  standard: { price: 1000, maxChars: 140, rotationSlots: 4 },
  max: { price: 10000, maxChars: 300, rotationSlots: 60 }
} as const
```

### ドメイン層

```
backend/libs/domain/hyper-chat/
├── HyperChat.entity.ts
├── HyperChats.collection.ts
├── HyperChat.repository.ts
├── index.ts
└── value-objects/
    ├── HyperChatId.vo.ts
    ├── Tier.vo.ts           // "lite" | "standard" | "max" + 設定
    ├── Message.vo.ts        // XSS対策 + 文字数制限（Tier依存）
    └── Status.vo.ts
```

### API エンドポイント

| Method | Endpoint | 説明 | 認証 |
|--------|----------|------|------|
| POST | `/api/hyper-chats/payment-intent` | PaymentIntent作成（Elements用） | 必須 |
| GET | `/api/hyper-chats/channels/:channelId` | チャンネル別履歴 | 任意 |
| GET | `/api/hyper-chats/me` | 自分の送信履歴 | 必須 |

### Stripe Webhook 拡張

```typescript
// webhooks-stripe.controller.ts に追加
case 'payment_intent.succeeded': {
  const paymentIntent = event.data.object
  const hyperChatId = paymentIntent.metadata?.hyperChatId
  if (hyperChatId) {
    await this.hyperChatsScenario.handlePaymentSuccess({
      hyperChatId: parseInt(hyperChatId, 10),
      stripePaymentId: paymentIntent.id
    })
  }
  break
}
```

### フロントエンド

```
web/features/hyper-chat/
├── components/
│   ├── HyperChatButton.tsx      # 購入ボタン + Dialog（Stripe Elements統合）
│   └── PaymentForm.tsx          # Stripe PaymentElement ラッパー
└── types/
    └── hyper-chat.type.ts

web/apis/hyper-chats/
├── hyperChatSchema.ts
├── createHyperChatPaymentIntent.ts  # Server Action（Elements用）
└── getHyperChats.ts
```

### 購入ボタン配置

**チャンネル詳細ページ Base部**:
- ファイル: `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/profile/ChannelProfile.tsx`
- 応援チケット関連を削除し、「ハイパーチャットを購入」ボタンを配置
- 統計情報: 「総応援額: ¥ 1,250,000」「支援者数: 342人（が応援中！）」

---

## Phase 2: 表示機能

### 機能範囲
- ランキングページ各行に吹き出し表示（過去24時間のデータ）
- ローテーション表示（金額に応じたスロット数）
- MAXローテーション枠（10,000円は60分独占）
- チャンネル詳細ページにハイパーチャット履歴タブ追加

**注意**: 「ハイパーチャットランキング」機能は今回スコープ外

### API エンドポイント

| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/hyper-chats/rotation/:channelId` | ローテーション表示用（過去24時間） |

### ローテーションロジック

```typescript
// lite = 1スロット、standard = 4スロット
// max = 60分間MAXローテーション枠（独占）、60分経過後はstandard扱い

interface RotationSlot {
  hyperChat: HyperChat
  weight: number  // スロット数
  isMax: boolean  // MAXローテーション中か
  maxExpiresAt?: Date
}
```

### 吹き出し仕様
- 背景色: lite=水色、standard=黄色、max=赤色
- line-clamp: lite/standard=2行、max=3行
- 表示時間: 5秒ごとにフェード切替
- タップで全ハイパーチャットのタイムラインをSheet/Dialogで表示

### フロントエンド

```
web/features/hyper-chat/components/
├── HyperChatRotation.tsx        # ローテーション表示（5秒切替）
├── HyperChatBubble.tsx          # 吹き出しUI
├── HyperChatList.tsx            # 履歴リスト
├── HyperChatCard.tsx            # 個別カード
└── HyperChatTimeline.tsx        # タイムラインSheet/Dialog

web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/hyper-chat/
└── page.tsx                     # ハイパーチャット履歴ページ
```

### 履歴ページ仕様
- 30件/ページのページング
- ソート: 新着順（デフォルト）、金額順
- 画面下部に「ハイパーチャットを購入」ボタンを常駐

---

## Phase 3: エンゲージメント機能

### 機能範囲
- いいね機能（1人1回）
- プリセットメッセージ（「尊い...」「神回だった」「おめでとう！」など）
- 購入導線追加（ランキングページ各行）
- 自動復元機能（localStorage）

### API エンドポイント

| Method | Endpoint | 説明 |
|--------|----------|------|
| POST | `/api/hyper-chats/:id/like` | いいね |
| DELETE | `/api/hyper-chats/:id/like` | いいね解除 |

### 購入導線追加

**ランキングページ各行**:
- ファイル: `web/features/channels-ranking/components/table/ChannelsRankingTable.tsx`
- 右端に `messages-square` アイコンボタンを追加
- 対象: `/ranking/[dimension]/channels/[group]/[period]`、`/ranking/concurrent-viewer/live/[group]/[period]`

---

## Phase 4: ハイパーチャットチケット

### 機能範囲
- 300円（Lite）相当のチケット配布
- 30日間有効期限
- 配布タイミング: リリース時3枚、新規登録時1枚、5日ごとにログインボーナス

### データモデル

```prisma
model HyperChatTicket {
  id         Int       @id @default(autoincrement())
  userId     Int
  expiresAt  DateTime  @db.Timestamptz(3)
  usedAt     DateTime? @db.Timestamptz(3)
  sourceType String    // "release", "signup", "login_bonus"
  createdAt  DateTime  @default(now()) @db.Timestamptz(3)

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, expiresAt, usedAt])
}
```

### 仕様（有料との違い）
- 「総応援金額」には含めない
- 「支援者数」には含める
- 吹き出しの「表示権」は有料・無料で差別しない

### API エンドポイント

| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/hyper-chat-tickets/me` | 所持チケット一覧 |
| POST | `/api/hyper-chat-tickets/use` | チケット使用 |

---

## Phase 5: ハイパートレイン

**詳細仕様は Issue #2773 を参照**

### 機能範囲
- 60分以内に3回のハイパーチャットで発生（3人の協力が必要）
- 10,000円（Max）でソロスタート
- レベル1-10（最大100,000円）
- トップページに大きく表示
- 60分タイマー、レベルアップでリセット
- クールダウン: 終了後1時間は新規トレイン発生しない
- 最大6時間継続

### レベル定義

| Lv. | 必要総金額 | 次のレベルまで |
|-----|-----------|---------------|
| 1 | 900 | 2,100 |
| 2 | 3,000 | 3,000 |
| 3 | 6,000 | 4,000 |
| 4 | 10,000 | 5,000 |
| 5 | 15,000 | 15,000 |
| 6 | 30,000 | 15,000 |
| 7 | 45,000 | 15,000 |
| 8 | 60,000 | 20,000 |
| 9 | 80,000 | 20,000 |
| 10 | 100,000 | N/A |

### データモデル

```prisma
model HyperTrain {
  id          Int      @id @default(autoincrement())
  channelId   String
  level       Int      @default(1)
  totalAmount Int
  startedAt   DateTime @db.Timestamptz(3)
  expiresAt   DateTime @db.Timestamptz(3)
  endedAt     DateTime? @db.Timestamptz(3)

  contributions HyperTrainContribution[]

  @@index([channelId, expiresAt])
}

model HyperTrainContribution {
  id           Int      @id @default(autoincrement())
  hyperTrainId Int
  hyperChatId  Int      @unique
  userId       Int
  amount       Int
  createdAt    DateTime @default(now()) @db.Timestamptz(3)

  hyperTrain HyperTrain @relation(fields: [hyperTrainId], references: [id], onDelete: Cascade)
}
```

### UI
- トップページ: 発生中のトレインを大きく固定表示（v0 MCP活用）
- チャンネル詳細ページ: Incoming Train（未発生時）、発生中の演出
- 過去記録: 最大レベル、参加人数、総額

---

## Phase 6: ハイパーレベル

### 機能範囲
- VIP制度（ユーザー→特定タレントへの累積金額でレベル決定）
- バッジ表示（lucide-iconで色違い）
- サイト全体での「総合レベル」もサブ指標として保持

### レベル定義

| レベル | 累積金額 | バッジ色 |
|--------|----------|----------|
| 1 | 2,000 ~ 10,000円 | 銅（Bronze） |
| 2 | 10,001 ~ 30,000円 | 銀（Silver） |
| 3 | 30,001 ~ 100,000円 | 金（Gold） |
| 4 | 100,001 ~ 300,000円 | プラチナ（白金） |
| 5 | 300,001 ~ 1,000,000円 | エメラルド（緑） |
| 守護神 | 1,000,001円~ | レインボー/特殊 |

**注意**: 無料チケット分も累積に含める

### データモデル

```prisma
model HyperLevel {
  id         Int      @id @default(autoincrement())
  userId     Int
  channelId  String
  totalSpent Int      @default(0)
  level      Int      @default(0) // 0-5, 6=守護神
  updatedAt  DateTime @default(now()) @db.Timestamptz(3)

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, channelId])
  @@index([channelId, level])
}
```

---

## Critical Files（変更対象）

### Backend
- `backend/prisma/schema/models/` - 新規スキーマ追加
- `backend/libs/domain/hyper-chat/` - 新規ドメイン層
- `backend/libs/application/hyper-chats/` - 新規アプリケーション層
- `backend/libs/infrastructure/hyper-chat/` - 新規インフラ層
- `backend/apps/closed-api-server/src/presentation/hyper-chats/` - 新規API
- `backend/apps/closed-api-server/src/presentation/webhooks/stripe/webhooks-stripe.controller.ts` - Webhook拡張

### Frontend
- `web/features/hyper-chat/` - 新規feature
- `web/apis/hyper-chats/` - 新規API
- `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/profile/ChannelProfile.tsx` - 購入ボタン追加
- `web/features/channels-ranking/components/table/ChannelsRankingTable.tsx` - 購入導線追加（Phase 3）
- `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/hyper-chat/` - 新規ページ（Phase 2）

### 参考にする既存実装
- `backend/libs/domain/cheer-ticket-usage/` - 類似機能のパターン
- `web/features/cheer-channel/button/ChannelCheerDialog.tsx` - ダイアログUIパターン

---

## 検証方法

### Phase 1 完了時
1. **決済フロー**: Stripe テストモードでLite/Standard/Maxの決済が完了すること
2. **メッセージ保存**: 決済完了後、DBにHyperChatレコードが作成されること
3. **モデレーション**: 不適切なメッセージが拒否されること
4. **文字数制限**: Tierに応じた文字数制限が機能すること

### テスト実行
```bash
# Backend
cd backend && npm run type-check
cd backend && npm run lint -- --fix
cd backend && npm test
cd backend && npm run test:e2e

# Frontend
cd web && npm run type-check
cd web && npm run lint -- --fix
cd web && npm test

# E2E
cd e2e && npm test
```

---

## リスクと対策

| リスク | 対策 |
|--------|------|
| Webhook取りこぼし | 定期的なセッション照合バッチ |
| 高負荷時のローテーション | Redisキャッシュ導入（Phase 2） |
| 不正利用（スパム） | レートリミット + モデレーション |
| 返金対応 | Stripeの返金機能活用 |

---

## 備考

- 「これはタレントへの投げ銭ではなく、VCharts上の広告枠購入費です」と明記（資金決済法対応）
- 決済はシンプルに都度決済（クレジット型/サブスク型は考慮せず）
- UIは必要に応じて v0 MCP を活用
- 既存のStripe関連実装はWIP状態のため、最新のStripe APIドキュメントに従って実装
