# 実装計画

- [x] 1. データベーススキーマとマイグレーションの作成

  - Prisma スキーマに Group テーブルと GroupRegistration テーブルを追加
  - 既存 GroupStrings 定数を Group テーブルに挿入するマイグレーションを作成
  - マイグレーション実行とテーブル作成の確認
  - _要件: 1.1, 1.2, 1.3, 1.5_

- [x] 2. バックエンド Group ドメインレイヤーの実装

  - [x] 2.1 Group Value Object クラスの実装

    - GroupId、GroupName、GroupIconSrc Value Object を作成
    - class-validator デコレータによるバリデーション実装
    - _要件: 3.2_

  - [x] 2.2 GroupRegistration Value Object クラスの実装

    - GroupRegistrationId、GroupRegistrationStatus、AppliedAt Value Object を作成
    - ChannelRegistration パターンに従った実装
    - _要件: 7.1, 7.2_

  - [x] 2.3 Group Entity クラスの実装

    - Group エンティティクラスを作成
    - GroupRegistration エンティティクラスを作成
    - _要件: 3.1_

  - [x] 2.4 Group ID 一意性と形式検証のプロパティテスト
    - **プロパティ 1: Group ID 一意性と形式検証**
    - **検証対象: 要件 1.5, 3.2, 3.3, 4.2**

- [x] 3. バックエンド Group インフラストラクチャレイヤーの実装

  - [x] 3.1 Group Repository Interface の定義

    - GroupRepository インターフェースを作成
    - GroupRegistrationRepository インターフェースを作成
    - _要件: 3.1_

  - [x] 3.2 Group Repository 実装クラスの作成

    - GroupRepositoryImpl クラスを実装
    - Prisma を使用したデータベース操作
    - _要件: 3.1, 3.4_

  - [x] 3.3 GroupRegistration Repository 実装クラスの作成

    - GroupRegistrationRepositoryImpl クラスを実装
    - 申請履歴の取得と保存機能
    - _要件: 4.5, 5.1_

  - [x] 3.4 マイグレーションデータ完全性のプロパティテスト
    - **プロパティ 2: マイグレーションデータ完全性**
    - **検証対象: 要件 1.2, 1.3**

- [x] 4. バックエンド Group アプリケーションレイヤーの実装

  - [x] 4.1 Group Service クラスの実装

    - GroupService クラスを作成
    - CRUD 操作のビジネスロジック実装
    - _要件: 3.1, 3.4_

  - [x] 4.2 GroupRegistration Service クラスの実装

    - GroupRegistrationService クラスを作成
    - 申請処理のビジネスロジック実装
    - _要件: 4.4, 7.5_

  - [x] 4.3 Group データ検証と応答形式のプロパティテスト
    - **プロパティ 4: Group データ検証と応答形式**
    - **検証対象: 要件 2.5, 3.4**

- [x] 5. バックエンド Group プレゼンテーションレイヤーの実装

  - [x] 5.1 Group Controller の実装

    - GroupController クラスを作成
    - CRUD API エンドポイントの実装
    - _要件: 3.1_

  - [x] 5.2 GroupRegistration Controller の実装

    - GroupRegistrationController クラスを作成
    - 申請 API エンドポイントの実装
    - _要件: 4.4_

  - [x] 5.3 DTO クラスの実装

    - CreateGroupDto、UpdateGroupDto クラスを作成
    - CreateGroupRegistrationDto、UpdateStatusDto クラスを作成
    - _要件: 3.1, 4.4_

  - [x] 5.4 フォーム送信と API 連携のプロパティテスト
    - **プロパティ 7: フォーム送信と API 連携**
    - **検証対象: 要件 4.4, 7.5**

- [x] 6. 既存コードの型変更とリファクタリング

  - [x] 6.1 バックエンド GroupStrings 参照の string 型への変更

    - 全レイヤーの GroupStrings 参照を string 型に変更
    - 既存機能の動作確認
    - _要件: 2.1, 2.3_

  - [x] 6.2 フロントエンド GroupStrings 参照の string 型への変更

    - Group 定数ファイルの更新
    - 既存 UI コンポーネントの型変更
    - _要件: 2.2, 2.4_

  - [x] 6.3 既存システム機能継続性のプロパティテスト
    - **プロパティ 3: 既存システム機能継続性**
    - **検証対象: 要件 2.3, 2.4**

