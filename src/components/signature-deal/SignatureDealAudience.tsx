import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Palette, 
  Trophy, 
  Gem, 
  Film, 
  Music, 
  Building2, 
  Briefcase, 
  Users, 
  Crown,
  Sparkles
} from "lucide-react";

const audiences = [
  { icon: Palette, label: "Designers & Architects" },
  { icon: Trophy, label: "Athletes & Champions" },
  { icon: Gem, label: "Luxury Brands" },
  { icon: Film, label: "Film Studios & Producers" },
  { icon: Music, label: "Musicians & Entertainment IP Owners" },
  { icon: Building2, label: "Real Estate Developers" },
  { icon: Briefcase, label: "High-Value Asset Owners" },
  { icon: Users, label: "Entrepreneurs with a Loyal Audience" },
  { icon: Crown, label: "Cultural Icons & Lifestyle Brands" },
];

export const SignatureDealAudience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-white/70" />
            <span className="text-sm text-white/70 font-medium">Perfect For</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Who Should Launch a
            <br />
            <span className="text-gradient">Signature Deal?</span>
          </h2>
        </motion.div>

        {/* Audience Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {audiences.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <motion.div
                  key={audience.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group flex items-center gap-3 px-5 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-default"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {audience.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-block px-8 py-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10">
            <p className="text-white/50 text-lg mb-2">
              If you have a valuable asset or a strong brand —
            </p>
            <p className="text-white text-xl font-semibold">
              your community <span className="text-gradient">wants to invest</span> in your success.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
