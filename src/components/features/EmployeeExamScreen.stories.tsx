import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmployeeExamScreen } from "./EmployeeExamScreen";

const meta = {
  title: "Features/EmployeeExamScreen",
  component: EmployeeExamScreen,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof EmployeeExamScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const WithSubmitHandler: Story = {
  args: {
    onSubmit: (data) => console.log("送信データ:", data),
  },
};
