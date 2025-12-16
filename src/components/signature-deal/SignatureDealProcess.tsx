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
  const baseClass = "absolute right-6 top-1/2 -translate-y-1/2 w-24 h-24 opacity-20";
  
  if (!isActive) return null;
  
  switch (type) {
    case "send":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          {/* Paper plane trail */}
          <motion.path
            d="M10 70 Q 30 50 50 55 T 90 30"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Flying particles */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r="3"
              fill="white"
              initial={{ cx: 20 + i * 10, cy: 65 - i * 5, opacity: 0 }}
              animate={{ 
                cx: [20 + i * 10, 70 + i * 5], 
                cy: [65 - i * 5, 35 - i * 3], 
                opacity: [0, 0.8, 0] 
              }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatDelay: 1 }}
            />
          ))}
          {/* Paper plane */}
          <motion.g
            initial={{ x: 10, y: 60, rotate: 30 }}
            animate={{ x: 75, y: 25, rotate: -15 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <path d="M0 0 L15 5 L5 10 Z" fill="white" fillOpacity="0.8" />
          </motion.g>
        </svg>
      );
    
    case "lightbulb":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          {/* Bulb glow rings */}
          {[1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx="50"
              cy="40"
              r={15 + i * 10}
              stroke="white"
              strokeWidth="1"
              fill="none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 1.4] }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
          {/* Light bulb shape */}
          <motion.path
            d="M40 50 Q 35 40 40 30 Q 45 20 50 20 Q 55 20 60 30 Q 65 40 60 50 L55 60 L45 60 Z"
            fill="white"
            fillOpacity="0.6"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Filament */}
          <motion.path
            d="M47 65 L47 70 M53 65 L53 70 M45 72 L55 72"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Idea sparks */}
          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={i}
              x1={50 + Math.cos(i * Math.PI / 2) * 25}
              y1={40 + Math.sin(i * Math.PI / 2) * 25}
              x2={50 + Math.cos(i * Math.PI / 2) * 35}
              y2={40 + Math.sin(i * Math.PI / 2) * 35}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: [0, 1, 0], pathLength: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </svg>
      );
    
    case "layout":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          {/* Dashboard frame */}
          <motion.rect
            x="15" y="15" width="70" height="50" rx="4"
            stroke="white"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.8, pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          {/* Grid lines appearing */}
          <motion.line
            x1="15" y1="30" x2="85" y2="30"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.line
            x1="45" y1="30" x2="45" y2="65"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
          {/* Animated content blocks */}
          {[[20, 35, 20, 10], [20, 50, 20, 10], [50, 35, 30, 25]].map(([x, y, w, h], i) => (
            <motion.rect
              key={i}
              x={x} y={y} width={w} height={h} rx="2"
              fill="white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
            />
          ))}
          {/* Cursor moving */}
          <motion.circle
            r="4"
            fill="white"
            initial={{ cx: 30, cy: 40, opacity: 0 }}
            animate={{ cx: [30, 60, 70, 40], cy: [40, 50, 35, 55], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
          />
        </svg>
      );
    
    case "rocket":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          {/* Rocket body */}
          <motion.g
            initial={{ y: 30, rotate: 45 }}
            animate={{ y: [30, 10, 30], rotate: 45 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M50 20 L60 40 L55 45 L45 45 L40 40 Z"
              fill="white"
              fillOpacity="0.8"
            />
            {/* Flame */}
            <motion.path
              d="M45 45 L50 60 L55 45"
              fill="white"
              fillOpacity="0.6"
              animate={{ scaleY: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          </motion.g>
          {/* Star trails */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.circle
              key={i}
              r="2"
              fill="white"
              initial={{ 
                cx: 30 + Math.random() * 40, 
                cy: 70 + i * 5, 
                opacity: 0 
              }}
              animate={{ 
                cy: [70 + i * 5, 90 + i * 5], 
                opacity: [0, 0.8, 0] 
              }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
          {/* Speed lines */}
          {[0, 1, 2].map((i) => (
            <motion.line
              key={i}
              x1={35 + i * 15}
              y1={75}
              x2={35 + i * 15}
              y2={85}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: [0, 0.6, 0], pathLength: [0, 1, 0] }}
              transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </svg>
      );
    
    case "chart":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          {/* Chart bars growing */}
          {[
            { x: 20, height: 30, delay: 0 },
            { x: 35, height: 45, delay: 0.2 },
            { x: 50, height: 35, delay: 0.4 },
            { x: 65, height: 55, delay: 0.6 },
            { x: 80, height: 40, delay: 0.8 },
          ].map((bar, i) => (
            <motion.rect
              key={i}
              x={bar.x - 5}
              width="10"
              rx="2"
              fill="white"
              initial={{ y: 80, height: 0, opacity: 0 }}
              animate={{ 
                y: 80 - bar.height, 
                height: bar.height, 
                opacity: [0, 0.7, 0.7] 
              }}
              transition={{ duration: 1, delay: bar.delay, repeat: Infinity, repeatDelay: 2 }}
            />
          ))}
          {/* Rising trend line */}
          <motion.path
            d="M15 70 Q 35 60 50 50 T 90 25"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 2 }}
          />
          {/* Floating coins */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={30 + i * 25}
              r="5"
              fill="white"
              fillOpacity="0.6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [20, 10, 20], opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 1.5 + i * 0.3, repeat: Infinity, repeatDelay: 1 }}
            />
          ))}
        </svg>
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-white/[0.02]" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-white/50 font-medium text-sm tracking-wider uppercase mb-4 block">
            Simple + Powerful
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            How it works
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            You focus on your project. We handle the infrastructure.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[380px_1fr] gap-8">
            {/* Step Navigation */}
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
                        ? "bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)]" 
                        : "bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10"
                    }`}
                  >
                    {/* Spotlight gradient on active */}
                    {isActive && (
                      <motion.div 
                        className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    
                    <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? "bg-white text-background shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                        : "bg-white/[0.06] text-white/60 group-hover:bg-white/10 group-hover:text-white/80"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <span className={`text-xs font-medium block mb-1 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/40"
                      }`}>
                        Step {step.number}
                      </span>
                      <span className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/70"
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/30"
                      }`} />
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* Step Content - Glass Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {/* Glass card */}
                <div className="relative p-10 lg:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] overflow-hidden min-h-[400px]
                  shadow-[0_8px_60px_-15px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  {/* Gradient spotlight */}
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Inner glow line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  {/* Animated graphic */}
                  <StepGraphic type={steps[activeStep].graphicType} isActive={true} />

                  <div className="relative z-10">
                    {/* Icon and step */}
                    <div className="flex items-center gap-4 mb-8">
                      <motion.div 
                        className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        {(() => {
                          const Icon = steps[activeStep].icon;
                          return <Icon className="w-7 h-7 text-white" />;
                        })()}
                      </motion.div>
                      <motion.span 
                        className="text-white/60 font-medium text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Step {steps[activeStep].number}
                      </motion.span>
                    </div>

                    {/* Title */}
                    <motion.h3 
                      className="text-2xl md:text-3xl font-serif font-bold text-white mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      {steps[activeStep].title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p 
                      className="text-white/50 text-lg leading-relaxed mb-8 max-w-xl"
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
                        <p className="text-sm font-semibold text-white/70 mb-4">You get:</p>
                        {steps[activeStep].details.map((detail, i) => (
                          <motion.div
                            key={detail}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-white/60">{detail}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
    </section>
  );
};
