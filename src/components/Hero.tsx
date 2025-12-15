import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Key, Coins, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import { useState, useEffect } from "react";

const highlights = [
  {
    label: "OWN",
    description: "Fractional stakes from €50",
    Icon: Key
  },
  {
    label: "EARN",
    description: "Automated yield distributions",
    Icon: Coins
  },
  {
    label: "EXIT",
    description: "Trade on secondary market",
    Icon: ArrowLeftRight
  }
];

// Dynamic words that cycle through
const dynamicWords = [
  "Real Estate",
  "Film & Entertainment",
  "Luxury Assets",
  "Music Rights",
  "Sports",
  "Credit",
  "ESG & Impact"
];

export const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Loading skeleton */}
        <AnimatePresence>
          {!videoLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-background z-10"
            >
              {/* Animated gradient skeleton */}
              <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background animate-pulse" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Center loading indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/videos/hero-bg.mp4?v=3" type="video/mp4" />
        </video>
        
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.5)_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <Badge>COMING SOON</Badge>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-gradient font-medium tracking-wide mb-6"
          >
            Fractional, liquid, Compliant.
          </motion.p>
          
          {/* Main headline with dynamic word */}
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-serif font-bold text-white leading-tight mb-4">
            Buy and sell Alternative asset
          </h1>
          
          {/* Animated dynamic word */}
          <div className="h-[80px] lg:h-[100px] xl:h-[120px] overflow-hidden relative mb-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                initial={{ y: 80, opacity: 0, rotateX: -45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -80, opacity: 0, rotateX: 45 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="block text-5xl lg:text-7xl xl:text-8xl font-serif font-bold text-gradient"
              >
                {dynamicWords[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Own real-world slices, receive automated distributions, and trade your stake.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center gap-4 mb-16"
          >
            <Button variant="outline" size="lg" className="group border-white text-white hover:bg-white hover:text-background">
              Register your early access
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-white/50 text-xs text-center max-w-md">
              Limited spots available! Register now to secure your place in our exclusive early access program and unlock special launch benefits.
            </p>
          </motion.div>

          {/* Progress indicator for dynamic words */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-2 mb-16"
          >
            {dynamicWords.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentWordIndex 
                    ? "w-8 bg-white" 
                    : "w-2 bg-white/20"
                }`}
              />
            ))}
          </motion.div>

          {/* OWN - EARN - EXIT highlights */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 max-w-3xl mx-auto">
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8 + index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex-1 group"
              >
                <div className="relative h-full p-8 text-center">
                  {/* Subtle border */}
                  <div className="absolute inset-0 rounded-2xl border border-white/[0.08] group-hover:border-primary/30 transition-colors duration-700" />
                  
                  {/* Background glow on hover */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  
                  {/* Icon container */}
                  <motion.div
                    className="relative inline-flex items-center justify-center w-14 h-14 mb-5"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                  {/* Icon ring */}
                    <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-500" />
                    
                    {/* Rotating ring on hover */}
                    <motion.div
                      className="absolute inset-[-2px] rounded-full border border-transparent border-t-white/50"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <item.Icon 
                      className="text-white/70 group-hover:text-white transition-colors duration-500" 
                      size={22} 
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  
                  {/* Label with underline animation */}
                  <div className="relative mb-2">
                    <span className="text-white font-semibold text-base tracking-[0.2em] uppercase">
                      {item.label}
                    </span>
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ width: "60%" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Description */}
                  <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors duration-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
