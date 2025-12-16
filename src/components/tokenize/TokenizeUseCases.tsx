import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Clock,
  Zap
} from "lucide-react";

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
      benefits: ["Monthly rental income distributions", "Share in property appreciation", "Automated profit distribution", "24/7 token tradability"],
      stats: { yield: "6-8%", term: "5-10Y", investors: "250+" }
    },
    {
      title: "Residential Development",
      example: "40-apartment development project • €5M",
      models: ["LEND"],
      lendDescription: "Issue project-loan tokens to fund construction. As units sell, profits repay principal plus interest to token holders.",
      benefits: ["Non-dilutive financing for developers", "Automated distributions as units sell", "Lower minimum investment amounts", "Transparent project milestones"],
      stats: { yield: "8-12%", term: "2-3Y", investors: "180+" }
    }
  ],
  "corporate-finance": [
    {
      title: "SME Bonds & Notes",
      example: "Growth-stage tech company • €2M",
      models: ["LEND"],
      lendDescription: "Issue tokenized corporate notes to fund expansion. Investors receive fixed quarterly interest payments with principal repayment at maturity.",
      benefits: ["Access broader investor base", "Lower issuance costs vs traditional bonds", "Automated interest distributions", "Secondary market liquidity"],
      stats: { yield: "7-10%", term: "3-5Y", investors: "320+" }
    },
    {
      title: "Invoice Financing",
      example: "Manufacturing company receivables • €500K",
      models: ["LEND"],
      lendDescription: "Tokenize outstanding invoices for immediate liquidity. Investors earn yield from invoice discount spreads.",
      benefits: ["Immediate working capital access", "Short-duration investments", "Diversified invoice portfolios", "Transparent payment tracking"],
      stats: { yield: "4-6%", term: "30-90D", investors: "150+" }
    }
  ],
  "alternative-assets": [
    {
      title: "Art & Collectibles",
      example: "Blue-chip artwork collection • €3M",
      models: ["BUY"],
      buyDescription: "Purchase fractional ownership in curated art collections. Token holders share in appreciation upon sale.",
      benefits: ["Access museum-quality art", "Professional curation & storage", "Share in appreciation gains", "Diversified collection exposure"],
      stats: { yield: "10-15%", term: "5-7Y", investors: "400+" }
    },
    {
      title: "Luxury Goods",
      example: "Rare watch portfolio • €1M",
      models: ["BUY"],
      buyDescription: "Own shares in authenticated luxury asset portfolios. Professional management handles storage, insurance, and eventual sale.",
      benefits: ["Authenticated provenance", "Professional storage & insurance", "Expert portfolio management", "Fractional luxury access"],
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
      benefits: ["Measurable environmental impact", "Long-term stable cash flows", "ESG portfolio alignment", "Carbon offset tracking"],
      stats: { yield: "5-8%", term: "10-20Y", investors: "500+" }
    },
    {
      title: "Sustainable Agriculture",
      example: "Organic farming cooperative • €2M",
      models: ["LEND"],
      lendDescription: "Fund sustainable farming operations through tokenized agricultural notes. Returns tied to harvest revenues.",
      benefits: ["Support regenerative practices", "Seasonal return distributions", "Transparent supply chain", "Impact certification"],
      stats: { yield: "6-9%", term: "1-3Y", investors: "120+" }
    }
  ],
  "team-rewards": [
    {
      title: "Employee Equity Programs",
      example: "Startup equity pool • €1M",
      models: ["BUY"],
      buyDescription: "Tokenize employee stock options and phantom shares. Team members receive liquid tokens representing their equity stake.",
      benefits: ["Attract top talent", "Transparent vesting schedules", "Secondary trading options", "Simplified cap table management"],
      stats: { yield: "Variable", term: "4Y vest", investors: "50+" }
    },
    {
      title: "Performance Bonuses",
      example: "Sales team incentives • €200K",
      models: ["BUY"],
      buyDescription: "Issue performance-linked tokens that vest based on KPI achievement. Tokens represent cash or equity value.",
      benefits: ["Align team with company goals", "Automated milestone tracking", "Flexible redemption options", "Real-time performance visibility"],
      stats: { yield: "Variable", term: "1Y", investors: "30+" }
    }
  ],
  "loyalty-rewards": [
    {
      title: "Customer Loyalty Programs",
      example: "Retail chain rewards • €500K",
      models: ["BUY"],
      buyDescription: "Replace traditional points with tradeable loyalty tokens. Customers earn tokens on purchases, redeemable for products or tradeable on marketplace.",
      benefits: ["Increase customer engagement", "Tradeable reward value", "Cross-brand partnerships", "Real-time reward tracking"],
      stats: { yield: "N/A", term: "Ongoing", investors: "10K+" }
    },
    {
      title: "Fan & Community Tokens",
      example: "Sports club membership • €1M",
      models: ["BUY"],
      buyDescription: "Issue community tokens granting exclusive access, voting rights, and rewards. Fans become stakeholders in the community.",
      benefits: ["Deepen fan engagement", "Exclusive access & perks", "Community governance", "Secondary market value"],
      stats: { yield: "N/A", term: "Ongoing", investors: "5K+" }
    }
  ]
};

