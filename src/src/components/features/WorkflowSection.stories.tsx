import type { Meta, StoryObj } from "@storybook/react";
import { WorkflowSection } from "./WorkflowSection";

const meta = {
  title: "Features/WorkflowSection",
  component: WorkflowSection,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    step1Heading: { control: "text" },
    step2Heading: { control: "text" },
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
