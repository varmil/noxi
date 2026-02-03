# Phase 2: HyperChat 表示機能 実装計画

## 概要

ランキングページへの吹き出し表示、ローテーション機能、チャンネル詳細ページへの履歴タブを追加する。

**状態**: ✅ 完了

---

## 1. フロントエンド構成

### ディレクトリ構造

```
web/components/hyper-chat/
├── send/                            # 送信系（Phase 1から移動）
│   ├── HyperChatButton.tsx          # 購入ボタン
│   ├── HyperChatDialog.tsx          # 購入ダイアログ
│   ├── HyperChatStats.tsx           # 統計情報表示
│   ├── PaymentForm.tsx              # Stripe PaymentElement
│   ├── MessageInput.tsx             # メッセージ入力
│   └── AnimatedCheckmark.tsx        # 完了アニメーション
├── timeline/                        # 表示系（Phase 2）
│   ├── HyperChatBubble.tsx          # 吹き出しUI
│   ├── HyperChatRotator.tsx         # ローテーション表示（3秒切替）
│   ├── HyperChatTimelineSheet.tsx   # タイムラインSheet + 購入ボタン
│   ├── HyperChatCard.tsx            # 個別カード
│   ├── HyperChatMessage.tsx         # メッセージ表示
│   └── HyperChatHistoryList.tsx     # 履歴ページ用リスト
└── tier-styles.ts                   # Tier別カラー定義

web/utils/hyper-chat/
└── rotation.ts                      # 優先度計算（MAXは60分独占）
```

**注意**: `components/hyper-chat/` に配置。
Lintルール（`import-x/no-restricted-paths`）により features 間のインポートが禁止されているため、
`channels-ranking` feature から使用できるよう `components/` に配置。

### コンポーネント仕様

| コンポーネント | 種別 | 説明 |
|---------------|------|------|
| HyperChatBubble | Client | 吹き出しUI（背景色: lite=水色, standard=黄色, max=赤色）、ユーザー情報・相対時間表示 |
| HyperChatRotator | Client | embla-carousel + Autoplay + Fade、3秒間隔切替、1件のみの場合はカルーセル不使用 |
| HyperChatTimelineSheet | Client | 右側から出現するSheet、フッターに HyperChatButton を配置 |
| HyperChatCard | Client | 個別メッセージカード（相対時間表示のため Client Component） |
| HyperChatHistoryList | Server | 履歴ページ用リスト（30件/ページ） |

### tier-styles.ts（カラー定義）

```typescript
export const TIER_BG_COLORS: Record<TierValue, string> = {
  lite: 'bg-cyan-300/70 dark:bg-cyan-800/70',
  standard: 'bg-yellow-300 dark:bg-yellow-800',
  max: 'bg-red-300 dark:bg-red-800'
}

export const TIER_TEXT_MUTED_COLORS: Record<TierValue, string> = {
  lite: 'text-cyan-900 dark:text-cyan-400',
  standard: 'text-yellow-900 dark:text-yellow-300',
  max: 'text-red-900 dark:text-red-300'
}
```

### ローテーションロジック

```typescript
// web/utils/hyper-chat/rotation.ts

/** 各Tierのソート優先度（大きいほど前に表示） */
const TIER_PRIORITY: Record<TierValue, number> = {
  lite: 1,
  standard: 4,
  max: 100
}

/** MAXの独占表示時間（分） */
const MAX_EXCLUSIVE_MINUTES = 60

// MAXが独占表示中かどうかを判定（投稿から60分以内）
function isMaxExclusive(createdAt: Date): boolean {
  const diffMinutes = (Date.now() - createdAt.getTime()) / 60000
  return diffMinutes <= MAX_EXCLUSIVE_MINUTES
}

// 独占表示中のMAXを取得（古い順にソート）
export function getExclusiveMaxes(hyperChats: HyperChatSchema[]): HyperChatSchema[]

// Tier優先度でソート（max > standard > lite、同Tierは新しい順）
export function sortByTierPriority(hyperChats: HyperChatSchema[]): HyperChatSchema[]

// ローテーション表示用リスト生成
// 独占MAXがあればそれらのみ、なければTier優先度でソート
export function getRotationList(hyperChats: HyperChatSchema[]): HyperChatSchema[]
```

---

## 2. バックエンドAPI

### 新規エンドポイント（実装済み）

| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/hyper-chats/recent` | 過去24時間のHyperChat（複数channelId対応） |

**リクエスト例**: `GET /api/hyper-chats/recent?channelIds[]=UC1&channelIds[]=UC2`

**レスポンス**: channelIdをキーとしたオブジェクト、author情報を含む
```json
{
  "UC1": [{
    "id": 1,
    "tier": "max",
    "message": "...",
    "amount": 10000,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "author": { "name": "ユーザー名", "image": "https://..." }
  }],
  "UC2": []
}
```

### 実装ファイル

- `backend/apps/closed-api-server/src/presentation/hyper-chats/dto/GetRecentHyperChats.dto.ts`
- `backend/apps/closed-api-server/src/presentation/hyper-chats/hyper-chats.controller.ts`
- `backend/libs/application/hyper-chats/hyper-chats.service.ts`
- `backend/libs/domain/hyper-chat/HyperChat.entity.ts` - author フィールド追加

---

## 3. ランキングテーブル統合

### 修正ファイル

`web/features/channels-ranking/components/table/ChannelsRankingTable.tsx`

### 変更内容

1. `getRecentHyperChats()` を Promise.all に追加
2. HyperChatがある場合は2行構成、ない場合は1行のまま
3. HyperChatTimelineSheet に `channelTitle` と `gender` を渡す（購入ボタン用）

```tsx
{/* 1行目: 既存データ */}
<TableRow className={cn(hyperChats.length > 0 && 'border-none')}>
  {/* 既存のセル */}
</TableRow>

{/* 2行目: HyperChatがある場合のみ表示 */}
{hyperChats.length > 0 && (
  <TableRow>
    <TableCell />
    <TableCell colSpan={5} width={300} className="pt-0 pb-2 max-w-0">
      <div className="overflow-hidden">
        <HyperChatTimelineSheet
          hyperChats={hyperChats}
          channelId={channelId}
          channelTitle={channel.basicInfo.title}
          group={channel.peakX.group}
          gender={channel.peakX.gender}
        />
      </div>
    </TableCell>
  </TableRow>
)}
```

---

## 4. チャンネル詳細ページ

### ナビゲーション追加

**ファイル**: `web/features/channel/components/local-navigation/LocalNavigationForChannelsIdPages.tsx`

### 新規ページ

```
web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/hyper-chat/
├── page.tsx
└── _components/
    └── ChannelsIdHyperChatTemplate.tsx
```

### ページ機能

- 30件/ページのページネーション（ResponsivePagination使用）
- ソートタブ:
  - **新着順**（デフォルト）: `createdAt DESC`
  - **金額順**: `amount DESC → likeCount DESC → createdAt DESC`（複合ソート）
- 統計情報表示: 総応援額、応援者数（HyperChatStats使用）
- レスポンシブ対応:
  - **PC**: サイドバーにsticky表示（統計情報 + 購入ボタン）
  - **スマホ**: ScrollRevealFooter で購入ボタンを固定表示

---

## 5. 翻訳追加（実装済み）

`ja.json` / `en.json` に追加済み

---

## 6. 残タスク

すべて完了。Phase 3 でブラッシュアップを実施予定。

---

## 7. Critical Files

| ファイル | 変更内容 |
|---------|---------|
| `web/features/channels-ranking/components/table/ChannelsRankingTable.tsx` | 2行構成で吹き出し表示 |
| `web/components/hyper-chat/timeline/HyperChatTimelineSheet.tsx` | タイムラインSheet + 購入ボタン |
| `web/components/hyper-chat/timeline/HyperChatRotator.tsx` | カルーセル表示 |
| `web/components/hyper-chat/timeline/HyperChatBubble.tsx` | 吹き出しUI |
| `web/components/hyper-chat/timeline/HyperChatCard.tsx` | 個別カード |
| `web/components/hyper-chat/timeline/HyperChatHistoryList.tsx` | 履歴ページ用リスト |
| `web/components/hyper-chat/tier-styles.ts` | Tier別カラー定義 |
| `web/utils/hyper-chat/rotation.ts` | ローテーションロジック（優先度ベース） |
| `web/apis/hyper-chats/getRecentHyperChats.ts` | 過去24時間のHyperChat取得 |
| `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/hyper-chat/` | 履歴ページ |
| `backend/apps/closed-api-server/src/presentation/hyper-chats/hyper-chats.controller.ts` | /recent API |

---

## 8. 検証方法

1. **ローテーション表示**: ランキングページで吹き出しが3秒ごとに切り替わること
2. **MAXローテーション**: 10,000円購入後60分間は独占表示、複数MAXは古い順にローテーション
3. **1件のみ**: カルーセルを使わずシンプルに表示されること
4. **タイムライン**: 吹き出しタップで右からSheetが開くこと
5. **履歴ページ**: `/[group]/channels/[id]/hyper-chat` でページネーション動作
6. **条件付き2行表示**: HyperChat有りの行は2行、無しの行は1行で表示

```bash
# テスト実行
cd backend && npm run type-check && npm test
cd web && npm run type-check && npm test
cd e2e && npm test
```
