import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowDown, ArrowUp, Target, Clock, Eye, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const tradingAssets = [
  { name: "Malibu Villa", symbol: "MLB-VLA" },
  { name: "Tech Campus", symbol: "TCH-CMP" },
  { name: "Credit Fund", symbol: "CRD-FND" },
];

const AnimatedOrderBook = () => {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  const currentAsset = tradingAssets[currentAssetIndex];

  const [bids] = useState([
    { price: 1245.50, size: 21628, total: 2.21 },
    { price: 892.25, size: 47056, total: 4.65 },
    { price: 456.80, size: 29241, total: 2.99 },
    { price: 187.35, size: 46023, total: 4.55 },
  ]);

  const [asks] = useState([
    { price: 1248.75, size: 16207, total: 1.72 },
    { price: 895.50, size: 49376, total: 4.97 },
    { price: 459.20, size: 29524, total: 2.92 },
    { price: 189.85, size: 41270, total: 4.05 },
  ]);

  const [lastPrice, setLastPrice] = useState(1247.06);
  const [change24h] = useState(2.39);
  const [showMatch, setShowMatch] = useState(false);

  useEffect(() => {
    const assetInterval = setInterval(() => {
      setCurrentAssetIndex(prev => (prev + 1) % tradingAssets.length);
    }, 5000);
    return () => clearInterval(assetInterval);
  }, []);

  useEffect(() => {
    const priceInterval = setInterval(() => {
      setLastPrice(prev => +(prev + (Math.random() - 0.5) * 0.5).toFixed(2));
    }, 2000);
    
    const matchInterval = setInterval(() => {
      setShowMatch(true);
      setTimeout(() => setShowMatch(false), 1000);
    }, 6000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(matchInterval);
    };
  }, []);

  return (
    <motion.div 
      className="relative bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Background glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.03, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-violet-500/10 rounded-2xl blur-[60px] -z-10"
      />

      {/* Match Flash */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex items-center gap-3 px-8 py-4 bg-violet-500/20 border border-violet-500/40 rounded-full"
            >
              <CheckCircle2 className="w-5 h-5 text-violet-400" />
              <span className="font-medium text-white tracking-wide">Trade Matched</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 border border-white/20 rounded-lg flex items-center justify-center">
              <span className="text-sm font-medium text-white/70">
                {currentAsset.symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentAsset.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-light text-white tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {currentAsset.name}
                </motion.h3>
              </AnimatePresence>
              <span className="text-xs font-mono tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>{currentAsset.symbol}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-violet-400"
            />
            <span className="text-xs text-violet-400 font-medium tracking-wider">Live</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 p-5 bg-white/[0.02] border-b border-white/10">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Last Price</p>
          <motion.p 
            key={lastPrice} 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-lg font-light text-white"
          >
            €{lastPrice.toFixed(2)}
          </motion.p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>24h Change</p>
          <p className="text-lg font-light text-emerald-400">+{change24h}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Spread</p>
          <p className="text-lg font-light" style={{ color: 'rgba(255,255,255,0.7)' }}>0.26%</p>
        </div>
      </div>

      {/* Order Book */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Bids */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-[9px] uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-1">
              {bids.map((bid, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="grid grid-cols-3 gap-2 p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-lg relative overflow-hidden group hover:bg-emerald-500/10 transition-colors duration-300"
                >
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-emerald-500/10"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(bid.total / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  />
                  <span className="text-sm font-medium text-emerald-400 relative z-10">€{bid.price.toFixed(2)}</span>
                  <span className="text-sm text-center relative z-10" style={{ color: 'rgba(255,255,255,0.6)' }}>{bid.size.toLocaleString()}</span>
                  <span className="text-sm text-right relative z-10" style={{ color: 'rgba(255,255,255,0.4)' }}>€{bid.total}M</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-[9px] uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-1">
              {asks.map((ask, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="grid grid-cols-3 gap-2 p-2.5 bg-red-500/5 border border-red-500/10 rounded-lg relative overflow-hidden group hover:bg-red-500/10 transition-colors duration-300"
                >
                  <motion.div 
                    className="absolute right-0 top-0 bottom-0 bg-red-500/10"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(ask.total / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  />
                  <span className="text-sm font-medium text-red-400 relative z-10">€{ask.price.toFixed(2)}</span>
                  <span className="text-sm text-center relative z-10" style={{ color: 'rgba(255,255,255,0.6)' }}>{ask.size.toLocaleString()}</span>
                  <span className="text-sm text-right relative z-10" style={{ color: 'rgba(255,255,255,0.4)' }}>€{ask.total}M</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const OrderBookExplainer = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const benefits = [
    { icon: Target, title: "Choose your price", description: "No forced market rates", number: "01" },
    { icon: ArrowDown, title: "Buy below market", description: "Set limit orders and wait", number: "02" },
    { icon: ArrowUp, title: "Sell above market", description: "List at your target price", number: "03" },
    { icon: Clock, title: "Patient trading", description: "Wait for better offers", number: "04" },
    { icon: Eye, title: "Full transparency", description: "See all orders live", number: "05" },
  ];

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Deep slate/navy background - matching SignatureDealsBanner */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Violet glow accents */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-violet-900/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-slate-700/20 rounded-full blur-3xl" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(148,130,180,0.06) 0%, transparent 70%)'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
              How It Works
            </span>
            <div className="w-12 h-px" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight mb-6"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #ffffff 0%, #c4b5d4 40%, #9a8cb0 60%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Professional trading,
            <br />
            <span 
              className="italic"
              style={{ color: 'rgba(255,255,255,0.5)', WebkitTextFillColor: 'unset' }}
            >
              simplified.
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            A traditional exchange uses an order book. We bring this same professional tool to real-world assets.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Order Book */}
          <AnimatedOrderBook />

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => {
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group cursor-pointer"
                >
                  <motion.div
                    className={`relative flex items-center gap-5 p-5 overflow-hidden rounded-xl transition-all duration-500 ${
                      isHovered 
                        ? 'bg-white/[0.06] border border-violet-500/30' 
                        : 'bg-white/[0.03] border border-white/10'
                    }`}
                    animate={{ 
                      y: isHovered ? -4 : 0,
                      scale: isHovered ? 1.01 : 1
                    }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {/* Decorative number */}
                    <span 
                      className="absolute top-2 right-4 text-4xl font-extralight font-serif"
                      style={{ color: 'rgba(255,255,255,0.03)' }}
                    >
                      {benefit.number}
                    </span>

                    {/* Icon container */}
                    <motion.div 
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                        isHovered 
                          ? 'border-violet-500/40 bg-violet-500/20 border' 
                          : 'border-white/20 bg-white/5 border'
                      }`}
                      animate={{ 
                        rotate: isHovered ? 3 : 0,
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <benefit.icon 
                        className={`w-5 h-5 transition-colors duration-400 ${isHovered ? 'text-violet-400' : 'text-white/60'}`}
                        strokeWidth={1.5} 
                      />
                    </motion.div>
                    
                    <div className="relative z-10">
                      <h3 
                        className={`font-medium mb-0.5 tracking-wide transition-colors duration-400 ${isHovered ? 'text-white' : 'text-white/90'}`}
                      >
                        {benefit.title}
                      </h3>
                      <p 
                        className="text-sm transition-colors duration-400"
                        style={{ color: isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)' }}
                      >
                        {benefit.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500/60 via-violet-400/40 to-transparent"
                      initial={{ width: 0 }}
                      animate={{ width: isHovered ? '100%' : 0 }}
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 p-5 bg-violet-500/10 border-l-2 border-violet-500 rounded-r-lg"
            >
              <p className="leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <span className="text-white font-medium">This isn't a "platform price."</span>{" "}
                It's a real marketplace where you set the terms.
              </p>
            </motion.div>
          </div>
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
