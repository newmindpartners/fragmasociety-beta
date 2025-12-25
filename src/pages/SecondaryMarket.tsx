import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MarketChart } from "@/components/market/MarketChart";
import { OrderPanel } from "@/components/market/OrderPanel";
import { MarketOverview } from "@/components/market/MarketOverview";
import { ReviewTradeModal } from "@/components/market/ReviewTradeModal";
import { TradeProcessingModal } from "@/components/market/TradeProcessingModal";
import { TradeSuccessModal } from "@/components/market/TradeSuccessModal";
import { TradeErrorModal } from "@/components/market/TradeErrorModal";

export type TradeType = "buy" | "sell";
export type Currency = "USDC" | "ADA" | "EUR";

export interface TradeDetails {
  type: TradeType;
  payAmount: number;
  payCurrency: Currency;
  receiveAmount: number;
  receiveCurrency: Currency;
  rate: string;
  fee: number;
  networkCost: number;
  total: number;
}

const SecondaryMarket = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Modal states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  // Trade state
  const [tradeDetails, setTradeDetails] = useState<TradeDetails | null>(null);

  const handleTradeSubmit = (details: TradeDetails) => {
    setTradeDetails(details);
    setShowReviewModal(true);
  };

  const handleConfirmTrade = () => {
    setShowReviewModal(false);
    setShowProcessingModal(true);
    
    // Simulate processing
    setTimeout(() => {
      setShowProcessingModal(false);
      // 80% success, 20% fail for demo
      if (Math.random() > 0.2) {
        setShowSuccessModal(true);
      } else {
        setShowErrorModal(true);
      }
    }, 2500);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setTradeDetails(null);
  };

  const handleRetry = () => {
    setShowErrorModal(false);
    setShowReviewModal(true);
  };

  return (
    <div className="min-h-screen theme-dashboard bg-background flex w-full">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <motion.main 
        className="flex-1 min-h-screen"
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <DashboardHeader />
        
        <div className="p-6 lg:p-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2">
              Secondary Market
            </h1>
            <p className="text-muted-foreground">
              Trade tokenized assets on the Fragma Society marketplace
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-[1fr,380px] gap-6">
            {/* Left Column - Chart & Overview */}
            <div className="space-y-6">
              <MarketChart />
              <MarketOverview />
            </div>

            {/* Right Column - Order Panel */}
            <div>
              <OrderPanel onSubmitTrade={handleTradeSubmit} />
            </div>
          </div>
        </div>
      </motion.main>

      {/* Trade Modals */}
      <ReviewTradeModal 
        open={showReviewModal}
        onOpenChange={setShowReviewModal}
        tradeDetails={tradeDetails}
        onConfirm={handleConfirmTrade}
      />
      
      <TradeProcessingModal open={showProcessingModal} />
      
      <TradeSuccessModal 
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        tradeDetails={tradeDetails}
        onClose={handleCloseSuccess}
      />
      
      <TradeErrorModal 
        open={showErrorModal}
        onOpenChange={setShowErrorModal}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default SecondaryMarket;
