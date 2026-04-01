"use client";

import { useState, useEffect, useRef } from "react";
import { Info } from "lucide-react";

type DoctorInfo = {
  name: string;
  clinic: string;
  address: string;
  registrationNumber: string;
  phone: string;
};

type ImplementationStats = {
  implementedMonth: string;
  totalEmployees: number;
  testedEmployees: number;
  hasGroupAnalysis: boolean;
};

type XmlDownloadModalProps = {
  isOpen: boolean;
  /**
   * 産業医情報。省略時は「未設定」として表示される。
   * Props が変わってもstate をリセットしたい場合は親から key={projectId} を渡すこと。
   */
  doctorInfo?: DoctorInfo;
  stats?: ImplementationStats;
  defaultInterviewedCount?: number;
  defaultInterviewDoctorCount?: number;
  onCancel: () => void;
  onDownload: (interviewedCount: number, interviewDoctorCount: number) => void;
  onGoToSettings?: () => void;
};

const PLACEHOLDER_DOCTOR_INFO: DoctorInfo = {
  name: "─",
  clinic: "─",
  address: "─",
  registrationNumber: "─",
  phone: "─",
};

const PLACEHOLDER_STATS: ImplementationStats = {
  implementedMonth: "─",
  totalEmployees: 0,
  testedEmployees: 0,
  hasGroupAnalysis: false,
};

const labelClass =
  "text-[10px] font-bold text-slate-400 tracking-widest uppercase";
const valueClass = "text-sm font-bold text-slate-900";
const sectionHeadingClass =
  "border-l-4 border-teal-600 pl-4 text-base font-bold text-slate-900";
const inputClass =
  "w-24 bg-white border border-slate-300 rounded-lg px-3 py-2 text-base font-bold text-slate-900 text-right focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent";

export function XmlDownloadModal({
  isOpen,
  doctorInfo = PLACEHOLDER_DOCTOR_INFO,
  stats = PLACEHOLDER_STATS,
  defaultInterviewedCount = 0,
  defaultInterviewDoctorCount = 1,
  onCancel,
  onDownload,
  onGoToSettings,
}: XmlDownloadModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [interviewedCount, setInterviewedCount] = useState(
    defaultInterviewedCount
  );
  const [interviewDoctorCount, setInterviewDoctorCount] = useState(
    defaultInterviewDoctorCount
  );

  // Escキー + フォーカストラップ + 初期フォーカス
  useEffect(() => {
    if (!isOpen) return;

    // モーダル内最初のフォーカス可能要素に初期フォーカスを移動
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      "button:not([disabled]), input:not([disabled])"
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const all = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])"
        )
      );
      const first = all[0];
      const last = all[all.length - 1];
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
  }, [isOpen, onCancel]);

  // スクロールロック
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInterviewedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setInterviewedCount(Math.max(0, val));
  };

  const handleDoctorCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setInterviewDoctorCount(Math.max(1, val));
  };

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-200/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="xml-modal-title"
        className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-[672px] max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* ヘッダー */}
        <div className="bg-slate-50/50 border-b border-slate-100 px-8 pt-6 pb-6 flex flex-col gap-1 shrink-0">
          <h2
            id="xml-modal-title"
            className="text-xl font-bold text-slate-900"
          >
            報告用データの作成（最終確認）
          </h2>
          <p className="text-sm font-light text-slate-500">
            以下の内容でXMLを生成します。数値に間違いがないか最終確認を行ってください。
          </p>
        </div>

        {/* スクロール可能な本体 */}
        <div className="overflow-y-auto flex flex-col gap-8 px-8 py-8">
          {/* Section 1: 産業医情報 */}
          <section aria-labelledby="section-doctor">
            <div className="flex items-center justify-between mb-4">
              <h3 id="section-doctor" className={sectionHeadingClass}>
                1. 産業医情報（設定から引用）
              </h3>
              {onGoToSettings && (
                <button
                  type="button"
                  onClick={onGoToSettings}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded"
                >
                  設定へ
                </button>
              )}
            </div>
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className={labelClass}>産業医氏名</span>
                  <span className={valueClass}>{doctorInfo.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className={labelClass}>所属医療機関</span>
                  <span className={valueClass}>{doctorInfo.clinic}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className={labelClass}>所在地</span>
                <span className={valueClass}>{doctorInfo.address}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className={labelClass}>医籍登録 / 認定番号</span>
                  <span className={valueClass}>
                    {doctorInfo.registrationNumber}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className={labelClass}>連絡先電話番号</span>
                  <span className={valueClass}>{doctorInfo.phone}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 実施状況 */}
          <section aria-labelledby="section-stats">
            <h3
              id="section-stats"
              className={`${sectionHeadingClass} mb-4`}
            >
              2. 実施状況（自動計算）
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                <span className="text-sm font-light text-slate-500">
                  検査実施年月
                </span>
                <span className={valueClass}>{stats.implementedMonth}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100 sm:pl-8">
                <span className="text-sm font-light text-slate-500">
                  在籍労働者数
                </span>
                <span className={valueClass}>{stats.totalEmployees} 名</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                <span className="text-sm font-light text-slate-500">
                  受検労働者数
                </span>
                <span className={valueClass}>{stats.testedEmployees} 名</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100 sm:pl-8">
                <span className="text-sm font-light text-slate-500">
                  集団ごとの分析
                </span>
                <span
                  className={`text-sm font-bold ${
                    stats.hasGroupAnalysis ? "text-teal-600" : "text-slate-900"
                  }`}
                >
                  {stats.hasGroupAnalysis ? "実施済み（有）" : "未実施（無）"}
                </span>
              </div>
            </div>
          </section>

          {/* Section 3: 面接指導実数 */}
          <section aria-labelledby="section-interview">
            <h3
              id="section-interview"
              className={`${sectionHeadingClass} mb-4`}
            >
              3. 面接指導実数（補正可能）
            </h3>
            <div className="flex flex-col gap-4 px-1">
              <div className="bg-slate-50/30 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-slate-700">
                    面接指導を受けた労働者数
                  </span>
                  <span className="text-[10px] font-light text-slate-400">
                    ※実際に完了した人数
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={interviewedCount}
                    onChange={handleInterviewedChange}
                    aria-label="面接指導を受けた労働者数"
                    className={inputClass}
                  />
                  <span className="text-xs font-bold text-slate-400">名</span>
                </div>
              </div>
              <div className="bg-slate-50/30 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-slate-700">
                    面接指導を実施した医師の数
                  </span>
                  <span className="text-[10px] font-light text-slate-400">
                    ※通常は1名
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={interviewDoctorCount}
                    onChange={handleDoctorCountChange}
                    aria-label="面接指導を実施した医師の数"
                    className={inputClass}
                  />
                  <span className="text-xs font-bold text-slate-400">名</span>
                </div>
              </div>
            </div>
          </section>

          {/* 事業者による追記についての注記 */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
            <Info
              className="w-5 h-5 text-blue-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-bold text-blue-900">
                事業者による追記について
              </h4>
              <p className="text-[11px] font-light text-blue-700 leading-relaxed">
                このXMLには労働保険番号や法人番号などは含まれません。ダウンロード後、事業者がインポートして不足情報を入力するフローとなります。
              </p>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="bg-slate-50/50 border-t border-slate-100 px-8 py-6 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={() => onDownload(interviewedCount, interviewDoctorCount)}
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            XMLをダウンロード
          </button>
        </div>
      </div>
    </div>
  );
}
