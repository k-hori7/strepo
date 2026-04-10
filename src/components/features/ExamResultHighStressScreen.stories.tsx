import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import {
  DEFAULT_BARS,
  DEFAULT_RADAR,
  DEFAULT_SCORES,
  ExamResultHighStressScreen,
} from "./ExamResultHighStressScreen";

const meta = {
  title: "Features/ExamResultHighStressScreen",
  component: ExamResultHighStressScreen,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    reportId: "2026-0214-082",
    scores: DEFAULT_SCORES,
    radar: DEFAULT_RADAR,
    bars: DEFAULT_BARS,
  },
} satisfies Meta<typeof ExamResultHighStressScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const WithInterviewHandler: Story = {
  args: {
    onApplyInterview: fn(),
  },
};

export const SevereStress: Story = {
  args: {
    radar: {
      demand: 0.1,
      control: 0.1,
      bossSupport: 0.1,
      peerSupport: 0.15,
      relation: 0.1,
    },
    bars: {
      vitality: { label: "活気 (元気度)", value: 0.1, level: "Low" },
      fatigue: { label: "疲労感 (低さが良好)", value: 0.98, level: "High" },
      satisfaction: { label: "仕事の満足度", value: 0.1, level: "Low" },
    },
  },
};
