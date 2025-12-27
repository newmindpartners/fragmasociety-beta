import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FAQContact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-slate-900">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Decorative elements - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-[20%] w-64 h-64 rounded-full bg-turquoise/10 blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/4 right-[20%] w-80 h-80 rounded-full bg-white/5 blur-3xl"
        />
        <div className="absolute top-1/2 left-0 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 right-0 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mb-6 sm:mb-8 rounded-xl sm:rounded-2xl bg-turquoise/10 border border-turquoise/20"
          >
            <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 text-turquoise" strokeWidth={1.5} />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white leading-[1.1] mb-4 sm:mb-6"
          >
            Still have <span className="text-turquoise italic">questions?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-white/50 mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed px-2"
          >
            Our investor relations team is here to help. Reach out and we'll get back to you within 24 hours.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href="mailto:support@fragma.io"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-slate-900 font-medium px-6 sm:px-8 py-5 sm:py-6 h-auto text-sm sm:text-base rounded-full shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 mr-2 sm:mr-3" strokeWidth={1.5} />
                Contact Support
                <ArrowRight className="w-4 h-4 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Button>
            </motion.a>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 sm:mt-8 text-xs sm:text-sm text-white/30"
          >
            support@fragma.io · Response within 24 hours
          </motion.p>
        </motion.div>

        {/* Bottom decorative element - hidden on mobile */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 sm:mt-16 hidden sm:flex justify-center"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
