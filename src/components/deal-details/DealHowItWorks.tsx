import { motion } from "framer-motion";
import { 
  UserCheck, 
  FileText, 
  CreditCard, 
  Coins, 
  TrendingUp, 
  ArrowRightLeft,
  Check
} from "lucide-react";
import { useState } from "react";

const steps = [
  {
    icon: UserCheck,
    title: "Express Interest",
    description: "Register your interest and complete investor verification (KYC/AML).",
    detail: "5-10 minutes",
  },
  {
    icon: FileText,
    title: "Review Documents",
    description: "Access full documentation including term sheet and risk disclosures.",
    detail: "Full access",
  },
  {
    icon: CreditCard,
    title: "Subscribe & Fund",
    description: "Complete subscription and transfer funds securely.",
    detail: "Bank or crypto",
  },
  {
    icon: Coins,
    title: "Receive Tokens",
    description: "Tokens representing your ownership are issued to your wallet.",
    detail: "Non-custodial",
  },
  {
    icon: TrendingUp,
    title: "Earn Distributions",
    description: "Receive automated payouts directly to your wallet.",
    detail: "Automated",
  },
  {
    icon: ArrowRightLeft,
    title: "Trade on Secondary",
    description: "List your position on the Fragma secondary marketplace. Liquidity is not guaranteed.",
    detail: "Subject to market conditions",
  },
];

export const DealHowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-32 relative overflow-hidden bg-white">
      {/* Sophisticated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-radial from-violet-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-radial from-slate-100/60 to-transparent rounded-full blur-3xl" />
        
        {/* Elegant grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Premium Header */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-5 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-slate-900" />
              <div className="w-16 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            </div>
            <span className="text-xs tracking-[0.35em] uppercase text-slate-500 font-semibold">
              Investment Process
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] mb-6"
          >
            How it <br />
            <span className="relative inline-block">
              <span className="italic font-serif text-slate-700">works</span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-slate-800 via-slate-600 to-transparent rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 font-light max-w-xl"
          >
            From interest to ownership in six seamless steps. Our streamlined process makes investing in premium real estate simple and secure.
          </motion.p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left: Step Navigation */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />
              
              {/* Progress line */}
              <motion.div 
                className="absolute left-6 top-0 w-px bg-gradient-to-b from-slate-900 via-slate-600 to-slate-400"
                initial={{ height: 0 }}
                animate={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {/* Steps */}
              <div className="space-y-2">
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isPast = index < activeStep;
                  const StepIcon = step.icon;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setActiveStep(index)}
                        whileHover={{ x: isActive ? 0 : 4 }}
                        className={`group relative flex items-start gap-6 p-5 cursor-pointer rounded-2xl transition-all duration-500 ${
                          isActive 
                            ? 'bg-slate-900 shadow-2xl shadow-slate-900/20' 
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Step indicator */}
                        <motion.div 
                          className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                            isActive 
                              ? 'bg-slate-800 shadow-lg' 
                              : isPast 
                                ? 'bg-slate-900' 
                                : 'bg-white border-2 border-slate-200 group-hover:border-slate-300 group-hover:shadow-md'
                          }`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          {isPast ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 20 }}
                            >
                              <Check className="w-5 h-5 text-white" />
                            </motion.div>
                          ) : (
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <StepIcon className={`w-5 h-5 transition-colors duration-300 ${
                                isActive || isPast ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                              }`} />
                            </motion.div>
                          )}
                        </motion.div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-mono transition-colors duration-500 ${
                            isActive ? 'text-slate-400' : 'text-slate-400'
                          }`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className={`w-8 h-px transition-colors duration-500 ${
                            isActive ? 'bg-slate-600' : 'bg-slate-200'
                          }`} />
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-500 ${
                            isActive 
                              ? 'bg-white/10' 
                              : 'bg-slate-100'
                          }`}>
                            <StepIcon className={`w-3.5 h-3.5 transition-colors duration-500 ${
                              isActive ? 'text-white' : 'text-slate-500'
                            }`} />
                          </div>
                        </div>
                        <h3 className={`text-lg font-medium transition-colors duration-500 ${
                          isActive ? 'text-white' : 'text-slate-900'
                        }`}>
                          {step.title}
                        </h3>
                        
                        {/* Expanded content for active step */}
                        <motion.div
                          initial={false}
                          animate={{ 
                            height: isActive ? 'auto' : 0,
                            opacity: isActive ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-slate-400 leading-relaxed mt-2 mb-3">
                            {step.description}
                          </p>
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                            {step.detail}
                          </span>
                        </motion.div>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div 
                          layoutId="activeStep"
                          className="absolute right-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Visual Display */}
          <div className="lg:col-span-7">
            <div className="sticky top-32">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="relative"
              >
                {/* Main card */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-12 lg:p-16 min-h-[500px] shadow-2xl">
                  {/* Pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '32px 32px'
                    }}
                  />
                  
                  {/* Large step number */}
                  <div className="absolute top-8 right-8 text-[200px] font-light leading-none text-white/10 font-serif select-none pointer-events-none">
                    {String(activeStep + 1).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Icon */}
                      <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-10">
                        {(() => {
                          const StepIcon = steps[activeStep].icon;
                          return <StepIcon className="w-10 h-10 text-white" />;
                        })()}
                      </div>

                      {/* Title */}
                      <h3 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                        {steps[activeStep].title}
                      </h3>

                      {/* Description */}
                      <p className="text-xl text-white/80 font-light leading-relaxed max-w-md">
                        {steps[activeStep].description}
                      </p>
                    </div>

                    {/* Bottom detail */}
                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/20">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-white" />
                        <span className="text-white/90 font-medium">{steps[activeStep].detail}</span>
                      </div>
                      
                      {/* Step indicator dots */}
                      <div className="flex items-center gap-2">
                        {steps.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveStep(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === activeStep 
                                ? 'bg-white w-8' 
                                : idx < activeStep 
                                  ? 'bg-white/60' 
                                  : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-slate-100 -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-xl border-2 border-slate-200 -z-10" />
              </motion.div>

              {/* Support note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-10 flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Full support at every step</p>
                  <p className="text-sm text-slate-500">Our investor relations team is here to guide you through the process</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
