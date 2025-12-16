import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Shield, TrendingUp, Repeat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import signatureDealBg from "@/assets/signature-deal-experts-panel.jpg";

const pillars = [
  {
    icon: BookOpen,
    title: "A Strong Story",
    description: "Every deal is built around a compelling narrative and proven industry leader.",
  },
  {
    icon: Shield,
    title: "Clear Legal Structure",
    description: "Compliant asset structuring with transparent ownership and governance.",
  },
  {
    icon: TrendingUp,
    title: "Transparent Yield",
    description: "Clear return objectives with automated distribution mechanisms.",
  },
  {
    icon: Repeat,
    title: "Secondary Liquidity",
    description: "Optional marketplace access to trade your position before maturity.",
  },
];

export const HowSignatureDealsWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Image - Blurred */}
      <div className="absolute inset-0">
        <img 
          src={signatureDealBg} 
          alt="" 
          className="w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>
      
      {/* Ambient glows */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
          >
            <span className="text-sm font-medium text-white">For Issuers & Investors</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-foreground">Designed with leaders, </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">built for investors.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            We work hand-in-hand with each industry leader to structure a compliant, attractive, 
            and long-term aligned investment product. Every Signature Deal combines:
          </motion.p>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group relative p-6 rounded-2xl overflow-hidden"
            >
              {/* Animated border glow */}
              <motion.div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05), rgba(255,255,255,0.15))',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Glow effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              
              {/* Glass card */}
              <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-white/25 group-hover:bg-white/10 transition-all duration-500 p-6">
                {/* Icon with glow */}
                <div className="relative w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-300">
                  <div className="absolute inset-0 rounded-xl bg-white/20 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <pillar.icon className="w-7 h-7 text-white relative z-10" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6">
            Have a vision? Let's create your Signature Deal together.
          </p>
          <Button asChild size="lg" variant="outline" className="group border-white text-white hover:bg-white hover:text-background">
            <Link to="/signature-deal">
              Launch your Signature Deal
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
