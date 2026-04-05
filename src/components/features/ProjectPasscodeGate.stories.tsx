import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn, userEvent, within } from "storybook/test";
import { ProjectPasscodeGate } from "./ProjectPasscodeGate";

const meta = {
  title: "Features/ProjectPasscodeGate",
  component: ProjectPasscodeGate,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof ProjectPasscodeGate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "デフォルト（入力前）",
};

export const WithError: Story = {
  name: "認証エラー",
  args: {
    error: "パスコードが正しくありません。もう一度お試しください。",
  },
};

export const Loading: Story = {
  name: "認証中（4桁入力済み）",
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole("textbox");
    for (let i = 0; i < inputs.length; i++) {
      await userEvent.type(inputs[i], String(i + 1));
    }
  },
};

export const Mobile: Story = {
  name: "モバイル",
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
