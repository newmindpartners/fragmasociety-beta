import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const FundCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-card via-navy-surface to-card relative overflow-hidden">
      {/* Background glow */}
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
            FRAGMA FUND
          </span>
          
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Invest With Us
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Secured yield & growth from real-world and digital infrastructure. 
            Targeting 8-12% annual distributions with institutional-grade governance.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-primary font-bold">8%</span>
              <span className="text-muted-foreground text-sm ml-1">Floor Objective</span>
            </div>
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-primary font-bold">10-12%</span>
              <span className="text-muted-foreground text-sm ml-1">Target Range</span>
            </div>
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-primary font-bold">Luxembourg</span>
              <span className="text-muted-foreground text-sm ml-1">Structure</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="group">
              <Link to="/fund">
                Explore Fragma Fund
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/fund#process">
                Request PPM
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            For professional / qualified investors only. Objectives, not guarantees.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
