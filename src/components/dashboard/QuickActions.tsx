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
      className="bg-white rounded-xl border border-slate-200/80 p-5"
    >
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 + index * 0.05 }}
            >
              <Link
                to={action.href}
                className="group flex flex-col p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mb-2 group-hover:bg-slate-200/70 transition-colors">
                  <Icon className="w-4 h-4 text-slate-600" strokeWidth={1.75} />
                </div>
                <p className="font-medium text-sm text-slate-900">{action.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{action.description}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
