import { useState } from "react";
import { EarningsAtGlance } from "./EarningsAtGlance";
import { RecentPayouts } from "./RecentPayouts";
import { WalletWithdrawModal } from "./WalletWithdrawModal";

export const WalletClaimIncome = () => {
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Earnings at a Glance */}
      <EarningsAtGlance
        availableNow={145.20}
        inProgress={89.10}
        upcomingThisMonth={78.10}
        onWithdraw={() => setWithdrawModalOpen(true)}
      />

      {/* Recent Payouts */}
      <RecentPayouts 
        onViewAll={() => console.log("View all earnings")}
      />

      {/* Withdraw Modal */}
      <WalletWithdrawModal
        open={withdrawModalOpen}
        onOpenChange={setWithdrawModalOpen}
      />
    </div>
  );
};
