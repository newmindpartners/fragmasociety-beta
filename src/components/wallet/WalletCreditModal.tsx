import { useState } from "react";
import { X, ArrowDownUp, ChevronRight, DollarSign, Loader2, CreditCard, Wallet, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useWalletHistory } from "@/hooks/useWalletHistory";

interface WalletCreditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CreditMethod = "card" | "crypto";
type CryptoCurrency = "USDC" | "ADA" | "BTC";

const cryptoAddresses: Record<CryptoCurrency, string> = {
  USDC: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
  ADA: "addr1qxy8gg3v4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e",
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
};

const currencyInfo: Record<CryptoCurrency, { bg: string; label: string; network: string }> = {
  USDC: { bg: "bg-blue-500", label: "USDC", network: "Ethereum (ERC-20)" },
  ADA: { bg: "bg-slate-700", label: "ADA", network: "Cardano" },
  BTC: { bg: "bg-orange-500", label: "BTC", network: "Bitcoin" },
};

export const WalletCreditModal = ({ open, onOpenChange }: WalletCreditModalProps) => {
  const [method, setMethod] = useState<CreditMethod>("card");
  const [amount, setAmount] = useState("100");
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>("USDC");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const { addTransaction } = useWalletHistory();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(cryptoAddresses[selectedCrypto]);
    setCopiedAddress(true);
    toast.success("Address copied to clipboard");
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleConfirm = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addTransaction({
      type: "Credit",
      amount: `+$${amount}`,
      details: method === "card" ? "Credit Card" : `${selectedCrypto} Deposit`,
      status: "Completed",
    });

    setIsSubmitting(false);
    toast.success(`Successfully credited $${amount}`);
    onOpenChange(false);
    setAmount("100");
  };

  const handleClose = () => {
    onOpenChange(false);
    setAmount("100");
    setMethod("card");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent hideClose className="sm:max-w-[440px] p-0 overflow-hidden border-0 bg-transparent shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/98 to-slate-100/95" />
          
          {/* Ambient light spots */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-violet-200/25 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-200/20 rounded-full blur-[60px]" />
          
          {/* Border */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-slate-200/80" />

          {/* Content */}
          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center ring-1 ring-violet-200/60">
                <div className="w-8 h-8 rounded-full border-2 border-violet-500 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-violet-600" />
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors ring-1 ring-slate-200/60"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-slate-800 mb-1">Credit Wallet</h2>
            <p className="text-sm text-slate-500 mb-5">Choose how you want to add funds</p>

            {/* Method Selector */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                onClick={() => setMethod("card")}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                  method === "card" 
                    ? "border-violet-500 bg-violet-50/50" 
                    : "border-slate-200 bg-white/60 hover:border-slate-300"
                }`}
              >
                <div className={`w-10 h-10 rounded-full mb-3 flex items-center justify-center ${
                  method === "card" ? "bg-violet-100" : "bg-slate-100"
                }`}>
                  <CreditCard className={`w-5 h-5 ${method === "card" ? "text-violet-600" : "text-slate-500"}`} />
                </div>
                <p className={`text-sm font-semibold ${method === "card" ? "text-violet-700" : "text-slate-700"}`}>
                  Credit Card
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Instant deposit</p>
                {method === "card" && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setMethod("crypto")}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                  method === "crypto" 
                    ? "border-violet-500 bg-violet-50/50" 
                    : "border-slate-200 bg-white/60 hover:border-slate-300"
                }`}
              >
                <div className={`w-10 h-10 rounded-full mb-3 flex items-center justify-center ${
                  method === "crypto" ? "bg-violet-100" : "bg-slate-100"
                }`}>
                  <Wallet className={`w-5 h-5 ${method === "crypto" ? "text-violet-600" : "text-slate-500"}`} />
                </div>
                <p className={`text-sm font-semibold ${method === "crypto" ? "text-violet-700" : "text-slate-700"}`}>
                  Send Crypto
                </p>
                <p className="text-xs text-slate-400 mt-0.5">USDC, ADA, BTC</p>
                {method === "crypto" && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            </div>

            {/* Credit Card Method */}
            {method === "card" && (
              <div className="space-y-3">
                {/* Amount Input */}
                <div className="bg-white/80 rounded-xl border border-slate-200/70 p-4">
                  <label className="text-xs text-slate-500 mb-2 block font-medium">Amount</label>
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border-0 bg-transparent text-3xl font-bold text-slate-800 p-0 h-auto focus-visible:ring-0 w-32"
                      placeholder="0"
                    />
                    <div className="w-10 h-10 rounded-full border-2 border-violet-500 flex items-center justify-center bg-white">
                      <DollarSign className="w-4 h-4 text-violet-600" />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <button className="w-full bg-white/80 rounded-xl border border-slate-200/70 p-4 flex items-center justify-between hover:bg-white transition-colors group">
                  <div>
                    <p className="text-xs text-slate-500 text-left font-medium">Payment method</p>
                    <div className="flex items-center gap-2.5 mt-2">
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-600 ring-1 ring-white"></div>
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 ring-1 ring-white"></div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Mastercard</p>
                        <p className="text-[10px] text-slate-400">**** 1244</p>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </button>

                {/* Fee Notice */}
                <p className="text-[11px] text-slate-400 text-center">
                  1.80% + $0.18 fee applied to card transactions
                </p>
              </div>
            )}

            {/* Crypto Method */}
            {method === "crypto" && (
              <div className="space-y-3">
                {/* Crypto Selector */}
                <div className="bg-white/80 rounded-xl border border-slate-200/70 p-3">
                  <p className="text-xs text-slate-500 mb-3 font-medium">Select cryptocurrency</p>
                  <div className="flex gap-2">
                    {(["USDC", "ADA", "BTC"] as CryptoCurrency[]).map((crypto) => (
                      <button
                        key={crypto}
                        onClick={() => setSelectedCrypto(crypto)}
                        className={`flex-1 py-2.5 px-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                          selectedCrypto === crypto
                            ? "border-violet-500 bg-violet-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full ${currencyInfo[crypto].bg} flex items-center justify-center`}>
                          <span className="text-[8px] font-bold text-white">
                            {crypto === "BTC" ? "₿" : crypto.charAt(0)}
                          </span>
                        </div>
                        <span className={`text-sm font-semibold ${
                          selectedCrypto === crypto ? "text-violet-700" : "text-slate-600"
                        }`}>
                          {crypto}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deposit Address */}
                <div className="bg-violet-50/80 rounded-xl border border-violet-200/60 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-violet-600 font-medium">Deposit Address</p>
                    <span className="text-[10px] text-violet-500 bg-violet-100 px-2 py-0.5 rounded-full">
                      {currencyInfo[selectedCrypto].network}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-slate-700 font-mono bg-white/80 rounded-lg px-3 py-2 flex-1 truncate border border-violet-100">
                      {cryptoAddresses[selectedCrypto]}
                    </p>
                    <button
                      onClick={handleCopyAddress}
                      className="w-10 h-10 rounded-lg bg-violet-500 hover:bg-violet-600 flex items-center justify-center transition-colors"
                    >
                      {copiedAddress ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-amber-50/80 rounded-xl border border-amber-200/60 p-3">
                  <p className="text-xs text-amber-700 leading-relaxed">
                    <strong>Important:</strong> Only send {selectedCrypto} to this address on the {currencyInfo[selectedCrypto].network} network. Sending other assets may result in permanent loss.
                  </p>
                </div>

                {/* Amount Input for Crypto */}
                <div className="bg-white/80 rounded-xl border border-slate-200/70 p-4">
                  <label className="text-xs text-slate-500 mb-2 block font-medium">Expected amount (USD value)</label>
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border-0 bg-transparent text-2xl font-bold text-slate-800 p-0 h-auto focus-visible:ring-0 w-32"
                      placeholder="0"
                    />
                    <div className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                      <span className="text-xs font-bold text-slate-600">USD</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center">
                  Deposits are credited within 10-30 minutes after confirmation
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 h-12 rounded-full bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-1 h-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-medium transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : method === "card" ? (
                  "Confirm Credit"
                ) : (
                  "I've Sent Crypto"
                )}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
