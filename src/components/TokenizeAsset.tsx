import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Coins, 
  Rocket, 
  ArrowLeftRight, 
  Wallet,
  Shield,
  Cpu,
  Globe,
  FileCheck,
  RefreshCw,
  ArrowRight,
  Phone,
  Building2,
  Gem,
  Film,
  Landmark,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Asset icons for the transformation animation
const assetIcons = [
  { icon: Building2, label: "Real Estate", color: "from-emerald-500 to-teal-500" },
  { icon: Gem, label: "Luxury Goods", color: "from-violet-500 to-purple-500" },
  { icon: Film, label: "Film Rights", color: "from-amber-500 to-orange-500" },
  { icon: Landmark, label: "Credit", color: "from-cyan-500 to-sky-500" },
];

const steps = [
  {
    number: "01",
    title: "Submit your project",
    description: "Tell us about your asset, its structure, revenue, and objectives. Our team evaluates regulatory fit and prepares the right issuance framework.",
    icon: FileText,
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    number: "02",
    title: "Tokenize & structure",
    description: "We convert the asset into digital units using Luxembourg-based securitisation or partner jurisdictions.",
    icon: Coins,
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    number: "03",
    title: "Launch your offering",
    description: "Your deal goes live on Fragma Society with all required disclosures, documentation, and investor dashboards.",
    icon: Rocket,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    number: "04",
    title: "Enable secondary trading",
    description: "Once issued, your asset becomes tradable on our decentralized marketplace—bringing transparency and liquidity.",
    icon: ArrowLeftRight,
    color: "from-primary/20 to-accent/20",
  },
  {
    number: "05",
    title: "Distribute yields automatically",
    description: "Payouts flow from the asset → smart contracts → investors' wallets seamlessly.",
    icon: Wallet,
    color: "from-rose-500/20 to-pink-500/20",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Institutional Legal Framework",
    description: "Luxembourg securitisation and regulated partner structures ensure investor trust.",
  },
  {
    icon: Cpu,
    title: "Full-service Technology",
    description: "Issue, fractionalize, distribute, and trade—everything in one platform.",
  },
  {
    icon: ArrowLeftRight,
    title: "Decentralized Trading Engine",
    description: "Transparent order book and non-custodial settlement on Cardano.",
  },
  {
    icon: Globe,
    title: "Global Investor Access",
    description: "Tap into a growing base of retail, accredited, and institutional buyers.",
  },
  {
    icon: FileCheck,
    title: "Automatic Reporting",
    description: "Smart contracts handle cap tables, audit trails, and investor payouts.",
  },
  {
    icon: RefreshCw,
    title: "Liquidity Optionality",
    description: "Secondary market access gives your asset a life beyond the initial raise.",
  },
];

