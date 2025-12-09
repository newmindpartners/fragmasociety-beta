import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useState } from "react";

const interestOptions = [
  "Own a piece of Film & Entertainment",
  "Own a piece of Real Estate & Hospitality",
  "Own a piece of Financial Instruments (bonds, funds, revenue-sharing, etc.)",
  "Own a piece of Luxury Goods & Collectibles (art, spirits, watches, etc.)",
  "Build a diversified portfolio of alternative assets",
  "Use Fragma to raise capital for my asset",
];

export const Hero = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Badge>NEW • Tokenized RWA on Cardano</Badge>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
            Own a Piece <br />
            <span className="text-gradient">
              of the Stories
            </span>
            <br />
            You Love
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Fractional ownership in film, funds, equity, real estate and more — curated deals for eligible investors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-center text-foreground font-medium mb-6">
            What brings you here today?
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {interestOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleInterest(option)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedInterests.includes(option)
                    ? "bg-primary text-primary-foreground border-primary shadow-turquoise"
                    : "bg-card/50 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="hero" size="lg" className="group">
              Browse Deals
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
