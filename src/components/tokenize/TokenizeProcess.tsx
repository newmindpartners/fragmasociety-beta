import { motion, useInView } from "framer-motion";
import { ClipboardCheck, Building, Coins, Repeat } from "lucide-react";
import { useRef, useEffect, useState } from "react";

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
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
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
          stroke="hsl(var(--primary))"
          strokeOpacity="0.15"
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
          fill="hsl(var(--primary))"
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

// Individual step component with enhanced animations
const ProcessStep = ({ step, index, isVisible }: { step: typeof steps[0]; index: number; isVisible: boolean }) => {
  const Icon = step.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow ring */}
      <div className="relative mb-8">
        {/* Pulsing outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
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

        {/* Second pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/15"
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
          animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Rotating gradient border */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, hsl(var(--primary)) 0%, transparent 60%, hsl(var(--primary)) 100%)`,
              padding: 2,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full bg-background" />
          </motion.div>

          {/* Static border ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.1)' }}
          />

          {/* Icon container */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </motion.div>

          {/* Step number badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={isVisible ? { scale: 1, rotate: 0 } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.4 + index * 0.2,
              type: "spring",
              stiffness: 200
            }}
            style={{ boxShadow: '0 0 15px hsl(var(--primary) / 0.5)' }}
          >
            <span className="text-primary-foreground font-bold text-sm">{step.number}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="text-center max-w-[220px]"
        animate={isHovered ? { y: -5 } : { y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3 
          className="text-lg font-bold text-foreground mb-3"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
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
  );
};

export const TokenizeProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(220,30%,6%)] to-background" />
      
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
          >
            How Tokenization Works
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
