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
      className="bg-slate-900 border border-slate-700/50 overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Match Flash */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-3 px-6 py-4 bg-emerald-900/50 border border-emerald-700/50"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span className="font-medium text-emerald-400">Trade Matched!</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 border border-slate-700 flex items-center justify-center">
              <span className="text-sm font-medium text-slate-300">
                {currentAsset.symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentAsset.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-lg font-medium text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {currentAsset.name}
                </motion.h3>
              </AnimatePresence>
              <span className="text-xs font-mono text-slate-500">{currentAsset.symbol}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-500"
            />
            <span className="text-xs text-emerald-500 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-slate-800/50 border-b border-slate-700/50">
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Last Price</p>
          <motion.p key={lastPrice} className="text-xl font-medium text-white">€{lastPrice.toFixed(2)}</motion.p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">24h Change</p>
          <p className="text-xl font-medium text-emerald-400">+{change24h}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Spread</p>
          <p className="text-xl font-medium text-slate-300">0.26%</p>
        </div>
      </div>

      {/* Order Book */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Bids */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-[10px] text-slate-500 uppercase tracking-wider">
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-1">
              {bids.map((bid, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-3 gap-2 p-3 bg-emerald-900/20 border border-emerald-900/30 relative overflow-hidden"
                >
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-emerald-500/10"
                    style={{ width: `${(bid.total / 5) * 100}%` }}
                  />
                  <span className="font-medium text-emerald-400 relative z-10">€{bid.price.toFixed(2)}</span>
                  <span className="text-center text-slate-300 relative z-10">{bid.size.toLocaleString()}</span>
                  <span className="text-right text-slate-500 relative z-10">€{bid.total}M</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-[10px] text-slate-500 uppercase tracking-wider">
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-1">
              {asks.map((ask, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-3 gap-2 p-3 bg-rose-900/20 border border-rose-900/30 relative overflow-hidden"
                >
                  <div 
                    className="absolute right-0 top-0 bottom-0 bg-rose-500/10"
                    style={{ width: `${(ask.total / 5) * 100}%` }}
                  />
                  <span className="font-medium text-rose-400 relative z-10">€{ask.price.toFixed(2)}</span>
                  <span className="text-center text-slate-300 relative z-10">{ask.size.toLocaleString()}</span>
                  <span className="text-right text-slate-500 relative z-10">€{ask.total}M</span>
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
  
  const benefits = [
    { icon: Target, title: "Choose your price", description: "No forced market rates" },
    { icon: ArrowDown, title: "Buy below market", description: "Set limit orders and wait" },
    { icon: ArrowUp, title: "Sell above market", description: "List at your target price" },
    { icon: Clock, title: "Patient trading", description: "Wait for better offers" },
    { icon: Eye, title: "Full transparency", description: "See all orders live" },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-slate-900">
      {/* Subtle gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
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
              How It Works
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Professional trading,
            <br />
            <span className="italic text-slate-400">simplified.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-xl mt-6 leading-relaxed"
          >
            A traditional exchange uses an order book. We bring this same professional tool to real-world assets.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Order Book */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatedOrderBook />
          </motion.div>

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group flex items-start gap-5 p-5 bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: hoveredIndex === index 
                    ? '0 8px 24px -8px rgba(0, 0, 0, 0.3)'
                    : 'none',
                }}
              >
                <div className={`w-12 h-12 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  hoveredIndex === index 
                    ? 'border-slate-500 bg-slate-700' 
                    : 'border-slate-700 bg-slate-800'
                }`}>
                  <benefit.icon className={`w-5 h-5 transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-white' : 'text-slate-400'
                  }`} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-slate-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-6 bg-slate-800/30 border-l-2 border-slate-600"
            >
              <p className="text-slate-300 leading-relaxed">
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
