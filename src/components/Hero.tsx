import { motion } from "framer-motion";
import { ArrowRight, Layers, TrendingUp, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";

const highlights = [
  {
    label: "OWN",
    description: "Fractional stakes from €50",
    Icon: Layers
  },
  {
    label: "EARN",
    description: "Automated yield distributions",
    Icon: TrendingUp
  },
  {
    label: "EXIT",
    description: "Trade on secondary market",
    Icon: ArrowRightLeft
  }
];

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

          <div className="flex justify-center mb-16">
            <Button variant="hero" size="lg" className="group">
              Browse Deals
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* OWN - EARN - EXIT highlights */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="group relative"
              >
                {/* Card container */}
                <motion.div 
                  className="relative p-6 rounded-2xl bg-gradient-to-b from-card/60 to-card/30 backdrop-blur-xl border border-white/5 cursor-pointer overflow-hidden"
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Top edge glow */}
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon with animation */}
                  <motion.div
                    className="relative mx-auto mb-3 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.Icon 
                      className="text-primary transition-all duration-300 group-hover:scale-110" 
                      size={24} 
                      strokeWidth={1.5}
                    />
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </motion.div>
                  
                  {/* Label */}
                  <motion.span 
                    className="block text-primary font-bold text-lg tracking-wider mb-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm transition-colors duration-300 group-hover:text-foreground/80">
                    {item.description}
                  </p>
                  
                  {/* Floating particles */}
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-primary/60"
                    initial={{ opacity: 0 }}
                    whileHover={{ 
                      opacity: [0, 0.8, 0],
                      y: [-10, -30],
                      x: [-5, 5]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                  <motion.div
                    className="absolute -bottom-1 left-1/3 w-1.5 h-1.5 rounded-full bg-primary/40"
                    initial={{ opacity: 0 }}
                    whileHover={{ 
                      opacity: [0, 0.6, 0],
                      y: [-10, -25],
                      x: [5, -5]
                    }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3 }}
                  />
                </motion.div>
                
                {/* Connector line (desktop only) */}
                {index < highlights.length - 1 && (
                  <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-border/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};