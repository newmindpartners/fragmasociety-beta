import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Building2, 
  Briefcase, 
  Gem, 
  Leaf, 
  Users, 
  Gift,
  Check,
  Sparkles,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Import category background images
import categoryRealEstate from "@/assets/category-realestate.jpg";
import categoryCredit from "@/assets/category-credit.jpg";
import categoryLuxury from "@/assets/category-luxury.jpg";
import categoryEsg from "@/assets/category-esg.jpg";
import categorySports from "@/assets/category-sports.jpg";
import categoryFilm from "@/assets/category-film.jpg";

const categories = [
  { id: "real-estate", label: "Real Estate", icon: Building2, bgImage: categoryRealEstate },
  { id: "corporate-finance", label: "Corporate Finance", icon: Briefcase, bgImage: categoryCredit },
  { id: "alternative-assets", label: "Alternative Assets", icon: Gem, bgImage: categoryLuxury },
  { id: "impact-esg", label: "Impact & ESG", icon: Leaf, bgImage: categoryEsg },
  { id: "team-rewards", label: "Team Rewards", icon: Users, bgImage: categorySports },
  { id: "loyalty-rewards", label: "Loyalty Rewards+", icon: Gift, bgImage: categoryFilm },
];

const useCases = {
  "real-estate": [
    {
      title: "Commercial Real Estate",
      example: "Office building in Paris • €10M",
      models: ["BUY", "LEND"],
      buyDescription: "Purchase shares in a Property SPV that owns the building. Investors receive equity tokens linked to rental income and capital gains.",
      lendDescription: "Issue tokenized notes and lend to the Property SPV. Investors earn fixed interest (e.g., 6%) paid quarterly.",
      benefits: [
        "Monthly rental income distributions",
        "Share in property appreciation",
        "Automated profit distribution",
        "24/7 token tradability"
      ],
      stats: { yield: "6-8%", term: "5-10Y", investors: "250+" }
    },
    {
      title: "Residential Development",
      example: "40-apartment development project • €5M",
      models: ["LEND"],
      lendDescription: "Issue project-loan tokens to fund construction. As units sell, profits repay principal plus interest to token holders.",
      benefits: [
        "Non-dilutive financing for developers",
        "Automated distributions as units sell",
        "Lower minimum investment amounts",
        "Transparent project milestones"
      ],
      stats: { yield: "8-12%", term: "2-3Y", investors: "180+" }
    }
  ],
  "corporate-finance": [
    {
      title: "SME Bonds & Notes",
      example: "Growth-stage tech company • €2M",
      models: ["LEND"],
      lendDescription: "Issue tokenized corporate notes to fund expansion. Investors receive fixed quarterly interest payments with principal repayment at maturity.",
      benefits: [
        "Access broader investor base",
        "Lower issuance costs vs traditional bonds",
        "Automated interest distributions",
        "Secondary market liquidity"
      ],
      stats: { yield: "7-10%", term: "3-5Y", investors: "320+" }
    },
    {
      title: "Invoice Financing",
      example: "Manufacturing company receivables • €500K",
      models: ["LEND"],
      lendDescription: "Tokenize outstanding invoices for immediate liquidity. Investors earn yield from invoice discount spreads.",
      benefits: [
        "Immediate working capital access",
        "Short-duration investments",
        "Diversified invoice portfolios",
        "Transparent payment tracking"
      ],
      stats: { yield: "4-6%", term: "30-90D", investors: "150+" }
    }
  ],
  "alternative-assets": [
    {
      title: "Art & Collectibles",
      example: "Blue-chip artwork collection • €3M",
      models: ["BUY"],
      buyDescription: "Purchase fractional ownership in curated art collections. Token holders share in appreciation upon sale.",
      benefits: [
        "Access museum-quality art",
        "Professional curation & storage",
        "Share in appreciation gains",
        "Diversified collection exposure"
      ],
      stats: { yield: "10-15%", term: "5-7Y", investors: "400+" }
    },
    {
      title: "Luxury Goods",
      example: "Rare watch portfolio • €1M",
      models: ["BUY"],
      buyDescription: "Own shares in authenticated luxury asset portfolios. Professional management handles storage, insurance, and eventual sale.",
      benefits: [
        "Authenticated provenance",
        "Professional storage & insurance",
        "Expert portfolio management",
        "Fractional luxury access"
      ],
      stats: { yield: "8-12%", term: "3-5Y", investors: "280+" }
    }
  ],
  "impact-esg": [
    {
      title: "Renewable Energy Projects",
      example: "Solar farm installation • €8M",
      models: ["BUY", "LEND"],
      buyDescription: "Invest in equity tokens tied to energy production revenues. Token holders receive distributions from power purchase agreements.",
      lendDescription: "Provide project finance through tokenized green notes. Earn fixed returns backed by long-term energy contracts.",
      benefits: [
        "Measurable environmental impact",
        "Long-term stable cash flows",
        "ESG portfolio alignment",
        "Carbon offset tracking"
      ],
      stats: { yield: "5-8%", term: "10-20Y", investors: "500+" }
    },
    {
      title: "Sustainable Agriculture",
      example: "Organic farming cooperative • €2M",
      models: ["LEND"],
      lendDescription: "Fund sustainable farming operations through tokenized agricultural notes. Returns tied to harvest revenues.",
      benefits: [
        "Support regenerative practices",
        "Seasonal return distributions",
        "Transparent supply chain",
        "Impact certification"
      ],
      stats: { yield: "6-9%", term: "1-3Y", investors: "120+" }
    }
  ],
  "team-rewards": [
    {
      title: "Employee Equity Programs",
      example: "Startup equity pool • €1M",
      models: ["BUY"],
      buyDescription: "Tokenize employee stock options and phantom shares. Team members receive liquid tokens representing their equity stake.",
      benefits: [
        "Attract top talent",
        "Transparent vesting schedules",
        "Secondary trading options",
        "Simplified cap table management"
      ],
      stats: { yield: "Variable", term: "4Y vest", investors: "50+" }
    },
    {
      title: "Performance Bonuses",
      example: "Sales team incentives • €200K",
      models: ["BUY"],
      buyDescription: "Issue performance-linked tokens that vest based on KPI achievement. Tokens represent cash or equity value.",
      benefits: [
        "Align team with company goals",
        "Automated milestone tracking",
        "Flexible redemption options",
        "Real-time performance visibility"
      ],
      stats: { yield: "Variable", term: "1Y", investors: "30+" }
    }
  ],
  "loyalty-rewards": [
    {
      title: "Customer Loyalty Programs",
      example: "Retail chain rewards • €500K",
      models: ["BUY"],
      buyDescription: "Replace traditional points with tradeable loyalty tokens. Customers earn tokens on purchases, redeemable for products or tradeable on marketplace.",
      benefits: [
        "Increase customer engagement",
        "Tradeable reward value",
        "Cross-brand partnerships",
        "Real-time reward tracking"
      ],
      stats: { yield: "N/A", term: "Ongoing", investors: "10K+" }
    },
    {
      title: "Fan & Community Tokens",
      example: "Sports club membership • €1M",
      models: ["BUY"],
      buyDescription: "Issue community tokens granting exclusive access, voting rights, and rewards. Fans become stakeholders in the community.",
      benefits: [
        "Deepen fan engagement",
        "Exclusive access & perks",
        "Community governance",
        "Secondary market value"
      ],
      stats: { yield: "N/A", term: "Ongoing", investors: "5K+" }
    }
  ]
};

