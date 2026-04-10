"use client";

import { ClipboardList } from "lucide-react";

type ExamResultInterviewButtonProps = {
  onClick?: () => void;
};

export function ExamResultInterviewButton({ onClick }: ExamResultInterviewButtonProps) {
  return (
    <div className="mt-2 w-full">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-700 active:scale-[0.98]"
      >
        <ClipboardList size={18} aria-hidden="true" />
        産業医との面談を申し込む
      </button>
      <p className="mt-3 text-center text-[10px] leading-relaxed text-gray-400">
        ※ボタンを押すと実施事務従事者へ通知されます。不利益な取扱いは法律で禁止されています。
      </p>
    </div>
  );
}
