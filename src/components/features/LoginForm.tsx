"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

type LoginFormProps = {
  className?: string;
};

const inputBaseClass =
  "w-full bg-white border border-gray-200 rounded-lg py-3.5 text-base text-slate-900 placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent";

export function LoginForm({ className }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`w-full max-w-[440px] flex flex-col gap-12 ${className ?? ""}`}>
      {/* ログインカード */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
        <div className="p-8 flex flex-col gap-8">
          {/* カードヘッダー */}
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              ログイン
            </h1>
            <p className="text-sm font-light text-gray-500 text-center">
              メールアドレスとパスワードを入力してください
            </p>
          </div>

          {/* フォーム */}
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            {/* メールアドレス */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="example@medical-inst.jp"
                className={`${inputBaseClass} px-4`}
              />
            </div>

            {/* パスワード */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  パスワード
                </label>
                {/* TODO: パスワードリセットページのルートが決まったら Link に置き換える */}
                <button
                  type="button"
                  className="text-xs font-medium text-teal-600 hover:text-teal-700"
                >
                  パスワードを忘れた場合
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`${inputBaseClass} pl-4 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ログイン状態を保持する */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
              />
              <label
                htmlFor="remember"
                className="text-sm font-light text-gray-600"
              >
                ログイン状態を保持する
              </label>
            </div>

            {/* 送信ボタン */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-base rounded-lg py-3.5 shadow-[0_10px_15px_-3px_rgba(13,150,139,0.2),0_4px_6px_-4px_rgba(13,150,139,0.2)] transition-colors"
            >
              ログイン
            </button>
          </form>
        </div>

        {/* サインアップ誘導 */}
        <div className="bg-slate-50/50 border-t border-slate-100 px-8 py-6 flex flex-col items-center gap-1">
          <p className="text-sm font-light text-slate-500">
            アカウントをお持ちでないですか？
          </p>
          <Link
            href="/signup"
            className="text-sm font-bold text-teal-600 hover:text-teal-700"
          >
            新規登録する
          </Link>
        </div>
      </div>

      {/* フッターリンク */}
      <nav aria-label="フッター" className="flex items-center justify-center gap-6 flex-wrap">
        <Link
          href="/terms"
          className="text-xs font-light text-gray-400 hover:text-gray-500"
        >
          利用規約
        </Link>
        <Link
          href="/privacy"
          className="text-xs font-light text-gray-400 hover:text-gray-500"
        >
          プライバシーポリシー
        </Link>
        <Link
          href="/legal"
          className="text-xs font-light text-gray-400 hover:text-gray-500"
        >
          特定商取引法に基づく表記
        </Link>
      </nav>

      {/* コピーライト */}
      <p className="text-xs text-gray-400 font-inter text-center">
        © 2026 Stre-Po. All rights reserved.
      </p>
    </div>
  );
}
