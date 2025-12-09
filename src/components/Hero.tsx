import { motion } from "framer-motion";
import { ArrowRight, Coins, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const features = [
  {
    icon: Coins,
    title: "OWN",
    description: "Fractional stakes in real assets",
  },
  {
    icon: TrendingUp,
    title: "EARN",
    description: "Automated yield distribution when assets pay out",
  },
  {
    icon: RefreshCw,
    title: "EXIT",
    description: "Secondary market options for potential liquidity",
  },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Badge>NEW • Tokenized RWA on Cardano</Badge>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
            Next-Gen Community <br />
            <span className="text-gradient">
              Investment Platform
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed">
            Invest in real-world slices, receive automated profit distributions, and buy or sell your stake in alternative assets.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="hero" size="lg" className="group">
              Browse Deals
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
