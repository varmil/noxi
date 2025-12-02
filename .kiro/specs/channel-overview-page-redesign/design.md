# Design Document

## Overview

YouTubeチャンネル（VTuber）の概要ページを、応援機能中心から総合的な統計情報を表示するページに再設計します。既存のServer Componentsアーキテクチャを維持しながら、shadcnの標準コンポーネントを活用してレスポンシブなUIを構築します。

### 設計の主要原則

1. **Server Components優先**: データフェッチはServer Componentsで実行
2. **既存APIの再利用**: 可能な限り既存のAPIエンドポイントを使用
3. **shadcn標準コンポーネント**: UIは極力shadcnの標準コンポーネントを使用
4. **レスポンシブデザイン**: モバイル、タブレット、デスクトップに対応
5. **i18n対応**: next-intlを使用した日本語・英語対応

## Architecture

### コンポーネント階層

```
ChannelsIdTemplate (Server Component)
├── Section (チャンネル基本情報)
│   └── ChannelData (Client Component - 既存)
├── Section (過去30日間の統計カード)
│   ├── ChannelOverviewStatsCards (Server Component - 新規)
│   │   ├── SuperChatRevenueCard
│   │   ├── MedianConcurrentViewersCard
│   │   └── TotalStreamTimeCard
├── Section (人気ライブTop3)
│   └── TopLiveStreamsGallery (Server Component - 新規)
│       └── TopLiveStreamCard × 3
└── Section (上位スーパーチャットコメント)
    └── TopSuperChatComments (Server Component - 新規)
        └── SuperChatCommentCard × 3
```

### レイアウト構造

```
Sections (grid container)
├── Section (col-span-full, order-1)
│   └── ChannelData (基本情報: 登録者数、視聴回数など)
├── Section (lg:col-span-3, order-2)
│   └── ChannelOverviewStatsCards (統計カード: スパチャ収入、中央値、配信時間)
├── Section (lg:col-span-3, order-3)
│   └── TopLiveStreamsGallery (人気ライブTop3)
└── Section (col-span-full, order-4)
    └── TopSuperChatComments (上位スーパーチャットコメント)
```

## Components and Interfaces

### 1. ChannelsIdTemplate (修正)

**ファイル**: `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ChannelsIdTemplate.tsx`

**責務**: チャンネル概要ページのメインテンプレート

**変更内容**:
- ChannelCheerStatsセクションを削除
- ChannelCheerTopFansとChannelCheerHistoryを削除
- 新しい統計セクションを追加

**実装**:
```typescript
export async function ChannelsIdTemplate({ id }: Props) {
  const [page, channel] = await Promise.all([
    getTranslations('Page.group.channelsId.index.section'),
    getChannel(id)
  ])

  return (
    <Sections className="lg:grid-cols-6">
      {/* チャンネル基本情報 */}
      <Section
        className="col-span-full lg:order-1"
        gridClassName="grid-cols-2 lg:grid-cols-4"
        title={page('data.title')}
      >
        <ChannelData channel={channel} />
      </Section>

      {/* 統計カード */}
      <Section
        className="lg:col-span-3 lg:order-2"
        gridClassName="grid-cols-1 md:grid-cols-3"
        title={page('stats.title')}
      >
        <ChannelOverviewStatsCards channelId={id} />
      </Section>

      {/* 人気ライブTop3 */}
      <Section
        className="lg:col-span-3 lg:order-3"
        title={page('topLives.title')}
      >
        <TopLiveStreamsGallery channelId={id} />
      </Section>

      {/* 上位スーパーチャットコメント */}
      <Section
        className="col-span-full lg:order-4"
        title={page('topSuperChats.title')}
      >
        <TopSuperChatComments channelId={id} />
      </Section>
    </Sections>
  )
}
```

### 2. ChannelOverviewStatsCards (新規)

**ファイル**: `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/stats/ChannelOverviewStatsCards.tsx`

**責務**: 過去30日間の統計情報をカード形式で表示

**データ取得**:
- `getSupersBundleSum`: スパチャ収入
- `getRecentEndedStreams`: 配信データ（同時接続数、配信時間計算用）

**実装**:
```typescript
export default async function ChannelOverviewStatsCards({
  channelId
}: { channelId: string }) {
  const [feat, superChatSum, streams] = await Promise.all([
    getTranslations('Features.channel.overview.stats'),
    getSupersBundleSum({
      channelId,
      createdAfter: getStartOf('last30Days').toDate()
    }),
    getRecentEndedStreams({ channelId })
  ])

  // 中央値計算
  const medianViewers = calculateMedianConcurrentViewers(streams)
  
  // 合計配信時間計算
  const totalDuration = calculateTotalStreamTime(streams)

  return (
    <>
      <SuperChatRevenueCard amount={superChatSum.amountMicros} />
      <MedianConcurrentViewersCard median={medianViewers} />
      <TotalStreamTimeCard duration={totalDuration} />
    </>
  )
}
```