// Premium 3D Card Component
const PremiumCard = ({ 
  useCase, 
  index, 
  bgImage, 
  activeModel, 
  toggleModel 
}: { 
  useCase: any; 
  index: number; 
  bgImage: string;
  activeModel: Record<number, string>;
  toggleModel: (index: number, model: string) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Spring physics for smooth motion
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);
  
  // Glare position
  const glareX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);
  
  // Border gradient position
  const borderX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const borderY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const currentModel = activeModel[index] || useCase.models[0];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="relative h-full"
    >
      {/* Outer glow effect */}
      <motion.div 
        className="absolute -inset-1 rounded-3xl opacity-0 blur-xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3), transparent 60%)`,
          opacity: isHovered ? 0.6 : 0,
        }}
      />

      {/* Animated border gradient */}
      <motion.div 
        className="absolute -inset-[1px] rounded-3xl overflow-hidden"
        style={{
          background: isHovered 
            ? `conic-gradient(from 0deg at ${borderX}% ${borderY}%, 
                rgba(255,255,255,0.5) 0deg, 
                rgba(255,255,255,0.1) 90deg, 
                rgba(255,255,255,0.5) 180deg, 
                rgba(255,255,255,0.1) 270deg, 
                rgba(255,255,255,0.5) 360deg)`
            : 'transparent',
        }}
      >
        <div className="absolute inset-[1px] rounded-3xl bg-background" />
      </motion.div>

      {/* Main card */}
      <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
        {/* Background image with Ken Burns effect */}
        <motion.div 
          className="absolute inset-0"
          animate={isHovered ? { scale: 1.1 } : { scale: 1.05 }}
          transition={{ duration: 8, ease: "easeInOut" }}
        >
          <img 
            src={bgImage} 
            alt="" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/60" />
        </motion.div>

        {/* Glare/shine sweep effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: "100%",
                  opacity: 0 
                }}
                animate={{ 
                  y: "-20%",
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative h-full p-8 flex flex-col" style={{ transform: "translateZ(40px)" }}>
          {/* Top row: Stats badges */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <motion.div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <TrendingUp className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-medium text-white">{useCase.stats?.yield || "Variable"}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <Shield className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-medium text-white">{useCase.stats?.term || "Flexible"}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <Users className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-medium text-white">{useCase.stats?.investors || "100+"}</span>
            </motion.div>
          </div>

          {/* Header */}
          <div className="mb-6">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-foreground mb-2"
              style={{ transform: "translateZ(20px)" }}
            >
              {useCase.title}
            </motion.h3>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {useCase.example}
            </p>
          </div>

          {/* Model Toggle - Premium pill design */}
          <div className="mb-6">
            {useCase.models.length > 1 ? (
              <div className="inline-flex p-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                {useCase.models.map((model: string) => (
                  <motion.button
                    key={model}
                    onClick={() => toggleModel(index, model)}
                    className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      currentModel === model
                        ? "text-background"
                        : "text-white/70 hover:text-white"
                    }`}
                    whileHover={{ scale: currentModel === model ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {currentModel === model && (
                      <motion.div
                        layoutId={`model-bg-${index}`}
                        className="absolute inset-0 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{model}</span>
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-background font-semibold text-sm"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
              >
                <Zap className="w-4 h-4" />
                {useCase.models[0]}
              </motion.div>
            )}
          </div>

          {/* Model Description with animated underline */}
          <div className="mb-6 flex-1">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-gradient-to-r from-white to-transparent" />
              {currentModel} Model
            </h4>
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentModel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-muted-foreground text-sm leading-relaxed"
              >
                {currentModel === "BUY" 
                  ? useCase.buyDescription 
                  : useCase.lendDescription}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Benefits with staggered animation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-gradient-to-r from-white to-transparent" />
              Key Benefits
            </h4>
            <ul className="grid grid-cols-1 gap-2.5">
              {useCase.benefits.map((benefit: string, i: number) => (
                <motion.li 
                  key={i} 
                  className="flex items-start gap-3 text-sm text-muted-foreground group/item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-0.5 group-hover/item:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                  <span className="group-hover/item:text-foreground transition-colors">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Bottom accent line */}
          <motion.div 
            className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const TokenizeUseCases = () => {
  const [activeCategory, setActiveCategory] = useState("real-estate");
  const [activeModel, setActiveModel] = useState<Record<number, string>>({});

  const currentUseCases = useCases[activeCategory as keyof typeof useCases] || [];
  const currentCategoryData = categories.find(c => c.id === activeCategory);

  const toggleModel = (index: number, model: string) => {
    setActiveModel(prev => ({ ...prev, [index]: model }));
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Category Tabs - Premium pill design */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveModel({});
                }}
                className={`relative flex items-center gap-2.5 px-6 py-3.5 rounded-full border transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "bg-white text-background border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    : "bg-white/5 backdrop-blur-sm text-muted-foreground border-white/20 hover:border-white/40 hover:text-foreground hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine effect on active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="text-sm font-medium relative z-10">{category.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Use Cases Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {currentUseCases.map((useCase, index) => (
              <PremiumCard
                key={useCase.title}
                useCase={useCase}
                index={index}
                bgImage={currentCategoryData?.bgImage || ""}
                activeModel={activeModel}
                toggleModel={toggleModel}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
