import { useState } from "react";
import { ArrowDownLeft, Plus } from "lucide-react";
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

export const DepositModal = ({ open, onOpenChange }: DepositModalProps) => {
  const [selectedAccount, setSelectedAccount] = useState(mockAccounts[0]?.id || "");
  const [amount, setAmount] = useState("");
  const currentBalance = 5000;
  const dailyLimit = 25000;

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
    toast.success(`Deposit of $${amount} initiated`);
    onOpenChange(false);
    setAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="theme-dashboard sm:max-w-md bg-white border-gray-200 text-gray-900">
        <DialogHeader className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <ArrowDownLeft className="w-6 h-6 text-primary" />
          </div>
          <div>
            <DialogTitle className="text-xl font-semibold text-foreground">Deposit to Fragma</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Securely deposit your funds to Fragma using your preferred payment method
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Balance Display */}
          <div className="p-4 rounded-xl border border-primary border-dashed bg-primary/5">
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
                className="text-primary hover:text-primary/80 hover:bg-transparent p-0 h-auto"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Card
              </Button>
            </div>

            <RadioGroup value={selectedAccount} onValueChange={setSelectedAccount} className="space-y-2">
              {mockAccounts.map((account) => (
                <label
                  key={account.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedAccount === account.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
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
            <p className="text-sm text-muted-foreground">Day Limit: <span className="text-primary font-medium">${dailyLimit.toLocaleString()}</span></p>
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
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Confirm Deposit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