**使用するshadcnコンポーネント**:
- `Card`, `CardHeader`, `CardContent` (既存のStatsCardをベースに)

### 3. TopLiveStreamsGallery (新規)

**ファイル**: `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/top-lives/TopLiveStreamsGallery.tsx`

**責務**: 過去30日間のmaxViewerCountが多かったライブTop3を表示

**データ取得**:
```typescript
const streams = await getStreams({
  status: 'ended',
  channelId,
  endedAfter: getStartOf('last30Days').toDate(),
  orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
  limit: 3
})
```

**実装**:
```typescript
export default async function TopLiveStreamsGallery({
  channelId
}: { channelId: string }) {
  const streams = await getStreams({
    status: 'ended',
    channelId,
    endedAfter: getStartOf('last30Days').toDate(),
    orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
    limit: 3
  })

  return (
    <div className="grid grid-cols-1 gap-2">
      {streams.map((stream, index) => (
        <TopLiveStreamCard
          key={stream.videoId}
          stream={stream}
          rank={index + 1}
        />
      ))}
    </div>
  )
}
```

**TopLiveStreamCard**:
- サムネイル画像
- ライブタイトル
- 最大同時接続数
- 配信日時

**使用するshadcnコンポーネント**:
- `Card`, `CardHeader`, `CardContent`
- `Badge` (ランク表示用)

### 4. TopSuperChatComments (新規)

**ファイル**: `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/top-superchats/TopSuperChatComments.tsx`

**責務**: 過去30日間の上位3件のスーパーチャットコメントを表示

**データ取得**:
```typescript
const superChats = await getSupersBundles({
  channelId,
  createdAtGTE: getStartOf('last30Days').toDate(),
  orderBy: [{ field: 'amountMicros', order: 'desc' }],
  limit: 3
})
```

**実装**:
```typescript
export default async function TopSuperChatComments({
  channelId
}: { channelId: string }) {
  const superChats = await getSupersBundles({
    channelId,
    createdAtGTE: getStartOf('last30Days').toDate(),
    orderBy: [{ field: 'amountMicros', order: 'desc' }],
    limit: 3
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {superChats.map((superChat, index) => (
        <SuperChatCommentCard
          key={superChat.videoId}
          superChat={superChat}
          rank={index + 1}
        />
      ))}
    </div>
  )
}
```

**SuperChatCommentCard**:
- 金額（大きく表示）
- コメントメッセージ
- 投稿者名
- ランクバッジ

