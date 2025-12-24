import { useState } from "react";
import { motion } from "framer-motion";
import { WalletBalanceCard } from "./WalletBalanceCard";
import { TotalInvestedCard } from "./TotalInvestedCard";
import { WalletClaimIncome } from "./WalletClaimIncome";
import { WalletPortfolio } from "./WalletPortfolio";
import { WalletCreditModal } from "./WalletCreditModal";
import { WalletWithdrawModal } from "./WalletWithdrawModal";

export const WalletDashboard = () => {
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Top Row - Wallet Balance + Total Invested */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletBalanceCard
          onCredit={() => setCreditModalOpen(true)}
          onWithdraw={() => setWithdrawModalOpen(true)}
        />
        <TotalInvestedCard
          totalInvested={4250}
          totalEarnings={312.40}
          earningsPercent={7.3}
          nextPayoutDays={5}
          nextPayoutAmount={23.50}
        />
      </div>

      {/* Claim Income / Earnings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <WalletClaimIncome />
      </motion.div>

      {/* Portfolio Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <WalletPortfolio />
      </motion.div>

      {/* Modals */}
      <WalletCreditModal 
        open={creditModalOpen} 
        onOpenChange={setCreditModalOpen} 
      />
      <WalletWithdrawModal 
        open={withdrawModalOpen} 
        onOpenChange={setWithdrawModalOpen} 
      />
    </div>
  );
};
