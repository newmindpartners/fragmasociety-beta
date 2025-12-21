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
    <section className="py-32 relative overflow-hidden">
      {/* Deep slate/navy background - matching SignatureDealsBanner */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Violet glow accents */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-violet-900/15 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-slate-700/20 rounded-full blur-3xl" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(148,130,180,0.08) 0%, transparent 70%)'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Options Trading
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #ffffff 0%, #c4b5d4 40%, #9a8cb0 60%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Advanced Strategies for
            <br />
            <span className="italic" style={{ color: 'rgba(255,255,255,0.5)', WebkitTextFillColor: 'unset' }}>Sophisticated Investors.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-xl mt-6 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}
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
                      ? 'bg-white/5 border-white/20' 
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 border flex items-center justify-center transition-all ${
                        isActive ? 'border-white bg-white' : 'border-white/20 bg-white/5'
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-white/60'}`} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white">{option.title}</h3>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{option.benefit}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'rotate-90 text-white' : 'text-white/40'}`} />
                  </div>
                </motion.button>
              );
            })}

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mt-6">
              {["No Margin Calls", "Defined Risk", "Premium Income", "Leverage"].map((feature, i) => (
                <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <Zap className="w-3 h-3 inline mr-2" style={{ color: 'rgba(255,255,255,0.4)' }} />
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
            <div className="bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm">
              {/* Header */}
              <div className="p-8 border-b border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white border border-white/20 flex items-center justify-center">
                    <currentOption.icon className="w-7 h-7 text-slate-900" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{currentOption.title}</h3>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{currentOption.benefit}</p>
                  </div>
                </div>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{currentOption.description}</p>
              </div>

              {/* Example */}
              <div className="p-8 bg-white/[0.02]">
                <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Example Trade</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(currentOption.example).map(([key, value]) => (
                    <div 
                      key={key} 
                      className={`p-4 border ${key === 'potential' ? 'bg-emerald-900/20 border-emerald-700/50' : 'bg-white/[0.02] border-white/10'}`}
                    >
                      <p className={`text-[10px] uppercase tracking-wider mb-1 ${key === 'potential' ? 'text-emerald-400' : ''}`} style={{ color: key !== 'potential' ? 'rgba(255,255,255,0.4)' : undefined }}>
                        {key.replace('_', ' ')}
                      </p>
                      <p className={`text-lg font-medium ${key === 'potential' ? 'text-emerald-400' : 'text-white'}`}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payoff Chart */}
              <div className="p-8 border-t border-white/10">
                <div className="relative h-28">
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <line x1="20" y1="80" x2="180" y2="80" stroke="rgba(255,255,255,0.15)" />
                    <line x1="100" y1="20" x2="100" y2="80" stroke="rgba(255,255,255,0.15)" strokeDasharray="4" />
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
                  <div className="absolute bottom-0 left-4 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Loss</div>
                  <div className="absolute bottom-0 right-4 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Profit</div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Strike</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)'
        }}
      />
    </section>
  );
};
