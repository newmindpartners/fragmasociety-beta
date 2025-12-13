import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Shield, Users, Scale, FileText } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Structured with industry leaders",
    description: "Brands, or expert issuers",
  },
  {
    icon: Shield,
    title: "Backed by real-world assets",
    description: "Or clearly-defined strategies",
  },
  {
    icon: Scale,
    title: "Built on regulated frameworks",
    description: "Luxembourg or partners",
  },
  {
    icon: FileText,
    title: "Clear documentation",
    description: "Terms, risks, timelines",
  },
];

export const CuratedDeals = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Curated Signature Deals.{" "}
              <span className="text-muted-foreground">Nothing random, nothing spammy.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              On Fragma, the main platform is not an open marketplace for anyone to list anything.
              We only feature Signature Deals:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-2 gap-4 mb-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-6 bg-primary/5 border border-primary/20 rounded-xl text-center"
          >
            <p className="text-muted-foreground mb-2">
              You're not scrolling through hundreds of unknown offers.
            </p>
            <p className="text-lg font-semibold text-foreground">
              You're choosing from a short list of high-conviction, curated deals.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
