import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FeaturesSection } from "./FeaturesSection";

describe("FeaturesSection", () => {
  it("見出しが表示される", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByText("医師の業務フローを最適化")
    ).toBeInTheDocument();
  });

  it("3つのカードが表示される", () => {
    render(<FeaturesSection />);
    expect(screen.getByText("名簿登録不要")).toBeInTheDocument();
    expect(screen.getByText("厚労省形式XML")).toBeInTheDocument();
    expect(screen.getByText("シンプルな料金")).toBeInTheDocument();
  });

  it("カードの説明文が表示される", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByText(/従業員情報のCSVインポート/)
    ).toBeInTheDocument();
  });

  it("UIスニペットが表示される", () => {
    render(<FeaturesSection />);
    expect(screen.getByText("登録不要")).toBeInTheDocument();
    expect(screen.getByText("厚労省形式XMLを出力")).toBeInTheDocument();
    expect(screen.getByText("業界最安水準")).toBeInTheDocument();
  });

  it("カスタム見出しが反映される", () => {
    render(<FeaturesSection heading="テスト見出し" />);
    expect(screen.getByText("テスト見出し")).toBeInTheDocument();
  });
});
