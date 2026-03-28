"use client";

import { Logo } from "@/components/shared/Logo";

type SettingsHeaderProps = {
  className?: string;
};

export function SettingsHeader({ className }: SettingsHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-slate-200 ${className ?? ""}`}
    >
      <div className="flex items-center justify-between px-6 h-14">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="button"
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-[0_10px_15px_-3px_rgba(13,148,136,0.2),0_4px_6px_-4px_rgba(13,148,136,0.2)] transition-colors"
          >
            変更を保存
          </button>
        </div>
      </div>
    </header>
  );
}
