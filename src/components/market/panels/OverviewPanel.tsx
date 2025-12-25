import { motion } from "framer-motion";
import { MarketChart } from "@/components/market/MarketChart";
import { MarketOverview } from "@/components/market/MarketOverview";
import { OrderPanel } from "@/components/market/OrderPanel";
import { TradeDetails } from "@/pages/SecondaryMarket";

interface OverviewPanelProps {
  onSubmitTrade: (details: TradeDetails) => void;
}

export const OverviewPanel = ({ onSubmitTrade }: OverviewPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid lg:grid-cols-[1fr,380px] gap-6"
    >
      {/* Left Column - Chart & Overview */}
      <div className="space-y-6">
        <MarketChart />
        <MarketOverview />
      </div>

      {/* Right Column - Order Panel */}
      <div>
        <OrderPanel onSubmitTrade={onSubmitTrade} />
      </div>
    </motion.div>
  );
};
