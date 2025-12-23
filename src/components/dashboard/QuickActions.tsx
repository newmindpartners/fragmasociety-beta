import { motion } from "framer-motion";
import { PiggyBank, FileText, Send, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: PiggyBank,
    label: "Deposit",
    description: "Add funds",
    href: "/dashboard/banking",
  },
  {
    icon: FileText,
    label: "Documents",
    description: "View files",
    href: "/dashboard/documents",
  },
  {
    icon: Send,
    label: "Refer",
    description: "Earn $10K",
    href: "/dashboard",
  },
  {
    icon: CreditCard,
    label: "Wallet",
    description: "Manage",
    href: "/dashboard/wallet",
  },
];

export const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 + index * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="h-full"
            >
              <Link
                to={action.href}
                className="group flex h-full min-h-[124px] flex-col rounded-xl border border-border/70 bg-card p-4 shadow-sm transition-all duration-200 hover:border-primary/30 hover:bg-accent/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/10 transition-colors group-hover:bg-primary/15">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-base font-medium leading-tight text-foreground">
                    {action.label}
                  </p>
                  <p className="text-sm leading-tight text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

