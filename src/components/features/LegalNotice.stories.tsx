import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LegalNotice } from "./LegalNotice";

const meta = {
  title: "Features/LegalNotice",
  component: LegalNotice,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LegalNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
