import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  DEFAULT_BARS,
  DEFAULT_RADAR,
  DEFAULT_SCORES,
  ExamResultHighStressScreen,
} from "./ExamResultHighStressScreen";

const defaultProps = {
  scores: DEFAULT_SCORES,
  radar: DEFAULT_RADAR,
  bars: DEFAULT_BARS,
};

describe("ExamResultHighStressScreen", () => {
  it("ヘッダーのレポートIDが表示される", () => {
    render(<ExamResultHighStressScreen {...defaultProps} reportId="2026-0214-082" />);
    expect(screen.getByText(/2026-0214-082/)).toBeInTheDocument();
  });

  it("高ストレスバッジが表示される", () => {
    render(<ExamResultHighStressScreen {...defaultProps} />);
    expect(screen.getByText(/High Stress Detected/i)).toBeInTheDocument();
  });

  it("高ストレス見出しが表示される", () => {
    render(<ExamResultHighStressScreen {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: "高ストレス状態にあります" })
    ).toBeInTheDocument();
  });

  it("面談申込ボタンが表示される", () => {
    render(<ExamResultHighStressScreen {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /産業医との面談を申し込む/ })
    ).toBeInTheDocument();
  });

  it("面談申込ボタンをクリックすると onApplyInterview が呼ばれる", () => {
    const onApplyInterview = vi.fn();
    render(<ExamResultHighStressScreen {...defaultProps} onApplyInterview={onApplyInterview} />);
    fireEvent.click(screen.getByRole("button", { name: /産業医との面談を申し込む/ }));
    expect(onApplyInterview).toHaveBeenCalledOnce();
  });

  it("onApplyInterview が未指定でもボタンクリックしてもクラッシュしない", () => {
    render(<ExamResultHighStressScreen {...defaultProps} />);
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: /産業医との面談を申し込む/ }))
    ).not.toThrow();
  });

  it("スコアデータが表示される", () => {
    render(<ExamResultHighStressScreen {...defaultProps} />);
    expect(screen.getByText("心理的な仕事の負担")).toBeInTheDocument();
    expect(screen.getByText("142")).toBeInTheDocument();
    expect(screen.getByText("疲労感")).toBeInTheDocument();
    expect(screen.getByText("135")).toBeInTheDocument();
  });

  it("カスタムの reportId が表示される", () => {
    render(<ExamResultHighStressScreen {...defaultProps} reportId="2025-1234-999" />);
    expect(screen.getByText(/2025-1234-999/)).toBeInTheDocument();
  });

  it("Detailed Scores テーブルが表示される", () => {
    render(<ExamResultHighStressScreen {...defaultProps} />);
    expect(screen.getByText("Detailed Scores")).toBeInTheDocument();
    expect(screen.getByText("尺度 (カテゴリー)")).toBeInTheDocument();
    expect(screen.getByText("全国平均比較")).toBeInTheDocument();
  });

  it("Visual Profile セクションが表示される", () => {
    render(<ExamResultHighStressScreen {...defaultProps} />);
    expect(screen.getByText("Visual Profile")).toBeInTheDocument();
    expect(screen.getByText("外側へ広がっているほど良好な状態です")).toBeInTheDocument();
  });

  it("バーチャートのラベルが表示される", () => {
    render(<ExamResultHighStressScreen {...defaultProps} />);
    expect(screen.getByText("活気 (元気度)")).toBeInTheDocument();
    expect(screen.getByText("疲労感 (低さが良好)")).toBeInTheDocument();
    // "仕事の満足度" はバーとテーブルの両方に存在するため getAllByText で確認
    expect(screen.getAllByText("仕事の満足度").length).toBeGreaterThanOrEqual(1);
  });

  it("progressbar に aria-label が設定されている", () => {
    render(<ExamResultHighStressScreen {...defaultProps} />);
    expect(screen.getByRole("progressbar", { name: "活気 (元気度)" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "疲労感 (低さが良好)" })).toBeInTheDocument();
  });

  it("結果を保存しましょうセクションが表示される", () => {
    render(<ExamResultHighStressScreen {...defaultProps} />);
    expect(screen.getByText("結果を保存しましょう")).toBeInTheDocument();
  });
});
