import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import howItWorksHeroBg from "@/assets/how-it-works-hero-bg.jpg";

export const HowItWorksHeroNew = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={howItWorksHeroBg} 
          alt="Investment background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90" />
      </div>
      
      {/* Elegant geometric accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[5%] sm:right-[10%] w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] border border-white/5 rounded-full" />
        <div className="absolute top-[25%] right-[8%] sm:right-[12%] w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] border border-white/10 rounded-full" />
        <div className="absolute bottom-[30%] left-[5%] w-px h-[100px] sm:h-[200px] bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center pt-16 pb-32 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 sm:mb-8"
            >
              <span className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/70 font-medium">
                <span className="w-6 sm:w-8 h-px bg-white/30" />
                Understanding Fragma
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white leading-[0.95] tracking-tight mb-4 sm:mb-6"
            >
              How It
              <span className="block font-serif italic text-white/80 mt-1 sm:mt-2">Works</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-8 sm:mb-10 font-light"
            >
              From discovering curated opportunities to receiving automated payouts—
              your journey to fractional ownership made effortlessly elegant.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button 
                size="lg"
                className="bg-white text-slate-900 hover:bg-white/90 active:bg-white/80 rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-medium min-h-[48px]"
              >
                Start Investing
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/90 to-slate-900/80 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "€50", label: "Minimum Investment" },
              { value: "24/7", label: "Secondary Trading" },
              { value: "100%", label: "On-Chain Settlement" },
              { value: "Real-Time", label: "Yield Distribution" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="py-4 sm:py-6 px-2 sm:px-4 md:px-8 text-center"
              >
                <p className="text-lg sm:text-xl md:text-2xl font-light text-white mb-0.5 sm:mb-1">{stat.value}</p>
                <p className="text-[8px] sm:text-[10px] md:text-xs tracking-wider uppercase text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        className="absolute bottom-28 sm:bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-5 h-5 text-white/40" />
      </motion.div>
    </section>
  );
};