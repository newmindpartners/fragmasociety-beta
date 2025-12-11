import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";

// Asset types for multi-asset tabs
const assets = [
  { id: "all", label: "All", ticker: "FRG-VILLA-01", change: "+4.2%", vol: "€142k", hue: 0 },
  { id: "real-estate", label: "Real Estate", ticker: "FRG-VILLA-01", change: "+4.2%", vol: "€142k", hue: 0 },
  { id: "film", label: "Film", ticker: "FRG-FILM-01", change: "+2.8%", vol: "€89k", hue: 20 },
  { id: "credit", label: "Credit", ticker: "FRG-CREDIT-02", change: "+1.5%", vol: "€215k", hue: -10 },
  { id: "fund", label: "Fund", ticker: "FRG-FUND-01", change: "+3.1%", vol: "€324k", hue: 10 },
];

// Generate initial chart data
const generateChartData = () => [40, 55, 48, 65, 58, 72, 68, 82, 78, 92].map(h => ({ height: h, glow: false }));

// Generate order book data
const generateOrderBook = () => ({
  asks: Array.from({ length: 6 }, (_, i) => ({
    price: 500 + i * 5,
    size: (Math.random() * 2 + 0.5).toFixed(2),
    highlighted: false,
    filled: false,
  })),
  bids: Array.from({ length: 6 }, (_, i) => ({
    price: 490 - i * 5,
    size: (Math.random() * 2 + 0.5).toFixed(2),
    highlighted: false,
    filled: false,
  })),
});

// Animated number component
const AnimatedNumber = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.3 }}
    >
      {value}{suffix}
    </motion.span>
  );
};

