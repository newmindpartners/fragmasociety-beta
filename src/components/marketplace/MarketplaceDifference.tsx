import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

const ComparisonRow = ({ 
  feature, 
  traditional, 
  fragma, 
  delay 
}: { 
  feature: string; 
  traditional: boolean; 
  fragma: boolean; 
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="grid grid-cols-3 gap-4 py-4 border-b border-border/30 hover:bg-primary/5 transition-colors rounded-lg px-4"
  >
    <span className="text-foreground font-medium">{feature}</span>
    <div className="flex justify-center">
      {traditional ? (
        <Check className="w-5 h-5 text-muted-foreground" />
      ) : (
        <X className="w-5 h-5 text-red-400" />
      )}
    </div>
    <div className="flex justify-center">
      {fragma ? (
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-primary" />
        </motion.div>
      ) : (
        <X className="w-5 h-5 text-red-400" />
      )}
    </div>
  </motion.div>
);

export const MarketplaceDifference = () => {
  const comparisons = [
    { feature: "True order book trading", traditional: false, fragma: true },
    { feature: "Non-custodial wallets", traditional: false, fragma: true },
    { feature: "Set your own price", traditional: false, fragma: true },
    { feature: "On-chain settlement", traditional: false, fragma: true },
    { feature: "Options trading", traditional: false, fragma: true },
    { feature: "No platform price control", traditional: false, fragma: true },
    { feature: "Decentralized architecture", traditional: false, fragma: true },
  ];

  return (
    <section className="py-24 section-gradient-diagonal relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 section-dots opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              The Difference
            </span>
            
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              What makes our secondary market{" "}
              <span className="text-gradient">different?</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Most platforms only allow simple buy/sell buttons, custodial wallets, 
              and price feeds controlled by the platform.
            </p>

            <div className="glass rounded-2xl p-6 mb-8">
              <p className="text-foreground font-medium mb-4">
                Fragma Society is different — we give you a true marketplace, 
                similar to a traditional exchange, but 100% decentralized and non-custodial.
              </p>
              <div className="flex items-center gap-3 text-primary">
                <ArrowRight className="w-5 h-5" />
                <span className="font-medium">You're not trading on Fragma.</span>
              </div>
              <p className="text-muted-foreground mt-2 ml-8">
                You're trading with other people, using Fragma as the secure settlement layer.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20"
              >
                <span className="text-green-400 font-medium">Safer</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20"
              >
                <span className="text-primary font-medium">More Transparent</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20"
              >
                <span className="text-accent font-medium">Full Freedom</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-border">
              <span className="text-muted-foreground font-medium">Feature</span>
              <span className="text-center text-muted-foreground font-medium">Traditional</span>
              <span className="text-center text-primary font-medium">Fragma</span>
            </div>

            {/* Rows */}
            {comparisons.map((item, index) => (
              <ComparisonRow
                key={item.feature}
                {...item}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
