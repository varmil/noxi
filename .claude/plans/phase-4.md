# Phase 4: ハイパーチャットチケット機能 実装計画

## 概要

無料チケットの配布・使用機能を実装し、HyperChatDialog でチケット利用によるハイパーチャット投稿を可能にする。

**親計画**: `.claude/plans/hyper-chat-implementation.md`

---

## 機能要件

- 30日間有効期限付き無料チケット
- 配布タイミング:
  - リリース時: 全ユーザーに7枚（直SQL）
  - 新規登録時: 3枚（normalizedEmail で重複判定）
  - ログインボーナス: 3日ごとに1枚
- HyperChatDialog でチケット利用による投稿が可能
- 'free' を4つ目の Tier として追加

---

## 実装順序

| Step | 作業内容                       | 依存関係 |
| ---- | ------------------------------ | -------- |
| 1    | Prisma スキーマ追加            | なし     |
| 2    | Backend Domain 層              | Step 1   |
| 3    | Backend Infrastructure 層      | Step 2   |
| 4    | Backend Application 層         | Step 3   |
| 5    | Backend Presentation 層        | Step 4   |
| 6    | Frontend Schema/API            | Step 5   |
| 7    | Frontend UI（Dialog, Card 等） | Step 6   |
| 8    | 新規登録時配布ロジック         | Step 5   |
| 9    | ログインボーナス配布           | Step 5   |
| 10   | リリース時配布 SQL             | Step 1   |

---

## Step 1: Prisma スキーマ

### 変更ファイル

- `backend/prisma/schema/models/hyper-chat-ticket.prisma`（新規）
- `backend/prisma/schema/models/hyper-chat.prisma`（ticketId 追加）

### HyperChatTicket モデル

```prisma
// backend/prisma/schema/models/hyper-chat-ticket.prisma
model HyperChatTicket {
  id         Int       @id @default(autoincrement())
  userId     Int
  expiresAt  DateTime  @db.Timestamptz(3)
  usedAt     DateTime? @db.Timestamptz(3)
  sourceType String    // "release", "signup", "loginBonus"
  createdAt  DateTime  @default(now()) @db.Timestamptz(3)

  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  hyperChat HyperChat?

  @@index([userId, expiresAt, usedAt])
}

/**
 * ハイパーチャットチケットのログインボーナス進捗
 * 3日ログインでチケット1枚付与、その後カウントリセット
 */
model HyperChatTicketProgress {
  userId        Int      @id
  count         Int      @default(0) // 0, 1, 2 → 3でチケット付与して0にリセット
  lastLoginKey  String   // 最後にカウントした日付キー（JST 5時基準の "yyyy-mm-dd"）
  updatedAt     DateTime @updatedAt @db.Timestamptz(3)

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### HyperChat モデル変更

```prisma
model HyperChat {
  // 既存フィールド...
  ticketId  Int?     @unique  // チケット利用時のみ
  tier      String // "free", "lite", "standard", "max"

  ticket    HyperChatTicket? @relation(fields: [ticketId], references: [id])
}
```

---

## Step 2: Backend Domain 層

### 新規ディレクトリ構造

```
backend/libs/domain/hyper-chat-ticket/
├── HyperChatTicket.entity.ts
├── HyperChatTicket.repository.ts
├── HyperChatTickets.collection.ts
├── HyperChatTicketId.vo.ts
├── SourceType.vo.ts
└── index.ts

backend/libs/domain/hyper-chat-ticket-progress/
├── HyperChatTicketProgress.repository.ts
├── Granted.vo.ts       // boolean VO
├── LoginCount.vo.ts    // 0, 1, 2 のカウント値
└── index.ts
// NOTE: Entity は YAGNI（Repository 内で Prisma を直接操作し、VO で返却するため不要）
```

### Tier.vo.ts 変更

```typescript
// backend/libs/domain/hyper-chat/Tier.vo.ts
export const TIERS = ['free', 'lite', 'standard', 'max'] as const

