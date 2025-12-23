import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FAQContact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Premium Light Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      
      {/* Subtle geometric pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-px h-40 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
        <div className="absolute top-1/2 right-0 w-px h-40 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
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
            className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-turquoise/10 border border-turquoise/20"
          >
            <MessageCircle className="w-7 h-7 text-turquoise" strokeWidth={1.5} />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 leading-[1.1] mb-6"
          >
            Still have <span className="text-turquoise italic">questions?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-slate-500 mb-10 max-w-lg mx-auto leading-relaxed"
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
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-6 h-auto text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 mr-3" strokeWidth={1.5} />
                Contact Support
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Button>
            </motion.a>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-sm text-slate-400"
          >
            support@fragma.io · Response within 24 hours
          </motion.p>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
