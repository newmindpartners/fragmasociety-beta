import { useState } from "react";
import { Building2, Loader2 } from "lucide-react";
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
import { usePaymentMethods } from "@/hooks/usePaymentMethods";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    iban: "",
    swiftBic: "",
    currency: "",
    accountNumber: "",
    routingNumber: "",
  });
  const { addPaymentMethod } = usePaymentMethods();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.accountHolderName || !formData.iban || !formData.currency) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Extract last 4 digits from IBAN
    const cleanedIban = formData.iban.replace(/\s/g, "");
    const last4 = cleanedIban.slice(-4);
    
    setIsSubmitting(true);
    try {
      await addPaymentMethod({
        type: "bank_account",
        card_brand: null,
        last4: last4,
        bank_name: formData.bankName || null,
        account_holder_name: formData.accountHolderName,
        is_default: false,
      });
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
    } catch (err: any) {
      console.error("Error adding bank account:", err);
      toast.error("Failed to add bank account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatIBAN = (value: string) => {
    const cleaned = value.replace(/\s/g, "").toUpperCase();
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted;
  };

  const handleClose = () => {
    if (!isSubmitting) {
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="theme-dashboard sm:max-w-lg bg-white border-gray-200 text-gray-900 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="space-y-3 flex-shrink-0">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <DialogTitle className="text-lg font-semibold text-gray-900">Add Bank Account</DialogTitle>
            <p className="text-sm text-gray-500 mt-0.5">
              Add your bank account details for deposits and withdrawals
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 -mr-1">
          {/* Account Holder Name */}
          <div className="space-y-1.5">
            <Label htmlFor="accountHolderName" className="text-gray-700 font-medium text-sm">
              Account Holder Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="accountHolderName"
              placeholder="Enter full name as on bank account"
              value={formData.accountHolderName}
              onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 h-10"
              disabled={isSubmitting}
            />
          </div>

          {/* Bank Name */}
          <div className="space-y-1.5">
            <Label htmlFor="bankName" className="text-gray-700 font-medium text-sm">Bank Name</Label>
            <Input
              id="bankName"
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 h-10"
              disabled={isSubmitting}
            />
          </div>

          {/* Currency */}
          <div className="space-y-1.5">
            <Label className="text-gray-700 font-medium text-sm">
              Currency <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.currency} 
              onValueChange={(value) => setFormData({ ...formData, currency: value })}
              disabled={isSubmitting}
            >
              <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900 h-10">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 z-[100]">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code} className="text-gray-900 cursor-pointer">
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* IBAN */}
          <div className="space-y-1.5">
            <Label htmlFor="iban" className="text-gray-700 font-medium text-sm">
              IBAN <span className="text-red-500">*</span>
            </Label>
            <Input
              id="iban"
              placeholder="e.g., DE89 3704 0044 0532 0130 00"
              value={formData.iban}
              onChange={(e) => setFormData({ ...formData, iban: formatIBAN(e.target.value) })}
              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 font-mono h-10"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-400">International Bank Account Number</p>
          </div>

          {/* SWIFT/BIC */}
          <div className="space-y-1.5">
            <Label htmlFor="swiftBic" className="text-gray-700 font-medium text-sm">SWIFT/BIC Code</Label>
            <Input
              id="swiftBic"
              placeholder="e.g., COBADEFFXXX"
              value={formData.swiftBic}
              onChange={(e) => setFormData({ ...formData, swiftBic: e.target.value.toUpperCase() })}
              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 font-mono uppercase h-10"
              maxLength={11}
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-400">8 or 11 character code identifying your bank</p>
          </div>

          {/* US-specific fields (optional) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="accountNumber" className="text-gray-700 font-medium text-sm">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="For US accounts"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, "") })}
                className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 h-10"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="routingNumber" className="text-gray-700 font-medium text-sm">Routing Number</Label>
              <Input
                id="routingNumber"
                placeholder="9 digits"
                value={formData.routingNumber}
                onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value.replace(/\D/g, "").slice(0, 9) })}
                className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 h-10"
                maxLength={9}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </form>

        {/* Action Buttons - Fixed at bottom */}
        <div className="flex gap-3 pt-4 border-t border-gray-100 mt-4 flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 h-11"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-11"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Bank Account"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};