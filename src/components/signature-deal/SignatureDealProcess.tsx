import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Send, 
  Lightbulb, 
  Layout, 
  Rocket, 
  BarChart3,
  Check,
  ChevronRight,
  ChevronDown
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Send,
    title: "Submit your project",
    description: "Tell us what you want to tokenize: a property, brand asset, digital IP, credit deal, film right, luxury item, or business.",
    details: [],
    graphicType: "send"
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "We design your investment product",
    description: "Our team structures the financial model, risk profile, legal wrapper, token economics, and compliance framework.",
    details: [
      "Product strategy",
      "Investment thesis",
      "Deal economics",
      "Regulatory structuring",
      "Storytelling & brand positioning"
    ],
    graphicType: "lightbulb"
  },
  {
    number: "03",
    icon: Layout,
    title: "We build your digital investment experience",
    description: "Custom-branded pages, investor dashboards, storytelling modules, performance analytics, claim systems. Your signature deal gets the premium treatment it deserves.",
    details: [],
    graphicType: "layout"
  },
  {
    number: "04",
    icon: Rocket,
    title: "Raise capital from your fans or global investors",
    description: "We onboard your community — plus our own investor base — into a clean, regulated investment flow starting from €50+ or as defined.",
    details: [],
    graphicType: "rocket"
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Launch & distribute",
    description: "Go live with full infrastructure support.",
    details: [
      "Automated payouts",
      "Real-time dashboards",
      "On-chain audit trails",
      "Global access",
      "Secondary market listing"
    ],
    graphicType: "chart"
  }
];

// World-class animated graphics for each step
const StepGraphic = ({ type, isActive }: { type: string; isActive: boolean }) => {
  if (!isActive) return null;
  
  switch (type) {
    case "send":
      return (
        <motion.div 
          className="absolute right-8 top-8 w-20 h-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <motion.path
              d="M10 60 Q 30 40 50 45 T 75 25"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                r="2"
                fill="rgba(6,182,212,0.5)"
                initial={{ cx: 15 + i * 10, cy: 55 - i * 5, opacity: 0 }}
                animate={{ 
                  cx: [15 + i * 10, 60 + i * 5], 
                  cy: [55 - i * 5, 30 - i * 3], 
                  opacity: [0, 1, 0] 
                }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatDelay: 1 }}
              />
            ))}
            <motion.g
              initial={{ x: 8, y: 50, rotate: 30 }}
              animate={{ x: 60, y: 20, rotate: -15 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <path d="M0 0 L12 4 L4 8 Z" fill="rgba(255,255,255,0.4)" />
            </motion.g>
          </svg>
        </motion.div>
      );
    
    case "lightbulb":
      return (
        <motion.div 
          className="absolute right-8 top-8 w-20 h-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            {[1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx="40"
                cy="35"
                r={12 + i * 8}
                stroke="rgba(6,182,212,0.2)"
                strokeWidth="1"
                fill="none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.4] }}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
              />
            ))}
            <motion.path
              d="M32 42 Q 28 34 32 26 Q 36 18 40 18 Q 44 18 48 26 Q 52 34 48 42 L44 50 L36 50 Z"
              fill="rgba(255,255,255,0.3)"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <path d="M37 54 L37 58 M43 54 L43 58 M35 60 L45 60" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      );
    
    case "layout":
      return (
        <motion.div 
          className="absolute right-8 top-8 w-20 h-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <motion.rect
              x="12" y="12" width="56" height="40" rx="4"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.line x1="12" y1="24" x2="68" y2="24" stroke="rgba(255,255,255,0.2)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
            <motion.line x1="36" y1="24" x2="36" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.7 }} />
            {[[16, 28, 16, 8], [16, 40, 16, 8], [40, 28, 24, 20]].map(([x, y, w, h], i) => (
              <motion.rect
                key={i}
                x={x} y={y} width={w} height={h} rx="2"
                fill="rgba(6,182,212,0.3)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
              />
            ))}
          </svg>
        </motion.div>
      );
    
    case "rocket":
      return (
        <motion.div 
          className="absolute right-8 top-8 w-20 h-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <motion.g
              initial={{ y: 20, rotate: 45 }}
              animate={{ y: [20, 5, 20], rotate: 45 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "40px 40px" }}
            >
              <path d="M40 16 L48 32 L44 36 L36 36 L32 32 Z" fill="rgba(255,255,255,0.4)" />
              <motion.path
                d="M36 36 L40 48 L44 36"
                fill="rgba(6,182,212,0.5)"
                animate={{ scaleY: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
            </motion.g>
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                r="2"
                fill="rgba(255,255,255,0.4)"
                initial={{ cx: 25 + i * 15, cy: 55, opacity: 0 }}
                animate={{ cy: [55, 70], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </svg>
        </motion.div>
      );
    
    case "chart":
      return (
        <motion.div 
          className="absolute right-8 top-8 w-20 h-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            {[
              { x: 16, height: 24, delay: 0 },
              { x: 28, height: 36, delay: 0.2 },
              { x: 40, height: 28, delay: 0.4 },
              { x: 52, height: 44, delay: 0.6 },
              { x: 64, height: 32, delay: 0.8 },
            ].map((bar, i) => (
              <motion.rect
                key={i}
                x={bar.x - 4}
                width="8"
                rx="2"
                fill="rgba(6,182,212,0.4)"
                initial={{ y: 64, height: 0, opacity: 0 }}
                animate={{ y: 64 - bar.height, height: bar.height, opacity: 1 }}
                transition={{ duration: 1, delay: bar.delay, repeat: Infinity, repeatDelay: 2 }}
              />
            ))}
            <motion.path
              d="M12 56 Q 28 48 40 40 T 72 20"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 2 }}
            />
          </svg>
        </motion.div>
      );
    
    default:
      return null;
  }
};

