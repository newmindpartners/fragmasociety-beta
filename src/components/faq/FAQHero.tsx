import { motion } from "framer-motion";
import { HelpCircle, ArrowDown } from "lucide-react";

export const FAQHero = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Premium Light Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-slate-50" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-turquoise/10 to-cyan-300/5 blur-3xl"
        />
        <motion.div
          animate={{ y: [10, -10, 10], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-10 right-[10%] w-96 h-96 rounded-full bg-gradient-to-tl from-slate-200/40 to-slate-100/20 blur-3xl"
        />
        
        {/* Geometric accents */}
        <div className="absolute top-1/4 right-[15%] w-px h-32 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
        <div className="absolute bottom-1/4 left-[15%] w-px h-24 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full bg-white border border-slate-200 shadow-sm"
          >
            <div className="w-6 h-6 rounded-full bg-turquoise/10 flex items-center justify-center">
              <HelpCircle className="w-3.5 h-3.5 text-turquoise" />
            </div>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-600">
              Help Center
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light text-slate-900 leading-[1.1] tracking-tight mb-6"
          >
            Frequently Asked
            <span className="block mt-2 text-turquoise font-normal italic">Questions</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl mx-auto mb-12"
          >
            Everything you need to know about investing in tokenized assets 
            on the Fragma Society platform.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white/80"
            >
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
};
