import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { NewProjectModal } from "./NewProjectModal";

const meta = {
  title: "Features/NewProjectModal",
  component: NewProjectModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onClose: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof NewProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};

export const OpenMobile: Story = {
  args: {
    isOpen: true,
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