**使用するshadcnコンポーネント**:
- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Badge` (ランク表示用)
- `Avatar` (投稿者アイコン用、オプション)

## Data Models

### 既存のAPIレスポンス型

#### SupersBundleSumSchema
```typescript
{
  amountMicros: string  // BigInt as string
  count: number
}
```

#### StreamSchema
```typescript
{
  videoId: string
  title: string
  channelId: string
  thumbnails: {
    default: { url: string, width: number, height: number }
    medium: { url: string, width: number, height: number }
    high: { url: string, width: number, height: number }
  }
  actualStartTime: string
  actualEndTime: string
  maxViewerCount: number
  avgConcurrentViewers: number
  // ... その他のフィールド
}
```

#### SupersBundleSchema
```typescript
{
  videoId: string
  channelId: string
  amountMicros: string  // BigInt as string
  count: number
  actualStartTime: string
  actualEndTime?: string
  // ... その他のフィールド
}
```

### 計算ロジック

#### 同時接続数の中央値
```typescript
function calculateMedianConcurrentViewers(streams: StreamsSchema): number {
  const viewers = streams
    .map(s => s.avgConcurrentViewers)
    .filter(v => v > 0)
    .sort((a, b) => a - b)
  
  if (viewers.length === 0) return 0
  
  const mid = Math.floor(viewers.length / 2)
  return viewers.length % 2 === 0
    ? Math.floor((viewers[mid - 1] + viewers[mid]) / 2)
    : viewers[mid]
}
```

#### 合計配信時間
```typescript
function calculateTotalStreamTime(streams: StreamsSchema): Duration {
  const totalMs = streams.reduce((acc, stream) => {
    if (!stream.actualStartTime || !stream.actualEndTime) return acc
    const start = dayjs(stream.actualStartTime)
    const end = dayjs(stream.actualEndTime)
    return acc + end.diff(start)
  }, 0)
  
  return dayjs.duration(totalMs)
}
```

## Error Handling

### データ取得エラー

1. **APIエラー**: 既存のfetchAPI関数がエラーをthrowするため、Next.jsのerror.tsxで処理
2. **データなし**: 空配列や0値の場合は適切なフォールバック表示
3. **Suspense**: 各Sectionを個別にSuspenseでラップ（オプション）

### フォールバック表示

```typescript
// データがない場合
{streams.length === 0 ? (
  <div className="text-center text-muted-foreground py-8">
    {t('noData')}
  </div>
) : (
  // 通常の表示
)}
```

## Testing Strategy

### ユニットテスト

1. **計算ロジック**:
   - `calculateMedianConcurrentViewers`: 中央値計算の正確性
   - `calculateTotalStreamTime`: 配信時間合計の正確性

2. **ユーティリティ関数**:
   - 日付フォーマット
   - 数値フォーマット

### Integration Test

1. **ChannelsIdTemplate**:
   - 正しいセクションが表示されること
   - 削除されたコンポーネントが表示されないこと
   - レスポンシブレイアウトが機能すること

2. **データフェッチ**:
   - 各APIが正しいパラメータで呼ばれること
   - エラー時の挙動

## i18n Configuration

### 翻訳キーの構造

```json
{
  "Page": {
    "group": {
      "channelsId": {
        "index": {
          "section": {
            "data": {
              "title": "チャンネル情報"
            },
            "stats": {
              "title": "過去30日間の統計"
            },
            "topLives": {
              "title": "人気ライブTop3（過去30日間）"
            },
            "topSuperChats": {
              "title": "上位スーパーチャット（過去30日間）"
            }
          }
        }
      }
    }
  },
  "Features": {
    "channel": {
      "overview": {
        "stats": {
          "superChatRevenue": "スパチャ収入",
          "medianViewers": "同時接続数中央値",
          "totalStreamTime": "合計配信時間",
          "noData": "データがありません"
        },
        "topLives": {
          "rank": "#{rank}",
          "maxViewers": "最大{count}人",
          "noLives": "配信がありません"
        },
        "topSuperChats": {
          "rank": "#{rank}",
          "noComments": "コメントがありません"
        }
      }
    }
  }
}
```

### 英語版 (en.json)

```json
{
  "Page": {
    "group": {
      "channelsId": {
        "index": {
          "section": {
            "data": {
              "title": "Channel Information"
            },
            "stats": {
              "title": "Last 30 Days Statistics"
            },
            "topLives": {
              "title": "Top 3 Popular Streams (Last 30 Days)"
            },
            "topSuperChats": {
              "title": "Top Super Chats (Last 30 Days)"
            }
          }
        }
      }
    }
  },
  "Features": {
    "channel": {
      "overview": {
        "stats": {
          "superChatRevenue": "Super Chat Revenue",
          "medianViewers": "Median Concurrent Viewers",
          "totalStreamTime": "Total Stream Time",
          "noData": "No data available"
        },
        "topLives": {
          "rank": "#{rank}",
          "maxViewers": "Max {count} viewers",
          "noLives": "No streams available"
        },
        "topSuperChats": {
          "rank": "#{rank}",
          "noComments": "No comments available"
        }
      }
    }
  }
}
```

## Performance Considerations

### キャッシング戦略

1. **getChannel**: デフォルトキャッシュ（変更頻度低）
2. **getSupersBundleSum**: 1時間キャッシュ（リアルタイム性不要）
3. **getStreams**: 1時間キャッシュ（過去データ）
4. **getSupersBundles**: 1時間キャッシュ（過去データ）

### 並列データフェッチ

```typescript
const [channel, superChatSum, streams, superChats] = await Promise.all([
  getChannel(id),
  getSupersBundleSum({ ... }),
  getRecentEndedStreams({ channelId: id }),
  getSupersBundles({ ... })
])
```

## Responsive Design

### ブレークポイント

- **xs (< 640px)**: 1カラム、カードは縦積み
- **md (640px - 1024px)**: 2カラム、一部グリッド表示
- **lg (>= 1024px)**: 6カラムグリッド、最適なレイアウト

### レイアウト例

**モバイル (xs)**:
```
[ChannelData]
[Stats Card 1]
[Stats Card 2]
[Stats Card 3]
[Top Live 1]
[Top Live 2]
[Top Live 3]
[SuperChat 1]
[SuperChat 2]
[SuperChat 3]
```

**デスクトップ (lg)**:
```
[ChannelData (col-span-6)]
[Stats (col-span-3)] [Top Lives (col-span-3)]
[Top SuperChats (col-span-6)]
```

## Migration Notes

### 削除するコンポーネント

1. `ChannelCheerStats` - 応援統計
2. `ChannelCheerTopFans` - 応援ファンランキング
3. `ChannelCheerHistory` - 応援履歴

### 保持するコンポーネント

1. `ChannelData` - チャンネル基本情報（レイアウト変更可）

### 段階的移行

1. 新しいコンポーネントを作成
2. ChannelsIdTemplateを更新
3. 古いコンポーネントへの参照を削除
4. 未使用のコンポーネントファイルを削除
