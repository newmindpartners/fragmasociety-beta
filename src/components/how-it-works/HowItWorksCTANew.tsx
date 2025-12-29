import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctaBg from "@/assets/how-it-works-cta-bg.jpg";
import { EarlyAccessModal } from "@/components/early-access/EarlyAccessModal";

export const HowItWorksCTANew = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={ctaBg} 
          alt="Investment opportunity" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-900/85" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-gradient-radial from-violet-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-1/4 left-1/4 w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] bg-gradient-radial from-violet-600/5 via-transparent to-transparent" />
      </div>
      
      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-6 sm:mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/60">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-violet-400" />
              Start Your Journey
            </span>
          </motion.div>
          
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6"
          >
            Ready to Invest in
            <span className="block font-serif italic text-white/80 mt-1 sm:mt-2">Premium Assets?</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
          >
            Join thousands of investors accessing institutional-grade opportunities. 
            Start with as little as €50 and build a diversified portfolio of real-world assets.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Button 
              size="lg" 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-slate-900 hover:bg-white/90 active:bg-white/80 rounded-full px-8 sm:px-10 h-12 sm:h-14 text-sm sm:text-base font-medium group min-h-[48px]"
            >
              Register Your Interest
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-700/50"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 lg:gap-16">
              {[
                { value: "€50", label: "Minimum Investment" },
                { value: "100%", label: "On-Chain" },
                { value: "24/7", label: "Secondary Trading" },
                { value: "Regulated", label: "Security Tokens" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-xl sm:text-2xl font-light text-white mb-0.5 sm:mb-1">{item.value}</p>
                  <p className="text-[8px] sm:text-[10px] tracking-wider uppercase text-slate-500">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};