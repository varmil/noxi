---
inclusion: fileMatch
fileMatchPattern: 'web/**/*'
---

# プロジェクト構造ガイドライン

このガイドラインは、bulletproof-react の原則に基づいて、一貫性のあるプロジェクト構造を維持するためのルールを定義します。
working-directory は `web` です。たとえば、`src` は `web/src` とみなしてください

## 基本原則

### 1. 関心の分離

- **ページ固有のコンポーネント**: 特定のページでのみ使用されるコンポーネント
- **機能別コンポーネント**: 複数のページで再利用される機能的なコンポーネント
- **共通 UI コンポーネント**: プロジェクト全体で使用される汎用的な UI コンポーネント。shadcn を極力活用する

### 2. コロケーション

- 関連するファイル（コンポーネント、テスト、型定義）は可能な限り近い場所に配置する
- 使用される場所に近い場所にコンポーネントを配置する

## ディレクトリ構造

### 全体の俯瞰

```
src
|
+-- apis              # Server Components, Server Actionsから呼び出す外部通信
+-- app               # App Routerのページコンポーネントを含む
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
+-- components        # shared components used across the entire application
+-- config            # global configurations, exported env variables etc.
+-- features          # feature based modules
+-- hooks             # shared hooks used across the entire application
+-- lib               # reusable libraries preconfigured for the application
+-- stores            # global state stores
+-- types             # shared types used across the application
+-- utils             # shared utility functions
```

### App Router 構造

```
src/app/
├── [route]/
│   ├── page.tsx              # ページコンポーネント（Server Component）
│   ├── layout.tsx            # レイアウト（必要に応じて）
│   └── components/           # ページ固有のコンポーネント
│       ├── component-name.tsx
│       └── component-name.test.tsx
```

### Features 構造

```
src/features/
├── [feature-name]/
│   ├── components/           # 機能固有のコンポーネント
│   │   ├── component-name.tsx
│   │   └── component-name.test.tsx
│   ├── actions/             # 機能固有のServer Actions（必要に応じて）
│   ├── hooks/               # 機能固有のカスタムフック（必要に応じて）
│   ├── types/               # 機能固有の型定義（必要に応じて）
│   └── utils/               # 機能固有のユーティリティ（必要に応じて）
```

### 共通コンポーネント構造

```
src/components/
├── ui/                      # shadcn UI コンポーネント
│   ├── button.tsx
│   └── input.tsx
└── layout/                  # レイアウト関連コンポーネント（必要に応じて）
```

## コンポーネント配置の判断基準

### 1. ページ固有コンポーネント (`src/app/[route]/components/`)

以下の条件を満たすコンポーネントはページ固有として配置：

- **単一ページでのみ使用**: 特定のページでのみ使用され、他のページでは使用されない
- **ページ固有のロジック**: そのページの特定のビジネスロジックに密接に関連している
- **ページ固有のデータ**: そのページ特有のデータ構造や状態に依存している

**例**:

- `create-config-form.tsx` → `src/app/dashboard/create/components/`
- `edit-config-form.tsx` → `src/app/dashboard/[brandId]/edit/components/`

### 2. 機能別コンポーネント (`src/features/[feature-name]/components/`)

以下の条件を満たすコンポーネントは機能別として配置：

- **複数ページで使用**: 2 つ以上のページで使用される
- **特定の機能領域**: 明確な機能領域（例：config-table、config-form）に属している
- **ビジネスロジック含有**: アプリケーション固有のビジネスロジックを含んでいる

**例**:

- `config-table.tsx` → `src/features/config-table/components/`
- `error-display.tsx` → `src/features/config-form/components/`

### 3. 共通 UI コンポーネント (`src/components/`)

以下の条件を満たすコンポーネントは共通 UI として配置：

- **汎用的**: プロジェクト全体で広く使用される
- **ビジネスロジック非依存**: 特定のビジネスロジックに依存しない
- **再利用性重視**: 様々な文脈で再利用可能
- **shadcn**: src/components/ui/ は shadcn コンポーネント専用

