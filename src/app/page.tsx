import { Header } from "@/components/lp/Header";
import { HeroSection } from "@/components/lp/HeroSection";
import { FeaturesSection } from "@/components/lp/FeaturesSection";
import { WorkflowSection } from "@/components/lp/WorkflowSection";
import { TimelineSection } from "@/components/lp/TimelineSection";
import { PricingSection } from "@/components/lp/PricingSection";
import { Footer } from "@/components/lp/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <TimelineSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
