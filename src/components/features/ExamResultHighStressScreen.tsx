import { AlertTriangle, Camera, TrendingUp } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { ExamResultInterviewButton } from "./ExamResultInterviewButton";

type ScoreItem = {
  category: "A" | "B" | "C" | "D";
  name: string;
  score: number;
  comparison: "高い" | "低い" | "平均的";
};

type RadarData = {
  /** 各軸の値。0.0（最低）〜 1.0（最高）の相対値。1 = 外側 = 良好 */
  demand: number;
  control: number;
  bossSupport: number;
  peerSupport: number;
  relation: number;
};

type BarItem = {
  label: string;
  /** バーの幅を決める値。0.0 〜 1.0 */
  value: number;
  level: "Low" | "High";
};

type BarData = {
  vitality: BarItem;
  fatigue: BarItem;
  satisfaction: BarItem;
};

type ExamResultHighStressScreenProps = {
  reportId?: string;
  scores: ScoreItem[];
  radar: RadarData;
  bars: BarData;
  onApplyInterview?: () => void;
};

export const DEFAULT_SCORES: ScoreItem[] = [
  { category: "A", name: "心理的な仕事の負担", score: 142, comparison: "高い" },
  { category: "A", name: "仕事の自立性", score: 72, comparison: "低い" },
  { category: "A", name: "職場の対人関係", score: 128, comparison: "高い" },
  { category: "B", name: "活気", score: 45, comparison: "低い" },
  { category: "B", name: "疲労感", score: 135, comparison: "高い" },
  { category: "C", name: "上司のサポート", score: 65, comparison: "低い" },
  { category: "C", name: "同僚のサポート", score: 98, comparison: "平均的" },
  { category: "D", name: "仕事の満足度", score: 55, comparison: "低い" },
];

export const DEFAULT_RADAR: RadarData = {
  demand: 0.25,
  control: 0.2,
  bossSupport: 0.2,
  peerSupport: 0.5,
  relation: 0.3,
};

export const DEFAULT_BARS: BarData = {
  vitality: { label: "活気 (元気度)", value: 0.25, level: "Low" },
  fatigue: { label: "疲労感 (低さが良好)", value: 0.9, level: "High" },
  satisfaction: { label: "仕事の満足度", value: 0.3, level: "Low" },
};

// --- Radar chart ---

const CX = 110;
const CY = 110;
const OUTER_R = 80;
const LABEL_R = OUTER_R + 26;

const RADAR_AXES = [
  { angle: 270, labelJa: "仕事の負担", labelEn: "Demand", key: "demand" as keyof RadarData },
  { angle: 342, labelJa: "自立性", labelEn: "Control", key: "control" as keyof RadarData },
  { angle: 54, labelJa: "上司支援", labelEn: "Boss Sup.", key: "bossSupport" as keyof RadarData },
  { angle: 126, labelJa: "同僚支援", labelEn: "Peer Sup.", key: "peerSupport" as keyof RadarData },
  { angle: 198, labelJa: "対人関係", labelEn: "Relation", key: "relation" as keyof RadarData },
];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function vertex(angle: number, radius: number): [number, number] {
  return [CX + radius * Math.cos(toRad(angle)), CY + radius * Math.sin(toRad(angle))];
}

function toPoints(fractions: number[]): string {
  return RADAR_AXES.map((ax, i) => {
    const [x, y] = vertex(ax.angle, OUTER_R * Math.max(0.05, fractions[i]));
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

function gridPoints(frac: number): string {
  return RADAR_AXES.map((ax) => {
    const [x, y] = vertex(ax.angle, OUTER_R * frac);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

function labelAnchor(angle: number): "middle" | "start" | "end" {
  const [lx] = vertex(angle, LABEL_R);
  if (Math.abs(lx - CX) < 5) return "middle";
  return lx > CX ? "start" : "end";
}

function RadarChart({ data }: { data: RadarData }) {
  const fractions = RADAR_AXES.map((ax) => data[ax.key]);

  return (
    <svg
      viewBox="0 0 220 220"
      width="200"
      height="200"
      overflow="visible"
      aria-hidden="true"
    >
      {[0.33, 0.66, 1].map((f) => (
        <polygon
          key={f}
          points={gridPoints(f)}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      ))}
      {RADAR_AXES.map((ax) => {
        const [x, y] = vertex(ax.angle, OUTER_R);
        return (
          <line
            key={ax.key}
            x1={CX}
            y1={CY}
            x2={x}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={toPoints(fractions)}
        fill="rgba(248,113,113,0.45)"
        stroke="rgb(239,68,68)"
        strokeWidth="1.5"
      />
      {RADAR_AXES.map((ax) => {
        const [lx, ly] = vertex(ax.angle, LABEL_R);
        const anchor = labelAnchor(ax.angle);
        return (
          <text key={ax.key} textAnchor={anchor} fontSize="8" fill="#374151">
            <tspan x={lx.toFixed(2)} y={ly.toFixed(2)}>
              {ax.labelJa}
            </tspan>
            <tspan x={lx.toFixed(2)} dy="9" fill="#9ca3af" fontSize="6.5">
              {ax.labelEn}
            </tspan>
          </text>
        );
      })}
    </svg>
  );
}

// --- Bar row ---

function BarRow({ item }: { item: BarItem }) {
  const levelColor = item.level === "High" ? "text-red-500" : "text-gray-500";
  const pct = Math.round(item.value * 100);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-700">{item.label}</span>
        <span className={`font-medium ${levelColor}`}>{item.level}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100">
        <div
          className="h-1.5 rounded-full bg-red-400"
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
    return (
      <span className="inline-flex items-center gap-0.5 font-medium text-red-500">
        高い
        <TrendingUp size={13} aria-hidden="true" />
      </span>
    );
  }
  if (comparison === "低い") {
    return <span className="font-medium text-red-500">低い</span>;
  }
  return <span className="text-gray-500">平均的</span>;
}

// --- Main component ---

export function ExamResultHighStressScreen({
  reportId = "2026-0214-082",
  scores,
  radar,
  bars,
  onApplyInterview,
}: ExamResultHighStressScreenProps) {
  return (
    <div className="min-h-screen bg-[#fdf8f8]">
      <div className="mx-auto max-w-xl px-4 pb-16 pt-4">
        <header className="flex items-center justify-between py-4">
          <Logo size="md" />
          <span className="text-xs tracking-widest text-gray-400 uppercase">
            Report ID: {reportId}
          </span>
        </header>

        <div className="mt-6 flex flex-col gap-5">
          {/* Section 1: High Stress Alert */}
          <section
            aria-labelledby="high-stress-heading"
            className="rounded-2xl bg-white px-8 py-8 shadow-md"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-500">
                <AlertTriangle size={12} aria-hidden="true" />
                High Stress Detected
              </span>

              <h1
                id="high-stress-heading"
                className="text-3xl font-bold tracking-tight text-gray-900"
              >
                高ストレス状態にあります
              </h1>

              <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                心身に強い負荷がかかっている可能性があります。一人で抱え込まず、専門家への相談を検討してください。
              </p>

              <ExamResultInterviewButton onClick={onApplyInterview} />
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
                <RadarChart data={radar} />
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
                      key={idx}
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
          <section className="flex items-center justify-between rounded-xl bg-white px-6 py-5 shadow-sm">
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