export const TIER_CONFIG = {
  free: { price: 0, maxChars: 60 },
  lite: { price: 300, maxChars: 60 },
  standard: { price: 1000, maxChars: 140 },
  max: { price: 10000, maxChars: 300 }
} as const
```

### HyperChatTicket Entity

```typescript
export class HyperChatTicket {
  public readonly id: HyperChatTicketId
  public readonly userId: UserId
  public readonly expiresAt: Date
  public readonly usedAt: Date | null
  public readonly sourceType: SourceType
  public readonly createdAt: Date

  isValid(): boolean {
    return this.usedAt === null && this.expiresAt > new Date()
  }
}
```

### HyperChatTicketProgress VO

```typescript
// backend/libs/domain/hyper-chat-ticket-progress/Granted.vo.ts
export class Granted extends BooleanValueObject {}

// backend/libs/domain/hyper-chat-ticket-progress/LoginCount.vo.ts
export class LoginCount extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
```

### Repository Interface

```typescript
export interface HyperChatTicketRepository {
  findValidByUserId(userId: UserId): Promise<HyperChatTickets>
  useTicket(args: UseTicketArgs): Promise<HyperChat>
  // NOTE: 新規登録時配布は web/lib/auth/init で直接 SQL 実行のため Backend には含めない
}

// ログインボーナス進捗用の別リポジトリ
export interface HyperChatTicketProgressRepository {
  /** ログイン記録＆チケット付与（3日カウントで1枚） */
  recordLoginAndGrantIfEligible(args: {
    where: { userId: UserId }
  }): Promise<{ granted: Granted; currentCount: LoginCount }>
}
```

---

## Step 3: Backend Infrastructure 層

### 新規ファイル

- `backend/libs/infrastructure/hyper-chat-ticket/HyperChatTicket.repository-impl.ts`
- `backend/libs/infrastructure/hyper-chat-ticket/hyper-chat-ticket.module.ts`
- `backend/libs/infrastructure/hyper-chat-ticket-progress/HyperChatTicketProgress.repository-impl.ts`
- `backend/libs/infrastructure/hyper-chat-ticket-progress/hyper-chat-ticket-progress.module.ts`

### useTicket 実装（トランザクション）

```typescript
async useTicket(args): Promise<HyperChat> {
  return await this.prisma.$transaction(async tx => {
    // 1. SELECT FOR UPDATE でチケットロック
    // 2. 有効性確認（usedAt == null && expiresAt > now）
    // 3. チケット使用済みに更新
    // 4. HyperChat 作成（tier: 'free', amount: 0, ticketId 設定）
  })
}
```

### 3日カウント式ログインボーナス実装

```typescript
// HyperChatTicketProgress.repository-impl.ts

// JST 5時基準の日付キーを取得（既存 LoginBonus.entity.ts と同じロジック）
private getJst5amDayKey(date: Date): string {
  const JST_OFFSET_MINUTES = 9 * 60
  const jstTime = new Date(date.getTime() + JST_OFFSET_MINUTES * 60 * 1000)
  const year = jstTime.getFullYear()
  const month = jstTime.getMonth()
  const day = jstTime.getDate()
  const hour = jstTime.getHours()
  const adjustedDate = hour < 5
    ? new Date(Date.UTC(year, month, day - 1, 0, 0, 0))
    : new Date(Date.UTC(year, month, day, 0, 0, 0))
  return adjustedDate.toISOString().split('T')[0]
}

