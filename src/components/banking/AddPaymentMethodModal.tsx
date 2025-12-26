import { useState } from "react";
import { CreditCard, ChevronDown, Loader2 } from "lucide-react";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";

interface AddPaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddPaymentMethodModal = ({ open, onOpenChange }: AddPaymentMethodModalProps) => {
  const [recommendationOpen, setRecommendationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nameOnCard: "",
    expiry: "",
    cardNumber: "",
    cvv: "",
  });
  const { addPaymentMethod } = usePaymentMethods();

  const detectCardBrand = (number: string): "mastercard" | "visa" | "amex" | "discover" => {
    const cleaned = number.replace(/\s/g, "");
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    if (/^6(?:011|5)/.test(cleaned)) return "discover";
    return "visa";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nameOnCard || !formData.cardNumber || !formData.expiry || !formData.cvv) {
      toast.error("Please fill in all fields");
      return;
    }

    const cleanedNumber = formData.cardNumber.replace(/\s/g, "");
    if (cleanedNumber.length < 15) {
      toast.error("Please enter a valid card number");
      return;
    }

    setIsSubmitting(true);
    try {
      await addPaymentMethod({
        type: "card",
        card_brand: detectCardBrand(formData.cardNumber),
        last4: cleanedNumber.slice(-4),
        bank_name: null,
        account_holder_name: formData.nameOnCard,
        is_default: false,
      });
      toast.success("Payment method added successfully");
      onOpenChange(false);
      setFormData({ nameOnCard: "", expiry: "", cardNumber: "", cvv: "" });
    } catch (err: any) {
      console.error("Error adding payment method:", err);
      toast.error("Failed to add payment method. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      setFormData({ nameOnCard: "", expiry: "", cardNumber: "", cvv: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="theme-dashboard sm:max-w-md bg-white border-gray-200 text-gray-900">
        <DialogHeader className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-slate-700" />
          </div>
          <div>
            <DialogTitle className="text-xl font-semibold text-foreground">Add Payment Method</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">All info is kept highly secure</p>
          </div>
        </DialogHeader>

        {/* Recommendation Section */}
        <Collapsible open={recommendationOpen} onOpenChange={setRecommendationOpen}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-300 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-medium text-slate-700">See Our Recommendation</p>
                <p className="text-sm text-muted-foreground">
                  Check our suggested payment method to find the best option for you.
                </p>
              </div>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${recommendationOpen ? "rotate-180" : ""}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="p-4 rounded-xl bg-muted/30 text-sm text-muted-foreground">
              We recommend using a debit or credit card for faster processing and lower fees.
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Card Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nameOnCard" className="text-foreground font-medium">Name on card</Label>
              <Input
                id="nameOnCard"
                placeholder="Enter Name on card"
                value={formData.nameOnCard}
                onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                className="bg-background border-border"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-foreground font-medium">Expiry</Label>
              <Input
                id="expiry"
                placeholder="XX/XX"
                maxLength={5}
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: formatExpiry(e.target.value) })}
                className="bg-background border-border"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-foreground font-medium">Card number</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex -space-x-1">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                </div>
                <Input
                  id="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={19}
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                  className="bg-background border-border pl-12"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-foreground font-medium">CVV</Label>
              <Input
                id="cvv"
                placeholder="CVV"
                maxLength={4}
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/[^0-9]/g, "") })}
                className="bg-background border-border"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="navy"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                "Confirm Payment Method"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};