import { Users, FileText, Coins, Download } from "lucide-react";
import type { ReactNode } from "react";

type FeatureCard = {
  icon: ReactNode;
  title: string;
  description: string;
  snippet: ReactNode;
}

export type FeaturesSectionProps = {
  heading?: string;
  subheading?: string;
  cards?: FeatureCard[];
}

function NoRosterSnippet() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex flex-col gap-3">
      <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400">従業員一覧</span>
        <span className="bg-slate-100 text-slate-500 text-[10px] font-medium px-2 py-0.5 rounded-full">
          登録不要
        </span>
      </div>
      <div className="opacity-50 flex flex-col gap-2">
        <div className="bg-slate-100 h-2 rounded w-full" />
        <div className="bg-slate-100 h-2 rounded w-2/3" />
      </div>
      <div className="flex justify-center pt-1">
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded px-3 py-1.5">
          <span className="text-xs text-slate-400 font-light">
            データは自動集計されます
          </span>
        </div>
      </div>
    </div>
  );
}

function XmlExportSnippet() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex flex-col items-center gap-4 py-8">
      <div className="bg-green-50 rounded-lg p-3">
        <FileText className="w-8 h-8 text-green-600" />
      </div>
      <div className="bg-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-2 w-full justify-center shadow-sm">
        <Download className="w-4 h-4" />
        厚労省形式XMLを出力
      </div>
    </div>
  );
}

function PricingSnippet() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          1社・1回あたり
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            5,500
          </span>
          <span className="text-sm font-medium text-slate-500">円(税込)</span>
        </div>
        <span className="bg-slate-100 text-red-600 text-xs font-light px-2 py-1 rounded mt-1">
          業界最安水準
        </span>
      </div>
    </div>
  );
}

const defaultCards: FeatureCard[] = [
  {
    icon: <Users className="w-6 h-6 text-teal-600" />,
    title: "名簿登録不要",
    description:
      "従業員情報のCSVインポートや手入力作業は一切不要です。",
    snippet: <NoRosterSnippet />,
  },
  {
    icon: <FileText className="w-6 h-6 text-teal-600" />,
    title: "厚労省形式XML",
    description:
      "提出用のフォーマットで即座に出力。加工作業ゼロで報告完了。",
    snippet: <XmlExportSnippet />,
  },
  {
    icon: <Coins className="w-6 h-6 text-teal-600" />,
    title: "シンプルな料金",
    description:
      "実施時だけの都度課金だから、小規模事業所にも最適。実施時以外は全て無料利用可能。",
    snippet: <PricingSnippet />,
  },
];

export function FeaturesSection({
  heading = "医師の業務フローを最適化",
  subheading = "煩雑なストレスチェック業務を、Stre-Poなら低価格でシンプルに。余計な機能は削ぎ落とし、本当に必要な機能だけを搭載しました。",
  cards = defaultCards,
}: FeaturesSectionProps) {
  return (
    <section id="features" className="bg-white py-16 md:py-24 px-6 md:px-20">
      <div className="max-w-[1280px] mx-auto px-0 md:px-8">
        <div className="flex flex-col gap-4 items-center mb-12 md:mb-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {heading}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-light">
            {subheading}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm overflow-hidden p-px"
            >
              <div className="p-6 flex flex-col gap-3.5">
                <div className="flex items-center gap-2">
                  {card.icon}
                  <h3 className="text-base font-bold text-slate-900">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 font-light">
                  {card.description}
                </p>
                {card.snippet}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
