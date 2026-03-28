import { Header } from "@/components/lp/Header";
import { Footer } from "@/components/lp/Footer";
import { LP_NAV_ITEMS_ABSOLUTE } from "@/constants/navigation";
import { LegalNotice } from "@/components/features/LegalNotice";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | Stre-Po",
  description:
    "ストレポの特定商取引法に基づく表記。販売業者情報、返品ポリシー等を記載しています。",
};

export default function LegalPage() {
  return (
    <>
      <Header navItems={LP_NAV_ITEMS_ABSOLUTE} />
      <main>
        <LegalNotice />
      </main>
      <Footer />
    </>
  );
}
