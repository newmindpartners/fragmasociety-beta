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
      className="bg-white dark:bg-card rounded-xl border border-border/60 p-6 shadow-sm h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <h3 className="text-sm font-semibold text-foreground">Status</h3>
      </div>

      {/* Timeline */}
      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex gap-4">
            {/* Vertical line */}
            {index < steps.length - 1 && (
              <div 
                className={`absolute left-[11px] top-7 w-0.5 h-[calc(100%-8px)] ${
                  step.completed ? 'bg-primary' : 'border-l-2 border-dashed border-muted-foreground/30'
                }`} 
              />
            )}
            
            {/* Icon */}
            <div className="relative z-10 flex-shrink-0">
              {step.completed ? (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary-foreground" />
                </div>
              ) : step.current ? (
                <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{step.id}</span>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">{step.id}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 pb-6 ${index === steps.length - 1 ? 'pb-0' : ''}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-sm font-medium ${
                  step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
                {step.subtitle && (
                  <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                    {step.subtitle}
                  </span>
                )}
              </div>
              
              {step.description && step.current && (
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {step.description}
                </p>
              )}
              
              {step.action && step.current && (
                <Button 
                  size="sm"
                  className="mt-3 rounded-full h-9 px-4 text-xs font-medium bg-primary hover:bg-primary/90 text-primary-foreground group"
                >
                  {step.action.label}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
