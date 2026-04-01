import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DoctorDashboard, defaultProjects } from "./DoctorDashboard";

const meta = {
  title: "Features/DoctorDashboard",
  component: DoctorDashboard,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DoctorDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const Empty: Story = {
  args: {
    projects: [],
  },
};

export const ActionRequired: Story = {
  args: {
    projects: [
      {
        id: "1",
        companyName: "AAA株式会社",
        fiscalYear: 2026,
        status: "action_required",
        statusDetail: "高ストレス者の面接指導が必要です",
        highlightDetail: "高ストレス者 5名",
      },
    ],
  },
};

export const AllStatuses: Story = {
  args: {
    projects: defaultProjects,
  },
};

export const InitialsVariants: Story = {
  args: {
    userName: "山田 太郎",
  },
};
