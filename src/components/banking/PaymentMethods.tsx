import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, MoreHorizontal, CreditCard, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { AddPaymentMethodModal } from "./AddPaymentMethodModal";
import { AddBankAccountModal } from "./AddBankAccountModal";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PaymentMethods = () => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [addBankOpen, setAddBankOpen] = useState(false);
  
  const { paymentMethods, loading, setAsDefault, deletePaymentMethod } = usePaymentMethods();

  // Mock data for display when no real data exists
  const mockPaymentMethods = [
    { id: "mock-1", type: "card" as const, card_brand: "mastercard", last4: "1244", is_default: true, bank_name: null, account_holder_name: null },
    { id: "mock-2", type: "card" as const, card_brand: "visa", last4: "4532", is_default: false, bank_name: null, account_holder_name: null },
    { id: "mock-3", type: "bank" as const, card_brand: null, last4: "7890", is_default: false, bank_name: "Chase Bank", account_holder_name: "John Doe" },
  ];

  const displayMethods = paymentMethods.length > 0 ? paymentMethods : mockPaymentMethods;

  const handleSetDefault = async (id: string) => {
    if (id.startsWith("mock-")) {
      toast.info("This is mock data - sign in to manage real payment methods");
      return;
    }
    await setAsDefault(id);
    toast.success("Default payment method updated");
  };

  const handleRemove = async (id: string) => {
    if (id.startsWith("mock-")) {
      toast.info("This is mock data - sign in to manage real payment methods");
      return;
    }
    await deletePaymentMethod(id);
    toast.success("Payment method removed");
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-primary mb-6">
        <Link to="/dashboard/banking" className="hover:underline">
          Banking
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">Payment Methods</span>
      </div>

      <h1 className="text-3xl font-serif font-semibold text-foreground mb-2">Payment Methods</h1>
      <p className="text-muted-foreground mb-8">All info is kept highly secure</p>

      {/* Payment Methods List */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : (
          displayMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-4">
                {method.type === "card" ? (
                  <div className={`w-14 h-10 rounded-lg flex items-center justify-center ${
                    method.card_brand === "mastercard" 
                      ? "bg-gradient-to-br from-red-500 to-orange-400" 
                      : method.card_brand === "visa"
                        ? "bg-gradient-to-br from-blue-600 to-blue-400"
                        : "bg-gradient-to-br from-gray-600 to-gray-400"
                  }`}>
                    {method.card_brand === "mastercard" && (
                      <div className="flex -space-x-2">
                        <div className="w-5 h-5 rounded-full bg-red-600"></div>
                        <div className="w-5 h-5 rounded-full bg-orange-400"></div>
                      </div>
                    )}
                    {method.card_brand === "visa" && (
                      <span className="text-white font-bold text-xs">VISA</span>
                    )}
                    {!method.card_brand && <CreditCard className="w-5 h-5 text-white" />}
                  </div>
                ) : (
                  <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground capitalize">
                    {method.type === "card" ? method.card_brand || "Card" : method.bank_name || "Bank Account"}
                  </span>
                  {method.is_default && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                      Default
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">**** {method.last4}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-muted/50">
                      <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!method.is_default && (
                      <DropdownMenuItem onClick={() => handleSetDefault(method.id)}>
                        Set as Default
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => handleRemove(method.id)}
                    >
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Payment Method Button */}
      <Button
        variant="ghost"
        className="text-primary hover:text-primary/80 hover:bg-transparent p-0 h-auto font-medium"
        onClick={() => setSelectorOpen(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Payment Methods
      </Button>

      {/* Current Balance Card */}
      <div className="bg-card border border-border rounded-2xl p-6 mt-8">
        <h3 className="font-semibold text-foreground mb-2">Your Current Balance</h3>
        <p className="text-primary text-lg">US$0.00 Available</p>
      </div>

      <PaymentMethodSelector 
        open={selectorOpen} 
        onOpenChange={setSelectorOpen}
        onSelectCard={() => setAddCardOpen(true)}
        onSelectBankAccount={() => setAddBankOpen(true)}
      />
      <AddPaymentMethodModal open={addCardOpen} onOpenChange={setAddCardOpen} />
      <AddBankAccountModal open={addBankOpen} onOpenChange={setAddBankOpen} />
    </div>
  );
};
