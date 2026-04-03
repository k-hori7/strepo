import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectDashboardUnderThreshold } from "./ProjectDashboardUnderThreshold";

const defaultProps = {
  companyName: "新宿物流センター",
  fiscalYear: 2026,
  surveyUrl: "https://stre-po.com/survey/aj82-k92l-px93",
  completedCount: 4,
  capacity: 50,
};

describe("ProjectDashboardUnderThreshold", () => {
  it("会社名と年度が表示される", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} />);
    expect(screen.getByText("新宿物流センター")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("受検用URLが表示される", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} />);
    expect(
      screen.getByText("https://stre-po.com/survey/aj82-k92l-px93")
    ).toBeInTheDocument();
  });

  it("surveyUrl が https 以外の場合リンクの href が # になる", () => {
    render(
      <ProjectDashboardUnderThreshold
        {...defaultProps}
        surveyUrl="javascript:alert(1)"
      />
    );
    const link = screen.getByRole("link", { name: /受検用URL/ });
    expect(link).toHaveAttribute("href", "#");
  });

  it("コピーボタンで onCopyUrl が呼ばれる", () => {
    const onCopyUrl = vi.fn();
    render(
      <ProjectDashboardUnderThreshold {...defaultProps} onCopyUrl={onCopyUrl} />
    );
    fireEvent.click(screen.getByRole("button", { name: "受検用URLをコピー" }));
    expect(onCopyUrl).toHaveBeenCalled();
  });

  it("onCopyUrl 未定義でもコピーボタンが表示される", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: "受検用URLをコピー" })
    ).toBeInTheDocument();
  });

  it("決済ボタンで onPayment が呼ばれる", () => {
    const onPayment = vi.fn();
    render(
      <ProjectDashboardUnderThreshold
        {...defaultProps}
        onPayment={onPayment}
      />
    );
    fireEvent.click(
      screen.getByRole("button", { name: /決済用リンクを発行する/ })
    );
    expect(onPayment).toHaveBeenCalled();
  });

  it("回答数と定員が表示される", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} />);
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("/ 50 名回答済み")).toBeInTheDocument();
  });

  it("パーセントが正しく計算される（4/50 = 8%）", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} />);
    expect(screen.getByText("8%")).toBeInTheDocument();
  });

  it("プログレスバーの幅が正しい", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} />);
    const fill = screen.getByTestId("progress-bar-fill") as HTMLElement;
    expect(fill.style.width).toBe("8%");
  });

  it("progressbar の aria-valuenow が正しい", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "8"
    );
  });

  it("capacity=0 のとき aria-label が「定員未設定」を示す", () => {
    render(
      <ProjectDashboardUnderThreshold {...defaultProps} capacity={0} />
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "回答進捗（定員未設定）"
    );
  });

  it("残り人数が正しく表示される（thresholdCount=10, completedCount=4 → あと6名）", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} />);
    expect(screen.getByText("あと 6 名の回答が必要です")).toBeInTheDocument();
  });

  it("thresholdCount のデフォルト値は 10", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} />);
    expect(screen.getByText(/10名/)).toBeInTheDocument();
  });

  it("thresholdCount を変更すると残り人数が変わる", () => {
    render(
      <ProjectDashboardUnderThreshold
        {...defaultProps}
        completedCount={3}
        thresholdCount={15}
      />
    );
    expect(screen.getByText("あと 12 名の回答が必要です")).toBeInTheDocument();
  });

  it("price が正しくフォーマットされて表示される", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} price={5500} />);
    expect(screen.getByText("¥5,500")).toBeInTheDocument();
  });

  it("price のデフォルト値は ¥5,500", () => {
    render(<ProjectDashboardUnderThreshold {...defaultProps} />);
    expect(screen.getByText("¥5,500")).toBeInTheDocument();
  });
});
