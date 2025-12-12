import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Shield, 
  Landmark, 
  TrendingUp, 
  RefreshCw,
  Sparkles,
  Lock,
  Coins,
  CircleDollarSign,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  { 
    icon: Shield, 
    label: "Managed Portfolio",
    description: "Institutional oversight"
  },
  { 
    icon: Landmark, 
    label: "Luxembourg Structure",
    description: "EU-regulated securitisation"
  },
  { 
    icon: TrendingUp, 
    label: "Target Distributions",
    description: "Income-focused returns"
  },
  { 
    icon: RefreshCw, 
    label: "Secondary Market",
    description: "Enhanced liquidity"
  },
];

const floatingOrbs = [
  { size: 300, x: "10%", y: "20%", delay: 0 },
  { size: 200, x: "85%", y: "60%", delay: 1 },
  { size: 150, x: "70%", y: "15%", delay: 2 },
  { size: 100, x: "15%", y: "75%", delay: 0.5 },
];

export const StrategyCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Central glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 bg-gradient-conic from-primary/20 via-transparent to-primary/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Top decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full border border-primary/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-primary/50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              >
                <Coins className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge with shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              Exclusive Investment Vehicle
            </span>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
          </motion.div>
          
          {/* Main heading with gradient */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6"
          >
            <span className="text-foreground">Fragma</span>{" "}
            <span className="text-gradient">One</span>
          </motion.h2>
          
          {/* Subtitle with reveal animation */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            One fund. Broad exposure to real-world yield & digital infrastructure. Powered by the Fragma ecosystem.
          </motion.p>

          {/* Feature cards with staggered animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className="card-premium p-5 h-full flex flex-col items-center text-center shine">
                  {/* Icon with glow effect */}
                  <motion.div 
                    className="relative mb-3"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="icon-premium w-12 h-12">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {feature.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button with premium effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button asChild size="lg" className="group relative overflow-hidden btn-glow px-8 py-6 text-base">
              <Link to="/auth" className="flex items-center gap-3">
                <Lock className="w-4 h-4" />
                <span>Register to view strategy details</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="group px-8 py-6 text-base border-primary/30 hover:border-primary/60 hover:bg-primary/5">
              <Link to="/strategy" className="flex items-center gap-3">
                <CircleDollarSign className="w-4 h-4 text-primary" />
                <span>View Strategy Details</span>
                <Zap className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Luxembourg Securitisation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Professional Governance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Tokenized Notes</span>
            </div>
          </motion.div>

          {/* Risk disclaimer */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="text-xs text-muted-foreground/60 mt-8 max-w-lg mx-auto"
          >
            Capital at risk. Not suitable for everyone. For professional / qualified investors only.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};