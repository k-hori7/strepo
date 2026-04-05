"use client";

import { QrCode, Copy } from "lucide-react";

type RadarAxis = {
  label: string;
  nationalAverage: number;
  companyScore: number;
};

type InsightCard = {
  type: "good" | "notice";
  title: string;
  body: string;
};

type ProjectDashboardOverThresholdProps = {
  companyName: string;
  fiscalYear: number;
  surveyUrl: string;
  completedCount: number;
  capacity: number;
  /** 5要素のみラベル表示対応 */
  radarData?: RadarAxis[];
  insights?: InsightCard[];
  onCopyUrl?: () => void;
};

const DEFAULT_RADAR_DATA: RadarAxis[] = [
  { label: "心理的な仕事の負担", nationalAverage: 100, companyScore: 75 },
  { label: "仕事の自律性", nationalAverage: 100, companyScore: 85 },
  { label: "上司の支援", nationalAverage: 100, companyScore: 90 },
  { label: "同僚の支援", nationalAverage: 100, companyScore: 95 },
  { label: "職場環境の満足度", nationalAverage: 100, companyScore: 70 },
];

const DEFAULT_INSIGHTS: InsightCard[] = [
  {
    type: "good",
    title: "周囲のサポート：",
    body: "全国平均を大きく上回っています。従業員同士の助け合いが活発で、メンタルヘルス不調を防ぐ強い基盤があります。",
  },
  {
    type: "notice",
    title: "心理的負担：",
    body: "基準値に近い状態です。業務量や質に偏りがないか定期的にヒアリングを行い、負担の分散を検討してください。",
  },
];

const CHART_SIZE = 320;
const CHART_CX = CHART_SIZE / 2;
const CHART_CY = CHART_SIZE / 2;
const CHART_MAX_R = CHART_SIZE * 0.4; // 128px

function getRadarPoint(value: number, axisIndex: number, n: number) {
  const angle = -Math.PI / 2 + (2 * Math.PI * axisIndex) / n;
  const r = (value / 100) * CHART_MAX_R;
  return {
    x: CHART_CX + r * Math.cos(angle),
    y: CHART_CY + r * Math.sin(angle),
  };
}

