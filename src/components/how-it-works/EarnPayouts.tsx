import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  TrendingUp, 
  Calendar, 
  Film, 
  Building, 
  BarChart3,
  ArrowRight,
  Wallet,
  FileText,
  Clock,
  Download,
  Zap
} from "lucide-react";

const earnTypes = [
  { icon: Calendar, label: "Regular yield", desc: "Monthly / Quarterly", color: "from-green-500 to-emerald-500" },
  { icon: Film, label: "Revenue share", desc: "Film, rent, fees", color: "from-purple-500 to-pink-500" },
  { icon: Building, label: "Profit participation", desc: "Sales & refinancing", color: "from-blue-500 to-cyan-500" },
  { icon: TrendingUp, label: "Capital gains", desc: "Sell higher", color: "from-orange-500 to-amber-500" },
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
  const [activeFlow, setActiveFlow] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  const flowSteps = [
    { icon: Building, label: "Asset earns" },
    { icon: Zap, label: "Auto-calculated" },
    { icon: Wallet, label: "You receive" },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />
      
      {/* Floating coins animation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          💰
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Automated Earnings</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Earn when the asset{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                performs
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
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
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group cursor-pointer"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${type.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}
                />
                <div className="relative p-5 bg-card/80 border border-border/50 rounded-2xl hover:border-primary/30 transition-colors text-center">
                  <motion.div
                    className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <type.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="font-semibold text-sm mb-1">{type.label}</h3>
                  <p className="text-xs text-muted-foreground">{type.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Automated flow visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">
              How payouts work
            </h3>
            
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {flowSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 md:gap-8">
                  <motion.div
                    className={`relative flex flex-col items-center`}
                    animate={activeFlow >= index ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Glow */}
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-2xl blur-xl"
                      animate={{ opacity: activeFlow === index ? 0.4 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all ${
                      activeFlow >= index 
                        ? "bg-gradient-to-br from-primary to-accent" 
                        : "bg-card border border-border/50"
                    }`}>
                      <step.icon className={`w-8 h-8 md:w-10 md:h-10 ${activeFlow >= index ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <span className={`mt-3 text-xs md:text-sm font-medium ${activeFlow >= index ? "text-primary" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </motion.div>
                  
                  {index < flowSteps.length - 1 && (
                    <motion.div
                      className="flex-shrink-0"
                      animate={{ 
                        opacity: activeFlow > index ? 1 : 0.3,
                        x: activeFlow > index ? [0, 5, 0] : 0 
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <ArrowRight className={`w-6 h-6 ${activeFlow > index ? "text-primary" : "text-muted-foreground/30"}`} />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payout dashboard preview - Dashboard style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white border border-[hsl(220,30%,90%)] rounded-2xl overflow-hidden shadow-xl shadow-[hsl(220,40%,20%)]/10">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-[hsl(220,30%,92%)]">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-[hsl(220,50%,20%)]" />
                  <span className="font-semibold text-[hsl(220,50%,15%)] text-lg">Payout Dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-[hsl(220,50%,20%)] cursor-pointer hover:text-[hsl(220,50%,10%)] transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export</span>
                </div>
              </div>

              {/* Payout rows */}
              <div className="p-4 space-y-3">
                {payoutHistory.filter(p => p.status === "paid").map((payout, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-[hsl(220,30%,97%)] rounded-xl hover:bg-[hsl(220,30%,95%)] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[hsl(140,70%,45%)] shadow-[0_0_8px_hsl(140,70%,45%)]" />
                      <span className="text-[hsl(220,50%,15%)] font-medium">{payout.date}</span>
                    </div>
                    <span className="font-bold text-[hsl(160,70%,35%)] text-lg">
                      {payout.amount}
                    </span>
                  </motion.div>
                ))}

                {/* Upcoming payout - special styling */}
                {payoutHistory.filter(p => p.status === "upcoming").map((payout, index) => (
                  <motion.div
                    key={`upcoming-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 1 }}
                    className="flex items-center justify-between p-4 bg-[hsl(160,40%,95%)] border border-[hsl(160,50%,70%)]/50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[hsl(160,60%,35%)]" />
                      <span className="text-[hsl(220,50%,15%)] font-medium">{payout.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[hsl(160,70%,35%)] text-lg">
                        {payout.amount}
                      </span>
                      <span className="text-xs px-3 py-1.5 rounded-full bg-[hsl(160,50%,85%)] text-[hsl(160,60%,30%)] font-medium border border-[hsl(160,50%,70%)]/50">
                        Upcoming
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary footer */}
              <div className="mx-4 mb-4 pt-4 border-t border-[hsl(220,30%,90%)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[hsl(220,40%,40%)]" />
                  <span className="text-sm text-[hsl(220,40%,35%)]">Tax summaries available</span>
                </div>
                <span className="text-lg font-bold text-[hsl(160,70%,35%)]">+€245 earned</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
