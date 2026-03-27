import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "./Header";

const meta = {
  title: "LP/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    ctaText: { control: "text" },
    ctaHref: { control: "text" },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const CustomNav: Story = {
  args: {
    navItems: [
      { label: "機能一覧", href: "#features" },
      { label: "お問い合わせ", href: "#contact" },
    ],
    ctaText: "ログイン",
  },
};
