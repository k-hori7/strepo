import type { ReactNode } from "react";
import {
  CheckCircle2,
  Check,
  Monitor,
  Smartphone,
} from "lucide-react";
import { DesktopMockup } from "./mockups/DesktopMockup";
import { MobileMockup } from "./mockups/MobileMockup";

type WorkflowStep = {
  badge: { icon: ReactNode; label: string };
  heading: string;
  description: string;
  features?: string[];
  mockup: ReactNode;
  extra?: ReactNode;
  reversed?: boolean;
}

export type WorkflowSectionProps = {
  steps?: WorkflowStep[];
}

const defaultSteps: WorkflowStep[] = [
  {
    badge: {
      icon: <Monitor className="w-3.5 h-3.5 text-slate-500" />,
      label: "PC管理画面",
    },
    heading: "複数クライアントを一元管理",
    description:
      "サイドバーでクライアント（A社、Bクリニック等）を瞬時に切り替え。進捗状況はプログレスバーで一目瞭然。面倒なログイン/ログアウトを繰り返す必要はありません。",
    features: [
      "ステータス（未実施・実施中・完了）の可視化",
      "高ストレス者の人数をリアルタイム把握",
    ],
    mockup: <DesktopMockup />,
    reversed: false,
  },
  {
    badge: {
      icon: <Smartphone className="w-3.5 h-3.5 text-slate-500" />,
      label: "モバイル画面",
    },
    heading: "スマホで完結、即座に配布",
    description:
      "PCを開く必要すらありません。スマートフォンに最適化されたUIで、決済用URLをワンタップでコピー。LINEやSlackなどのチャットアプリで、担当者にすぐに送信できます。",
    mockup: <MobileMockup />,
    extra: (
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex items-center gap-3 w-fit">
        <div className="bg-green-100 rounded-full p-2">
          <Check className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-800">
            こんなに簡単
          </span>
          <span className="text-xs text-slate-500 font-light">
            「URLをコピー」→「チャットにペースト」だけ。
          </span>
        </div>
      </div>
    ),
    reversed: true,
  },
];

export function WorkflowSection({
  steps = defaultSteps,
}: WorkflowSectionProps) {
  return (
    <section className="bg-slate-50 py-16 md:py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-0 md:px-8 flex flex-col gap-20 md:gap-32">
        {steps.map((step) => (
          <div
            key={step.heading}
            className={`flex flex-col ${step.reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 md:gap-20`}
          >
            <div
              className={`lg:w-1/2 flex ${step.reversed ? "justify-center relative" : "flex-col items-center w-full"}`}
            >
              {step.mockup}
            </div>
            <div className="lg:w-1/2 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 w-fit">
                {step.badge.icon}
                <span className="text-xs font-bold text-slate-600">
                  {step.badge.label}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                {step.heading}
              </h2>
              <p
                className={`text-base md:text-lg text-slate-600 font-light${step.extra && !step.features ? " pb-2" : ""}`}
              >
                {step.description}
              </p>
              {step.features && (
                <div className="flex flex-col gap-3 pt-2">
                  {step.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-base text-slate-600 font-light">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {step.extra}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
