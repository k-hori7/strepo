import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectPasscodeGate } from "./ProjectPasscodeGate";

describe("ProjectPasscodeGate", () => {
  it("正常にレンダリングされる", () => {
    render(<ProjectPasscodeGate onSubmit={() => {}} />);
    expect(screen.getByText("プロジェクト保護")).toBeInTheDocument();
    expect(screen.getByText("4桁のパスコード")).toBeInTheDocument();
  });

  it("4つの入力ボックスが表示される", () => {
    render(<ProjectPasscodeGate onSubmit={() => {}} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  it("4桁入力前はボタンが無効化されている", () => {
    render(<ProjectPasscodeGate onSubmit={() => {}} />);
    expect(
      screen.getByRole("button", { name: /認証してダッシュボードを表示/ })
    ).toBeDisabled();
  });

  it("4桁入力後にボタンが有効化される", () => {
    render(<ProjectPasscodeGate onSubmit={() => {}} />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, i) => {
      fireEvent.change(input, { target: { value: String(i + 1) } });
    });
    expect(
      screen.getByRole("button", { name: /認証してダッシュボードを表示/ })
    ).toBeEnabled();
  });

  it("4桁入力後にフォームを送信すると onSubmit が呼ばれる", () => {
    const onSubmit = vi.fn();
    render(<ProjectPasscodeGate onSubmit={onSubmit} />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, i) => {
      fireEvent.change(input, { target: { value: String(i + 1) } });
    });
    fireEvent.submit(screen.getByRole("form", { hidden: true }) ?? inputs[0].closest("form")!);
    expect(onSubmit).toHaveBeenCalledWith("1234");
  });

  it("ボタンクリックで onSubmit が呼ばれる", () => {
    const onSubmit = vi.fn();
    render(<ProjectPasscodeGate onSubmit={onSubmit} />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, i) => {
      fireEvent.change(input, { target: { value: String(i + 1) } });
    });
    fireEvent.click(
      screen.getByRole("button", { name: /認証してダッシュボードを表示/ })
    );
    expect(onSubmit).toHaveBeenCalledWith("1234");
  });

  it("数字以外の入力は無視される", () => {
    render(<ProjectPasscodeGate onSubmit={() => {}} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "a" } });
    expect(inputs[0]).toHaveValue("");
  });

  it("1桁入力すると次の入力にフォーカスが移る", () => {
    render(<ProjectPasscodeGate onSubmit={() => {}} />);
    const inputs = screen.getAllByRole("textbox");
    inputs[0].focus();
    fireEvent.change(inputs[0], { target: { value: "1" } });
    expect(document.activeElement).toBe(inputs[1]);
  });

  it("Backspace で空の場合は前の入力にフォーカスが移る", () => {
    render(<ProjectPasscodeGate onSubmit={() => {}} />);
    const inputs = screen.getAllByRole("textbox");
    inputs[1].focus();
    fireEvent.keyDown(inputs[1], { key: "Backspace" });
    expect(document.activeElement).toBe(inputs[0]);
  });

  it("エラーメッセージが表示される", () => {
    render(
      <ProjectPasscodeGate
        onSubmit={() => {}}
        error="パスコードが正しくありません。もう一度お試しください。"
      />
    );
    expect(
      screen.getByText("パスコードが正しくありません。もう一度お試しください。")
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("error Prop が設定されると入力がリセットされる", () => {
    const { rerender } = render(<ProjectPasscodeGate onSubmit={() => {}} />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, i) => {
      fireEvent.change(input, { target: { value: String(i + 1) } });
    });
    // 全桁入力済みを確認
    expect(inputs[0]).toHaveValue("1");

    // エラーを注入 → リセットされるはず
    rerender(
      <ProjectPasscodeGate
        onSubmit={() => {}}
        error="パスコードが正しくありません。もう一度お試しください。"
      />
    );
    inputs.forEach((input) => {
      expect(input).toHaveValue("");
    });
  });

  it("エラー時に入力が aria-invalid になる", () => {
    render(
      <ProjectPasscodeGate
        onSubmit={() => {}}
        error="パスコードが正しくありません。もう一度お試しください。"
      />
    );
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("エラー時に入力が aria-describedby でエラーメッセージを参照する", () => {
    render(
      <ProjectPasscodeGate
        onSubmit={() => {}}
        error="パスコードが正しくありません。もう一度お試しください。"
      />
    );
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("aria-describedby", "passcode-error");
    });
  });

  it("isLoading=true のとき4桁入力済みでもボタンが無効化される", () => {
    render(<ProjectPasscodeGate onSubmit={() => {}} isLoading={true} />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, i) => {
      fireEvent.change(input, { target: { value: String(i + 1) } });
    });
    expect(
      screen.getByRole("button", { name: /認証してダッシュボードを表示/ })
    ).toBeDisabled();
  });

  it("ヘルプテキストが表示される", () => {
    render(<ProjectPasscodeGate onSubmit={() => {}} />);
    expect(
      screen.getByText(/担当の産業医へ直接お問い合わせください。/)
    ).toBeInTheDocument();
  });
});
