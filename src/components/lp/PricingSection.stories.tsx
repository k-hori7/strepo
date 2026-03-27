import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PricingSection } from "./PricingSection";

const meta = {
  title: "LP/PricingSection",
  component: PricingSection,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    planName: { control: "text" },
    price: { control: "text" },
    ctaText: { control: "text" },
  },
} satisfies Meta<typeof PricingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const CustomPricing: Story = {
  args: {
    planName: "プロプラン",
    price: "11,000",
    pricePer: "/ 1社・1回",
    features: [
      "全機能利用可能",
      "優先サポート",
      "カスタムレポート",
    ],
  },
};
