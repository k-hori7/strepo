import { Logo } from "@/components/shared/Logo";
import { SignupForm } from "@/components/features/SignupForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アカウント作成 | Stre-Po",
  description:
    "ストレポに産業医（医師）として新規登録して、ストレスチェックの実施・管理を始めましょう。",
};

export default function SignupPage() {
  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-8 md:px-20">
          <div className="flex items-center h-16">
            <Logo />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center pt-32 pb-16 px-6">
        <SignupForm />
      </main>
    </div>
  );
}
