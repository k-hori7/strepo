import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("ロゴが表示される", () => {
    render(<Header />);
    expect(screen.getByText("Stre")).toBeInTheDocument();
    expect(screen.getByText("-Po")).toBeInTheDocument();
  });

  it("ナビゲーションリンクが表示される", () => {
    render(<Header />);
    expect(screen.getByText("機能")).toBeInTheDocument();
    expect(screen.getByText("利用の流れ")).toBeInTheDocument();
    expect(screen.getByText("料金")).toBeInTheDocument();
  });

  it("CTAボタンが表示される", () => {
    render(<Header />);
    const ctaButtons = screen.getAllByText("無料で始める (医師用)");
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it("カスタムPropsが反映される", () => {
    render(
      <Header
        ctaText="ログイン"
        navItems={[{ label: "テスト", href: "#test" }]}
      />
    );
    expect(screen.getByText("テスト")).toBeInTheDocument();
    const loginButtons = screen.getAllByText("ログイン");
    expect(loginButtons.length).toBeGreaterThan(0);
  });

  it("モバイルメニューが開閉する", () => {
    render(<Header />);
    const menuButton = screen.getByLabelText("メニューを開く");
    fireEvent.click(menuButton);
    // Mobile menu should now show nav items (duplicated)
    const featureLinks = screen.getAllByText("機能");
    expect(featureLinks.length).toBeGreaterThanOrEqual(2);
  });
});
