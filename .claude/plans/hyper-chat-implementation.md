# ハイパーチャット機能 実装計画

## 概要

YouTubeのスーパーチャットのような有料コメント機能「ハイパーチャット」を実装する。
既存の「応援チケット」機能を進化・置換する形で導入。
4つのサブ機能（ハイパーチャット、ハイパートレイン、ハイパーレベル、チケット）で構成。

**関連Issue**:

- 親: #2726 ハイパーチャット機能の開発
- Sub: #2773 ハイパートレイン、#2774 ハイパーレベル、#2775 チケット

この計画ファイルの情報だけでは不十分なことがあるので、適宜上記Issueを参照してください

**アイコン**: `messages-square`（lucide）を一貫して使用

---

## フェーズ分割（7段階リリース）

| Phase | 機能                          | 概要                                  | 依存関係  | 状態    |
| ----- | ----------------------------- | ------------------------------------- | --------- | ------- |
| 0     | **既存機能クリーンアップ**    | 応援チケット関連をコメントアウト/削除 | なし      | ✅ 完了 |
| 1     | **MVP: ハイパーチャット基本** | 購入・保存・決済                      | Phase 0   | ✅ 完了 |
| 2     | **表示機能**                  | 吹き出し表示、ローテーション、履歴    | Phase 1   | ✅ 完了 |
| 3     | **エンゲージメント**          | いいね、プリセット、購入導線追加      | Phase 2   |         |
| 4     | **チケット**                  | 無料チケット配布・使用                | Phase 1   |         |
| 5     | **ハイパートレイン**          | 集団応援でトレイン発動                | Phase 1-2 |         |
| 6     | **ハイパーレベル**            | VIP制度、バッジ表示                   | Phase 1   |         |

---

## Phase 0: 既存機能クリーンアップ ✅

### 対象（削除済み）

- 応援チケット関連機能すべて
- ファンランキング
- 応援ランキング
- CheerTicket / CheerTicketUsage 関連のUI・API

### 削除したファイル（主要）

- `web/features/cheer-channel/` - 全体
- `web/features/cheer/` - 全体
- `web/apis/cheer-tickets/` - 全体
- `web/apis/cheer-ticket-usages/` - 全体

---

## Phase 1: MVP ✅

### 機能範囲

- Lite(300円)/Standard(1,000円)/Max(10,000円)の3段階購入
- メッセージ入力（文字数制限: 60/140/300文字）※無言（空メッセージ）も可
- Stripe都度決済（Stripe Elements）
- チャンネル詳細ページに購入ボタン・統計情報を配置
- 基本的な履歴保存

**未実装（将来対応）**: GPTモデレーション + NGワード

### データモデル（Prisma）

```prisma
// backend/prisma/schema/models/hyper-chat.prisma

/**
 * ハイパーチャット注文/決済情報
 * PaymentIntent 作成時に pending で作成され、Webhook で status 更新
 */
model HyperChatOrder {
  id                    Int      @id @default(autoincrement())
  stripePaymentIntentId String   @unique // pi_xxx
  userId                Int
  channelId             String
  group                 String
  gender                String
  tier                  String // "lite", "standard", "max"
  amount                Int // 金額（円）
  message               String
  status                String   @default("pending") // pending, completed, failed
  createdAt             DateTime @default(now()) @db.Timestamptz(3)
  updatedAt             DateTime @updatedAt @db.Timestamptz(3)

  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  hyperChat HyperChat?

  @@index([userId, createdAt])
  @@index([status, createdAt])
}

/**
 * ハイパーチャット（確定済みのみ）
 * User -> VTuber への有料コメント
 * orderId: 購入時は設定、チケット利用時は null
 */
model HyperChat {
  id        Int      @id @default(autoincrement())
  orderId   Int?     @unique // nullable - 購入時のみ設定、チケット利用時は null
  userId    Int
  channelId String
  group     String
  gender    String
  tier      String // "lite", "standard", "max"
  amount    Int // 金額（円）
  message   String
  likeCount Int      @default(0)
  createdAt DateTime @default(now()) @db.Timestamptz(3)

  order HyperChatOrder? @relation(fields: [orderId], references: [id], onDelete: Cascade)
  user  User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  likes HyperChatLike[]

  @@index([channelId, createdAt])
  @@index([userId, createdAt])
}

model HyperChatLike {
  id          Int      @id @default(autoincrement())
  hyperChatId Int
  userId      Int
  createdAt   DateTime @default(now()) @db.Timestamptz(3)

  hyperChat HyperChat @relation(fields: [hyperChatId], references: [id], onDelete: Cascade)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([hyperChatId, userId])
  @@index([userId])
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
├── HyperChat.repository.ts
├── HyperChats.collection.ts
├── HyperChatId.vo.ts
├── Tier.vo.ts           // "lite" | "standard" | "max" + 設定
├── Message.vo.ts        // 文字数制限（300文字以内）
├── LikeCount.vo.ts
├── Status.vo.ts         // 未使用（HyperChatOrder で管理）
└── index.ts

backend/libs/domain/hyper-chat-order/
├── HyperChatOrder.entity.ts
├── HyperChatOrder.repository.ts
├── HyperChatOrderId.vo.ts
├── Amount.vo.ts
├── StripePaymentIntentId.vo.ts
└── index.ts

backend/libs/domain/stripe/
├── StripePaymentId.vo.ts
└── index.ts
```