export const SignatureDealProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Deep dark navy background */}
      <div className="absolute inset-0 bg-[hsl(220,40%,3%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,45%,5%)] via-[hsl(220,40%,4%)] to-[hsl(220,35%,6%)]" />
      
      {/* Turquoise ambient glows */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-white/40 font-medium text-sm tracking-wider uppercase mb-4 block">
            Simple + Powerful
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            How it works
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            You focus on your project. We handle the infrastructure.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[400px_1fr] gap-6 lg:gap-8">
            {/* Step Navigation - Left Column */}
            <div className="space-y-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                return (
                  <motion.button
                    key={step.number}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setActiveStep(index)}
                    className={`w-full p-5 rounded-2xl text-left transition-all duration-500 flex items-center gap-4 group relative overflow-hidden ${
                      isActive 
                        ? "bg-[hsl(220,30%,12%)] border-2 border-cyan-500/30 shadow-[0_0_40px_-10px_rgba(6,182,212,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]" 
                        : "bg-[hsl(220,35%,8%)]/80 border border-white/[0.04] hover:bg-[hsl(220,30%,10%)] hover:border-white/[0.08]"
                    }`}
                  >
                    {/* Turquoise glow on active */}
                    {isActive && (
                      <>
                        <motion.div 
                          className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                      </>
                    )}
                    
                    <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? "bg-white text-[hsl(220,40%,8%)] shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
                        : "bg-[hsl(220,30%,15%)] text-white/50 group-hover:bg-[hsl(220,30%,18%)] group-hover:text-white/70"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <span className={`text-xs font-medium block mb-1 transition-colors duration-300 ${
                        isActive ? "text-cyan-400" : "text-white/30"
                      }`}>
                        Step {step.number}
                      </span>
                      <span className={`text-sm font-semibold transition-colors duration-300 leading-tight block ${
                        isActive ? "text-white" : "text-white/60"
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? "text-cyan-400" : "text-white/20"
                      }`} />
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* Step Content - Right Column with Turquoise Spotlight */}
            <div className="relative">
              {/* Turquoise spotlight gradient behind card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/[0.08] via-teal-500/[0.04] to-transparent rounded-[2rem] blur-xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.06] rounded-full blur-[100px] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative h-full"
                >
                  {/* Glass card with deep transparency */}
                  <div className="relative h-full p-10 lg:p-12 rounded-3xl 
                    bg-[hsl(220,35%,8%)]/60 backdrop-blur-3xl 
                    border border-white/[0.06] 
                    overflow-hidden min-h-[420px]
                    shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5),0_0_60px_-15px_rgba(6,182,212,0.15),inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    {/* Inner turquoise gradient spotlight */}
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-cyan-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                    
                    {/* Top highlight line */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    
                    {/* Animated graphic */}
                    <StepGraphic type={steps[activeStep].graphicType} isActive={true} />

                    <div className="relative z-10">
                      {/* Icon and step */}
                      <div className="flex items-center gap-4 mb-10">
                        <motion.div 
                          className="w-16 h-16 rounded-2xl bg-[hsl(220,30%,15%)] backdrop-blur border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.1)]"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                        >
                          {(() => {
                            const Icon = steps[activeStep].icon;
                            return <Icon className="w-7 h-7 text-white/80" />;
                          })()}
                        </motion.div>
                        <motion.span 
                          className="text-white/40 font-medium text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          Step {steps[activeStep].number}
                        </motion.span>
                      </div>

                      {/* Title */}
                      <motion.h3 
                        className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-6 leading-tight"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        {steps[activeStep].title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p 
                        className="text-white/45 text-lg leading-relaxed mb-8 max-w-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                      >
                        {steps[activeStep].description}
                      </motion.p>

                      {/* Details list */}
                      {steps[activeStep].details.length > 0 && (
                        <motion.div 
                          className="space-y-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.45 }}
                        >
                          <p className="text-sm font-semibold text-white/60 mb-4">You get:</p>
                          {steps[activeStep].details.map((detail, i) => (
                            <motion.div
                              key={detail}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                                <Check className="w-3 h-3 text-cyan-400" />
                              </div>
                              <span className="text-white/50">{detail}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Bottom accent line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
