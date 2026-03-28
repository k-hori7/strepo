import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PrivacyPolicy } from "./PrivacyPolicy";

const meta = {
  title: "Features/PrivacyPolicy",
  component: PrivacyPolicy,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PrivacyPolicy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
