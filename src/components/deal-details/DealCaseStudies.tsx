import { motion } from "framer-motion";
import { MapPin, ChevronRight } from "lucide-react";
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
    <section className="py-32 relative overflow-hidden bg-slate-900">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-slate-600" />
            <span className="text-xs tracking-[0.4em] uppercase text-slate-500 font-medium">
              Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
            Case <span className="italic text-slate-400 font-serif">Studies</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl font-light">
            Detailed look at our most successful projects
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Case Study Selector */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              {deal.caseStudies.map((caseStudy, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCase(index)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-6 border transition-all duration-300 ${
                    activeCase === index
                      ? "bg-slate-800 border-slate-600"
                      : "border-slate-700 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white mb-2 truncate">
                        {caseStudy.address}
                      </p>
                      <p className="text-xs text-slate-400">{caseStudy.profit} profit</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                      activeCase === index ? "text-white rotate-90" : "text-slate-600"
                    }`} />
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Case Study Details */}
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2 border border-slate-700 overflow-hidden"
            >
              {/* Header Image */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <img 
                  src={getCaseImage(currentCase.address, activeCase)} 
                  alt={currentCase.address}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-white">{currentCase.address}</span>
                  </div>
                  {currentCase.architect && (
                    <span className="px-3 py-1.5 border border-slate-600 text-xs text-slate-300 bg-slate-900/50 backdrop-blur-sm">
                      {currentCase.architect}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-8">
                {/* Financial Summary */}
                <div className="grid grid-cols-4 gap-px bg-slate-700/50 mb-8">
                  <div className="bg-slate-900 p-4 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Acquisition</p>
                    <p className="text-sm font-medium text-white">{currentCase.acquisitionPrice}</p>
                  </div>
                  <div className="bg-slate-900 p-4 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Construction</p>
                    <p className="text-sm font-medium text-white">{currentCase.constructionCost}</p>
                  </div>
                  <div className="bg-slate-900 p-4 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Exit Price</p>
                    <p className="text-sm font-medium text-white">{currentCase.exitPrice}</p>
                  </div>
                  <div className="bg-slate-800 p-4 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Profit</p>
                    <p className="text-sm font-medium text-white">{currentCase.profit}</p>
                  </div>
                </div>

                {/* Property Details */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-4 py-2 border border-slate-700 text-xs text-slate-300">
                      {currentCase.size}
                    </span>
                    <span className="px-4 py-2 border border-slate-700 text-xs text-slate-300">
                      {currentCase.specs}
                    </span>
                    {currentCase.yearBuilt && (
                      <span className="px-4 py-2 border border-slate-700 text-xs text-slate-300">
                        Built {currentCase.yearBuilt}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-8">
                  {currentCase.description}
                </p>

                {/* Features */}
                {currentCase.features && currentCase.features.length > 0 && (
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-4">Key Features</p>
                    <div className="flex flex-wrap gap-2">
                      {currentCase.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-xs text-slate-300">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
