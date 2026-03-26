import type { Meta, StoryObj } from "@storybook/react";
import { FeaturesSection } from "./FeaturesSection";

const meta = {
  title: "Features/FeaturesSection",
  component: FeaturesSection,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    heading: { control: "text" },
    subheading: { control: "text" },
  },
} satisfies Meta<typeof FeaturesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const CustomHeading: Story = {
  args: {
    heading: "カスタム見出し",
    subheading: "カスタムサブ見出しのテスト表示です。",
  },
};
