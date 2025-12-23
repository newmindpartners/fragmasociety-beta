import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SupportSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-gradient-to-br from-accent/50 via-background to-primary/5 rounded-xl border border-border p-6 shadow-sm h-full"
    >
      {/* Decorative dots */}
      <div className="flex gap-1 mb-4">
        <div className="w-2 h-2 rounded-full bg-primary/60" />
        <div className="w-2 h-2 rounded-full bg-primary/40" />
        <div className="w-2 h-2 rounded-full bg-primary/20" />
      </div>

      <h3 className="text-lg font-serif font-semibold text-foreground mb-1 leading-snug">
        Need help? <span className="text-muted-foreground font-normal">Our Support team</span>
      </h3>
      <p className="text-lg font-serif text-muted-foreground mb-5">
        is here to assist you.
      </p>

      <Button 
        variant="outline"
        className="rounded-full px-5 h-9 font-medium group border-border text-foreground hover:bg-accent hover:text-primary hover:border-primary/40 transition-all duration-200"
      >
        Support
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};
