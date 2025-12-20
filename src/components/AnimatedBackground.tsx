import { motion, useScroll, useTransform } from "framer-motion";

export const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth color transitions based on scroll position
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0.7]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Clean solid background */}
      <motion.div 
        className="absolute inset-0 bg-background"
        style={{ opacity: bgOpacity }}
      />
      
      {/* Primary liquid orb - large, slow moving */}
      <motion.div
        className="absolute w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.25), hsl(var(--primary) / 0.05) 50%, transparent 70%)",
          filter: "blur(120px)",
          top: "-20%",
          left: "-20%",
        }}
        animate={{
          x: [0, 150, 80, 0],
          y: [0, 100, 200, 0],
          scale: [1, 1.15, 0.9, 1],
          rotate: [0, 30, 60, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary orb - accent color, flows through page */}
      <motion.div
        className="absolute w-[100vw] h-[100vw] md:w-[70vw] md:h-[70vw] rounded-full"
        style={{
          background: "radial-gradient(circle at 70% 70%, hsl(280 70% 50% / 0.18), hsl(280 70% 50% / 0.04) 50%, transparent 70%)",
          filter: "blur(140px)",
          top: "30%",
          right: "-30%",
        }}
        animate={{
          x: [0, -120, -60, 0],
          y: [0, 150, -50, 0],
          scale: [1, 0.85, 1.2, 1],
          rotate: [0, -20, -40, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Tertiary orb - warm accent, mid-page */}
      <motion.div
        className="absolute w-[90vw] h-[90vw] md:w-[55vw] md:h-[55vw] rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(320 80% 55% / 0.12), hsl(320 80% 55% / 0.02) 60%, transparent 80%)",
          filter: "blur(160px)",
          top: "60%",
          left: "-15%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -80, 120, 0],
          scale: [1, 1.25, 0.85, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Fourth orb - flows lower on page */}
      <motion.div
        className="absolute w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 40%, hsl(var(--primary) / 0.25), hsl(var(--primary) / 0.05) 50%, transparent 70%)",
          filter: "blur(100px)",
          top: "120%",
          right: "10%",
        }}
        animate={{
          x: [0, -80, 40, 0],
          y: [0, -100, 50, 0],
          scale: [0.9, 1.15, 0.95, 0.9],
          opacity: [0.6, 0.8, 0.5, 0.6],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Fifth orb - subtle cyan, bottom sections */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full"
        style={{
          background: "radial-gradient(circle at 60% 40%, hsl(200 80% 50% / 0.1), transparent 60%)",
          filter: "blur(120px)",
          top: "180%",
          left: "-20%",
        }}
        animate={{
          x: [0, 120, 60, 0],
          y: [0, -60, 80, 0],
          scale: [1, 0.8, 1.15, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Sixth orb - deep purple, very bottom */}
      <motion.div
        className="absolute w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 70%, hsl(260 70% 45% / 0.15), transparent 60%)",
          filter: "blur(150px)",
          top: "250%",
          right: "-25%",
        }}
        animate={{
          x: [0, -100, -50, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.008]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
