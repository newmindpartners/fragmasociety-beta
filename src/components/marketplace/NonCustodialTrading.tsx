import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UserPlus, FileText, CreditCard, Coins, TrendingUp, ArrowLeftRight, Play } from "lucide-react";

const steps = [
  { icon: UserPlus, number: "01", title: "Express Interest", time: "5-10 minutes" },
  { icon: FileText, number: "02", title: "Review Documents", time: "15-30 minutes" },
  { icon: CreditCard, number: "03", title: "Subscribe & Fund", time: "1-2 days" },
  { icon: Coins, number: "04", title: "Receive Tokens", time: "Instant" },
  { icon: TrendingUp, number: "05", title: "Earn Distributions", time: "Quarterly" },
  { icon: ArrowLeftRight, number: "06", title: "Trade on Secondary", time: "Anytime" },
];

export const NonCustodialTrading = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#1e293b]" />
            <div className="w-12 h-px bg-slate-300" />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
              Investment Process
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1e293b] leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How it <span className="italic text-slate-400">works</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 mt-6"
          >
            From interest to ownership in six seamless steps.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Steps List */}
          <div className="space-y-2">
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveStep(i)}
                  className={`w-full flex items-center gap-5 p-5 text-left transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#1e293b]' 
                      : 'bg-white border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${
                    isActive 
                      ? 'bg-slate-700 border border-slate-600' 
                      : 'bg-slate-50 border border-slate-200'
                  }`}>
                    <step.icon className={`w-5 h-5 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`} strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${isActive ? 'text-slate-400' : 'text-slate-300'}`}>
                        {step.number}
                      </span>
                      <span className={`font-medium ${isActive ? 'text-white' : 'text-[#1e293b]'}`}>
                        {step.title}
                      </span>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active Step Detail */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1e293b] rounded-2xl overflow-hidden lg:sticky lg:top-32"
          >
            {/* Video Placeholder */}
            <div className="relative h-64 bg-slate-800 flex items-center justify-center">
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-slate-600" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-slate-600" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-slate-600" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-slate-600" />
              
              {/* Icon */}
              <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center">
                {(() => {
                  const StepIcon = steps[activeStep].icon;
                  return <StepIcon className="w-7 h-7 text-slate-400" strokeWidth={1.5} />;
                })()}
              </div>

              {/* Large watermark number */}
              <span 
                className="absolute top-4 right-8 text-[120px] font-extralight text-slate-700/50"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {steps[activeStep].number}
              </span>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <h3 className="text-2xl font-light text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                {steps[activeStep].title}
              </h3>
              <p className="text-slate-400 mb-6">
                Register your interest and complete investor verification (KYC/AML).
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-slate-600" />
                  <span className="text-slate-400">{steps[activeStep].time}</span>
                </div>
                
                {/* Progress dots */}
                <div className="flex items-center gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeStep 
                          ? 'w-5 bg-white' 
                          : 'w-1.5 bg-slate-600 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
