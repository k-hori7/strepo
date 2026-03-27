import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export type PricingSectionProps = {
  planName?: string;
  planSubtitle?: string;
  price?: string;
  priceUnit?: string;
  pricePer?: string;
  priceDescription?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaNote?: string;
  features?: string[];
}

export function PricingSection({
  planName = "シンプルプラン",
  planSubtitle = "初期費用・月額費用は一切かかりません",
  price = "5,500",
  priceUnit = "円 (税込)",
  pricePer = "/ 1社・1回",
  priceDescription = "50人未満の小規模事業所に特化した料金設定。実施するたびにお支払いいただく都度課金型です。",
  ctaText = "今すぐ無料でアカウント作成",
  ctaHref = "/signup",
  ctaNote = "※ 医師用アカウントの作成は無料です",
  features = [
    "顧問先（プロジェクト）作成無制限",
    "クラウドデータ保存（5年間）",
    "電子申請用XMLのダウンロード",
  ],
}: PricingSectionProps) {
  return (
    <section id="pricing" className="bg-slate-50 py-16 md:py-24 px-6 md:px-20">
      <div className="max-w-[512px] mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-teal-600 px-6 py-4 text-center">
            <h3 className="text-lg font-bold text-white">{planName}</h3>
            <p className="text-sm text-teal-100 font-light">{planSubtitle}</p>
          </div>

          {/* Body */}
          <div className="px-10 pt-10 pb-8 flex flex-col items-center gap-4">
            <div className="flex items-center justify-center">
              <span className="text-5xl font-black text-slate-900 tracking-tight">
                {price}
              </span>
              <div className="flex flex-col ml-2">
                <span className="text-sm font-bold text-slate-900">
                  {priceUnit}
                </span>
                <span className="text-xs text-slate-500">{pricePer}</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 font-light text-center">
              {priceDescription}
            </p>
            <Link
              href={ctaHref}
              className="bg-slate-900 text-white font-bold text-base px-6 py-4 rounded-lg shadow-lg w-full text-center hover:bg-slate-800 transition-colors"
            >
              {ctaText}
            </Link>
            <p className="text-xs text-slate-400 font-light">{ctaNote}</p>
          </div>

          {/* Feature list */}
          <div className="bg-slate-50 border-t border-slate-100 px-10 py-6">
            <div className="flex flex-col gap-3">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-teal-600 flex-shrink-0" />
                  <span className="text-sm text-slate-600 font-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
