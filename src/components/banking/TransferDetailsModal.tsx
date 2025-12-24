import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Transfer } from "@/hooks/useTransfers";
import { format, parseISO } from "date-fns";
import { ArrowUpRight, ArrowDownLeft, Building2, Calendar, Hash, FileText, CheckCircle2, DollarSign, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TransferDetailsModalProps {
  transfer: Transfer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusConfig = (status: Transfer["status"]) => {
  switch (status) {
    case "completed":
      return { 
        bg: "bg-emerald-50", 
        text: "text-emerald-700", 
        border: "border-emerald-200",
        icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
      };
    case "processing":
      return { 
        bg: "bg-amber-50", 
        text: "text-amber-700", 
        border: "border-amber-200",
        icon: <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
      };
    case "pending":
      return { 
        bg: "bg-blue-50", 
        text: "text-blue-700", 
        border: "border-blue-200",
        icon: null
      };
    case "failed":
      return { 
        bg: "bg-red-50", 
        text: "text-red-700", 
        border: "border-red-200",
        icon: null
      };
    default:
      return { 
        bg: "bg-gray-50", 
        text: "text-gray-700", 
        border: "border-gray-200",
        icon: null
      };
  }
};

const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const TransferDetailsModal = ({ transfer, open, onOpenChange }: TransferDetailsModalProps) => {
  if (!transfer) return null;

  const isDeposit = transfer.type === "deposit";
  const statusConfig = getStatusConfig(transfer.status);

  const handleExportPDF = () => {
    const content = `
TRANSFER RECEIPT
================

Type: ${isDeposit ? "Deposit" : "Withdrawal"}
Amount: ${isDeposit ? "+" : "-"}${formatAmount(transfer.amount, transfer.currency)}
Status: ${transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
Date: ${format(parseISO(transfer.created_at), "MMMM d, yyyy 'at' h:mm a")}
Reference: ${transfer.reference || "N/A"}
Bank: ${transfer.bank_name || "N/A"}
Account: **** ${transfer.account_last4 || "N/A"}
Currency: ${transfer.currency}
${transfer.notes ? `Notes: ${transfer.notes}` : ""}

Generated on: ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transfer-${transfer.reference || transfer.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Receipt exported successfully");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] !bg-white dark:!bg-white p-0 overflow-hidden rounded-2xl shadow-2xl border-0">
        {/* Header with gradient */}
        <div className={`px-6 pt-6 pb-8 ${isDeposit ? "bg-gradient-to-br from-emerald-50 to-green-50" : "bg-gradient-to-br from-orange-50 to-amber-50"}`}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                  isDeposit ? "bg-white text-emerald-600" : "bg-white text-orange-600"
                }`}
              >
                {isDeposit ? (
                  <ArrowDownLeft className="w-6 h-6" />
                ) : (
                  <ArrowUpRight className="w-6 h-6" />
                )}
              </div>
              <div>
                <span className="text-gray-900 text-lg font-semibold block">
                  {isDeposit ? "Deposit Details" : "Withdrawal Details"}
                </span>
                <span className="text-gray-500 text-sm font-normal">
                  {format(parseISO(transfer.created_at), "MMM d, yyyy")}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Amount Card */}
          <div className="mt-6 text-center py-5 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1 font-medium">Amount</p>
            <p className={`text-4xl font-bold tracking-tight ${isDeposit ? "text-emerald-600" : "text-gray-900"}`}>
              {isDeposit ? "+" : "-"}{formatAmount(transfer.amount, transfer.currency)}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-6 pb-6 pt-2 space-y-1">
          {/* Status */}
          <div className="flex items-center justify-between py-3.5 border-b border-gray-100">
            <div className="flex items-center gap-2.5 text-gray-500">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-sm font-medium">Status</span>
            </div>
            <Badge 
              variant="outline" 
              className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} px-3 py-1 font-medium`}
            >
              {statusConfig.icon}
              {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
            </Badge>
          </div>

          {/* Date & Time */}
          <div className="flex items-center justify-between py-3.5 border-b border-gray-100">
            <div className="flex items-center gap-2.5 text-gray-500">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-sm font-medium">Date & Time</span>
            </div>
            <span className="font-medium text-gray-900 text-sm">
              {format(parseISO(transfer.created_at), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>

          {/* Reference */}
          {transfer.reference && (
            <div className="flex items-center justify-between py-3.5 border-b border-gray-100">
              <div className="flex items-center gap-2.5 text-gray-500">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Hash className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-sm font-medium">Reference</span>
              </div>
              <span className="font-mono text-sm font-semibold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-md">
                {transfer.reference}
              </span>
            </div>
          )}

          {/* Bank Details */}
          {transfer.bank_name && (
            <div className="flex items-center justify-between py-3.5 border-b border-gray-100">
              <div className="flex items-center gap-2.5 text-gray-500">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-sm font-medium">Bank Account</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm">{transfer.bank_name}</p>
                {transfer.account_last4 && (
                  <p className="text-xs text-gray-400 mt-0.5">•••• {transfer.account_last4}</p>
                )}
              </div>
            </div>
          )}

          {/* Currency */}
          <div className="flex items-center justify-between py-3.5 border-b border-gray-100">
            <div className="flex items-center gap-2.5 text-gray-500">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-sm font-medium">Currency</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm">{transfer.currency}</span>
          </div>

          {/* Notes */}
          {transfer.notes && (
            <div className="py-3.5">
              <div className="flex items-center gap-2.5 text-gray-500 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-sm font-medium">Notes</span>
              </div>
              <p className="text-gray-700 bg-gray-50 rounded-xl p-4 text-sm leading-relaxed border border-gray-100">
                {transfer.notes}
              </p>
            </div>
          )}

          {/* Export Button */}
          <Button 
            onClick={handleExportPDF} 
            variant="outline" 
            className="w-full mt-4 h-12 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl font-medium transition-all"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
