# Requirements Document

## Introduction

YouTubeチャンネル（VTuber）の概要ページ（`web/app/[locale]/(end-user)/(default)/[group]/channels/[id]/page.tsx`）のUI機能を修正します。現在のページは応援機能（チアチケット）に特化していますが、チャンネルの総合的な概要を表示するページに変更します。具体的には、既存の応援機能関連コンポーネントを削除し、過去30日間のスパチャ収入、人気ライブ、同時接続数、コメント、配信時間などの統計情報を表示する新しいコンポーネントを追加します。

## Glossary

- **Channel Overview Page**: YouTubeチャンネルの概要を表示するページ（`/[group]/channels/[id]`）
- **ChannelsIdTemplate**: チャンネル概要ページのメインテンプレートコンポーネント
- **ChannelData**: チャンネルの基本統計情報（登録者数、視聴回数など）を表示するコンポーネント
- **ChannelCheerTopFans**: 応援ファンのランキングを表示するコンポーネント（削除対象）
- **ChannelCheerHistory**: 応援履歴を表示するコンポーネント（削除対象）
- **Server Component**: Next.js App Routerのサーバーコンポーネント
- **shadcn**: UIコンポーネントライブラリ
- **Responsive Design**: レスポンシブデザイン（モバイル、タブレット、デスクトップ対応）
- **Backend API**: バックエンドのRESTful APIエンドポイント

## Requirements

### Requirement 1

**User Story:** チャンネル概要ページの訪問者として、応援機能ではなくチャンネルの総合的な統計情報を見たい

#### Acceptance Criteria

1. WHEN Channel Overview Pageを表示するとき、THE ChannelsIdTemplate SHALL ChannelCheerTopFansコンポーネントを表示しない
2. WHEN Channel Overview Pageを表示するとき、THE ChannelsIdTemplate SHALL ChannelCheerHistoryコンポーネントを表示しない
3. WHEN Channel Overview Pageを表示するとき、THE ChannelsIdTemplate SHALL ChannelDataコンポーネントを表示する
4. WHEN Channel Overview Pageを表示するとき、THE ChannelsIdTemplate SHALL 概要ページにふさわしいレイアウトでコンポーネントを配置する

### Requirement 2

**User Story:** チャンネル概要ページの訪問者として、過去30日間のスパチャ収入を確認したい

#### Acceptance Criteria

1. WHEN Channel Overview Pageを表示するとき、THE ChannelsIdTemplate SHALL 過去30日間のスパチャ収入の合計金額を表示する
2. WHEN スパチャ収入を表示するとき、THE System SHALL 既存のgetSupersBundleSum APIを使用してデータを取得する
3. WHEN スパチャ収入を表示するとき、THE Component SHALL 金額を適切な通貨フォーマットで表示する
4. WHEN スパチャ収入を表示するとき、THE Component SHALL shadcnの標準コンポーネントを使用する
5. WHEN スパチャ収入を表示するとき、THE Component SHALL レスポンシブデザインに対応する

### Requirement 3

**User Story:** チャンネル概要ページの訪問者として、過去30日間で人気だったライブ配信を知りたい

#### Acceptance Criteria

1. WHEN Channel Overview Pageを表示するとき、THE ChannelsIdTemplate SHALL 過去30日間のmaxViewerCountが多かったライブTop3を表示する
2. WHEN 人気ライブを表示するとき、THE System SHALL 既存のgetStreams APIを使用してデータを取得する
3. WHEN 人気ライブを表示するとき、THE Component SHALL 各ライブのサムネイル、タイトル、最大同時接続数を表示する
4. WHEN 人気ライブを表示するとき、THE Component SHALL shadcnの標準コンポーネントを使用する
5. WHEN 人気ライブを表示するとき、THE Component SHALL レスポンシブデザインに対応する

### Requirement 4

**User Story:** チャンネル概要ページの訪問者として、過去30日間の同時接続数の中央値を知りたい

#### Acceptance Criteria

