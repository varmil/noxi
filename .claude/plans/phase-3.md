# Phase 3: エンゲージメント機能 実装計画

## 概要

Phase 3では以下の2機能を実装した：
1. **いいね機能** - HyperChatへの「いいね」（1人1回）
2. **購入導線追加** - ランキングテーブルからの直接投稿

※ プリセットメッセージは検討の結果、実装しないことになった

---

## 1. いいね機能

### 1.1 バックエンド

#### Domain層（新規作成）

**`backend/libs/domain/hyper-chat-like/`**
```
├── index.ts
├── HyperChatLike.entity.ts
├── HyperChatLikeId.vo.ts
└── HyperChatLike.repository.ts
```

Repository Interface:
```typescript
export interface HyperChatLikeRepository {
  create: (args: { hyperChatId: HyperChatId; userId: UserId }) => Promise<void>
  delete: (args: { hyperChatId: HyperChatId; userId: UserId }) => Promise<void>
  findLikedHyperChatIds: (args: { hyperChatIds: HyperChatId[]; userId: UserId }) => Promise<Set<HyperChatId>>
}
```

#### Infrastructure層（新規作成）

**`backend/libs/infrastructure/hyper-chat-like/HyperChatLike.repository-impl.ts`**

- `create`: トランザクションで `HyperChatLike` 作成 + `HyperChat.likeCount` インクリメント
- `delete`: トランザクションで削除 + デクリメント
- `findLikedHyperChatIds`: 複数IDに対してユーザーのいいね状態を一括取得

#### Application層

**`backend/libs/application/hyper-chat-likes/hyper-chat-likes.service.ts`**

Repository を inject し、メソッドを委譲するシンプルなサービス。

#### Presentation層

**`backend/apps/closed-api-server/src/presentation/hyper-chats/hyper-chats.controller.ts` に追加**

```typescript
POST   /hyper-chats/:id/like      # いいね登録（JwtAuthGuard）
DELETE /hyper-chats/:id/like      # いいね解除（JwtAuthGuard）
GET    /hyper-chats/liked-ids     # いいね済みID一括取得（?ids=1,2,3）
```

### 1.2 フロントエンド

#### API（Server Actions）

**`web/apis/hyper-chat-likes/`**
```
├── likeHyperChat.ts
├── unlikeHyperChat.ts
└── getLikedHyperChatIds.ts
```

```typescript
// likeHyperChat.ts - channelId でキャッシュ再検証
'use server'
export async function likeHyperChat(hyperChatId: number, channelId: string): Promise<void>

// unlikeHyperChat.ts - channelId でキャッシュ再検証
'use server'
export async function unlikeHyperChat(hyperChatId: number, channelId: string): Promise<void>

// getLikedHyperChatIds.ts
'use server'
export async function getLikedHyperChatIds(ids: number[]): Promise<Set<number>>
```

**キャッシュ再検証**: `revalidateTag(getHyperChatTag(channelId))` を使用して、いいね後にHyperChatデータを再取得する。

#### HyperChatCard の更新

**`web/components/hyper-chat/timeline/HyperChatCard.tsx`**

Props 追加:
```typescript
interface Props {
  hyperChat: HyperChatSchema
  isLiked?: boolean           // いいね状態
  className?: string
}
```

UI追加: **メッセージの下**に Heart アイコンボタン + likeCount 表示（YouTubeコメントの高評価ボタンと同様の配置）

#### いいねボタンコンポーネント（新規）

**`web/components/hyper-chat/timeline/HyperChatLikeButton.tsx`**

```typescript
type Props = {
  hyperChatId: number
  channelId: string    // キャッシュ再検証用
  tier: TierValue      // アクティブ時の色に使用
  likeCount: number
  isLiked: boolean
  className?: string
}
```

- Client Component (`'use client'`)
- Optimistic UI: クリック時に即座にUI更新、Server Action完了後に確定
- 未ログイン時は AuthModal を表示
- アクティブ時の色は `TIER_TEXT_COLORS[tier]` を使用

#### いいね状態の取得パターン

Server Component で一括取得してClient Componentに渡す:
```tsx
// Server Component
const hyperChats = await getHyperChats(channelId, ...)
const likedIds = session ? await getLikedHyperChatIds(hyperChats.map(h => h.id)) : new Set()

// Client Componentに渡す
<HyperChatList hyperChats={hyperChats} likedIds={likedIds} />
```

---

## 2. 購入導線追加

### 2.1 設計

ランキングテーブル（Server Component）の各行に購入ボタンを追加。
ボタンはClient Componentとして切り出す。

### 2.2 実装

#### HyperChatDialogTrigger（新規）

**`web/features/channels-ranking/components/table/HyperChatDialogTrigger.tsx`**

