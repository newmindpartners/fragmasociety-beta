import { useState } from "react";
import { ArrowDownLeft, Plus, Copy, Check, Clock, Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { AddBankAccountModal } from "./AddBankAccountModal";
import { useTransfers } from "@/hooks/useTransfers";

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BankAccount {
  id: string;
  last4: string;
  type: "mastercard" | "visa";
}

const mockAccounts: BankAccount[] = [
  { id: "1", last4: "1244", type: "mastercard" },
  { id: "2", last4: "1255", type: "mastercard" },
];

const fragmaAccountDetails = {
  bankName: "Swiss National Bank",
  accountName: "Fragma Capital SA",
  iban: "CH93 0076 2011 6238 5295 7",
  bic: "SNBZCHZZXXX",
  reference: "DEP-2024-XXXXX",
};

type Step = "form" | "confirmation" | "success";

export const DepositModal = ({ open, onOpenChange }: DepositModalProps) => {
  const [step, setStep] = useState<Step>("form");
  const [selectedAccount, setSelectedAccount] = useState(mockAccounts[0]?.id || "");
  const [amount, setAmount] = useState("");
  const [addBankAccountOpen, setAddBankAccountOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [depositReference, setDepositReference] = useState(fragmaAccountDetails.reference);
  const { createTransfer } = useTransfers();
  const currentBalance = 5000;
  const dailyLimit = 25000;

  const handleCopy = (value: string, fieldName: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(fieldName);
    toast.success(`${fieldName} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (parseFloat(amount) > dailyLimit) {
      toast.error(`Amount exceeds daily limit of $${dailyLimit.toLocaleString()}`);
      return;
    }
    // Generate unique reference
    const ref = `DEP-${Date.now().toString(36).toUpperCase()}`;
    setDepositReference(ref);
    setStep("confirmation");
  };

  const handleConfirmDeposit = async () => {
    setIsSubmitting(true);
    try {
      const selectedAccountData = mockAccounts.find(a => a.id === selectedAccount);
      await createTransfer({
        type: "deposit",
        amount: parseFloat(amount),
        currency: "USD",
        status: "processing",
        reference: depositReference,
        bank_name: fragmaAccountDetails.bankName,
        account_last4: selectedAccountData?.last4 || null,
        notes: null,
      });
      setStep("success");
    } catch (err: any) {
      console.error("Error creating deposit:", err);
      toast.error("Failed to create deposit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep("form");
      setAmount("");
      setCopiedField(null);
    }, 200);
  };

  const CopyableField = ({ label, value, fieldName }: { label: string; value: string; fieldName: string }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="ml-2 h-8 w-8 p-0 hover:bg-slate-100"
        onClick={() => handleCopy(value, fieldName)}
      >
        {copiedField === fieldName ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="theme-dashboard sm:max-w-md bg-white border-gray-200 text-gray-900 max-h-[90vh] overflow-hidden flex flex-col">
        {step === "form" && (
          <>
            <DialogHeader className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                <ArrowDownLeft className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-foreground">Deposit to Fragma</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Securely deposit your funds to Fragma using your preferred payment method
                </p>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 mt-4 flex-1 overflow-y-auto">
              {/* Balance Display */}
              <div className="p-4 rounded-xl border border-slate-300 border-dashed bg-slate-50">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-lg font-semibold text-foreground">US ${currentBalance.toLocaleString()}.00 Available</p>
              </div>

              {/* Bank Account Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-foreground font-medium">Bank Account</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-slate-700 hover:text-slate-900 hover:bg-transparent p-0 h-auto"
                    onClick={() => setAddBankAccountOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Bank Account
                  </Button>
                </div>

                <RadioGroup value={selectedAccount} onValueChange={setSelectedAccount} className="space-y-2">
                  {mockAccounts.map((account) => (
                    <label
                      key={account.id}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedAccount === account.id
                          ? "border-slate-900 bg-slate-50"
                          : "border-border hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={account.id} id={`deposit-${account.id}`} />
                        <span className="text-foreground">••••{account.last4}</span>
                      </div>
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-red-500"></div>
                        <div className="w-5 h-5 rounded-full bg-orange-400"></div>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Amount Deposit</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-background border-border pl-7 pr-14"
                    step="0.01"
                    min="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">USD</span>
                </div>
                <p className="text-sm text-muted-foreground">Day Limit: <span className="text-slate-700 font-medium">${dailyLimit.toLocaleString()}</span></p>
              </div>

              {/* Notice */}
              <p className="text-xs text-muted-foreground text-center">
                Notice: Funds can only be withdrawn back to the bank account used to
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-muted"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="navy"
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "confirmation" && (
          <>
            <DialogHeader className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-foreground">Fragma Bank Details</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Transfer ${parseFloat(amount).toLocaleString()} to the following account
                </p>
              </div>
            </DialogHeader>

            <div className="space-y-3 mt-4 flex-1 overflow-y-auto">
              {/* Amount Summary */}
              <div className="p-4 rounded-xl border border-slate-300 bg-slate-50 text-center">
                <p className="text-sm text-muted-foreground">Amount to Deposit</p>
                <p className="text-2xl font-bold text-foreground">${parseFloat(amount).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">USD</p>
              </div>

              {/* Fragma Account Details */}
              <div className="space-y-2">
                <CopyableField 
                  label="Bank Name" 
                  value={fragmaAccountDetails.bankName} 
                  fieldName="Bank Name" 
                />
                <CopyableField 
                  label="Account Name" 
                  value={fragmaAccountDetails.accountName} 
                  fieldName="Account Name" 
                />
                <CopyableField 
                  label="IBAN" 
                  value={fragmaAccountDetails.iban} 
                  fieldName="IBAN" 
                />
                <CopyableField 
                  label="BIC / SWIFT" 
                  value={fragmaAccountDetails.bic} 
                  fieldName="BIC / SWIFT" 
                />
                <CopyableField 
                  label="Payment Reference" 
                  value={depositReference} 
                  fieldName="Reference" 
                />
              </div>

              {/* Important Notice */}
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-xs text-amber-800">
                  <strong>Important:</strong> Please use the exact reference code when making your transfer. This helps us identify and credit your deposit quickly.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-muted"
                  onClick={() => setStep("form")}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="navy"
                  className="flex-1"
                  onClick={handleConfirmDeposit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "I've Made the Transfer"
                  )}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-slate-700" />
              </div>
              <DialogTitle className="text-xl font-semibold text-foreground mb-2">
                Deposit Pending
              </DialogTitle>
              <p className="text-sm text-muted-foreground max-w-xs">
                Your deposit of <span className="font-semibold text-foreground">${parseFloat(amount).toLocaleString()}</span> is being processed. We'll notify you once the funds are credited to your account.
              </p>
            </div>

            {/* Deposit Summary */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm font-medium text-amber-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Processing
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm font-medium text-foreground">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Reference</span>
                  <span className="text-sm font-medium text-foreground font-mono">{depositReference}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Time</span>
                  <span className="text-sm font-medium text-foreground">1-3 Business Days</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                You can track the status of your deposit in Transfer History
              </p>

              <Button
                type="button"
                variant="navy"
                className="w-full"
                onClick={handleClose}
              >
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
      <AddBankAccountModal open={addBankAccountOpen} onOpenChange={setAddBankAccountOpen} />
    </Dialog>
  );
};