1. WHEN Channel Overview Pageを表示するとき、THE ChannelsIdTemplate SHALL 過去30日間の同時接続数中央値を表示する
2. WHEN 同時接続数中央値を表示するとき、THE System SHALL 既存のgetStreams APIを使用してデータを取得する
3. WHEN 同時接続数中央値を計算するとき、THE Component SHALL 過去30日間の終了済みライブのavgConcurrentViewersから中央値を算出する
4. WHEN 同時接続数中央値を表示するとき、THE Component SHALL 数値を適切にフォーマットして表示する
5. WHEN 同時接続数中央値を表示するとき、THE Component SHALL shadcnの標準コンポーネントを使用する
6. WHEN 同時接続数中央値を表示するとき、THE Component SHALL レスポンシブデザインに対応する

### Requirement 5

**User Story:** チャンネル概要ページの訪問者として、過去30日間の印象的なスーパーチャットコメントを見たい

#### Acceptance Criteria

1. WHEN Channel Overview Pageを表示するとき、THE ChannelsIdTemplate SHALL 過去30日間の上位3件のスーパーチャットコメントを表示する
2. WHEN スーパーチャットコメントを表示するとき、THE System SHALL 既存のgetSupersBundles APIを使用してデータを取得する
3. WHEN スーパーチャットコメントを表示するとき、THE Component SHALL 各コメントの金額、メッセージ、投稿者名を表示する
4. WHEN スーパーチャットコメントを表示するとき、THE Component SHALL 金額の降順でTop3を表示する
5. WHEN スーパーチャットコメントを表示するとき、THE Component SHALL shadcnの標準コンポーネントを使用する
6. WHEN スーパーチャットコメントを表示するとき、THE Component SHALL レスポンシブデザインに対応する

### Requirement 6

**User Story:** チャンネル概要ページの訪問者として、過去30日間の合計ライブ配信時間を知りたい

#### Acceptance Criteria

1. WHEN Channel Overview Pageを表示するとき、THE ChannelsIdTemplate SHALL 過去30日間の合計ライブ時間を表示する
2. WHEN 合計ライブ時間を表示するとき、THE System SHALL 既存のgetStreams APIを使用してデータを取得する
3. WHEN 合計ライブ時間を計算するとき、THE Component SHALL 過去30日間の終了済みライブの配信時間を合計する
4. WHEN 合計ライブ時間を表示するとき、THE Component SHALL 時間を適切なフォーマット（時間、分）で表示する
5. WHEN 合計ライブ時間を表示するとき、THE Component SHALL shadcnの標準コンポーネントを使用する
6. WHEN 合計ライブ時間を表示するとき、THE Component SHALL レスポンシブデザインに対応する

### Requirement 7

**User Story:** 開発者として、既存のAPIエンドポイントを最大限再利用したい

#### Acceptance Criteria

1. WHEN 新機能を実装するとき、THE System SHALL 既存のAPIエンドポイントを優先的に使用する
2. IF 既存のAPIエンドポイントで要件を満たせない場合、THEN THE System SHALL RESTful原則に従った新しいAPIエンドポイントを作成する
3. WHEN 新しいAPIエンドポイントを作成するとき、THE System SHALL 既存のbackendコードを参考にする
4. WHEN 新しいAPIエンドポイントを作成するとき、THE System SHALL レイヤードアーキテクチャとドメイン駆動設計の原則に従う

### Requirement 8

**User Story:** 開発者として、i18n対応を確実に実装したい

#### Acceptance Criteria

1. WHEN 新しいコンポーネントを作成するとき、THE Component SHALL next-intlを使用して翻訳対応する
2. WHEN 翻訳キーを追加するとき、THE System SHALL ja.jsonとen.jsonの両方にキーを追加する
3. WHEN 翻訳キーを定義するとき、THE System SHALL 説明的でキャメルケースの命名規則に従う
4. WHEN UIテキストを表示するとき、THE Component SHALL ハードコードされたテキストを使用しない
