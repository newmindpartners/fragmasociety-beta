import { useState } from "react";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AddBankAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "CHF", name: "Swiss Franc" },
];

export const AddBankAccountModal = ({ open, onOpenChange }: AddBankAccountModalProps) => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    iban: "",
    swiftBic: "",
    currency: "",
    accountNumber: "",
    routingNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.accountHolderName || !formData.iban || !formData.currency) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Bank account added successfully");
    onOpenChange(false);
    setFormData({
      accountHolderName: "",
      bankName: "",
      iban: "",
      swiftBic: "",
      currency: "",
      accountNumber: "",
      routingNumber: "",
    });
  };

  const formatIBAN = (value: string) => {
    const cleaned = value.replace(/\s/g, "").toUpperCase();
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="theme-dashboard sm:max-w-lg bg-white border-gray-200 text-gray-900">
        <DialogHeader className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <DialogTitle className="text-xl font-semibold text-foreground">Add Bank Account</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Add your bank account details for deposits and withdrawals
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Account Holder Name */}
          <div className="space-y-2">
            <Label htmlFor="accountHolderName" className="text-foreground font-medium">
              Account Holder Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="accountHolderName"
              placeholder="Enter full name as on bank account"
              value={formData.accountHolderName}
              onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
              className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Bank Name */}
          <div className="space-y-2">
            <Label htmlFor="bankName" className="text-foreground font-medium">Bank Name</Label>
            <Input
              id="bankName"
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              Currency <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
              <SelectTrigger className="bg-white border-gray-200 text-gray-900">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 z-50">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code} className="text-gray-900">
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* IBAN */}
          <div className="space-y-2">
            <Label htmlFor="iban" className="text-foreground font-medium">
              IBAN <span className="text-red-500">*</span>
            </Label>
            <Input
              id="iban"
              placeholder="e.g., DE89 3704 0044 0532 0130 00"
              value={formData.iban}
              onChange={(e) => setFormData({ ...formData, iban: formatIBAN(e.target.value) })}
              className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 font-mono"
            />
            <p className="text-xs text-muted-foreground">International Bank Account Number</p>
          </div>

          {/* SWIFT/BIC */}
          <div className="space-y-2">
            <Label htmlFor="swiftBic" className="text-foreground font-medium">SWIFT/BIC Code</Label>
            <Input
              id="swiftBic"
              placeholder="e.g., COBADEFFXXX"
              value={formData.swiftBic}
              onChange={(e) => setFormData({ ...formData, swiftBic: e.target.value.toUpperCase() })}
              className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 font-mono uppercase"
              maxLength={11}
            />
            <p className="text-xs text-muted-foreground">8 or 11 character code identifying your bank</p>
          </div>

          {/* US-specific fields (optional) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-foreground font-medium">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="For US accounts"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, "") })}
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="routingNumber" className="text-foreground font-medium">Routing Number</Label>
              <Input
                id="routingNumber"
                placeholder="9 digits"
                value={formData.routingNumber}
                onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value.replace(/\D/g, "").slice(0, 9) })}
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                maxLength={9}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Bank Account
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
