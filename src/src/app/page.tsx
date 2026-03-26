import { Header } from "@/components/features/Header";
import { HeroSection } from "@/components/features/HeroSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { WorkflowSection } from "@/components/features/WorkflowSection";
import { TimelineSection } from "@/components/features/TimelineSection";
import { PricingSection } from "@/components/features/PricingSection";
import { Footer } from "@/components/features/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <TimelineSection />
      <PricingSection />
      <Footer />
    </>
  );
}