## インポートパスの規則

### 1. 絶対パス vs 相対パス

- **同一ディレクトリ内**: 相対パス (`./component-name`)
- **それ以外**: 絶対パス
  - `@/features/feature-name/components/component-name`
  - `@/components/ui/component-name`

## ファイル命名規則

### 1. コンポーネントファイル

- **ケバブケース**: `component-name.tsx`
- **説明的な名前**: 機能を明確に表現する名前を使用

### 2. テストファイル

- **ユニットテスト**: `component-name.test.tsx`（コンポーネントと同階層）
- **Integration Test**: `__tests__/integration.test.ts`（テスト対象コンポーネントが含まれる一番上位の位置）

### 3. ディレクトリ名

- **ケバブケース**: `feature-name`、`component-name`
- **複数形は避ける**: `component`（`components`ではない、ただし既存の`components`ディレクトリは例外）

## 新規コンポーネント作成時のチェックリスト

### 作成前の確認

- [ ] このコンポーネントはどこで使用されるか？（単一ページ vs 複数ページ）
- [ ] 特定の機能領域に属するか？
- [ ] 既存の類似コンポーネントはないか？

### 配置場所の決定

- [ ] ページ固有 → `src/app/[route]/components/`
- [ ] 機能別 → `src/features/[feature-name]/components/`
- [ ] 共通 UI → `src/components/ui/`

### 作成後の確認

- [ ] ユニットテストファイルも同時に作成したか？
- [ ] Integration Test が必要な場合は適切な位置に配置したか？
- [ ] インポートパスは適切か？
- [ ] 命名規則に従っているか？

## テスト戦略とファイル配置

### ユニットテストと Integration Test の使い分け

#### ユニットテスト

- **目的**: 個別のコンポーネントやユーティリティ関数の動作を検証
- **配置**: テスト対象ファイルと同階層に `component-name.test.tsx` として配置
- **スコープ**: 単一のコンポーネントまたは関数

#### Integration Test

- **目的**: 複数のコンポーネントが連携して動作することを検証
- **配置**: テストするコンポーネントが含まれる一番上位の位置に `__tests__/integration.test.ts` を配置
- **スコープ**: 機能全体やページ全体の動作

### Integration Test の配置例

```
src/features/config-form/
├── components/
│   ├── form-field.tsx
│   ├── form-field.test.tsx        # ユニットテスト
│   ├── validation-display.tsx
│   └── validation-display.test.tsx # ユニットテスト
├── hooks/
│   ├── use-form-validation.ts
│   └── use-form-validation.test.ts # ユニットテスト
└── __tests__/
    └── integration.test.ts         # Integration Test（機能全体）

src/app/dashboard/create/
├── components/
│   ├── create-form.tsx
│   └── create-form.test.tsx        # ユニットテスト
└── __tests__/
    └── integration.test.ts         # Integration Test（ページ全体）
```

### テスト配置の判断基準

#### ユニットテスト配置

- コンポーネントの個別機能をテストする場合
- ユーティリティ関数やカスタムフックをテストする場合
- モックを多用して外部依存を排除したテストの場合

#### Integration Test 配置

- 複数のコンポーネントの連携をテストする場合
- ユーザーの操作フローをテストする場合
- API との連携を含むエンドツーエンドに近いテストの場合

## リファクタリング時の指針

### コンポーネント移動の判断

1. **使用箇所の調査**: そのコンポーネントがどこで使用されているかを確認
2. **依存関係の確認**: 他のコンポーネントとの依存関係を把握
3. **段階的移行**: 一度に大量のファイルを移動せず、段階的に実行

### 移動時の手順

1. 新しい場所にファイルを作成
2. インポートパスを更新
3. ユニットテストファイルも同時に移動
4. Integration Test の配置場所を再検討（必要に応じて移動）
5. ビルドとテストで検証
6. 元のファイルを削除
