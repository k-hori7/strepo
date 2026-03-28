import { Header } from "@/components/lp/Header";
import { Footer } from "@/components/lp/Footer";
import { LP_NAV_ITEMS_ABSOLUTE } from "@/constants/navigation";
import { TermsOfService } from "@/components/features/TermsOfService";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | Stre-Po",
  description:
    "ストレポの利用規約。サービスの利用条件について定めます。",
};

export default function TermsPage() {
  return (
    <>
      <Header navItems={LP_NAV_ITEMS_ABSOLUTE} />
      <main>
        <TermsOfService />
      </main>
      <Footer />
    </>
  );
}
