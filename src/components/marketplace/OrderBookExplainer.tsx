import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowDown, ArrowUp, Target, Clock, Eye, CheckCircle2, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Import asset images
import malibuVilla from "@/assets/orderbook/malibu-villa.jpg";
import filmFund from "@/assets/orderbook/film-fund.jpg";
import musicRights from "@/assets/orderbook/music-rights.jpg";
import corporateBond from "@/assets/orderbook/corporate-bond.jpg";

const tradingAssets = [
  { 
    name: "Malibu Villa", 
    symbol: "MLB-VLA", 
    image: malibuVilla, 
    category: "Real Estate",
    basePrice: 12450.00,
    bids: [
      { price: 12380.00, size: 8, total: 0.99 },
      { price: 12320.00, size: 12, total: 1.48 },
      { price: 12250.00, size: 18, total: 2.21 },
      { price: 12180.00, size: 25, total: 3.04 },
    ],
    asks: [
      { price: 12520.00, size: 6, total: 0.75 },
      { price: 12580.00, size: 10, total: 1.26 },
      { price: 12650.00, size: 15, total: 1.90 },
      { price: 12720.00, size: 22, total: 2.80 },
    ]
  },
  { 
    name: "Film Fund", 
    symbol: "FLM-FND", 
    image: filmFund, 
    category: "Entertainment",
    basePrice: 250.00,
    bids: [
      { price: 248.50, size: 450, total: 0.11 },
      { price: 247.25, size: 820, total: 0.20 },
      { price: 245.80, size: 1250, total: 0.31 },
      { price: 244.00, size: 1680, total: 0.41 },
    ],
    asks: [
      { price: 251.50, size: 380, total: 0.10 },
      { price: 253.25, size: 650, total: 0.16 },
      { price: 255.00, size: 920, total: 0.23 },
      { price: 257.50, size: 1400, total: 0.36 },
    ]
  },
  { 
    name: "Music Rights", 
    symbol: "MSC-RGT", 
    image: musicRights, 
    category: "Royalties",
    basePrice: 85.50,
    bids: [
      { price: 85.20, size: 1200, total: 0.10 },
      { price: 84.80, size: 2400, total: 0.20 },
      { price: 84.25, size: 3800, total: 0.32 },
      { price: 83.50, size: 5200, total: 0.43 },
    ],
    asks: [
      { price: 85.80, size: 950, total: 0.08 },
      { price: 86.25, size: 1800, total: 0.16 },
      { price: 86.90, size: 2900, total: 0.25 },
      { price: 87.50, size: 4100, total: 0.36 },
    ]
  },
  { 
    name: "Corporate Bond", 
    symbol: "CRP-BND", 
    image: corporateBond, 
    category: "Fixed Income",
    basePrice: 1025.00,
    bids: [
      { price: 1023.50, size: 85, total: 0.87 },
      { price: 1021.25, size: 142, total: 1.45 },
      { price: 1018.75, size: 198, total: 2.02 },
      { price: 1015.00, size: 265, total: 2.69 },
    ],
    asks: [
      { price: 1026.50, size: 72, total: 0.74 },
      { price: 1028.75, size: 118, total: 1.21 },
      { price: 1031.25, size: 165, total: 1.70 },
      { price: 1034.00, size: 220, total: 2.27 },
    ]
  },
];

