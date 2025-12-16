import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Shield, Coins, BarChart3, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";

type OptionType = "covered-call" | "put" | "call" | "sell-put";

const optionsData: Record<OptionType, {
  title: string;
  description: string;
  benefit: string;
  icon: typeof TrendingUp;
  color: string;
  payoffDescription: string;
}> = {
  "covered-call": {
    title: "Covered Call",
    description: "Earn yield by letting other traders pay for the right to buy your asset later",
    benefit: "Generate income on assets you hold",
    icon: Coins,
    color: "primary",
    payoffDescription: "Collect premium, cap upside"
  },
  "put": {
    title: "Put Protection",
    description: "Protect yourself from price drops — like insurance for your portfolio",
    benefit: "Downside protection with limited cost",
    icon: Shield,
    color: "green-400",
    payoffDescription: "Pay premium, protect downside"
  },
  "call": {
    title: "Call Option",
    description: "Bet on price increases with limited risk — your max loss is the premium paid",
    benefit: "Leverage upside with defined risk",
    icon: TrendingUp,
    color: "accent",
    payoffDescription: "Pay premium, unlimited upside"
  },
  "sell-put": {
    title: "Sell Put",
    description: "Get paid to potentially buy an asset at a lower price",
    benefit: "Earn premium while waiting to buy",
    icon: BarChart3,
    color: "amber-400",
    payoffDescription: "Collect premium, obligated to buy"
  }
};

const PayoffChart = ({ type }: { type: OptionType }) => {
  const getPath = () => {
    switch (type) {
      case "covered-call":
        return "M 20 80 L 100 80 L 100 40 L 180 40";
      case "put":
        return "M 20 40 L 80 40 L 100 80 L 180 80";
      case "call":
        return "M 20 80 L 100 80 L 180 20";
      case "sell-put":
        return "M 20 80 L 80 80 L 100 40 L 180 40";
    }
  };

  return (
    <div className="relative h-32 w-full">
      <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        <line x1="20" y1="80" x2="180" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="100" y1="20" x2="100" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        
        {/* Payoff curve */}
        <motion.path
          d={getPath()}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Labels */}
        <text x="95" y="95" fill="rgba(255,255,255,0.5)" fontSize="8">Price</text>
        <text x="5" y="50" fill="rgba(255,255,255,0.5)" fontSize="8" transform="rotate(-90, 15, 50)">P/L</text>
      </svg>
    </div>
  );
};

export const OptionsTrading = () => {
  const [activeOption, setActiveOption] = useState<OptionType>("covered-call");
  const currentOption = optionsData[activeOption];
  const IconComponent = currentOption.icon;

  return (
    <section className="py-24 section-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-white/5 text-white border border-white/20">
              Options Trading
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Simple, safe,{" "}
              <span className="text-gradient">powerful.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Beginner-friendly options trading to help you earn extra yield, 
              protect your portfolio, or speculate with defined risk.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Option Selector */}
          <div className="space-y-4">
            {(Object.keys(optionsData) as OptionType[]).map((key, index) => {
              const option = optionsData[key];
              const isActive = activeOption === key;
              const Icon = option.icon;

              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveOption(key)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    isActive 
                      ? "bg-white/5 border-white/30 scale-[1.02]" 
                      : "bg-background/50 border-border/50 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isActive ? "bg-white/10" : "bg-muted"
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium mb-1 ${isActive ? "text-gradient" : "text-foreground"}`}>
                        {option.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{option.description}</p>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 text-background" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right - Detail View */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              key={activeOption}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">{currentOption.title}</h3>
                  <p className="text-sm text-muted-foreground">{currentOption.payoffDescription}</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{currentOption.description}</p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                <div className="flex items-center gap-2 text-white mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Key Benefit</span>
                </div>
                <p className="text-foreground">{currentOption.benefit}</p>
              </div>

              {/* Payoff Chart */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">Payoff Diagram</p>
                <div className="glass rounded-xl p-4">
                  <PayoffChart type={activeOption} />
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {["Transparent", "On-chain", "Easy to understand", "Fully collateralised"].map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex items-start gap-2 p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <Info className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                No complex DeFi mechanics — just clean, intuitive tools designed for everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
