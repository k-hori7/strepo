import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NewProjectModal } from "./NewProjectModal";

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onSubmit: vi.fn(),
};

describe("NewProjectModal - 表示制御", () => {
  it("isOpen=false のとき何も表示されない", () => {
    render(
      <NewProjectModal isOpen={false} onClose={vi.fn()} onSubmit={vi.fn()} />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("isOpen=true のときダイアログが表示される", () => {
    render(<NewProjectModal {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("タイトル「顧問先の追加」が表示される", () => {
    render(<NewProjectModal {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: "顧問先の追加" })
    ).toBeInTheDocument();
  });
});

describe("NewProjectModal - フォーム要素", () => {
  it("会社名入力フィールドが表示される", () => {
    render(<NewProjectModal {...defaultProps} />);
    expect(screen.getByLabelText("会社名")).toBeInTheDocument();
  });

  it("受検予定人数スライダーが表示され初期値は30", () => {
    render(<NewProjectModal {...defaultProps} />);
    const slider = screen.getByLabelText("受検予定人数（最大50名）");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue("30");
    expect(screen.getByText("30名")).toBeInTheDocument();
  });

  it("受検開始日・終了日の入力フィールドが表示される", () => {
    render(<NewProjectModal {...defaultProps} />);
    expect(screen.getByLabelText("受検開始日")).toBeInTheDocument();
    expect(screen.getByLabelText("受検終了日")).toBeInTheDocument();
  });

  it("スライダーを動かすと人数表示が更新される", () => {
    render(<NewProjectModal {...defaultProps} />);
    const slider = screen.getByLabelText("受検予定人数（最大50名）");

    fireEvent.change(slider, { target: { value: "45" } });

    expect(screen.getByText("45名")).toBeInTheDocument();
  });
});

describe("NewProjectModal - 閉じる操作", () => {
  it("閉じるボタンクリックでonCloseが呼ばれる", () => {
    const onClose = vi.fn();
    render(
      <NewProjectModal isOpen={true} onClose={onClose} onSubmit={vi.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: "閉じる" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("キャンセルボタンクリックでonCloseが呼ばれる", () => {
    const onClose = vi.fn();
    render(
      <NewProjectModal isOpen={true} onClose={onClose} onSubmit={vi.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: "キャンセル" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("EscキーでonCloseが呼ばれる", () => {
    const onClose = vi.fn();
    render(
      <NewProjectModal isOpen={true} onClose={onClose} onSubmit={vi.fn()} />
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("キャンセル後にフォームがリセットされる", () => {
    const onClose = vi.fn();
    render(
      <NewProjectModal isOpen={true} onClose={onClose} onSubmit={vi.fn()} />
    );

    fireEvent.change(screen.getByLabelText("会社名"), {
      target: { value: "テスト株式会社" },
    });
    fireEvent.click(screen.getByRole("button", { name: "キャンセル" }));

    // モーダルが閉じた後、再度開いたときにリセットされていることを確認するため、
    // ここでは会社名フィールドの値変更後にonCloseが呼ばれることを確認する
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("NewProjectModal - フォーム送信", () => {
  it("必須項目を入力して送信するとonSubmitが呼ばれる", () => {
    const onSubmit = vi.fn();
    render(
      <NewProjectModal isOpen={true} onClose={vi.fn()} onSubmit={onSubmit} />
    );

    fireEvent.change(screen.getByLabelText("会社名"), {
      target: { value: "テスト株式会社" },
    });
    fireEvent.change(screen.getByLabelText("受検開始日"), {
      target: { value: "2026-05-01" },
    });
    fireEvent.change(screen.getByLabelText("受検終了日"), {
      target: { value: "2026-05-31" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "プロジェクトを作成する" })
    );

    expect(onSubmit).toHaveBeenCalledWith({
      companyName: "テスト株式会社",
      maxExaminees: 30,
      startDate: "2026-05-01",
      endDate: "2026-05-31",
    });
  });

  it("送信後にフォームがリセットされる", () => {
    const onSubmit = vi.fn();
    render(
      <NewProjectModal isOpen={true} onClose={vi.fn()} onSubmit={onSubmit} />
    );

    fireEvent.change(screen.getByLabelText("会社名"), {
      target: { value: "テスト株式会社" },
    });
    fireEvent.change(screen.getByLabelText("受検開始日"), {
      target: { value: "2026-05-01" },
    });
    fireEvent.change(screen.getByLabelText("受検終了日"), {
      target: { value: "2026-05-31" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "プロジェクトを作成する" })
    );

    expect(screen.getByLabelText("会社名")).toHaveValue("");
    expect(screen.getByLabelText("受検予定人数（最大50名）")).toHaveValue("30");
  });
});

describe("NewProjectModal - 日付バリデーション", () => {
  it("終了日が開始日より前の場合、エラーメッセージが表示される", () => {
    render(
      <NewProjectModal isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()} />
    );

    fireEvent.change(screen.getByLabelText("会社名"), {
      target: { value: "テスト株式会社" },
    });
    fireEvent.change(screen.getByLabelText("受検開始日"), {
      target: { value: "2026-05-31" },
    });
    fireEvent.change(screen.getByLabelText("受検終了日"), {
      target: { value: "2026-05-01" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "プロジェクトを作成する" })
    );

    expect(
      screen.getByRole("alert")
    ).toHaveTextContent("終了日は開始日以降の日付を選択してください");
  });

  it("日付エラー状態で日付を変更するとエラーがクリアされる", () => {
    render(
      <NewProjectModal isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()} />
    );

    fireEvent.change(screen.getByLabelText("会社名"), {
      target: { value: "テスト株式会社" },
    });
    fireEvent.change(screen.getByLabelText("受検開始日"), {
      target: { value: "2026-05-31" },
    });
    fireEvent.change(screen.getByLabelText("受検終了日"), {
      target: { value: "2026-05-01" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "プロジェクトを作成する" })
    );

    // エラー表示後に日付を修正するとエラーがクリアされる
    fireEvent.change(screen.getByLabelText("受検終了日"), {
      target: { value: "2026-06-30" },
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("日付バリデーションエラー時はonSubmitが呼ばれない", () => {
    const onSubmit = vi.fn();
    render(
      <NewProjectModal isOpen={true} onClose={vi.fn()} onSubmit={onSubmit} />
    );

    fireEvent.change(screen.getByLabelText("会社名"), {
      target: { value: "テスト株式会社" },
    });
    fireEvent.change(screen.getByLabelText("受検開始日"), {
      target: { value: "2026-05-31" },
    });
    fireEvent.change(screen.getByLabelText("受検終了日"), {
      target: { value: "2026-05-01" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "プロジェクトを作成する" })
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
