import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SignatureDealsBanner } from "@/components/SignatureDealsBanner";
import { Features } from "@/components/Features";
import { FeaturedDeals } from "@/components/FeaturedDeals";
import { HowItWorks } from "@/components/HowItWorks";
import { Marketplace } from "@/components/Marketplace";
import { AssetClasses } from "@/components/AssetClasses";
import { WorkWithUs } from "@/components/WorkWithUs";
import { TokenizeAssetCTA } from "@/components/TokenizeAssetCTA";
import { StrategyCTA } from "@/components/StrategyCTA";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Global animated background */}
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SignatureDealsBanner />
        <FeaturedDeals />
        <AssetClasses />
        <Features />
        <HowItWorks />
        <Marketplace />
        <WorkWithUs />
        <TokenizeAssetCTA />
        <StrategyCTA />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