async recordLoginAndGrantIfEligible(userId: UserId): Promise<{
  granted: boolean
  currentCount: number
}> {
  const todayKey = this.getJst5amDayKey(new Date())

  return await this.prisma.$transaction(async tx => {
    // 1. upsert で進捗を取得 or 作成
    const progress = await tx.hyperChatTicketProgress.upsert({
      where: { userId: userId.get() },
      create: {
        userId: userId.get(),
        count: 1,
        lastLoginKey: todayKey
      },
      update: {} // 何も更新しない（既存なら SELECT）
    })

    // 2. 同じ日付キーなら何もしない（1日1回のみカウント）
    if (progress.lastLoginKey === todayKey) {
      return { granted: false, currentCount: progress.count }
    }

    // 3. カウントを +1
    const newCount = progress.count + 1

    if (newCount >= 3) {
      // 4a. 3に達したらチケット付与＆カウントリセット
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      await tx.hyperChatTicket.create({
        data: {
          userId: userId.get(),
          expiresAt,
          sourceType: 'loginBonus'
        }
      })
      await tx.hyperChatTicketProgress.update({
        where: { userId: userId.get() },
        data: { count: 0, lastLoginKey: todayKey }
      })
      return { granted: true, currentCount: 0 }
    } else {
      // 4b. カウント更新のみ
      await tx.hyperChatTicketProgress.update({
        where: { userId: userId.get() },
        data: { count: newCount, lastLoginKey: todayKey }
      })
      return { granted: false, currentCount: newCount }
    }
  })
}
```

---

## Step 4: Backend Application 層

### 新規ファイル

- `backend/libs/application/hyper-chat-tickets/hyper-chat-tickets.service.ts`
- `backend/libs/application/hyper-chat-tickets/hyper-chat-tickets.module.ts`
- `backend/libs/application/hyper-chat-ticket-progress/hyper-chat-ticket-progress.service.ts`
- `backend/libs/application/hyper-chat-ticket-progress/hyper-chat-ticket-progress.module.ts`

### HyperChatTicketsService

```typescript
@Injectable()
export class HyperChatTicketsService {
  findValidByUserId(userId: UserId): Promise<HyperChatTickets>
  useTicket(args: UseTicketArgs): Promise<HyperChat>
  // NOTE: grantSignupBonus は不要（web/lib/auth/init で直接 SQL 実行）
}
```

### HyperChatTicketProgressService

```typescript
@Injectable()
export class HyperChatTicketProgressService {
  /** ログイン記録＆チケット付与（3日カウントで1枚） */
  recordLoginAndGrantIfEligible(
    args: Parameters<
      HyperChatTicketProgressRepository['recordLoginAndGrantIfEligible']
    >[0]
  ): Promise<{ granted: Granted; currentCount: LoginCount }>
}
```

---

## Step 5: Backend Presentation 層

### 新規ファイル

- `backend/apps/closed-api-server/src/presentation/hyper-chat-tickets/hyper-chat-tickets.controller.ts`
- `backend/apps/closed-api-server/src/presentation/hyper-chat-tickets/hyper-chat-tickets.scenario.ts`
- `backend/apps/closed-api-server/src/presentation/hyper-chat-tickets/dto/UseHyperChatTicket.dto.ts`

### API エンドポイント

| Method | Endpoint                           | 説明                 |
| ------ | ---------------------------------- | -------------------- |
| GET    | `/api/hyper-chat-tickets/me`       | 有効なチケット一覧   |
| POST   | `/api/hyper-chat-tickets/use`      | チケット使用         |
| POST   | `/api/hyper-chat-tickets/progress` | ログインボーナス請求 |

### UseHyperChatTicket.dto.ts

```typescript
export class UseHyperChatTicketDto {
  @IsInt()
  ticketId: number

  @IsNotEmpty()
  channelId: string

  @IsString()
  group: string

  @IsIn(GenderStrings)
  gender: GenderString

  @IsString()
  @MaxLength(60)
  message: string
}
```

---

## Step 6: Frontend Schema/API

### 変更ファイル

- `web/apis/hyper-chats/hyperChatSchema.ts` - TIERS に 'free' 追加
- `web/apis/hyper-chat-tickets/` - 新規ディレクトリ

### hyperChatSchema.ts 変更

```typescript
export const TIERS = ['free', 'lite', 'standard', 'max'] as const

