import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_BARS,
  DEFAULT_RADAR,
  DEFAULT_SCORES,
  ExamResultLowStressScreen,
} from "./ExamResultLowStressScreen";

const defaultProps = {
  scores: DEFAULT_SCORES,
  radar: DEFAULT_RADAR,
  bars: DEFAULT_BARS,
};

describe("ExamResultLowStressScreen", () => {
  it("ヘッダーのレポートIDが表示される", () => {
    render(<ExamResultLowStressScreen {...defaultProps} reportId="2026-0214-001" />);
    expect(screen.getByText(/2026-0214-001/)).toBeInTheDocument();
  });

  it("Stable Condition バッジが表示される", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    expect(screen.getByText(/Stable Condition/i)).toBeInTheDocument();
  });

  it("低ストレス見出しが表示される", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: "現在のストレスは良好です" })
    ).toBeInTheDocument();
  });

  it("面談申込ボタンが表示されない", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    expect(
      screen.queryByRole("button", { name: /産業医との面談を申し込む/ })
    ).not.toBeInTheDocument();
  });

  it("スコアデータが表示される", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    expect(screen.getByText("心理的な仕事の負担")).toBeInTheDocument();
    expect(screen.getByText("82")).toBeInTheDocument();
    expect(screen.getByText("活気")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
  });

  it("カスタムの reportId が表示される", () => {
    render(<ExamResultLowStressScreen {...defaultProps} reportId="2025-1234-999" />);
    expect(screen.getByText(/2025-1234-999/)).toBeInTheDocument();
  });

  it("Detailed Scores テーブルが表示される", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    expect(screen.getByText("Detailed Scores")).toBeInTheDocument();
    expect(screen.getByText("尺度 (カテゴリー)")).toBeInTheDocument();
    expect(screen.getByText("全国平均比較")).toBeInTheDocument();
  });

  it("Visual Profile セクションが表示される", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    expect(screen.getByText("Visual Profile")).toBeInTheDocument();
    expect(screen.getByText("外側へ広がっているほど良好な状態です")).toBeInTheDocument();
  });

  it("バーチャートのラベルが表示される", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    expect(screen.getByText("活気 (元気度)")).toBeInTheDocument();
    expect(screen.getByText("疲労感 (低さが良好)")).toBeInTheDocument();
    expect(screen.getAllByText("仕事の満足度").length).toBeGreaterThanOrEqual(1);
  });

  it("progressbar に aria-label が設定されている", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    expect(screen.getByRole("progressbar", { name: "活気 (元気度)" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "疲労感 (低さが良好)" })).toBeInTheDocument();
  });

  it("progressbar の aria-valuenow が正しく設定されている", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    const vitality = screen.getByRole("progressbar", { name: "活気 (元気度)" });
    expect(vitality).toHaveAttribute("aria-valuenow", "85");
    const fatigue = screen.getByRole("progressbar", { name: "疲労感 (低さが良好)" });
    expect(fatigue).toHaveAttribute("aria-valuenow", "20");
  });

  it("結果を保存しましょうセクションが表示される", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    expect(screen.getByText("結果を保存しましょう")).toBeInTheDocument();
  });

  it("フッターの免責文言が表示される", () => {
    render(<ExamResultLowStressScreen {...defaultProps} />);
    expect(screen.getByText(/職業性ストレス簡易調査票/)).toBeInTheDocument();
  });
});
