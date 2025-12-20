import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Award, TrendingUp, Building2, Sparkles, ArrowUpRight } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

// Case study images - using track record images
import filareeHeights from "@/assets/track-record/filaree-heights.jpg";
import coolOakWay from "@/assets/track-record/cool-oak-way.jpg";
import sunsetPlaza from "@/assets/track-record/sunset-plaza.jpg";
import seaboardRd from "@/assets/track-record/seaboard-rd.jpg";
import risingGlen from "@/assets/track-record/rising-glen.jpg";
import casianoRd from "@/assets/track-record/casiano-rd.jpg";
import lomaVista from "@/assets/track-record/loma-vista.jpg";
import calvinAve from "@/assets/track-record/calvin-ave.jpg";

interface DealCaseStudiesProps {
  deal: DealData;
}

const caseStudyImages: Record<string, string> = {
  "5901 Filaree Heights, Malibu": filareeHeights,
  "20737 Cool Oak Way, Malibu": coolOakWay,
  "2460 Sunset Plaza Dr, Los Angeles": sunsetPlaza,
  "20647 Seaboard Rd, Malibu": seaboardRd,
  "8818 Rising Glen Place, Los Angeles": risingGlen,
  "1394 Casiano Rd, Los Angeles": casianoRd,
  "1061 Loma Vista Dr, Beverly Hills": lomaVista,
  "4965 Calvin Avenue, Tarzana": calvinAve,
};