export const Marketplace = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [storyPlayed, setStoryPlayed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const [chartData, setChartData] = useState(generateChartData);
  const [orderBook, setOrderBook] = useState(generateOrderBook);
  const [currentAsset, setCurrentAsset] = useState(assets[0]);
  const [showScanLine, setShowScanLine] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredOrder, setHoveredOrder] = useState<{ type: 'bid' | 'ask'; index: number } | null>(null);
  
  // Story animation states
  const [storyStep, setStoryStep] = useState(0);
  const [showOrderPill, setShowOrderPill] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Entrance animation sequence
  useEffect(() => {
    if (!isInView) return;
    
    const timeline = setTimeout(() => {
      setShowScanLine(true);
      setTimeout(() => {
        setShowScanLine(false);
        setEntranceComplete(true);
      }, 500);
    }, 1200);
    
    return () => clearTimeout(timeline);
  }, [isInView]);

  // Play story once after entrance
  useEffect(() => {
    if (!entranceComplete || storyPlayed) return;
    
    const storyTimeline = async () => {
      await new Promise(r => setTimeout(r, 500));
      setStoryStep(1); // Highlight order row
      
      await new Promise(r => setTimeout(r, 800));
      setShowOrderPill(true);
      
      await new Promise(r => setTimeout(r, 1200));
      setShowOrderPill(false);
      setStoryStep(2); // Fill order
      
      await new Promise(r => setTimeout(r, 400));
      setShowConfetti(true);
      
      await new Promise(r => setTimeout(r, 600));
      setShowConfetti(false);
      setStoryStep(0);
      setStoryPlayed(true);
    };
    
    storyTimeline();
  }, [entranceComplete, storyPlayed]);

  // Idle animation loop - chart micro-ticks
  useEffect(() => {
    if (!entranceComplete) return;
    
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev];
        const randomIndex = Math.floor(Math.random() * newData.length);
        const change = (Math.random() - 0.5) * 6;
        newData[randomIndex] = {
          height: Math.max(30, Math.min(100, newData[randomIndex].height + change)),
          glow: true
        };
        setTimeout(() => {
          setChartData(p => p.map((d, i) => i === randomIndex ? { ...d, glow: false } : d));
        }, 400);
        return newData;
      });
    }, 3500);
    
    return () => clearInterval(interval);
  }, [entranceComplete]);

  // Idle animation - order book micro-ticks
  useEffect(() => {
    if (!entranceComplete) return;
    
    const interval = setInterval(() => {
      setOrderBook(prev => {
        const type = Math.random() > 0.5 ? 'bids' : 'asks';
        const newBook = { ...prev };
        const orders = [...newBook[type]];
        
        // Shift orders and add new one
        if (Math.random() > 0.3) {
          orders.shift();
          const basePrice = type === 'bids' ? 490 : 500;
          const offset = type === 'bids' ? -orders.length * 5 : orders.length * 5;
          orders.push({
            price: basePrice + offset + Math.floor(Math.random() * 3) - 1,
            size: (Math.random() * 2 + 0.5).toFixed(2),
            highlighted: false,
            filled: false,
          });
        }
        
        newBook[type] = orders;
        return newBook;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [entranceComplete]);

  // Auto-rotate tabs
  useEffect(() => {
    if (!entranceComplete || isHovered) return;
    
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % assets.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [entranceComplete, isHovered]);

  // Update current asset when tab changes
  useEffect(() => {
    setCurrentAsset(assets[activeTab]);
    setChartData(generateChartData());
    setOrderBook(generateOrderBook());
  }, [activeTab]);

  // Mouse parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x: x * 3, y: y * 3 });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, x: 24 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const }
    }
  };

  const innerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.3, duration: 0.4 }
    }
  };

  return (
    <section ref={sectionRef} id="marketplace" className="relative w-full py-20 lg:py-28 overflow-hidden">
      {/* Glassmorphism container */}
      <div className="absolute inset-0 bg-card/50 backdrop-blur-xl border-y border-white/5" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge>Marketplace</Badge>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6">
            Your assets, your price, your pace.
          </h2>
          <p className="text-muted-foreground mb-8">
            The Fragma Society marketplace lets you trade your tokenised slices peer-to-peer. 
            Place limit orders, see depth in the order book, and manage your portfolio 24/7 – without giving up custody.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              'You keep control (non-custodial)', 
              'Set your own price (limit orders)', 
              'On-chain settlement when trades execute'
            ].map((item, i) => (
              <motion.li 
                key={item} 
                className="flex items-center gap-3 text-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              >
                <CheckCircle size={16} className="text-primary flex-shrink-0" /> {item}
              </motion.li>
            ))}
          </ul>
          <Button className="group">
            Explore marketplace UI
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Living Order Book Card */}
        <motion.div
          ref={cardRef}
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
          onMouseMove={handleMouseMove}
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
          className="relative bg-[hsl(222,47%,8%)] backdrop-blur-md border border-white/10 rounded-xl shadow-2xl shadow-primary/10 font-mono text-xs overflow-hidden transition-transform duration-200 ease-out"
        >
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
          
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 rounded-xl blur-xl opacity-50" />
          
          <motion.div 
            variants={innerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative p-4"
          >
            {/* Asset Tabs */}
            <div className="flex gap-1 mb-3">
              {assets.map((asset, i) => (
                <button
                  key={asset.id}
                  onClick={() => { setActiveTab(i); setIsHovered(true); }}
                  className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    activeTab === i 
                      ? "bg-primary/20 text-primary border border-primary/30" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {asset.label}
                </button>
              ))}
            </div>
            
            {/* Ticker Row */}
            <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
              <div className="flex gap-4 items-center">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={currentAsset.ticker}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-foreground font-bold text-sm"
                  >
                    {currentAsset.ticker}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <AnimatedNumber value={currentAsset.change} />
                </AnimatePresence>
              </div>
              <motion.div 
                className="text-muted-foreground"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                24h Vol: <AnimatePresence mode="wait"><AnimatedNumber value={currentAsset.vol} /></AnimatePresence>
              </motion.div>
            </div>
            
            <div className="flex gap-4 h-64">
              {/* Chart Area */}
              <div className="flex-1 flex items-end justify-between gap-1 pb-4 border-b border-white/5 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="border-t border-white/5"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                    />
                  ))}
                </div>
                
                {/* Chart Bars */}
                {chartData.map((bar, i) => (
                  <motion.div
                    key={i}
                    className="relative w-full group cursor-pointer"
                    style={{ height: "100%" }}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <motion.div 
                      className={`absolute bottom-0 w-full rounded-sm transition-all duration-200 ${
                        bar.glow ? "bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)]" : "bg-primary/30"
                      } ${hoveredBar === i ? "bg-primary/50" : ""} ${
                        storyStep === 2 && i === chartData.length - 1 ? "bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.8)]" : ""
                      }`}
                      initial={{ height: 0 }}
                      animate={{ 
                        height: `${bar.height}%`,
                        y: hoveredBar === i ? -2 : 0
                      }}
                      transition={{ 
                        height: { delay: 0.7 + i * 0.05, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                        y: { duration: 0.15 }
                      }}
                    />
                    
                    {/* Bar Tooltip */}
                    <AnimatePresence>
                      {hoveredBar === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm border border-white/10 rounded px-2 py-1 whitespace-nowrap z-20"
                        >
                          <span className="text-primary">€{(450 + i * 5)}</span>
                          <span className="text-muted-foreground"> • {(Math.random() * 2 + 0.5).toFixed(2)} slices</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Connection line when order is hovered */}
                    {hoveredOrder && i === chartData.length - 1 - hoveredOrder.index && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        className="absolute bottom-0 left-1/2 w-px bg-primary/50 origin-bottom"
                        style={{ height: "100%" }}
                      />
                    )}
                  </motion.div>
                ))}
                
                {/* Scan line animation */}
                <AnimatePresence>
                  {showScanLine && (
                    <motion.div
                      initial={{ left: 0, opacity: 1 }}
                      animate={{ left: "100%", opacity: [1, 1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_10px_hsl(var(--primary))]"
                    />
                  )}
                </AnimatePresence>
                
                {/* Story confetti */}
                <AnimatePresence>
                  {showConfetti && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 1, y: 0, x: 0 }}
                          animate={{ 
                            opacity: 0, 
                            y: -30 - i * 10, 
                            x: (i - 1) * 15 
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          className="absolute bottom-20 right-4 w-1.5 h-1.5 rounded-full bg-primary"
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Order Book */}
              <div className="w-32 hidden sm:block border-l border-white/5 pl-4">
                <div className="text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Order Book</div>
                
                {/* Asks */}
                {orderBook.asks.map((order, i) => (
                  <motion.div 
                    key={`ask-${i}`}
                    className={`flex justify-between mb-1 px-1 -mx-1 rounded transition-all duration-200 cursor-pointer ${
                      hoveredOrder?.type === 'ask' && hoveredOrder.index === i 
                        ? "bg-destructive/10 border border-destructive/30" 
                        : ""
                    }`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
                    onMouseEnter={() => setHoveredOrder({ type: 'ask', index: i })}
                    onMouseLeave={() => setHoveredOrder(null)}
                  >
                    <span className="text-destructive/80">{order.price}</span>
                    <span className="text-muted-foreground">{order.size}</span>
                  </motion.div>
                ))}
                
                {/* Spread */}
                <div className="my-2 border-t border-white/5 relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                {/* Bids */}
                {orderBook.bids.map((order, i) => (
                  <motion.div 
                    key={`bid-${i}`}
                    className={`flex justify-between mb-1 px-1 -mx-1 rounded transition-all duration-200 cursor-pointer ${
                      hoveredOrder?.type === 'bid' && hoveredOrder.index === i 
                        ? "bg-primary/10 border border-primary/30" 
                        : ""
                    } ${
                      storyStep === 1 && i === 0 
                        ? "bg-primary/20 border border-primary/50 shadow-[0_0_10px_hsl(var(--primary)/0.3)]" 
                        : ""
                    } ${
                      storyStep === 2 && i === 0 
                        ? "bg-primary/40" 
                        : ""
                    }`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: order.filled ? 0.5 : 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
                    onMouseEnter={() => setHoveredOrder({ type: 'bid', index: i })}
                    onMouseLeave={() => setHoveredOrder(null)}
                  >
                    <span className="text-primary">{order.price}</span>
                    <span className="text-muted-foreground">{order.size}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Story Order Pill */}
            <AnimatePresence>
              {showOrderPill && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-20 top-1/2 -translate-y-1/2 bg-background/95 backdrop-blur-md border border-primary/30 rounded-lg p-3 shadow-xl shadow-primary/20"
                >
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Place Order</div>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground">Amount</div>
                      <div className="text-foreground font-medium">1.25 slices</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Est. Cost</div>
                      <div className="text-primary font-medium">€612.50</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
