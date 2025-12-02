# Implementation Plan

- [x] 1. i18n翻訳キーの追加
  - ja.jsonとen.jsonに新しいセクションの翻訳キーを追加
  - Page.group.channelsId.index.section配下に新しいキーを追加
  - Features.channel.overview配下に新しいキーを追加
  - _Requirements: 8.2, 8.3, 8.4_

- [x] 2. ユーティリティ関数のリファクタリングと実装
  - [x] 2.1 既存の統計計算関数を共通化
    - `web/features/channel/components/concurrent-viewers/card/ChannelConcurrentViewersCards.tsx`のmedian関数を抽出
    - `web/utils/stream/calculateStreamStats.ts`を作成
    - median、max、min関数を共通ユーティリティとして実装
    - avgConcurrentViewersとpeakConcurrentViewersの両方に対応
    - _Requirements: 4.3_
  - [x] 2.2 既存の配信時間計算関数を再利用
    - `web/features/channel/components/stream-times/utils/getTotalAndAvarageDuration.ts`を使用
    - 必要に応じてリファクタリング（共通化）
    - _Requirements: 6.3_

- [x] 3. 統計カードコンポーネントの実装
  - [x] 3.1 ChannelOverviewStatsCardsコンポーネントを作成
    - `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/stats/ChannelOverviewStatsCards.tsx`を作成
    - Server Componentとして実装
    - getSupersBundleSumとgetRecentEndedStreamsを並列で呼び出し
    - 3つの統計カード（スパチャ収入、中央値、配信時間）を表示
    - _Requirements: 2.1, 2.2, 4.1, 6.1_
  - [x] 3.2 個別の統計カードコンポーネントを作成
    - SuperChatRevenueCard: スパチャ収入を表示
    - MedianConcurrentViewersCard: 同時接続数中央値を表示
    - TotalStreamTimeCard: 合計配信時間を表示
    - shadcnのCard、CardHeader、CardContentを使用
    - レスポンシブデザイン対応
    - _Requirements: 2.3, 2.4, 2.5, 4.4, 4.5, 4.6, 6.4, 6.5, 6.6_

- [x] 4. 人気ライブTop3コンポーネントの実装
  - [x] 4.1 TopLiveStreamsGalleryコンポーネントを作成
    - `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/top-lives/TopLiveStreamsGallery.tsx`を作成
    - Server Componentとして実装
    - getStreamsを呼び出してmaxViewerCount降順でTop3を取得
    - _Requirements: 3.1, 3.2_
  - [x] 4.2 TopLiveStreamCardコンポーネントを作成
    - サムネイル、タイトル、最大同時接続数、配信日時を表示
    - ランクバッジを表示
    - shadcnのCard、Badgeを使用
    - レスポンシブデザイン対応
    - _Requirements: 3.3, 3.4, 3.5_

- [x] 5. 上位スーパーチャットコメントコンポーネントの実装
  - [x] 5.1 TopSuperChatCommentsコンポーネントを作成
    - `web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/top-superchats/TopSuperChatComments.tsx`を作成
    - Server Componentとして実装
    - getSupersBundlesを呼び出してamountMicros降順でTop3を取得
    - _Requirements: 5.1, 5.2_
  - [x] 5.2 SuperChatCommentCardコンポーネントを作成
    - 金額、メッセージ、投稿者名を表示
    - ランクバッジを表示
    - shadcnのCard、Badge、CardFooterを使用
    - レスポンシブデザイン対応
    - _Requirements: 5.3, 5.4, 5.5, 5.6_

- [-] 6. ChannelsIdTemplateの更新
  - 既存のChannelCheerStats、ChannelCheerTopFans、ChannelCheerHistoryのセクションを削除
  - ChannelDataセクションを残す（レイアウト調整）
  - 新しい統計カードセクションを追加
  - 人気ライブTop3セクションを追加
  - 上位スーパーチャットコメントセクションを追加
  - レスポンシブグリッドレイアウト（lg:grid-cols-6）を適用
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 7. 未使用コンポーネントのクリーンアップ
  - ChannelCheerStatsコンポーネントへの参照を確認
  - ChannelCheerTopFansコンポーネントへの参照を確認
  - ChannelCheerHistoryコンポーネントへの参照を確認
  - 他のページで使用されていない場合は削除を検討（ユーザーに確認）
  - _Requirements: 1.1, 1.2_
