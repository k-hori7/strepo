import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { DoctorSettings } from "./DoctorSettings";

describe("DoctorSettings", () => {
  beforeEach(() => {
    render(<DoctorSettings />);
  });

  it("医師基本情報セクションが表示される", () => {
    expect(screen.getByText("医師基本情報")).toBeInTheDocument();
    expect(screen.getByLabelText("氏名")).toBeInTheDocument();
    expect(screen.getByLabelText("医籍登録番号")).toBeInTheDocument();
    expect(screen.getByLabelText("日本医師会認定産業医番号")).toBeInTheDocument();
  });

  it("所属機関情報セクションが表示される", () => {
    expect(screen.getByText("所属機関情報")).toBeInTheDocument();
    expect(screen.getByLabelText("所属医療機関・事務所名")).toBeInTheDocument();
    expect(screen.getByLabelText("郵便番号")).toBeInTheDocument();
    expect(screen.getByLabelText("所在地")).toBeInTheDocument();
    expect(screen.getByLabelText("連絡先電話番号（電子申請用）")).toBeInTheDocument();
  });

  it("通知・システム設定セクションが表示される", () => {
    expect(screen.getByText("通知・システム設定")).toBeInTheDocument();
    expect(screen.getByText("面接指導申し出のリアルタイム通知")).toBeInTheDocument();
  });

  it("通知トグルが切り替えられる", () => {
    const toggle = screen.getByRole("switch", { name: "面接指導申し出のリアルタイム通知" });
    expect(toggle).toHaveAttribute("aria-checked", "true");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("アカウント設定セクションが表示される", () => {
    expect(screen.getByText("アカウント設定")).toBeInTheDocument();
    expect(screen.getByText("ログインメールアドレス")).toBeInTheDocument();
    expect(screen.getByText("yamada@example.com")).toBeInTheDocument();
  });

  it("パスワード再設定ボタンがtype=buttonである", () => {
    expect(screen.getByText("パスワード再設定")).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "メールを送信" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("Danger Zoneセクションが表示される", () => {
    expect(screen.getByText("Danger Zone")).toBeInTheDocument();
    expect(screen.getByText("アカウントの削除")).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "退会手続きへ" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("全入力フィールドにplaceholderが設定されている", () => {
    expect(screen.getByPlaceholderText("山田 太郎")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("123456")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("000000")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("〇〇クリニック")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("123-4567")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("東京都中央区銀座1-2-3 〇〇ビル4F")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("03-1234-5678")).toBeInTheDocument();
  });

  it("入力フィールドに適切なautocomplete属性が設定されている", () => {
    expect(screen.getByLabelText("氏名")).toHaveAttribute("autocomplete", "name");
    expect(screen.getByLabelText("郵便番号")).toHaveAttribute("autocomplete", "postal-code");
    expect(screen.getByLabelText("所在地")).toHaveAttribute("autocomplete", "street-address");
    expect(screen.getByLabelText("連絡先電話番号（電子申請用）")).toHaveAttribute("autocomplete", "tel");
  });
});
