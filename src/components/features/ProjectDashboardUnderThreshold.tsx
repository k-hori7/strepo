"use client";

import { QrCode, Copy, CreditCard, ArrowRight, Lock } from "lucide-react";

type ProjectDashboardUnderThresholdProps = {
  companyName: string;
  fiscalYear: number;
  surveyUrl: string;
  completedCount: number;
  capacity: number;
  thresholdCount?: number;
  price?: number;
  onCopyUrl?: () => void;
  onPayment?: () => void;
};

export function ProjectDashboardUnderThreshold({
  companyName,
  fiscalYear,
  surveyUrl,
  completedCount,
  capacity,
  thresholdCount = 10,
  price = 5500,
  onCopyUrl,
  onPayment,
}: ProjectDashboardUnderThresholdProps) {
  const safeSurveyUrl = /^https?:\/\//.test(surveyUrl) ? surveyUrl : "#";
  const percent =
    capacity > 0 ? Math.round((completedCount / capacity) * 100) : 0;
  const remaining = Math.max(0, thresholdCount - completedCount);
  const formattedPrice = price.toLocaleString("ja-JP");

  const progressLabel =
    capacity === 0
      ? "回答進捗（定員未設定）"
      : `回答進捗 ${completedCount}名 / ${capacity}名（${percent}%）`;

  const handleCopy = () => {
    if (onCopyUrl) {
      onCopyUrl();
    } else {
      navigator.clipboard.writeText(surveyUrl).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="w-full max-w-[672px] mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 py-4">
          <h1 className="text-2xl font-black text-slate-900 text-center">
            {companyName}{" "}
            <span className="font-normal text-slate-400">{fiscalYear}</span>
          </h1>
          <span className="bg-teal-100 text-teal-600 text-[10px] font-black uppercase tracking-wide px-3 py-1 rounded-full">
            受検実施中
          </span>
        </div>

        {/* 受検用URLカード */}
        <div className="bg-slate-900 rounded-[40px] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
              <QrCode className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <span className="text-sm font-black text-white">
              受検用URL（従業員配布用）
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col gap-4">
            <a
              href={safeSurveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`受検用URL（新しいタブで開きます）: ${surveyUrl}`}
              className="text-teal-300 font-mono text-[13.9px] text-center block hover:text-teal-200 transition-colors break-all"
            >
              {surveyUrl}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="受検用URLをコピー"
              className="w-full bg-white/10 hover:bg-white/20 rounded-2xl py-3 flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <Copy className="w-4 h-4 text-white" aria-hidden="true" />
              <span className="text-xs font-black text-white" aria-hidden="true">
                コピー
              </span>
            </button>
          </div>
        </div>

        {/* 決済カード */}
        <div className="bg-white border border-slate-200 rounded-3xl p-[41px] shadow-sm flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
              <CreditCard
                className="w-6 h-6 text-slate-400"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-slate-900">
                決済後にURL先が使用可能になります。
              </p>
              <p className="text-xs text-slate-500">
                決済前は解答欄を非活性化しております。決済完了後、即座に利用可能になります。
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* 料金ボックス */}
            <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wide">
                  お支払い金額（一律）
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22.7px] font-bold text-slate-900">
                    ¥{formattedPrice}
                  </span>
                  <span className="text-xs text-slate-400">/ 税込</span>
                </div>
              </div>
              <span className="bg-white border border-teal-200 text-teal-600 text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                Flat Rate
              </span>
            </div>

            {/* 決済ボタン */}
            <div className="border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={onPayment}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-[13.9px] font-bold rounded-2xl py-4 flex items-center justify-center gap-2 shadow-[0_20px_25px_-5px_rgba(13,148,136,0.2),0_8px_10px_-6px_rgba(13,148,136,0.2)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <span>決済用リンクを発行する (Stripe)</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* 回答進捗カード */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-[25px] shadow-sm flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black italic text-slate-900 font-['Inter']">
                {completedCount}
              </span>
              <span className="text-sm font-bold text-slate-400">
                / {capacity} 名回答済み
              </span>
            </div>
            <span className="text-2xl font-black italic text-teal-600 font-['Inter']">
              {percent}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={progressLabel}
            className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"
          >
            <div
              data-testid="progress-bar-fill"
              className="h-full bg-teal-600 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* レポートロックカード */}
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-[40px] p-[49px] flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center shrink-0">
            <Lock className="w-7 h-7 text-slate-300" aria-hidden="true" />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm font-black text-slate-400">
              組織分析レポートは現在ロックされています
            </p>
            <p className="text-[11px] font-light text-slate-400 leading-relaxed">
              個人特定を防ぐため、回答者が{" "}
              <strong className="font-black text-slate-900">
                {thresholdCount}名
              </strong>{" "}
              を超えると
              <br />
              自動的に分析グラフが生成されます。
            </p>
          </div>
          <span className="bg-white border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-wide px-4 py-2 rounded-full">
            あと {remaining} 名の回答が必要です
          </span>
        </div>
      </div>
    </div>
  );
}
