import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Target, Clock, Eye, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

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
      className="relative bg-[#0a1628]/80 border border-slate-700/30 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Match Flash */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a1628]/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex items-center gap-3 px-8 py-4 bg-emerald-500/10 border border-emerald-500/30"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-medium text-emerald-400 tracking-wide">Trade Matched</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-6 border-b border-slate-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800/60 border border-slate-600/30 flex items-center justify-center">
              <span className="text-sm font-medium text-slate-400">
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
              <span className="text-xs font-mono text-slate-500 tracking-wider">{currentAsset.symbol}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
            <span className="text-xs text-emerald-400 font-medium tracking-wider">Live</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 p-5 bg-slate-800/20 border-b border-slate-700/30">
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-1">Last Price</p>
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
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-1">24h Change</p>
          <p className="text-lg font-light text-emerald-400">+{change24h}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-1">Spread</p>
          <p className="text-lg font-light text-slate-300">0.26%</p>
        </div>
      </div>

      {/* Order Book */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Bids */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-[9px] text-slate-500 uppercase tracking-[0.15em]">
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
                  className="grid grid-cols-3 gap-2 p-2.5 bg-emerald-500/5 border border-emerald-500/10 relative overflow-hidden group hover:bg-emerald-500/10 transition-colors duration-300"
                >
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-emerald-500/10"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(bid.total / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  />
                  <span className="text-sm font-medium text-emerald-400 relative z-10">€{bid.price.toFixed(2)}</span>
                  <span className="text-sm text-center text-slate-400 relative z-10">{bid.size.toLocaleString()}</span>
                  <span className="text-sm text-right text-slate-500 relative z-10">€{bid.total}M</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-[9px] text-slate-500 uppercase tracking-[0.15em]">
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
                  className="grid grid-cols-3 gap-2 p-2.5 bg-rose-500/5 border border-rose-500/10 relative overflow-hidden group hover:bg-rose-500/10 transition-colors duration-300"
                >
                  <motion.div 
                    className="absolute right-0 top-0 bottom-0 bg-rose-500/10"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(ask.total / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  />
                  <span className="text-sm font-medium text-rose-400 relative z-10">€{ask.price.toFixed(2)}</span>
                  <span className="text-sm text-center text-slate-400 relative z-10">{ask.size.toLocaleString()}</span>
                  <span className="text-sm text-right text-slate-500 relative z-10">€{ask.total}M</span>
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
  const benefits = [
    { icon: Target, title: "Choose your price", description: "No forced market rates" },
    { icon: ArrowDown, title: "Buy below market", description: "Set limit orders and wait" },
    { icon: ArrowUp, title: "Sell above market", description: "List at your target price" },
    { icon: Clock, title: "Patient trading", description: "Wait for better offers" },
    { icon: Eye, title: "Full transparency", description: "See all orders live" },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#0c1829]">
      {/* Premium dark gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1525] via-[#0c1829] to-[#0e1a2e]" />
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-violet-600/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-slate-600/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-gradient-to-r from-slate-500 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-500 font-medium">
              How It Works
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Professional trading,
            <br />
            <motion.span 
              className="italic text-slate-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              simplified.
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            A traditional exchange uses an order book. We bring this same professional tool to real-world assets.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Order Book */}
          <AnimatedOrderBook />

          {/* Benefits */}
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
                className="group flex items-center gap-5 p-5 bg-slate-800/20 border border-slate-700/20 hover:bg-slate-800/40 hover:border-slate-600/30 transition-all duration-400 cursor-pointer"
              >
                <div className="w-12 h-12 border border-slate-600/30 bg-slate-800/40 flex items-center justify-center flex-shrink-0 group-hover:border-slate-500/40 group-hover:bg-slate-700/40 transition-all duration-300">
                  <benefit.icon className="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-0.5 tracking-wide">{benefit.title}</h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-300">{benefit.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 p-5 bg-slate-800/10 border-l-2 border-slate-600/50"
            >
              <p className="text-slate-400 leading-relaxed text-sm">
                <span className="text-white font-medium">This isn't a "platform price."</span>{" "}
                It's a real marketplace where you set the terms.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
