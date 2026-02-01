# Phase 2: HyperChat 表示機能 実装計画

## 概要

ランキングページへの吹き出し表示、ローテーション機能、チャンネル詳細ページへの履歴タブを追加する。

---

## 1. フロントエンド構成

### ディレクトリ構造

```
web/features/hyper-chat/
├── components/
│   ├── send/                          # Phase 1（既存）
│   └── timeline/                      # Phase 2（新規）
│       ├── HyperChatBubble.tsx        # 吹き出しUI
│       ├── HyperChatRotator.tsx       # ローテーション表示（5秒切替）
│       ├── HyperChatTimelineSheet.tsx # タイムラインSheet（右から出現）
│       ├── HyperChatCard.tsx          # 履歴カード
│       └── HyperChatHistoryList.tsx   # 履歴ページ用リスト
├── hooks/
│   └── useHyperChatRotation.ts        # ローテーションロジック（新規）
└── utils/
    └── rotation.ts                    # スロット重み付け計算
```

### コンポーネント仕様

| コンポーネント | 種別 | 説明 |
|---------------|------|------|
| HyperChatBubble | Client | 吹き出しUI（背景色: lite=水色, standard=黄色, max=赤色） |
| HyperChatRotator | Client | embla-carousel + Autoplay、5秒間隔フェード切替 |
| HyperChatTimelineSheet | Client | 右側から出現するSheet（PC/モバイル共通） |
| HyperChatCard | Server | 個別メッセージカード |
| HyperChatHistoryList | Server | 30件/ページのリスト表示 |

### HyperChatTimelineSheet仕様

- PC/モバイル共通で `Sheet` を使用（`side="right"`）
- 画面右側から出現
- 過去24時間のHyperChatをタイムライン形式で表示

### ローテーションロジック

```typescript
// utils/rotation.ts
const ROTATION_SLOTS = { lite: 1, standard: 4, max: 60 }

// MAXは60分間独占、経過後はstandard扱い（4スロット）
function isMaxExclusive(createdAt: string): boolean {
  const diffMinutes = (Date.now() - new Date(createdAt).getTime()) / 60000
  return diffMinutes <= 60
}
```

---

## 2. バックエンドAPI

### 新規エンドポイント

| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/hyper-chats/recent` | 過去24時間のHyperChat（複数channelId対応） |

**リクエスト例**: `GET /api/hyper-chats/recent?channelIds[]=UC1&channelIds[]=UC2`

**レスポンス**: channelIdをキーとしたオブジェクト
```json
{
  "UC1": [{ "id": 1, "tier": "max", "message": "...", ... }],
  "UC2": []
}
```

### 実装ファイル

- `backend/apps/closed-api-server/src/presentation/hyper-chats/dto/GetRecentHyperChats.dto.ts`
- `backend/apps/closed-api-server/src/presentation/hyper-chats/hyper-chats.controller.ts`
- `backend/libs/application/hyper-chats/hyper-chats.service.ts`

---

## 3. ランキングテーブル統合

### 修正ファイル

`web/features/channels-ranking/components/table/ChannelsRankingTable.tsx`

### 変更内容

1. `getRecentHyperChats()` を Promise.all に追加
2. HyperChatがある場合は2行構成、ない場合は1行のまま

```tsx
{/* 1行目: 既存データ */}
<TableRow>
  <TableCell>...</TableCell>
  {/* 既存のセル */}
</TableRow>

{/* 2行目: HyperChatがある場合のみ表示 */}
{recentHyperChats[channelId]?.length > 0 && (
  <TableRow>
    <TableCell colSpan={columnCount} className="pt-0 pb-2">
      <HyperChatRotator hyperChats={recentHyperChats[channelId]} />
    </TableCell>
  </TableRow>
)}
```

### 条件付き2行表示

- **HyperChat有り**: 2行構成（1行目=既存、2行目=吹き出し）
- **HyperChat無し**: 通常の1行表示を維持
- **吹き出しは常に表示**（レスポンシブ非表示なし）

---

## 4. チャンネル詳細ページ

### ナビゲーション追加

**ファイル**: `web/features/channel/components/local-navigation/LocalNavigationForChannelsIdPages.tsx`

```tsx
{ name: t('hyperChat.nav'), href: `${basePath}/hyper-chat` }
```

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
- 画面下部に「ハイパーチャットを購入」ボタン常駐

---

## 5. 翻訳追加

```json
{
  "Features": {
    "hyperChat": {
      "timeline": {
        "title": "ハイパーチャット",
        "empty": "まだハイパーチャットはありません",
        "viewAll": "すべて見る"
      },
      "history": {
        "title": "ハイパーチャット履歴",
        "sortNewest": "新着順",
        "sortAmount": "金額順"
      }
    }
  },
  "Page": {
    "group": {
      "channelsId": {
        "hyperChat": {
          "nav": "ハイパーチャット"
        }
      }
    }
  }
}
```

---

## 6. 実装ステップ

### Step 1: バックエンドAPI
1. GetRecentHyperChats.dto.ts 作成
2. hyper-chats.controller.ts に /recent エンドポイント追加
3. hyper-chats.service.ts に findRecentByChannelIds メソッド追加

### Step 2: フロントエンド基盤
1. rotation.ts ユーティリティ作成
2. useHyperChatRotation.ts フック作成
3. HyperChatBubble.tsx 作成

### Step 3: ローテーション表示
1. HyperChatRotator.tsx 作成（AdCarousel参考）
2. HyperChatTimelineSheet.tsx 作成（右側から出現するSheet）
3. ランキングテーブル統合

### Step 4: チャンネル詳細ページ
1. ナビゲーション項目追加
2. hyper-chat/page.tsx 作成
3. HyperChatHistoryList.tsx 作成

### Step 5: 検証
1. 型チェック・Lint
2. ユニットテスト
3. E2Eテスト（skeleton高さ検証含む）

---

## 7. Critical Files

| ファイル | 変更内容 |
|---------|---------|
| `web/features/channels-ranking/components/table/ChannelsRankingTable.tsx` | 吹き出しセル追加 |
| `backend/apps/closed-api-server/src/presentation/hyper-chats/hyper-chats.controller.ts` | /recent API追加 |
| `web/features/channel/components/local-navigation/LocalNavigationForChannelsIdPages.tsx` | ナビ項目追加 |
| `web/components/ads/AdCarousel.tsx` | カルーセル実装参考 |
| `backend/libs/domain/hyper-chat/Tier.vo.ts` | rotationSlots定義（参照のみ） |

---

## 8. 検証方法

1. **ローテーション表示**: ランキングページで吹き出しが5秒ごとに切り替わること
2. **MAXローテーション**: 10,000円購入後60分間は独占表示されること
3. **タイムライン**: 吹き出しタップで右からSheetが開くこと
4. **履歴ページ**: `/[group]/channels/[id]/hyper-chat` でページネーション動作
5. **条件付き2行表示**: HyperChat有りの行は2行、無しの行は1行で表示

```bash
# テスト実行
cd backend && npm run type-check && npm test
cd web && npm run type-check && npm test
cd e2e && npm test
```
