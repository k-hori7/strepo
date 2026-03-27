import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroSection } from "./HeroSection";

const meta = {
  title: "LP/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    badge: { control: "text" },
    description: { control: "text" },
    ctaText: { control: "text" },
  },
} satisfies Meta<typeof HeroSection>;

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
    badge: "新機能リリース",
    description: "カスタム説明文のテスト表示です。",
    ctaText: "詳しく見る",
  },
};
