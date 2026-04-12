import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  DEFAULT_BARS,
  DEFAULT_RADAR,
  DEFAULT_SCORES,
  ExamResultLowStressScreen,
} from "./ExamResultLowStressScreen";

const meta = {
  title: "Features/ExamResultLowStressScreen",
  component: ExamResultLowStressScreen,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    reportId: "2026-0214-001",
    scores: DEFAULT_SCORES,
    radar: DEFAULT_RADAR,
    bars: DEFAULT_BARS,
  },
} satisfies Meta<typeof ExamResultLowStressScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

/** 全スコアが最良レベルの状態 */
export const ExcellentCondition: Story = {
  args: {
    radar: {
      demand: 0.95,
      control: 0.92,
      bossSupport: 0.9,
      peerSupport: 0.95,
      relation: 0.92,
    },
    bars: {
      vitality: { label: "活気 (元気度)", value: 0.98, level: "High" },
      fatigue: { label: "疲労感 (低さが良好)", value: 0.05, level: "Low" },
      satisfaction: { label: "仕事の満足度", value: 0.95, level: "High" },
    },
  },
};

/** 低ストレス圏ではあるが一部スコアが平均的なボーダーライン付近の状態 */
export const BorderlineCondition: Story = {
  args: {
    radar: {
      demand: 0.55,
      control: 0.52,
      bossSupport: 0.5,
      peerSupport: 0.55,
      relation: 0.52,
    },
    bars: {
      vitality: { label: "活気 (元気度)", value: 0.52, level: "Normal" },
      fatigue: { label: "疲労感 (低さが良好)", value: 0.48, level: "Normal" },
      satisfaction: { label: "仕事の満足度", value: 0.5, level: "Normal" },
    },
  },
};
