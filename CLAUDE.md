# CLAUDE.md

このリポジトリで Claude Code を使用する際のルールです。

## 言語

会話は日本語で行ってください。

## プロジェクト構造

```
root
├── backend/    # NestJS を用いた API サーバの実装
├── e2e/        # Playwright を用いた E2E テスト
└── web/        # Next.js を用いたフロントエンドの実装
```

- ルート階層にはコードを配置しない（e2e/ はテスト基盤のため例外）
- web, backend でコードが多少重複してもこの原則を適用する
- lint, test はそれぞれ `web/`、`backend/` で実行する

## 開発原則

### YAGNI (You Aren't Gonna Need It)

- 今必要なコードのみ追加する
- 参照されない、実行されないコードは削除する

## 作業完了後の必須ステップ

コード変更後は以下を **順番に** 実行してください：

1. **型チェック**: `npm run type-check`（web/backend それぞれで実行）
2. **Lint 修正**: `npm run lint -- --fix`
3. **ユニットテスト**: `npm test`（web/backend それぞれで実行）
4. **E2E テスト**: `cd e2e && npm test`（UI 影響がある場合のみ）
5. **Git コミット**: 以下のフォーマットに従う

### コミットメッセージの形式

```
<type>: <description>

[optional body]
```

- **タイプ**: feat, fix, refactor, test, docs, style, chore
- **本文は日本語で記述**（prefix は英語）
- 複数の変更がある場合は適切に分割してコミット

## 詳細ルール

詳細なルールは `.claude/rules/` を参照してください：

- `workflow.md` - 作業フローの詳細
- `backend-architecture.md` - backend のレイヤードアーキテクチャ
- `web-*.md` - web 固有のルール（i18n, Server Components など）