// Floating particle component
const FloatingParticle = ({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) => (
  <motion.div
    className="absolute rounded-full bg-primary/30"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Asset transformation animation component
const AssetTransformAnimation = () => {
  const [stage, setStage] = useState(0);
  const [activeAsset, setActiveAsset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!isInView) {
      setStage(0);
      return;
    }

    const stageTimers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 3500),
    ];

    const assetTimer = setInterval(() => {
      setActiveAsset((prev) => (prev + 1) % assetIcons.length);
    }, 4000);

    return () => {
      stageTimers.forEach(clearTimeout);
      clearInterval(assetTimer);
    };
  }, [isInView]);

  const ActiveIcon = assetIcons[activeAsset].icon;

  return (
    <div ref={containerRef} className="relative h-[400px] flex items-center justify-center">
      {/* Background glow */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.3}
          size={4 + Math.random() * 6}
          x={`${20 + Math.random() * 60}%`}
          y={`${20 + Math.random() * 60}%`}
        />
      ))}

      {/* Stage 1: Real Asset */}
      <AnimatePresence mode="wait">
        {stage >= 1 && stage < 2 && (
          <motion.div
            key="asset"
            initial={{ scale: 0, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
          >
            <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${assetIcons[activeAsset].color} p-1`}>
              <div className="w-full h-full rounded-xl bg-background/90 flex items-center justify-center">
                <ActiveIcon className="w-16 h-16 text-primary" />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-4 text-sm font-medium text-muted-foreground"
            >
              {assetIcons[activeAsset].label}
            </motion.p>
          </motion.div>
        )}

        {/* Stage 2: Tokenization */}
        {stage >= 2 && stage < 3 && (
          <motion.div
            key="tokens"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute"
          >
            <div className="grid grid-cols-3 gap-3">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                >
                  <Coins className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-6 text-sm font-medium text-primary"
            >
              Tokenizing...
            </motion.p>
          </motion.div>
        )}

        {/* Stage 3: Marketplace */}
        {stage >= 3 && (
          <motion.div
            key="marketplace"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute w-full max-w-[280px]"
          >
            <div className="card-premium p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-primary">ORDER BOOK</span>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-emerald-500"
                />
              </div>
              
              {/* Mock order book */}
              <div className="space-y-1.5">
                {[
                  { price: "€105", amount: "25", type: "sell" },
                  { price: "€102", amount: "50", type: "sell" },
                  { price: "€100", amount: "100", type: "mid" },
                  { price: "€98", amount: "75", type: "buy" },
                  { price: "€95", amount: "40", type: "buy" },
                ].map((order, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`flex justify-between items-center text-xs py-1 px-2 rounded ${
                      order.type === "sell" ? "bg-rose-500/10 text-rose-400" :
                      order.type === "buy" ? "bg-emerald-500/10 text-emerald-400" :
                      "bg-primary/10 text-primary font-medium"
                    }`}
                  >
                    <span>{order.price}</span>
                    <span>{order.amount} tokens</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center mt-4 text-sm font-medium text-emerald-400"
            >
              Listed & Trading
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3">
        {["Asset", "Tokenize", "Trade"].map((label, i) => (
          <motion.div
            key={label}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
              stage > i ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground"
            }`}
            animate={{ scale: stage === i + 1 ? 1.1 : 1 }}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${stage > i ? "bg-primary" : "bg-muted-foreground"}`} />
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Step card with premium hover effects
const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 blur-xl"
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative card-premium p-6 h-full overflow-hidden">
        {/* Background ripple on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 2 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "top left" }}
        />

        <div className="relative z-10">
          {/* Step number */}
          <motion.span
            className="text-4xl font-bold text-primary/20"
            animate={{ 
              letterSpacing: isHovered ? "0.1em" : "0em",
              color: isHovered ? "hsl(var(--primary) / 0.4)" : "hsl(var(--primary) / 0.2)"
            }}
            transition={{ duration: 0.3 }}
          >
            {step.number}
          </motion.span>

          {/* Icon with draw animation */}
          <motion.div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mt-4 mb-4`}
            animate={{ 
              rotate: isHovered ? [0, -5, 5, 0] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.4 }}
          >
            <Icon className="w-6 h-6 text-primary" strokeWidth={isHovered ? 2.5 : 2} />
          </motion.div>

          {/* Title with letter spacing animation */}
          <motion.h3
            className="text-lg font-semibold text-foreground mb-2"
            animate={{ letterSpacing: isHovered ? "0.02em" : "0em" }}
            transition={{ duration: 0.3 }}
          >
            {step.title}
          </motion.h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Micro-shadow lift */}
        <motion.div
          className="absolute inset-0 rounded-2xl shadow-xl shadow-primary/10 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Benefit card
const BenefitCard = ({ benefit, index }: { benefit: typeof benefits[0]; index: number }) => {
  const Icon = benefit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group"
    >
      <div className="card-premium p-5 h-full shine">
        <motion.div
          className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          <Icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
        </motion.div>
        <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {benefit.title}
        </h4>
        <p className="text-xs text-muted-foreground">
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
};

export const TokenizeAsset = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background"
      />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">For Asset Owners</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Tokenize & List{" "}
            <span className="text-gradient">Your Asset</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Turn your real-world asset into a tradable digital investment. Fragma Society gives asset owners, creators, and institutions a seamless way to tokenize, fractionalize, and list their assets on a regulated, fully decentralized marketplace.
          </p>
        </motion.div>

        {/* Asset Transformation Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <AssetTransformAnimation />
        </motion.div>

        {/* Steps Section */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-serif font-bold text-center mb-10"
          >
            Simple steps to <span className="text-gradient">list your asset</span>
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-serif font-bold text-center mb-10"
          >
            Why list with <span className="text-gradient">Fragma Society</span>
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="card-premium p-10 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border border-primary/30 mx-auto mb-6 flex items-center justify-center"
              >
                <Rocket className="w-7 h-7 text-primary" />
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                Ready to tokenize your asset?
              </h3>
              <p className="text-muted-foreground mb-8">
                Turn your project into an investment product with global reach.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="group btn-glow px-8">
                  <span className="flex items-center gap-2">
                    Start Listing
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button variant="outline" size="lg" className="group border-primary/30 hover:border-primary/60">
                  <Phone className="w-4 h-4 mr-2" />
                  Book a Strategy Call
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