### API エンドポイント

| Method | Endpoint                                                 | 説明                            | 認証 |
| ------ | -------------------------------------------------------- | ------------------------------- | ---- |
| POST   | `/api/hyper-chats/payment-intent`                        | PaymentIntent作成（Elements用） | 必須 |
| GET    | `/api/hyper-chats/channels/:channelId`                   | チャンネル別履歴                | 任意 |
| GET    | `/api/hyper-chats/channels/:channelId/count`             | 件数取得                        | 任意 |
| GET    | `/api/hyper-chats/channels/:channelId/sum-amount`        | 合計金額取得                    | 任意 |
| GET    | `/api/hyper-chats/channels/:channelId/unique-supporters` | ユニーク投稿者数                | 任意 |
| GET    | `/api/hyper-chats/me`                                    | 自分の送信履歴                  | 必須 |

### Stripe Webhook 拡張

```typescript
// webhooks-stripe.controller.ts に追加
case 'payment_intent.succeeded': {
  const paymentIntent = event.data.object
  const hyperChatOrderId = paymentIntent.metadata?.hyperChatOrderId
  if (hyperChatOrderId) {
    await this.hyperChatsScenario.handlePaymentSuccess({
      hyperChatOrderId: parseInt(hyperChatOrderId, 10),
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
│   └── send/                        # 送信/購入関連
│       ├── HyperChatButton.tsx      # 購入ボタン
│       ├── HyperChatDialog.tsx      # 購入ダイアログ（Stripe Elements統合）
│       ├── HyperChatStats.tsx       # 統計情報表示（総額・応援者数）
│       ├── PaymentForm.tsx          # Stripe PaymentElement ラッパー
│       ├── MessageInput.tsx         # メッセージ入力フィールド
│       └── AnimatedCheckmark.tsx    # 完了アニメーション
└── hooks/
    ├── useHyperChatForm.ts          # フォーム状態管理
    └── useHyperChatMessageSchema.ts # メッセージバリデーション

web/apis/hyper-chats/
├── hyperChatSchema.ts
├── createHyperChatPaymentIntent.ts  # Server Action（Elements用）
├── getHyperChats.ts                 # 履歴・統計取得
└── revalidateHyperChat.ts           # キャッシュ再検証
```

### 購入ボタン配置

**チャンネル詳細ページ Base部**:

- ファイル: `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/profile/ChannelProfile.tsx`
- 応援チケット関連を削除し、「ハイパーチャットを投稿する」ボタンを配置
- 統計情報: 「累計金額」「投稿者数（ユニークユーザー数）」
- Container Query (`@container` + `@2xl:`) でレスポンシブ対応

---

## Phase 2: 表示機能 ✅ 完了

**詳細は `.claude/plans/phase-2.md` を参照**

