import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ClipboardCheck, Building, Coins, Repeat } from "lucide-react";
import { useRef, useState, MouseEvent } from "react";

const steps = [
  {
    number: "1",
    icon: ClipboardCheck,
    title: "Issuer Onboarding",
    description: "Complete due diligence, KYC/KYB, asset documentation, and valuation"
  },
  {
    number: "2",
    icon: Building,
    title: "Compartment Creation",
    description: "Dedicated legal structure created, fully ring-fenced and compliant"
  },
  {
    number: "3",
    icon: Coins,
    title: "Token Issuance",
    description: "Digital tokens created and made available for investor subscription"
  },
  {
    number: "4",
    icon: Repeat,
    title: "Automated Operations",
    description: "Income flows back, distributions automated, tokens tradable 24/7"
  }
];

// Animated connection line between steps
const ConnectionLine = ({ index, isVisible }: { index: number; isVisible: boolean }) => {
  return (
    <div className="hidden lg:block absolute top-[60px] h-[2px] w-full">
      <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`lineGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="50%" stopColor="rgba(255,255,255,1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
          </linearGradient>
          <filter id={`glow-${index}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Base line */}
        <motion.line
          x1="60"
          y1="4"
          x2="calc(100% - 60px)"
          y2="4"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Animated flowing line */}
        <motion.line
          x1="60"
          y1="4"
          x2="calc(100% - 60px)"
          y2="4"
          stroke={`url(#lineGradient-${index})`}
          strokeWidth="2"
          strokeLinecap="round"
          filter={`url(#glow-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { 
            pathLength: 1, 
            opacity: 1,
          } : {}}
          transition={{ 
            duration: 1.2, 
            delay: 0.3 + index * 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
        />

        {/* Traveling particle */}
        <motion.circle
          r="4"
          fill="white"
          filter={`url(#glow-${index})`}
          initial={{ opacity: 0 }}
          animate={isVisible ? {
            opacity: [0, 1, 1, 0],
            cx: ["60", "calc(100% - 60px)", "calc(100% - 60px)", "calc(100% - 60px)"],
            cy: [4, 4, 4, 4],
          } : {}}
          transition={{
            duration: 2,
            delay: 0.5 + index * 0.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      </svg>
    </div>
  );
};

// Individual step component with 3D tilt effect
const ProcessStep = ({ step, index, isVisible }: { step: typeof steps[0]; index: number; isVisible: boolean }) => {
  const Icon = step.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });

  // Glare effect position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
    stiffness: 300,
    damping: 30,
  });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate normalized position (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative flex flex-col items-center cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      {/* 3D Tilt Card Container */}
      <motion.div
        className="relative"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none z-20 opacity-0"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            opacity: isHovered ? 0.8 : 0,
          }}
        />

        {/* Outer glow ring */}
        <div className="relative mb-8">
          {/* Pulsing outer ring - WHITE */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 1, opacity: 0 }}
            animate={isVisible ? {
              scale: [1, 1.4, 1.4],
              opacity: [0, 0.3, 0],
            } : {}}
            transition={{
              duration: 2.5,
              delay: 0.5 + index * 0.2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeOut"
            }}
            style={{ width: 120, height: 120, left: -10, top: -10 }}
          />

          {/* Second pulse ring - WHITE */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/15"
            initial={{ scale: 1, opacity: 0 }}
            animate={isVisible ? {
              scale: [1, 1.6, 1.6],
              opacity: [0, 0.2, 0],
            } : {}}
            transition={{
              duration: 2.5,
              delay: 0.8 + index * 0.2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeOut"
            }}
            style={{ width: 120, height: 120, left: -10, top: -10 }}
          />

          {/* Main circle container */}
          <motion.div
            className="relative w-[100px] h-[100px]"
            animate={isHovered ? { scale: 1.1, z: 30 } : { scale: 1, z: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Rotating gradient border - WHITE */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, rgba(255,255,255,0.8) 0%, transparent 60%, rgba(255,255,255,0.8) 100%)`,
                padding: 2,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-background" />
            </motion.div>

            {/* Static border ring - WHITE */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-white/40"
              style={{ 
                boxShadow: isHovered 
                  ? '0 0 40px rgba(255,255,255,0.5), inset 0 0 30px rgba(255,255,255,0.2)' 
                  : '0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)',
                transition: 'box-shadow 0.3s ease'
              }}
            />

            {/* Icon container with 3D lift - WHITE */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={isHovered ? { z: 20 } : { z: 0 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Step number badge - WHITE */}
            <motion.div
              className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={isVisible ? { 
                scale: isHovered ? 1.2 : 1, 
                rotate: 0,
                z: isHovered ? 40 : 0,
              } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + index * 0.2,
                type: "spring",
                stiffness: 200
              }}
              style={{ 
                boxShadow: isHovered 
                  ? '0 10px 30px rgba(255,255,255,0.6)' 
                  : '0 0 15px rgba(255,255,255,0.5)',
                transformStyle: "preserve-3d"
              }}
            >
              <span className="text-background font-bold text-sm">{step.number}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Content with 3D depth */}
        <motion.div 
          className="text-center max-w-[220px]"
          animate={isHovered ? { y: -8, z: 15 } : { y: 0, z: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.h3 
            className="text-lg font-bold text-foreground mb-3"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
            style={{
              textShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
              transition: 'text-shadow 0.3s ease'
            }}
          >
            {step.title}
          </motion.h3>
          <motion.p 
            className="text-sm text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
          >
            {step.description}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const TokenizeProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background with turquoise studio spotlight */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Top turquoise spotlight */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px]"
        style={{
          background: 'radial-gradient(ellipse at center top, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.08) 30%, transparent 70%)',
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary turquoise glow spots */}
      <motion.div
        className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.8, 0.5, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Center ambient glow - turquoise */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] rounded-full blur-[150px]"
        style={{
          background: 'hsl(var(--primary) / 0.1)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles - white */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/40"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
          >
            <span className="text-foreground">How </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Tokenization
            </span>
            <span className="text-foreground"> Works</span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A simple, compliant process from asset to token
          </motion.p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <ProcessStep step={step} index={index} isVisible={isInView} />
                
                {/* Connection line (between steps) */}
                {index < steps.length - 1 && (
                  <ConnectionLine index={index} isVisible={isInView} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
