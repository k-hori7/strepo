import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it("タイトルが表示される", () => {
    expect(screen.getByText("ログイン", { selector: "h1" })).toBeInTheDocument();
  });

  it("メールアドレスの入力欄が表示される", () => {
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("example@medical-inst.jp")).toBeInTheDocument();
  });

  it("パスワードの入力欄が表示される", () => {
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
  });

  it("パスワード表示切替ボタンが機能する", () => {
    const passwordInput = screen.getByLabelText("パスワード");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "パスワードを表示" }));
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByRole("button", { name: "パスワードを隠す" }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("ログイン状態を保持するチェックボックスが表示される", () => {
    expect(screen.getByLabelText("ログイン状態を保持する")).toBeInTheDocument();
  });

  it("パスワードを忘れた場合ボタンが表示される", () => {
    expect(
      screen.getByRole("button", { name: "パスワードを忘れた場合" })
    ).toBeInTheDocument();
  });

  it("ログインボタンが表示される", () => {
    const submitButton = screen.getByRole("button", { name: "ログイン" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("新規登録するリンクが /signup を指す", () => {
    const link = screen.getByRole("link", { name: "新規登録する" });
    expect(link).toHaveAttribute("href", "/signup");
  });

  it("フッターリンクが正しいhrefを持つ", () => {
    expect(screen.getByRole("link", { name: "利用規約" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "プライバシーポリシー" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "特定商取引法に基づく表記" })).toHaveAttribute("href", "/legal");
  });
});
