import type { Meta, StoryObj } from "@storybook/nextjs";
import { ClientDetail } from "./ClientDetail";
import { defaultEmployees, highStressEmployees } from "./ClientDetail.fixtures";

const meta: Meta<typeof ClientDetail> = {
  title: "Features/ClientDetail",
  component: ClientDetail,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    status: {
      control: "select",
      options: ["in_progress", "unpaid", "action_required", "completed"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClientDetail>;

export const Default: Story = {
  name: "実施中",
  args: {
    companyName: "株式会社BBB",
    status: "in_progress",
    period: { start: "2026/01/01", end: "01/31" },
    capacity: 50,
    reportUrl: "https://stre-po.com/p/a1b2-c3d4...",
    passcode: "8822",
    stats: {
      completionRate: 40,
      completedCount: 20,
      highStressCount: 0,
      interviewRequestCount: 0,
    },
    employees: defaultEmployees,
  },
};

export const Unpaid: Story = {
  name: "未決済",
  args: {
    companyName: "株式会社CCC",
    status: "unpaid",
    period: { start: "2026/02/01", end: "02/28" },
    capacity: 30,
    reportUrl: "https://stre-po.com/p/x9y8-z7w6...",
    passcode: "3344",
    stats: {
      completionRate: 0,
      completedCount: 0,
      highStressCount: 0,
      interviewRequestCount: 0,
    },
    employees: defaultEmployees,
  },
};

export const ActionRequired: Story = {
  name: "要対応",
  args: {
    companyName: "株式会社AAA",
    status: "action_required",
    period: { start: "2026/01/01", end: "01/31" },
    capacity: 50,
    reportUrl: "https://stre-po.com/p/a1b2-c3d4...",
    passcode: "8822",
    alertMessage:
      "高ストレス者が5名検出されました。早急に内容を確認してください。",
    stats: {
      completionRate: 80,
      completedCount: 40,
      highStressCount: 4,
      interviewRequestCount: 3,
    },
    employees: highStressEmployees,
  },
};

export const Completed: Story = {
  name: "報告完了",
  args: {
    companyName: "株式会社EEE商事",
    status: "completed",
    period: { start: "2026/01/01", end: "2026/01/28" },
    capacity: 50,
    reportUrl: "https://stre-po.com/p/a1b2-c3d4...",
    passcode: "8822",
    completedAt: "2026/02/04",
    dataRetentionDeadline: "2031/01/31",
    stats: {
      completionRate: 80,
      completedCount: 40,
      highStressCount: 4,
      interviewRequestCount: 3,
    },
    employees: highStressEmployees,
  },
};

export const Mobile: Story = {
  name: "モバイル（実施中）",
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const MobileActionRequired: Story = {
  name: "モバイル（要対応）",
  args: {
    ...ActionRequired.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
