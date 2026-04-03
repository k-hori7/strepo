import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { ProjectDashboardUnderThreshold } from "./ProjectDashboardUnderThreshold";

const meta = {
  title: "Features/ProjectDashboardUnderThreshold",
  component: ProjectDashboardUnderThreshold,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    companyName: "新宿物流センター",
    fiscalYear: 2026,
    surveyUrl: "https://stre-po.com/survey/aj82-k92l-px93",
    completedCount: 4,
    capacity: 50,
    onCopyUrl: fn(),
    onPayment: fn(),
  },
} satisfies Meta<typeof ProjectDashboardUnderThreshold>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "デフォルト（回答4名）",
};

export const ZeroProgress: Story = {
  name: "回答者0名（開始直後）",
  args: {
    completedCount: 0,
  },
};

export const NearThreshold: Story = {
  name: "閾値近く（回答9名）",
  args: {
    completedCount: 9,
  },
};

export const CustomThreshold: Story = {
  name: "閾値カスタム（20名）",
  args: {
    thresholdCount: 20,
    completedCount: 5,
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
