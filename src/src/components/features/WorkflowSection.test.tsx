import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WorkflowSection } from "./WorkflowSection";

describe("WorkflowSection", () => {
  it("Step1の見出しが表示される", () => {
    render(<WorkflowSection />);
    expect(
      screen.getByText("複数クライアントを一元管理")
    ).toBeInTheDocument();
  });

  it("Step2の見出しが表示される", () => {
    render(<WorkflowSection />);
    expect(
      screen.getByText("スマホで完結、即座に配布")
    ).toBeInTheDocument();
  });

  it("PC管理画面バッジが表示される", () => {
    render(<WorkflowSection />);
    expect(screen.getByText("PC管理画面")).toBeInTheDocument();
  });

  it("モバイル画面バッジが表示される", () => {
    render(<WorkflowSection />);
    expect(screen.getByText("モバイル画面")).toBeInTheDocument();
  });

  it("チェックリスト項目が表示される", () => {
    render(<WorkflowSection />);
    expect(
      screen.getByText(/ステータス（未実施・実施中・完了）の可視化/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/高ストレス者の人数をリアルタイム把握/)
    ).toBeInTheDocument();
  });

  it("モバイルモックアップの要素が表示される", () => {
    render(<WorkflowSection />);
    expect(screen.getByText("決済・実施用URL")).toBeInTheDocument();
    expect(screen.getByText("URLをコピー")).toBeInTheDocument();
  });

  it("カスタムPropsが反映される", () => {
    render(<WorkflowSection step1Heading="カスタム見出し" />);
    expect(screen.getByText("カスタム見出し")).toBeInTheDocument();
  });
});
