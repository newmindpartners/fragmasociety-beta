import { motion, AnimatePresence } from "framer-motion";
import { Target, Pickaxe, DollarSign, Lightbulb, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState, useEffect } from "react";

// Background image
import strategyBg from "@/assets/strategy-hero-bg.jpg";

interface DealStrategyProps {
  deal: DealData;
}

const strategyIcons: React.ElementType[] = [
  Target,
  Pickaxe,
  DollarSign,
  Lightbulb,
  LogOut,
];

export const DealStrategy = ({ deal }: DealStrategyProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!deal.strategies || deal.strategies.length === 0) return null;

  const cardsPerView = 3;
  const totalSlides = Math.ceil(deal.strategies.length / cardsPerView);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleStrategies = deal.strategies.slice(
    currentSlide * cardsPerView,
    currentSlide * cardsPerView + cardsPerView
  );

  return (
    <section className="py-32 relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={strategyBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-100/80" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header - Editorial Style */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-slate-400" />
            <span className="text-xs tracking-[0.4em] uppercase text-slate-500 font-medium">
              Strategy
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-light text-slate-900 leading-[1.15] tracking-tight"
          >
            A methodical approach
            <br />
            <span className="italic text-slate-500 font-serif">to exceptional returns</span>
          </motion.h2>
        </div>

        {/* Slider Navigation */}
        {deal.strategies.length > cardsPerView && (
          <div className="flex items-center justify-end gap-3 mb-8">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 border border-slate-300 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-slate-800 hover:border-slate-800 hover:text-white transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 border border-slate-300 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-slate-800 hover:border-slate-800 hover:text-white transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
            </motion.button>
            
            {/* Slide indicators */}
            <div className="flex items-center gap-2 ml-4">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1 transition-all duration-300 ${
                    idx === currentSlide 
                      ? 'w-8 bg-slate-800' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Strategy Cards - Slider */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleStrategies.map((strategy, localIndex) => {
                const globalIndex = currentSlide * cardsPerView + localIndex;
                const Icon = strategyIcons[globalIndex] || Lightbulb;
                const isHovered = hoveredIndex === globalIndex;

                return (
                  <motion.article
                    key={globalIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: localIndex * 0.1 }}
                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative cursor-pointer"
                  >
                    {/* Card */}
                    <motion.div 
                      className="relative p-10 h-full min-h-[380px] overflow-hidden"
                      style={{
                        background: isHovered 
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)'
                          : 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: isHovered 
                          ? '1px solid rgba(100, 116, 139, 0.25)' 
                          : '1px solid rgba(148, 163, 184, 0.2)',
                        boxShadow: isHovered 
                          ? '0 25px 60px -15px rgba(15, 23, 42, 0.15), 0 10px 30px -10px rgba(15, 23, 42, 0.1)'
                          : '0 4px 20px -5px rgba(0, 0, 0, 0.06)',
                      }}
                      animate={{ 
                        y: isHovered ? -10 : 0,
                        scale: isHovered ? 1.02 : 1 
                      }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {/* Decorative top line */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                      
                      {/* Decorative corner graphic - unique per card */}
                      <div className="absolute top-6 right-6 w-20 h-20 opacity-[0.06]">
                        {globalIndex === 0 && (
                          <svg viewBox="0 0 80 80" className="w-full h-full text-slate-900">
                            <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="40" cy="40" r="8" fill="currentColor" />
                            <path d="M40 10 L40 25 M40 55 L40 70 M10 40 L25 40 M55 40 L70 40" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        )}
                        {globalIndex === 1 && (
                          <svg viewBox="0 0 80 80" className="w-full h-full text-slate-900">
                            <rect x="10" y="15" width="45" height="55" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="25" y="25" width="45" height="55" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M18 30 L45 30 M18 38 L40 38 M18 46 L35 46" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        )}
                        {globalIndex === 2 && (
                          <svg viewBox="0 0 80 80" className="w-full h-full text-slate-900">
                            <rect x="15" y="35" width="20" height="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="45" y="20" width="20" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M25 15 L25 35 M55 10 L55 20" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="55" cy="7" r="3" fill="currentColor" />
                          </svg>
                        )}
                        {globalIndex === 3 && (
                          <svg viewBox="0 0 80 80" className="w-full h-full text-slate-900">
                            <path d="M10 65 L30 45 L45 55 L70 20" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="70" cy="20" r="5" fill="currentColor" />
                            <path d="M62 20 L70 20 L70 28" stroke="currentColor" strokeWidth="1.5" fill="none" />
                          </svg>
                        )}
                        {globalIndex === 4 && (
                          <svg viewBox="0 0 80 80" className="w-full h-full text-slate-900">
                            <rect x="15" y="20" width="35" height="45" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M50 35 L70 35 M65 30 L70 35 L65 40" stroke="currentColor" strokeWidth="2" />
                            <circle cx="32" cy="42" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        )}
                      </div>

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Step number - Large serif */}
                        <motion.div 
                          className="mb-10"
                          animate={{ 
                            scale: isHovered ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <span className={`text-8xl font-extralight tracking-tight transition-colors duration-500 font-serif ${
                            isHovered ? 'text-slate-300' : 'text-slate-200'
                          }`}>
                            {String(globalIndex + 1).padStart(2, '0')}
                          </span>
                        </motion.div>
                        
                        {/* Icon box */}
                        <motion.div 
                          className={`w-14 h-14 border flex items-center justify-center mb-8 transition-all duration-500 ${
                            isHovered 
                              ? 'border-slate-400 bg-slate-800 shadow-lg' 
                              : 'border-slate-200 bg-white'
                          }`}
                          animate={{ 
                            rotate: isHovered ? 3 : 0,
                            scale: isHovered ? 1.08 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className={`w-6 h-6 transition-colors duration-500 ${
                            isHovered ? 'text-white' : 'text-slate-400'
                          }`} strokeWidth={1.5} />
                        </motion.div>
                        
                        {/* Title & Description */}
                        <div className="mt-auto">
                          <motion.h3 
                            className={`text-xl font-medium mb-4 leading-tight transition-colors duration-500 ${
                              isHovered ? 'text-slate-900' : 'text-slate-800'
                            }`}
                            animate={{ y: isHovered ? -2 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {strategy.title}
                          </motion.h3>
                          
                          <p className={`text-sm leading-relaxed font-light transition-colors duration-500 ${
                            isHovered ? 'text-slate-600' : 'text-slate-500'
                          }`}>
                            {strategy.description}
                          </p>
                        </div>
                      </div>

                      {/* Bottom accent line - violet/navy gradient */}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-slate-800 via-violet-600 to-slate-600"
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? '100%' : 0 }}
                        transition={{ duration: 0.4 }}
                      />

                      {/* Hover glow effect */}
                      <motion.div 
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.03) 0%, transparent 70%)'
                        }}
                      />
                    </motion.div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots for mobile */}
        {deal.strategies.length > cardsPerView && (
          <div className="flex items-center justify-center gap-3 mt-10 lg:hidden">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'w-6 bg-slate-800' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-slate-200/50"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-2 h-2 rounded-full bg-gradient-to-r from-slate-700 to-violet-600"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-sm text-slate-500 tracking-wide font-light">
              Each phase executed with precision to maximize value creation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
