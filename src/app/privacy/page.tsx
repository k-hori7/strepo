import { Header } from "@/components/lp/Header";
import { Footer } from "@/components/lp/Footer";
import { LP_NAV_ITEMS_ABSOLUTE } from "@/constants/navigation";
import { PrivacyPolicy } from "@/components/features/PrivacyPolicy";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Stre-Po",
  description:
    "ストレポのプライバシーポリシー。個人情報の取扱いについて定めます。",
};

export default function PrivacyPage() {
  return (
    <>
      <Header navItems={LP_NAV_ITEMS_ABSOLUTE} />
      <main>
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  );
}
