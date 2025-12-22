import { motion } from "framer-motion";
import { ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const benefits = [
  "Access our full deal pipeline",
  "Review investment memoranda",
  "Connect with our team"
];

export const StrategyCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Deep neutral background - matching homepage */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950" />
      
      {/* Atmospheric Effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-[400px] h-[300px] bg-neutral-800/30 rounded-full blur-3xl" />
        <div className="absolute -top-10 -right-10 w-[350px] h-[250px] bg-neutral-700/20 rounded-full blur-3xl" />
      </div>
      
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-6 bg-gradient-to-r from-white/30 to-transparent" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-medium">
              Ready to Start?
            </span>
            <div className="h-px w-6 bg-gradient-to-l from-white/30 to-transparent" />
          </motion.div>
          
          {/* Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-[1.1] text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            One step to complete access
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 mb-10 leading-relaxed max-w-xl mx-auto"
          >
            Register to explore the full Fragma One opportunity. 
            No commitment required.
          </motion.p>

          {/* Benefits */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-white/50"
              >
                <CheckCircle2 className="w-4 h-4 text-white/40" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="group bg-white text-neutral-900 hover:bg-white/90 rounded-full px-8 h-14 text-base font-medium transition-all duration-500"
            >
              <Link to="/auth" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Create Your Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xs text-white/30"
          >
            For qualified investors · Luxembourg-regulated · Capital at risk
          </motion.p>
        </div>
      </div>
      
      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};
