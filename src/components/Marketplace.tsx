import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight, Shield, Zap, Lock, TrendingUp, Activity } from "lucide-react";
import { Button } from "./ui/button";

const assetCategories = [
  { id: "all", label: "All" },
  { id: "realestate", label: "Real Estate" },
  { id: "film", label: "Film" },
  { id: "credit", label: "Credit" },
  { id: "fund", label: "Fund" },
];

interface OrderBookData {
  asks: { price: number; size: number; depth: number }[];
  bids: { price: number; size: number; depth: number }[];
  midPrice: number;
  spread: string;
  change: string;
}

const assetData: Record<string, { 
  ticker: string; 
  change: number; 
  volume: string; 
  gradient: string;
  orderBook: OrderBookData;
}> = {
  all: { 
    ticker: "FRG-VILLA-01", 
    change: 4.2, 
    volume: "€485k", 
    gradient: "from-primary via-cyan-500 to-emerald-500",
    orderBook: {
      asks: [
        { price: 524.50, size: 1.82, depth: 85 },
        { price: 522.25, size: 0.94, depth: 60 },
        { price: 520.00, size: 1.45, depth: 75 },
        { price: 518.75, size: 0.68, depth: 40 },
        { price: 516.50, size: 2.10, depth: 95 },
      ],
      bids: [
        { price: 514.25, size: 1.56, depth: 80 },
        { price: 512.00, size: 0.89, depth: 50 },
        { price: 510.50, size: 2.34, depth: 100 },
        { price: 508.25, size: 1.12, depth: 65 },
        { price: 506.00, size: 0.77, depth: 45 },
      ],
      midPrice: 515.38,
      spread: "0.22",
      change: "+0.42"
    }
  },
  realestate: { 
    ticker: "FRG-ESTATE-02", 
    change: 2.8, 
    volume: "€312k", 
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    orderBook: {
      asks: [
        { price: 892.00, size: 0.45, depth: 70 },
        { price: 888.50, size: 1.20, depth: 90 },
        { price: 885.25, size: 0.78, depth: 55 },
        { price: 882.00, size: 1.95, depth: 100 },
        { price: 879.75, size: 0.62, depth: 45 },
      ],
      bids: [
        { price: 876.50, size: 1.34, depth: 85 },
        { price: 873.25, size: 0.91, depth: 60 },
        { price: 870.00, size: 2.15, depth: 95 },
        { price: 867.50, size: 0.56, depth: 40 },
        { price: 864.25, size: 1.78, depth: 75 },
      ],
      midPrice: 878.13,
      spread: "0.18",
      change: "+1.25"
    }
  },
  film: { 
    ticker: "FRG-FILM-01", 
    change: 5.1, 
    volume: "€567k", 
    gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
    orderBook: {
      asks: [
        { price: 156.80, size: 3.45, depth: 95 },
        { price: 154.50, size: 2.10, depth: 75 },
        { price: 152.25, size: 1.88, depth: 60 },
        { price: 150.00, size: 4.20, depth: 100 },
        { price: 148.75, size: 1.55, depth: 50 },
      ],
      bids: [
        { price: 146.50, size: 2.78, depth: 85 },
        { price: 144.25, size: 1.92, depth: 65 },
        { price: 142.00, size: 3.45, depth: 90 },
        { price: 140.50, size: 1.25, depth: 45 },
        { price: 138.25, size: 2.10, depth: 70 },
      ],
      midPrice: 147.63,
      spread: "0.34",
      change: "+2.15"
    }
  },
  credit: { 
    ticker: "FRG-CREDIT-02", 
    change: 1.9, 
    volume: "€234k", 
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    orderBook: {
      asks: [
        { price: 1025.00, size: 0.28, depth: 65 },
        { price: 1022.50, size: 0.52, depth: 80 },
        { price: 1020.00, size: 0.35, depth: 50 },
        { price: 1017.75, size: 0.88, depth: 95 },
        { price: 1015.25, size: 0.42, depth: 55 },
      ],
      bids: [
        { price: 1012.50, size: 0.65, depth: 75 },
        { price: 1010.00, size: 0.38, depth: 45 },
        { price: 1007.75, size: 0.95, depth: 100 },
        { price: 1005.25, size: 0.48, depth: 60 },
        { price: 1002.50, size: 0.72, depth: 85 },
      ],
      midPrice: 1013.88,
      spread: "0.12",
      change: "+0.18"
    }
  },
  fund: { 
    ticker: "FRG-FUND-01", 
    change: 3.1, 
    volume: "€324k", 
    gradient: "from-primary via-blue-500 to-indigo-500",
    orderBook: {
      asks: [
        { price: 102.45, size: 12.50, depth: 90 },
        { price: 101.80, size: 8.75, depth: 70 },
        { price: 101.25, size: 15.20, depth: 100 },
        { price: 100.90, size: 6.40, depth: 55 },
        { price: 100.50, size: 10.80, depth: 80 },
      ],
      bids: [
        { price: 100.10, size: 9.25, depth: 75 },
        { price: 99.75, size: 14.50, depth: 95 },
        { price: 99.40, size: 7.80, depth: 60 },
        { price: 99.00, size: 11.20, depth: 85 },
        { price: 98.65, size: 5.90, depth: 50 },
      ],
      midPrice: 100.30,
      spread: "0.20",
      change: "+0.85"
    }
  },
};

