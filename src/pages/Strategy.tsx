import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StrategyHero } from "@/components/strategy/StrategyHero";
import { StrategyAtGlance } from "@/components/strategy/StrategyAtGlance";
import { StrategyOverview } from "@/components/strategy/StrategyOverview";
import { StrategyPillars } from "@/components/strategy/StrategyPillars";
import { StrategyReturns } from "@/components/strategy/StrategyReturns";
import { StrategyStructure } from "@/components/strategy/StrategyStructure";
import { StrategySecondaryMarket } from "@/components/strategy/StrategySecondaryMarket";
import { StrategyRisk } from "@/components/strategy/StrategyRisk";
import { StrategyInvestors } from "@/components/strategy/StrategyInvestors";
import { StrategyProcess } from "@/components/strategy/StrategyProcess";
import { StrategyPartners } from "@/components/strategy/StrategyPartners";
import { useAuth } from "@/contexts/AuthContext";

const Strategy = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <StrategyHero />
      <StrategyAtGlance />
      <StrategyOverview />
      <StrategyPillars />
      <StrategyReturns />
      <StrategyStructure />
      <StrategySecondaryMarket />
      <StrategyRisk />
      <StrategyInvestors />
      <StrategyProcess />
      <StrategyPartners />
      <Footer />
    </div>
  );
};

export default Strategy;
