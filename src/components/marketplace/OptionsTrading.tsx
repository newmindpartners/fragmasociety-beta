import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, TrendingUp, Zap, ChevronRight, Coins, BarChart3 } from "lucide-react";

type OptionType = "call" | "put" | "covered" | "sell-put";

const optionsData: Record<OptionType, {
  title: string;
  description: string;
  benefit: string;
  icon: typeof Shield;
  example: { asset: string; strike: string; premium: string; potential: string };
}> = {
  call: {
    title: "Call Options",
    description: "Lock in the right to buy an asset at a fixed price. Perfect when you expect prices to rise.",
    benefit: "Unlimited upside with limited downside",
    icon: TrendingUp,
    example: { asset: "Malibu Estate", strike: "$2.5M", premium: "$50K", potential: "+$500K" }
  },
  put: {
    title: "Put Options",
    description: "Secure the right to sell at a guaranteed price. Ideal for protecting your existing holdings.",
    benefit: "Insurance against market downturns",
    icon: Shield,
    example: { asset: "LA Portfolio", strike: "$1.8M", premium: "$35K", potential: "Protected" }
  },
  covered: {
    title: "Covered Calls",
    description: "Earn premium income on assets you already own. Generate yield while waiting for appreciation.",
    benefit: "Additional income on existing holdings",
    icon: Coins,
    example: { asset: "Beverly Hills", strike: "$3.2M", premium: "$75K", potential: "+7.5% Yield" }
  },
  "sell-put": {
    title: "Sell Put",
    description: "Get paid to potentially buy an asset at a lower price you already want.",
    benefit: "Earn premium while waiting to buy",
    icon: BarChart3,
    example: { asset: "Pacific Palisades", strike: "$2.1M", premium: "$45K", potential: "+4.2% Yield" }
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
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-xs font-semibold tracking-widest uppercase rounded-full bg-secondary/80 text-foreground border border-border/50">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Options Trading
          </span>
          
          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-[1.1]">
            Advanced Strategies for
            <br />
            <span className="text-gradient italic">Sophisticated Investors.</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hedge your positions, generate income, or leverage your conviction with institutional-grade options.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Option Selector */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 mb-8">
              {(Object.keys(optionsData) as OptionType[]).map((type) => {
                const option = optionsData[type];
                const isActive = activeOption === type;
                const Icon = option.icon;
                
                return (
                  <motion.button
                    key={type}
                    onClick={() => setActiveOption(type)}
                    whileHover={{ x: 8 }}
                    className={`w-full p-6 rounded-2xl border text-left transition-all duration-300 ${
                      isActive 
                        ? 'bg-card/80 border-primary/50' 
                        : 'bg-card/40 border-border/40 hover:border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? 'bg-primary' : 'bg-primary/10'
                        }`}>
                          <Icon className={`w-6 h-6 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
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

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              {["No Margin Calls", "Defined Risk", "Premium Income", "Leverage"].map((feature, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground"
                >
                  <Zap className="w-3 h-3 inline mr-2 text-primary" />
                  {feature}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Option Detail */}
          <motion.div
            key={activeOption}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
              
              <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
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

                {/* Example */}
                <div className="p-8 bg-secondary/20">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">Example Trade</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(currentOption.example).map(([key, value]) => (
                      <div 
                        key={key} 
                        className={`p-4 rounded-xl border ${key === 'potential' ? 'bg-primary/10 border-primary/30' : 'bg-card/50 border-border/30'}`}
                      >
                        <p className={`text-sm mb-1 capitalize ${key === 'potential' ? 'text-primary' : 'text-muted-foreground'}`}>
                          {key.replace('_', ' ')}
                        </p>
                        <p className={`text-lg font-bold ${key === 'potential' ? 'text-primary' : 'text-foreground'}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payoff Chart */}
                <div className="p-8 border-t border-border/50">
                  <div className="relative h-32">
                    <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                      <line x1="20" y1="80" x2="180" y2="80" stroke="currentColor" strokeOpacity="0.1" />
                      <line x1="100" y1="20" x2="100" y2="80" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4" />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
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
