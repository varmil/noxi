# Phase 5: ハイパートレイン実装計画

## Context

ハイパーチャット機能（Phase 1-4 実装済み）に「ハイパートレイン」を追加する。Twitch のハイプトレインに着想を得た集団応援機能で、一定条件を満たすとトレインが発動しレベルが上昇する。Issue #2773 の仕様に基づく。

**主要仕様**:

- 60分以内に3人のユニークユーザーがHyperChatを送信 → トレイン発動
- 例外: Max(10,000円) はソロ・スタート
- 無料チケットも1アクション/100ptとしてカウント
- レベル1-10（最大100,000pt）、60分タイマー（レベルアップでリセット）
- 最大6時間継続、終了後1時間クールダウン

---

## Sub-Phase 1: Backend - Prisma スキーマ + ドメイン層

### 1.1 Prisma スキーマ

**新規: `backend/prisma/schema/models/hyper-train.prisma`**

```prisma
model HyperTrain {
  id          Int       @id @default(autoincrement())
  channelId   String
  group       String
  level       Int       @default(1)
  totalPoint  Int
  startedAt   DateTime  @db.Timestamptz(3)
  expiresAt   DateTime  @db.Timestamptz(3)
  endedAt     DateTime? @db.Timestamptz(3)

  contributions HyperTrainContribution[]

  @@index([channelId, expiresAt])
  @@index([group, endedAt])
}

model HyperTrainContribution {
  id           Int      @id @default(autoincrement())
  hyperTrainId Int
  hyperChatId  Int      @unique
  userId       Int
  point        Int
  createdAt    DateTime @default(now()) @db.Timestamptz(3)

  hyperTrain HyperTrain @relation(fields: [hyperTrainId], references: [id], onDelete: Cascade)

  @@index([hyperTrainId, createdAt])
}
```

`group` カラムを追加: グループページでのフィルタ用。マイグレーション実行: `npx prisma migrate dev`

### 1.2 Value Objects

**新規ファイル群 `backend/libs/domain/hyper-train/`**:

| ファイル                         | 内容                                       | パターン参考        |
| -------------------------------- | ------------------------------------------ | ------------------- |
| `HyperTrainId.vo.ts`             | `NumberValueObject` 拡張                   | `HyperChatId.vo.ts` |
| `Level.vo.ts`                    | `NumberValueObject`, `@Min(1)`, `@Max(10)` | —                   |
| `TotalPoint.vo.ts`               | `NumberValueObject`, `@Min(0)`             | `Amount.vo.ts`      |
| `Point.vo.ts`                    | Contribution 個別ポイント用                | `Amount.vo.ts`      |
| `HyperTrainContributionId.vo.ts` | `NumberValueObject`                        | —                   |

### 1.3 レベル定義定数

**新規: `backend/libs/domain/hyper-train/level-config.ts`**

```typescript
export const HYPER_TRAIN_LEVEL_THRESHOLDS = [
  { level: 1, requiredPoints: 0 },
  { level: 2, requiredPoints: 1500 },
  { level: 3, requiredPoints: 5000 },
  { level: 4, requiredPoints: 10000 },
  { level: 5, requiredPoints: 15000 },
  { level: 6, requiredPoints: 30000 },
  { level: 7, requiredPoints: 45000 },
  { level: 8, requiredPoints: 60000 },
  { level: 9, requiredPoints: 80000 },
  { level: 10, requiredPoints: 100000 }
] as const

export const MAX_LEVEL = 10
export const TRAIN_DURATION_MINUTES = 60
export const TRAIN_MAX_DURATION_HOURS = 6
export const TRAIN_COOLDOWN_HOURS = 1
export const TRAIN_TRIGGER_UNIQUE_USERS = 3
export const TRAIN_TRIGGER_WINDOW_MINUTES = 60
export const FREE_TICKET_POINT = 100

export function calculateLevel(totalPoint: number): number {
  let level = 1
  for (const t of HYPER_TRAIN_LEVEL_THRESHOLDS) {
    if (totalPoint >= t.requiredPoints) level = t.level
  }
  return level
}
```

### 1.4 Entity + Collection

**新規: `backend/libs/domain/hyper-train/HyperTrainContributor.entity.ts`**

- userId, point, name, image を持つ Entity

**新規: `backend/libs/domain/hyper-train/HyperTrainContributors.collection.ts`**

- `Collection<HyperTrainContributor>` を拡張（配列は Collection クラスで扱う）

**新規: `backend/libs/domain/hyper-train/HyperTrain.entity.ts`**

