import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LiveDealsHero } from "@/components/live-deals/LiveDealsHero";
import { SignatureDealsGrid } from "@/components/live-deals/SignatureDealsGrid";
import { HowSignatureDealsWork } from "@/components/live-deals/HowSignatureDealsWork";
import { StrategyCTA } from "@/components/StrategyCTA";

const LiveDeals = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <LiveDealsHero />
      <SignatureDealsGrid />
      <StrategyCTA />
      <HowSignatureDealsWork />
      <Footer />
    </div>
  );
};

export default LiveDeals;
