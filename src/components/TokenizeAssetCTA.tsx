import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Building2, Coins, ArrowLeftRight } from "lucide-react";
import { Link } from "react-router-dom";

export const TokenizeAssetCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/15 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Visual flow indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            {[
              { icon: Building2, label: "Your Asset" },
              { icon: Coins, label: "Tokenize" },
              { icon: ArrowLeftRight, label: "Trade" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
                </motion.div>
                {i < 2 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.1, duration: 0.4 }}
                    className="w-12 h-0.5 bg-gradient-to-r from-white/50 to-white/20 mb-6"
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Tokenize & List Your Asset
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Transform real-world assets into tradable digital tokens. From real estate to film rights — 
              launch your offering on Fragma Society with full compliance and secondary market access.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tokenize">
                <Button size="lg" className="group w-full sm:w-auto bg-white text-background hover:bg-white/90">
                  Start Tokenizing
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="group border-white text-white hover:bg-white hover:text-background">
                <Phone className="mr-2 w-4 h-4" />
                Book a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
