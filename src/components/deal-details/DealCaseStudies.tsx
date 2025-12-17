import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Award, TrendingUp, Building2, Sparkles, ArrowUpRight } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

// Case study images
import caseFilaree from "@/assets/casestudy-filaree.jpg";
import caseEckhardt from "@/assets/casestudy-eckhardt.jpg";

interface DealCaseStudiesProps {
  deal: DealData;
}

const caseStudyImages: Record<string, string> = {
  "1501 Filaree Road, Malibu": caseFilaree,
  "6914 Eckhardt House, Hollywood Hills": caseEckhardt,
};

export const DealCaseStudies = ({ deal }: DealCaseStudiesProps) => {
  const [activeCase, setActiveCase] = useState(0);

  if (!deal.caseStudies || deal.caseStudies.length === 0) return null;

  const currentCase = deal.caseStudies[activeCase];

  const getCaseImage = (address: string, index: number) => {
    if (caseStudyImages[address]) return caseStudyImages[address];
    const fallbackImages = [caseFilaree, caseEckhardt];
    return fallbackImages[index % fallbackImages.length];
  };

  // Calculate total profit
  const totalProfit = deal.caseStudies.reduce((acc, cs) => {
    const profitNum = parseFloat(cs.profit.replace(/[^0-9.]/g, ''));
    return acc + (isNaN(profitNum) ? 0 : profitNum);
  }, 0);

  return (
    <section className="relative overflow-hidden">
      {/* Hero Header Section - Dark with Violet Accents */}
      <div className="py-24 bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-950 relative">
        {/* Animated gradient orbs */}
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-10 left-1/4 w-72 h-72 bg-violet-500/15 rounded-full blur-3xl"
        />
        
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12"
          >
            <div>
              {/* Magazine-style badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center shadow-xl shadow-violet-900/50">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-violet-500/50" />
                  <span className="text-[11px] tracking-[0.4em] uppercase text-violet-300/80 font-medium">
                    Success Stories
                  </span>
                </div>
              </motion.div>
              
              {/* Editorial Title */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] mb-6">
                Case{" "}
                <span className="italic font-serif bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent">
                  Studies
                </span>
              </h2>
              
              {/* Decorative line */}
              <div className="w-24 h-0.5 bg-gradient-to-r from-violet-500 to-transparent mb-6" />
              
              <p className="text-lg text-gray-400 max-w-xl font-light leading-relaxed">
                Detailed look at our most successful projects and proven track record
              </p>
            </div>
            
            {/* Stats Cards - Glass morphism */}
            <div className="flex gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-violet-600/20 rounded-2xl blur-xl group-hover:bg-violet-600/30 transition-colors" />
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-center">
                  <p className="text-5xl font-light text-white mb-1">{deal.caseStudies.length}</p>
                  <p className="text-[10px] text-violet-300/80 uppercase tracking-[0.2em]">Completed</p>
                </div>
              </motion.div>
              
              <div className="w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-violet-600/20 rounded-2xl blur-xl group-hover:bg-violet-600/30 transition-colors" />
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-light text-white">${totalProfit.toFixed(1)}M</span>
                  </div>
                  <p className="text-[10px] text-violet-300/80 uppercase tracking-[0.2em]">Total Profit</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Case Study Selector - Elegant Dark Bar */}
      <div className="bg-slate-950 py-5 border-y border-violet-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950/20 via-transparent to-violet-950/20" />
        
        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="flex flex-wrap gap-4">
            {deal.caseStudies.map((caseStudy, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCase(index)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-6 py-4 rounded-xl transition-all duration-500 ${
                  activeCase === index
                    ? "bg-gradient-to-br from-violet-600/30 to-violet-800/30 border border-violet-400/40 shadow-lg shadow-violet-900/30"
                    : "bg-slate-900/50 border border-slate-700/30 hover:border-violet-500/30 hover:bg-slate-900"
                }`}
              >
                {/* Active glow effect */}
                {activeCase === index && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-violet-500/10 rounded-xl blur-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeCase === index 
                      ? "bg-gradient-to-br from-violet-600 to-violet-800 shadow-lg shadow-violet-900/50" 
                      : "bg-slate-800/80 group-hover:bg-slate-800"
                  }`}>
                    <Building2 className={`w-5 h-5 ${activeCase === index ? "text-white" : "text-gray-400 group-hover:text-violet-300"}`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium truncate max-w-[180px] transition-colors ${
                      activeCase === index ? "text-white" : "text-gray-300 group-hover:text-white"
                    }`}>
                      {caseStudy.address.split(',')[0]}
                    </p>
                    <p className={`text-xs transition-colors ${activeCase === index ? "text-violet-300" : "text-gray-500 group-hover:text-gray-400"}`}>
                      {caseStudy.profit} profit
                    </p>
                  </div>
                  {activeCase === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 rounded-full bg-violet-400 ml-2 shadow-lg shadow-violet-400/50"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Premium Grey Background */}
      <div className="py-24 bg-gradient-to-b from-gray-100 to-gray-200 relative">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950/10 to-transparent" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                {/* Image Section - Editorial Style */}
                <motion.div 
                  className="relative"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/30 relative group">
                    <img 
                      src={getCaseImage(currentCase.address, activeCase)} 
                      alt={currentCase.address}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3 mb-4"
                      >
                        <div className="w-8 h-8 rounded-lg bg-violet-600/30 backdrop-blur-sm flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-violet-300" />
                        </div>
                        <span className="text-lg font-medium text-white">{currentCase.address}</span>
                      </motion.div>
                      {currentCase.architect && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-sm text-white/80 border border-white/10">
                          <Sparkles className="w-3 h-3 text-violet-300" />
                          {currentCase.architect}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-violet-600 to-slate-900 rounded-2xl -z-10 opacity-80" />
                  <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-violet-500/20 rounded-2xl -z-10" />
                </motion.div>

                {/* Details Section - Luxury Cards */}
                <div className="space-y-5">
                  {/* Financial Cards Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Acquisition", value: currentCase.acquisitionPrice, dark: false },
                      { label: "Construction", value: currentCase.constructionCost, dark: false },
                      { label: "Exit Price", value: currentCase.exitPrice, dark: false },
                      { label: "Profit", value: currentCase.profit, dark: true, icon: true },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        whileHover={{ y: -3, scale: 1.02 }}
                        className={`relative group rounded-2xl p-5 transition-all duration-300 overflow-hidden ${
                          item.dark 
                            ? "bg-gradient-to-br from-violet-700 to-slate-900 shadow-xl shadow-violet-900/30" 
                            : "bg-white shadow-lg hover:shadow-xl border border-gray-200/50"
                        }`}
                      >
                        {item.dark && (
                          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                            {item.icon && <TrendingUp className="w-3.5 h-3.5 text-violet-300" />}
                            <p className={`text-[10px] uppercase tracking-[0.15em] ${item.dark ? "text-violet-200/70" : "text-gray-400"}`}>
                              {item.label}
                            </p>
                          </div>
                          <p className={`text-xl font-light ${item.dark ? "text-white" : "text-slate-900"}`}>
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Property Specs - Premium Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50"
                  >
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-violet-500" />
                      Property Details
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[currentCase.size, currentCase.specs, currentCase.yearBuilt ? `Built ${currentCase.yearBuilt}` : null]
                        .filter(Boolean)
                        .map((spec, i) => (
                          <span 
                            key={i}
                            className="px-4 py-2 bg-gray-100 rounded-lg text-xs text-slate-700 border border-gray-200"
                          >
                            {spec}
                          </span>
                        ))}
                    </div>
                  </motion.div>

                  {/* Description - Dark Elegant Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 shadow-xl overflow-hidden"
                  >
                    {/* Violet accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-violet-400 to-violet-600" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] text-violet-300/70 uppercase tracking-[0.2em]">Project Summary</p>
                        <ArrowUpRight className="w-4 h-4 text-violet-400" />
                      </div>
                      <p className="text-sm text-gray-300 font-light leading-relaxed">
                        {currentCase.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom Accent Bar */}
      <div className="h-1.5 bg-gradient-to-r from-slate-900 via-violet-600 to-slate-900" />
    </section>
  );
};
