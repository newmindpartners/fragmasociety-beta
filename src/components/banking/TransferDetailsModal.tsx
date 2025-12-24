import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Transfer } from "@/hooks/useTransfers";
import { format, parseISO } from "date-fns";
import { ArrowUpRight, ArrowDownLeft, Building2, Calendar, Hash, FileText, Clock, DollarSign, Download } from "lucide-react";
import { toast } from "sonner";

interface TransferDetailsModalProps {
  transfer: Transfer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusStyles = (status: Transfer["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-50 text-green-700 border-green-200";
    case "processing":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "pending":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "failed":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
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

  const handleExportPDF = () => {
    // Create a simple PDF-like content for printing/saving
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

    // Create blob and download
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
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDeposit ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
              }`}
            >
              {isDeposit ? (
                <ArrowDownLeft className="w-5 h-5" />
              ) : (
                <ArrowUpRight className="w-5 h-5" />
              )}
            </div>
            <span className="text-foreground">{isDeposit ? "Deposit Details" : "Withdrawal Details"}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Amount */}
          <div className="text-center py-6 bg-muted/30 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground mb-1">Amount</p>
            <p className={`text-3xl font-bold ${isDeposit ? "text-green-600" : "text-foreground"}`}>
              {isDeposit ? "+" : "-"}{formatAmount(transfer.amount, transfer.currency)}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Status</span>
            </div>
            <Badge variant="outline" className={getStatusStyles(transfer.status)}>
              {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
            </Badge>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Date & Time</span>
            </div>
            <span className="font-medium text-foreground text-sm">
              {format(parseISO(transfer.created_at), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>

          {/* Reference */}
          {transfer.reference && (
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Hash className="w-4 h-4" />
                <span className="text-sm">Reference</span>
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
                <span className="text-sm">Bank Account</span>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground text-sm">{transfer.bank_name}</p>
                {transfer.account_last4 && (
                  <p className="text-xs text-muted-foreground">**** {transfer.account_last4}</p>
                )}
              </div>
            </div>
          )}

          {/* Currency */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Currency</span>
            </div>
            <span className="font-medium text-foreground text-sm">{transfer.currency}</span>
          </div>

          {/* Notes */}
          {transfer.notes && (
            <div className="py-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Notes</span>
              </div>
              <p className="text-foreground bg-muted/30 rounded-lg p-3 text-sm border border-border">
                {transfer.notes}
              </p>
            </div>
          )}

          {/* Export Button */}
          <Button 
            onClick={handleExportPDF} 
            variant="outline" 
            className="w-full mt-4"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
