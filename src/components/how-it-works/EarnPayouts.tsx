import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  TrendingUp, 
  Calendar, 
  Film, 
  Building, 
  BarChart3,
  ArrowDown,
  Wallet,
  FileText,
  Clock,
  Download,
  DollarSign,
  Coins,
  Lock
} from "lucide-react";

const earnTypes = [
  { icon: Calendar, label: "Regular yield", desc: "Monthly / Quarterly" },
  { icon: Film, label: "Revenue share", desc: "Film, rent, fees" },
  { icon: Building, label: "Profit participation", desc: "Sales & refinancing" },
  { icon: TrendingUp, label: "Capital gains", desc: "Sell higher" },
];

const payoutHistory = [
  { date: "Dec 2024", amount: "+€85", status: "paid" },
  { date: "Nov 2024", amount: "+€82", status: "paid" },
  { date: "Oct 2024", amount: "+€78", status: "paid" },
  { date: "Jan 2025", amount: "~€88", status: "upcoming" },
];

export const EarnPayouts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedStorage, setSelectedStorage] = useState<'wallet' | 'vault'>('vault');

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-[hsl(220,30%,96%)]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(220,40%,20%)]">
              Earn when the asset{" "}
              <span className="text-primary">
                performs
              </span>
            </h2>
            <p className="text-lg text-[hsl(220,20%,50%)]">
              Payouts flow directly to you. Automatically.
            </p>
          </motion.div>

          {/* Earn types grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {earnTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-5 bg-white rounded-2xl border border-[hsl(220,20%,90%)] shadow-sm text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary flex items-center justify-center mb-3">
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1 text-[hsl(220,40%,20%)]">{type.label}</h3>
                <p className="text-xs text-[hsl(220,20%,50%)]">{type.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Investment flow dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-md mx-auto space-y-4"
          >
            {/* You invest card */}
            <div className="p-5 bg-white rounded-2xl border border-[hsl(220,20%,90%)] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[hsl(220,20%,50%)]">You invest</p>
                  <p className="text-2xl font-bold text-[hsl(220,40%,20%)]">$1,000</p>
                </div>
              </div>
            </div>

            {/* Arrow down */}
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-[hsl(220,20%,92%)] flex items-center justify-center">
                <ArrowDown className="w-5 h-5 text-[hsl(220,20%,50%)]" />
              </div>
            </div>

            {/* You receive card */}
            <div className="p-5 bg-white rounded-2xl border border-primary/30 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Coins className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[hsl(220,20%,50%)]">You receive</p>
                  <p className="text-2xl font-bold text-primary">100 Tokens</p>
                  <p className="text-sm text-[hsl(220,20%,50%)]">= Your ownership share</p>
                </div>
              </div>
            </div>

            {/* Storage options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedStorage('wallet')}
                className={`p-4 rounded-2xl border transition-all ${
                  selectedStorage === 'wallet'
                    ? 'bg-white border-primary shadow-sm'
                    : 'bg-white border-[hsl(220,20%,90%)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedStorage === 'wallet' ? 'bg-primary' : 'bg-[hsl(220,20%,92%)]'
                  }`}>
                    <Wallet className={`w-5 h-5 ${selectedStorage === 'wallet' ? 'text-white' : 'text-[hsl(220,20%,50%)]'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-[hsl(220,40%,20%)]">Your Wallet</p>
                    <p className="text-xs text-[hsl(220,20%,50%)]">Direct control</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedStorage('vault')}
                className={`p-4 rounded-2xl border transition-all relative ${
                  selectedStorage === 'vault'
                    ? 'bg-white border-primary shadow-sm'
                    : 'bg-white border-[hsl(220,20%,90%)]'
                }`}
              >
                {selectedStorage === 'vault' && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />
                )}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedStorage === 'vault' ? 'bg-primary' : 'bg-[hsl(220,20%,92%)]'
                  }`}>
                    <Lock className={`w-5 h-5 ${selectedStorage === 'vault' ? 'text-white' : 'text-[hsl(220,20%,50%)]'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-[hsl(220,40%,20%)]">Smart Vault</p>
                    <p className="text-xs text-[hsl(220,20%,50%)]">Automated & secure</p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Payout history */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <div className="p-6 bg-white rounded-3xl border border-[hsl(220,20%,90%)] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-[hsl(220,40%,20%)]">Payout Dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[hsl(220,20%,50%)]">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </div>
              </div>

              <div className="space-y-3">
                {payoutHistory.map((payout, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      payout.status === "upcoming" 
                        ? "bg-primary/5 border border-primary/20" 
                        : "bg-[hsl(220,30%,97%)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {payout.status === "upcoming" ? (
                        <Clock className="w-5 h-5 text-primary" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                      )}
                      <span className="text-[hsl(220,20%,50%)]">{payout.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${payout.status === "upcoming" ? "text-primary" : "text-green-500"}`}>
                        {payout.amount}
                      </span>
                      {payout.status === "upcoming" && (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary row */}
              <div className="mt-6 pt-6 border-t border-[hsl(220,20%,90%)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[hsl(220,20%,50%)]" />
                  <span className="text-sm text-[hsl(220,20%,50%)]">Tax summaries available</span>
                </div>
                <span className="text-lg font-bold text-green-500">+€245 earned</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
