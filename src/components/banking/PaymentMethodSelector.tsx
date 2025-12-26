import { CreditCard, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentMethodSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCard: () => void;
  onSelectBankAccount: () => void;
}

export const PaymentMethodSelector = ({ 
  open, 
  onOpenChange, 
  onSelectCard, 
  onSelectBankAccount 
}: PaymentMethodSelectorProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="theme-dashboard sm:max-w-md bg-white border-gray-200 text-gray-900">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-gray-900">Add Payment Method</DialogTitle>
          <p className="text-sm text-gray-500">
            Choose how you'd like to receive or send funds
          </p>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {/* Card Option */}
          <button
            onClick={() => {
              onOpenChange(false);
              onSelectCard();
            }}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:border-slate-400 hover:bg-slate-100 transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:border-slate-400 transition-colors">
              <CreditCard className="w-6 h-6 text-gray-600 group-hover:text-slate-700 transition-colors" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-slate-900 transition-colors">Credit or Debit Card</h3>
              <p className="text-sm text-gray-500">Add Visa, Mastercard, or other cards</p>
            </div>
          </button>

          {/* Bank Account Option */}
          <button
            onClick={() => {
              onOpenChange(false);
              onSelectBankAccount();
            }}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:border-slate-400 hover:bg-slate-100 transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:border-slate-400 transition-colors">
              <Building2 className="w-6 h-6 text-gray-600 group-hover:text-slate-700 transition-colors" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-slate-900 transition-colors">Bank Account</h3>
              <p className="text-sm text-gray-500">Add IBAN, SWIFT for wire transfers</p>
            </div>
          </button>
        </div>

        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
