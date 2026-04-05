import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { ProjectDashboardOverThreshold } from "./ProjectDashboardOverThreshold";

const meta = {
  title: "Features/ProjectDashboardOverThreshold",
  component: ProjectDashboardOverThreshold,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    companyName: "新宿物流センター",
    fiscalYear: 2026,
    surveyUrl: "https://stre-po.com/survey/aj82-k92l-px93",
    completedCount: 42,
    capacity: 50,
    onCopyUrl: fn(),
  },
} satisfies Meta<typeof ProjectDashboardOverThreshold>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "デフォルト（回答42名）",
};

export const JustOverThreshold: Story = {
  name: "閾値通過直後（回答11名）",
  args: {
    completedCount: 11,
  },
};

export const FullCapacity: Story = {
  name: "全員回答済み（50/50）",
  args: {
    completedCount: 50,
  },
};

export const HighScores: Story = {
  name: "全項目高スコア",
  args: {
    radarData: [
      { label: "心理的な仕事の負担", nationalAverage: 100, companyScore: 95 },
      { label: "仕事の自律性", nationalAverage: 100, companyScore: 90 },
      { label: "上司の支援", nationalAverage: 100, companyScore: 92 },
      { label: "同僚の支援", nationalAverage: 100, companyScore: 88 },
      { label: "職場環境の満足度", nationalAverage: 100, companyScore: 96 },
    ],
    insights: [
      {
        type: "good",
        title: "全体的に優秀：",
        body: "すべての項目で全国平均を大幅に上回っています。継続的な取り組みの成果が数字に表れています。",
      },
      {
        type: "notice",
        title: "維持が重要：",
        body: "高水準を維持するため、現在の職場環境・マネジメント施策を継続してください。",
      },
    ],
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
