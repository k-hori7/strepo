import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ClientDetail } from "./ClientDetail";
import { highStressEmployees } from "./ClientDetail.fixtures";

describe("ClientDetail", () => {
  it("デフォルト（実施中）で正常にレンダリングされる", () => {
    render(<ClientDetail />);
    expect(screen.getByText("株式会社BBB")).toBeInTheDocument();
    expect(screen.getByText("実施中")).toBeInTheDocument();
  });

  it("「実施を強制終了する」ボタンが実施中で表示される", () => {
    render(<ClientDetail status="in_progress" />);
    expect(screen.getByText("実施を強制終了する")).toBeInTheDocument();
  });

  it("「実施を強制終了する」ボタンが要対応で表示される", () => {
    render(<ClientDetail status="action_required" />);
    expect(screen.getByText("実施を強制終了する")).toBeInTheDocument();
  });

  it("「実施を強制終了する」ボタンが未決済で表示される", () => {
    render(<ClientDetail status="unpaid" />);
    expect(screen.getByText("実施を強制終了する")).toBeInTheDocument();
  });

  it("未決済では検索バーが表示されない", () => {
    render(<ClientDetail status="unpaid" />);
    expect(
      screen.queryByPlaceholderText("受検者を検索...")
    ).not.toBeInTheDocument();
  });

  it("「実施を強制終了する」ボタンが報告完了で表示されない", () => {
    render(<ClientDetail status="completed" />);
    expect(screen.queryByText("実施を強制終了する")).not.toBeInTheDocument();
  });

  it("報告完了で「編集不可」バッジが表示される", () => {
    render(<ClientDetail status="completed" />);
    expect(
      screen.getByText("このプロジェクトは編集不可です")
    ).toBeInTheDocument();
  });

  it("要対応でアラートバナーが表示される", () => {
    render(
      <ClientDetail
        status="action_required"
        alertMessage="高ストレス者が5名検出されました。早急に内容を確認してください。"
      />
    );
    expect(
      screen.getByText(
        "高ストレス者が5名検出されました。早急に内容を確認してください。"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Immediate")).toBeInTheDocument();
  });

  it("実施中ではアラートバナーが表示されない", () => {
    render(<ClientDetail status="in_progress" />);
    expect(screen.queryByText("Immediate")).not.toBeInTheDocument();
  });

  it("報告完了でProject Completedバナーが表示される", () => {
    render(<ClientDetail status="completed" completedAt="2026/02/04" />);
    expect(screen.getByText("Project Completed")).toBeInTheDocument();
    expect(screen.getByText("2026/02/04")).toBeInTheDocument();
  });

  it("報告完了でダウンロードカードが表示される", () => {
    render(<ClientDetail status="completed" />);
    expect(screen.getByText("1. 厚労省への報告用データ")).toBeInTheDocument();
    expect(screen.getByText("2. 受検結果の保存用データ")).toBeInTheDocument();
    expect(screen.getByText("XMLファイルをダウンロード")).toBeInTheDocument();
    expect(screen.getByText("全受検結果CSVをダウンロード")).toBeInTheDocument();
  });

  it("実施中ではダウンロードカードが表示されない", () => {
    render(<ClientDetail status="in_progress" />);
    expect(
      screen.queryByText("XMLファイルをダウンロード")
    ).not.toBeInTheDocument();
  });

  it("要対応で高ストレス者バッジが表示される", () => {
    render(
      <ClientDetail
        status="action_required"
        employees={highStressEmployees}
        stats={{
          completionRate: 80,
          completedCount: 40,
          highStressCount: 4,
          interviewRequestCount: 3,
        }}
      />
    );
    const badges = screen.getAllByText("高ストレス");
    expect(badges.length).toBeGreaterThan(0);
  });

  it("実施中では高ストレス者バッジが表示されない", () => {
    render(
      <ClientDetail status="in_progress" employees={highStressEmployees} />
    );
    expect(screen.queryByText("高ストレス")).not.toBeInTheDocument();
  });

  it("要対応で面談希望ありが表示される", () => {
    render(
      <ClientDetail
        status="action_required"
        employees={highStressEmployees}
        stats={{
          completionRate: 80,
          completedCount: 40,
          highStressCount: 4,
          interviewRequestCount: 3,
        }}
      />
    );
    const interviewLabels = screen.getAllByText("面談希望あり");
    expect(interviewLabels.length).toBeGreaterThan(0);
  });

  it("要対応で検索バーが表示される", () => {
    render(<ClientDetail status="action_required" />);
    expect(
      screen.getByPlaceholderText("受検者を検索...")
    ).toBeInTheDocument();
  });

  it("実施中では検索バーが表示されない", () => {
    render(<ClientDetail status="in_progress" />);
    expect(
      screen.queryByPlaceholderText("受検者を検索...")
    ).not.toBeInTheDocument();
  });

  it("onViewEmployee コールバックが呼ばれる", () => {
    const onViewEmployee = vi.fn();
    render(
      <ClientDetail
        status="in_progress"
        employees={[
          { id: "test-1", name: "テスト受検者", birthDate: "1990/01/01" },
        ]}
        onViewEmployee={onViewEmployee}
      />
    );
    fireEvent.click(screen.getByLabelText("テスト受検者の結果を表示"));
    expect(onViewEmployee).toHaveBeenCalledWith("test-1");
  });

  it("onForceEnd コールバックが呼ばれる", () => {
    const onForceEnd = vi.fn();
    render(<ClientDetail status="in_progress" onForceEnd={onForceEnd} />);
    fireEvent.click(screen.getByText("実施を強制終了する"));
    expect(onForceEnd).toHaveBeenCalled();
  });

  it("検索でリストがフィルタリングされる", () => {
    render(
      <ClientDetail
        status="action_required"
        employees={[
          { id: "1", name: "田中 太郎", birthDate: "1990/01/01" },
          { id: "2", name: "鈴木 花子", birthDate: "1985/05/15" },
        ]}
      />
    );
    const searchInput = screen.getByPlaceholderText("受検者を検索...");
    fireEvent.change(searchInput, { target: { value: "田中" } });
    expect(screen.getByText("田中 太郎")).toBeInTheDocument();
    expect(screen.queryByText("鈴木 花子")).not.toBeInTheDocument();
  });

  it("検索していない場合「全リスト表示中」フッターが表示される", () => {
    render(<ClientDetail />);
    expect(screen.getByText("全リスト表示中")).toBeInTheDocument();
  });

  it("検索でフィルタ時は件数付きフッターが表示される", () => {
    render(
      <ClientDetail
        status="action_required"
        employees={[
          { id: "1", name: "田中 太郎", birthDate: "1990/01/01" },
          { id: "2", name: "鈴木 花子", birthDate: "1985/05/15" },
        ]}
      />
    );
    const searchInput = screen.getByPlaceholderText("受検者を検索...");
    fireEvent.change(searchInput, { target: { value: "田中" } });
    expect(screen.getByText("1 件表示中（全 2 件中）")).toBeInTheDocument();
  });

  it("ステータスバッジが正しく表示される", () => {
    const { rerender } = render(<ClientDetail status="in_progress" />);
    expect(screen.getByText("実施中")).toBeInTheDocument();

    rerender(<ClientDetail status="unpaid" />);
    expect(screen.getByText("未決済")).toBeInTheDocument();

    rerender(<ClientDetail status="action_required" />);
    expect(screen.getByText("要対応")).toBeInTheDocument();

    rerender(<ClientDetail status="completed" />);
    expect(screen.getByText("報告完了")).toBeInTheDocument();
  });

  it("報告完了で最終受検率ラベルが表示される", () => {
    render(<ClientDetail status="completed" />);
    expect(screen.getByText("最終受検率")).toBeInTheDocument();
  });

  it("実施中では受検率ラベルが表示される", () => {
    render(<ClientDetail status="in_progress" />);
    expect(screen.getByText("受検率")).toBeInTheDocument();
  });
});
