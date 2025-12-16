import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Phone } from "lucide-react";
import ctaBg from "@/assets/signature-deal-cta-bg.jpg";

export const SignatureDealCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />
      
      {/* Dark navy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,50%,3%)/92] via-[hsl(220,45%,5%)/88] to-[hsl(220,50%,3%)/92]" />
      
      {/* Additional depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(220,50%,2%)/60_100%)]" />
      
      {/* White ambient glows */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-full blur-[200px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-white/[0.05] rounded-full blur-[150px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${15 + (i * 10)}%`,
            top: `${30 + (i % 3) * 15}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Premium glass card */}
          <div className="relative p-12 md:p-16 rounded-3xl 
            bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent
            backdrop-blur-2xl 
            border border-white/[0.1] 
            overflow-hidden
            shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            {/* White decorative glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-white/[0.1] to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-white/[0.08] to-transparent rounded-full blur-3xl" />
            
            {/* Top highlight line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 text-center">
              {/* Badge with white accent */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
                  bg-white/[0.08] backdrop-blur-xl
                  border border-white/[0.15] 
                  mb-8 relative overflow-hidden
                  shadow-[0_4px_20px_-5px_rgba(255,255,255,0.1)]"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-semibold">Ready to Launch?</span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6"
              >
                Ready to launch your
                <br />
                <span className="text-white">
                  Signature Deal?
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-white/60 max-w-2xl mx-auto mb-10"
              >
                Let's design a premium investment product around your vision —
                and open it to investors worldwide.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg" 
                  className="group text-base px-8 py-6 bg-white text-background hover:bg-white/90 
                    shadow-[0_8px_30px_-10px_rgba(255,255,255,0.3)]
                    hover:shadow-[0_12px_40px_-10px_rgba(255,255,255,0.4)]
                    transition-all duration-300"
                >
                  Start Your Deal
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base px-8 py-6 
                    border-white/30 text-white/80 
                    hover:bg-white/10 hover:text-white hover:border-white/50
                    backdrop-blur-xl
                    transition-all duration-300"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Book a Strategy Call
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
