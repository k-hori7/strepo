import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { XmlDownloadModal } from "./XmlDownloadModal";

const sampleDoctorInfo = {
  name: "堀 太郎",
  clinic: "堀メンタルクリニック",
  address: "〒110-0003 東京都台東区上野1-2-3 ストレポビル4F",
  registrationNumber: "医籍: 123456 / 認定: 987654",
  phone: "03-5130-0000",
};

const sampleStats = {
  implementedMonth: "2025年11月",
  totalEmployees: 45,
  testedEmployees: 42,
  hasGroupAnalysis: true,
};

describe("XmlDownloadModal", () => {
  it("isOpen=true で正常にレンダリングされる", () => {
    render(
      <XmlDownloadModal
        isOpen={true}
        onCancel={() => {}}
        onDownload={() => {}}
      />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText("報告用データの作成（最終確認）")
    ).toBeInTheDocument();
  });

  it("isOpen=false では表示されない", () => {
    render(
      <XmlDownloadModal
        isOpen={false}
        onCancel={() => {}}
        onDownload={() => {}}
      />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("産業医情報が表示される", () => {
    render(
      <XmlDownloadModal
        isOpen={true}
        doctorInfo={sampleDoctorInfo}
        onCancel={() => {}}
        onDownload={() => {}}
      />
    );
    expect(screen.getByText("堀 太郎")).toBeInTheDocument();
    expect(screen.getByText("堀メンタルクリニック")).toBeInTheDocument();
    expect(screen.getByText("03-5130-0000")).toBeInTheDocument();
  });

  it("実施状況が表示される", () => {
    render(
      <XmlDownloadModal
        isOpen={true}
        stats={sampleStats}
        onCancel={() => {}}
        onDownload={() => {}}
      />
    );
    expect(screen.getByText("2025年11月")).toBeInTheDocument();
    expect(screen.getByText("45 名")).toBeInTheDocument();
    expect(screen.getByText("42 名")).toBeInTheDocument();
    expect(screen.getByText("実施済み（有）")).toBeInTheDocument();
  });

  it("集団分析未実施の場合「未実施（無）」が表示される", () => {
    render(
      <XmlDownloadModal
        isOpen={true}
        stats={{ ...sampleStats, hasGroupAnalysis: false }}
        onCancel={() => {}}
        onDownload={() => {}}
      />
    );
    expect(screen.getByText("未実施（無）")).toBeInTheDocument();
  });

  it("キャンセルボタンで onCancel が呼ばれる", () => {
    const onCancel = vi.fn();
    render(
      <XmlDownloadModal
        isOpen={true}
        onCancel={onCancel}
        onDownload={() => {}}
      />
    );
    fireEvent.click(screen.getByText("キャンセル"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("XMLをダウンロードボタンで onDownload が呼ばれる", () => {
    const onDownload = vi.fn();
    render(
      <XmlDownloadModal
        isOpen={true}
        defaultInterviewedCount={3}
        defaultInterviewDoctorCount={1}
        onCancel={() => {}}
        onDownload={onDownload}
      />
    );
    fireEvent.click(screen.getByText("XMLをダウンロード"));
    expect(onDownload).toHaveBeenCalledWith(3, 1);
  });

  it("入力値を変更すると onDownload に反映される", () => {
    const onDownload = vi.fn();
    render(
      <XmlDownloadModal
        isOpen={true}
        defaultInterviewedCount={0}
        defaultInterviewDoctorCount={1}
        onCancel={() => {}}
        onDownload={onDownload}
      />
    );
    const input = screen.getByLabelText("面接指導を受けた労働者数");
    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(screen.getByText("XMLをダウンロード"));
    expect(onDownload).toHaveBeenCalledWith(5, 1);
  });

  it("医師数の入力値が 1 未満にならない", () => {
    const onDownload = vi.fn();
    render(
      <XmlDownloadModal
        isOpen={true}
        defaultInterviewDoctorCount={1}
        onCancel={() => {}}
        onDownload={onDownload}
      />
    );
    const input = screen.getByLabelText("面接指導を実施した医師の数");
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.click(screen.getByText("XMLをダウンロード"));
    expect(onDownload).toHaveBeenCalledWith(expect.any(Number), 1);
  });

  it("onGoToSettings が渡された場合「設定へ」ボタンが表示される", () => {
    const onGoToSettings = vi.fn();
    render(
      <XmlDownloadModal
        isOpen={true}
        onCancel={() => {}}
        onDownload={() => {}}
        onGoToSettings={onGoToSettings}
      />
    );
    expect(screen.getByText("設定へ")).toBeInTheDocument();
    fireEvent.click(screen.getByText("設定へ"));
    expect(onGoToSettings).toHaveBeenCalled();
  });

  it("onGoToSettings が渡されない場合「設定へ」ボタンが表示されない", () => {
    render(
      <XmlDownloadModal
        isOpen={true}
        onCancel={() => {}}
        onDownload={() => {}}
      />
    );
    expect(screen.queryByText("設定へ")).not.toBeInTheDocument();
  });

  it("事業者による追記についての注記が表示される", () => {
    render(
      <XmlDownloadModal
        isOpen={true}
        onCancel={() => {}}
        onDownload={() => {}}
      />
    );
    expect(screen.getByText("事業者による追記について")).toBeInTheDocument();
  });
});
