"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

type SignupFormProps = {
  className?: string;
};

const inputBaseClass =
  "w-full bg-white border border-gray-200 rounded-lg py-3.5 text-base text-slate-900 placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent";

export function SignupForm({ className }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`w-full max-w-[460px] flex flex-col gap-8 ${className ?? ""}`}>
      {/* サインアップカード */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
        <div className="px-8 pt-8 pb-12 flex flex-col gap-8">
          {/* カードヘッダー */}
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              アカウント作成
            </h1>
            <p className="text-sm font-light text-gray-500 text-center">
              産業医（医師）として登録を開始します
            </p>
          </div>

          {/* フォーム */}
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            {/* 氏名 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                氏名
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="山田 太郎"
                className={`${inputBaseClass} px-4`}
              />
            </div>

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
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                パスワード
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="8文字以上の英数字"
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

            {/* 同意チェックボックス */}
            <div className="flex gap-3 items-start py-2">
              <input
                id="agreement"
                type="checkbox"
                className="mt-1 w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600 shrink-0"
              />
              <label
                htmlFor="agreement"
                className="text-xs font-light text-gray-600 leading-relaxed"
              >
                <Link href="/terms" className="text-teal-600 hover:text-teal-700">
                  利用規約
                </Link>
                および
                <Link href="/privacy" className="text-teal-600 hover:text-teal-700">
                  プライバシーポリシー
                </Link>
                に同意して、ストレポの利用を開始します。
              </label>
            </div>

            {/* 送信ボタン */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-base rounded-lg py-3.5 shadow-[0_10px_15px_-3px_rgba(13,150,139,0.2),0_4px_6px_-4px_rgba(13,150,139,0.2)] transition-colors"
            >
              無料で始める
            </button>
          </form>
        </div>

        {/* ログイン誘導 */}
        <div className="bg-slate-50/50 border-t border-slate-100 px-8 py-6 flex items-center justify-center gap-1.5">
          <p className="text-sm font-light text-slate-500">
            既にアカウントをお持ちですか？
          </p>
          <Link
            href="/login"
            className="text-sm font-bold text-teal-600 hover:text-teal-700"
          >
            ログイン
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
