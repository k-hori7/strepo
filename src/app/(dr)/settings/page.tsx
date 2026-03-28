import { SettingsHeader } from "@/components/features/SettingsHeader";
import { DoctorSettings } from "@/components/features/DoctorSettings";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "設定 | Stre-Po",
  description: "ストレポの産業医アカウント設定。医師基本情報、所属機関情報、通知設定などを管理します。",
};

export default function SettingsPage() {
  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col">
      <SettingsHeader />

      <main className="flex-1 w-full max-w-[896px] mx-auto p-8 pb-20">
        <DoctorSettings />
      </main>
    </div>
  );
}