function buildPolygonPoints(values: number[], n: number): string {
  return values
    .map((v, i) => {
      const p = getRadarPoint(v, i, n);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");
}

// 5軸ペンタゴン用ラベル位置（チャートコンテナの % + 微調整 transform）
const PENTAGON_LABEL_POSITIONS = [
  // Axis 0: top（心理的な仕事の負担）
  { left: "50%", top: "10%", transform: "translate(-50%, calc(-100% - 6px))" },
  // Axis 1: top-right（仕事の自律性）
  { left: "88%", top: "37.6%", transform: "translate(8px, -50%)" },
  // Axis 2: bottom-right（上司の支援）
  { left: "73.5%", top: "82.4%", transform: "translate(-50%, 6px)" },
  // Axis 3: bottom-left（同僚の支援）
  { left: "26.5%", top: "82.4%", transform: "translate(-50%, 6px)" },
  // Axis 4: top-left（職場環境の満足度）
  { left: "11.96%", top: "37.6%", transform: "translate(calc(-100% - 8px), -50%)" },
];

export function ProjectDashboardOverThreshold({
  companyName,
  fiscalYear,
  surveyUrl,
  completedCount,
  capacity,
  radarData = DEFAULT_RADAR_DATA,
  insights = DEFAULT_INSIGHTS,
  onCopyUrl,
}: ProjectDashboardOverThresholdProps) {
  const safeSurveyUrl = /^https?:\/\//.test(surveyUrl) ? surveyUrl : "#";
  const percent =
    capacity > 0 ? Math.round((completedCount / capacity) * 100) : 0;
  const progressLabel =
    capacity === 0
      ? "回答進捗（定員未設定）"
      : `回答進捗 ${completedCount}名 / ${capacity}名（${percent}%）`;

  if (process.env.NODE_ENV === "development" && radarData.length !== 5) {
    console.warn(
      `ProjectDashboardOverThreshold: radarData は5要素を想定していますが、${radarData.length}要素が渡されました。ラベルは表示されません。`,
    );
  }

  const handleCopy = () => {
    if (onCopyUrl) {
      onCopyUrl();
    } else {
      navigator.clipboard.writeText(surveyUrl).catch(() => {});
    }
  };

  const n = radarData.length;
  const rings = Array.from({ length: 4 }, (_, level) => {
    const r = ((level + 1) / 4) * CHART_MAX_R;
    return Array.from({ length: n }, (_, i) => {
      const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
      return `${(CHART_CX + r * Math.cos(angle)).toFixed(1)},${(CHART_CY + r * Math.sin(angle)).toFixed(1)}`;
    }).join(" ");
  });
  const outerVertices = Array.from({ length: n }, (_, i) =>
    getRadarPoint(100, i, n),
  );
  const avgPoints = buildPolygonPoints(
    radarData.map((d) => d.nationalAverage),
    n,
  );
  const scorePoints = buildPolygonPoints(
    radarData.map((d) => d.companyScore),
    n,
  );
  const scoreDots = radarData.map((d, i) => getRadarPoint(d.companyScore, i, n));

  const goodInsights = insights.filter((ins) => ins.type === "good");
  const noticeInsights = insights.filter((ins) => ins.type === "notice");

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
            集計分析公開中
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

        {/* 集団分析レポートカード */}
        <div className="bg-white border border-slate-200 rounded-[40px] p-[41px] shadow-sm flex flex-col gap-10">
          {/* レポートヘッダー */}
          <div className="flex items-start justify-between pb-8 border-b border-slate-50">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">
                Group Analysis
              </span>
              <h2 className="text-xl font-black text-slate-900">
                集団分析レポート
              </h2>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-50 border border-dashed border-slate-300 shrink-0" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                  全国平均 (100)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-600 shrink-0" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                  貴社スコア
                </span>
              </div>
            </div>
          </div>

          {/* レーダーチャート */}
          <div
            className="relative w-full max-w-[320px] mx-auto"
            style={{ aspectRatio: "1" }}
            data-testid="radar-chart"
          >
            <svg
              viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              {/* グリッドリング */}
              {rings.map((points, i) => (
                <polygon
                  key={`ring-${i}`}
                  points={points}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}
              {/* 軸線 */}
              {outerVertices.map((v, i) => (
                <line
                  key={`axis-${i}`}
                  x1={CHART_CX}
                  y1={CHART_CY}
                  x2={v.x.toFixed(1)}
                  y2={v.y.toFixed(1)}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}
              {/* 全国平均ポリゴン（破線） */}
              <polygon
                points={avgPoints}
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* 貴社スコアポリゴン（teal塗り） */}
              <polygon
                points={scorePoints}
                fill="rgba(13,148,136,0.15)"
                stroke="#0d9488"
                strokeWidth="2"
              />
              {/* スコアドット */}
              {scoreDots.map((dot, i) => (
                <circle
                  key={`dot-${i}`}
                  cx={dot.x.toFixed(1)}
                  cy={dot.y.toFixed(1)}
                  r="4.5"
                  fill="#0d9488"
                />
              ))}
            </svg>

            {/* 軸ラベル（5軸ペンタゴン用） */}
            {radarData.length === 5 &&
              PENTAGON_LABEL_POSITIONS.map((pos, i) => (
                <div
                  key={`label-${i}`}
                  className="absolute bg-white border border-slate-100 rounded px-2 py-0.5 shadow-sm text-[9px] font-black text-slate-900 whitespace-nowrap"
                  style={pos}
                  aria-hidden="true"
                >
                  {radarData[i].label}
                </div>
              ))}
          </div>

          {/* インサイトカード */}
          <div className="flex flex-col sm:flex-row gap-4">
            {goodInsights.map((ins, i) => (
              <div
                key={`good-${i}`}
                className="flex-1 bg-[rgba(13,148,136,0.05)] border border-[rgba(13,148,136,0.1)] rounded-3xl p-6 flex flex-col gap-2"
              >
                <span className="text-[10px] font-black text-teal-600 uppercase tracking-wide">
                  Good Points
                </span>
                <div>
                  <p className="text-xs font-black text-slate-900">{ins.title}</p>
                  <p className="text-xs font-light text-slate-600 leading-relaxed">
                    {ins.body}
                  </p>
                </div>
              </div>
            ))}
            {noticeInsights.map((ins, i) => (
              <div
                key={`notice-${i}`}
                className="flex-1 bg-slate-900 rounded-3xl p-6 flex flex-col gap-2 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]"
              >
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-wide">
                  Notice
                </span>
                <div>
                  <p className="text-xs font-black text-white">{ins.title}</p>
                  <p className="text-xs font-light text-slate-300 leading-relaxed">
                    {ins.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* フッター */}
        <div className="border-t border-slate-100 pt-8">
          <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-[1.8px]">
            © {new Date().getFullYear()} Stre-Po Occupational Health
          </p>
        </div>
      </div>
    </div>
  );
}
