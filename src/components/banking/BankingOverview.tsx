import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CreditCard, ArrowUpRight, ArrowDownLeft, History, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WithdrawModal } from "./WithdrawModal";
import { DepositModal } from "./DepositModal";

interface BankingAction {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  action?: "link" | "button" | "withdraw" | "deposit";
  href?: string;
  buttonLabel?: string;
}

const bankingActions: BankingAction[] = [
  {
    id: "payment-methods",
    icon: CreditCard,
    title: "Payment Methods",
    subtitle: "Add or view payment methods",
    action: "button",
    buttonLabel: "+ Add Payment Methods",
    href: "/dashboard/banking/payment-methods",
  },
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
    subtitle: "$0/$25,000 daily limit",
    action: "link",
    href: "/dashboard/banking/transfer-history",
  },
];

export const BankingOverview = () => {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);

  const handleActionClick = (action: BankingAction) => {
    if (action.action === "withdraw") {
      setWithdrawOpen(true);
    } else if (action.action === "deposit") {
      setDepositOpen(true);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-serif font-semibold text-foreground mb-8">Banking</h1>

      <div className="space-y-4">
        {bankingActions.map((action, index) => {
          const Icon = action.icon;
          const isLink = action.action === "link" || action.action === "button";
          const Wrapper = isLink && action.href ? Link : "div";
          const wrapperProps = isLink && action.href ? { to: action.href } : {};

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Wrapper
                {...(wrapperProps as any)}
                className="block"
                onClick={() => !isLink && handleActionClick(action)}
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

                    {action.action === "button" ? (
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Payment Methods
                      </Button>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    )}
                  </div>
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </div>

      <WithdrawModal open={withdrawOpen} onOpenChange={setWithdrawOpen} />
      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
    </div>
  );
};
