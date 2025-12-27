import { motion } from "framer-motion";
import { HelpCircle, ArrowDown } from "lucide-react";

export const FAQHero = () => {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-40 pb-16 sm:pb-20 lg:pb-32 overflow-hidden bg-slate-900">
      {/* Dark Background with subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Decorative elements - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <motion.div
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-turquoise/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [10, -10, 10], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-10 right-[10%] w-96 h-96 rounded-full bg-white/5 blur-3xl"
        />
        
        {/* Geometric accents */}
        <div className="absolute top-1/4 right-[15%] w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-1/4 left-[15%] w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 rounded-full bg-white/5 border border-white/10"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-turquoise/20 flex items-center justify-center">
              <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-turquoise" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase text-white/60">
              Help Center
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light text-white leading-[1.1] tracking-tight mb-4 sm:mb-6"
          >
            Frequently Asked
            <span className="block mt-1 sm:mt-2 text-turquoise font-normal italic">Questions</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/50 leading-relaxed max-w-xl mx-auto mb-8 sm:mb-12 px-2"
          >
            Everything you need to know about investing in tokenized assets 
            on the Fragma Society platform.
          </motion.p>

          {/* Scroll indicator - hidden on small mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden sm:block"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5"
            >
              <ArrowDown className="w-4 h-4 text-white/40" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};