// Clean Card Component
const UseCaseCard = ({ 
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
  const currentModel = activeModel[index] || useCase.models[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500"
    >
      {/* Image Header Section */}
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          src={bgImage} 
          alt="" 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        {/* Gradient fade to content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
        
        {/* Stats floating on image */}
        <div className="absolute top-4 left-4 right-4 flex gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <TrendingUp className="w-3.5 h-3.5 text-white/80" />
            <span className="text-xs font-medium text-white/90">{useCase.stats?.yield}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <Clock className="w-3.5 h-3.5 text-white/80" />
            <span className="text-xs font-medium text-white/90">{useCase.stats?.term}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <Users className="w-3.5 h-3.5 text-white/80" />
            <span className="text-xs font-medium text-white/90">{useCase.stats?.investors}</span>
          </div>
        </div>

        {/* Title overlay on image */}
        <div className="absolute bottom-4 left-6 right-6">
          <h3 className="text-2xl font-bold text-white mb-1">{useCase.title}</h3>
          <p className="text-white/60 text-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {useCase.example}
          </p>
        </div>
      </div>

      {/* Content Section - Solid background */}
      <div className="bg-[#0a0a0f] p-6">
        {/* Model Toggle */}
        <div className="mb-5">
          {useCase.models.length > 1 ? (
            <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10">
              {useCase.models.map((model: string) => (
                <motion.button
                  key={model}
                  onClick={() => toggleModel(index, model)}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    currentModel === model
                      ? "text-background"
                      : "text-white/60 hover:text-white"
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {currentModel === model && (
                    <motion.div
                      layoutId={`model-pill-${index}`}
                      className="absolute inset-0 bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{model}</span>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-background font-semibold text-sm">
              <Zap className="w-3.5 h-3.5" />
              {useCase.models[0]}
            </div>
          )}
        </div>

        {/* Model Description */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-2">
            <span className="w-6 h-px bg-white/30" />
            {currentModel} Model
          </h4>
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentModel}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-white/50 text-sm leading-relaxed"
            >
              {currentModel === "BUY" ? useCase.buyDescription : useCase.lendDescription}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-5" />

        {/* Benefits */}
        <div>
          <h4 className="text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-white/30" />
            Key Benefits
          </h4>
          <ul className="space-y-2.5">
            {useCase.benefits.map((benefit: string, i: number) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-3 text-sm text-white/50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white/70" />
                </div>
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(255,255,255,0.03)]" />
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
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Category Tabs */}
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
                className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-white text-background border-white"
                    : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
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
            className="grid md:grid-cols-2 gap-6"
          >
            {currentUseCases.map((useCase, index) => (
              <UseCaseCard
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
