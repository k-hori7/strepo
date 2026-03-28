import { Logo } from "@/components/shared/Logo";
import { LoginForm } from "@/components/features/LoginForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン | Stre-Po",
  description:
    "ストレポにログインして、ストレスチェックの実施・管理を行いましょう。",
};

export default function LoginPage() {
  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-8 md:px-20">
          <div className="flex items-center h-16">
            <Logo />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center pt-24 pb-6 px-6">
        <LoginForm />
      </main>
    </div>
  );
}
