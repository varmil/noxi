---
inclusion: fileMatch
fileMatchPattern: 'web/**/*'
---

# next-intl を用いた i18n 実装ガイドライン

このプロジェクトでは、next-intl を使用して日本語と英語の 2 言語に対応しています。
新しく機能を実装する際は、必ず i18n 対応を行ってください。

### 基本設定

- **サポート言語**: 日本語 (ja)、英語 (en)
- **デフォルト言語**: 日本語 (ja)
- **メッセージファイル**: `web/config/i18n/messages/ja.json`, `web/config/i18n/messages/en.json`
- **ルーティング設定**: `web/config/i18n/routing.ts`

### 実装ルール

#### 1. Client Components での翻訳

Client Components では `useTranslations` フックを使用します。

```tsx
'use client'

import { useTranslations } from 'next-intl'

export default function MyComponent() {
  const t = useTranslations('Components.myComponent')

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}
```

#### 2. Server Components での翻訳

Server Components では `getTranslations` 関数を使用します。

```tsx
import { getTranslations } from 'next-intl/server'

export default async function MyPage() {
  const t = await getTranslations('Pages.myPage')

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}
```

#### 3. 数値・日付のフォーマット

数値や日付のフォーマットには `useFormatter` を使用します。

```tsx
import { useFormatter, useTranslations } from 'next-intl'

export default function Statistics({ views }: { views: number }) {
  const format = useFormatter()
  const t = useTranslations('Features.statistics')

  return <p>{t('viewCount', { count: format.number(views) })}</p>
}
```

#### 4. メッセージファイルの構造

メッセージは機能や用途に応じて階層的に整理します。

```json
{
  "Global": {
    "共通で使用される翻訳"
  },
  "Components": {
    "componentName": {
      "コンポーネント固有の翻訳"
    }
  },
  "Features": {
    "featureName": {
      "機能固有の翻訳"
    }
  },
  "Pages": {
    "pageName": {
      "ページ固有の翻訳"
    }
  }
}
```

### 必須チェックリスト

新機能実装時は以下を必ず確認してください：

#### コンポーネント作成時

- [ ] ハードコードされたテキストがないか確認
- [ ] すべての表示テキストに翻訳キーを使用しているか
- [ ] `useTranslations` または `getTranslations` を適切に使用しているか

#### メッセージファイル更新時

- [ ] `ja.json` と `en.json` の両方に同じキーを追加したか
- [ ] キー名は機能や用途を明確に表現しているか
- [ ] 階層構造は適切か（Global/Components/Features/Pages）

#### レビュー時

- [ ] 日本語と英語の両方で表示を確認したか
- [ ] 数値や日付のフォーマットは適切か
- [ ] 翻訳キーの命名規則に従っているか

### 禁止事項

- **ハードコードされたテキスト**: UI に表示されるテキストを直接記述しない
- **翻訳の片方のみ追加**: 必ず ja.json と en.json の両方を更新する
- **不適切なキー名**: `text1`, `label2` のような意味不明なキー名を使用しない

### 翻訳キーの命名規則

- **説明的**: キーの内容が一目でわかる名前を使用
- **キャメルケース**: `myComponentTitle` のように記述
- **階層的**: 機能や用途に応じて適切に階層化

**良い例**:

```json
{
  "Components": {
    "userProfile": {
      "editButton": "編集",
      "saveButton": "保存",
      "cancelButton": "キャンセル"
    }
  }
}
```

**悪い例**:

```json
{
  "Components": {
    "userProfile": {
      "btn1": "編集",
      "btn2": "保存",
      "text": "キャンセル"
    }
  }
}
```

### 動的な値を含む翻訳

変数を含む翻訳は、プレースホルダーを使用します。

```json
{
  "greeting": "こんにちは、{name}さん",
  "itemCount": "{count}個のアイテム"
}
```

```tsx
const t = useTranslations('Components.greeting')
return <p>{t('greeting', { name: userName })}</p>
```

### 複数形の扱い

複数形が必要な場合は、ICU Message Format を使用します。

```json
{
  "itemCount": "{count, plural, =0 {アイテムがありません} one {# 個のアイテム} other {# 個のアイテム}}"
}
```

### エラーメッセージの翻訳

エラーメッセージも必ず翻訳対応します。

```json
{
  "errors": {
    "required": "この項目は必須です",
    "invalidEmail": "有効なメールアドレスを入力してください",
    "networkError": "ネットワークエラーが発生しました"
  }
}
```

### 実装例

#### ページコンポーネント（Server Component）

```tsx
import { getTranslations } from 'next-intl/server'

export default async function DashboardPage() {
  const t = await getTranslations('Pages.dashboard')

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}
```

#### フォームコンポーネント（Client Component）

```tsx
'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

export default function LoginForm() {
  const t = useTranslations('Components.auth')

  return (
    <form>
      <input placeholder={t('emailPlaceholder')} />
      <input placeholder={t('passwordPlaceholder')} type="password" />
      <Button>{t('loginButton')}</Button>
    </form>
  )
}
```

### トラブルシューティング

#### 翻訳が表示されない場合

1. メッセージファイルのキーが正しいか確認
2. ja.json と en.json の両方にキーが存在するか確認
3. `useTranslations` または `getTranslations` の名前空間が正しいか確認

#### 型エラーが発生する場合

- TypeScript の型推論が効いているため、存在しないキーを参照するとエラーになります
- メッセージファイルを更新した後は、開発サーバーを再起動してください