export const TIER_CONFIG = {
  free: { price: 0, maxChars: 60 },
  lite: { price: 300, maxChars: 60 },
  standard: { price: 1000, maxChars: 140 },
  max: { price: 10000, maxChars: 300 }
} as const
```

### 新規 API ファイル

```
web/apis/hyper-chat-tickets/
├── hyperChatTicketSchema.ts
├── getMyTickets.ts          // Server Action
├── useTicket.ts             // Server Action
└── recordLoginProgress.ts       // Server Action
```

---

## Step 7: Frontend UI

### 変更ファイル

1. `web/components/hyper-chat/tier-styles.ts` - free スタイル追加
2. `web/components/hyper-chat/post/HyperChatDialog.tsx` - チケット使用フロー
3. `web/components/hyper-chat/timeline/HyperChatCard.tsx` - 金額表示変更

### tier-styles.ts 変更

```typescript
export const TIER_BG_COLORS: Record<TierValue, string> = {
  free: 'bg-gray-300/70 dark:bg-gray-700/70',
  lite: 'bg-cyan-300/70 dark:bg-cyan-800/70',
  standard: 'bg-yellow-300 dark:bg-yellow-800',
  max: 'bg-red-600 dark:bg-red-800'
}
// 他のスタイルも同様に free を追加
```

### HyperChatDialog の状態遷移

```
現在: input → payment → complete

変更後:
- チケットあり: input → complete
- チケットなし: input → payment → complete
```

### HyperChatDialog UI 変更点

**優先度**: 有料購入がメイン、チケット利用はサブ

- 現行の Tier 選択 + 決済フローをメインで維持
- チケット所持時のみ「無料チケットで投稿（残り N 枚）」オプションを追加
- 有料のほうが目立つ・わかりやすいレイアウト

**NOTE**: 具体的な UI 配置は実装時に v0 MCP で複数パターン生成して選定

### HyperChatCard 金額表示

```typescript
// amount が 0 の場合は「無料チケ」と表示
const amountDisplay =
  hyperChat.amount === 0
    ? t('card.freeTicket')
    : `￥${hyperChat.amount.toLocaleString()}`
```

---

## Step 8: 新規登録時配布

### 変更ファイル

- `web/lib/auth/onSignUp.ts`
- `web/lib/auth/init/initHyperChatTickets.ts`（新規）

### 実装

```typescript
// web/lib/auth/init/initHyperChatTickets.ts
export async function initHyperChatTickets(
  pool: Pool,
  userId: string,
  normalizedEmail: string
) {
  // 1. 同じ normalizedEmail で signup ボーナス受領済みかチェック
  const existing = await pool.query(
    `SELECT 1 FROM "HyperChatTicket" t
     JOIN "users" u ON t."userId" = u.id
     WHERE u."normalizedEmail" = $1 AND t."sourceType" = 'signup'
     LIMIT 1`,
    [normalizedEmail]
  )

  if (existing.rows.length > 0) return // 既存ユーザー

  // 2. 30日後の有効期限で3枚配布
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  await pool.query(
    `INSERT INTO "HyperChatTicket" ("userId", "expiresAt", "sourceType")
     SELECT $1, $2, 'signup' FROM generate_series(1, 3)`,
    [userId, expiresAt.toISOString()]
  )
}
```

### onSignUp.ts 変更

```typescript
await Promise.all([
  initUsername(pool, id),
  email && initHyperChatTickets(pool, id, normalizeEmail(email)),
  email && resend.emails.send(...)
])
```

---

## Step 9: ログインボーナス配布（3日カウント式）

### 仕様

- ログインするとカウント +1（JST 5時基準で1日1回）
- カウントが 3 に達するとチケット 1 枚付与
- 付与後、カウントは 0 にリセット

### 呼び出しタイミング

- 既存の DailyLoginBonus と同じフローで呼び出し
- ※ DailyLoginBonus は古い応援機能の残留コードなので、参考程度に
- ログインボーナスダイアログとして下記の進捗表示＆grantedしたなら追加で「チケット獲得」の旨も表示
- 進捗や獲得がユーザーにわかりやすいようにアニメーションを活用

### API レスポンス

```typescript
// POST /api/hyper-chat-tickets/progress
{
  granted: boolean // チケットが付与されたか
  currentCount: number // 現在のカウント（0, 1, 2）
}
```

### UI での進捗表示（オプション）

```typescript
// 例: "ログインボーナス: 2/3日"
const { currentCount } = await recordLoginProgress()
// currentCount: 0 → "あと3日"
// currentCount: 1 → "あと2日"
// currentCount: 2 → "あと1日"
```

**NOTE**: 具体的な UI 配置は実装時に v0 MCP で複数パターン生成して選定

---

## Step 10: リリース時配布 SQL

### マイグレーションファイル

```sql
-- 全アクティブユーザーに7枚配布
INSERT INTO "HyperChatTicket" ("userId", "expiresAt", "sourceType", "createdAt")
SELECT
  u.id,
  NOW() + INTERVAL '30 days',
  'release',
  NOW()
