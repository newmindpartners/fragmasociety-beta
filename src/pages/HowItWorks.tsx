import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HowItWorksHero } from "@/components/how-it-works/HowItWorksHero";
import { VisualSteps } from "@/components/how-it-works/VisualSteps";
import { SignatureDealsSection } from "@/components/how-it-works/SignatureDealsSection";
import { AssetShowcase } from "@/components/how-it-works/AssetShowcase";
import { TokenOwnership } from "@/components/how-it-works/TokenOwnership";
import { EarnPayouts } from "@/components/how-it-works/EarnPayouts";
import { SafetyTrustSection } from "@/components/how-it-works/SafetyTrustSection";
import { AnimatedCTA } from "@/components/how-it-works/AnimatedCTA";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HowItWorksHero />
      <VisualSteps />
      <SignatureDealsSection />
      <AssetShowcase />
      <TokenOwnership />
      <EarnPayouts />
      <SafetyTrustSection />
      <AnimatedCTA />
      <Footer />
    </div>
  );
};

export default HowItWorks;