- `@Transform` デコレータで VO → プリミティブ変換
- `contributors: HyperTrainContributors`（Collection クラス）
- パターン参考: `backend/libs/domain/hyper-chat/HyperChat.entity.ts`

**新規: `backend/libs/domain/hyper-train/HyperTrains.collection.ts`**

### 1.5 Repository Interface

**新規: `backend/libs/domain/hyper-train/HyperTrain.repository.ts`**

汎用 where/orderBy パターンを基本とし、表現できないクエリは特化型関数にする。

**汎用メソッド:**

- `findOne(args: { where: { id?, channelId?, endedAt?, expiresAt? } })` → HyperTrain | null
- `findAll(args: { where: { channelId?, group?, endedAt?, expiresAt? }, orderBy?: [...], limit?, offset? })` → HyperTrains

**特化型メソッド（汎用で表現困難）:**

- `findBestByChannelId(channelId)` → 最高レベルのトレイン（contributors含む、level DESC → totalPoint DESC）
- `countRecentUniqueUsers(channelId, withinMinutes)` → incoming判定（HyperChat テーブルへの DISTINCT クエリ）
- `expireTrains()` → number（期限切れ件数、updateMany）

**更新系メソッド（基本 void 返り値）:**

- `create(...)` → void
- `addContribution(...)` → void
- `update(id, level, totalPoint, expiresAt?)` → void

※ Service 側で作成直後の情報が必要な場合のみ返り値を検討

### 1.6 HyperChat Entity に getPoint() 追加

**修正: `backend/libs/domain/hyper-chat/HyperChat.entity.ts`**

```typescript
import { FREE_TICKET_POINT } from '@domain/hyper-train/level-config'

public getPoint(): number {
  if (this.tier.get() === 'free') return FREE_TICKET_POINT  // 100 - リテラル値は使わず定数参照
  return this.amount.get()  // 1円 = 1pt
}
```

### 1.7 index.ts

**新規: `backend/libs/domain/hyper-train/index.ts`** — 全エクスポート

---

## Sub-Phase 2: Backend - インフラ + App + Presentation

### 2.1 Repository 実装

**新規: `backend/libs/infrastructure/hyper-train/HyperTrainRepositoryImpl.ts`**

- `PrismaInfraService` 注入
- `findBestByChannelId`: level DESC, totalPoint DESC でソート。User JOIN で contributor 情報取得
- `countRecentUniqueUsers`: HyperChat テーブルに対し `SELECT COUNT(DISTINCT "userId")` で過去N分の channelId 指定
- `expireTrains`: `updateMany({ where: { endedAt: null, expiresAt: { lte: now } }, data: { endedAt: now } })`
- パターン参考: `backend/libs/infrastructure/hyper-chat/HyperChatRepositoryImpl.ts`

**新規: `backend/libs/infrastructure/hyper-train/hyper-train.infra.module.ts`**

### 2.2 Application 層

**新規: `backend/libs/application/hyper-trains/hyper-trains.service.ts`**

- Repository メソッドへの単純デリゲーション
- パターン参考: `backend/libs/application/hyper-chats/hyper-chats.service.ts`

**新規: `backend/libs/application/hyper-trains/hyper-train-evaluator.service.ts`**

トレイン発動・貢献・レベルアップのコアロジック:

```
evaluate(hyperChat):
  1. expireTrains() // lazy に期限切れを終了
  2. activeTrain = findOne({ where: { channelId, endedAt: null, expiresAt: { gt: now } } })
  3. if activeTrain → contributeToTrain(train, hyperChat)
  4. else if !cooldown → evaluateNewTrain(hyperChat)

contributeToTrain(train, hyperChat):
  - point = hyperChat.getPoint()  // Entity メソッドでポイント計算
  - addContribution
  - newTotalPoint = train.totalPoint + point
  - newLevel = calculateLevel(newTotalPoint)
  - レベルアップ時: expiresAt リセット（最大6時間制限内）
  - update(id, level, totalPoint, expiresAt?)

evaluateNewTrain(hyperChat):
  - Max tier → ソロスタート
  - それ以外 → countRecentUniqueUsers >= 3 か判定
  - 過去60分の全 HyperChat を初期 contributions として収集
  - 各 HyperChat.getPoint() で initialTotalPoint 計算 → calculateLevel() で初期レベル決定
  - create + addContribution (一括)
```

※ `point` パラメータは不要 — `HyperChat.getPoint()` で都度計算

**新規: `backend/libs/application/hyper-trains/hyper-trains.app.module.ts`**

imports: `HyperTrainInfraModule`, `HyperChatsAppModule`

### 2.3 Presentation 層

