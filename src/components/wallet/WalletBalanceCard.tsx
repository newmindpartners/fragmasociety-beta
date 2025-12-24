import { useState } from "react";
import { Copy, MoreHorizontal, Plus, ArrowUpRight, ArrowDownUp } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { WalletSwapModal } from "./WalletSwapModal";

interface WalletBalanceCardProps {
  onCredit: () => void;
  onWithdraw: () => void;
}

export const WalletBalanceCard = ({ onCredit, onWithdraw }: WalletBalanceCardProps) => {
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  
  const walletAddress = "0x1cf2...9a56";
  const balances = {
    usd: 3000.00,
    usdc: 1500.00,
    ada: 4532.30,
    btc: 0.0847,
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x1cf2a8b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9a56");
    toast.success("Wallet address copied");
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden rounded-3xl h-full min-h-[320px] flex flex-col"
      >
        {/* Background with gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
        
        {/* Ambient light spots */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-[80px] translate-y-1/2 translate-x-1/4" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[60px] -translate-x-1/2" />
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        
        {/* Inner glow border */}
        <div className="absolute inset-0 rounded-3xl border border-white/[0.08]" />
        <div className="absolute inset-[1px] rounded-3xl border border-white/[0.04]" />

        {/* Content */}
        <div className="relative z-10 p-7 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar with glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/40 to-indigo-500/40 rounded-full blur-md" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-slate-600/80 to-slate-700/80 flex items-center justify-center ring-1 ring-white/10 backdrop-blur-sm">
                  <svg className="w-6 h-6 text-slate-400/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-white tracking-tight">Alex</h3>
                <button 
                  onClick={handleCopyAddress}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white/70 transition-colors duration-300 group"
                >
                  <span className="font-mono text-xs">{walletAddress}</span>
                  <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
            
            {/* Options button */}
            <button className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-sm flex items-center justify-center transition-all duration-300 ring-1 ring-white/[0.08] hover:ring-white/[0.12]">
              <MoreHorizontal className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Available Label */}
          <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-2">Available Balance</p>

          {/* Main USD Balance */}
          <div className="mb-5">
            <p className="text-[2.75rem] font-bold text-white tracking-tight leading-none">
              <span className="text-white/80">$</span>{balances.usd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Currency Balances */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {/* USDC */}
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl p-3 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-white">U</span>
                </div>
                <span className="text-[10px] text-white/50 font-medium">USDC</span>
              </div>
              <p className="text-base font-semibold text-white">{balances.usdc.toLocaleString()}</p>
            </div>

            {/* ADA */}
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl p-3 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-white">A</span>
                </div>
                <span className="text-[10px] text-white/50 font-medium">ADA</span>
              </div>
              <p className="text-base font-semibold text-white">{balances.ada.toLocaleString()}</p>
            </div>

            {/* BTC */}
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl p-3 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-white">₿</span>
                </div>
                <span className="text-[10px] text-white/50 font-medium">BTC</span>
              </div>
              <p className="text-base font-semibold text-white">{balances.btc.toFixed(4)}</p>
            </div>

            {/* Swap Button */}
            <button
              onClick={() => setSwapModalOpen(true)}
              className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border border-violet-500/30 flex flex-col items-center justify-center hover:from-violet-500/30 hover:to-purple-500/30 hover:border-violet-500/40 transition-all duration-300 group"
            >
              <ArrowDownUp className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
              <span className="text-[9px] text-violet-400/80 mt-1 font-medium">Swap</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={onCredit}
              className="flex-1 h-12 rounded-full bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-md flex items-center justify-center gap-2.5 transition-all duration-300 ring-1 ring-white/[0.1] hover:ring-white/[0.15] group"
            >
              <Plus className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
              <span className="font-medium text-sm text-white/80 group-hover:text-white transition-colors">Credit</span>
            </button>
            <button
              onClick={onWithdraw}
              className="flex-1 h-12 rounded-full bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-md flex items-center justify-center gap-2.5 transition-all duration-300 ring-1 ring-white/[0.1] hover:ring-white/[0.15] group"
            >
              <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
              <span className="font-medium text-sm text-white/80 group-hover:text-white transition-colors">Withdraw</span>
            </button>
          </div>

          {/* Footer */}
          <p className="text-[12px] text-white/25 mt-5 tracking-wide">
            Your wallet is securely stored with Dfns
          </p>
        </div>
      </motion.div>

      <WalletSwapModal open={swapModalOpen} onOpenChange={setSwapModalOpen} />
    </>
  );
};