- [x] 7. フロントエンド Group 申請ページの実装

  - [x] 7.1 Group 申請ページのルーティング設定

    - /groups/add ページルートを作成
    - ページメタデータとレイアウト設定
    - _要件: 4.1_

  - [x] 7.2 GroupRegistrationForm コンポーネントの実装

    - Group ID、名前、アイコン URL 入力フォーム
    - リアルタイムバリデーション機能
    - _要件: 4.1, 4.2_

  - [x] 7.3 ImagePreview コンポーネントの実装

    - 円形画像プレビュー機能
    - 相対パス/絶対 URL 対応
    - フォールバック画像処理
    - _要件: 4.3, 6.1, 6.2, 6.3_

  - [x] 7.4 アイコン画像 URL 処理のプロパティテスト
    - **プロパティ 5: アイコン画像 URL 処理**
    - **検証対象: 要件 4.3, 6.1, 6.2, 6.3**

- [x] 8. フロントエンド Group API 連携の実装

  - [x] 8.1 フロントエンド型定義の実装

    - Group、GroupRegistration の TypeScript 型定義を作成
    - バックエンド DTO に対応するインターフェース定義
    - _要件: 3.4, 4.4_

  - [x] 8.2 Group API クライアント関数の実装

    - Group 一覧取得 API の呼び出し関数を作成
    - 既存の定数参照を API 呼び出しに置き換え
    - _要件: 2.2, 2.4_

  - [x] 8.3 既存 UI コンポーネントの API 連携対応
    - Group 選択コンポーネントを API ベースに変更
    - 動的 Group データの表示対応
    - _要件: 2.2, 2.4_

- [x] 9. フロントエンド Group 申請履歴の実装

  - [x] 9.1 GroupRegistrationHistory コンポーネントの実装

    - 申請履歴一覧表示機能
    - ステータス、提出日、詳細表示
    - _要件: 5.1, 5.2_

  - [x] 9.2 申請履歴 API 連携の実装

    - 申請履歴取得 API の呼び出し
    - 最新 30 件の表示制限
    - _要件: 5.1, 5.3_

  - [x] 9.3 申請履歴表示と順序のプロパティテスト

    - **プロパティ 6: 申請履歴表示と順序**
    - **検証対象: 要件 4.5, 5.2, 5.3**

  - [x] 9.4 エラーハンドリングとフォールバックのプロパティテスト
    - **プロパティ 8: エラーハンドリングとフォールバック**
    - **検証対象: 要件 5.4, 6.4**

- [x] 10. 統合とエンドツーエンドテスト

  - [x] 10.1 Group 申請フロー全体のテスト

    - フォーム入力から API 呼び出しまでの統合テスト
    - エラーケースの動作確認
    - _要件: 4.1, 4.2, 4.3, 4.4_

  - [x] 10.2 既存機能の回帰テスト
    - 型変更後の既存機能動作確認
    - Group 参照の正常動作確認
    - _要件: 2.3, 2.4_

- [x] 11. ドメインリファクタリング - group-registration の分離

  - [x] 11.1 group-registration ドメインディレクトリの作成

    - `backend/libs/domain/group-registration/` ディレクトリを作成
    - GroupRegistration 関連ファイルを移動
    - 新しい index.ts ファイルを作成

  - [x] 11.2 group ドメインから group-registration 関連の削除

    - `backend/libs/domain/group/index.ts` から GroupRegistration 関連のエクスポートを削除
    - group ドメインを group 固有のファイルのみに整理

  - [x] 11.3 インフラ層の分離

    - `backend/libs/infrastructure/group-registration/` ディレクトリを作成
    - GroupRegistration.repository-impl.ts を移動
    - 新しい group-registration.infra.module.ts を作成
    - group.infra.module.ts から GroupRegistration 関連を削除

  - [x] 11.4 インポートパスの修正
    - アプリケーション層の group-registrations.service.ts のインポートを修正
    - インフラ層の GroupRegistration.repository-impl.ts のインポートを修正
    - GroupRegistration.entity.ts のインポートを修正
    - group-registrations.app.module.ts で GroupRegistrationInfraModule をインポート

- [ ] 12. 最終チェックポイント - すべてのテストが通ることを確認
  - すべてのテストが通ることを確認し、質問があればユーザーに尋ねる
