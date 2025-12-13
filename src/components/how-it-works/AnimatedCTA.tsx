import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const AnimatedCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-accent/10"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative p-12 md:p-16 rounded-[2rem] bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-br-[100px]" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-accent/20 to-transparent rounded-tl-[100px]" />

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to start?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                Join thousands of investors building portfolios of premium real-world assets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group text-base px-8 h-14">
                  <Link to="/live-deals">
                    Browse deals
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-8 h-14 border-border/50 hover:border-primary/50">
                  <Link to="/membership">
                    <Crown className="mr-2 w-5 h-5" />
                    Elite access
                  </Link>
                </Button>
              </div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-border/50"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">€50</div>
                  <div className="text-xs text-muted-foreground">Min. invest</div>
                </div>
                <div className="w-px h-10 bg-border/50" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground">Compliant</div>
                </div>
                <div className="w-px h-10 bg-border/50" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Access</div>
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
        className="text-center text-sm text-muted-foreground/60 mt-8 max-w-2xl mx-auto px-4"
      >
        Capital at risk. Target returns not guaranteed. Illiquid securities.
      </motion.p>
    </section>
  );
};
