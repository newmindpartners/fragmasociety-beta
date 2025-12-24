import { EarningsAtGlance } from "./EarningsAtGlance";
import { RecentPayouts } from "./RecentPayouts";

export const WalletClaimIncome = () => {
  return (
    <div className="space-y-8">
      {/* Earnings at a Glance - 2 cards */}
      <EarningsAtGlance
        inProgress={89.10}
        upcomingThisMonth={78.10}
      />

      {/* Recent Payouts */}
      <RecentPayouts 
        onViewAll={() => console.log("View all earnings")}
      />
    </div>
  );
};
