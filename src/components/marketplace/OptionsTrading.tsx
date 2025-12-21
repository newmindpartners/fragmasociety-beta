import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, TrendingUp, ArrowDownRight, Zap, ChevronRight, Coins, BarChart3 } from "lucide-react";
import luxuryImage from "@/assets/rwa-luxury.jpg";
import commercialImage from "@/assets/rwa-commercial.jpg";

type OptionType = "call" | "put" | "covered" | "sell-put";

interface OptionData {
  title: string;
  description: string;
  benefit: string;
  icon: typeof Shield;
  example: {
    asset: string;
    strike: string;
    premium: string;
    potential: string;
  };
}

const optionsData: Record<OptionType, OptionData> = {
  call: {
    title: "Call Options",
    description: "Lock in the right to buy an asset at a fixed price. Perfect when you expect prices to rise.",
    benefit: "Unlimited upside with limited downside",
    icon: TrendingUp,
    example: {
      asset: "Malibu Estate",
      strike: "$2.5M",
      premium: "$50K",
      potential: "+$500K"
    }
  },
  put: {
    title: "Put Options",
    description: "Secure the right to sell at a guaranteed price. Ideal for protecting your existing holdings.",
    benefit: "Insurance against market downturns",
    icon: Shield,
    example: {
      asset: "LA Portfolio",
      strike: "$1.8M",
      premium: "$35K",
      potential: "Protected"
    }
  },
  covered: {
    title: "Covered Calls",
    description: "Earn premium income on assets you already own. Generate yield while waiting for appreciation.",
    benefit: "Additional income on existing holdings",
    icon: Coins,
    example: {
      asset: "Beverly Hills",
      strike: "$3.2M",
      premium: "$75K",
      potential: "+7.5% Yield"
    }
  },
  "sell-put": {
    title: "Sell Put",
    description: "Get paid to potentially buy an asset at a lower price you already want.",
    benefit: "Earn premium while waiting to buy",
    icon: BarChart3,
    example: {
      asset: "Pacific Palisades",
      strike: "$2.1M",
      premium: "$45K",
      potential: "+4.2% Yield"
    }
  }
};

export const OptionsTrading = () => {
  const [activeOption, setActiveOption] = useState<OptionType>("call");
  const currentOption = optionsData[activeOption];

  const getPayoffPath = () => {
    switch (activeOption) {
      case "call": return "M 20 80 L 100 80 L 180 20";
      case "put": return "M 20 20 L 100 80 L 180 80";
      case "covered": return "M 20 80 L 100 80 L 100 40 L 180 40";
      case "sell-put": return "M 20 80 L 80 80 L 100 40 L 180 40";
    }
  };

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Dark Background with Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 right-20 w-32 h-32 rounded-2xl overflow-hidden opacity-20"
      >
        <img src={luxuryImage} alt="" className="w-full h-full object-cover" />
      </motion.div>
      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-40 h-40 rounded-2xl overflow-hidden opacity-20"
      >
        <img src={commercialImage} alt="" className="w-full h-full object-cover" />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-white/5 text-white border border-white/20">
            Options Trading
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Advanced Strategies for
            <span className="block text-gradient">Sophisticated Investors</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hedge your positions, generate income, or leverage your conviction with institutional-grade options.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Option Type Selector */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 mb-8">
              {(Object.keys(optionsData) as OptionType[]).map((type) => {
                const option = optionsData[type];
                const isActive = activeOption === type;
                
                return (
                  <motion.button
                    key={type}
                    onClick={() => setActiveOption(type)}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-6 rounded-2xl border text-left transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 border-primary shadow-glow' 
                        : 'bg-white/5 border-border/30 hover:border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-primary' : 'bg-white/10'
                        }`}>
                          <option.icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-foreground'}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{option.title}</h3>
                          <p className="text-sm text-muted-foreground">{option.benefit}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'rotate-90 text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {["No Margin Calls", "Defined Risk", "Premium Income", "Leverage"].map((feature, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-border/30 text-sm text-muted-foreground"
                >
                  <Zap className="w-3 h-3 inline mr-2 text-primary" />
                  {feature}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Option Detail Card */}
          <motion.div
            key={activeOption}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl" />
              
              <div className="relative bg-card rounded-2xl border border-border overflow-hidden">
                {/* Header */}
                <div className="p-8 border-b border-border/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                      <currentOption.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{currentOption.title}</h3>
                      <p className="text-primary font-medium">{currentOption.benefit}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{currentOption.description}</p>
                </div>

                {/* Example Trade */}
                <div className="p-8 bg-background/50">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">Example Trade</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-white/5 rounded-xl border border-border/30">
                      <p className="text-sm text-muted-foreground mb-1">Asset</p>
                      <p className="text-lg font-bold text-foreground">{currentOption.example.asset}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-border/30">
                      <p className="text-sm text-muted-foreground mb-1">Strike Price</p>
                      <p className="text-lg font-bold text-foreground">{currentOption.example.strike}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-border/30">
                      <p className="text-sm text-muted-foreground mb-1">Premium</p>
                      <p className="text-lg font-bold text-foreground">{currentOption.example.premium}</p>
                    </div>
                    <div className="p-4 bg-primary/20 rounded-xl border border-primary/30">
                      <p className="text-sm text-primary mb-1">Potential</p>
                      <p className="text-lg font-bold text-primary">{currentOption.example.potential}</p>
                    </div>
                  </div>
                </div>

                {/* Payoff Visualization */}
                <div className="p-8 border-t border-border/50">
                  <div className="relative h-32">
                    <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                      {/* Grid */}
                      <line x1="20" y1="80" x2="180" y2="80" stroke="currentColor" strokeOpacity="0.1" />
                      <line x1="100" y1="20" x2="100" y2="80" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4" />
                      
                      {/* Payoff Line */}
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                        d={getPayoffPath()}
                        fill="none"
                        stroke="url(#payoffGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      
                      <defs>
                        <linearGradient id="payoffGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="hsl(var(--primary))" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Labels */}
                    <div className="absolute bottom-0 left-4 text-xs text-muted-foreground">Loss</div>
                    <div className="absolute bottom-0 right-4 text-xs text-muted-foreground">Profit</div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">Strike</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
