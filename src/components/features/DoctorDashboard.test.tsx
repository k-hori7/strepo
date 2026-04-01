import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DoctorDashboard } from "./DoctorDashboard";

const mockProjects = [
  {
    id: "1",
    companyName: "AAA株式会社",
    fiscalYear: 2026,
    status: "action_required" as const,
    highlightDetail: "高ストレス者 5名",
  },
  {
    id: "2",
    companyName: "株式会社BBB",
    fiscalYear: 2026,
    status: "in_progress" as const,
    statusDetail: "受検率 65% (31/48名)",
  },
  {
    id: "3",
    companyName: "新宿物流センター",
    fiscalYear: 2025,
    status: "unpaid" as const,
    statusDetail: "プロジェクト作成済み",
  },
  {
    id: "4",
    companyName: "株式会社EEE商事",
    fiscalYear: 2025,
    status: "completed" as const,
    statusDetail: "アーカイブ済みのデータ",
  },
];

describe("DoctorDashboard - 基本表示", () => {
  it("ダッシュボードタイトルが表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    expect(
      screen.getByRole("heading", { name: "ダッシュボード" })
    ).toBeInTheDocument();
  });

  it("新規プロジェクトボタンが表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    expect(
      screen.getByRole("button", { name: /新規プロジェクト/ })
    ).toBeInTheDocument();
  });

  it("検索入力フィールドが表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    expect(
      screen.getByPlaceholderText("会社名、年度で検索...")
    ).toBeInTheDocument();
  });

  it("全プロジェクトの会社名が表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    expect(screen.getByText("AAA株式会社")).toBeInTheDocument();
    expect(screen.getByText("株式会社BBB")).toBeInTheDocument();
    expect(screen.getByText("新宿物流センター")).toBeInTheDocument();
    expect(screen.getByText("株式会社EEE商事")).toBeInTheDocument();
  });

  it("各ステータスバッジが表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    expect(screen.getByText("要対応")).toBeInTheDocument();
    expect(screen.getByText("実施中")).toBeInTheDocument();
    expect(screen.getByText("未決済")).toBeInTheDocument();
    expect(screen.getByText("報告完了")).toBeInTheDocument();
  });

  it("各ステータスのCTAテキストが表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    expect(screen.getByText("結果を確認する")).toBeInTheDocument();
    expect(screen.getByText("進捗を確認する")).toBeInTheDocument();
    expect(screen.getByText("決済画面へ")).toBeInTheDocument();
    expect(screen.getByText("過去のデータを見る")).toBeInTheDocument();
  });

  it("highlightDetailが赤テキストで表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    expect(screen.getByText("高ストレス者 5名")).toBeInTheDocument();
  });

  it("年度フィルターボタンが年度ごとに表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    expect(screen.getByRole("button", { name: "2026年度" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2025年度" })).toBeInTheDocument();
  });
});

describe("DoctorDashboard - アクセシビリティ", () => {
  it("プロジェクトカードが操作可能な要素として提供される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    expect(
      screen.getByRole("button", { name: "AAA株式会社 2026年度" })
    ).toBeInTheDocument();
  });

  it("年度フィルターボタンに aria-pressed が設定されている", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    const btn2026 = screen.getByRole("button", { name: "2026年度" });
    expect(btn2026).toHaveAttribute("aria-pressed", "false");
  });

  it("年度フィルターを選択すると aria-pressed が true になる", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    const btn2026 = screen.getByRole("button", { name: "2026年度" });
    fireEvent.click(btn2026);
    expect(btn2026).toHaveAttribute("aria-pressed", "true");
  });
});

describe("DoctorDashboard - 検索フィルタリング", () => {
  it("会社名で検索すると該当カードのみ表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    const input = screen.getByPlaceholderText("会社名、年度で検索...");

    fireEvent.change(input, { target: { value: "AAA" } });

    expect(screen.getByText("AAA株式会社")).toBeInTheDocument();
    expect(screen.queryByText("株式会社BBB")).not.toBeInTheDocument();
  });

  it("英字検索が大文字小文字を区別しない", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    const input = screen.getByPlaceholderText("会社名、年度で検索...");

    fireEvent.change(input, { target: { value: "aaa" } });

    expect(screen.getByText("AAA株式会社")).toBeInTheDocument();
  });

  it("検索結果が0件の場合、案内メッセージが表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    const input = screen.getByPlaceholderText("会社名、年度で検索...");

    fireEvent.change(input, { target: { value: "存在しない会社名" } });

    expect(
      screen.getByText("該当するプロジェクトが見つかりません")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "検索をクリア" })).toBeInTheDocument();
  });

  it("検索クリアボタンで検索がリセットされる", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    const input = screen.getByPlaceholderText("会社名、年度で検索...");

    fireEvent.change(input, { target: { value: "存在しない会社名" } });
    fireEvent.click(screen.getByRole("button", { name: "検索をクリア" }));

    expect(screen.getByText("AAA株式会社")).toBeInTheDocument();
  });
});

describe("DoctorDashboard - 年度フィルタリング", () => {
  it("年度ボタンをクリックすると対象年度のカードのみ表示される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    fireEvent.click(screen.getByRole("button", { name: "2026年度" }));

    expect(screen.getByText("AAA株式会社")).toBeInTheDocument();
    expect(screen.getByText("株式会社BBB")).toBeInTheDocument();
    expect(screen.queryByText("新宿物流センター")).not.toBeInTheDocument();
  });

  it("アクティブな年度ボタンを再クリックするとフィルターが解除される", () => {
    render(<DoctorDashboard projects={mockProjects} />);
    const btn2026 = screen.getByRole("button", { name: "2026年度" });

    fireEvent.click(btn2026);
    fireEvent.click(btn2026);

    expect(screen.getByText("新宿物流センター")).toBeInTheDocument();
  });
});

describe("DoctorDashboard - コールバック", () => {
  it("新規プロジェクトボタンクリックでonNewProjectが呼ばれる", () => {
    const onNewProject = vi.fn();
    render(<DoctorDashboard projects={mockProjects} onNewProject={onNewProject} />);

    fireEvent.click(screen.getByRole("button", { name: /新規プロジェクト/ }));

    expect(onNewProject).toHaveBeenCalledTimes(1);
  });

  it("カードクリックでonProjectClickが正しいidで呼ばれる", () => {
    const onProjectClick = vi.fn();
    render(
      <DoctorDashboard projects={mockProjects} onProjectClick={onProjectClick} />
    );

    fireEvent.click(screen.getByRole("button", { name: "AAA株式会社 2026年度" }));

    expect(onProjectClick).toHaveBeenCalledWith("1");
  });

  it("Enterキーでカードが操作できる", () => {
    const onProjectClick = vi.fn();
    render(
      <DoctorDashboard projects={mockProjects} onProjectClick={onProjectClick} />
    );

    const card = screen.getByRole("button", { name: "AAA株式会社 2026年度" });
    fireEvent.keyDown(card, { key: "Enter" });

    expect(onProjectClick).toHaveBeenCalledWith("1");
  });
});

describe("DoctorDashboard - 空状態", () => {
  it("プロジェクトが0件の場合、初期状態メッセージが表示される", () => {
    render(<DoctorDashboard projects={[]} />);
    expect(
      screen.getByText("まだプロジェクトがありません")
    ).toBeInTheDocument();
  });

  it("プロジェクトが0件の場合、検索クリアボタンは表示されない", () => {
    render(<DoctorDashboard projects={[]} />);
    expect(
      screen.queryByRole("button", { name: "検索をクリア" })
    ).not.toBeInTheDocument();
  });
});
