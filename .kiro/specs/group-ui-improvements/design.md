# Group UI 改善 設計文書

## 概要

この設計文書は、Group システムのユーザーインターフェース改善とデータベース拡張機能の実装について説明します。主要な改善点として、ナビゲーションリンクの追加、Group 表示順序管理機能、および Next.js 認証エラーの修正を含みます。

## アーキテクチャ

### 全体アーキテクチャ

```
Frontend (Next.js)
├── Navigation Components
│   ├── PC Sidebar
│   └── Mobile Sidebar Sheet
├── Header Component (Auth修正対象)
└── Group Pages

Backend (NestJS)
├── Group Controller (order対応)
├── Group Service (order対応)
├── Group Repository (order対応)
└── Database Migration (order column)
```

### レイヤー構成

- **プレゼンテーション層**: ナビゲーションコンポーネント、Header 修正
- **アプリケーション層**: Group Service（order 対応）
- **インフラストラクチャ層**: Repository 実装（order 隠蔽）、マイグレーション
- **データベース層**: Group テーブル拡張（order カラム追加）

## コンポーネントとインターフェース

### フロントエンド コンポーネント

#### 1. 既存ナビゲーションコンポーネントの拡張

```typescript
// PC Sidebar: web/components/aside/Aside.tsx
// 既存のAsideコンポーネントに/groups/addリンクを追加

// Mobile Sidebar: web/components/header/xs/HeaderXSSheet.tsx
// 既存のHeaderXSSheetコンポーネントに/groups/addリンクを追加

interface GroupAddLink {
  href: '/groups/add'
  label: string // i18n対応
  icon: React.ComponentType
}
```

#### 2. Header Component（認証修正）

```typescript
// 修正前の問題のあるパターン
const Header = () => {
  const session = auth() // ❌ Request scope外での呼び出し
  // ...
}

// 修正後のパターン（Next.js 16対応）
const Header = async () => {
  const session = await auth() // ✅ 適切なスコープでの呼び出し
  // ...
}
```

### バックエンド インターフェース

#### 1. Group Repository Interface（order 対応）

```typescript
interface GroupRepository {
  findAll(): Promise<Groups> // 常にorder昇順
  findById(id: GroupId): Promise<Group | null>
  save(group: Group): Promise<void> // order=99999で保存
  // orderフィールドはインフラ層に隠蔽
}
```

#### 2. Group Service Interface

```typescript
interface GroupService {
  findAll(): Promise<Groups> // orderによるソート済み
  findById(id: GroupId): Promise<Group | null>
  create(data: CreateGroupData): Promise<void>
}
```

## データモデル

### データベーススキーマ拡張

```sql
-- 既存のGroupテーブルにorderカラムを追加
ALTER TABLE Group ADD COLUMN order INTEGER NOT NULL DEFAULT 1;

-- 既存レコードのorder値を1に設定
UPDATE Group SET order = 1 WHERE order IS NULL;

-- インデックス追加（パフォーマンス向上）
CREATE INDEX idx_group_order ON Group(order);
```

### ドメインモデル

```typescript
// Group Entity（orderフィールドは含まない）
export class Group {
  public readonly id: GroupId
  public readonly name: GroupName
  public readonly iconSrc: GroupIconSrc
  // orderフィールドはドメイン層には露出しない
}

// Groups Collection（ソート済み）
export class Groups extends Collection<GroupId> {
  // インフラ層でorder順にソート済みのデータを受け取る
}
```

## 機能要件

### 1. ナビゲーション機能

- PC/モバイル両方のサイドバーに`/groups/add`リンクを追加
- 既存のナビゲーション構造を維持
- 適切なアイコンとラベルの表示

### 2. Group 順序管理

- データベースに order カラム（int 型、非 UNIQUE）を追加
- Group 一覧取得時は常に order 昇順でソート
- 新規 Group 作成時は order=99999 を設定
- order フィールドはインフラ層に隠蔽

### 3. 認証エラー解決

- Header.tsx での「Auth called outside request scope」エラーを修正
- Next.js 16 へのアップグレードによる解決を検討
- 既存の Header 機能を維持

## エラーハンドリング

### 1. ナビゲーションエラー

- **リンク追加失敗**: 既存ナビゲーション構造の保持
- **遷移エラー**: 適切なエラーページ表示
- **レスポンシブ対応**: PC/モバイル両方での正常動作

### 2. データベースエラー

- **マイグレーション失敗**: ロールバック機能
- **order 値競合**: 適切なデフォルト値設定
- **ソートエラー**: フォールバック順序の提供

### 3. 認証エラー

- **Next.js 16 アップグレード失敗**: 段階的アップグレード戦略
- **認証コンテキストエラー**: 適切なエラーバウンダリ
- **Header 機能劣化**: 既存機能の保護

## テスト戦略

### 単体テスト

- **ナビゲーションコンポーネント**: リンク存在確認、遷移動作
- **Group Repository**: order 隠蔽、ソート機能
- **Header Component**: 認証エラー解消確認

### プロパティベーステスト

### 統合テスト

- **エンドツーエンドナビゲーション**: PC/モバイル両方での動作確認
- **データベースマイグレーション**: order 機能の完全テスト
- **認証フロー**: Next.js 16 アップグレード後の動作確認

### テスト実行要件

- **フロントエンド**: React Testing Library を使用したユニットテスト
- **バックエンド**: Jest を使用したユニットテスト
- 実装優先、テスト後付けのアプローチを採用
