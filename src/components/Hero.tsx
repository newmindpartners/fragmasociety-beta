import { motion } from "framer-motion";
import { ArrowRight, Key, Coins, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";

const highlights = [
  {
    label: "OWN",
    description: "Fractional stakes from €50",
    Icon: Key
  },
  {
    label: "EARN",
    description: "Automated yield distributions",
    Icon: Coins
  },
  {
    label: "EXIT",
    description: "Trade on secondary market",
    Icon: ArrowLeftRight
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
          <p className="text-lg md:text-xl text-gradient font-medium tracking-wide mb-4">
            Fractional, liquid, Compliant.
          </p>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
            Buy and sell real world assets.
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Invest in real-world slices, receive automated profit distributions, and buy or sell your stake in alternative assets.
          </p>

          <div className="flex justify-center mb-20">
            <Button variant="hero" size="lg" className="group">
              Browse Deals
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* OWN - EARN - EXIT highlights */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 max-w-3xl mx-auto">
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6 + index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex-1 group"
              >
                <div className="relative h-full p-8 text-center">
                  {/* Subtle border */}
                  <div className="absolute inset-0 rounded-2xl border border-white/[0.08] group-hover:border-primary/30 transition-colors duration-700" />
                  
                  {/* Background glow on hover */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  
                  {/* Icon container */}
                  <motion.div
                    className="relative inline-flex items-center justify-center w-14 h-14 mb-5"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Icon ring */}
                    <div className="absolute inset-0 rounded-full border border-primary/20 group-hover:border-primary/40 transition-colors duration-500" />
                    
                    {/* Rotating ring on hover */}
                    <motion.div
                      className="absolute inset-[-2px] rounded-full border border-transparent border-t-primary/50"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <item.Icon 
                      className="text-primary/70 group-hover:text-primary transition-colors duration-500" 
                      size={22} 
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  
                  {/* Label with underline animation */}
                  <div className="relative mb-2">
                    <span className="text-foreground font-semibold text-base tracking-[0.2em] uppercase">
                      {item.label}
                    </span>
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ width: "60%" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground/70 text-sm group-hover:text-muted-foreground transition-colors duration-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};