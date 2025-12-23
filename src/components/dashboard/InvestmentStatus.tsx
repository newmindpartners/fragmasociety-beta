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
        background: 'linear-gradient(165deg, hsl(225 45% 12%) 0%, hsl(228 50% 6%) 50%, hsl(230 55% 4%) 100%)',
      }}
    >
      {/* Studio spotlight effects */}
      <div 
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, hsl(262 70% 50% / 0.15) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-1/2 -left-32 w-64 h-64 rounded-full pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(220 60% 40% / 0.12) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute -bottom-16 right-1/4 w-48 h-48 rounded-full pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(262 60% 45% / 0.1) 0%, transparent 70%)',
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </div>
          <h3 className="text-sm font-semibold text-white/95 tracking-wide">Status</h3>
        </div>

        {/* Timeline */}
        <div className="relative flex-1">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex gap-4">
              {/* Vertical line */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute left-[13px] top-8 w-px h-[calc(100%-12px)] ${
                    step.completed 
                      ? 'bg-gradient-to-b from-primary via-primary/60 to-primary/20' 
                      : 'border-l border-dashed border-white/15'
                  }`} 
                />
              )}
              
              {/* Icon */}
              <div className="relative z-10 flex-shrink-0">
                {step.completed ? (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                ) : step.current ? (
                  <motion.div 
                    animate={{ boxShadow: ['0 0 15px rgba(139,92,246,0.2)', '0 0 25px rgba(139,92,246,0.35)', '0 0 15px rgba(139,92,246,0.2)'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-7 h-7 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center backdrop-blur-sm"
                  >
                    <span className="text-xs font-bold text-primary">{step.id}</span>
                  </motion.div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-white/40">{step.id}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 pb-6 ${index === steps.length - 1 ? 'pb-0' : ''}`}>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className={`text-sm font-medium transition-colors ${
                    step.completed ? 'text-white/90' : step.current ? 'text-white' : 'text-white/40'
                  }`}>
                    {step.title}
                  </span>
                  {step.subtitle && (
                    <span className="text-[10px] bg-white/8 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-white/60 border border-white/10">
                      {step.subtitle}
                    </span>
                  )}
                </div>
                
                {step.description && step.current && (
                  <p className="text-xs text-white/50 mt-1.5 leading-relaxed max-w-[260px]">
                    {step.description}
                  </p>
                )}
                
                {step.action && step.current && (
                  <Button 
                    size="sm"
                    className="mt-4 rounded-full h-10 px-5 text-xs font-semibold bg-primary hover:bg-primary/90 text-white group shadow-[0_8px_30px_rgba(139,92,246,0.25)] hover:shadow-[0_8px_40px_rgba(139,92,246,0.35)] transition-all duration-300"
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
      
      {/* Edge highlights */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </motion.div>
  );
};
