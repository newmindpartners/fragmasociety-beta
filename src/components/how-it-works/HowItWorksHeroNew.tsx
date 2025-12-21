import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import howItWorksHeroBg from "@/assets/how-it-works-hero-bg.jpg";

export const HowItWorksHeroNew = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
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
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] border border-white/5 rounded-full" />
        <div className="absolute top-[25%] right-[12%] w-[200px] h-[200px] border border-white/10 rounded-full" />
        <div className="absolute bottom-[30%] left-[5%] w-px h-[200px] bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[90vh] flex flex-col justify-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-white/70 font-medium">
                <span className="w-8 h-px bg-white/30" />
                Understanding Fragma
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white leading-[0.95] tracking-tight mb-6"
            >
              How It
              <span className="block font-serif italic text-white/80 mt-2">Works</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-10 font-light"
            >
              From discovering curated opportunities to receiving automated payouts—
              your journey to fractional ownership made effortlessly elegant.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button 
                size="lg"
                className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-8 h-14 text-base font-medium"
              >
                Start Investing
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-14 text-base font-medium bg-transparent"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                Watch Video
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
        <div className="container mx-auto px-6 lg:px-12">
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
                className="py-6 px-4 md:px-8 text-center"
              >
                <p className="text-xl md:text-2xl font-light text-white mb-1">{stat.value}</p>
                <p className="text-[10px] md:text-xs tracking-wider uppercase text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-32 md:bottom-36 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-5 h-5 text-white/40" />
      </motion.div>
    </section>
  );
};