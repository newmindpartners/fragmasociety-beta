import { useState } from "react";
import { ArrowUpRight, Plus, CheckCircle2, ArrowLeft, Clock, Building2 } from "lucide-react";
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

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BankAccount {
  id: string;
  last4: string;
  type: "mastercard" | "visa";
  bankName?: string;
}

const mockAccounts: BankAccount[] = [
  { id: "1", last4: "1244", type: "mastercard", bankName: "Chase Bank" },
  { id: "2", last4: "1255", type: "mastercard", bankName: "Bank of America" },
];

type Step = "form" | "confirm" | "success";

export const WithdrawModal = ({ open, onOpenChange }: WithdrawModalProps) => {
  const [step, setStep] = useState<Step>("form");
  const [selectedAccount, setSelectedAccount] = useState(mockAccounts[0]?.id || "");
  const [amount, setAmount] = useState("");
  const [addBankAccountOpen, setAddBankAccountOpen] = useState(false);
  const availableBalance = 5000;

  const selectedAccountData = mockAccounts.find(a => a.id === selectedAccount);

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setStep("form");
      setAmount("");
    }, 200);
  };

  const handleProceedToConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (parseFloat(amount) > availableBalance) {
      toast.error("Insufficient balance");
      return;
    }
    setStep("confirm");
  };

  const handleConfirmWithdrawal = () => {
    setStep("success");
  };

  const renderFormStep = () => (
    <>
      <DialogHeader className="space-y-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <ArrowUpRight className="w-6 h-6 text-primary" />
        </div>
        <div>
          <DialogTitle className="text-xl font-semibold text-gray-900">Withdraw from Fragma</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Securely withdraw your funds from Fragma using your preferred payment method.
          </p>
        </div>
      </DialogHeader>

      <div className="space-y-5 mt-4">
        {/* Balance Display */}
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-lg font-semibold text-gray-900">US ${availableBalance.toLocaleString()}.00 Available</p>
        </div>

        {/* Bank Account Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-gray-700 font-medium">Bank Account</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-transparent p-0 h-auto"
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
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={account.id} id={account.id} />
                  <span className="text-gray-900">••••{account.last4}</span>
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
          <Label className="text-gray-700 font-medium">Amount Withdraw</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white border-gray-200 pl-7 pr-14 text-gray-900"
              step="0.01"
              min="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">USD</span>
          </div>
          <p className="text-sm text-primary">Available ${availableBalance.toLocaleString()}</p>
        </div>

        {/* Notice */}
        <p className="text-xs text-gray-400 text-center">
          Notice: Funds can only be withdrawn back to the bank account used to deposit
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleProceedToConfirm}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );

  const renderConfirmStep = () => (
    <>
      <DialogHeader className="space-y-4">
        <button 
          onClick={() => setStep("form")}
          className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <DialogTitle className="text-xl font-semibold text-gray-900">Confirm Withdrawal</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Please review your withdrawal details before confirming
          </p>
        </div>
      </DialogHeader>

      <div className="space-y-5 mt-6">
        {/* Amount Summary */}
        <div className="text-center py-6 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Withdrawal Amount</p>
          <p className="text-4xl font-bold text-gray-900">${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-400 mt-1">USD</p>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Destination</span>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <div className="w-4 h-4 rounded-full bg-orange-400"></div>
              </div>
              <span className="text-gray-900 font-medium">••••{selectedAccountData?.last4}</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Bank</span>
            <span className="text-gray-900 font-medium">{selectedAccountData?.bankName || "Bank Account"}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Processing Time</span>
            <span className="text-gray-900 font-medium">1-3 Business Days</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-500">Fee</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={() => setStep("form")}
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleConfirmWithdrawal}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Confirm Withdrawal
          </Button>
        </div>
      </div>
    </>
  );

  const renderSuccessStep = () => (
    <>
      <div className="text-center py-8">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Withdrawal Confirmed!</h2>
        <p className="text-gray-500 mb-8">
          Your withdrawal request has been submitted and is being processed
        </p>

        {/* Amount */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Amount</p>
          <p className="text-3xl font-bold text-gray-900">${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>

        {/* Status Card */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-amber-800">Processing</p>
              <p className="text-sm text-amber-600">Expected arrival: 1-3 business days</p>
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center justify-center gap-3 text-gray-600 mb-8">
          <Building2 className="w-5 h-5" />
          <span>To: {selectedAccountData?.bankName || "Bank Account"} ••••{selectedAccountData?.last4}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            type="button"
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleClose}
          >
            View Transfer History
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="theme-dashboard sm:max-w-md bg-white border-gray-200 text-gray-900">
        {step === "form" && renderFormStep()}
        {step === "confirm" && renderConfirmStep()}
        {step === "success" && renderSuccessStep()}
      </DialogContent>
      <AddBankAccountModal open={addBankAccountOpen} onOpenChange={setAddBankAccountOpen} />
    </Dialog>
  );
};
