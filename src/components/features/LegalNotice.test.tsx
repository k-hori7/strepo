import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { LegalNotice } from "./LegalNotice";

describe("LegalNotice", () => {
  beforeEach(() => {
    render(<LegalNotice />);
  });

  it("タイトルが表示される", () => {
    expect(screen.getByText("特定商取引法に基づく表記")).toBeInTheDocument();
  });

  it("主要なラベルが表示される", () => {
    expect(screen.getByText("販売業者")).toBeInTheDocument();
    expect(screen.getByText("運営責任者")).toBeInTheDocument();
    expect(screen.getByText("販売価格")).toBeInTheDocument();
    expect(screen.getByText("お支払方法")).toBeInTheDocument();
    expect(screen.getByText("返品・交換・キャンセル")).toBeInTheDocument();
  });

  it("メールアドレスが表示される", () => {
    expect(screen.getByText("strepo.official@gmail.com")).toBeInTheDocument();
  });

  it("販売価格が表示される", () => {
    expect(
      screen.getByText(
        "1プロジェクト（1社/1回実施分） 5,500円（税込）"
      )
    ).toBeInTheDocument();
  });

  it("注意書きが表示される", () => {
    expect(
      screen.getByText(/ベータ版テスト期間中/)
    ).toBeInTheDocument();
  });
});
