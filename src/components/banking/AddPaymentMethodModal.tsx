import { useState } from "react";
import { CreditCard, ChevronDown, X } from "lucide-react";
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

interface AddPaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddPaymentMethodModal = ({ open, onOpenChange }: AddPaymentMethodModalProps) => {
  const [recommendationOpen, setRecommendationOpen] = useState(false);
  const [formData, setFormData] = useState({
    nameOnCard: "",
    expiry: "",
    cardNumber: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment method added successfully");
    onOpenChange(false);
    setFormData({ nameOnCard: "", expiry: "", cardNumber: "", cvv: "" });
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="theme-dashboard sm:max-w-md bg-white border-gray-200 text-gray-900">
        <DialogHeader className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <div>
            <DialogTitle className="text-xl font-semibold text-foreground">Add Payment Method</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">All info is kept highly secure</p>
          </div>
        </DialogHeader>

        {/* Recommendation Section */}
        <Collapsible open={recommendationOpen} onOpenChange={setRecommendationOpen}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 rounded-xl border border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
              <div>
                <p className="font-medium text-primary">See Our Recommendation</p>
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
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
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
              Confirm Payment Method
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
