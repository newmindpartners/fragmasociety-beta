import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { MarketplaceDifference } from "@/components/marketplace/MarketplaceDifference";
import { OrderBookExplainer } from "@/components/marketplace/OrderBookExplainer";
import { SmartVaults } from "@/components/marketplace/SmartVaults";
import { TwoWayOrders } from "@/components/marketplace/TwoWayOrders";
import { OptionsTrading } from "@/components/marketplace/OptionsTrading";
import { CardanoEUTXO } from "@/components/marketplace/CardanoEUTXO";
import { NonCustodialTrading } from "@/components/marketplace/NonCustodialTrading";
import { TradingSteps } from "@/components/marketplace/TradingSteps";
import { MarketplaceCTA } from "@/components/marketplace/MarketplaceCTA";

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <MarketplaceHero />
      <MarketplaceDifference />
      <OrderBookExplainer />
      <SmartVaults />
      <TwoWayOrders />
      <OptionsTrading />
      <CardanoEUTXO />
      <NonCustodialTrading />
      <TradingSteps />
      <MarketplaceCTA />
      <Footer />
    </div>
  );
};

export default Marketplace;