// Generate smooth curve data with deterministic seed
const generatePriceData = (seed: number) => {
  const points: { x: number; y: number }[] = [];
  const basePrice = [500, 878, 147, 1013, 100][seed] || 500;
  let price = basePrice;
  // Use seed for pseudo-random but consistent data
  const random = (i: number) => {
    const x = Math.sin(seed * 1000 + i * 9999) * 10000;
    return x - Math.floor(x);
  };
  for (let i = 0; i < 50; i++) {
    price += (random(i) - 0.48) * (basePrice * 0.006);
    price = Math.max(basePrice * 0.95, Math.min(basePrice * 1.08, price));
    points.push({ x: i, y: price });
  }
  return points;
};

// Smooth SVG Area Chart with animated trading cursor
const PremiumChart = ({ 
  data, 
  isVisible, 
}: { 
  data: { x: number; y: number }[];
  isVisible: boolean;
}) => {
  const [cursorProgress, setCursorProgress] = useState(0);
  
  // Animate cursor along the line
  useEffect(() => {
    if (!isVisible) return;
    
    const startDelay = setTimeout(() => {
      const animate = () => {
        setCursorProgress(prev => {
          const next = prev + 0.003;
          return next >= 1 ? 0 : next;
        });
      };
      
      const interval = setInterval(animate, 50);
      return () => clearInterval(interval);
    }, 2000);
    
    return () => clearTimeout(startDelay);
  }, [isVisible]);

  const width = 380;
  const height = 220;
  const padding = { top: 20, right: 10, bottom: 20, left: 10 };
  
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  
  const minY = Math.min(...data.map(d => d.y)) - 10;
  const maxY = Math.max(...data.map(d => d.y)) + 10;
  
  const xScale = (x: number) => padding.left + (x / (data.length - 1)) * chartW;
  const yScale = (y: number) => padding.top + chartH - ((y - minY) / (maxY - minY)) * chartH;
  
  // Get point at progress along the curve
  const getPointAtProgress = (progress: number) => {
    const index = Math.floor(progress * (data.length - 1));
    const nextIndex = Math.min(index + 1, data.length - 1);
    const t = (progress * (data.length - 1)) - index;
    
    const x = data[index].x + (data[nextIndex].x - data[index].x) * t;
    const y = data[index].y + (data[nextIndex].y - data[index].y) * t;
    
    return { x: xScale(x), y: yScale(y), price: y };
  };
  
  const cursorPoint = getPointAtProgress(cursorProgress);
  
  // Catmull-Rom to Bezier conversion for smooth curves
  const catmullRomToBezier = (points: { x: number; y: number }[]) => {
    const result: string[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];
      
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      
      result.push(`C ${xScale(cp1x)} ${yScale(cp1y)} ${xScale(cp2x)} ${yScale(cp2y)} ${xScale(p2.x)} ${yScale(p2.y)}`);
    }
    return result.join(' ');
  };
  
  const scaledPoints = data.map((p, i) => ({ x: i, y: p.y }));
  const linePath = `M ${xScale(0)} ${yScale(data[0].y)} ${catmullRomToBezier(scaledPoints)}`;
  const areaPath = `${linePath} L ${xScale(data.length - 1)} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;
  
  const lastPoint = data[data.length - 1];

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="chartAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          <stop offset="40%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
        
        <linearGradient id="chartLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          <stop offset="50%" stopColor="hsl(180 70% 55%)" />
          <stop offset="100%" stopColor="hsl(160 70% 50%)" />
        </linearGradient>
        
        <filter id="chartGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="cursorGlow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Subtle grid */}
      {[0, 1, 2, 3].map((i) => (
        <motion.line
          key={i}
          x1={padding.left}
          y1={padding.top + (i * chartH) / 3}
          x2={width - padding.right}
          y2={padding.top + (i * chartH) / 3}
          stroke="hsl(var(--muted-foreground))"
          strokeOpacity={0.08}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isVisible ? 1 : 0 }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
        />
      ))}
      
      {/* Area fill */}
      <motion.path
        d={areaPath}
        fill="url(#chartAreaGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      {/* Main line */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="url(#chartLineGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#chartGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isVisible ? 1 : 0 }}
        transition={{ duration: 1.8, ease: [0.22, 0.61, 0.36, 1] }}
      />
      
      {/* Animated trading cursor following the line */}
      {isVisible && cursorProgress > 0 && (
        <g>
          {/* Vertical line from cursor to bottom */}
          <motion.line
            x1={cursorPoint.x}
            y1={cursorPoint.y}
            x2={cursorPoint.x}
            y2={height - padding.bottom}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity={0.4}
          />
          
          {/* Horizontal line to left edge */}
          <motion.line
            x1={padding.left}
            y1={cursorPoint.y}
            x2={cursorPoint.x}
            y2={cursorPoint.y}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity={0.4}
          />
          
          {/* Cursor outer glow */}
          <circle
            cx={cursorPoint.x}
            cy={cursorPoint.y}
            r="12"
            fill="hsl(var(--primary))"
            opacity={0.15}
            filter="url(#cursorGlow)"
          />
          
          {/* Cursor ring */}
          <circle
            cx={cursorPoint.x}
            cy={cursorPoint.y}
            r="8"
            fill="transparent"
            stroke="hsl(180 70% 55%)"
            strokeWidth="1.5"
            opacity={0.6}
          />
          
          {/* Cursor dot */}
          <circle
            cx={cursorPoint.x}
            cy={cursorPoint.y}
            r="4"
            fill="hsl(160 70% 50%)"
            filter="url(#dotGlow)"
          />
          
          {/* Price tooltip - large and prominent */}
          <g transform={`translate(${cursorPoint.x + 14}, ${cursorPoint.y - 24})`}>
            {/* Background shadow */}
            <rect
              x="0"
              y="-18"
              width="95"
              height="42"
              rx="8"
              fill="hsl(var(--background))"
              opacity={0.95}
            />
            {/* Main background */}
            <rect
              x="0"
              y="-18"
              width="95"
              height="42"
              rx="8"
              fill="hsl(var(--card))"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeOpacity={0.6}
            />
            {/* Gradient overlay */}
            <rect
              x="0"
              y="-18"
              width="95"
              height="42"
              rx="8"
              fill="url(#chartLineGradient)"
              opacity={0.15}
            />
            <text
              x="12"
              y="10"
              className="text-[18px] font-mono font-bold fill-primary"
            >
              €{cursorPoint.price.toFixed(2)}
            </text>
          </g>
        </g>
      )}
      
      {/* Animated endpoint */}
      <motion.circle
        cx={xScale(lastPoint.x)}
        cy={yScale(lastPoint.y)}
        r="5"
        fill="hsl(160 70% 50%)"
        filter="url(#dotGlow)"
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 1.5 }}
      />
      
      {/* Pulsing ring at endpoint */}
      <motion.circle
        cx={xScale(lastPoint.x)}
        cy={yScale(lastPoint.y)}
        r="8"
        fill="transparent"
        stroke="hsl(160 70% 50%)"
        strokeWidth="1.5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isVisible ? [1, 1.8, 1] : 0.8, 
          opacity: isVisible ? [0.6, 0, 0.6] : 0 
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      />
    </svg>
  );
};

// Premium Order Book with depth visualization
const OrderBook = ({ isVisible, orderBookData }: { isVisible: boolean; orderBookData: OrderBookData }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/5">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium">Order Book</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] text-muted-foreground">Live</span>
        </div>
      </div>
      
      {/* Column headers */}
      <div className="grid grid-cols-2 gap-4 px-3 py-1.5 text-[9px] uppercase tracking-wider text-muted-foreground/50 border-b border-white/5">
        <span>Price</span>
        <span className="text-right">Size</span>
      </div>
      
      {/* Asks (sells) */}
      <div className="flex-1 flex flex-col justify-end py-1">
        <AnimatePresence mode="wait">
          {orderBookData.asks.map((order, i) => (
            <motion.div
              key={`ask-${order.price}`}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: 0.8 + i * 0.06, duration: 0.4 }}
            >
              {/* Depth bar */}
              <motion.div
                className="absolute inset-y-0 right-0 bg-gradient-to-l from-rose-500/15 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: isVisible ? `${order.depth}%` : 0 }}
                transition={{ delay: 1 + i * 0.06, duration: 0.5 }}
              />
              
              <div className="relative grid grid-cols-2 gap-4 px-3 py-1.5 text-xs">
                <span className="font-mono text-rose-400/90">€{order.price.toFixed(2)}</span>
                <span className="font-mono text-right text-foreground/70">{order.size.toFixed(2)}</span>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Spread indicator */}
      <motion.div
        className="px-3 py-2.5 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.span 
                key={orderBookData.midPrice}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-lg font-mono font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
              >
                €{orderBookData.midPrice.toFixed(2)}
              </motion.span>
            </AnimatePresence>
            <motion.span
              className="text-xs text-emerald-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {orderBookData.change}%
            </motion.span>
          </div>
          <span className="text-[10px] text-muted-foreground/60">{orderBookData.spread}% spread</span>
        </div>
      </motion.div>
      
      {/* Bids (buys) */}
      <div className="flex-1 py-1">
        <AnimatePresence mode="wait">
          {orderBookData.bids.map((order, i) => (
            <motion.div
              key={`bid-${order.price}`}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: 1.0 + i * 0.06, duration: 0.4 }}
            >
              {/* Depth bar */}
              <motion.div
                className="absolute inset-y-0 right-0 bg-gradient-to-l from-emerald-500/15 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: isVisible ? `${order.depth}%` : 0 }}
                transition={{ delay: 1.2 + i * 0.06, duration: 0.5 }}
              />
              
              <div className="relative grid grid-cols-2 gap-4 px-3 py-1.5 text-xs">
                <span className="font-mono text-emerald-400/90">€{order.price.toFixed(2)}</span>
                <span className="font-mono text-right text-foreground/70">{order.size.toFixed(2)}</span>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Marketplace = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceData, setPriceData] = useState(() => generatePriceData(0));
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Auto-rotate categories
  useEffect(() => {
    if (!isInView || isHovered) return;
    
    const categories = Object.keys(assetData);
    const interval = setInterval(() => {
      setActiveCategory(prev => {
        const idx = categories.indexOf(prev);
        return categories[(idx + 1) % categories.length];
      });
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isInView, isHovered]);
  
  // Update data on category change
  useEffect(() => {
    const seed = Object.keys(assetData).indexOf(activeCategory);
    setPriceData(generatePriceData(seed));
  }, [activeCategory]);
  
  const currentAsset = assetData[activeCategory];
  
  // Mouse parallax for depth effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x: x * 4, y: y * 4 });
  }, []);

  const features = [
    { icon: Shield, title: "Non-custodial ownership", desc: "Your assets stay in your wallet" },
    { icon: Zap, title: "Set your own price", desc: "Place limit orders at any level" },
    { icon: Lock, title: "On-chain settlement", desc: "Instant, verifiable execution" },
  ];

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[200px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-[180px] translate-x-1/3" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20 mb-8"
            >
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Secondary Marketplace
              </span>
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-foreground mb-8 leading-[1.1]">
              Your assets,{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  your price,
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isInView ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </span>{" "}
              your pace.
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-lg">
              The Fragma Society marketplace lets you trade tokenised assets peer-to-peer. 
              Place limit orders, see depth in the order book, and manage your portfolio 24/7.
            </p>
            
            <div className="space-y-5 mb-12">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                disabled
                className="relative overflow-hidden border-2 border-primary bg-primary/10 text-primary font-semibold cursor-not-allowed px-8 gap-2"
              >
                <span>Coming Soon</span>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right - Trading Terminal */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, rotateX: 8 }}
            animate={{ 
              opacity: isInView ? 1 : 0, 
              y: isInView ? 0 : 50, 
              rotateX: isInView ? 0 : 8 
            }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
            onMouseMove={handleMouseMove}
            style={{ 
              transform: `perspective(1200px) translate(${mousePos.x}px, ${mousePos.y}px)`,
              transformStyle: "preserve-3d"
            }}
            className="relative lg:ml-8"
          >
            {/* Multi-layer glow effect */}
            <div className="absolute -inset-8 bg-gradient-conic from-primary/20 via-cyan-500/10 via-emerald-500/10 to-primary/20 rounded-3xl blur-3xl opacity-40 animate-spin-slow" style={{ animationDuration: '20s' }} />
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/15 to-cyan-500/15 rounded-2xl blur-2xl opacity-60" />
            
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-card/95 via-card to-card/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-primary/5 overflow-hidden">
              {/* Animated gradient orb */}
              <motion.div
                className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${currentAsset.gradient} rounded-full blur-3xl opacity-20`}
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Header with tabs */}
              <div className="relative border-b border-white/5 p-4 pb-3">
                {/* Category pills */}
                <div className="flex items-center gap-1.5 mb-4 overflow-x-auto scrollbar-hide">
                  {assetCategories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setIsHovered(true); }}
                      className={`relative px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all duration-300
                        ${activeCategory === cat.id 
                          ? 'text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activeCategory === cat.id && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-cyan-500 rounded-lg"
                          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                        />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                    </motion.button>
                  ))}
                </div>
                
                {/* Ticker info row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center border border-white/10"
                      whileHover={{ scale: 1.05 }}
                    >
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </motion.div>
                    
                    <div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentAsset.ticker}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="font-mono font-bold text-base text-foreground"
                        >
                          {currentAsset.ticker}
                        </motion.div>
                      </AnimatePresence>
                      <div className="flex items-center gap-2">
                        <motion.span
                          key={currentAsset.change}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs font-mono text-emerald-400"
                        >
                          +{currentAsset.change.toFixed(1)}%
                        </motion.span>
                        <span className="text-[10px] text-muted-foreground/60">24h</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-0.5">24h Volume</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentAsset.volume}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-mono font-semibold text-foreground"
                      >
                        {currentAsset.volume}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              {/* Main content area */}
              <div className="grid grid-cols-5 min-h-[340px]">
                {/* Chart section */}
                <div className="col-span-3 p-4 border-r border-white/5 relative">
                  <PremiumChart 
                    data={priceData} 
                    isVisible={isInView} 
                  />
                  
                  {/* Chart label */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-cyan-500" />
                    <span className="text-[10px] text-muted-foreground/60">Price (EUR)</span>
                  </div>
                </div>
                
                {/* Order book */}
                <div className="col-span-2">
                  <OrderBook isVisible={isInView} orderBookData={currentAsset.orderBook} />
                </div>
              </div>
              
              {/* Footer */}
              <div className="relative border-t border-white/5 px-4 py-3 flex items-center justify-center bg-gradient-to-r from-transparent via-primary/[0.02] to-transparent">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex items-center gap-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30" />
                    <span className="text-[11px] text-muted-foreground">Real-time</span>
                  </motion.div>
                  <div className="h-3 w-px bg-white/10" />
                  <span className="text-[11px] text-muted-foreground/60">Powered by Fragma</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 pt-16 border-t border-white/5"
        >
          <p className="text-center text-sm text-muted-foreground/60 uppercase tracking-widest mb-12">
            Trusted Partners & Infrastructure
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {/* Woud Law */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="group"
            >
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card/40 border border-white/5 hover:border-primary/30 hover:bg-card/60 transition-all duration-300">
                <svg className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3L4 7v6c0 5 3.5 9.74 8 11 4.5-1.26 8-6 8-11V7l-8-4z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground/90 group-hover:text-foreground text-base tracking-wide">WOUD</span>
                  <span className="text-[9px] text-muted-foreground/50 uppercase tracking-widest">Law Firm</span>
                </div>
              </div>
            </motion.div>
            
            {/* House of Web3 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="group"
            >
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card/40 border border-white/5 hover:border-primary/30 hover:bg-card/60 transition-all duration-300">
                <svg className="w-7 h-7 text-primary/70 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
                </svg>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground/90 group-hover:text-foreground text-base">House of Web3</span>
                  <span className="text-[9px] text-muted-foreground/50 uppercase tracking-widest">Luxembourg</span>
                </div>
              </div>
            </motion.div>
            
            {/* Swissquote */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 1.1 }}
              className="group"
            >
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/40 border border-white/5 hover:border-primary/30 hover:bg-card/60 transition-all duration-300">
                <div className="w-7 h-7 rounded bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SQ</span>
                </div>
                <span className="font-bold text-foreground/90 group-hover:text-foreground text-base tracking-wide">Swissquote</span>
              </div>
            </motion.div>
            
            {/* Bank Frick */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="group"
            >
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/40 border border-white/5 hover:border-primary/30 hover:bg-card/60 transition-all duration-300">
                <div className="w-7 h-7 rounded bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">BF</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground/90 group-hover:text-foreground text-base">Bank Frick</span>
                  <span className="text-[9px] text-muted-foreground/50 uppercase tracking-widest">Liechtenstein</span>
                </div>
              </div>
            </motion.div>
            
            {/* Realiz */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 1.3 }}
              className="group"
            >
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card/40 border border-white/5 hover:border-primary/30 hover:bg-card/60 transition-all duration-300">
                <svg className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span className="font-bold text-foreground/90 group-hover:text-foreground text-base tracking-wide">Realiz</span>
              </div>
            </motion.div>
            
            {/* DFNS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="group"
            >
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card/40 border border-white/5 hover:border-primary/30 hover:bg-card/60 transition-all duration-300">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground/90 group-hover:text-foreground text-base">Dfns</span>
                  <span className="text-[9px] text-muted-foreground/50 uppercase tracking-widest">Wallet Infra</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
