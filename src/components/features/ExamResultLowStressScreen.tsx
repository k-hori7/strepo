import { Camera, CheckCircle, TrendingDown, TrendingUp } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import {
  type BarData,
  type BarItem,
  type RadarData,
  type ScoreItem,
  RadarChart,
} from "./ExamResultShared";

type ExamResultLowStressScreenProps = {
  reportId?: string;
  scores: ScoreItem[];
  radar: RadarData;
  bars: BarData;
};

export const DEFAULT_SCORES: ScoreItem[] = [
  { category: "A", name: "心理的な仕事の負担", score: 82, comparison: "低い" },
  { category: "A", name: "仕事の自立性", score: 115, comparison: "高い" },
  { category: "A", name: "職場の対人関係", score: 105, comparison: "平均的" },
  { category: "B", name: "活気", score: 120, comparison: "高い" },
  { category: "B", name: "疲労感", score: 78, comparison: "低い" },
  { category: "C", name: "上司のサポート", score: 100, comparison: "平均的" },
  { category: "C", name: "同僚のサポート", score: 112, comparison: "高い" },
  { category: "D", name: "仕事の満足度", score: 102, comparison: "平均的" },
];

export const DEFAULT_RADAR: RadarData = {
  demand: 0.82,
  control: 0.75,
  bossSupport: 0.7,
  peerSupport: 0.75,
  relation: 0.75,
};

export const DEFAULT_BARS: BarData = {
  vitality: { label: "活気 (元気度)", value: 0.85, level: "High" },
  fatigue: { label: "疲労感 (低さが良好)", value: 0.2, level: "Low" },
  satisfaction: { label: "仕事の満足度", value: 0.6, level: "Normal" },
};

// --- Bar row ---

const LEVEL_COLOR: Record<BarItem["level"], string> = {
  High: "text-teal-600",
  Low: "text-teal-600",
  Normal: "text-gray-500",
};

function BarRow({ item }: { item: BarItem }) {
  const levelColor = LEVEL_COLOR[item.level];
  const pct = Math.round(item.value * 100);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-700">{item.label}</span>
        <span className={`font-medium ${levelColor}`}>{item.level}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100">
        <div
          className="h-1.5 rounded-full bg-teal-400"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-label={item.label}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

// --- Comparison cell ---

function ComparisonCell({ comparison }: { comparison: ScoreItem["comparison"] }) {
  if (comparison === "高い") {
    // 低ストレス版での「高い」は自立性・活気・サポートなど良好指標の上昇を意味する
    return (
      <span className="inline-flex items-center gap-0.5 font-medium text-teal-600">
        高い
        <TrendingUp size={13} aria-hidden="true" />
      </span>
    );
  }
  if (comparison === "低い") {
    // 低ストレス版での「低い」は仕事の負担・疲労感など負荷指標の低下（良好）を意味する
    return (
      <span className="inline-flex items-center gap-0.5 font-medium text-teal-600">
        低い
        <TrendingDown size={13} aria-hidden="true" />
      </span>
    );
  }
  return <span className="text-gray-500">平均的</span>;
}

// --- Main component ---

export function ExamResultLowStressScreen({
  reportId = "2026-0214-001",
  scores,
  radar,
  bars,
}: ExamResultLowStressScreenProps) {
  return (
    <div className="min-h-screen bg-[#f5faf7]">
      <div className="mx-auto max-w-xl px-4 pb-16 pt-4">
        <header className="flex items-center justify-between py-4">
          <Logo size="md" />
          <span className="text-xs tracking-widest text-gray-400 uppercase">
            Report ID: {reportId}
          </span>
        </header>

        <div className="mt-6 flex flex-col gap-5">
          {/* Section 1: Stable Condition */}
          <section
            aria-labelledby="low-stress-heading"
            className="rounded-2xl bg-white px-8 py-8 shadow-md"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-600">
                <CheckCircle size={12} aria-hidden="true" />
                Stable Condition
              </span>

              <h1
                id="low-stress-heading"
                className="text-3xl font-bold tracking-tight text-gray-900"
              >
                現在のストレスは良好です
              </h1>

              <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                心身の負荷は基準値内に収まっています。現在の良好なリズムを大切に、セルフケアを続けていきましょう。
              </p>
            </div>
          </section>

          {/* Section 2: Visual Profile */}
          <section
            aria-labelledby="visual-profile-heading"
            className="rounded-2xl bg-white px-6 py-6 shadow-sm"
          >
            <div className="mb-4 text-center">
              <h2
                id="visual-profile-heading"
                className="text-xs font-semibold uppercase tracking-widest text-gray-500"
              >
                Visual Profile
              </h2>
              <p className="mt-1 text-xs text-gray-400">外側へ広がっているほど良好な状態です</p>
            </div>

            <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="flex-shrink-0">
                <RadarChart
                  data={radar}
                  fillColor="rgba(52,211,153,0.45)"
                  strokeColor="rgb(16,185,129)"
                />
              </div>
              <div className="w-full max-w-[220px] flex-shrink-0 flex flex-col gap-4">
                <BarRow item={bars.vitality} />
                <BarRow item={bars.fatigue} />
                <BarRow item={bars.satisfaction} />
              </div>
            </div>
          </section>

          {/* Section 3: Detailed Scores */}
          <section aria-labelledby="detailed-scores-heading">
            <h2
              id="detailed-scores-heading"
              className="mb-2 pl-1 text-xs font-semibold uppercase tracking-widest text-gray-500"
            >
              Detailed Scores
            </h2>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
                    <th className="py-3 pl-8 pr-4 text-left font-medium">尺度 (カテゴリー)</th>
                    <th className="px-3 py-3 text-left font-medium">得点</th>
                    <th className="px-4 py-3 text-center font-medium">全国平均比較</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((item, idx) => (
                    <tr
                      key={`${item.category}-${item.name}`}
                      className={`border-b border-gray-50 last:border-0 ${idx % 2 === 0 ? "" : "bg-gray-50/40"}`}
                    >
                      <td className="py-3 pl-8 pr-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-gray-400">
                            {item.category}
                          </span>
                          <span className="text-gray-800">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 font-mono text-gray-700">{item.score}</td>
                      <td className="px-4 py-3 text-center">
                        <ComparisonCell comparison={item.comparison} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Save results */}
          <section
            aria-label="結果の保存"
            className="flex items-center justify-between rounded-xl bg-white px-6 py-5 shadow-sm"
          >
            <div>
              <p className="text-sm font-semibold text-gray-800">結果を保存しましょう</p>
              <p className="mt-0.5 text-xs text-gray-400">
                定期的な振り返りのために、スクリーンショットを推奨します。
              </p>
            </div>
            <Camera size={32} className="flex-shrink-0 text-gray-300" aria-hidden="true" />
          </section>

          <footer className="pb-4 text-center text-[10px] leading-relaxed text-gray-400">
            診断結果は厚生労働省「職業性ストレス簡易調査票」に基づき算出されています。
          </footer>
        </div>
      </div>
    </div>
  );
}
