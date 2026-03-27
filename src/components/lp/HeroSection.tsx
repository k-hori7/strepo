import { ArrowRight } from "lucide-react";
import { MacBookMockup } from "./mockups/MacBookMockup";
import { IPhoneMockup } from "./mockups/IPhoneMockup";

export type HeroSectionProps = {
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
