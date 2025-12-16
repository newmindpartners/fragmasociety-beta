import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ctaBg from "@/assets/animated-cta-bg.jpg";

export const AnimatedCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-background/60" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Glass card */}
          <div className="relative p-12 md:p-16 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-br-[100px]" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-[100px]" />

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
                Ready to start?
              </h2>
              <p className="text-lg text-white/60 mb-8 max-w-lg mx-auto">
                Join thousands of investors building portfolios of premium real-world assets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group text-base px-8 h-14 bg-white text-background hover:bg-white/90 font-semibold">
                  <Link to="/live-deals">
                    Browse deals
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-8 h-14 border-white text-white hover:bg-white hover:text-background">
                  <Link to="/membership">
                    <Crown className="mr-2 w-5 h-5" />
                    Elite access
                  </Link>
                </Button>
              </div>

              {/* Trust badges - white text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">€50</div>
                  <div className="text-xs text-white/50">Min. invest</div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-white/50">Compliant</div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-white/50">Access</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risk disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center text-sm text-white/40 mt-8 max-w-2xl mx-auto px-4"
      >
        Capital at risk. Target returns not guaranteed. Illiquid securities.
      </motion.p>
    </section>
  );
};