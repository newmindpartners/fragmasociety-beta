import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HowItWorksHeroNew } from "@/components/how-it-works/HowItWorksHeroNew";
import { JourneySteps } from "@/components/how-it-works/JourneySteps";
import { WhyFragma } from "@/components/how-it-works/WhyFragma";
import { AssetTypesShowcase } from "@/components/how-it-works/AssetTypesShowcase";
import { TrustSecurity } from "@/components/how-it-works/TrustSecurity";
import { HowItWorksCTANew } from "@/components/how-it-works/HowItWorksCTANew";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HowItWorksHeroNew />
      <JourneySteps />
      <WhyFragma />
      <AssetTypesShowcase />
      <TrustSecurity />
      <HowItWorksCTANew />
      <Footer />
    </div>
  );
};

export default HowItWorks;