import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUp, Zap, Target, Clock, Eye } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  // Dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBids(prev => prev.map(bid => ({
        ...bid,
        size: bid.size + Math.floor((Math.random() - 0.5) * 2000),
        total: +(bid.total + (Math.random() - 0.5) * 0.3).toFixed(2),
      })));
      
      setAsks(prev => prev.map(ask => ({
        ...ask,
        size: ask.size + Math.floor((Math.random() - 0.5) * 2000),
        total: +(ask.total + (Math.random() - 0.5) * 0.3).toFixed(2),
      })));

      // Random highlight flash
      const side = Math.random() > 0.5 ? 'bid' : 'ask';
      const index = Math.floor(Math.random() * 5);
      setHighlightedRow({ side, index });
      setTimeout(() => setHighlightedRow(null), 300);

      // Update metrics
      setLastPrice(prev => +(prev + (Math.random() - 0.5) * 0.1).toFixed(2));
      setChange24h(prev => +(prev + (Math.random() - 0.5) * 0.02).toFixed(2));
    }, 1500);

    return () => clearInterval(interval);
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
        className="pointer-events-none absolute w-6 h-6 rounded-full border-2 border-primary z-50 hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="absolute inset-1 rounded-full bg-primary/30"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      
      <div className="glass rounded-2xl p-6 relative z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Fragma Marketplace</p>
            <h3 className="text-xl font-serif font-bold text-foreground">Live Order Book</h3>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.5, 1] }}
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
              initial={{ scale: 1.1, color: "hsl(var(--primary))" }}
              animate={{ scale: 1, color: "hsl(var(--foreground))" }}
              className="text-2xl font-bold"
            >
              €{lastPrice.toFixed(2)}
            </motion.p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">24h Change</p>
            <motion.p 
              key={change24h}
              initial={{ scale: 1.1 }}
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
              {bids.map((bid, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`grid grid-cols-3 gap-2 p-3 rounded-lg cursor-pointer transition-all relative overflow-hidden ${
                    highlightedRow?.side === 'bid' && highlightedRow?.index === i
                      ? 'bg-green-500/30'
                      : 'bg-green-500/10 hover:bg-green-500/20'
                  }`}
                >
                  {/* Depth bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-green-500/20"
                    initial={{ width: 0 }}
                    animate={{ width: `${(bid.total / 5) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="text-green-400 font-semibold relative z-10">€{bid.price.toFixed(2)}</span>
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
              ))}
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
              {asks.map((ask, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, x: -5 }}
                  className={`grid grid-cols-3 gap-2 p-3 rounded-lg cursor-pointer transition-all relative overflow-hidden ${
                    highlightedRow?.side === 'ask' && highlightedRow?.index === i
                      ? 'bg-red-500/30'
                      : 'bg-red-500/10 hover:bg-red-500/20'
                  }`}
                >
                  {/* Depth bar */}
                  <motion.div
                    className="absolute right-0 top-0 bottom-0 bg-red-500/20"
                    initial={{ width: 0 }}
                    animate={{ width: `${(ask.total / 5) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="text-red-400 font-semibold relative z-10">€{ask.price.toFixed(2)}</span>
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
              ))}
            </div>
          </div>
        </div>

        {/* Match Animation */}
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