import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HowItWorksHero } from "@/components/how-it-works/HowItWorksHero";
import { VisualSteps } from "@/components/how-it-works/VisualSteps";
import { AssetShowcase } from "@/components/how-it-works/AssetShowcase";
import { FeatureCards } from "@/components/how-it-works/FeatureCards";
import { AnimatedCTA } from "@/components/how-it-works/AnimatedCTA";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HowItWorksHero />
      <VisualSteps />
      <AssetShowcase />
      <FeatureCards />
      <AnimatedCTA />
      <Footer />
    </div>
  );
};

export default HowItWorks;
