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
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-slate-600" />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-500 font-medium">
              Options Trading
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-white leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Advanced Strategies for
            <br />
            <span className="italic text-slate-400">Sophisticated Investors.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-xl mt-6 leading-relaxed"
          >
            Hedge your positions, generate income, or leverage your conviction with institutional-grade options.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Option Selector */}
          <div className="space-y-4">
            {(Object.keys(optionsData) as OptionType[]).map((type) => {
              const option = optionsData[type];
              const isActive = activeOption === type;
              const Icon = option.icon;
              
              return (
                <motion.button
                  key={type}
                  onClick={() => setActiveOption(type)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`w-full p-6 border text-left transition-all duration-300 ${
                    isActive 
                      ? 'bg-slate-800 border-slate-600' 
                      : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 border flex items-center justify-center transition-all ${
                        isActive ? 'border-white bg-white' : 'border-slate-600 bg-slate-800'
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white">{option.title}</h3>
                        <p className="text-sm text-slate-400">{option.benefit}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'rotate-90 text-white' : 'text-slate-500'}`} />
                  </div>
                </motion.button>
              );
            })}

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mt-6">
              {["No Margin Calls", "Defined Risk", "Premium Income", "Leverage"].map((feature, i) => (
                <span key={i} className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-sm text-slate-400">
                  <Zap className="w-3 h-3 inline mr-2 text-slate-500" />
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Option Detail */}
          <motion.div
            key={activeOption}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-slate-800 border border-slate-700 overflow-hidden">
              {/* Header */}
              <div className="p-8 border-b border-slate-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white border border-slate-200 flex items-center justify-center">
                    <currentOption.icon className="w-7 h-7 text-slate-800" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{currentOption.title}</h3>
                    <p className="text-sm text-slate-400">{currentOption.benefit}</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{currentOption.description}</p>
              </div>

              {/* Example */}
              <div className="p-8 bg-slate-800/50">
                <h4 className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em] mb-6">Example Trade</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(currentOption.example).map(([key, value]) => (
                    <div 
                      key={key} 
                      className={`p-4 border ${key === 'potential' ? 'bg-emerald-900/20 border-emerald-700/50' : 'bg-slate-900/50 border-slate-700/50'}`}
                    >
                      <p className={`text-[10px] uppercase tracking-wider mb-1 ${key === 'potential' ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {key.replace('_', ' ')}
                      </p>
                      <p className={`text-lg font-medium ${key === 'potential' ? 'text-emerald-400' : 'text-white'}`}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payoff Chart */}
              <div className="p-8 border-t border-slate-700">
                <div className="relative h-28">
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <line x1="20" y1="80" x2="180" y2="80" stroke="rgba(100,116,139,0.3)" />
                    <line x1="100" y1="20" x2="100" y2="80" stroke="rgba(100,116,139,0.3)" strokeDasharray="4" />
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1 }}
                      d={getPayoffPath()}
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute bottom-0 left-4 text-xs text-slate-500">Loss</div>
                  <div className="absolute bottom-0 right-4 text-xs text-slate-500">Profit</div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-slate-500">Strike</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
