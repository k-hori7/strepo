import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { TermsOfService } from "./TermsOfService";

describe("TermsOfService", () => {
  beforeEach(() => {
    render(<TermsOfService />);
  });

  it("タイトルが表示される", () => {
    expect(screen.getByText("利用規約")).toBeInTheDocument();
  });

  it("最終改定日が表示される", () => {
    expect(screen.getByText("最終改定日：2026年1月30日")).toBeInTheDocument();
  });

  it("全8条の見出しが表示される", () => {
    expect(screen.getByText("第1条（適用）")).toBeInTheDocument();
    expect(
      screen.getByText("第2条（定義とサービスの性質）")
    ).toBeInTheDocument();
    expect(
      screen.getByText("第3条（利用料金および支払方法）")
    ).toBeInTheDocument();
    expect(
      screen.getByText("第4条（名簿レス運用と自己責任）")
    ).toBeInTheDocument();
    expect(
      screen.getByText("第5条（データの保存期間と取り扱い）")
    ).toBeInTheDocument();
    expect(screen.getByText("第6条（禁止事項）")).toBeInTheDocument();
    expect(screen.getByText("第7条（免責事項：重要）")).toBeInTheDocument();
    expect(screen.getByText("第8条（サービスの終了）")).toBeInTheDocument();
  });

  it("料金情報が表示される", () => {
    expect(
      screen.getByText("利用料金：1プロジェクトあたり 5,500円（税込）")
    ).toBeInTheDocument();
  });

  it("強調テキストが表示される", () => {
    expect(screen.getByText("実施日から5年間")).toBeInTheDocument();
  });
});
