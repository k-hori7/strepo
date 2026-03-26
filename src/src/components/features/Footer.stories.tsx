import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta = {
  title: "Features/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    description: { control: "text" },
    copyright: { control: "text" },
  },
} satisfies Meta<typeof Footer>;

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
    description: "カスタム説明文です。",
    copyright: "© 2026 テスト. All rights reserved.",
  },
};
