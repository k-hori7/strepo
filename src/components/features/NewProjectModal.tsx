"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type NewProjectFormData = {
  companyName: string;
  maxExaminees: number;
  startDate: string;
  endDate: string;
};

type NewProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewProjectFormData) => void;
};

const labelSecondaryClass =
  "text-[10px] font-bold text-slate-400 tracking-widest uppercase";

export function NewProjectModal({
  isOpen,
  onClose,
  onSubmit,
}: NewProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [companyName, setCompanyName] = useState("");
  const [maxExaminees, setMaxExaminees] = useState(30);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState("");

  // Escキー / フォーカストラップ / 初期フォーカス
  useEffect(() => {
    if (!isOpen) return;

    const firstInput = document.getElementById(
      "company-name"
    ) as HTMLInputElement | null;
    firstInput?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])"
        )
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // スクロールロック（isOpen=true のときのみ設定・解除）
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const fillPct = ((maxExaminees - 1) / 49) * 100;

  const resetForm = () => {
    setCompanyName("");
    setMaxExaminees(30);
    setStartDate("");
    setEndDate("");
    setDateError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate && endDate < startDate) {
      setDateError("終了日は開始日以降の日付を選択してください");
      return;
    }
    onSubmit({ companyName, maxExaminees, startDate, endDate });
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-200/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-[400px] flex flex-col overflow-hidden"
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2
            id="modal-title"
            className="text-xl font-bold text-slate-900"
          >
            顧問先の追加
          </h2>
          <button
            type="button"
            aria-label="閉じる"
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* フォーム本体・フッターをまとめてformで囲む */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="px-6 pb-6 flex flex-col gap-6">
            {/* 説明文 */}
            <p className="text-sm font-light text-slate-500 leading-relaxed">
              ストレスチェックを実施する会社名、受験人数、受験の開始終了日を入力してください。
            </p>

            {/* 会社名 */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="company-name"
                className="text-sm font-medium text-slate-900"
              >
                会社名
              </label>
              <input
                id="company-name"
                type="text"
                required
                autoComplete="organization"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="株式会社ストレポ"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
            </div>

            {/* 受検予定人数 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="max-examinees"
                  className={labelSecondaryClass}
                >
                  受検予定人数（最大50名）
                </label>
                <span className="text-xs font-bold text-teal-600">
                  {maxExaminees}名
                </span>
              </div>
              <input
                id="max-examinees"
                type="range"
                min={1}
                max={50}
                value={maxExaminees}
                onChange={(e) => setMaxExaminees(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-600 [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-teal-600 [&::-moz-range-thumb]:border-0 focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #0d9488 ${fillPct}%, #e2e8f0 ${fillPct}%)`,
                }}
              />
            </div>

            {/* 受検開始日・終了日 */}
            <div className="flex flex-col gap-1.5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="start-date"
                    className={labelSecondaryClass}
                  >
                    受検開始日
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setDateError("");
                    }}
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent ${
                      dateError ? "border-red-400" : "border-slate-200"
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="end-date"
                    className={labelSecondaryClass}
                  >
                    受検終了日
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setDateError("");
                    }}
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent ${
                      dateError ? "border-red-400" : "border-slate-200"
                    }`}
                  />
                </div>
              </div>
              {dateError && (
                <p role="alert" className="text-xs text-red-600">
                  {dateError}
                </p>
              )}
            </div>
          </div>

          {/* フッター */}
          <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-6 py-2 rounded-lg shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              プロジェクトを作成する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
