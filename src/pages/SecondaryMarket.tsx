import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AssetInfoHeader } from "@/components/market/AssetInfoHeader";
import { OverviewPanel } from "@/components/market/panels/OverviewPanel";
import { InvestorsPanel } from "@/components/market/panels/InvestorsPanel";
import { UpdatesPanel } from "@/components/market/panels/UpdatesPanel";
import { DiscussionPanel } from "@/components/market/panels/DiscussionPanel";
import { ReviewTradeModal } from "@/components/market/ReviewTradeModal";
import { TradeProcessingModal } from "@/components/market/TradeProcessingModal";
import { TradeSuccessModal } from "@/components/market/TradeSuccessModal";
import { TradeErrorModal } from "@/components/market/TradeErrorModal";

export type TradeType = "buy" | "sell";
export type Currency = "USDC" | "USD" | "MLV";

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
  const [activeTab, setActiveTab] = useState("Trade");
  
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

  const renderActivePanel = () => {
    switch (activeTab) {
      case "Trade":
        return <OverviewPanel onSubmitTrade={handleTradeSubmit} />;
      case "Investors":
        return <InvestorsPanel />;
      case "Updates":
        return <UpdatesPanel />;
      case "Discussion":
        return <DiscussionPanel />;
      default:
        return <OverviewPanel onSubmitTrade={handleTradeSubmit} />;
    }
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
          {/* Asset Info Header with Tabs */}
          <AssetInfoHeader activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Active Panel Content */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {renderActivePanel()}
            </AnimatePresence>
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
