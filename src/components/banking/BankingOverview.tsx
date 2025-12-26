import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CreditCard, ArrowUpRight, ArrowDownLeft, History, Plus, ArrowRight, Bell, MoreHorizontal, Trash2, Star, Pencil, ChevronDown, ChevronUp, Headphones, Building2 } from "lucide-react";
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
import { InfoTooltip } from "@/components/ui/info-tooltip";
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          {/* Payment Methods Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
130:                   <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
131:                     <CreditCard className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
132:                   </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">Payment Methods</h3>
                      <InfoTooltip 
                        content="Add and manage your payment methods for deposits and withdrawals. Your preferred method will be used by default."
                        side="right"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {paymentMethods.length > 0 
                        ? `${paymentMethods.length} method${paymentMethods.length > 1 ? 's' : ''} connected`
                        : "Add or view payment methods"
                      }
                    </p>
                  </div>
                </div>
                <Button
                  variant="navy"
                  size="sm"
                  className="rounded-full px-4"
                  onClick={() => setSelectorOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Payment Methods
                </Button>
              </div>

              {/* Preferred/Default Payment Method */}
              {defaultMethod && (
                <div className="mt-4 p-4 rounded-xl border-2 border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-10 rounded-lg flex items-center justify-center ${
                        defaultMethod.type === "card" 
                          ? "bg-gradient-to-br from-red-500 to-orange-400" 
                          : "bg-gradient-to-br from-blue-500 to-blue-600"
                      }`}>
                        {defaultMethod.type === "card" ? getCardIcon(defaultMethod.card_brand) : (
                          <Building2 className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-slate-200 text-slate-700 border-0 text-xs">
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
                      variant="navy-outline"
                      size="sm"
                      className="rounded-full px-4"
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
                                <Building2 className="w-4 h-4 text-white" />
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
                  <div className="bg-card border border-border rounded-2xl p-5 hover:border-slate-400 hover:shadow-sm transition-all cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.subtitle}</p>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-slate-700 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column - 1/3 width - Support Section */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center min-h-[300px]">
              {/* Avatar Stack */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 border-2 border-white dark:border-gray-800 flex items-center justify-center overflow-hidden">
                    <span className="text-lg">👨🏾</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white dark:border-gray-800 flex items-center justify-center overflow-hidden">
                    <span className="text-lg">👨🏻</span>
                  </div>
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-orange-200 to-red-300 border-2 border-white dark:border-gray-800 flex items-center justify-center overflow-hidden">
                    <span className="text-lg">👨🏼</span>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Need help?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                Our Support team is here to assist you.
              </p>

              {/* Support Button */}
              <Button
                variant="outline"
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full px-6 shadow-sm"
                onClick={() => window.open("mailto:support@fragma.com", "_blank")}
              >
                <Headphones className="w-4 h-4 mr-2" />
                Support
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
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
