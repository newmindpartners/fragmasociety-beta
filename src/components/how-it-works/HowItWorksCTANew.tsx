import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ctaBg from "@/assets/how-it-works-cta-bg.jpg";

export const HowItWorksCTANew = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
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
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-violet-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-radial from-violet-600/5 via-transparent to-transparent" />
      </div>
      
      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-[0.3em] uppercase text-white/60">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              Start Your Journey
            </span>
          </motion.div>
          
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white leading-[1.05] mb-6"
          >
            Ready to Invest in
            <span className="block font-serif italic text-white/80 mt-2">Premium Assets?</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12"
          >
            Join thousands of investors accessing institutional-grade opportunities. 
            Start with as little as €50 and build a diversified portfolio of real-world assets.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/live-deals">
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-10 h-14 text-base font-medium group"
              >
                Browse Live Deals
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/membership">
              <Button 
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 rounded-full px-10 h-14 text-base font-medium bg-transparent"
              >
                Apply for Elite Access
              </Button>
            </Link>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-16 pt-10 border-t border-slate-700/50"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
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
                  <p className="text-2xl font-light text-white mb-1">{item.value}</p>
                  <p className="text-[10px] tracking-wider uppercase text-slate-500">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};