import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Zap, Target, Clock, Eye, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

interface TradeExecution {
  id: number;
  price: number;
  size: number;
  side: 'buy' | 'sell';
}

const assets = [
  { name: "Fragma One Fund", category: "Fund", symbol: "FND-ONE" },
  { name: "Real Estate Fund", category: "Real Estate", symbol: "RE-FND" },
  { name: "SME Bonds Swiss", category: "Private Credit", symbol: "PC-SME" },
  { name: "Blockbuster Film Rights", category: "Entertainment", symbol: "ENT-BFR" },
  { name: "AI Data Center Equity", category: "Infrastructure", symbol: "INF-ADC" },
];

const AnimatedOrderBook = () => {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  const currentAsset = assets[currentAssetIndex];

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
  const [spread, setSpread] = useState(0.26);
  const [tradeExecutions, setTradeExecutions] = useState<TradeExecution[]>([]);
  const [showTradeFlash, setShowTradeFlash] = useState(false);
  const [lastTradeSide, setLastTradeSide] = useState<'buy' | 'sell'>('buy');
  const [matchingRows, setMatchingRows] = useState<{ bidIndex: number; askIndex: number } | null>(null);

  // Rotate assets every 6 seconds
  useEffect(() => {
    const assetInterval = setInterval(() => {
      setCurrentAssetIndex(prev => (prev + 1) % assets.length);
    }, 6000);
    return () => clearInterval(assetInterval);
  }, []);

  // Dynamic data updates with trade executions
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
      // Update metrics
      setLastPrice(prev => +(prev + (Math.random() - 0.5) * 0.1).toFixed(2));
      setChange24h(prev => +(prev + (Math.random() - 0.5) * 0.02).toFixed(2));
    }, 1500);

    // Trade execution animation
    const tradeInterval = setInterval(() => {
      const tradeSide = Math.random() > 0.5 ? 'buy' : 'sell';
      const bidIdx = Math.floor(Math.random() * 5);
      const askIdx = Math.floor(Math.random() * 5);
      
      setLastTradeSide(tradeSide as 'buy' | 'sell');
      setMatchingRows({ bidIndex: bidIdx, askIndex: askIdx });
      setShowTradeFlash(true);
      
      const priceOptions = [89.90, 187.35, 456.80, 892.25, 1245.50, 1248.75, 895.50, 459.20, 189.85, 92.45];
      const randomPrice = priceOptions[Math.floor(Math.random() * priceOptions.length)];
      
      const newTrade: TradeExecution = {
        id: Date.now(),
        price: randomPrice + (Math.random() - 0.5) * 2,
        size: Math.floor(Math.random() * 5000) + 1000,
        side: tradeSide as 'buy' | 'sell',
      };
      
      setTradeExecutions(prev => [newTrade, ...prev.slice(0, 2)]);
      
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
      <div className="glass rounded-2xl p-6 relative z-10 overflow-hidden">
        {/* Trade Execution Flash Overlay */}
        <AnimatePresence>
          {showTradeFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 z-30 pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full ${
                  lastTradeSide === 'buy' ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0], scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
              >
                <CheckCircle2 className={`w-8 h-8 ${lastTradeSide === 'buy' ? 'text-green-400' : 'text-red-400'}`} />
                <span className={`font-bold text-lg whitespace-nowrap ${lastTradeSide === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                  Trade Matched!
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with Asset Name */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{currentAsset.category}</span>
              <span className="text-xs text-primary font-mono">{currentAsset.symbol}</span>
            </div>
            <motion.h3 
              key={currentAsset.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-serif font-bold text-foreground"
            >
              {currentAsset.name}
            </motion.h3>
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

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-background/50 border border-border/30">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Last Price</p>
            <motion.p 
              key={lastPrice}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-foreground"
            >
              €{lastPrice.toFixed(2)}
            </motion.p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">24h Change</p>
            <motion.p 
              key={change24h}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className={`text-2xl font-bold ${change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
            </motion.p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Spread</p>
            <p className="text-2xl font-bold text-primary">{spread.toFixed(2)}%</p>
          </div>
        </div>

        {/* Recent Trades Ticker */}
        <AnimatePresence mode="popLayout">
          {tradeExecutions.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex gap-3 overflow-hidden">
                {tradeExecutions.map((trade) => (
                  <motion.div
                    key={trade.id}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      trade.side === 'buy' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/40' 
                        : 'bg-red-500/20 text-red-400 border-red-500/40'
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      <Zap className="w-3 h-3" />
                    </motion.div>
                    <span>€{trade.price.toFixed(2)}</span>
                    <span className="opacity-60">×</span>
                    <span>{formatNumber(trade.size)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Book Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bids Side */}
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
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    animate={isMatching ? { scale: [1, 1.05, 1] } : {}}
                    className={`grid grid-cols-3 gap-2 p-3 rounded-lg cursor-pointer relative overflow-hidden transition-colors ${
                      isMatching ? 'bg-green-500' : 'bg-background/50 hover:bg-muted/30'
                    }`}
                  >
                    {/* Depth bar - hidden when matching */}
                    {!isMatching && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-muted/10"
                        style={{ width: `${(bid.total / 5) * 100}%` }}
                      />
                    )}
                    <span className={`font-semibold relative z-10 ${isMatching ? 'text-white' : 'text-foreground'}`}>€{bid.price.toFixed(2)}</span>
                    <span className={`text-center relative z-10 ${isMatching ? 'text-white' : 'text-foreground'}`}>
                      {formatNumber(bid.size)}
                    </span>
                    <span className={`text-right relative z-10 ${isMatching ? 'text-white/80' : 'text-muted-foreground'}`}>€{bid.total.toFixed(2)}M</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Asks Side */}
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
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: -5 }}
                    animate={isMatching ? { scale: [1, 1.05, 1] } : {}}
                    className={`grid grid-cols-3 gap-2 p-3 rounded-lg cursor-pointer relative overflow-hidden transition-colors ${
                      isMatching ? 'bg-red-500' : 'bg-background/50 hover:bg-muted/30'
                    }`}
                  >
                    {/* Depth bar - hidden when matching */}
                    {!isMatching && (
                      <div 
                        className="absolute right-0 top-0 bottom-0 bg-muted/10"
                        style={{ width: `${(ask.total / 5) * 100}%` }}
                      />
                    )}
                    <span className={`font-semibold relative z-10 ${isMatching ? 'text-white' : 'text-foreground'}`}>€{ask.price.toFixed(2)}</span>
                    <span className={`text-center relative z-10 ${isMatching ? 'text-white' : 'text-foreground'}`}>
                      {formatNumber(ask.size)}
                    </span>
                    <span className={`text-right relative z-10 ${isMatching ? 'text-white/80' : 'text-muted-foreground'}`}>€{ask.total.toFixed(2)}M</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Match Animation Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center"
        >
          <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-foreground text-sm font-medium">When prices match — trade executes instantly on-chain</p>
        </motion.div>
      </div>
    </div>
  );
};

export const OrderBookExplainer = () => {
  const benefits = [
    { icon: Target, title: "Choose your own price", description: "No forced market rates" },
    { icon: ArrowDown, title: "Buy below market", description: "Set limit orders and wait" },
    { icon: ArrowUp, title: "Sell above market", description: "List at your target price" },
    { icon: Clock, title: "Wait for better offers", description: "Patience can pay off" },
    { icon: Eye, title: "Full transparency", description: "See all orders in real-time" },
  ];

  return (
    <section className="py-24 section-mesh relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Professional order book trading,{" "}
              <span className="text-gradient">simplified.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A traditional exchange uses an order book — a list of "buy orders" and "sell orders."
              We bring this same professional tool to real-world assets.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Order Book Animation */}
          <AnimatedOrderBook />

          {/* Right - Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-primary font-medium mt-6 pl-4 border-l-2 border-primary"
            >
              This gives you freedom, transparency, and control.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};