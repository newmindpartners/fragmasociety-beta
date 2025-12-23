import { motion } from "framer-motion";
import { PiggyBank, FileText, Send, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: PiggyBank,
    label: "Deposit",
    description: "Add funds",
    href: "/dashboard/banking",
    bg: "bg-slate-900",
    iconColor: "text-white",
  },
  {
    icon: FileText,
    label: "Documents",
    description: "View files",
    href: "/dashboard/documents",
    bg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  {
    icon: Send,
    label: "Refer",
    description: "Earn €10K",
    href: "/dashboard",
    bg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: CreditCard,
    label: "Wallet",
    description: "Manage",
    href: "/dashboard/wallet",
    bg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

export const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl border border-slate-200/60 p-5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
    >
      <h3 className="text-base font-semibold text-slate-900 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-2.5">
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
                className="group flex flex-col p-3.5 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200"
              >
                <div className={`w-9 h-9 rounded-lg ${action.bg} flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className={`w-4 h-4 ${action.iconColor}`} strokeWidth={1.75} />
                </div>
                <p className="font-medium text-sm text-slate-800">{action.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{action.description}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
