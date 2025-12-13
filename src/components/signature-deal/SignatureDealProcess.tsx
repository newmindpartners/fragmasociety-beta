import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Send, 
  Lightbulb, 
  Layout, 
  Rocket, 
  BarChart3,
  Check,
  ChevronRight
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Send,
    title: "Submit your project",
    description: "Tell us what you want to tokenize: a property, brand asset, digital IP, credit deal, film right, luxury item, or business.",
    details: []
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
    ]
  },
  {
    number: "03",
    icon: Layout,
    title: "We build your digital investment experience",
    description: "Custom-branded pages, investor dashboards, storytelling modules, performance analytics, claim systems. Your signature deal gets the premium treatment it deserves.",
    details: []
  },
  {
    number: "04",
    icon: Rocket,
    title: "Raise capital from your fans or global investors",
    description: "We onboard your community — plus our own investor base — into a clean, regulated investment flow starting from €50+ or as defined.",
    details: []
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
    ]
  }
];

export const SignatureDealProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-[hsl(220,30%,6%)] to-background" />
      
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            Simple + Powerful
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You focus on your project. We handle the infrastructure.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Step Navigation */}
            <div className="space-y-2">
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
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-4 group ${
                      isActive 
                        ? "bg-primary/10 border border-primary/30" 
                        : "bg-card/30 border border-transparent hover:border-border hover:bg-card/50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className={`text-xs font-semibold block ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        Step {step.number}
                      </span>
                      <span className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.title}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-primary rotate-90" : "text-muted-foreground"}`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Step Content */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 lg:p-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
                  {(() => {
                    const Icon = steps[activeStep].icon;
                    return <Icon className="w-8 h-8 text-primary-foreground" />;
                  })()}
                </div>
                <div>
                  <span className="text-primary font-semibold text-sm">Step {steps[activeStep].number}</span>
                  <h3 className="text-2xl font-bold text-foreground">{steps[activeStep].title}</h3>
                </div>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {steps[activeStep].description}
              </p>

              {steps[activeStep].details.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground mb-4">You get:</p>
                  {steps[activeStep].details.map((detail, i) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