// Particle effect component
const FloatingParticle = ({ delay, duration, x, y }: { delay: number; duration: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-violet-400/40 rounded-full"
    initial={{ opacity: 0, x: x, y: y }}
    animate={{ 
      opacity: [0, 0.8, 0],
      y: [y, y - 80],
      scale: [0, 1.5, 0]
    }}
    transition={{ 
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
  />
);

// Order row with matching animation
const OrderRow = ({ 
  order, 
  type, 
  index, 
  isMatching, 
  matchIndex 
}: { 
  order: { price: number; size: number; total: number };
  type: 'bid' | 'ask';
  index: number;
  isMatching: boolean;
  matchIndex: number;
}) => {
  const isBid = type === 'bid';
  const isThisMatching = isMatching && index === matchIndex;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isBid ? -20 : 20, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative group"
    >
      <motion.div
        animate={isThisMatching ? {
          scale: [1, 1.03, 1],
          boxShadow: isBid 
            ? ['0 0 0 rgba(16, 185, 129, 0)', '0 0 30px rgba(16, 185, 129, 0.5)', '0 0 0 rgba(16, 185, 129, 0)']
            : ['0 0 0 rgba(239, 68, 68, 0)', '0 0 30px rgba(239, 68, 68, 0.5)', '0 0 0 rgba(239, 68, 68, 0)']
        } : {}}
        transition={{ duration: 0.6 }}
        className={`
          grid grid-cols-3 gap-3 p-4 rounded-xl relative overflow-hidden
          border transition-all duration-500 cursor-pointer
          ${isBid 
            ? 'bg-emerald-500/[0.08] border-emerald-500/20 hover:bg-emerald-500/[0.15] hover:border-emerald-500/40' 
            : 'bg-rose-500/[0.08] border-rose-500/20 hover:bg-rose-500/[0.15] hover:border-rose-500/40'
          }
        `}
      >
        {/* Progress bar fill - solid color */}
        <motion.div 
          className={`absolute inset-y-0 ${isBid ? 'left-0 bg-emerald-500/15' : 'right-0 bg-rose-500/15'}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${(order.total / 5) * 100}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Hover highlight - solid */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
          ${isBid ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`} 
        />

        <span className={`text-base font-semibold relative z-10 ${isBid ? 'text-emerald-400' : 'text-rose-400'}`}>
          €{order.price.toFixed(2)}
        </span>
        <span className="text-base text-center relative z-10 text-white/70 font-medium">
          {order.size.toLocaleString()}
        </span>
        <span className="text-base text-right relative z-10 text-white/50">
          €{order.total}M
        </span>

        {/* Match indicator - solid colors */}
        <AnimatePresence>
          {isThisMatching && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <Zap className={`w-5 h-5 ${isBid ? 'text-emerald-400' : 'text-rose-400'}`} />
                <span className="text-white font-medium text-sm">Matched!</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const AnimatedOrderBook = () => {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  const currentAsset = tradingAssets[currentAssetIndex];
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [lastPrice, setLastPrice] = useState(currentAsset.basePrice);
  const [change24h] = useState(2.39);
  const [showMatch, setShowMatch] = useState(false);
  const [matchIndex, setMatchIndex] = useState(0);
  const [showCenterMatch, setShowCenterMatch] = useState(false);

  // Update price when asset changes
  useEffect(() => {
    setLastPrice(currentAsset.basePrice);
  }, [currentAssetIndex, currentAsset.basePrice]);

  // Asset rotation - slower pace (12 seconds)
  useEffect(() => {
    const assetInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentAssetIndex(prev => (prev + 1) % tradingAssets.length);
        setIsTransitioning(false);
      }, 500);
    }, 12000);
    return () => clearInterval(assetInterval);
  }, []);

  // Price fluctuation based on current asset's price range
  useEffect(() => {
    const priceInterval = setInterval(() => {
      const fluctuation = currentAsset.basePrice * 0.001 * (Math.random() - 0.5);
      setLastPrice(prev => +(prev + fluctuation).toFixed(2));
    }, 2000);
    
    const matchInterval = setInterval(() => {
      const newMatchIndex = Math.floor(Math.random() * 4);
      setMatchIndex(newMatchIndex);
      setShowMatch(true);
      
      setTimeout(() => {
        setShowMatch(false);
        setShowCenterMatch(true);
        setTimeout(() => setShowCenterMatch(false), 1200);
      }, 600);
    }, 6000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(matchInterval);
    };
  }, [currentAsset.basePrice]);

  return (
    <motion.div 
      className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 overflow-hidden rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient background - solid colors */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            opacity: [0.2, 0.35, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-violet-600/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-emerald-600/10 rounded-full blur-[80px]"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.8} 
            duration={3 + Math.random() * 2}
            x={50 + Math.random() * 300}
            y={200 + Math.random() * 200}
          />
        ))}
      </div>

      {/* Center Match Celebration - solid colors, no gradients */}
      <AnimatePresence>
        {showCenterMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-md"
          >
            {/* Ripple effects - solid borders */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute w-24 h-24 rounded-full border-2 border-violet-500/60"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              className="absolute w-24 h-24 rounded-full border-2 border-emerald-500/60"
            />
            
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center gap-4"
            >
              {/* Solid color icon container */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-16 h-16 rounded-2xl bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/40"
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h4 className="text-xl font-semibold text-white mb-1">Order Matched</h4>
                <p className="text-white/60 text-sm">Trade executed successfully</p>
              </motion.div>
              
              {/* Confetti particles - solid colors */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{ 
                      opacity: 0,
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      scale: 0
                    }}
                    transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                    className={`absolute left-1/2 top-1/2 w-2 h-2 rounded-full ${
                      i % 3 === 0 ? 'bg-emerald-400' : i % 3 === 1 ? 'bg-violet-400' : 'bg-amber-400'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asset Header with Image */}
      <div className="relative p-6 border-b border-white/10">
        <div className="flex items-center gap-5">
          {/* Asset Image */}
          <motion.div 
            className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl"
            animate={{ 
              opacity: isTransitioning ? 0 : 1,
              scale: isTransitioning ? 0.9 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={currentAsset.image} 
              alt={currentAsset.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Live indicator on image */}
            <motion.div 
              className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAsset.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 
                  className="text-2xl font-light text-white tracking-wide mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {currentAsset.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono tracking-wider text-violet-400 bg-violet-500/15 px-2 py-0.5 rounded">
                    {currentAsset.symbol}
                  </span>
                  <span className="text-xs text-white/40">{currentAsset.category}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Live Status */}
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
            />
            <span className="text-sm font-medium text-emerald-400 tracking-wide">Live</span>
          </div>
        </div>
        
        {/* Asset thumbnail strip - 4 assets */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
          {tradingAssets.map((asset, i) => (
            <motion.button
              key={asset.symbol}
              onClick={() => setCurrentAssetIndex(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                i === currentAssetIndex 
                  ? 'border-violet-500 shadow-lg shadow-violet-500/30' 
                  : 'border-white/10 opacity-50 hover:opacity-80'
              }`}
            >
              <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" />
              {i === currentAssetIndex && (
                <motion.div 
                  layoutId="activeAsset"
                  className="absolute inset-0 border-2 border-violet-400 rounded-xl"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Price Metrics */}
      <div className="grid grid-cols-3 gap-0 bg-white/[0.02] border-b border-white/10">
        <div className="text-center py-5 px-4 border-r border-white/5">
          <p className="text-[10px] uppercase tracking-[0.25em] mb-2 text-white/40">Last Price</p>
          <motion.p 
            key={lastPrice} 
            initial={{ opacity: 0.6, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-light text-white tabular-nums"
          >
            €{lastPrice.toFixed(2)}
          </motion.p>
        </div>
        <div className="text-center py-5 px-4 border-r border-white/5">
          <p className="text-[10px] uppercase tracking-[0.25em] mb-2 text-white/40">24h Change</p>
          <div className="flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <p className="text-2xl font-light text-emerald-400">+{change24h}%</p>
          </div>
        </div>
        <div className="text-center py-5 px-4">
          <p className="text-[10px] uppercase tracking-[0.25em] mb-2 text-white/40">Spread</p>
          <p className="text-2xl font-light text-white/70">0.26%</p>
        </div>
      </div>

      {/* Order Book with Buy/Sell columns */}
      <div className="p-6">
        {/* Column Headers */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />
            <span className="text-sm font-medium text-emerald-400 tracking-wide">Buy Orders</span>
          </div>
          <div className="flex items-center gap-2 mb-2 justify-end">
            <span className="text-sm font-medium text-rose-400 tracking-wide">Sell Orders</span>
            <div className="w-3 h-3 rounded-full bg-rose-400 shadow-lg shadow-rose-400/40" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Bids (Buy) */}
          <div>
            <div className="grid grid-cols-3 gap-3 mb-3 text-[9px] uppercase tracking-[0.2em] text-white/40 px-4">
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-2">
              {currentAsset.bids.map((bid, i) => (
                <OrderRow 
                  key={i} 
                  order={bid} 
                  type="bid" 
                  index={i}
                  isMatching={showMatch}
                  matchIndex={matchIndex}
                />
              ))}
            </div>
          </div>

          {/* Asks (Sell) */}
          <div>
            <div className="grid grid-cols-3 gap-3 mb-3 text-[9px] uppercase tracking-[0.2em] text-white/40 px-4">
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-2">
              {currentAsset.asks.map((ask, i) => (
                <OrderRow 
                  key={i} 
                  order={ask} 
                  type="ask" 
                  index={i}
                  isMatching={showMatch}
                  matchIndex={matchIndex}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Match center indicator */}
        <div className="relative flex items-center justify-center my-6">
          <div className="flex-1 h-px bg-white/10" />
          <motion.div
            animate={{ 
              boxShadow: ['0 0 0 rgba(139, 92, 246, 0)', '0 0 20px rgba(139, 92, 246, 0.4)', '0 0 0 rgba(139, 92, 246, 0)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-xs text-white/60">Orders match automatically</span>
          </motion.div>
          <div className="flex-1 h-px bg-white/10" />
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
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Deep premium background - solid color */}
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* Ambient glows - solid colors */}
      <motion.div 
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-[700px] h-[400px] bg-violet-900/20 rounded-full blur-[100px]" 
      />
      <motion.div 
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-emerald-900/15 rounded-full blur-[80px]" 
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-violet-500/30" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-white/30" />
            <span className="text-xs tracking-[0.3em] uppercase font-medium text-white/50">
              How It Works
            </span>
            <div className="w-12 h-px bg-white/30" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight mb-6 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Professional trading,
            <br />
            <span className="italic text-white/50">simplified.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-lg max-w-xl leading-relaxed text-white/50"
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
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group cursor-pointer"
                >
                  <motion.div
                    className={`relative flex items-center gap-5 p-5 overflow-hidden rounded-xl transition-all duration-500 ${
                      isHovered 
                        ? 'bg-white/[0.08] border border-violet-500/40' 
                        : 'bg-white/[0.03] border border-white/10'
                    }`}
                    animate={{ 
                      y: isHovered ? -4 : 0,
                      scale: isHovered ? 1.02 : 1
                    }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {/* Decorative number */}
                    <span className="absolute top-2 right-4 text-5xl font-extralight font-serif text-white/[0.03]">
                      {benefit.number}
                    </span>

                    {/* Icon container */}
                    <motion.div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                        isHovered 
                          ? 'border-violet-500/50 bg-violet-500/20 border shadow-lg shadow-violet-500/20' 
                          : 'border-white/20 bg-white/5 border'
                      }`}
                      animate={{ 
                        rotate: isHovered ? 3 : 0,
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <benefit.icon 
                        className={`w-6 h-6 transition-colors duration-400 ${isHovered ? 'text-violet-400' : 'text-white/60'}`}
                        strokeWidth={1.5} 
                      />
                    </motion.div>
                    
                    <div className="relative z-10">
                      <h3 
                        className={`text-lg font-medium mb-0.5 tracking-wide transition-colors duration-400 ${isHovered ? 'text-white' : 'text-white/90'}`}
                      >
                        {benefit.title}
                      </h3>
                      <p 
                        className="text-sm transition-colors duration-400"
                        style={{ color: isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)' }}
                      >
                        {benefit.description}
                      </p>
                    </div>

                    {/* Bottom accent line - solid */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[2px] bg-violet-500/80"
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
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 p-6 bg-violet-500/10 border-l-2 border-violet-500 rounded-r-xl"
            >
              <p className="leading-relaxed text-sm text-white/60">
                <span className="text-white font-medium">This is not a platform price.</span>{" "}
                It is a true market where buyers and sellers meet. <span className="text-violet-400">Your price, your terms.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
