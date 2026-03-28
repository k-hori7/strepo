import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SignupForm } from "./SignupForm";

const meta = {
  title: "Features/SignupForm",
  component: SignupForm,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
