import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Badge>COMING SOON</Badge>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
            Next-Gen Community <br />
            <span className="text-gradient">Investment Platform</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Invest in real-world slices, receive automated profit distributions, and buy or sell your stake in alternative assets.
          </p>

          <div className="flex justify-center mb-12">
            <Button variant="hero" size="lg" className="group">
              Browse Deals
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* OWN - EARN - EXIT highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <span className="text-primary font-bold text-lg tracking-wider">OWN</span>
              <p className="text-muted-foreground text-sm mt-1">Fractional stakes from €50</p>
            </div>
            <div className="hidden md:block w-px h-8 bg-border/50" />
            <div className="text-center">
              <span className="text-primary font-bold text-lg tracking-wider">EARN</span>
              <p className="text-muted-foreground text-sm mt-1">Automated yield distributions</p>
            </div>
            <div className="hidden md:block w-px h-8 bg-border/50" />
            <div className="text-center">
              <span className="text-primary font-bold text-lg tracking-wider">EXIT</span>
              <p className="text-muted-foreground text-sm mt-1">Trade on secondary market</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};