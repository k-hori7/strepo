import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DoctorSettings } from "./DoctorSettings";

const meta = {
  title: "Features/DoctorSettings",
  component: DoctorSettings,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-50 min-h-dvh p-8">
        <div className="max-w-[896px] mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof DoctorSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
