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

  // Empty state - no mock data, show real user payment methods only
  const mockPaymentMethods: typeof paymentMethods = [];

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

  // Separate cards and bank accounts
  const cards = displayMethods.filter(m => m.type === "card");
  const bankAccounts = displayMethods.filter(m => m.type === "bank" || m.type === "bank_account");

  const renderPaymentMethod = (method: typeof displayMethods[0], index: number) => (
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
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-medium text-foreground">
              {method.type === "card" ? (method.card_brand || "Card") : (method.bank_name || "Bank Account")}
            </span>
            {method.is_default && (
              <Badge variant="secondary" className="bg-slate-200 text-slate-700 border-0 text-xs">
                Default
              </Badge>
            )}
          </div>
          {method.account_holder_name && (
            <span className="text-sm text-muted-foreground">{method.account_holder_name}</span>
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
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-700 mb-6">
        <Link to="/dashboard/banking" className="hover:underline">
          Banking
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">Payment Methods</span>
      </div>

      <h1 className="text-3xl font-serif font-semibold text-foreground mb-2">Payment Methods</h1>
      <p className="text-muted-foreground mb-8">All info is kept highly secure</p>

      {loading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : (
        <>
          {/* Cards Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Cards
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              {cards.length > 0 ? (
                cards.map((method, index) => renderPaymentMethod(method, index))
              ) : (
                <p className="text-muted-foreground text-sm">No cards added yet</p>
              )}
            </div>
          </div>

          {/* Bank Accounts Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Bank Accounts
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              {bankAccounts.length > 0 ? (
                bankAccounts.map((method, index) => renderPaymentMethod(method, index))
              ) : (
                <p className="text-muted-foreground text-sm">No bank accounts added yet</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Add Payment Method Button */}
      <Button
        variant="ghost"
        className="text-slate-700 hover:text-slate-900 hover:bg-transparent p-0 h-auto font-medium"
        onClick={() => setSelectorOpen(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Payment Methods
      </Button>

      {/* Current Balance Card */}
      <div className="bg-card border border-border rounded-2xl p-6 mt-8">
        <h3 className="font-semibold text-foreground mb-2">Your Current Balance</h3>
        <p className="text-slate-700 text-lg">US$0.00 Available</p>
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