FROM "users" u
CROSS JOIN generate_series(1, 7);
```

---

## i18n 翻訳キー追加

### ja.json

```json
{
  "Features": {
    "hyperChat": {
      "dialog": {
        "tier": {
          "free": "無料"
        },
        "useTicket": "無料チケットで投稿"
      },
      "card": {
        "freeTicket": "無料チケ"
      }
    }
  }
}
```

### en.json

```json
{
  "Features": {
    "hyperChat": {
      "dialog": {
        "tier": {
          "free": "Free"
        },
        "useTicket": "Post with Free Ticket"
      },
      "card": {
        "freeTicket": "Free Ticket"
      }
    }
  }
}
```

---

## 検証方法

### ユニットテスト

```bash
cd backend && npm test
cd web && npm test
```

### 手動検証

1. **チケット配布**: 新規登録後に GET /api/hyper-chat-tickets/me で3枚確認
2. **チケット使用**: HyperChatDialog でチケット使用→HyperChat 作成確認
3. **UI表示**: HyperChatCard で「無料チケ」表示確認
4. **ログインボーナス**: 3日経過後に1枚付与確認

### E2E テスト

```bash
cd e2e && npm test
```

---

## Critical Files（変更対象一覧）

### Backend（新規）

- `backend/prisma/schema/models/hyper-chat-ticket.prisma`（HyperChatTicket + HyperChatTicketProgress）
- `backend/libs/domain/hyper-chat-ticket/*`
- `backend/libs/domain/hyper-chat-ticket-progress/*`
- `backend/libs/infrastructure/hyper-chat-ticket/*`
- `backend/libs/infrastructure/hyper-chat-ticket-progress/*`
- `backend/libs/application/hyper-chat-tickets/*`
- `backend/libs/application/hyper-chat-ticket-progress/*`
- `backend/apps/closed-api-server/src/presentation/hyper-chat-tickets/*`

### Backend（変更）

- `backend/prisma/schema/models/hyper-chat.prisma` - ticketId 追加
- `backend/libs/domain/hyper-chat/Tier.vo.ts` - 'free' tier 追加

### Frontend（新規）

- `web/apis/hyper-chat-tickets/*`
- `web/lib/auth/init/initHyperChatTickets.ts`

### Frontend（変更）

- `web/apis/hyper-chats/hyperChatSchema.ts` - 'free' tier 追加
- `web/components/hyper-chat/tier-styles.ts` - free スタイル追加
- `web/components/hyper-chat/post/HyperChatDialog.tsx` - チケット使用フロー
- `web/components/hyper-chat/timeline/HyperChatCard.tsx` - 金額表示
- `web/lib/auth/onSignUp.ts` - チケット配布呼び出し
- `web/config/i18n/messages/ja.json` - 翻訳追加
- `web/config/i18n/messages/en.json` - 翻訳追加
