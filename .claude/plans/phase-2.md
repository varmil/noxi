# Phase 2: HyperChat 表示機能 実装計画

## 概要

ランキングページへの吹き出し表示、ローテーション機能、チャンネル詳細ページへの履歴タブを追加する。

**状態**: ✅ 8割完了

---

## 1. フロントエンド構成

### ディレクトリ構造（実装済み）

```
web/components/hyper-chat/           # 表示系（feature横断で使用）
├── HyperChatBubble.tsx              # 吹き出しUI
├── HyperChatRotator.tsx             # ローテーション表示（3秒切替）
├── HyperChatTimelineSheet.tsx       # タイムラインSheet
├── HyperChatCard.tsx                # 履歴カード
├── HyperChatHistoryList.tsx         # 履歴ページ用リスト
└── tier-styles.ts                   # Tier別カラー定義

web/utils/hyper-chat/
└── rotation.ts                      # スロット重み付け計算

web/features/hyper-chat/components/send/  # 送信系（Phase 1、既存）
└── ...
```

**注意**: 表示系コンポーネントは `components/hyper-chat/` に配置。
Lintルール（`import-x/no-restricted-paths`）により features 間のインポートが禁止されているため、
`channels-ranking` feature から使用できるよう `components/` に配置。

### コンポーネント仕様

| コンポーネント | 種別 | 説明 |
|---------------|------|------|
| HyperChatBubble | Client | 吹き出しUI（背景色: lite=水色, standard=黄色, max=赤色）、ユーザー情報・相対時間表示 |
| HyperChatRotator | Client | embla-carousel + Autoplay + Fade、3秒間隔切替、1件のみの場合はカルーセル不使用 |
| HyperChatTimelineSheet | Client | 右側から出現するSheet（PC/モバイル共通） |
| HyperChatCard | Server | 個別メッセージカード |
| HyperChatHistoryList | Server | 30件/ページのリスト表示 |

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
const ROTATION_SLOTS = { lite: 1, standard: 4, max: 60 }

// MAXは60分間独占、経過後はstandard扱い（4スロット）
function isMaxExclusive(createdAt: Date): boolean {
  const diffMinutes = (Date.now() - createdAt.getTime()) / 60000
  return diffMinutes <= 60
}

// 複数MAXがある場合は古い順にローテーション
function getExclusiveMaxes(hyperChats: HyperChatSchema[]): HyperChatSchema[] {
  return hyperChats
    .filter(hc => hc.tier === 'max' && isMaxExclusive(hc.createdAt))
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}
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

## 3. ランキングテーブル統合（実装済み）

### 修正ファイル

`web/features/channels-ranking/components/table/ChannelsRankingTable.tsx`

### 変更内容

1. `getRecentHyperChats()` を Promise.all に追加
2. HyperChatがある場合は2行構成、ない場合は1行のまま

```tsx
{/* 1行目: 既存データ */}
<TableRow className={cn(hyperChats.length > 0 && 'border-none')}>
  {/* 既存のセル */}
</TableRow>

{/* 2行目: HyperChatがある場合のみ表示 */}
{hyperChats.length > 0 && (
  <TableRow>
    <TableCell />
    <TableCell colSpan={5} className="pt-0 pb-2 max-w-0">
      <div className="overflow-hidden">
        <HyperChatTimelineSheet
          hyperChats={hyperChats}
          channelId={channelId}
          group={channel.peakX.group}
        />
      </div>
    </TableCell>
  </TableRow>
)}
```

---

## 4. チャンネル詳細ページ（実装済み）

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

- 30件/ページのページネーション
- ソート:
  - **新着順**（デフォルト）: `createdAt DESC`
  - **金額順**: `amount DESC → likeCount DESC → createdAt DESC`（複合ソート）
- 統計情報表示: 総応援額、応援者数

---

## 5. 翻訳追加（実装済み）

`ja.json` / `en.json` に追加済み

---

## 6. 残タスク

- [ ] ブラッシュアップ（UI調整、UX改善）
- [ ] E2Eテスト追加（skeleton高さ検証など）

---

## 7. Critical Files

| ファイル | 変更内容 |
|---------|---------|
| `web/features/channels-ranking/components/table/ChannelsRankingTable.tsx` | 2行構成で吹き出し表示 |
| `web/components/hyper-chat/HyperChatTimelineSheet.tsx` | タイムラインSheet |
| `web/components/hyper-chat/HyperChatRotator.tsx` | カルーセル表示 |
| `web/components/hyper-chat/HyperChatBubble.tsx` | 吹き出しUI |
| `web/components/hyper-chat/tier-styles.ts` | Tier別カラー定義 |
| `web/utils/hyper-chat/rotation.ts` | ローテーションロジック |
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
