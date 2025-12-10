import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const StrategyCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-card via-background to-card relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            FRAGMA STRATEGY
          </span>
          
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Invest With Us
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Income-focused strategy with regular distributions. Combining real-world 
            and digital infrastructure assets in a Luxembourg securitisation structure.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground text-sm">Luxembourg Structure</span>
            </div>
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-muted-foreground text-sm">Income + Growth</span>
            </div>
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-muted-foreground text-sm">Secondary Liquidity</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="group">
              <Link to="/auth">
                Access Investor Portal
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Capital at risk. Not suitable for everyone. For professional / qualified investors only.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
