import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronRight, Award, TrendingUp, Building2, CheckCircle2 } from "lucide-react";
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

  return (
    <section className="relative overflow-hidden">
      {/* Header Section - White/Light */}
      <div className="py-20 bg-white relative">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
                             linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs tracking-[0.4em] uppercase text-slate-500 font-medium">
                  Success Stories
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.1] mb-4">
                Case <span className="italic text-slate-500 font-serif">Studies</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-xl font-light">
                Detailed look at our most successful projects
              </p>
            </div>
            
            {/* Quick Stats Summary */}
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-4xl font-light text-slate-900">{deal.caseStudies.length}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Projects</p>
              </div>
              <div className="w-px bg-slate-200" />
              <div className="text-center">
                <p className="text-4xl font-light text-slate-900">100%</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Success Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Case Study Selector - Subtle Dark */}
      <div className="bg-slate-900 py-6 border-y border-slate-800">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3">
            {deal.caseStudies.map((caseStudy, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCase(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-6 py-4 rounded-xl transition-all duration-300 ${
                  activeCase === index
                    ? "bg-slate-800 border-2 border-slate-500 shadow-lg shadow-slate-900/50"
                    : "bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    activeCase === index ? "bg-slate-700" : "bg-slate-700/50"
                  }`}>
                    <Building2 className={`w-5 h-5 ${activeCase === index ? "text-white" : "text-slate-400"}`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium truncate max-w-[180px] ${
                      activeCase === index ? "text-white" : "text-slate-300"
                    }`}>
                      {caseStudy.address.split(',')[0]}
                    </p>
                    <p className={`text-xs ${activeCase === index ? "text-slate-400" : "text-slate-500"}`}>
                      {caseStudy.profit} profit
                    </p>
                  </div>
                  {activeCase === index && (
                    <div className="w-2 h-2 rounded-full bg-white ml-2" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Grey Background */}
      <div className="py-20 bg-slate-100 relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950 to-transparent opacity-10" />
        
        <div className="container mx-auto px-6 lg:px-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Image Section */}
                <div className="lg:col-span-3 relative">
                  <div className="aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative">
                    <img 
                      src={getCaseImage(currentCase.address, activeCase)} 
                      alt={currentCase.address}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-4 h-4 text-white/70" />
                        <span className="text-lg font-medium text-white">{currentCase.address}</span>
                      </div>
                      {currentCase.architect && (
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-sm text-white/80">
                          {currentCase.architect}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-900 rounded-2xl -z-10" />
                </div>

                {/* Details Section */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Financial Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200 group hover:shadow-xl transition-shadow">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Acquisition</p>
                      <p className="text-xl font-light text-slate-900">{currentCase.acquisitionPrice}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200 group hover:shadow-xl transition-shadow">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Construction</p>
                      <p className="text-xl font-light text-slate-900">{currentCase.constructionCost}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200 group hover:shadow-xl transition-shadow">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Exit Price</p>
                      <p className="text-xl font-light text-slate-900">{currentCase.exitPrice}</p>
                    </div>
                    <div className="bg-slate-900 rounded-2xl p-5 shadow-xl group hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-3 h-3 text-white/60" />
                        <p className="text-[10px] text-white/60 uppercase tracking-wider">Profit</p>
                      </div>
                      <p className="text-xl font-light text-white">{currentCase.profit}</p>
                    </div>
                  </div>

                  {/* Property Specs */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-4">Property Details</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-slate-100 rounded-lg text-xs text-slate-700">
                        {currentCase.size}
                      </span>
                      <span className="px-4 py-2 bg-slate-100 rounded-lg text-xs text-slate-700">
                        {currentCase.specs}
                      </span>
                      {currentCase.yearBuilt && (
                        <span className="px-4 py-2 bg-slate-100 rounded-lg text-xs text-slate-700">
                          Built {currentCase.yearBuilt}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {currentCase.description}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200" />
    </section>
  );
};