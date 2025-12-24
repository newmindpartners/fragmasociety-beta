import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Transfer } from "@/hooks/useTransfers";
import { format, parseISO } from "date-fns";
import { ArrowUpRight, ArrowDownLeft, Building2, Calendar, Hash, FileText, Clock, DollarSign } from "lucide-react";

interface TransferDetailsModalProps {
  transfer: Transfer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusStyles = (status: Transfer["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 border-0";
    case "processing":
      return "bg-yellow-100 text-yellow-700 border-0";
    case "pending":
      return "bg-blue-100 text-blue-700 border-0";
    case "failed":
      return "bg-red-100 text-red-700 border-0";
    default:
      return "bg-gray-100 text-gray-700 border-0";
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDeposit ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
              }`}
            >
              {isDeposit ? (
                <ArrowDownLeft className="w-5 h-5" />
              ) : (
                <ArrowUpRight className="w-5 h-5" />
              )}
            </div>
            <span>{isDeposit ? "Deposit Details" : "Withdrawal Details"}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount */}
          <div className="text-center py-4 bg-muted/30 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Amount</p>
            <p className={`text-3xl font-bold ${isDeposit ? "text-green-600" : "text-foreground"}`}>
              {isDeposit ? "+" : "-"}{formatAmount(transfer.amount, transfer.currency)}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Status</span>
            </div>
            <Badge variant="secondary" className={getStatusStyles(transfer.status)}>
              {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
            </Badge>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Date & Time</span>
            </div>
            <span className="font-medium text-foreground">
              {format(parseISO(transfer.created_at), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>

          {/* Reference */}
          {transfer.reference && (
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Hash className="w-4 h-4" />
                <span>Reference</span>
              </div>
              <span className="font-mono text-sm font-medium text-foreground">
                {transfer.reference}
              </span>
            </div>
          )}

          {/* Bank Details */}
          {transfer.bank_name && (
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>Bank Account</span>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{transfer.bank_name}</p>
                {transfer.account_last4 && (
                  <p className="text-sm text-muted-foreground">**** {transfer.account_last4}</p>
                )}
              </div>
            </div>
          )}

          {/* Currency */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>Currency</span>
            </div>
            <span className="font-medium text-foreground">{transfer.currency}</span>
          </div>

          {/* Notes */}
          {transfer.notes && (
            <div className="py-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <FileText className="w-4 h-4" />
                <span>Notes</span>
              </div>
              <p className="text-foreground bg-muted/30 rounded-lg p-3 text-sm">
                {transfer.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
