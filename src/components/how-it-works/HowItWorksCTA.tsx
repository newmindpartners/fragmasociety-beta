import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import howItWorksCtaBg from "@/assets/how-it-works-cta-bg.jpg";

export const HowItWorksCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${howItWorksCtaBg})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/85" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white"
          >
            Ready to make your{" "}
            <span className="text-gradient">
              first investment?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white/60 mb-10 leading-relaxed"
          >
            Start small, learn the platform, and build a portfolio of Signature Deals over time. 
            Fragma Society gives you institutional-grade tools in a simple, user-friendly experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="group bg-white text-background hover:bg-white/90 font-semibold px-8">
              <Link to="/live-deals">
                Browse Signature Deals
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group border-white text-white hover:bg-white hover:text-background px-8">
              <Link to="/membership">
                <Crown className="mr-2 w-4 h-4" />
                Apply for Elite Member access
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
