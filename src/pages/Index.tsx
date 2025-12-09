import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Features } from "@/components/Features";
import { FeaturedDeals } from "@/components/FeaturedDeals";
import { HowItWorks } from "@/components/HowItWorks";
import { Marketplace } from "@/components/Marketplace";
import { AssetClasses } from "@/components/AssetClasses";
import { WorkWithUs } from "@/components/WorkWithUs";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <FeaturedDeals />
      <Features />
      <HowItWorks />
      <Marketplace />
      <AssetClasses />
      <SocialProof />
      <WorkWithUs />
      <Footer />
    </div>
  );
};

export default Index;
