import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkflowSection } from "./WorkflowSection";

const meta = {
  title: "LP/WorkflowSection",
  component: WorkflowSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WorkflowSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