**新規: `backend/apps/closed-api-server/src/presentation/hyper-trains/hyper-trains.controller.ts`**

| Method | Endpoint                                     | 説明                                 |
| ------ | -------------------------------------------- | ------------------------------------ |
| GET    | `/hyper-trains/active`                       | アクティブ一覧（`?group=` フィルタ） |
| GET    | `/hyper-trains/channels/:channelId/active`   | チャンネルのアクティブトレイン       |
| GET    | `/hyper-trains/channels/:channelId/best`     | ベストレコード                       |
| GET    | `/hyper-trains/channels/:channelId/incoming` | Incoming状態（uniqueUserCount）      |

**新規: `hyper-trains.scenario.ts`** — Controller とサービス間の調整

**新規: `hyper-trains.presentation.module.ts`**

**修正: `backend/apps/closed-api-server/src/closed-api-server.module.ts`**

- `HyperTrainsPresentationModule` を imports に追加

---

## Sub-Phase 3: 既存 HyperChat フローへの統合

### 3.1 有料決済成功時のトレイン評価

**修正: `backend/apps/closed-api-server/src/presentation/hyper-chats/hyper-chats.scenario.ts`**

- `HyperTrainEvaluatorService` を constructor に注入
- `handlePaymentSuccess()` の HyperChat 作成後に `evaluate(hyperChat)` を呼出
- try-catch で囲み、評価失敗は HyperChat 作成に影響させない

**修正: `backend/apps/closed-api-server/src/presentation/hyper-chats/hyper-chats.presentation.module.ts`**

- imports に `HyperTrainsAppModule` 追加

### 3.2 チケット利用時のトレイン評価

**修正: `backend/apps/closed-api-server/src/presentation/hyper-chat-tickets/hyper-chat-tickets.scenario.ts`**

- `HyperTrainEvaluatorService` を注入
- `useTicket()` の HyperChat 作成後に `evaluate(hyperChat)` を呼出
- 同様に try-catch

**修正: `backend/apps/closed-api-server/src/presentation/hyper-chat-tickets/hyper-chat-tickets.presentation.module.ts`**

- imports に `HyperTrainsAppModule` 追加

---

## Sub-Phase 4: Frontend - API 層 + 共有コンポーネント

### 4.1 API スキーマ + データ取得

**新規: `web/apis/hyper-trains/hyperTrainSchema.ts`**

- `hyperTrainSchema`: id, channelId, group, level, totalPoint, startedAt(string), expiresAt(string), endedAt(string|null), contributors[]
- `contributorSchema`: userId, point, name, image
- Date は `z.string()` で定義（Server → Client シリアライズ制約）

**新規: `web/apis/hyper-trains/getHyperTrains.ts`**

- `getActiveHyperTrains(group?)` — 1分キャッシュ
- `getActiveHyperTrainByChannel(channelId)`
- `getBestHyperTrain(channelId)`
- `getHyperTrainIncomingStatus(channelId)`

### 4.2 レベル定義（フロントエンド用）

**新規: `web/utils/hyper-train/level-config.ts`**

backend と同じ定数をミラー + `getProgressToNextLevel(level, totalPoint)` ユーティリティ

### 4.3 スタイル定義

**新規: `web/components/hyper-train/train-styles.ts`**

レベル別の色定義（bg, text, border）。Lv.1=blue → Lv.10=rainbow グラデーション

### 4.4 共有コンポーネント（`web/components/hyper-train/`）

**配置場所**: `web/components/hyper-train/`（`web/features/hyper-train/` ではない）
**理由**: `web/components/layouts/DefaultLayout.tsx`（ティッカー配置先）は `components/` 配下であり、
ESLint の `import-x/no-restricted-paths` ルールにより `components/` → `features/` のインポートが禁止されているため。
既存の hyper-chat と同じパターン。

| コンポーネント                     | 種別   | 用途                           |
| ---------------------------------- | ------ | ------------------------------ |
| `HyperTrainLevelBadge.tsx`         | Server | レベル数字+色付きバッジ        |
| `HyperTrainProgressBar.tsx`        | Client | 次レベルまでの進捗バー         |
| `HyperTrainTimer.tsx`              | Client | expiresAt カウントダウン       |
| `HyperTrainContributorAvatars.tsx` | Server | avatar 横並び（最大5+N表示）   |
| `HyperTrainCard.tsx`               | Client | 一覧表示用カード（v0 MCP活用） |

---

## Sub-Phase 5: Frontend - グローバルティッカー

**新規: `web/components/hyper-train/ticker/HyperTrainTicker.tsx`** (Server)

