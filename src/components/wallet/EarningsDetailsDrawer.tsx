import { X, Clock, FileText, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
      <SheetContent className="w-full sm:max-w-md bg-white border-l border-slate-200">
        <SheetHeader className="pb-6 border-b border-slate-100">
          <SheetTitle className="text-xl font-semibold text-slate-800">
            Distributions in progress
          </SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Summary */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200/60 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-amber-600 uppercase tracking-wider font-medium">
                  Total processing
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  €{inProgressAmount.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              These distributions are being finalized by the issuers. Your earnings will appear in your wallet automatically once ready.
            </p>
          </div>

          {/* Distribution List */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Pending distributions
            </p>
            
            {processingDistributions.map((dist) => (
              <motion.div
                key={dist.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-slate-800">{dist.dealName}</p>
                    <p className="text-xs text-slate-500">{dist.period} earnings</p>
                  </div>
                  <p className="text-lg font-semibold text-slate-800">
                    +€{dist.amount.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      dist.status === "processing" 
                        ? "bg-amber-100 text-amber-700" 
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      <Clock className="w-3 h-3" />
                      {dist.status === "processing" ? "Processing" : "Pending issuer"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Est. {dist.expectedDate}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info */}
          <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600">
            <p className="font-medium text-slate-700 mb-1">What happens next?</p>
            <p>
              Once the issuer finalizes the distribution, your earnings will be automatically added to your Fragma wallet. No action needed from your side.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
