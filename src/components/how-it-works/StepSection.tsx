import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Check, Wallet, BarChart3, TrendingUp, ArrowLeftRight } from "lucide-react";

interface StepSectionProps {
  step: number;
  title: string;
  description: string;
  items: string[];
  categories?: string[];
  cardItems?: string[];
  tokenHolding?: string[];
  portfolioItems?: string[];
  payoutProcess?: string[];
  dashboardItems?: string[];
  marketplaceFeatures?: string[];
  additionalContent?: {
    title?: string;
    items?: string[];
    footer?: string;
    highlight?: string;
  };
  variant?: "default" | "alt";
}

export const StepSection = ({
  step,
  title,
  description,
  items,
  categories,
  cardItems,
  tokenHolding,
  portfolioItems,
  payoutProcess,
  dashboardItems,
  marketplaceFeatures,
  additionalContent,
  variant = "default",
}: StepSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bgClass = variant === "alt" ? "bg-card/30" : "bg-background";

  return (
    <section ref={ref} className={`py-16 md:py-20 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Step number and title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-start gap-4 mb-6"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">{step}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold pt-2">{title}</h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-6 ml-16"
          >
            {description}
          </motion.p>

          {/* Main items list */}
          {items.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 ml-16 mb-6"
            >
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </motion.ul>
          )}

          {/* Categories grid (Step 2) */}
          {categories && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="ml-16 mb-6"
            >
              <p className="text-muted-foreground mb-4">Explore Signature Deals in:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-card/50 border border-border/50 rounded-lg text-sm text-foreground"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Card items (Step 2) */}
          {cardItems && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="ml-16 mb-6"
            >
              <p className="text-muted-foreground mb-4">See simple cards with:</p>
              <div className="flex flex-wrap gap-2">
                {cardItems.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Token holding options (Step 5) */}
          {tokenHolding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="ml-16 mb-6"
            >
              <p className="text-muted-foreground mb-4">Tokens are held either:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {tokenHolding.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-card/50 border border-border/50 rounded-lg"
                  >
                    <Wallet className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{option}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Portfolio items (Step 5) */}
          {portfolioItems && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="ml-16 mb-6"
            >
              <p className="text-muted-foreground mb-4">
                You can always see what you own in your Portfolio dashboard:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {portfolioItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/10 rounded-lg"
                  >
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Payout process (Step 6) */}
          {payoutProcess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="ml-16 mb-6"
            >
              <p className="text-muted-foreground mb-4">Payouts are automated where possible:</p>
              <div className="space-y-3">
                {payoutProcess.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-card/50 border border-border/50 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Dashboard items (Step 6) */}
          {dashboardItems && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="ml-16 mb-6"
            >
              <p className="text-muted-foreground mb-4">You'll see:</p>
              <ul className="space-y-2">
                {dashboardItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Marketplace features (Step 7) */}
          {marketplaceFeatures && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="ml-16 mb-6"
            >
              <p className="text-muted-foreground mb-4">When secondary trading is enabled:</p>
              <div className="space-y-3">
                {marketplaceFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-card/50 border border-border/50 rounded-lg"
                  >
                    <ArrowLeftRight className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Additional content */}
          {additionalContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="ml-16"
            >
              {additionalContent.title && (
                <p className="text-muted-foreground mb-3">{additionalContent.title}</p>
              )}
              {additionalContent.items && (
                <ul className="space-y-2 mb-4">
                  {additionalContent.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {additionalContent.footer && (
                <p className="text-muted-foreground mb-4">{additionalContent.footer}</p>
              )}
              {additionalContent.highlight && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-foreground font-medium">{additionalContent.highlight}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
