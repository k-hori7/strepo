import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { SignupForm } from "./SignupForm";

describe("SignupForm", () => {
  beforeEach(() => {
    render(<SignupForm />);
  });

  it("タイトルが表示される", () => {
    expect(screen.getByText("アカウント作成", { selector: "h1" })).toBeInTheDocument();
  });

  it("サブタイトルが表示される", () => {
    expect(screen.getByText("産業医（医師）として登録を開始します")).toBeInTheDocument();
  });

  it("氏名の入力欄が表示される", () => {
    expect(screen.getByLabelText("氏名")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("山田 太郎")).toBeInTheDocument();
  });

  it("メールアドレスの入力欄が表示される", () => {
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("example@medical-inst.jp")).toBeInTheDocument();
  });

  it("パスワードの入力欄が表示される", () => {
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("8文字以上の英数字")).toBeInTheDocument();
  });

  it("パスワード表示切替ボタンが機能する", () => {
    const passwordInput = screen.getByLabelText("パスワード");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "パスワードを表示" }));
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByRole("button", { name: "パスワードを隠す" }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("同意チェックボックスが表示される", () => {
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("同意文中の利用規約リンクが正しいhrefを持つ", () => {
    const termsLinks = screen.getAllByRole("link", { name: "利用規約" });
    expect(termsLinks[0]).toHaveAttribute("href", "/terms");
  });

  it("同意文中のプライバシーポリシーリンクが正しいhrefを持つ", () => {
    const privacyLinks = screen.getAllByRole("link", { name: "プライバシーポリシー" });
    expect(privacyLinks[0]).toHaveAttribute("href", "/privacy");
  });

  it("送信ボタンが表示される", () => {
    const submitButton = screen.getByRole("button", { name: "無料で始める" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("ログインリンクが /login を指す", () => {
    const link = screen.getByRole("link", { name: "ログイン" });
    expect(link).toHaveAttribute("href", "/login");
  });

  it("フッターリンクが正しいhrefを持つ", () => {
    const footer = screen.getByRole("navigation", { name: "フッター" });
    expect(within(footer).getByRole("link", { name: "利用規約" })).toHaveAttribute("href", "/terms");
    expect(within(footer).getByRole("link", { name: "プライバシーポリシー" })).toHaveAttribute("href", "/privacy");
    expect(within(footer).getByRole("link", { name: "特定商取引法に基づく表記" })).toHaveAttribute("href", "/legal");
  });
});
