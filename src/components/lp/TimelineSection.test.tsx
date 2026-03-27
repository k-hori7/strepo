import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimelineSection } from "./TimelineSection";

describe("TimelineSection", () => {
  it("見出しが表示される", () => {
    render(<TimelineSection />);
    expect(screen.getByText("利用の流れ")).toBeInTheDocument();
  });

  it("サブ見出しが表示される", () => {
    render(<TimelineSection />);
    expect(
      screen.getByText(/最短3ステップで実施開始/)
    ).toBeInTheDocument();
  });

  it("3つのステップが表示される", () => {
    render(<TimelineSection />);
    expect(screen.getByText("1. URL発行")).toBeInTheDocument();
    expect(screen.getByText("2. クライアント決済")).toBeInTheDocument();
    expect(screen.getByText("3. 従業員回答")).toBeInTheDocument();
  });

  it("ステップの説明文が表示される", () => {
    render(<TimelineSection />);
    expect(
      screen.getByText(/医師が管理画面から決済用URLを発行/)
    ).toBeInTheDocument();
  });

  it("カスタムPropsが反映される", () => {
    render(<TimelineSection heading="導入ステップ" />);
    expect(screen.getByText("導入ステップ")).toBeInTheDocument();
  });
});
