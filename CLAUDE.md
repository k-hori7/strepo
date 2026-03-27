# strepo - ストレスチェックツール

## プロジェクト概要
ストレスチェックの実施・管理を行うWebアプリケーション。

## 技術スタック
- **言語**: TypeScript
- **フレームワーク**: React, Next.js (App Router)
- **DB/認証/ストレージ**: Supabase
- **ホスティング**: Vercel
- **決済**: Stripe
- **メール**: Resend
- **スタイリング**: Tailwind CSS

## ディレクトリ構造
```
strepo/
├── CLAUDE.md          # このファイル
├── .claude/
│   ├── agents/        # カスタムエージェント定義
│   └── skills/        # カスタムスキル定義
├── doc/               # 要件定義・設計ドキュメント
│   ├── requirements.md
│   ├── db-design.md
│   ├── screen-design.md
│   ├── tech-stack.md
│   └── adr/           # 意思決定記録
├── design/            # Figmaスクリーンショット等
├── .storybook/        # Storybook設定
├── public/            # 静的アセット
└── src/               # ソースコード（Next.js）
    ├── app/           # App Router ページ
    └── components/    # UIコンポーネント
```

## カスタムエージェント
| エージェント | 役割 |
|------------|------|
| `code-reviewer` | プロ品質のコードレビュー（可読性、設計、パフォーマンス） |
| `security-reviewer` | セキュリティ監査（OWASP、RLS、認証、環境変数） |
| `consistency-checker` | 仕様(doc/)とコード・設定の整合性チェック |
| `mentor` | OJTメンター（ヒントと方針で導く、答えは教えない） |
| `devils-advocate` | 批判者（設計の弱点指摘、代替案提示、議論活性化） |

## 開発ルール
- git add / commit / push は手動で行うこと（Claude Codeからは実行しない）
- ドキュメントは `doc/` 配下に集約
- 意思決定の記録は `doc/adr/` にADR形式で残す
- デザインアセットは `design/` に配置

## コーディング規約
- 型定義は `interface` ではなく `type` を使う
