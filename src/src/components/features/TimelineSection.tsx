import { Link2, CreditCard, ClipboardCheck } from "lucide-react";
import type { ReactNode } from "react";

interface TimelineStep {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface TimelineSectionProps {
  heading?: string;
  subheading?: string;
  steps?: TimelineStep[];
}

const defaultSteps: TimelineStep[] = [
  {
    icon: <Link2 className="w-7 h-7 text-teal-600" />,
    title: "1. URL発行",
    description:
      "医師が管理画面から決済用URLを発行し、企業の担当者に送付します。",
  },
  {
    icon: <CreditCard className="w-7 h-7 text-teal-600" />,
    title: "2. クライアント決済",
    description:
      "企業担当者がURLからクレジットカードで決済。即座に実施可能になります。",
  },
  {
    icon: <ClipboardCheck className="w-7 h-7 text-teal-600" />,
    title: "3. 従業員回答",
    description:
      "従業員はスマホから回答。完了後、電子申請時に必要なデータの表示。",
  },
];

export function TimelineSection({
  heading = "利用の流れ",
  subheading = "最短3ステップで実施開始。面倒な手続きは一切ありません。",
  steps = defaultSteps,
}: TimelineSectionProps) {
  return (
    <section
      id="workflow"
      className="bg-white border-t border-slate-200 py-16 md:py-24 px-6 md:px-20"
    >
      <div className="max-w-[1280px] mx-auto px-0 md:px-8">
        <div className="flex flex-col gap-4 items-center mb-12 md:mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {heading}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-light">
            {subheading}
          </p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-slate-200" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step) => (
              <div
                key={step.title}
                className="relative bg-white border border-slate-100 rounded-xl p-6 pt-20 text-center"
              >
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-teal-50 border-4 border-white rounded-full shadow-sm w-16 h-16 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
