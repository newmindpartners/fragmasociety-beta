import { motion } from "framer-motion";
import { Flame, CheckCircle, ArrowRight, MapPin, TrendingUp } from "lucide-react";
import type { DealData } from "@/types/deal";
import palisadesImage from "@/assets/palisades-rebuild.jpg";

interface DealSpecialOpportunityProps {
  deal: DealData;
}

export const DealSpecialOpportunity = ({ deal }: DealSpecialOpportunityProps) => {
  if (!deal.specialOpportunity) return null;

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={palisadesImage} 
          alt="Pacific Palisades Rebuild" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with violet tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-violet-950/70 to-black/90" />
        {/* Additional overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      {/* Floating accent shapes */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 left-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Magazine-style header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-400/50" />
          <span className="text-[10px] text-violet-300/70 uppercase tracking-[0.4em] font-light">Exclusive Insight</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-400/50" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 backdrop-blur-sm border border-violet-400/30 mb-8"
            >
              <Flame className="w-4 h-4 text-violet-300" />
              <span className="text-xs text-violet-200 uppercase tracking-wider font-medium">Special Opportunity</span>
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              {deal.specialOpportunity.title.split(' ').map((word, i) => (
                <span key={i} className={i === 0 ? 'text-violet-300' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h2>

            {/* Decorative line */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-violet-500 to-transparent mb-8" />

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300/90 leading-relaxed font-light mb-10">
              {deal.specialOpportunity.description}
            </p>

            {/* Location indicator */}
            <div className="flex items-center gap-3 text-gray-400 mb-8">
              <MapPin className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-light tracking-wide">Pacific Palisades, California</span>
            </div>
          </motion.div>

          {/* Right: Glass Card with Bullet Points */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Glass card */}
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 overflow-hidden">
              {/* Card accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-violet-400 to-violet-600" />
              
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-violet-500/5 rounded-2xl" />
              
              <div className="relative z-10">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-violet-300" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Key Advantages</p>
                    <p className="text-white font-medium">Why This Matters</p>
                  </div>
                </div>

                {/* Bullet Points */}
                {deal.specialOpportunity.bulletPoints && (
                  <div className="space-y-5">
                    {deal.specialOpportunity.bulletPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-violet-500/30 transition-colors">
                          <CheckCircle className="w-3.5 h-3.5 text-violet-300" />
                        </div>
                        <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="mt-10 pt-6 border-t border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                      <span className="text-gray-400 text-sm font-light">High-value coastal submarket</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-violet-400" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating decorative element */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-violet-600/10 rounded-2xl blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
