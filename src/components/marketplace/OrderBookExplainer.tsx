import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Zap, Target, Clock, Eye, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface TradeExecution {
  id: number;
  price: number;
  size: number;
  side: 'buy' | 'sell';
}

const AnimatedOrderBook = () => {
  const [bids, setBids] = useState([
    { price: 99.85, size: 21628, total: 2.21 },
    { price: 99.80, size: 47056, total: 4.65 },
    { price: 99.75, size: 29241, total: 2.99 },
    { price: 99.70, size: 46023, total: 4.55 },
    { price: 99.65, size: 26939, total: 2.66 },
  ]);

  const [asks, setAsks] = useState([
    { price: 100.15, size: 16207, total: 1.72 },
    { price: 100.20, size: 49376, total: 4.97 },
    { price: 100.25, size: 29524, total: 2.92 },
    { price: 100.30, size: 41270, total: 4.05 },
    { price: 100.35, size: 21320, total: 2.11 },
  ]);

  const [lastPrice, setLastPrice] = useState(100.00);
  const [change24h, setChange24h] = useState(0.15);
  const [spread, setSpread] = useState(0.30);
  const [highlightedRow, setHighlightedRow] = useState<{ side: 'bid' | 'ask', index: number } | null>(null);
  const [tradeExecutions, setTradeExecutions] = useState<TradeExecution[]>([]);
  const [showTradeFlash, setShowTradeFlash] = useState(false);
  const [matchingAnimation, setMatchingAnimation] = useState<{ bidIndex: number; askIndex: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 30 });

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
      const bidIndex = Math.floor(Math.random() * 5);
      const askIndex = Math.floor(Math.random() * 5);
      
      // Start matching animation
      setMatchingAnimation({ bidIndex, askIndex });
      
      setTimeout(() => {
        setShowTradeFlash(true);
        
        const newTrade: TradeExecution = {
          id: Date.now(),
          price: 100.00 + (Math.random() - 0.5) * 0.3,
          size: Math.floor(Math.random() * 5000) + 1000,
          side: Math.random() > 0.5 ? 'buy' : 'sell',
        };
        
        setTradeExecutions(prev => [newTrade, ...prev.slice(0, 2)]);
        
        setTimeout(() => {
          setShowTradeFlash(false);
          setMatchingAnimation(null);
        }, 600);
      }, 400);
    }, 4000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(tradeInterval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
    >
      {/* Tracking Cursor */}
      <motion.div
        className="pointer-events-none absolute w-8 h-8 rounded-full border-2 border-primary/60 z-50 hidden lg:block mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 backdrop-blur-sm"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
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
                animate={{ scale: 1.5, opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-primary"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0], scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
              >
                <CheckCircle2 className="w-8 h-8 text-green-400" />
                <span className="text-green-400 font-bold text-lg whitespace-nowrap">Trade Matched!</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Fragma Marketplace</p>
            <h3 className="text-xl font-serif font-bold text-foreground">Live Order Book</h3>
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
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                      trade.side === 'buy' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
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
                    <span className="text-muted-foreground">×</span>
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
                const isMatching = matchingAnimation?.bidIndex === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    animate={isMatching ? { 
                      scale: [1, 1.03, 1],
                      boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0)", "0 0 20px 4px rgba(34, 197, 94, 0.5)", "0 0 0 0 rgba(34, 197, 94, 0)"]
                    } : {}}
                    className={`grid grid-cols-3 gap-2 p-3 rounded-lg cursor-pointer transition-all relative overflow-hidden ${
                      isMatching
                        ? 'bg-green-500/30'
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    {/* Depth bar - neutral unless matching */}
                    <motion.div
                      className={`absolute left-0 top-0 bottom-0 ${isMatching ? 'bg-green-500/30' : 'bg-muted/20'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(bid.total / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Match line animation */}
                    <AnimatePresence>
                      {isMatching && (
                        <motion.div
                          initial={{ x: "100%", opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 border-2 border-green-400 rounded-lg bg-green-500/10"
                        />
                      )}
                    </AnimatePresence>
                    <span className={`font-semibold relative z-10 transition-colors ${isMatching ? 'text-green-400' : 'text-foreground'}`}>€{bid.price.toFixed(2)}</span>
                    <motion.span 
                      key={bid.size}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-foreground relative z-10"
                    >
                      {formatNumber(bid.size)}
                    </motion.span>
                    <span className="text-right text-muted-foreground relative z-10">€{bid.total.toFixed(2)}M</span>
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
                const isMatching = matchingAnimation?.askIndex === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: -5 }}
                    animate={isMatching ? { 
                      scale: [1, 1.03, 1],
                      boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0)", "0 0 20px 4px rgba(239, 68, 68, 0.5)", "0 0 0 0 rgba(239, 68, 68, 0)"]
                    } : {}}
                    className={`grid grid-cols-3 gap-2 p-3 rounded-lg cursor-pointer transition-all relative overflow-hidden ${
                      isMatching
                        ? 'bg-red-500/30'
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    {/* Depth bar - neutral unless matching */}
                    <motion.div
                      className={`absolute right-0 top-0 bottom-0 ${isMatching ? 'bg-red-500/30' : 'bg-muted/20'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(ask.total / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Match line animation */}
                    <AnimatePresence>
                      {isMatching && (
                        <motion.div
                          initial={{ x: "-100%", opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 border-2 border-red-400 rounded-lg bg-red-500/10"
                        />
                      )}
                    </AnimatePresence>
                    <span className={`font-semibold relative z-10 transition-colors ${isMatching ? 'text-red-400' : 'text-foreground'}`}>€{ask.price.toFixed(2)}</span>
                    <motion.span 
                      key={ask.size}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-foreground relative z-10"
                    >
                      {formatNumber(ask.size)}
                    </motion.span>
                    <span className="text-right text-muted-foreground relative z-10">€{ask.total.toFixed(2)}M</span>
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
    <section className="py-24 bg-background relative overflow-hidden">
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