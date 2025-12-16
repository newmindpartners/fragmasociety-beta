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
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  ]
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
                    : "bg-white/5 backdrop-blur-sm text-muted-foreground border-white/20 hover:border-white/40 hover:text-foreground"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {currentUseCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={currentCategoryData?.bgImage} 
                    alt="" 
                    className="w-full h-full object-cover blur-[2px] scale-105 group-hover:scale-110 group-hover:blur-[1px] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-background/85 group-hover:bg-background/80 transition-colors duration-300" />
                </div>

                {/* Animated border glow */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05), rgba(255,255,255,0.2))',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Glow effect on hover */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Glass content layer */}
                <div className="relative h-full backdrop-blur-sm bg-white/5 border border-white/10 group-hover:border-white/25 rounded-2xl p-8 transition-all duration-300">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground text-sm">{useCase.example}</p>
                  </div>

                  {/* Model Toggle */}
                  {useCase.models.length > 1 && (
                    <div className="flex gap-2 mb-6">
                      {useCase.models.map((model) => (
                        <Button
                          key={model}
                          variant={activeModel[index] === model || (!activeModel[index] && model === useCase.models[0]) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleModel(index, model)}
                          className={`rounded-full ${
                            activeModel[index] === model || (!activeModel[index] && model === useCase.models[0])
                              ? "bg-white text-background hover:bg-white/90"
                              : "border-white/30 text-white hover:bg-white hover:text-background"
                          }`}
                        >
                          {model}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Model Badge for single model */}
                  {useCase.models.length === 1 && (
                    <Badge className="mb-6 bg-white/10 text-white border-white/20">
                      {useCase.models[0]}
                    </Badge>
                  )}

                  {/* Model Description */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-2">
                      {(activeModel[index] || useCase.models[0])} Model
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {(activeModel[index] || useCase.models[0]) === "BUY" 
                        ? useCase.buyDescription 
                        : useCase.lendDescription}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Benefits</h4>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-white flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
