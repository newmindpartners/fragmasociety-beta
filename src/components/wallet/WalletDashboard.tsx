import { useState } from "react";
import { motion } from "framer-motion";
import { WalletBalanceCard } from "./WalletBalanceCard";
import { WalletPortfolio } from "./WalletPortfolio";
import { WalletCreditModal } from "./WalletCreditModal";
import { WalletWithdrawModal } from "./WalletWithdrawModal";

export const WalletDashboard = () => {
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Wallet Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <WalletBalanceCard
          onCredit={() => setCreditModalOpen(true)}
          onWithdraw={() => setWithdrawModalOpen(true)}
        />
      </motion.div>

      {/* Portfolio Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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