```typescript
'use client'

interface Props {
  channelId: string
  channelTitle: string
  group: string
  gender: 'male' | 'female' | 'nonbinary'
}

export function HyperChatDialogTrigger(props: Props) {
  const { data: session } = useSession()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const handleClick = () => {
    if (!session) {
      setAuthModalOpen(true)
      return
    }
    setDialogOpen(true)
  }

  return (
    <>
      <Button variant="outline" size="icon" className="size-8" onClick={handleClick}>
        <MessagesSquare className="size-4" />
      </Button>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      <HyperChatDialog open={dialogOpen} onOpenChange={setDialogOpen} {...props} />
    </>
  )
}
```

※ Tooltipなしのシンプルなボタン。未ログイン時はAuthModalを表示。

#### ChannelsRankingTable の更新

**`web/features/channels-ranking/components/table/ChannelsRankingTable.tsx`**

- HyperChatDialogTrigger を既存のセルの前に追加（ChevronRightは残す）
- likedIds を取得して HyperChatTimelineSheet に渡す

```tsx
{/* HyperChat投稿ボタン */}
<TableCell className="w-10 @3xl:hidden">
  <HyperChatDialogTrigger
    channelId={channelId}
    channelTitle={channel.basicInfo.title}
    group={channel.peakX.group}
    gender={channel.peakX.gender}
  />
</TableCell>
```

---

## 3. 実装順序

### Step 1: バックエンド - いいね機能 ✅
1. `backend/libs/domain/hyper-chat-like/` - Entity, VO, Repository Interface
2. `backend/libs/infrastructure/hyper-chat-like/` - Repository Implementation
3. `backend/libs/application/hyper-chat-likes/` - Service
4. `backend/apps/closed-api-server/src/presentation/hyper-chats/` - Controller追加
5. Module登録（HyperChatLikesModule）

### Step 2: フロントエンド - いいね機能 ✅
1. `web/apis/hyper-chat-likes/` - 新規ディレクトリ + Server Actions
2. `web/components/hyper-chat/timeline/HyperChatLikeButton.tsx` - 新規作成
3. `web/components/hyper-chat/timeline/HyperChatCard.tsx` - いいねボタン統合（メッセージ下に配置）
4. `web/app/.../hyper-chat/` - いいね状態取得を追加

### Step 3: 購入導線 ✅
1. `web/features/channels-ranking/components/table/HyperChatDialogTrigger.tsx` - 新規作成
2. `web/features/channels-ranking/components/table/ChannelsRankingTable.tsx` - HyperChatDialogTrigger配置 + likedIds取得

### Step 4: テスト・検証 ✅
1. 型チェック、Lint、ユニットテスト
2. E2Eテスト

---

## 4. Critical Files

### Backend（変更/新規）
- `backend/libs/domain/hyper-chat-like/` (新規)
- `backend/libs/infrastructure/hyper-chat-like/` (新規)
- `backend/libs/application/hyper-chat-likes/` (新規)
- `backend/apps/closed-api-server/src/presentation/hyper-chats/hyper-chats.controller.ts` (追加)

### Frontend（変更/新規）
- `web/apis/hyper-chat-likes/` (新規ディレクトリ)
  - `likeHyperChat.ts` - channelIdパラメータ追加
  - `unlikeHyperChat.ts` - channelIdパラメータ追加
  - `getLikedHyperChatIds.ts`
- `web/components/hyper-chat/timeline/HyperChatLikeButton.tsx` (新規) - channelId, tier props
- `web/components/hyper-chat/timeline/HyperChatCard.tsx` (変更) - いいねボタンをメッセージ下に配置
- `web/features/channels-ranking/components/table/HyperChatDialogTrigger.tsx` (新規) - Tooltipなし
- `web/features/channels-ranking/components/table/ChannelsRankingTable.tsx` (変更) - likedIds取得追加

### 参考（既存パターン）
- `backend/libs/domain/hyper-chat/HyperChat.repository.ts` - Repository Interface例
- `backend/libs/infrastructure/hyper-chat/HyperChat.repository-impl.ts` - Implementation例
- `web/components/hyper-chat/post/HyperChatButton.tsx` - ボタン+ダイアログパターン

---

## 5. 検証方法

### 5.1 いいね機能
```bash
# バックエンドテスト
cd backend && npm test -- --grep "HyperChatLike"

# API動作確認
curl -X POST http://localhost:3000/api/hyper-chats/1/like -H "Authorization: Bearer xxx"
```

### 5.2 フロントエンド
```bash
# 型チェック
cd web && npm run type-check

# Lintチェック
cd web && npm run lint

# ユニットテスト
cd web && npm test
```

### 5.3 E2Eテスト
```bash
cd e2e && npm test
```

### 5.4 手動検証
1. ハイパーチャット履歴ページでいいねボタンをクリック
2. 未ログイン時に認証モーダルが表示されることを確認
3. いいね後にカウントが増加することを確認
4. ランキングページからハイパーチャットダイアログが開くことを確認