- `getActiveHyperTrains()` で全グループのアクティブトレイン取得
- 0件 → DOM なし、1件以上 → `HyperTrainTickerClient` に渡す

**新規: `web/components/hyper-train/ticker/HyperTrainTickerClient.tsx`** (Client)

- 細いバー（h-8程度）: アイコン + チャンネル名 + Lv + pt + 残り時間
- 複数トレインは3秒ごとにローテーション（totalPoint DESC）
- タップ → `/${group}/channels/${channelId}/hyper-chat` へ遷移

**修正: `web/components/layouts/DefaultLayout.tsx`**

- `<Header>` の上に `<Suspense fallback={null}><HyperTrainTicker /></Suspense>` を追加
- スクロールで消える仕様（Header は sticky のまま）

---

## Sub-Phase 6: Frontend - グループページのトレイン一覧

**新規: `web/components/hyper-train/HyperTrainListSection.tsx`** (Server)

- `getActiveHyperTrains(group)` でフィルタ
- 0件 → 何も表示しない
- `HyperTrainCard` でリスト表示（v0 MCP で UI 生成推奨）

**修正: `web/app/[locale]/(end-user)/(default)/[group]/_components/IndexTemplate.tsx`**

- `<ChannelGallery>` の上（最上部）に `<Suspense><HyperTrainListSection /></Suspense>` 追加

---

## Sub-Phase 7: Frontend - チャンネル詳細ページ

### 7.1 Incoming Train インジケーター

**新規: `web/components/hyper-train/incoming/IncomingTrainIndicator.tsx`**

- 3つのランプ（丸）で進捗表示: uniqueUserCount=0→全消灯, 1→1点灯, 2→2点灯
- 0の場合（ハイパーチャットなし）は非表示

### 7.2 Active Train インジケーター

**新規: `web/components/hyper-train/active/ActiveTrainIndicator.tsx`**

- HyperTrainCard ベース: レベル、ポイント、タイマー、contributors

### 7.3 ChannelProfile への統合

**修正: `web/app/.../channels/[id]/_components/ui/profile/ChannelProfile.tsx`**

```tsx
const [group, posterCount, totalAmount, activeTrain] = await Promise.all([
  getGroup(groupId),
  getHyperChatsUniqueSupporters(basicInfo.id),
  getHyperChatsSumAmount(basicInfo.id),
  getActiveHyperTrainByChannel(basicInfo.id) // 追加
])

// JSX: HyperChatStats の上にトレインインジケーター配置
{
  activeTrain ? (
    <ActiveTrainIndicator train={activeTrain} />
  ) : (
    <Suspense fallback={null}>
      <IncomingTrainIndicator channelId={basicInfo.id} />
    </Suspense>
  )
}
```

---

## Sub-Phase 8: Frontend - hyper-train サブページ

### 8.1 ページ + テンプレート

**新規: `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/hyper-train/page.tsx`**

- パターン参考: `hyper-chat/page.tsx`

**新規: `.../hyper-train/_components/ChannelsIdHyperTrainTemplate.tsx`**

- `getBestHyperTrain(channelId)` でベストレコード取得
- null → shadcn Empty コンポーネント表示
- あり → `HyperTrainBestRecord` で表示

### 8.2 ベストレコードコンポーネント

**新規: `web/components/hyper-train/best/HyperTrainBestRecord.tsx`**

表示内容:

- 最大到達レベル（大きなバッジ）
- 参加人数
- 総ポイント（フォーマット表示）
- 発生日時
- 貢献者一覧: Avatar + 名前、ポイント降順（v0 MCP で UI 生成推奨）

### 8.3 ローカルナビゲーション

**修正: `web/features/channel/components/local-navigation/LocalNavigationForChannelsIdPages.tsx`**

- `{ name: t('hyperTrain.nav'), href: \`${basePath}/hyper-train\` }` を hyperChat の後に追加

---

## Sub-Phase 9: i18n

**修正: `web/config/i18n/messages/ja.json` + `en.json`**

追加キー:

- `Features.channel.hyperTrain.nav` — ナビゲーションタブ
- `Features.hyperTrain.ticker.*` — グローバルティッカー
- `Features.hyperTrain.card.*` — カード表示（level, totalPoints, remainingTime, contributors, nextLevel）
- `Features.hyperTrain.incoming.*` — Incoming表示（title, description, lamp）
- `Features.hyperTrain.bestRecord.*` — ベストレコード（title, empty, maxLevel, participants, totalPoints, date, contributorList）
- `Features.hyperTrain.listSection.*` — グループページセクション
- `Page.group.channelsId.hyperTrain.metadata.*` — ページメタデータ

