import { Copy, MoreHorizontal, Plus, ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WalletBalanceCardProps {
  onCredit: () => void;
  onWithdraw: () => void;
}

export const WalletBalanceCard = ({ onCredit, onWithdraw }: WalletBalanceCardProps) => {
  const walletAddress = "0x1cf2...9a56";
  const balance = 3000.00;
  const adaEquivalent = 9064.61;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x1cf2a8b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9a56");
    toast.success("Wallet address copied");
  };

  return (
    <div className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-2xl p-6 text-primary-foreground h-full min-h-[240px] flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Alex</h3>
            <button 
              onClick={handleCopyAddress}
              className="flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <span>{walletAddress}</span>
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Balance */}
      <div className="flex-1">
        <p className="text-4xl font-bold tracking-tight">$ {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        <div className="flex items-center gap-1.5 mt-2 text-sm text-primary-foreground/70">
          <TrendingUp className="w-4 h-4" />
          <span>{adaEquivalent.toLocaleString()} ADA</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <Button
          onClick={onCredit}
          variant="outline"
          className="flex-1 bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground rounded-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Credit
        </Button>
        <Button
          onClick={onWithdraw}
          variant="outline"
          className="flex-1 bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground rounded-full"
        >
          <ArrowUpRight className="w-4 h-4 mr-2" />
          Withdraw
        </Button>
      </div>

      {/* Footer */}
      <p className="text-xs text-primary-foreground/50 mt-4">
        Your wallet is securely stored with Fragma
      </p>
    </div>
  );
};
