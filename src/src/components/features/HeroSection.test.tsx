import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  it("バッジテキストが表示される", () => {
    render(<HeroSection />);
    expect(screen.getByText("2026年の法改正にも完全対応")).toBeInTheDocument();
  });

  it("ヘッドラインが表示される", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/ストレスチェックを名簿レスで/)
    ).toBeInTheDocument();
  });

  it("説明文が表示される", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/医師と企業の負担を最小限にする/)
    ).toBeInTheDocument();
  });

  it("CTAボタンが表示される", () => {
    render(<HeroSection />);
    expect(screen.getByText("無料で始める (医師用)")).toBeInTheDocument();
  });

  it("カスタムPropsが反映される", () => {
    render(
      <HeroSection badge="テストバッジ" ctaText="今すぐ登録" />
    );
    expect(screen.getByText("テストバッジ")).toBeInTheDocument();
    expect(screen.getByText("今すぐ登録")).toBeInTheDocument();
  });
});
