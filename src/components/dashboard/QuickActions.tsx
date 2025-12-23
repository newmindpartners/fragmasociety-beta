import { motion } from "framer-motion";
import { PiggyBank, FileText, Send, CreditCard, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: PiggyBank,
    label: "Deposit Funds",
    description: "Add money to your account",
    href: "/dashboard/banking",
    gradient: "from-primary to-primary/80",
  },
  {
    icon: FileText,
    label: "View Documents",
    description: "Access your agreements",
    href: "/dashboard/documents",
    gradient: "from-slate-700 to-slate-600",
  },
  {
    icon: Send,
    label: "Refer a Friend",
    description: "Earn €10,000 reward",
    href: "/dashboard",
    gradient: "from-emerald-600 to-emerald-500",
  },
  {
    icon: CreditCard,
    label: "Manage Wallet",
    description: "Connect & manage wallets",
    href: "/dashboard/wallet",
    gradient: "from-accent to-accent/80",
  },
];

export const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-slate-900 font-sans mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <Link
                to={action.href}
                className="group flex flex-col p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <p className="font-medium text-sm text-slate-900 group-hover:text-primary transition-colors">{action.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{action.description}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