### 機能範囲

- ランキングページ各行に吹き出し表示（過去24時間のデータ）
- ローテーション表示（Tier優先度ベース、MAXは60分独占）
- チャンネル詳細ページにハイパーチャット履歴タブ追加
- タイムラインSheet内に購入ボタンを配置

**注意**: 「ハイパーチャットランキング」機能は今回スコープ外

### API エンドポイント

| Method | Endpoint                  | 説明                                       |
| ------ | ------------------------- | ------------------------------------------ |
| GET    | `/api/hyper-chats/recent` | 過去24時間のHyperChat（複数channelId対応） |

### ローテーションロジック

```typescript
// web/utils/hyper-chat/rotation.ts
const TIER_PRIORITY = { lite: 1, standard: 4, max: 100 }
const MAX_EXCLUSIVE_MINUTES = 60

// MAXが独占表示中かどうかを判定（投稿から60分以内）
function isMaxExclusive(createdAt: Date): boolean

// 独占表示中のMAXを取得（古い順にソート）
function getExclusiveMaxes(hyperChats: HyperChatSchema[]): HyperChatSchema[]

// ローテーション表示用リスト生成
// 独占MAXがあればそれらのみ、なければTier優先度でソート
function getRotationList(hyperChats: HyperChatSchema[]): HyperChatSchema[]
```

### 吹き出し仕様

- 背景色: lite=水色、standard=黄色、max=赤色（tier-styles.tsで一元管理）
- line-clamp: 2行
- 表示時間: 3秒ごとにフェード切替（embla-carousel-fade使用）
- 1件のみの場合はカルーセル不使用（シンプル描画）
- ユーザー情報表示: アバター、表示名、相対時間
- タップで全ハイパーチャットのタイムラインをSheetで表示
- タイムラインSheetのフッターに購入ボタン配置

### フロントエンド

```
web/components/hyper-chat/
├── send/                            # 送信系（Phase 1から移動）
│   ├── HyperChatButton.tsx
│   ├── HyperChatDialog.tsx
│   ├── HyperChatStats.tsx
│   └── ...
├── timeline/                        # 表示系（Phase 2）
│   ├── HyperChatBubble.tsx          # 吹き出しUI
│   ├── HyperChatRotator.tsx         # ローテーション表示
│   ├── HyperChatTimelineSheet.tsx   # タイムラインSheet + 購入ボタン
│   ├── HyperChatCard.tsx            # 個別カード
│   └── HyperChatHistoryList.tsx     # 履歴ページ用リスト
└── tier-styles.ts                   # Tier別カラー定義

web/utils/hyper-chat/
└── rotation.ts                      # 優先度計算（MAXは60分独占）

web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/hyper-chat/
├── page.tsx
└── _components/
    └── ChannelsIdHyperChatTemplate.tsx
```

**注意**: `components/hyper-chat/` に配置（Lintルールで features間のインポートが禁止されているため）

### 履歴ページ仕様

- 30件/ページのページング
- ソートタブ: 新着順（デフォルト）、金額順（amount DESC → likeCount DESC → createdAt DESC）
- 統計情報表示: 累計金額、投稿者数
- レスポンシブ対応:
  - PC: サイドバーにsticky表示（統計情報 + 購入ボタン）
  - スマホ: ScrollRevealFooter で購入ボタンを固定表示

---

## Phase 3: エンゲージメント機能

### 機能範囲

- いいね機能（1人1回）
- プリセットメッセージ（「尊い...」「神回だった」「おめでとう！」など）
- 購入導線追加（ランキングページ各行）

### API エンドポイント

| Method | Endpoint                    | 説明       |
| ------ | --------------------------- | ---------- |
| POST   | `/api/hyper-chats/:id/like` | いいね     |
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

- 「累計金額」には含めない
- 「投稿者数」には含める
- 吹き出しの「表示権」は有料・無料で差別しない
- 吹き出しやCard上の「金額」部分テキストは「無料チケ」とする（￥300としない）

### API エンドポイント

