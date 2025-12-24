import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Check,
  TrendingUp,
  Clock,
  AlertCircle,
  Sparkles,
  Building2,
  Film,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

interface AvailableDeal {
  id: string;
  name: string;
  category: string;
  targetReturn: string;
  minInvestment: number;
  term: string;
  risk: "Low" | "Medium" | "High";
  icon: "building" | "film" | "trophy";
  availableSlots: number;
  totalRaise: string;
  currentRaised: string;
}

interface ReinvestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableAmount: number;
  sourceDealName?: string;
}

const mockDeals: AvailableDeal[] = [
  {
    id: "naouri-malibu",
    name: "Naouri Malibu Villa",
    category: "Real Estate",
    targetReturn: "10-15%",
    minInvestment: 10,
    term: "24-32 months",
    risk: "Medium",
    icon: "building",
    availableSlots: 12,
    totalRaise: "$5,000,000",
    currentRaised: "$3,750,000",
  },
  {
    id: "balsiger-horse",
    name: "Balsiger Horse Portfolio",
    category: "Sports",
    targetReturn: "8-12%",
    minInvestment: 25,
    term: "24-36 months",
    risk: "Medium",
    icon: "trophy",
    availableSlots: 8,
    totalRaise: "€500,000",
    currentRaised: "€375,000",
  },
  {
    id: "film-fund",
    name: "Independent Film Fund",
    category: "Entertainment",
    targetReturn: "15-25%",
    minInvestment: 20,
    term: "18-24 months",
    risk: "High",
    icon: "film",
    availableSlots: 25,
    totalRaise: "$2,000,000",
    currentRaised: "$1,200,000",
  },
];

const DealIcon = ({ type }: { type: "building" | "film" | "trophy" }) => {
  switch (type) {
    case "building":
      return <Building2 className="w-5 h-5" />;
    case "film":
      return <Film className="w-5 h-5" />;
    case "trophy":
      return <Trophy className="w-5 h-5" />;
  }
};

