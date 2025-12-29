import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { EarlyAccessModal } from "./early-access/EarlyAccessModal";

import ctaBg from "@/assets/signature-deal-cta-bg.jpg";

export const RequestAccessForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={ctaBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-4">
              Register your interest
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Join our exclusive investor community
            </p>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-white text-slate-900 hover:bg-white/90 rounded-full h-14 px-8 text-base font-medium shadow-xl shadow-white/10"
            >
              <span className="flex items-center gap-2">
                Get early access
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>

            <p className="text-center text-xs text-white/40 pt-6">
              Capital at risk. Access depends on eligibility and jurisdiction.
            </p>
          </motion.div>
        </div>
      </div>

      <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};
