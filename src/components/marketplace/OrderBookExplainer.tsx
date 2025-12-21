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
      className="relative bg-secondary/80 border border-border/50 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Match Flash */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex items-center gap-3 px-8 py-4 bg-primary/10 border border-primary/30"
            >
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary tracking-wide">Trade Matched</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-6 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted/40 border border-border/30 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">
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
                  className="text-lg font-light text-foreground tracking-wide font-serif"
                >
                  {currentAsset.name}
                </motion.h3>
              </AnimatePresence>
              <span className="text-xs font-mono text-muted-foreground tracking-wider">{currentAsset.symbol}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-primary"
            />
            <span className="text-xs text-primary font-medium tracking-wider">Live</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 p-5 bg-muted/20 border-b border-border/30">
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">Last Price</p>
          <motion.p 
            key={lastPrice} 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-lg font-light text-foreground"
          >
            €{lastPrice.toFixed(2)}
          </motion.p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">24h Change</p>
          <p className="text-lg font-light text-primary">+{change24h}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">Spread</p>
          <p className="text-lg font-light text-foreground/80">0.26%</p>
        </div>
      </div>

      {/* Order Book */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Bids */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-[9px] text-muted-foreground uppercase tracking-[0.15em]">
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
                  className="grid grid-cols-3 gap-2 p-2.5 bg-primary/5 border border-primary/10 relative overflow-hidden group hover:bg-primary/10 transition-colors duration-300"
                >
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-primary/10"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(bid.total / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  />
                  <span className="text-sm font-medium text-primary relative z-10">€{bid.price.toFixed(2)}</span>
                  <span className="text-sm text-center text-muted-foreground relative z-10">{bid.size.toLocaleString()}</span>
                  <span className="text-sm text-right text-muted-foreground/70 relative z-10">€{bid.total}M</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-[9px] text-muted-foreground uppercase tracking-[0.15em]">
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
                  className="grid grid-cols-3 gap-2 p-2.5 bg-destructive/5 border border-destructive/10 relative overflow-hidden group hover:bg-destructive/10 transition-colors duration-300"
                >
                  <motion.div 
                    className="absolute right-0 top-0 bottom-0 bg-destructive/10"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(ask.total / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  />
                  <span className="text-sm font-medium text-destructive relative z-10">€{ask.price.toFixed(2)}</span>
                  <span className="text-sm text-center text-muted-foreground relative z-10">{ask.size.toLocaleString()}</span>
                  <span className="text-sm text-right text-muted-foreground/70 relative z-10">€{ask.total}M</span>
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
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden section-mesh">
      {/* Premium gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[150px]" />
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-gradient-to-r from-primary/60 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-medium">
              How It Works
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.05] tracking-tight mb-6"
          >
            Professional trading,
            <br />
            <motion.span 
              className="italic text-muted-foreground font-serif"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              simplified.
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
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
                    className="relative flex items-center gap-5 p-5 overflow-hidden"
                    style={{
                      background: isHovered 
                        ? 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--card)) 100%)'
                        : 'hsl(var(--secondary) / 0.3)',
                      border: isHovered 
                        ? '1px solid hsl(var(--primary) / 0.3)' 
                        : '1px solid hsl(var(--border) / 0.3)',
                      boxShadow: isHovered 
                        ? '0 20px 40px -15px hsl(0 0% 0% / 0.4), 0 0 30px -10px hsl(var(--primary) / 0.1)'
                        : 'none',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    animate={{ 
                      y: isHovered ? -4 : 0,
                      scale: isHovered ? 1.01 : 1
                    }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {/* Decorative number */}
                    <span 
                      className="absolute top-2 right-4 text-4xl font-extralight text-foreground/[0.03] font-serif"
                      style={{ transition: 'color 0.4s' }}
                    >
                      {benefit.number}
                    </span>

                    {/* Icon container */}
                    <motion.div 
                      className={`w-12 h-12 border flex items-center justify-center flex-shrink-0 ${
                        isHovered 
                          ? 'border-primary/40 bg-primary/10' 
                          : 'border-border/40 bg-muted/30'
                      }`}
                      style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                      animate={{ 
                        rotate: isHovered ? 3 : 0,
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <benefit.icon 
                        className={`w-5 h-5 ${isHovered ? 'text-primary' : 'text-muted-foreground'}`} 
                        style={{ transition: 'color 0.4s' }}
                        strokeWidth={1.5} 
                      />
                    </motion.div>
                    
                    <div className="relative z-10">
                      <h3 
                        className={`font-medium mb-0.5 tracking-wide ${isHovered ? 'text-foreground' : 'text-foreground/90'}`}
                        style={{ transition: 'color 0.4s' }}
                      >
                        {benefit.title}
                      </h3>
                      <p 
                        className={`text-sm ${isHovered ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}
                        style={{ transition: 'color 0.4s' }}
                      >
                        {benefit.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary/60 via-primary/40 to-accent/30"
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
              className="mt-6 p-5 bg-secondary/20 border-l-2 border-primary/40"
            >
              <p className="text-muted-foreground leading-relaxed text-sm">
                <span className="text-foreground font-medium">This isn't a "platform price."</span>{" "}
                It's a real marketplace where you set the terms.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-20 flex justify-center relative z-10"
      >
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
};
