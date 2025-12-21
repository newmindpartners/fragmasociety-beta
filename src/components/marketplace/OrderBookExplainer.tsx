import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Zap, Target, Clock, Eye, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

// Real asset images for trading context
const tradingAssets = [
  { 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200",
    name: "Malibu Villa",
    symbol: "MLB-VLA"
  },
  { 
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200",
    name: "Tech Campus",
    symbol: "TCH-CMP"
  },
  { 
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200",
    name: "Credit Fund",
    symbol: "CRD-FND"
  },
];

const AnimatedOrderBook = () => {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  const currentAsset = tradingAssets[currentAssetIndex];

  const [bids, setBids] = useState([
    { price: 1245.50, size: 21628, total: 2.21 },
    { price: 892.25, size: 47056, total: 4.65 },
    { price: 456.80, size: 29241, total: 2.99 },
    { price: 187.35, size: 46023, total: 4.55 },
    { price: 89.90, size: 26939, total: 2.66 },
  ]);

  const [asks, setAsks] = useState([
    { price: 1248.75, size: 16207, total: 1.72 },
    { price: 895.50, size: 49376, total: 4.97 },
    { price: 459.20, size: 29524, total: 2.92 },
    { price: 189.85, size: 41270, total: 4.05 },
    { price: 92.45, size: 21320, total: 2.11 },
  ]);

  const [lastPrice, setLastPrice] = useState(1247.00);
  const [change24h, setChange24h] = useState(2.35);
  const [showTradeFlash, setShowTradeFlash] = useState(false);
  const [lastTradeSide, setLastTradeSide] = useState<'buy' | 'sell'>('buy');
  const [matchingRows, setMatchingRows] = useState<{ bidIndex: number; askIndex: number } | null>(null);

  useEffect(() => {
    const assetInterval = setInterval(() => {
      setCurrentAssetIndex(prev => (prev + 1) % tradingAssets.length);
    }, 6000);
    return () => clearInterval(assetInterval);
  }, []);

  useEffect(() => {
    const dataInterval = setInterval(() => {
      setBids(prev => prev.map(bid => ({
        ...bid,
        size: Math.max(10000, bid.size + Math.floor((Math.random() - 0.5) * 2000)),
        total: +Math.max(1, bid.total + (Math.random() - 0.5) * 0.3).toFixed(2),
      })));
      
      setAsks(prev => prev.map(ask => ({
        ...ask,
        size: Math.max(10000, ask.size + Math.floor((Math.random() - 0.5) * 2000)),
        total: +Math.max(1, ask.total + (Math.random() - 0.5) * 0.3).toFixed(2),
      })));
      
      setLastPrice(prev => +(prev + (Math.random() - 0.5) * 0.1).toFixed(2));
      setChange24h(prev => +(prev + (Math.random() - 0.5) * 0.02).toFixed(2));
    }, 1500);

    const tradeInterval = setInterval(() => {
      const tradeSide = Math.random() > 0.5 ? 'buy' : 'sell';
      const bidIdx = Math.floor(Math.random() * 5);
      const askIdx = Math.floor(Math.random() * 5);
      
      setLastTradeSide(tradeSide as 'buy' | 'sell');
      setMatchingRows({ bidIndex: bidIdx, askIndex: askIdx });
      setShowTradeFlash(true);
      
      setTimeout(() => {
        setShowTradeFlash(false);
        setMatchingRows(null);
      }, 800);
    }, 4000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(tradeInterval);
    };
  }, []);

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="relative">
      <motion.div 
        className="glass rounded-3xl p-6 relative z-10 overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Trade Flash Overlay */}
        <AnimatePresence>
          {showTradeFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.6 }}
                className={`w-32 h-32 rounded-full ${lastTradeSide === 'buy' ? 'bg-green-500' : 'bg-red-500'}`}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0], scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute flex items-center gap-2"
              >
                <CheckCircle2 className={`w-8 h-8 ${lastTradeSide === 'buy' ? 'text-green-400' : 'text-red-400'}`} />
                <span className={`font-bold text-lg ${lastTradeSide === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                  Trade Matched!
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with Asset */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              key={currentAsset.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-12 h-12 rounded-xl overflow-hidden"
            >
              <img src={currentAsset.image} alt={currentAsset.name} className="w-full h-full object-cover" />
            </motion.div>
            <div>
              <motion.h3 
                key={currentAsset.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-serif font-bold text-foreground"
              >
                {currentAsset.name}
              </motion.h3>
              <span className="text-xs text-primary font-mono">{currentAsset.symbol}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm text-green-500 font-medium">Live</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-background/50 border border-border/30">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Last Price</p>
            <motion.p key={lastPrice} className="text-2xl font-bold text-foreground">
              €{lastPrice.toFixed(2)}
            </motion.p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">24h Change</p>
            <motion.p className={`text-2xl font-bold ${change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
            </motion.p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Spread</p>
            <p className="text-2xl font-bold text-primary">0.26%</p>
          </div>
        </div>

        {/* Order Book Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bids */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-muted-foreground px-3">
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-1">
              {bids.map((bid, i) => {
                const isMatching = matchingRows?.bidIndex === i;
                return (
                  <motion.div
                    key={i}
                    animate={isMatching ? { scale: [1, 1.03, 1] } : {}}
                    className={`grid grid-cols-3 gap-2 p-3 rounded-lg relative overflow-hidden transition-all ${
                      isMatching ? 'bg-green-500 scale-[1.02]' : 'bg-background/50 hover:bg-muted/30'
                    }`}
                  >
                    {!isMatching && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-green-500/10"
                        style={{ width: `${(bid.total / 5) * 100}%` }}
                      />
                    )}
                    <span className={`font-semibold relative z-10 ${isMatching ? 'text-white' : 'text-green-400'}`}>
                      €{bid.price.toFixed(2)}
                    </span>
                    <span className={`text-center relative z-10 ${isMatching ? 'text-white' : 'text-foreground'}`}>
                      {formatNumber(bid.size)}
                    </span>
                    <span className={`text-right relative z-10 ${isMatching ? 'text-white/80' : 'text-muted-foreground'}`}>
                      €{bid.total.toFixed(2)}M
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Asks */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-muted-foreground px-3">
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-1">
              {asks.map((ask, i) => {
                const isMatching = matchingRows?.askIndex === i;
                return (
                  <motion.div
                    key={i}
                    animate={isMatching ? { scale: [1, 1.03, 1] } : {}}
                    className={`grid grid-cols-3 gap-2 p-3 rounded-lg relative overflow-hidden transition-all ${
                      isMatching ? 'bg-red-500 scale-[1.02]' : 'bg-background/50 hover:bg-muted/30'
                    }`}
                  >
                    {!isMatching && (
                      <div 
                        className="absolute right-0 top-0 bottom-0 bg-red-500/10"
                        style={{ width: `${(ask.total / 5) * 100}%` }}
                      />
                    )}
                    <span className={`font-semibold relative z-10 ${isMatching ? 'text-white' : 'text-red-400'}`}>
                      €{ask.price.toFixed(2)}
                    </span>
                    <span className={`text-center relative z-10 ${isMatching ? 'text-white' : 'text-foreground'}`}>
                      {formatNumber(ask.size)}
                    </span>
                    <span className={`text-right relative z-10 ${isMatching ? 'text-white/80' : 'text-muted-foreground'}`}>
                      €{ask.total.toFixed(2)}M
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center"
        >
          <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-foreground text-sm font-medium">Prices match → Trade executes instantly on-chain</p>
        </motion.div>
      </motion.div>
    </div>
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
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.02]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      
      {/* Top border line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-xs font-semibold tracking-widest uppercase rounded-full bg-secondary/80 text-foreground border border-border/50 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              How It Works
            </span>
            <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-8 leading-[1.1]">
              Professional trading,
              <br />
              <span className="text-gradient italic">simplified.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A traditional exchange uses an order book. We bring this same professional tool to real-world assets.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatedOrderBook />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 8 }}
                className="group flex items-start gap-5 p-6 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
            >
              <p className="text-foreground font-medium leading-relaxed">
                <span className="text-primary font-semibold">This isn't a "platform price."</span>{" "}
                It's a real marketplace where you set the terms.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
