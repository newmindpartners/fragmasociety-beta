import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, UserCheck, Briefcase, FileSignature, CreditCard, Vault, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface StatusStep {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  completed: boolean;
  current: boolean;
  icon: LucideIcon;
  action?: {
    label: string;
    deadline?: string;
  };
}

const stepVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.1 + 0.2,
      duration: 0.6,
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  }),
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: {
      delay: i * 0.1 + 0.3,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

export const InvestmentStatus = () => {
  const steps: StatusStep[] = [
    {
      id: 1,
      title: "Verify Identity",
      subtitle: "KYC Required",
      description: "Complete identity verification to proceed with your investment.",
      completed: true,
      current: false,
      icon: UserCheck,
    },
    {
      id: 2,
      title: "Select Your Investment Deal",
      subtitle: "Browse Deals",
      description: "Choose from our curated selection of premium investment opportunities.",
      completed: true,
      current: false,
      icon: Briefcase,
    },
    {
      id: 3,
      title: "Review and Sign Documents",
      subtitle: "by 01.08.25",
      description: "Review all legal documents and sign electronically to proceed.",
      completed: false,
      current: true,
      icon: FileSignature,
      action: {
        label: "Sign Documents",
      },
    },
    {
      id: 4,
      title: "Payment Processing",
      description: "Your payment is being securely processed.",
      completed: false,
      current: false,
      icon: CreditCard,
    },
    {
      id: 5,
      title: "Funds in Escrow",
      subtitle: "Up to 3 months",
      description: "Your funds are held securely until the deal closes.",
      completed: false,
      current: false,
      icon: Vault,
    },
    {
      id: 6,
      title: "Investment Complete",
      description: "Congratulations! Your investment is now active.",
      completed: false,
      current: false,
      icon: Trophy,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="relative overflow-hidden rounded-2xl h-full flex flex-col"
      style={{
        background: 'linear-gradient(165deg, #1e2a4a 0%, #141d35 50%, #0d1526 100%)',
      }}
    >
      {/* Studio spotlight effects */}
      <motion.div 
        className="absolute -top-10 -right-10 w-72 h-72 rounded-full pointer-events-none"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 60%)',
        }}
      />
      <motion.div 
        className="absolute top-1/3 -left-20 w-56 h-56 rounded-full pointer-events-none"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
        }}
      />
      <motion.div 
        className="absolute -bottom-8 right-1/3 w-40 h-40 rounded-full pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2.5 mb-6"
        >
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </div>
          <h3 className="text-sm font-semibold text-white/95 tracking-wide">Investment Progress</h3>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex-1 space-y-1">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            
            return (
              <motion.div 
                key={step.id} 
                className="relative flex gap-4"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={stepVariants}
              >
                {/* Vertical line */}
                {index < steps.length - 1 && (
                  <motion.div 
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={lineVariants}
                    className="absolute left-[15px] top-9 w-px h-[calc(100%-8px)] origin-top"
                    style={{
                      background: step.completed 
                        ? 'linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary) / 0.3))' 
                        : 'linear-gradient(to bottom, hsl(var(--muted) / 0.3), transparent)',
                    }}
                  />
                )}
                
                {/* Icon Container */}
                <motion.div 
                  className="relative z-10 flex-shrink-0"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                >
                  {step.completed ? (
                    <motion.div 
                      className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  ) : step.current ? (
                    <motion.div 
                      animate={{ 
                        boxShadow: ['0 0 15px rgba(139,92,246,0.3)', '0 0 30px rgba(139,92,246,0.5)', '0 0 15px rgba(139,92,246,0.3)'],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-8 h-8 rounded-xl bg-primary/20 border-2 border-primary flex items-center justify-center backdrop-blur-sm"
                    >
                      <StepIcon className="w-4 h-4 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderColor: "rgba(255,255,255,0.2)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <StepIcon className="w-4 h-4 text-white/30" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Content Card */}
                <motion.div 
                  className={`flex-1 pb-4 ${index === steps.length - 1 ? 'pb-0' : ''}`}
                  whileHover={step.current ? { x: 4 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className={`rounded-xl p-3 transition-all duration-300 ${
                      step.current 
                        ? 'bg-white/5 border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.1)]' 
                        : step.completed 
                          ? 'bg-white/[0.02]' 
                          : ''
                    }`}
                    whileHover={step.current ? { 
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderColor: "rgba(139,92,246,0.5)",
                    } : {}}
                  >
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`text-sm font-medium transition-colors ${
                        step.completed ? 'text-white/80' : step.current ? 'text-white' : 'text-white/40'
                      }`}>
                        {step.title}
                      </span>
                      {step.subtitle && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                          className={`text-[10px] px-2 py-0.5 rounded-full border ${
                            step.current 
                              ? 'bg-primary/20 text-primary border-primary/30' 
                              : step.completed 
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                                : 'bg-white/5 text-white/50 border-white/10'
                          }`}
                        >
                          {step.subtitle}
                        </motion.span>
                      )}
                      {step.completed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                          className="text-[10px] text-emerald-400 font-medium"
                        >
                          ✓ Complete
                        </motion.span>
                      )}
                    </div>
                    
                    {step.description && step.current && (
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-xs text-white/50 mt-2 leading-relaxed"
                      >
                        {step.description}
                      </motion.p>
                    )}
                    
                    {step.action && step.current && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                      >
                        <Button 
                          size="sm"
                          className="mt-3 rounded-full h-9 px-5 text-xs font-semibold bg-primary hover:bg-primary/90 text-white group shadow-[0_8px_30px_rgba(139,92,246,0.25)] hover:shadow-[0_8px_40px_rgba(139,92,246,0.4)] transition-all duration-300"
                        >
                          <motion.span
                            className="flex items-center"
                            whileHover={{ x: 2 }}
                          >
                            {step.action.label}
                            <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </motion.span>
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-white/60">Overall Progress</span>
            <span className="text-primary font-semibold">2 of 6 Complete</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "33%" }}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
              style={{
                boxShadow: '0 0 10px rgba(139,92,246,0.5)',
              }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Edge highlights */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </motion.div>
  );
};