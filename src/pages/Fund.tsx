import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FundHero } from "@/components/fund/FundHero";
import { FundAtGlance } from "@/components/fund/FundAtGlance";
import { FundStrategy } from "@/components/fund/FundStrategy";
import { FundPillars } from "@/components/fund/FundPillars";
import { FundReturns } from "@/components/fund/FundReturns";
import { FundStructure } from "@/components/fund/FundStructure";
import { FundRisk } from "@/components/fund/FundRisk";
import { FundInvestors } from "@/components/fund/FundInvestors";
import { FundProcess } from "@/components/fund/FundProcess";
import { FundPartners } from "@/components/fund/FundPartners";

const Fund = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <FundHero />
      <FundAtGlance />
      <FundStrategy />
      <FundPillars />
      <FundReturns />
      <FundStructure />
      <FundRisk />
      <FundInvestors />
      <FundProcess />
      <FundPartners />
      <Footer />
    </div>
  );
};

export default Fund;
