import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EmployeeExamScreen } from "./EmployeeExamScreen";

describe("EmployeeExamScreen", () => {
  it("ヘッダーが表示される", () => {
    render(<EmployeeExamScreen />);
    expect(screen.getByRole("heading", { name: "Stre-Po", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Occupational Stress Questionnaire")).toBeInTheDocument();
  });

  it("プロフィール入力欄が表示される", () => {
    render(<EmployeeExamScreen />);
    expect(screen.getByLabelText("氏名")).toBeInTheDocument();
    expect(screen.getByLabelText("生年月日")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
  });

  it("プロフィール入力の変更が反映される", () => {
    render(<EmployeeExamScreen />);
    const nameInput = screen.getByLabelText("氏名");
    fireEvent.change(nameInput, { target: { value: "山田 太郎" } });
    expect(nameInput).toHaveValue("山田 太郎");

    const emailInput = screen.getByLabelText("メールアドレス");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput).toHaveValue("test@example.com");
  });

  it("セクション A の見出しが h2 で表示される", () => {
    render(<EmployeeExamScreen />);
    expect(
      screen.getByRole("heading", { name: "あなたの仕事について", level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText(/非常にたくさんの仕事をしなければならない/)).toBeInTheDocument();
  });

  it("セクション B の見出しが h2 で表示される", () => {
    render(<EmployeeExamScreen />);
    expect(
      screen.getByRole("heading", { name: "最近1か月のあなたの状態", level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText(/活気がわいてくる/)).toBeInTheDocument();
  });

  it("セクション C の見出しとグループが表示される", () => {
    render(<EmployeeExamScreen />);
    expect(
      screen.getByRole("heading", { name: "周囲の方々について", level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText("上司")).toBeInTheDocument();
    expect(screen.getByText("同僚")).toBeInTheDocument();
    expect(screen.getByText("配偶者、家族、友人等")).toBeInTheDocument();
  });

  it("セクション D の見出しが h2 で表示される", () => {
    render(<EmployeeExamScreen />);
    expect(
      screen.getByRole("heading", { name: "満足度について", level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText(/仕事に満足している/)).toBeInTheDocument();
  });

  it("ラジオボタンを選択すると checked になる", () => {
    render(<EmployeeExamScreen />);
    const radio = screen.getAllByRole("radio", { name: "1: そうだ" })[0];
    expect(radio).not.toBeChecked();
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it("同一質問で別の選択肢を選ぶと前の選択が外れる", () => {
    render(<EmployeeExamScreen />);
    const radio1 = screen.getAllByRole("radio", { name: "1: そうだ" })[0];
    const radio2 = screen.getAllByRole("radio", { name: "2: まあそうだ" })[0];
    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    fireEvent.click(radio2);
    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked();
  });

  it("送信ボタンが表示される", () => {
    render(<EmployeeExamScreen />);
    expect(
      screen.getByRole("button", { name: "回答を完了して送信する" })
    ).toBeInTheDocument();
  });

  it("送信時に onSubmit コールバックが呼ばれる", () => {
    const onSubmit = vi.fn();
    render(<EmployeeExamScreen onSubmit={onSubmit} />);
    fireEvent.submit(
      screen.getByRole("button", { name: "回答を完了して送信する" }).closest("form")!
    );
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ profile: expect.any(Object), answers: expect.any(Object) })
    );
  });

  it("セキュリティ注意書きが表示される", () => {
    render(<EmployeeExamScreen />);
    expect(screen.getByText("Security Notice")).toBeInTheDocument();
    expect(screen.getByText(/この回答は統計的に処理され/)).toBeInTheDocument();
  });
});
