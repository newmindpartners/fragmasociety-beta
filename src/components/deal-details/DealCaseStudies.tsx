import { motion } from "framer-motion";
import { MapPin, Award, ChevronRight } from "lucide-react";
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
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Award className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Case </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Studies
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Detailed look at our most successful projects
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Case Study Selector */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              {deal.caseStudies.map((caseStudy, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCase(index)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeCase === index
                      ? "bg-primary/10 border-primary/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1 truncate">
                        {caseStudy.address}
                      </p>
                      <p className="text-xs text-green-400 font-medium">{caseStudy.profit} profit</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      activeCase === index ? "text-primary rotate-90" : "text-white/30"
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
              className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Header Image */}
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={getCaseImage(currentCase.address, activeCase)} 
                  alt={currentCase.address}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{currentCase.address}</span>
                  </div>
                  {currentCase.architect && (
                    <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-muted-foreground">
                      {currentCase.architect}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                {/* Financial Summary */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">Acquisition</p>
                    <p className="text-sm font-bold text-foreground">{currentCase.acquisitionPrice}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">Construction</p>
                    <p className="text-sm font-bold text-foreground">{currentCase.constructionCost}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">Exit Price</p>
                    <p className="text-sm font-bold text-foreground">{currentCase.exitPrice}</p>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-green-400 uppercase mb-1">Profit</p>
                    <p className="text-sm font-bold text-green-400">{currentCase.profit}</p>
                  </div>
                </div>

                {/* Property Details */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-muted-foreground">
                      {currentCase.size}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-muted-foreground">
                      {currentCase.specs}
                    </span>
                    {currentCase.yearBuilt && (
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-muted-foreground">
                        Built {currentCase.yearBuilt}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {currentCase.description}
                </p>

                {/* Features */}
                {currentCase.features && currentCase.features.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Key Features</p>
                    <div className="flex flex-wrap gap-2">
                      {currentCase.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-md bg-primary/10 text-xs text-primary">
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
