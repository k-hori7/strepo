/**
 * ExamResult 系コンポーネント共通の型・定数・RadarChart
 * ExamResultHighStressScreen / ExamResultLowStressScreen から参照する
 */

export type ScoreItem = {
  category: "A" | "B" | "C" | "D";
  name: string;
  score: number;
  comparison: "高い" | "低い" | "平均的";
};

export type RadarData = {
  /** 各軸の値。0.0（最低）〜 1.0（最高）の相対値。1 = 外側 = 良好 */
  demand: number;
  control: number;
  bossSupport: number;
  peerSupport: number;
  relation: number;
};

export type BarItem = {
  label: string;
  /** バーの幅を決める値。0.0 〜 1.0 */
  value: number;
  level: "Low" | "High" | "Normal";
};

export type BarData = {
  vitality: BarItem;
  fatigue: BarItem;
  satisfaction: BarItem;
};

// --- Radar chart constants & utilities ---

export const CX = 110;
export const CY = 110;
export const OUTER_R = 80;
const LABEL_R = OUTER_R + 26;

export const RADAR_AXES: {
  angle: number;
  labelJa: string;
  labelEn: string;
  key: keyof RadarData;
}[] = [
  { angle: 270, labelJa: "仕事の負担", labelEn: "Demand", key: "demand" },
  { angle: 342, labelJa: "自立性", labelEn: "Control", key: "control" },
  { angle: 54, labelJa: "上司支援", labelEn: "Boss Sup.", key: "bossSupport" },
  { angle: 126, labelJa: "同僚支援", labelEn: "Peer Sup.", key: "peerSupport" },
  { angle: 198, labelJa: "対人関係", labelEn: "Relation", key: "relation" },
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

type RadarChartProps = {
  data: RadarData;
  /** ポリゴンの塗りつぶし色。例: "rgba(248,113,113,0.45)" */
  fillColor: string;
  /** ポリゴンのストローク色。例: "rgb(239,68,68)" */
  strokeColor: string;
};

export function RadarChart({ data, fillColor, strokeColor }: RadarChartProps) {
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
        fill={fillColor}
        stroke={strokeColor}
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
