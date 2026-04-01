import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
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

const meta = {
  title: "Features/XmlDownloadModal",
  component: XmlDownloadModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isOpen: true,
    doctorInfo: sampleDoctorInfo,
    stats: sampleStats,
    defaultInterviewedCount: 3,
    defaultInterviewDoctorCount: 1,
    onCancel: fn(),
    onDownload: fn(),
    onGoToSettings: fn(),
  },
} satisfies Meta<typeof XmlDownloadModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  name: "開いた状態",
};

export const Closed: Story = {
  name: "閉じた状態",
  args: {
    isOpen: false,
  },
};

export const NoGroupAnalysis: Story = {
  name: "集団分析未実施",
  args: {
    stats: {
      ...sampleStats,
      hasGroupAnalysis: false,
    },
  },
};

export const Mobile: Story = {
  name: "モバイル",
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
