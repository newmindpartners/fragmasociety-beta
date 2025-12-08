import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge>NEW • Tokenized RWA on Cardano</Badge>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
            Invest with <br />
            <span className="text-gradient">
              Industry Leaders.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Fragma Society lets you buy fractional stakes in curated real‑world assets – from champion riders to iconic real estate. Built on regulated, bank‑grade infrastructure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button variant="hero" size="lg">Browse live deals</Button>
            <Button variant="outline" size="lg">How it works</Button>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
            <CheckCircle size={12} className="text-primary" /> From €50 per slice 
            <span className="w-1 h-1 bg-muted-foreground rounded-full" /> Non-custodial 
            <span className="w-1 h-1 bg-muted-foreground rounded-full" /> Capital at risk
          </p>
        </motion.div>

        {/* Right Hero Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative glass rounded-2xl p-6 shadow-card max-w-md mx-auto transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            <div className="absolute -top-3 -right-3 w-20 h-20 bg-primary rounded-full blur-2xl opacity-20 animate-pulse" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-muted to-card border-2 border-primary overflow-hidden flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-primary">BB</span>
              </div>
              <div>
                <h3 className="text-foreground font-bold text-lg">Bryan Balsinger</h3>
                <p className="text-primary text-sm">Elite Show Jumping Portfolio</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background/50 p-3 rounded-lg border border-foreground/5">
                <p className="text-xs text-muted-foreground">Target Yield</p>
                <p className="text-foreground font-mono font-bold text-lg">12-18%</p>
              </div>
              <div className="bg-background/50 p-3 rounded-lg border border-foreground/5">
                <p className="text-xs text-muted-foreground">Min Ticket</p>
                <p className="text-foreground font-mono font-bold text-lg">€250</p>
              </div>
            </div>

            <div className="w-full h-1 bg-muted rounded-full mb-6 overflow-hidden">
              <div className="w-[72%] h-full bg-primary shadow-turquoise" />
            </div>
            
            <Button className="w-full">Join Deal</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
