import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TermsOfService } from "./TermsOfService";

const meta = {
  title: "Features/TermsOfService",
  component: TermsOfService,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TermsOfService>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
