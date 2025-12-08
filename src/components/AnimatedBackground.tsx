import { motion } from "framer-motion";

export const AnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Deep Gradient Base */}
    <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
    
    {/* Floating Orbs */}
    <motion.div 
      animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"
    />
    <motion.div 
      animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]"
    />
    
    {/* Ripple Effect */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-20">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-primary/20 rounded-full"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 8, repeat: Infinity, delay: i * 2, ease: "easeOut" }}
        />
      ))}
    </div>
  </div>
);
