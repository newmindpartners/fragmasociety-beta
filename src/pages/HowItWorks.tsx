import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HowItWorksHeroNew } from "@/components/how-it-works/HowItWorksHeroNew";
import { JourneySteps } from "@/components/how-it-works/JourneySteps";
import { AssetTypesShowcase } from "@/components/how-it-works/AssetTypesShowcase";
import { FAQCTA } from "@/components/how-it-works/FAQCTA";
import { HowItWorksCTANew } from "@/components/how-it-works/HowItWorksCTANew";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HowItWorksHeroNew />
      <JourneySteps />
      <AssetTypesShowcase />
      <FAQCTA />
      <HowItWorksCTANew />
      <Footer />
    </div>
  );
};

export default HowItWorks;