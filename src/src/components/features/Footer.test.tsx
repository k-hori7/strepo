import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("ロゴが表示される", () => {
    render(<Footer />);
    expect(screen.getByText("Stre")).toBeInTheDocument();
    expect(screen.getByText("-Po")).toBeInTheDocument();
  });

  it("説明文が表示される", () => {
    render(<Footer />);
    expect(
      screen.getByText(/医師と企業の負担を最小限にする/)
    ).toBeInTheDocument();
  });

  it("リンクグループが表示される", () => {
    render(<Footer />);
    expect(screen.getByText("プロダクト")).toBeInTheDocument();
    expect(screen.getByText("法的情報")).toBeInTheDocument();
  });

  it("ナビリンクが表示される", () => {
    render(<Footer />);
    expect(screen.getByText("機能")).toBeInTheDocument();
    expect(screen.getByText("料金")).toBeInTheDocument();
    expect(screen.getByText("利用規約")).toBeInTheDocument();
    expect(screen.getByText("プライバシーポリシー")).toBeInTheDocument();
  });

  it("コピーライトが表示される", () => {
    render(<Footer />);
    expect(screen.getByText(/Stre-Po. All rights reserved/)).toBeInTheDocument();
  });

  it("カスタムPropsが反映される", () => {
    render(<Footer copyright="© 2026 テスト" />);
    expect(screen.getByText("© 2026 テスト")).toBeInTheDocument();
  });
});
