import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, TrendingUp, Wallet } from "lucide-react";

// Real asset images for the hero showcase
const assetShowcase = [
  { 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    title: "Luxury Villa",
    price: "€2.4M",
    change: "+12.5%"
  },
  { 
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    title: "Commercial Tower",
    price: "€8.2M",
    change: "+8.3%"
  },
  { 
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
    title: "Private Credit",
    price: "€1.2M",
    change: "+15.2%"
  },
];

const FloatingAssetCard = ({ asset, index }: { asset: typeof assetShowcase[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -3 : 3 }}
    animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
    transition={{ delay: 0.3 + index * 0.15, duration: 0.8, type: "spring" }}
    whileHover={{ scale: 1.05, rotate: 0, y: -10 }}
    className="absolute glass-light rounded-2xl overflow-hidden shadow-light cursor-pointer group"
    style={{
      width: "220px",
      top: index === 0 ? "10%" : index === 1 ? "35%" : "60%",
      right: index === 0 ? "5%" : index === 1 ? "25%" : "10%",
      zIndex: 10 - index,
    }}
  >
    <div className="relative h-32 overflow-hidden">
      <img 
        src={asset.image} 
        alt={asset.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <motion.div 
        className="absolute bottom-3 left-3 right-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + index * 0.1 }}
      >
        <p className="text-white font-semibold text-sm">{asset.title}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-white/90 text-xs">{asset.price}</span>
          <span className="text-green-400 text-xs font-medium">{asset.change}</span>
        </div>
      </motion.div>
    </div>
    <div className="p-3 bg-white">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">24h Volume</span>
        <span className="text-xs font-medium text-slate-700">€{(Math.random() * 500 + 100).toFixed(0)}K</span>
      </div>
    </div>
  </motion.div>
);

const StatCard = ({ icon: Icon, value, label, delay }: { icon: any; value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
  >
    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/60">{label}</p>
    </div>
  </motion.div>
);

export const MarketplaceHero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-surface" />
      
      {/* Animated mesh gradient */}
      <motion.div
        animate={{ 
          background: [
            "radial-gradient(circle at 20% 30%, hsl(172 83% 50% / 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 50%, hsl(172 83% 50% / 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, hsl(172 83% 50% / 0.15) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0"
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/30"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-primary">Secondary Marketplace</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 tracking-tight">
                Trade real assets.
                <br />
                <span className="text-gradient">Your terms.</span>
              </h1>
              
              <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                The world's first non-custodial marketplace for tokenized real-world assets. 
                Set your price. Trade 24/7. Full ownership, always.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <StatCard icon={TrendingUp} value="€24M+" label="Trading Volume" delay={0.4} />
              <StatCard icon={Shield} value="100%" label="Non-Custodial" delay={0.5} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button size="lg" className="group text-lg px-8 py-6 bg-white text-navy hover:bg-white/90 rounded-xl">
                Start Trading
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 rounded-xl group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 pt-6 border-t border-white/10"
            >
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm text-white/50">Your keys, your assets</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-white/50">Cardano powered</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Floating Asset Cards */}
          <div className="hidden lg:block relative h-[600px]">
            {assetShowcase.map((asset, i) => (
              <FloatingAssetCard key={i} asset={asset} index={i} />
            ))}
            
            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-primary/20 rounded-full pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