| Method | Endpoint                      | 説明             |
| ------ | ----------------------------- | ---------------- |
| GET    | `/api/hyper-chat-tickets/me`  | 所持チケット一覧 |
| POST   | `/api/hyper-chat-tickets/use` | チケット使用     |

---

## Phase 5: ハイパートレイン

**詳細仕様は Issue #2773 を参照**

### 機能範囲

- 60分以内に3回のハイパーチャットで発生（3人の協力が必要）
- 無料チケ（Phase 4のチケット）も1回にカウントする
- 10,000円（Max）でソロスタート
- レベル1-10（最大100,000円）
- トップページに大きく表示
- 60分タイマー、レベルアップでリセット
- クールダウン: 終了後1時間は新規トレイン発生しない
- 最大6時間継続

### レベル定義

| Lv. | 必要総金額 | 次のレベルまで |
| --- | ---------- | -------------- |
| 1   | 900        | 2,100          |
| 2   | 3,000      | 3,000          |
| 3   | 6,000      | 4,000          |
| 4   | 10,000     | 5,000          |
| 5   | 15,000     | 15,000         |
| 6   | 30,000     | 15,000         |
| 7   | 45,000     | 15,000         |
| 8   | 60,000     | 20,000         |
| 9   | 80,000     | 20,000         |
| 10  | 100,000    | N/A            |

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

| レベル | 累積金額              | バッジ色         |
| ------ | --------------------- | ---------------- |
| 1      | 2,000 ~ 10,000円      | 銅（Bronze）     |
| 2      | 10,001 ~ 30,000円     | 銀（Silver）     |
| 3      | 30,001 ~ 100,000円    | 金（Gold）       |
| 4      | 100,001 ~ 300,000円   | プラチナ（白金） |
| 5      | 300,001 ~ 1,000,000円 | エメラルド（緑） |
| 守護神 | 1,000,001円~          | レインボー/特殊  |

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

- `backend/prisma/schema/models/hyper-chat.prisma` - スキーマ定義
- `backend/libs/domain/hyper-chat/` - ドメイン層
- `backend/libs/domain/hyper-chat-order/` - 注文ドメイン層
- `backend/libs/application/hyper-chats/` - アプリケーション層
- `backend/libs/application/hyper-chat-orders/` - 注文アプリケーション層
- `backend/libs/infrastructure/hyper-chat/` - インフラ層
- `backend/libs/infrastructure/hyper-chat-order/` - 注文インフラ層
- `backend/apps/closed-api-server/src/presentation/hyper-chats/` - API
- `backend/apps/closed-api-server/src/presentation/webhooks/stripe/webhooks-stripe.controller.ts` - Webhook拡張

### Frontend

- `web/features/hyper-chat/` - feature
- `web/apis/hyper-chats/` - API
- `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/profile/ChannelProfile.tsx` - 購入ボタン追加
- `web/features/channels-ranking/components/table/ChannelsRankingTable.tsx` - 購入導線追加（Phase 3）
- `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/hyper-chat/` - 新規ページ（Phase 2）

---

## 検証方法

### Phase 1 完了時

1. **決済フロー**: Stripe テストモードでLite/Standard/Maxの決済が完了すること
2. **メッセージ保存**: 決済完了後、DBにHyperChatレコードが作成されること
3. **文字数制限**: Tierに応じた文字数制限が機能すること
4. **無言スパチャ**: メッセージなしでも購入できること

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

| リスク                   | 対策                            |
| ------------------------ | ------------------------------- |
| Webhook取りこぼし        | 定期的なセッション照合バッチ    |
| 高負荷時のローテーション | Redisキャッシュ導入（Phase 2）  |
| 不正利用（スパム）       | レートリミット + モデレーション |
| 返金対応                 | Stripeの返金機能活用            |

---

## 備考

- 二次創作ガイドライン、パブリシティ権を尊重しサイト内の表現に注意
- 「VTuber本人・所属事務所への投げ銭ではなく、VChartsのコメント掲載機能の利用料」と明記
- 決済はシンプルに都度決済（クレジット型/サブスク型は考慮せず）
- UIは必要に応じて v0 MCP を活用
