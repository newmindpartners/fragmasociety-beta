import { useState } from "react";
import { motion } from "framer-motion";
import { WalletBalanceCard } from "./WalletBalanceCard";
import { WalletClaimIncome } from "./WalletClaimIncome";
import { WalletPortfolio } from "./WalletPortfolio";
import { WalletCreditModal } from "./WalletCreditModal";
import { WalletWithdrawModal } from "./WalletWithdrawModal";

export const WalletDashboard = () => {
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <WalletBalanceCard
          onCredit={() => setCreditModalOpen(true)}
          onWithdraw={() => setWithdrawModalOpen(true)}
        />
      </motion.div>

      {/* Claim Income / Earnings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <WalletClaimIncome />
      </motion.div>

      {/* Portfolio Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
