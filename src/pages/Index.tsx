import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SignatureDealsBanner } from "@/components/SignatureDealsBanner";
import { Features } from "@/components/Features";
import { ScrollSection } from "@/components/ScrollSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Marketplace } from "@/components/Marketplace";
import { SocialProof } from "@/components/SocialProof";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { StrategyCompliance } from "@/components/strategy/StrategyCompliance";
import { RequestAccessForm } from "@/components/RequestAccessForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Global animated background */}
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ScrollSection>
          <Features />
        </ScrollSection>
        <ScrollSection delay={0.1}>
          <SignatureDealsBanner />
        </ScrollSection>
        <ScrollSection delay={0.1}>
          <SocialProof />
        </ScrollSection>
        <ScrollSection delay={0.1}>
          <HowItWorks />
        </ScrollSection>
        <ScrollSection delay={0.1}>
          <StrategyCompliance />
        </ScrollSection>
        <ScrollSection delay={0.1}>
          <Marketplace />
        </ScrollSection>
        <ScrollSection delay={0.1}>
          <RequestAccessForm />
        </ScrollSection>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
