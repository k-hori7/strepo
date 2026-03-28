import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { PrivacyPolicy } from "./PrivacyPolicy";

describe("PrivacyPolicy", () => {
  beforeEach(() => {
    render(<PrivacyPolicy />);
  });

  it("タイトルが表示される", () => {
    expect(screen.getByText("プライバシーポリシー")).toBeInTheDocument();
  });

  it("最終改定日が表示される", () => {
    expect(screen.getByText("最終改定日：2026年1月30日")).toBeInTheDocument();
  });

  it("全8条の見出しが表示される", () => {
    expect(screen.getByText("第1条（基本方針）")).toBeInTheDocument();
    expect(
      screen.getByText("第2条（収集する情報および収集方法）")
    ).toBeInTheDocument();
    expect(
      screen.getByText("第3条（個人情報の利用目的）")
    ).toBeInTheDocument();
    expect(
      screen.getByText("第4条（名簿レス設計とデータ保護）")
    ).toBeInTheDocument();
    expect(screen.getByText("第5条（データの保存期間）")).toBeInTheDocument();
    expect(
      screen.getByText("第6条（個人情報の第三者提供）")
    ).toBeInTheDocument();
    expect(screen.getByText("第7条（安全管理措置）")).toBeInTheDocument();
    expect(screen.getByText("第8条（お問い合わせ窓口）")).toBeInTheDocument();
  });

  it("前文が表示される", () => {
    expect(
      screen.getByText(/ストレポ運営事務局/)
    ).toBeInTheDocument();
  });

  it("基本方針の強調テキストが表示される", () => {
    expect(
      screen.getByText("「従業員名簿をデータベースに保持しない」")
    ).toBeInTheDocument();
  });
});
