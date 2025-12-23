import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import ctaBg from "@/assets/signature-deal-cta-bg.jpg";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

export const SignatureDealCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Thank you! We'll be in touch soon.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden" ref={containerRef}>
      {/* Full background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />
      
      {/* Premium dark overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/75 to-slate-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.7)_100%)]" />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Ambient light effects */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-violet-500/[0.08] via-slate-500/[0.05] to-transparent rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-medium">
              Ready to Launch?
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30" />
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1] mb-8"
          >
            Ready to launch your
            <br />
            <span className="italic text-white/50 font-serif">Signature Deal?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Let's design a premium investment product around your vision — 
            and open it to investors worldwide.
          </motion.p>

          {/* Email Capture Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 px-5 bg-white/[0.08] border-white/10 text-white placeholder:text-white/30 
                rounded-sm backdrop-blur-sm
                focus:border-white/30 focus:ring-0 focus:bg-white/[0.12]
                transition-all duration-300"
              required
            />
            <Button 
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-14 px-8 bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15
                rounded-sm backdrop-blur-sm font-medium tracking-wide
                hover:border-white/30 transition-all duration-300
                disabled:opacity-50"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </motion.form>

          {/* Book a Call CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8"
          >
            <Button 
              size="lg"
              className="h-14 px-10 bg-white hover:bg-white/90 text-slate-900
                rounded-sm font-medium tracking-wide
                shadow-[0_20px_60px_-15px_rgba(255,255,255,0.25)]
                hover:shadow-[0_25px_70px_-15px_rgba(255,255,255,0.35)]
                transition-all duration-300"
            >
              <Phone className="mr-3 w-4 h-4" />
              Book a Strategy Call
            </Button>
          </motion.div>

          {/* Privacy note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs text-white/25"
          >
            By submitting, you agree to receive updates. No spam, unsubscribe anytime.
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/10" />
    </section>
  );
};
