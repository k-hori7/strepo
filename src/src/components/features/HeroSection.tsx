import { ArrowRight, Download } from "lucide-react";

export interface HeroSectionProps {
  badge?: string;
  headline?: React.ReactNode;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function HeroSection({
  badge = "2026年の法改正にも完全対応",
  headline,
  description = "医師と企業の負担を最小限にする、最短のストレスチェックツール。面倒な従業員名簿のインポートは不要です。",
  ctaText = "無料で始める (医師用)",
  ctaHref = "#pricing",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-24 pb-16 md:pt-48 md:pb-32 px-6 md:px-28">
      <div className="absolute -right-[200px] -top-[200px] w-[800px] h-[800px] rounded-full bg-teal-200/20 blur-3xl" />
      <div className="absolute -left-[150px] -bottom-[150px] w-[600px] h-[600px] rounded-full bg-slate-200/40 blur-3xl" />

      <div className="relative max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* Content */}
        <div className="flex flex-col gap-6 items-start lg:w-1/2">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-3.5 py-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            <span className="text-xs font-bold text-teal-700">{badge}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {headline ?? (
              <>
                ストレスチェックを名簿レスで。
                <br />
                転記作業ゼロ。
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-400">
                  低価格で快適な体験を。
                </span>
              </>
            )}
          </h1>

          <p className="text-base md:text-lg text-slate-500 font-light max-w-md">
            {description}
          </p>

          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold text-base px-8 h-12 rounded-md shadow-[0_10px_15px_-3px_rgba(13,148,136,0.2),0_4px_6px_-4px_rgba(13,148,136,0.2)] hover:bg-teal-700 transition-colors"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Visual */}
        <div className="relative lg:w-1/2 h-[400px] md:h-[600px] w-full">
          <MacBookMockup />
          <IPhoneMockup />
        </div>
      </div>
    </section>
  );
}

function MacBookMockup() {
  return (
    <div className="absolute left-0 top-[60px] md:top-[91px] w-[85%] max-w-[582px] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 overflow-hidden">
      <div className="bg-white rounded-lg">
        <div className="bg-slate-100 border-b border-slate-200 h-8 flex items-center px-3 gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex h-[200px] md:h-[328px]">
          <div className="bg-slate-50 border-r border-slate-200 w-1/3 p-4 hidden sm:flex flex-col gap-4">
            <div className="bg-slate-200 h-2 rounded w-20" />
            <div className="bg-teal-50 border border-teal-100 rounded p-2">
              <div className="bg-teal-200 h-2 rounded w-24" />
            </div>
            <div className="px-2 pt-1">
              <div className="bg-slate-200 h-2 rounded w-16" />
            </div>
            <div className="px-2 pt-1">
              <div className="bg-slate-200 h-2 rounded w-20" />
            </div>
          </div>
          <div className="flex-1 p-4 md:p-6 flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <div className="bg-slate-200 h-4 rounded w-32" />
              <div className="bg-teal-600 flex items-center gap-1 px-3 py-1 rounded text-xs font-bold text-white">
                <Download className="w-3 h-3" />
                CSV出力
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                ["w-24", "w-24"],
                ["w-20", "w-24 bg-green-200"],
                ["w-28", "w-24"],
              ].map(([left, right], i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-100 rounded p-3 flex items-center justify-between"
                >
                  <div className={`bg-slate-200 h-2 rounded ${left}`} />
                  <div className={`h-2 rounded ${right?.includes("bg-") ? right : `bg-slate-200 ${right}`}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IPhoneMockup() {
  return (
    <div className="absolute right-0 md:right-4 bottom-0 md:bottom-8 w-[140px] md:w-[240px] bg-slate-900 border-[6px] border-slate-800 rounded-[36px] md:rounded-[48px] shadow-2xl p-2.5 md:p-4.5">
      <div className="bg-white border border-slate-700/50 rounded-[28px] md:rounded-[35px] overflow-hidden">
        <div className="bg-slate-50 px-3 md:px-4 pt-8 md:pt-10 pb-4 md:pb-6 flex flex-col gap-3 md:gap-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 h-5 md:h-6 w-20 md:w-28 rounded-b-xl" />
          <div className="flex flex-col items-center gap-1">
            <div className="bg-slate-200 h-1.5 rounded w-24" />
            <div className="bg-slate-300 h-2.5 md:h-3 rounded w-36" />
          </div>
          <div className="flex flex-col gap-2.5 md:gap-4">
            {[true, false, false].map((active, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-lg shadow-sm p-2.5 md:p-3.5 flex items-center gap-2 md:gap-3"
              >
                <div
                  className={`w-3 md:w-4 h-3 md:h-4 rounded-full border-2 ${active ? "border-teal-500" : "border-slate-300"}`}
                />
                <div
                  className={`bg-slate-200 h-2 rounded ${i === 2 ? "w-5/6" : i === 1 ? "w-3/4" : "flex-1"}`}
                />
              </div>
            ))}
          </div>
          <div className="bg-teal-600 rounded-lg shadow-md py-2 md:py-3 text-center">
            <span className="text-[10px] md:text-xs font-bold text-white">
              回答を送信する
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
