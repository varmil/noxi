---
globs: web/**/*
---

# next-intl を用いた i18n 実装ガイドライン

このプロジェクトでは、next-intl を使用して日本語と英語の 2 言語に対応しています。

## 基本設定

- **サポート言語**: 日本語 (ja)、英語 (en)
- **デフォルト言語**: 日本語 (ja)
- **メッセージファイル**: `web/config/i18n/messages/ja.json`, `en.json`

## 実装ルール

### Client Components での翻訳

```tsx
'use client'
import { useTranslations } from 'next-intl'

export default function MyComponent() {
  const t = useTranslations('Components.myComponent')
  return <h1>{t('title')}</h1>
}
```

### Server Components での翻訳

```tsx
import { getTranslations } from 'next-intl/server'

export default async function MyPage() {
  const t = await getTranslations('Pages.myPage')
  return <h1>{t('title')}</h1>
}
```

### 数値・日付のフォーマット

```tsx
import { useFormatter, useTranslations } from 'next-intl'

export default function Statistics({ views }: { views: number }) {
  const format = useFormatter()
  const t = useTranslations('Features.statistics')
  return <p>{t('viewCount', { count: format.number(views) })}</p>
}
```

## メッセージファイルの構造

```json
{
  "Global": { "共通で使用される翻訳" },
  "Components": { "componentName": { "コンポーネント固有の翻訳" } },
  "Features": { "featureName": { "機能固有の翻訳" } },
  "Pages": { "pageName": { "ページ固有の翻訳" } }
}
```

## 必須チェックリスト

### コンポーネント作成時

- [ ] ハードコードされたテキストがないか確認
- [ ] すべての表示テキストに翻訳キーを使用しているか
- [ ] `useTranslations` または `getTranslations` を適切に使用しているか

### メッセージファイル更新時

- [ ] `ja.json` と `en.json` の **両方** に同じキーを追加したか
- [ ] キー名は機能や用途を明確に表現しているか
- [ ] 階層構造は適切か

## 禁止事項

- **ハードコードされたテキスト**: UI に表示されるテキストを直接記述しない
- **翻訳の片方のみ追加**: 必ず ja.json と en.json の両方を更新
- **不適切なキー名**: `text1`, `label2` のような意味不明なキー名を使用しない

## 翻訳キーの命名規則

- **説明的**: キーの内容が一目でわかる名前
- **キャメルケース**: `myComponentTitle`
- **階層的**: 機能や用途に応じて階層化

### 良い例

```json
{
  "Components": {
    "userProfile": {
      "editButton": "編集",
      "saveButton": "保存"
    }
  }
}
```

### 悪い例

```json
{
  "Components": {
    "userProfile": {
      "btn1": "編集",
      "btn2": "保存"
    }
  }
}
```

## 動的な値を含む翻訳

```json
{
  "greeting": "こんにちは、{name}さん"
}
```

```tsx
return <p>{t('greeting', { name: userName })}</p>
```
