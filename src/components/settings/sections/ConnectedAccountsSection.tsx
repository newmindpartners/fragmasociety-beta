import { motion } from "framer-motion";
import { Building2, Wallet, Plus, CheckCircle2, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ConnectedAccount {
  id: string;
  type: "bank" | "wallet";
  name: string;
  identifier: string;
  isDefault: boolean;
  connected: boolean;
}

const accounts: ConnectedAccount[] = [
  { id: "1", type: "bank", name: "Credit Suisse", identifier: "•••• 4523", isDefault: true, connected: true },
  { id: "2", type: "bank", name: "UBS", identifier: "•••• 8901", isDefault: false, connected: true },
  { id: "3", type: "wallet", name: "MetaMask", identifier: "0x1234...5678", isDefault: false, connected: true },
];

export const ConnectedAccountsSection = () => {
  return (
    <div className="space-y-6">
      {/* Bank Accounts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-900">Bank Accounts</h4>
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Plus className="w-3.5 h-3.5" />
            Add Account
          </Button>
        </div>
        <div className="space-y-2">
          {accounts.filter(a => a.type === "bank").map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900">{account.name}</p>
                    {account.isDefault && (
                      <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100 text-[10px]">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{account.identifier}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Crypto Wallets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-900">Crypto Wallets</h4>
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Plus className="w-3.5 h-3.5" />
            Connect Wallet
          </Button>
        </div>
        <div className="space-y-2">
          {accounts.filter(a => a.type === "wallet").map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{account.name}</p>
                  <p className="text-xs text-slate-500 font-mono">{account.identifier}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-slate-500 hover:text-slate-700">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
