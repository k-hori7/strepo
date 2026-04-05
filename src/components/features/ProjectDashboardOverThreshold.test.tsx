import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectDashboardOverThreshold } from "./ProjectDashboardOverThreshold";

const defaultProps = {
  companyName: "新宿物流センター",
  fiscalYear: 2026,
  surveyUrl: "https://stre-po.com/survey/aj82-k92l-px93",
  completedCount: 42,
  capacity: 50,
};

describe("ProjectDashboardOverThreshold", () => {
  it("会社名と年度が表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(screen.getByText("新宿物流センター")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("「集計分析公開中」バッジが表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(screen.getByText("集計分析公開中")).toBeInTheDocument();
  });

  it("受検用URLが表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(
      screen.getByText("https://stre-po.com/survey/aj82-k92l-px93"),
    ).toBeInTheDocument();
  });

  it("surveyUrl が https 以外の場合リンクの href が # になる", () => {
    render(
      <ProjectDashboardOverThreshold
        {...defaultProps}
        surveyUrl="javascript:alert(1)"
      />,
    );
    const link = screen.getByRole("link", { name: /受検用URL/ });
    expect(link).toHaveAttribute("href", "#");
  });

  it("コピーボタンで onCopyUrl が呼ばれる", () => {
    const onCopyUrl = vi.fn();
    render(
      <ProjectDashboardOverThreshold {...defaultProps} onCopyUrl={onCopyUrl} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "受検用URLをコピー" }));
    expect(onCopyUrl).toHaveBeenCalled();
  });

  it("onCopyUrl 未定義でもコピーボタンが表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: "受検用URLをコピー" }),
    ).toBeInTheDocument();
  });

  it("回答数と定員が表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("/ 50 名回答済み")).toBeInTheDocument();
  });

  it("パーセントが正しく計算される（42/50 = 84%）", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(screen.getByText("84%")).toBeInTheDocument();
  });

  it("プログレスバーの幅が正しい", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    const fill = screen.getByTestId("progress-bar-fill") as HTMLElement;
    expect(fill.style.width).toBe("84%");
  });

  it("progressbar の aria-valuenow が正しい", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "84",
    );
  });

  it("capacity=0 のとき aria-label が「定員未設定」を示す", () => {
    render(
      <ProjectDashboardOverThreshold {...defaultProps} capacity={0} />,
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "回答進捗（定員未設定）",
    );
  });

  it("レーダーチャートが表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });

  it("デフォルトのレーダー軸ラベルが表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(screen.getByText("心理的な仕事の負担")).toBeInTheDocument();
    expect(screen.getByText("仕事の自律性")).toBeInTheDocument();
    expect(screen.getByText("上司の支援")).toBeInTheDocument();
    expect(screen.getByText("同僚の支援")).toBeInTheDocument();
    expect(screen.getByText("職場環境の満足度")).toBeInTheDocument();
  });

  it("カスタムレーダーデータのラベルが表示される", () => {
    render(
      <ProjectDashboardOverThreshold
        {...defaultProps}
        radarData={[
          { label: "軸A", nationalAverage: 100, companyScore: 80 },
          { label: "軸B", nationalAverage: 100, companyScore: 70 },
          { label: "軸C", nationalAverage: 100, companyScore: 90 },
          { label: "軸D", nationalAverage: 100, companyScore: 60 },
          { label: "軸E", nationalAverage: 100, companyScore: 85 },
        ]}
      />,
    );
    expect(screen.getByText("軸A")).toBeInTheDocument();
  });

  it("「Good Points」ラベルが表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(screen.getByText("Good Points")).toBeInTheDocument();
  });

  it("「Notice」ラベルが表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(screen.getByText("Notice")).toBeInTheDocument();
  });

  it("デフォルトのインサイトタイトルが表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(screen.getByText("周囲のサポート：")).toBeInTheDocument();
    expect(screen.getByText("心理的負担：")).toBeInTheDocument();
  });

  it("カスタムインサイトが表示される", () => {
    render(
      <ProjectDashboardOverThreshold
        {...defaultProps}
        insights={[
          { type: "good", title: "強み：", body: "良好な状態です。" },
          { type: "notice", title: "注意点：", body: "改善が必要です。" },
        ]}
      />,
    );
    expect(screen.getByText("強み：")).toBeInTheDocument();
    expect(screen.getByText("注意点：")).toBeInTheDocument();
  });

  it("フッターが表示される", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    expect(
      screen.getByText(/Stre-Po Occupational Health/i),
    ).toBeInTheDocument();
  });

  it("フッターに現在年が含まれる", () => {
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${currentYear}`)),
    ).toBeInTheDocument();
  });

  it("onCopyUrl 未定義の場合 navigator.clipboard.writeText が呼ばれる", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });
    render(<ProjectDashboardOverThreshold {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "受検用URLをコピー" }));
    expect(writeText).toHaveBeenCalledWith(defaultProps.surveyUrl);
  });

  it("completedCount > capacity のとき 100% を超えるパーセントが表示される", () => {
    render(
      <ProjectDashboardOverThreshold
        {...defaultProps}
        completedCount={60}
        capacity={50}
      />,
    );
    expect(screen.getByText("120%")).toBeInTheDocument();
  });

  it("insights が空配列でもクラッシュしない", () => {
    render(
      <ProjectDashboardOverThreshold {...defaultProps} insights={[]} />,
    );
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();
  });
});
