import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Network, BookOpen, Link2, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const LiveOrderBook = () => {
  const [bids, setBids] = useState([
    { price: 99.85, size: 25000, total: 2496250 },
    { price: 99.80, size: 50000, total: 4990000 },
    { price: 99.75, size: 35000, total: 3491250 },
    { price: 99.70, size: 42000, total: 4187400 },
    { price: 99.65, size: 28000, total: 2790200 },
  ]);

  const [asks, setAsks] = useState([
    { price: 100.15, size: 20000, total: 2003000 },
    { price: 100.20, size: 45000, total: 4509000 },
    { price: 100.25, size: 30000, total: 3007500 },
    { price: 100.30, size: 38000, total: 3811400 },
    { price: 100.35, size: 22000, total: 2207700 },
  ]);

  const [lastTrade, setLastTrade] = useState({ price: 100.00, change: 0.15 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate micro-movements in the order book
      setBids(prev => prev.map(bid => ({
        ...bid,
        size: bid.size + Math.floor((Math.random() - 0.5) * 1000),
        total: (bid.size + Math.floor((Math.random() - 0.5) * 1000)) * bid.price
      })));
      setAsks(prev => prev.map(ask => ({
        ...ask,
        size: ask.size + Math.floor((Math.random() - 0.5) * 1000),
        total: (ask.size + Math.floor((Math.random() - 0.5) * 1000)) * ask.price
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      {/* Glow effect */}
      <motion.div
        animate={{ 
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.05 : 1
        }}
        className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl"
      />
      
      {/* Scan line animation */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 8 }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none z-20 rounded-2xl"
      />

      <div className="glass rounded-2xl p-6 relative z-10 border border-primary/20 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <motion.p 
              className="text-xs text-muted-foreground tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              FRAGMA MARKETPLACE
            </motion.p>
            <motion.p 
              className="text-xl font-serif font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Live Order Book
            </motion.p>
          </div>
          <motion.div 
            className="flex items-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-green-400">Live</span>
          </motion.div>
        </div>

        {/* Price Display */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-background/50">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Last Price</p>
            <motion.p 
              className="text-2xl font-bold text-foreground"
              key={lastTrade.price}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
            >
              €{lastTrade.price.toFixed(2)}
            </motion.p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">24h Change</p>
            <p className="text-2xl font-bold text-green-400">+{lastTrade.change}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Spread</p>
            <p className="text-2xl font-bold text-primary">0.30%</p>
          </div>
        </div>

        {/* Order Book */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bids */}
          <div>
            <div className="grid grid-cols-3 gap-1 text-xs text-muted-foreground mb-2 px-2">
              <span>Price</span>
              <span className="text-right">Size</span>
              <span className="text-right">Total</span>
            </div>
            {bids.map((bid, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(34, 197, 94, 0.15)" }}
                className="grid grid-cols-3 gap-1 text-sm py-2 px-2 rounded bg-green-500/10 mb-1 cursor-pointer transition-colors"
              >
                <span className="text-green-400 font-medium">€{bid.price.toFixed(2)}</span>
                <motion.span 
                  className="text-right text-foreground"
                  key={bid.size}
                  animate={{ opacity: [0.5, 1] }}
                >
                  {bid.size.toLocaleString()}
                </motion.span>
                <span className="text-right text-muted-foreground">€{(bid.total / 1000000).toFixed(2)}M</span>
              </motion.div>
            ))}
          </div>

          {/* Asks */}
          <div>
            <div className="grid grid-cols-3 gap-1 text-xs text-muted-foreground mb-2 px-2">
              <span>Price</span>
              <span className="text-right">Size</span>
              <span className="text-right">Total</span>
            </div>
            {asks.map((ask, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 68, 68, 0.15)" }}
                className="grid grid-cols-3 gap-1 text-sm py-2 px-2 rounded bg-red-500/10 mb-1 cursor-pointer transition-colors"
              >
                <span className="text-red-400 font-medium">€{ask.price.toFixed(2)}</span>
                <motion.span 
                  className="text-right text-foreground"
                  key={ask.size}
                  animate={{ opacity: [0.5, 1] }}
                >
                  {ask.size.toLocaleString()}
                </motion.span>
                <span className="text-right text-muted-foreground">€{(ask.total / 1000000).toFixed(2)}M</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturePill = ({ icon: Icon, text, delay }: { icon: any; text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm cursor-default"
  >
    <Icon className="w-4 h-4 text-primary" />
    <span className="text-sm text-foreground">{text}</span>
  </motion.div>
);

export const MarketplaceHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Floating orbs */}
      <motion.div
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ 
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]"
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Mouse follower glow */}
      <motion.div
        style={{ x, y }}
        className="absolute w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                Secondary Marketplace
              </span>
              
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
                Your assets, your price,{" "}
                <span className="text-gradient">your pace.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Trade tokenised real-world assets directly with other investors — no intermediaries, 
                no custodians holding your funds. Set your own price, place limit orders, 
                and manage your portfolio 24/7.
              </p>
            </motion.div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <FeaturePill icon={Wallet} text="Non-custodial" delay={0.8} />
              <FeaturePill icon={Network} text="Decentralized" delay={0.9} />
              <FeaturePill icon={BookOpen} text="Order book trading" delay={1.0} />
              <FeaturePill icon={Link2} text="On-chain settlement" delay={1.1} />
              <FeaturePill icon={TrendingUp} text="Options trading" delay={1.2} />
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="btn-glow group">
                Explore Marketplace
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                Learn How It Works
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Live Order Book */}
          <div className="hidden lg:block">
            <LiveOrderBook />
          </div>
        </div>
      </div>
    </section>
  );
};
