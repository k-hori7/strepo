import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PricingSection } from "./PricingSection";

describe("PricingSection", () => {
  it("プラン名が表示される", () => {
    render(<PricingSection />);
    expect(screen.getByText("シンプルプラン")).toBeInTheDocument();
  });

  it("価格が表示される", () => {
    render(<PricingSection />);
    expect(screen.getByText("5,500")).toBeInTheDocument();
    expect(screen.getByText("円 (税込)")).toBeInTheDocument();
  });

  it("CTAボタンが表示される", () => {
    render(<PricingSection />);
    expect(
      screen.getByText("今すぐ無料でアカウント作成")
    ).toBeInTheDocument();
  });

  it("機能リストが表示される", () => {
    render(<PricingSection />);
    expect(
      screen.getByText("顧問先（プロジェクト）作成無制限")
    ).toBeInTheDocument();
    expect(
      screen.getByText("クラウドデータ保存（5年間）")
    ).toBeInTheDocument();
    expect(
      screen.getByText("電子申請用XMLのダウンロード")
    ).toBeInTheDocument();
  });

  it("カスタムPropsが反映される", () => {
    render(
      <PricingSection planName="プレミアム" price="10,000" />
    );
    expect(screen.getByText("プレミアム")).toBeInTheDocument();
    expect(screen.getByText("10,000")).toBeInTheDocument();
  });
});
