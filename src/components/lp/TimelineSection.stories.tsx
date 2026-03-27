import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimelineSection } from "./TimelineSection";

const meta = {
  title: "LP/TimelineSection",
  component: TimelineSection,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    heading: { control: "text" },
    subheading: { control: "text" },
  },
} satisfies Meta<typeof TimelineSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const CustomContent: Story = {
  args: {
    heading: "導入の流れ",
    subheading: "簡単3ステップで始められます。",
  },
};
