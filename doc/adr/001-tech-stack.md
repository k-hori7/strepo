# ADR-001: 技術スタック選定

## Status
Accepted

## Context
ストレスチェックツールを新規開発するにあたり、技術スタックを選定する必要がある。
要件として、Web UI、認証、データベース、決済、メール送信が必要。

## Decision
以下の技術スタックを採用する。

- **TypeScript + React + Next.js (App Router)**: フルスタックフレームワークとしてSSR/RSCを活用
- **Supabase**: PostgreSQL、認証、ストレージをマネージドで提供
- **Vercel**: Next.jsのデプロイ先として最適
- **Stripe**: 決済処理
- **Resend**: トランザクションメール送信
- **Tailwind CSS**: スタイリング

## Consequences
- Next.js App Routerの学習コストがある
- Supabaseに依存するため、将来の移行コストが発生しうる
- Vercel + Supabase + Stripeの組み合わせは実績が多く、情報が豊富
