import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export const BigPicture = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              From{" "}
              <span className="text-muted-foreground">"I like this project"</span>
              {" "}to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                "I own a piece of it."
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Fragma Society turns real-world projects and assets — like villas, film slates, 
              sports portfolios, luxury goods, credit deals and funds — into digital shares 
              ("tokens") that you can buy in smaller amounts.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              You choose a Signature Deal, invest what you're comfortable with, receive tokens 
              that prove your ownership, earn when the asset generates income, and later may be 
              able to sell your position on our decentralized secondary marketplace (when liquidity 
              is available).
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
