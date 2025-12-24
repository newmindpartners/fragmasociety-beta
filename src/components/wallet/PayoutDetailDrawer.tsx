import { X, Calendar, FileText, Download, Check, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type PayoutStatus = "paid" | "processing" | "upcoming";

interface Payout {
  id: string;
  category: string;
  title: string;
  status: PayoutStatus;
  amount: number;
  date?: string;
  method?: string;
}

interface PayoutDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payout: Payout | null;
}

export const PayoutDetailDrawer = ({
  open,
  onOpenChange,
  payout,
}: PayoutDetailDrawerProps) => {
  if (!payout) return null;

  const getStatusContent = () => {
    switch (payout.status) {
      case "processing":
        return (
          <div className="bg-amber-50 rounded-2xl border border-amber-200/60 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                <Clock className="w-3.5 h-3.5" />
                Processing
              </span>
            </div>
            <p className="text-sm text-slate-600">
              The issuer is finalizing this payout. Your earnings will appear automatically once it's ready.
            </p>
          </div>
        );
      case "paid":
        return (
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200/60 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                <Check className="w-3.5 h-3.5" />
                Already added
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Good news! €{payout.amount.toFixed(2)} has been added to your Fragma balance.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            >
              View balance
            </Button>
          </div>
        );
      case "upcoming":
        return (
          <div className="bg-violet-50 rounded-2xl border border-violet-200/60 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium">
                <Calendar className="w-3.5 h-3.5" />
                Upcoming
              </span>
            </div>
            <p className="text-sm text-slate-600">
              This distribution is scheduled for release. You'll receive it automatically based on your holdings.
            </p>
          </div>
        );
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-white border-l border-slate-200">
        <SheetHeader className="pb-6 border-b border-slate-100">
          <SheetTitle className="text-xl font-semibold text-slate-800">
            Payout details
          </SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Title & Amount */}
          <div>
            <p className="text-sm text-slate-500 mb-1">{payout.title}</p>
            <p className="text-4xl font-bold text-slate-800">
              +€{payout.amount.toFixed(2)}
            </p>
          </div>

          {/* Status Content */}
          {getStatusContent()}

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-sm text-slate-500">Period covered</span>
              <span className="text-sm font-medium text-slate-700">01 Sep – 30 Sep 2025</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-sm text-slate-500">Distribution type</span>
              <span className="text-sm font-medium text-slate-700">Profit share</span>
            </div>
            {payout.date && (
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-sm text-slate-500">Paid on</span>
                <span className="text-sm font-medium text-slate-700">{payout.date} 2025</span>
              </div>
            )}
            {payout.method && (
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-sm text-slate-500">Claim method</span>
                <span className="text-sm font-medium text-slate-700 capitalize">{payout.method.replace("-", " ")}</span>
              </div>
            )}
          </div>

          {/* Document Link */}
          <button className="w-full flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-left group">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-700">Distribution notice</p>
              <p className="text-xs text-slate-500">View official PDF document</p>
            </div>
            <Download className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
