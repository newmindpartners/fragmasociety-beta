import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StrategyHero } from "@/components/strategy/StrategyHero";
import { StrategyAtGlance } from "@/components/strategy/StrategyAtGlance";
import { StrategyOverview } from "@/components/strategy/StrategyOverview";
import { StrategyPillars } from "@/components/strategy/StrategyPillars";
import { StrategyReturns } from "@/components/strategy/StrategyReturns";
import { StrategyStructure } from "@/components/strategy/StrategyStructure";
import { StrategyCompliance } from "@/components/strategy/StrategyCompliance";
import { StrategySecondaryMarket } from "@/components/strategy/StrategySecondaryMarket";
import { StrategyRisk } from "@/components/strategy/StrategyRisk";
import { StrategyInvestors } from "@/components/strategy/StrategyInvestors";
import { StrategyProcess } from "@/components/strategy/StrategyProcess";
import { StrategyPartners } from "@/components/strategy/StrategyPartners";
import { StrategyCTA } from "@/components/StrategyCTA";
import { useAuth } from "@/contexts/AuthContext";

const Strategy = () => {
  const { user, loading } = useAuth();
  const isAuthenticated = !loading && !!user;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Public sections - always visible */}
      <StrategyHero isAuthenticated={isAuthenticated} />
      <StrategyAtGlance />
      <StrategyPillars />
      
      {/* Authenticated sections - only visible after login */}
      {isAuthenticated ? (
        <>
          <StrategyOverview />
          <StrategyReturns />
          <StrategyStructure />
          <StrategyProcess />
          <StrategyCompliance />
          <StrategySecondaryMarket />
          <StrategyRisk />
          <StrategyInvestors />
          <StrategyPartners />
        </>
      ) : (
        <StrategyCTA />
      )}
      
      <Footer />
    </div>
  );
};

export default Strategy;
