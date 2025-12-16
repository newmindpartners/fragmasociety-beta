import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import rwaCommercialBg from "@/assets/rwa-commercial.jpg";

export const TokenizeHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image - Blurred */}
      <div className="absolute inset-0">
        <img 
          src={rwaCommercialBg} 
          alt="" 
          className="w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>
      
      {/* Animated ambient glows */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Badge with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-medium">Real-World Tokenization</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-foreground">Real-World Tokenization</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            Use Cases
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
        >
          Discover how businesses across industries are transforming traditional assets into liquid, accessible digital tokens
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Primary button with glow effect */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-white/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Button 
              size="lg" 
              className="relative group bg-white text-background hover:bg-white/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Secondary button with glass effect */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-white/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Button 
              size="lg" 
              variant="outline" 
              className="relative bg-white/5 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-background hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Talk to an Expert
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