---

## Sub-Phase 10: 検証

### 自動検証

```bash
cd backend && npm run type-check && npm run lint -- --fix && npm test && npm run test:e2e
cd web && npm run type-check && npm run lint -- --fix && npm test
cd e2e && npm test
```

### 手動検証シナリオ

1. **トレイン発動**: 3ユーザーが同一チャンネルに60分以内にHyperChat → トレイン発動
2. **ソロスタート**: Max(10,000円) → 即発動、初期Lv.4（10,000pt）
3. **レベルアップ**: 追加HyperChatでポイント蓄積 → レベル変化+タイマーリセット
4. **クールダウン**: 終了後1時間以内に再発動しないこと
5. **チケット利用**: 無料チケットもカウント(100pt)されること
6. **グローバルティッカー**: 全ページ上部に表示
7. **グループページ**: フィルタ付きアクティブトレイン一覧
8. **チャンネル詳細**: Incoming ランプ ↔ Active 表示の切替
9. **ベストレコード**: `/hyper-train` ページ表示 + Empty 状態

---

## 設計上の重要決定

| 決定                                             | 理由                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------- |
| `HyperTrain` に `group` カラム追加               | グループページフィルタ用。channelId→group の毎回解決は非効率           |
| トレイン評価は try-catch で囲む                  | 課金フローの安定性を最優先。評価失敗でHyperChat作成を止めない          |
| 期限切れは lazy 終了                             | バッチ不要。API 呼出時に `expireTrains()` を実行                       |
| Date は ISO 8601 文字列で Server→Client に渡す   | React のシリアライズ制約                                               |
| `HyperTrainEvaluatorService` は Application 層   | Repository 2つを調整する必要があるため                                 |
| UI は v0 MCP 活用                                | HyperTrainCard, BestRecord 等の複雑な UI は v0 で生成                  |
| Repository は汎用 findOne/findAll + 特化型の混合 | 汎用 where/orderBy で表現可能な範囲は汎用メソッド、DISTINCT 等は特化型 |
| contributors は Collection クラス                | 配列は基本 Collection 継承クラスで扱うプロジェクト規約に従う           |
| 更新系メソッドは基本 void 返り値                 | create/update は void。直後に情報が必要な場合のみ返り値を検討          |
| ポイントは `HyperChat.getPoint()` で計算         | 引数で point を渡さず Entity メソッドで都度計算。リテラル値は定数化    |
| コンポーネントは `web/components/hyper-train/`   | ESLint import 制約で `components/` → `features/` が禁止のため          |

## 重要ファイル一覧

### Backend（新規作成）

- `backend/prisma/schema/models/hyper-train.prisma`
- `backend/libs/domain/hyper-train/` — 全ファイル
- `backend/libs/infrastructure/hyper-train/` — 全ファイル
- `backend/libs/application/hyper-trains/` — 全ファイル
- `backend/apps/closed-api-server/src/presentation/hyper-trains/` — 全ファイル

### Backend（修正）

- `backend/libs/domain/hyper-chat/HyperChat.entity.ts` — getPoint() 追加
- `backend/apps/closed-api-server/src/presentation/hyper-chats/hyper-chats.scenario.ts` — evaluate() 呼出追加
- `backend/apps/closed-api-server/src/presentation/hyper-chats/hyper-chats.presentation.module.ts` — module import 追加
- `backend/apps/closed-api-server/src/presentation/hyper-chat-tickets/hyper-chat-tickets.scenario.ts` — evaluate() 呼出追加
- `backend/apps/closed-api-server/src/presentation/hyper-chat-tickets/hyper-chat-tickets.presentation.module.ts` — module import 追加
- `backend/apps/closed-api-server/src/closed-api-server.module.ts` — module 登録

### Frontend（新規作成）

- `web/apis/hyper-trains/` — スキーマ + データ取得
- `web/utils/hyper-train/level-config.ts`
- `web/components/hyper-train/` — 全コンポーネント
- `web/app/.../channels/[id]/hyper-train/` — ページ + テンプレート

### Frontend（修正）

- `web/components/layouts/DefaultLayout.tsx` — ティッカー追加
- `web/app/.../[group]/_components/IndexTemplate.tsx` — トレイン一覧セクション追加
- `web/app/.../channels/[id]/_components/ui/profile/ChannelProfile.tsx` — インジケーター追加
- `web/features/channel/components/local-navigation/LocalNavigationForChannelsIdPages.tsx` — タブ追加
- `web/config/i18n/messages/ja.json` + `en.json` — i18n キー追加
