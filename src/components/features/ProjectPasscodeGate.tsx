"use client";

import { useRef, useState, useEffect } from "react";
import { Lock, ArrowRight } from "lucide-react";

type ProjectPasscodeGateProps = {
  onSubmit: (passcode: string) => void;
  error?: string;
  isLoading?: boolean;
};

export function ProjectPasscodeGate({
  onSubmit,
  error,
  isLoading = false,
}: ProjectPasscodeGateProps) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [prevError, setPrevError] = useState<string | undefined>(error);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // エラーが発生したとき入力をリセット（render中の state 調整 — React 推奨パターン）
  if (error !== prevError) {
    setPrevError(error);
    if (error) {
      setDigits(["", "", "", ""]);
    }
  }

  // エラー発生後に1桁目へフォーカス移動（DOM操作なので useEffect で実施）
  useEffect(() => {
    if (error) {
      inputRefs.current[0]?.focus();
    }
  }, [error]);

  const isComplete = digits.every((d) => d !== "");
  const passcode = digits.join("");

  const updateDigit = (index: number, value: string) => {
    const next = [...digits];
    next[index] = value;
    setDigits(next);
  };

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    updateDigit(index, digit);
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        updateDigit(index, "");
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    const next = ["", "", "", ""];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setDigits(next);
    if (pasted.length === 4) {
      submitButtonRef.current?.focus();
    } else {
      inputRefs.current[Math.min(pasted.length, 3)]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete && !isLoading) {
      onSubmit(passcode);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[384px] flex flex-col items-center gap-8"
        noValidate
      >
        {/* アイコン + タイトル */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-20 h-20 bg-white border border-slate-100 rounded-[32px] shadow-sm flex items-center justify-center shrink-0">
            <Lock className="w-9 h-9 text-teal-600" aria-hidden="true" />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              プロジェクト保護
            </h1>
            <p className="text-xs font-light text-slate-500 leading-relaxed">
              このページを閲覧するには、産業医から発行された
              <br />
              <strong className="font-bold text-slate-900">
                4桁のパスコード
              </strong>
              を入力してください。
            </p>
          </div>
        </div>

        {/* 入力 + ボタン */}
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-3">
            {/* 4桁入力 */}
            <div
              role="group"
              aria-label="4桁のパスコード入力"
              className="flex justify-between px-2"
            >
              {digits.map((digit, i) => (
                <input
                  key={`digit-${i}`}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  autoComplete="off"
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  onFocus={(e) => e.target.select()}
                  aria-label={`パスコード ${i + 1}桁目`}
                  aria-invalid={!!error}
                  aria-describedby={error ? "passcode-error" : undefined}
                  className={`w-16 h-16 bg-white border-2 rounded-2xl shadow-sm text-center text-2xl font-bold text-slate-900 caret-transparent focus:outline-none transition-colors ${
                    error
                      ? "border-red-300 focus:border-red-500"
                      : digit
                        ? "border-teal-500 focus:border-teal-600"
                        : "border-slate-200 focus:border-teal-500"
                  }`}
                />
              ))}
            </div>

            {/* エラーメッセージ */}
            {error && (
              <p
                id="passcode-error"
                role="alert"
                className="text-xs text-red-600 text-center"
              >
                {error}
              </p>
            )}
          </div>

          {/* 送信ボタン */}
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={!isComplete || isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-[13px] font-black rounded-3xl py-4 flex items-center justify-center gap-2 shadow-[0_20px_25px_-5px_#e2e8f0,0_8px_10px_-6px_#e2e8f0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            <span>認証してダッシュボードを表示</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* ヘルプテキスト */}
        <p className="text-[10px] font-medium text-slate-400 text-center leading-relaxed max-w-[240px]">
          パスコードが分からない、または紛失した場合は、
          <br />
          担当の産業医へ直接お問い合わせください。
        </p>
      </form>
    </div>
  );
}
