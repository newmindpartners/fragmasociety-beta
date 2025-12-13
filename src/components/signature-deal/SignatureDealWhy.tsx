import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Palette, 
  Shield, 
  Crown, 
  Users, 
  Zap, 
  ArrowLeftRight, 
  Headphones 
} from "lucide-react";

const reasons = [
  {
    icon: Palette,
    title: "A deal crafted with you — not copied from templates",
    description: "We co-create a bespoke investment product around your asset, brand, and story. Every detail is engineered for investor trust and long-term value.",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    icon: Shield,
    title: "Institutional-grade structuring",
    description: "Regulated Luxembourg or partner frameworks ensure compliance, transparency, and cross-border investment access.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Crown,
    title: "A premium investor experience",
    description: "Your deal is showcased in a luxury-grade interface that elevates your brand and positions your project as a true investment product.",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: Users,
    title: "Built-in community activation",
    description: "Transform your followers, fans, or customers into co-investors who care about your success.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Zap,
    title: "Automated earnings & reporting",
    description: "Yields, royalty flows, or revenues are distributed automatically through smart contracts.",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    icon: ArrowLeftRight,
    title: "Secondary-market liquidity",
    description: "Your investors can trade their ownership on our decentralized marketplace — increasing attractiveness and long-term engagement.",
    gradient: "from-indigo-500 to-violet-500"
  },
  {
    icon: Headphones,
    title: "End-to-end, full-service support",
    description: "Structuring, design, web experience, legal setup, tokenization, distribution, compliance, marketing… We handle everything.",
    gradient: "from-primary to-cyan-500"
  }
];

export const SignatureDealWhy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            The Fragma Advantage
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Why launch your signature deal
            <br />
            <span className="text-primary">with Fragma?</span>
          </h2>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.gradient} p-0.5 mb-6`}>
                    <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Hover gradient line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${reason.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
