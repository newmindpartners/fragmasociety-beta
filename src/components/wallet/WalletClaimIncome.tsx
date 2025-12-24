import { RecentPayouts } from "./RecentPayouts";

export const WalletClaimIncome = () => {
  return (
    <div className="space-y-8">
      {/* Recent Payouts */}
      <RecentPayouts 
        onViewAll={() => console.log("View all earnings")}
      />
    </div>
  );
};