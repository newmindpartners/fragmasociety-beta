import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const WalletClaimIncome = () => {
  const incomeData = {
    earnedThisWeek: 23,
    availableToClaim: 112.45,
    availableAda: 58.23,
    lastClaimed: "$85.10",
    lastClaimedDate: "Apr 13, 2025",
    nextClaim: "6 Days",
    nextClaimDate: "Apr 16, 2025",
  };

  const handleClaimIncome = () => {
    toast.success("Income claimed successfully!");
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xl font-semibold text-foreground">Claim Income</h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Earned this week</p>
          <p className="text-xl font-bold text-foreground">{incomeData.earnedThisWeek}</p>
          <p className="text-xs text-muted-foreground">ADA</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Available to claim</p>
          <p className="text-xl font-bold text-foreground">${incomeData.availableToClaim}</p>
          <p className="text-xs text-muted-foreground">≈ {incomeData.availableAda} ADA</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Last claimed</p>
          <p className="text-xl font-bold text-foreground">{incomeData.lastClaimed}</p>
          <p className="text-xs text-muted-foreground">{incomeData.lastClaimedDate}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Next claim</p>
          <p className="text-xl font-bold text-foreground">{incomeData.nextClaim}</p>
          <p className="text-xs text-muted-foreground">{incomeData.nextClaimDate}</p>
        </div>
      </div>

      {/* Claim Button */}
      <Button
        onClick={handleClaimIncome}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 mt-auto"
      >
        Claim Income
      </Button>
    </div>
  );
};
