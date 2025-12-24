import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface EarningsDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inProgressAmount: number;
}

interface ProcessingDistribution {
  id: string;
  dealName: string;
  period: string;
  amount: number;
  expectedDate: string;
  status: "processing" | "pending_issuer";
}

export const EarningsDetailsDrawer = ({
  open,
  onOpenChange,
  inProgressAmount,
}: EarningsDetailsDrawerProps) => {
  const processingDistributions: ProcessingDistribution[] = [
    {
      id: "1",
      dealName: "Cannes Film Fund I",
      period: "September 2025",
      amount: 45.30,
      expectedDate: "Oct 15, 2025",
      status: "processing",
    },
    {
      id: "2",
      dealName: "Malibu Real Estate",
      period: "Q3 2025",
      amount: 43.80,
      expectedDate: "Oct 20, 2025",
      status: "pending_issuer",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg !bg-white border-l border-slate-200 p-0">
        <div className="p-6 border-b border-slate-100 bg-white">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-slate-900 tracking-tight">
              Distributions in progress
            </SheetTitle>
          </SheetHeader>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)] bg-white">
          {/* Summary Card */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200/80 p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-600" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-amber-600 uppercase tracking-widest font-semibold mb-1">
                  Total Processing
                </p>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">
                  €{inProgressAmount.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              These distributions are being finalized by the issuers. Your earnings will appear in your wallet automatically once ready.
            </p>
          </div>

          {/* Distribution List */}
          <div className="space-y-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Pending Distributions
            </p>
            
            <div className="space-y-3">
              {processingDistributions.map((dist, index) => (
                <motion.div
                  key={dist.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-900 text-base">{dist.dealName}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{dist.period} earnings</p>
                    </div>
                    <p className="text-xl font-bold text-slate-900">
                      +€{dist.amount.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      dist.status === "processing" 
                        ? "bg-amber-100 text-amber-700 border border-amber-200" 
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}>
                      <Clock className="w-3 h-3" />
                      {dist.status === "processing" ? "Processing" : "Pending issuer"}
                    </span>
                    <p className="text-sm text-slate-500">
                      Est. {dist.expectedDate}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-5">
            <p className="font-semibold text-slate-800 mb-2">What happens next?</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Once the issuer finalizes the distribution, your earnings will be automatically added to your Fragma wallet. No action needed from your side.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};