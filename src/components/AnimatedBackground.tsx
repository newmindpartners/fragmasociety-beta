import { motion } from "framer-motion";

export const AnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Deep gradient base */}
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
    
    {/* Primary liquid orb - large, slow moving */}
    <motion.div
      className="absolute w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full"
      style={{
        background: "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1) 50%, transparent 70%)",
        filter: "blur(80px)",
        top: "-30%",
        left: "-20%",
      }}
      animate={{
        x: [0, 100, 50, 0],
        y: [0, 50, 100, 0],
        scale: [1, 1.1, 0.95, 1],
        rotate: [0, 45, 90, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Secondary orb - accent color, medium */}
    <motion.div
      className="absolute w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] rounded-full"
      style={{
        background: "radial-gradient(circle at 70% 70%, hsl(280 70% 50% / 0.35), hsl(280 70% 50% / 0.1) 50%, transparent 70%)",
        filter: "blur(100px)",
        bottom: "-40%",
        right: "-30%",
      }}
      animate={{
        x: [0, -80, -40, 0],
        y: [0, -60, -120, 0],
        scale: [1, 0.9, 1.15, 1],
        rotate: [0, -30, -60, 0],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Tertiary orb - warm accent */}
    <motion.div
      className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full"
      style={{
        background: "radial-gradient(circle at 50% 50%, hsl(320 80% 55% / 0.3), hsl(320 80% 55% / 0.05) 60%, transparent 80%)",
        filter: "blur(120px)",
        top: "20%",
        right: "-10%",
      }}
      animate={{
        x: [0, -60, 30, 0],
        y: [0, 80, 40, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Small floating accent orb */}
    <motion.div
      className="absolute w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] rounded-full"
      style={{
        background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.5), hsl(var(--primary) / 0.1) 50%, transparent 70%)",
        filter: "blur(60px)",
        top: "50%",
        left: "30%",
      }}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -80, 60, 0],
        scale: [0.8, 1.1, 0.9, 0.8],
        opacity: [0.6, 0.8, 0.5, 0.6],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Subtle cyan accent */}
    <motion.div
      className="absolute w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] rounded-full"
      style={{
        background: "radial-gradient(circle at 40% 60%, hsl(200 80% 50% / 0.2), transparent 60%)",
        filter: "blur(80px)",
        bottom: "10%",
        left: "-15%",
      }}
      animate={{
        x: [0, 70, 35, 0],
        y: [0, -50, 25, 0],
        scale: [1, 0.85, 1.1, 1],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Noise texture overlay for organic feel */}
    <div 
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
    
    {/* Soft vignette */}
    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80" />
  </div>
);
