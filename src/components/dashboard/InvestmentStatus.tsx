import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatusStep {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  completed: boolean;
  current: boolean;
  action?: {
    label: string;
    deadline?: string;
  };
}

export const InvestmentStatus = () => {
  const steps: StatusStep[] = [
    {
      id: 1,
      title: "Order Submitted",
      completed: true,
      current: false,
    },
    {
      id: 2,
      title: "Verify Identity",
      subtitle: "by 01.08.25",
      description: "Investments cannot be completed until your identity is confirmed.",
      completed: false,
      current: true,
      action: {
        label: "Verify Identity Now",
      },
    },
    {
      id: 3,
      title: "Payment Processing",
      completed: false,
      current: false,
    },
    {
      id: 4,
      title: "Funds In Escrow (Held Up To 3 Months)",
      completed: false,
      current: false,
    },
    {
      id: 5,
      title: "Investment Complete",
      completed: false,
      current: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="relative overflow-hidden rounded-2xl h-full flex flex-col"
      style={{
        background: 'linear-gradient(145deg, hsl(225 65% 10%), hsl(230 50% 4%))',
      }}
    >
      {/* Subtle glow effect */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse" />
          <h3 className="text-sm font-semibold text-white tracking-wide">Status</h3>
        </div>

        {/* Timeline */}
        <div className="relative flex-1">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex gap-4">
              {/* Vertical line */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute left-[13px] top-8 w-0.5 h-[calc(100%-12px)] ${
                    step.completed 
                      ? 'bg-gradient-to-b from-primary to-primary/50' 
                      : 'border-l-2 border-dashed border-white/20'
                  }`} 
                />
              )}
              
              {/* Icon */}
              <div className="relative z-10 flex-shrink-0">
                {step.completed ? (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 ring-2 ring-primary/20">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                ) : step.current ? (
                  <div className="w-7 h-7 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="text-xs font-bold text-primary">{step.id}</span>
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs font-medium text-white/50">{step.id}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 pb-6 ${index === steps.length - 1 ? 'pb-0' : ''}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-medium ${
                    step.completed || step.current ? 'text-white' : 'text-white/50'
                  }`}>
                    {step.title}
                  </span>
                  {step.subtitle && (
                    <span className="text-[10px] bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full text-white/70 border border-white/10">
                      {step.subtitle}
                    </span>
                  )}
                </div>
                
                {step.description && step.current && (
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed max-w-[280px]">
                    {step.description}
                  </p>
                )}
                
                {step.action && step.current && (
                  <Button 
                    size="sm"
                    className="mt-3 rounded-full h-10 px-5 text-xs font-semibold bg-primary hover:bg-primary/90 text-white group shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40"
                  >
                    {step.action.label}
                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </motion.div>
  );
};
