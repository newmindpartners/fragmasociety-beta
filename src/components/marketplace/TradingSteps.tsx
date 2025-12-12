import { motion } from "framer-motion";
import { Wallet, Search, Edit3, Lock, Zap, RefreshCcw } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    step: "01",
    title: "Connect your wallet",
    description: "Your assets remain fully in your control. No account creation, no KYC hassle."
  },
  {
    icon: Search,
    step: "02",
    title: "Choose the tokenised asset",
    description: "Real estate, private credit, entertainment, luxury goods — all tradeable on one platform."
  },
  {
    icon: Edit3,
    step: "03",
    title: "Place a buy or sell order",
    description: "Set your price. No forced market rates. Full control over your trading strategy."
  },
  {
    icon: Lock,
    step: "04",
    title: "Smart contract locks your order",
    description: "Your funds stay in your Smart Vault until matched. Secure and transparent."
  },
  {
    icon: Zap,
    step: "05",
    title: "Trade executes automatically",
    description: "When prices match, settlement happens instantly on Cardano. No delays."
  },
  {
    icon: RefreshCcw,
    step: "06",
    title: "You keep full control",
    description: "Withdraw, trade again, or place options — all non-custodial, always yours."
  }
];

export const TradingSteps = () => {
  return (
    <section className="py-24 section-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              How To Trade
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Step-by-step:{" "}
              <span className="text-gradient">your first trade.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From wallet connection to settlement — here's exactly how trading works on Fragma Society.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="glass rounded-2xl p-6 relative z-10 h-full border border-border/50 group-hover:border-primary/30 transition-all">
                {/* Step number */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  >
                    <step.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <span className="text-4xl font-serif font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Progress line */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="hidden lg:block absolute -right-3 top-1/2 w-6 h-0.5 bg-primary/30 origin-left"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto border border-primary/20">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
              Built for beginners. Secure for professionals.
            </h3>
            <p className="text-muted-foreground mb-6">
              Whether you're new to RWA or an experienced trader, the marketplace gives you 
              full ownership, clear pricing, transparent execution, and smart-contract safety.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Full ownership", "Clear pricing", "Transparent execution", "Real liquidity", "Smart-contract safety", "World-class UI"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + i * 0.05 }}
                  className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