export const ReinvestModal = ({
  open,
  onOpenChange,
  availableAmount,
  sourceDealName = "Your earnings",
}: ReinvestModalProps) => {
  const [step, setStep] = useState<"select" | "amount" | "confirm">("select");
  const [selectedDeal, setSelectedDeal] = useState<AvailableDeal | null>(null);
  const [reinvestAmount, setReinvestAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const resetModal = () => {
    setStep("select");
    setSelectedDeal(null);
    setReinvestAmount("");
    setIsProcessing(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetModal, 300);
  };

  const handleSelectDeal = (deal: AvailableDeal) => {
    setSelectedDeal(deal);
    setReinvestAmount(Math.min(availableAmount, deal.minInvestment).toString());
    setStep("amount");
  };

  const handleConfirmAmount = () => {
    const amount = parseFloat(reinvestAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (amount > availableAmount) {
      toast.error(`Maximum available: €${availableAmount.toFixed(2)}`);
      return;
    }
    if (selectedDeal && amount < selectedDeal.minInvestment) {
      toast.error(`Minimum investment: €${selectedDeal.minInvestment}`);
      return;
    }
    setStep("confirm");
  };

  const handleConfirmReinvest = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success("Reinvestment successful!", {
      description: `€${parseFloat(reinvestAmount).toFixed(2)} has been invested in ${selectedDeal?.name}`,
    });
    
    handleClose();
  };

  const getRiskBadge = (risk: "Low" | "Medium" | "High") => {
    switch (risk) {
      case "Low":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200">
            Low Risk
          </Badge>
        );
      case "Medium":
        return (
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200">
            Medium Risk
          </Badge>
        );
      case "High":
        return (
          <Badge className="bg-red-50 text-red-700 border border-red-200">
            High Risk
          </Badge>
        );
    }
  };

  const progressPercent = selectedDeal
    ? (parseFloat(selectedDeal.currentRaised.replace(/[^0-9.]/g, "")) /
        parseFloat(selectedDeal.totalRaise.replace(/[^0-9.]/g, ""))) *
      100
    : 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden bg-white border-slate-200">
        {/* Header */}
        <div className="relative overflow-hidden px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-200/30 rounded-full blur-3xl" />
          
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-slate-900">
                  Reinvest Earnings
                </DialogTitle>
                <p className="text-sm text-slate-500">
                  Available: <span className="font-semibold text-emerald-600">€{availableAmount.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Step Indicator */}
          <div className="relative z-10 flex items-center gap-2 mt-4">
            {["select", "amount", "confirm"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    step === s
                      ? "bg-violet-600 text-white"
                      : ["select", "amount", "confirm"].indexOf(step) > i
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {["select", "amount", "confirm"].indexOf(step) > i ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 2 && (
                  <div
                    className={`w-12 h-0.5 ${
                      ["select", "amount", "confirm"].indexOf(step) > i
                        ? "bg-emerald-500"
                        : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Deal */}
            {step === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <p className="text-sm text-slate-600 mb-4">
                  Choose a deal to reinvest your earnings from {sourceDealName}:
                </p>

                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                  {mockDeals.map((deal) => {
                    const canAfford = availableAmount >= deal.minInvestment;
                    return (
                    <button
                      key={deal.id}
                      onClick={() => handleSelectDeal(deal)}
                      disabled={!canAfford}
                      className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        !canAfford
                          ? "opacity-50 cursor-not-allowed border-slate-200 bg-slate-50"
                          : "border-slate-200 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 bg-white active:scale-[0.99]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                          <DealIcon type={deal.icon} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-slate-900 truncate">
                              {deal.name}
                            </h3>
                            {getRiskBadge(deal.risk)}
                          </div>
                          <p className="text-xs text-slate-500 mb-2">
                            {deal.category} • {deal.term}
                          </p>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1 text-emerald-600 font-medium">
                              <TrendingUp className="w-3.5 h-3.5" />
                              {deal.targetReturn}
                            </span>
                            <span className="text-slate-500">
                              Min: €{deal.minInvestment}
                            </span>
                            <span className="text-slate-500">
                              {deal.availableSlots} slots left
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-300 flex-shrink-0 mt-3" />
                      </div>
                    </button>
                  );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Enter Amount */}
            {step === "amount" && selectedDeal && (
              <motion.div
                key="amount"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Selected Deal Summary */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
                      <DealIcon type={selectedDeal.icon} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{selectedDeal.name}</h3>
                      <p className="text-xs text-slate-500">
                        {selectedDeal.category} • {selectedDeal.targetReturn} target
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Reinvestment Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                      €
                    </span>
                    <Input
                      type="number"
                      value={reinvestAmount}
                      onChange={(e) => setReinvestAmount(e.target.value)}
                      className="pl-8 h-12 text-lg font-semibold border-slate-200 focus:border-violet-500 focus:ring-violet-500"
                      placeholder="0.00"
                      min={selectedDeal.minInvestment}
                      max={availableAmount}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-500">
                      Min: €{selectedDeal.minInvestment}
                    </span>
                    <button
                      onClick={() => setReinvestAmount(availableAmount.toString())}
                      className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                    >
                      Use max: €{availableAmount.toFixed(2)}
                    </button>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex gap-2">
                  {[25, 50, 75, 100].map((percent) => {
                    const amount = Math.max(
                      selectedDeal.minInvestment,
                      (availableAmount * percent) / 100
                    );
                    if (amount > availableAmount) return null;
                    return (
                      <button
                        key={percent}
                        onClick={() => setReinvestAmount(amount.toFixed(2))}
                        className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-violet-100 text-slate-700 hover:text-violet-700 text-sm font-medium transition-colors"
                      >
                        {percent}%
                      </button>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep("select")}
                    className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirmAmount}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirm */}
            {step === "confirm" && selectedDeal && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Confirmation Summary */}
                <div className="relative overflow-hidden rounded-2xl p-5 text-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e]" />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/30 rounded-full blur-[50px]" />
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-[40px]" />
                  
                  <div className="relative z-10 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-7 h-7 text-emerald-400" />
                    </div>
                    <p className="text-sm text-violet-300 mb-1">You're reinvesting</p>
                    <p className="text-3xl font-bold mb-1">
                      €{parseFloat(reinvestAmount).toFixed(2)}
                    </p>
                    <p className="text-sm text-violet-300">into {selectedDeal.name}</p>
                  </div>
                </div>

                {/* Deal Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Target Return</span>
                    <span className="text-sm font-semibold text-emerald-600">
                      {selectedDeal.targetReturn}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Investment Term</span>
                    <span className="text-sm font-medium text-slate-900">
                      {selectedDeal.term}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Risk Level</span>
                    {getRiskBadge(selectedDeal.risk)}
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-500">Funding Progress</span>
                    <span className="text-sm font-medium text-slate-900">
                      {progressPercent.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Warning */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    By confirming, you agree to the terms and conditions of this investment. 
                    Past performance is not indicative of future results.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep("amount")}
                    disabled={isProcessing}
                    className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirmReinvest}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Confirm Reinvestment
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};