export const DealCaseStudies = ({ deal }: DealCaseStudiesProps) => {
  const [activeCase, setActiveCase] = useState(0);

  if (!deal.caseStudies || deal.caseStudies.length === 0) return null;

  const currentCase = deal.caseStudies[activeCase];

  const getCaseImage = (address: string, index: number) => {
    if (caseStudyImages[address]) return caseStudyImages[address];
    // Fallback to first available image
    const images = [filareeHeights, coolOakWay, sunsetPlaza, seaboardRd, risingGlen, casianoRd, lomaVista, calvinAve];
    return images[index % images.length];
  };

  // Format profit to $X.XM format
  const formatProfit = (profit: string): string => {
    const num = parseFloat(profit.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return profit;
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    return profit;
  };

  // Calculate total profit
  const totalProfit = deal.caseStudies.reduce((acc, cs) => {
    const profitNum = parseFloat(cs.profit.replace(/[^0-9.]/g, ''));
    return acc + (isNaN(profitNum) ? 0 : profitNum);
  }, 0);

  return (
    <section className="relative overflow-hidden">
      {/* Hero Header Section - Dark Navy Gradient Background */}
      <div className="py-24 relative">
        {/* Dark Navy Gradient Background - matching Timeline section */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1424] to-[#111827]" />
        
        {/* Atmospheric Effects */}
        <div className="absolute inset-0">
          {/* Top violet glow */}
          <div className="absolute -top-32 -right-32 w-[600px] h-[400px] bg-gradient-to-bl from-violet-900/20 via-violet-800/10 to-transparent rounded-full blur-3xl" />
          {/* Left navy accent */}
          <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-gradient-to-r from-slate-800/30 via-indigo-900/20 to-transparent rounded-full blur-3xl" />
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0f1a]/80 to-transparent" />
          {/* Subtle center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-900/5 rounded-full blur-[100px]" />
        </div>
        
        {/* Top border line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12"
          >
            <div>
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-12 h-px bg-slate-600" />
                <span className="text-xs tracking-[0.4em] uppercase text-slate-400 font-medium">
                  Success Stories
                </span>
              </motion.div>
              
              {/* Editorial Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
                Case{" "}
                <span className="italic font-serif text-slate-400">
                  Studies
                </span>
              </h2>
              
              <p className="text-lg text-slate-500 max-w-xl font-light leading-relaxed">
                Detailed look at our most successful projects and proven track record
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="flex gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 text-center bg-slate-800/50 border border-slate-700/50"
              >
                <p className="text-4xl font-light text-white mb-1">{deal.caseStudies.length}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Completed</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-6 text-center bg-white/5 border border-white/10"
              >
                <p className="text-4xl font-light text-white">${(totalProfit / 1000000).toFixed(1)}M</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Total Profit</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Case Study Selector - Elegant Dark Bar */}
      <div className="bg-[#0a0f1a] py-5 border-y border-slate-700/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-transparent to-slate-900/50" />
        
        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="flex flex-wrap gap-4">
            {deal.caseStudies.map((caseStudy, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCase(index)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-5 py-3 rounded transition-all duration-500 ${
                  activeCase === index
                    ? "bg-slate-800 border border-slate-600/50"
                    : "bg-slate-900/50 border border-slate-800/50 hover:border-slate-600/50 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div className={`w-10 h-10 rounded flex items-center justify-center transition-all duration-300 ${
                    activeCase === index 
                      ? "bg-slate-700" 
                      : "bg-slate-800/80 group-hover:bg-slate-700"
                  }`}>
                    <Building2 className={`w-4 h-4 ${activeCase === index ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium truncate max-w-[160px] transition-colors ${
                      activeCase === index ? "text-white" : "text-slate-300 group-hover:text-white"
                    }`}>
                      {caseStudy.address.split(',')[0]}
                    </p>
                    <p className={`text-xs transition-colors ${activeCase === index ? "text-slate-400" : "text-slate-500 group-hover:text-slate-400"}`}>
                      {formatProfit(caseStudy.profit)} profit
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Dark Navy Background */}
      <div className="py-24 relative">
        {/* Dark Navy Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1424] to-[#111827]" />
        
        {/* Subtle glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-violet-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-slate-800/30 rounded-full blur-3xl" />
        </div>
        
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
                {/* Image Section */}
                <motion.div 
                  className="relative"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/3] rounded overflow-hidden shadow-2xl shadow-black/50 relative group border border-slate-700/50">
                    <img 
                      src={getCaseImage(currentCase.address, activeCase)} 
                      alt={currentCase.address}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/40 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3 mb-3"
                      >
                        <div className="w-8 h-8 rounded bg-slate-800/80 backdrop-blur-sm flex items-center justify-center border border-slate-600/50">
                          <MapPin className="w-4 h-4 text-slate-300" />
                        </div>
                        <span className="text-base font-medium text-white">{currentCase.address}</span>
                      </motion.div>
                      {currentCase.architect && (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 backdrop-blur-sm rounded text-sm text-slate-300 border border-slate-600/50">
                          <Sparkles className="w-3 h-3 text-slate-400" />
                          {currentCase.architect}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Details Section */}
                <div className="space-y-4">
                  {/* Financial Cards Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Acquisition", value: currentCase.acquisitionPrice, dark: false },
                      { label: "Construction", value: currentCase.constructionCost, dark: false },
                      { label: "Exit Price", value: currentCase.exitPrice, dark: false },
                      { label: "Profit", value: formatProfit(currentCase.profit), dark: true, icon: true },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        whileHover={{ y: -2 }}
                        className={`relative group rounded p-5 transition-all duration-300 overflow-hidden ${
                          item.dark 
                            ? "bg-slate-800 border border-slate-600/50" 
                            : "bg-slate-800/50 border border-slate-700/50"
                        }`}
                      >
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                            {item.icon && <TrendingUp className="w-3.5 h-3.5 text-slate-400" />}
                            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
                              {item.label}
                            </p>
                          </div>
                          <p className={`text-xl font-light ${item.dark ? "text-white" : "text-slate-200"}`}>
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Property Specs Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800/50 rounded p-5 border border-slate-700/50"
                  >
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-slate-600" />
                      Property Details
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[currentCase.size, currentCase.specs, currentCase.yearBuilt ? `Built ${currentCase.yearBuilt}` : null]
                        .filter(Boolean)
                        .map((spec, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 bg-slate-700/50 rounded text-xs text-slate-300 border border-slate-600/50"
                          >
                            {spec}
                          </span>
                        ))}
                    </div>
                  </motion.div>

                  {/* Description Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative bg-slate-800/80 rounded p-5 border border-slate-700/50 overflow-hidden"
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Project Summary</p>
                        <ArrowUpRight className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-sm text-slate-400 font-light leading-relaxed">
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
      <div className="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
    </section>
  );
};
