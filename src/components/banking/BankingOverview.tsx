import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CreditCard, ArrowUpRight, ArrowDownLeft, History, Plus, ArrowRight, Bell, MoreHorizontal, Trash2, Star, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WithdrawModal } from "./WithdrawModal";
import { DepositModal } from "./DepositModal";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { AddPaymentMethodModal } from "./AddPaymentMethodModal";
import { AddBankAccountModal } from "./AddBankAccountModal";
import { NotificationSettingsModal } from "./NotificationSettingsModal";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BankingAction {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  action?: "link" | "button" | "withdraw" | "deposit" | "notifications";
  href?: string;
}

const bankingActions: BankingAction[] = [
  {
    id: "withdraw",
    icon: ArrowUpRight,
    title: "Withdraw Funds",
    subtitle: "US $0.00",
    action: "withdraw",
  },
  {
    id: "deposit",
    icon: ArrowDownLeft,
    title: "Deposit Funds",
    subtitle: "$0/$25,000 daily limit",
    action: "deposit",
  },
  {
    id: "transfer-history",
    icon: History,
    title: "Transfer History",
    subtitle: "View all transactions",
    action: "link",
    href: "/dashboard/banking/transfer-history",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Transfer Notifications",
    subtitle: "Manage notification preferences",
    action: "notifications",
  },
];

export const BankingOverview = () => {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [addBankOpen, setAddBankOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showAllMethods, setShowAllMethods] = useState(false);
  const navigate = useNavigate();
  
  const { paymentMethods, loading: methodsLoading, setAsDefault, deletePaymentMethod } = usePaymentMethods();
  
  const defaultMethod = paymentMethods.find(m => m.is_default);
  const otherMethods = paymentMethods.filter(m => !m.is_default);

  const handleCardClick = (action: BankingAction) => {
    if (action.action === "withdraw") {
      setWithdrawOpen(true);
    } else if (action.action === "deposit") {
      setDepositOpen(true);
    } else if (action.action === "notifications") {
      setNotificationsOpen(true);
    } else if (action.href) {
      navigate(action.href);
    }
  };

  const handleDeletePaymentMethod = async (id: string) => {
    try {
      await deletePaymentMethod(id);
      toast.success("Payment method removed");
    } catch (err) {
      toast.error("Failed to remove payment method");
    }
  };

  const getCardIcon = (brand: string | null) => {
    if (brand === "mastercard") {
      return (
        <div className="flex -space-x-2">
          <div className="w-5 h-5 rounded-full bg-red-600"></div>
          <div className="w-5 h-5 rounded-full bg-orange-400"></div>
        </div>
      );
    }
    if (brand === "visa") {
      return <span className="text-white font-bold text-xs">VISA</span>;
    }
    return <CreditCard className="w-5 h-5 text-white" />;
  };

  return (
    <div>
      <h1 className="text-3xl font-serif font-semibold text-foreground mb-8">Banking</h1>

      <div className="space-y-4">
        {/* Payment Methods Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Payment Methods</h3>
                  <p className="text-sm text-muted-foreground">
                    {paymentMethods.length > 0 
                      ? `${paymentMethods.length} method${paymentMethods.length > 1 ? 's' : ''} connected`
                      : "Add or view payment methods"
                    }
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4"
                onClick={() => setSelectorOpen(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Payment Methods
              </Button>
            </div>

            {/* Preferred/Default Payment Method */}
            {defaultMethod && (
              <div className="mt-4 p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-10 rounded-lg flex items-center justify-center ${
                      defaultMethod.type === "card" 
                        ? "bg-gradient-to-br from-red-500 to-orange-400" 
                        : "bg-gradient-to-br from-blue-500 to-blue-600"
                    }`}>
                      {defaultMethod.type === "card" ? getCardIcon(defaultMethod.card_brand) : (
                        <span className="text-white font-bold text-[10px]">BANK</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                          Preferred
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-medium text-foreground">
                          {defaultMethod.type === "card" 
                            ? (defaultMethod.card_brand?.charAt(0).toUpperCase() + defaultMethod.card_brand?.slice(1))
                            : defaultMethod.bank_name || "Bank Account"
                          }
                        </span>
                        <span className="text-muted-foreground">•••• {defaultMethod.last4}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 text-primary hover:bg-primary/10 rounded-full px-4"
                    onClick={() => navigate("/dashboard/banking/payment-methods")}
                  >
                    <Pencil className="w-3.5 h-3.5 mr-1.5" />
                    Update
                  </Button>
                </div>
              </div>
            )}

            {/* Other Payment Methods (Collapsible) */}
            {otherMethods.length > 0 && (
              <div className="mt-3">
                <button
                  onClick={() => setShowAllMethods(!showAllMethods)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center py-2"
                >
                  {showAllMethods ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide other methods
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show {otherMethods.length} other method{otherMethods.length > 1 ? 's' : ''}
                    </>
                  )}
                </button>
                
                {showAllMethods && (
                  <div className="space-y-2 mt-2">
                    {otherMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-8 rounded-md flex items-center justify-center ${
                            method.type === "card" 
                              ? "bg-gradient-to-br from-red-500 to-orange-400" 
                              : "bg-gradient-to-br from-blue-500 to-blue-600"
                          }`}>
                            {method.type === "card" ? getCardIcon(method.card_brand) : (
                              <span className="text-white font-bold text-[10px]">BANK</span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground text-sm">
                                {method.type === "card" 
                                  ? (method.card_brand?.charAt(0).toUpperCase() + method.card_brand?.slice(1))
                                  : method.bank_name || "Bank Account"
                                }
                              </span>
                              <span className="text-muted-foreground text-sm">•••• {method.last4}</span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setAsDefault(method.id)}>
                              <Star className="w-4 h-4 mr-2" />
                              Set as Default
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDeletePaymentMethod(method.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Other Banking Actions */}
        {bankingActions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
            >
              <div
                className="block cursor-pointer"
                onClick={() => handleCardClick(action)}
              >
                <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.subtitle}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <WithdrawModal open={withdrawOpen} onOpenChange={setWithdrawOpen} />
      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
      <PaymentMethodSelector 
        open={selectorOpen} 
        onOpenChange={setSelectorOpen}
        onSelectCard={() => setAddCardOpen(true)}
        onSelectBankAccount={() => setAddBankOpen(true)}
      />
      <AddPaymentMethodModal open={addCardOpen} onOpenChange={setAddCardOpen} />
      <AddBankAccountModal open={addBankOpen} onOpenChange={setAddBankOpen} />
      <NotificationSettingsModal open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </div>
  );
};
