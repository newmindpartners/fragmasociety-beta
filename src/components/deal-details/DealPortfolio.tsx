import { motion } from "framer-motion";
import { MapPin, Hammer, CheckCircle, TrendingUp, Clock, Building, Eye } from "lucide-react";
import type { DealData, DealProperty } from "@/types/deal";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Local fallback images
import deerheadRoad from "@/assets/properties/deerhead-road.jpg";
import coolOakWay from "@/assets/properties/cool-oak-way.jpg";
import bigRockDrive from "@/assets/properties/big-rock-drive.jpg";
import rockpointWay from "@/assets/properties/rockpoint-way.jpg";
import serraRoad from "@/assets/properties/serra-road.jpg";

interface DealPortfolioProps {
  deal: DealData;
}

// Local fallback mapping
const localFallbacks: Record<string, string> = {
  "properties/deerhead-road.jpg": deerheadRoad,
  "properties/cool-oak-way.jpg": coolOakWay,
  "properties/big-rock-drive.jpg": bigRockDrive,
  "properties/rockpoint-way.jpg": rockpointWay,
  "properties/serra-road.jpg": serraRoad,
};

const getPropertyImage = (property: DealProperty, index: number): string => {
  // Priority 1: Cloud storage URL
  if (property.imageUrl) {
    const { data } = supabase.storage.from('deal-images').getPublicUrl(property.imageUrl);
    if (data?.publicUrl) {
      // Check if it's a valid storage URL, otherwise use local fallback
      return localFallbacks[property.imageUrl] || data.publicUrl;
    }
  }
  // Priority 2: Local fallback by index
  const fallbackImages = [deerheadRoad, coolOakWay, bigRockDrive, rockpointWay, serraRoad];
  return fallbackImages[index % fallbackImages.length];
};

const getStatusInfo = (status?: string) => {
  switch (status) {
    case "construction":
      return { icon: Hammer, label: "Construction" };
    case "completed":
      return { icon: CheckCircle, label: "Completed" };
    case "listed":
      return { icon: TrendingUp, label: "Listed" };
    default:
      return { icon: Clock, label: "Acquisition" };
  }
};

// Unique graphics for each property card
const PropertyGraphic = ({ index, isHovered }: { index: number; isHovered: boolean }) => {
  const graphics = [
    // Property 1 - House/Building
    <svg viewBox="0 0 64 64" className={`w-full h-full transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
      <path d="M32 8 L8 28 L8 56 L56 56 L56 28 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="24" y="36" width="16" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="14" y="32" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="42" y="32" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>,
    // Property 2 - Location/Map
    <svg viewBox="0 0 64 64" className={`w-full h-full transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
      <circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M32 34 L32 56" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 56 L42 56" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="24" r="4" fill="currentColor" />
    </svg>,
    // Property 3 - Blueprint/Plan
    <svg viewBox="0 0 64 64" className={`w-full h-full transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
      <rect x="8" y="12" width="48" height="40" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 32 L56 32 M32 12 L32 52" stroke="currentColor" strokeWidth="0.75" />
      <rect x="12" y="16" width="16" height="12" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="36" y="36" width="16" height="12" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>,
    // Property 4 - Luxury Villa
    <svg viewBox="0 0 64 64" className={`w-full h-full transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
      <rect x="12" y="28" width="40" height="28" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 28 L32 12 L56 28" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="26" y="40" width="12" height="16" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="32" cy="22" r="4" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>,
  ];
  
  return graphics[index % graphics.length];
};

export const DealPortfolio = ({ deal }: DealPortfolioProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!deal.currentProperties || deal.currentProperties.length === 0) return null;

  return (
    <section className="py-32 relative overflow-hidden min-h-screen">
      {/* Solid Grey Background with Studio Spotlights */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-white/70 via-slate-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-gradient-radial from-slate-50/60 via-slate-200/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-slate-400" />
              <span className="text-xs tracking-[0.4em] uppercase text-slate-500 font-medium">
                Current Pipeline
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.1]"
            >
              Portfolio <span className="italic text-slate-500 font-serif">Properties</span>
            </motion.h2>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="px-8 py-5 text-center cursor-pointer bg-slate-800"
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <Building className="w-5 h-5 text-slate-400 mx-auto mb-2" />
              <p className="text-2xl font-light text-white">{deal.currentProperties.length}</p>
              <p className="text-xs text-slate-500">Properties</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {deal.currentProperties.map((property, index) => {
            const statusInfo = getStatusInfo(property.status);
            const StatusIcon = statusInfo.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer overflow-hidden bg-white border border-slate-200/50"
              >
                {/* Large Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img 
                    src={getPropertyImage(property, index)} 
                    alt={property.address}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Status Badge */}
                  <motion.div 
                    className="absolute top-6 left-6"
                    animate={{ y: isHovered ? 0 : 0, opacity: 1 }}
                  >
                    <span 
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-all duration-500 ${
                        isHovered 
                          ? 'bg-slate-800 text-white' 
                          : 'bg-white/90 text-slate-700'
                      }`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusInfo.label}
                    </span>
                  </motion.div>

                  {/* View button */}
                  <motion.div 
                    className="absolute bottom-6 right-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0, 
                      scale: isHovered ? 1 : 0.8 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <button className="w-14 h-14 flex items-center justify-center bg-white hover:bg-slate-800 hover:text-white transition-colors group">
                      <Eye className="w-5 h-5 text-slate-800 group-hover:text-white transition-colors" />
                    </button>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div 
                  className={`p-8 relative transition-all duration-500 ${
                    isHovered ? 'bg-slate-800' : 'bg-white'
                  }`}
                >
                  {/* Decorative graphic */}
                  <div className={`absolute top-6 right-6 w-16 h-16 transition-opacity duration-500 ${isHovered ? 'opacity-10' : 'opacity-[0.04]'}`}>
                    <PropertyGraphic index={index} isHovered={isHovered} />
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3 mb-6">
                    <motion.div 
                      className={`w-10 h-10 border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isHovered ? 'border-slate-600 bg-slate-700' : 'border-slate-200 bg-slate-50'
                      }`}
                      animate={{ rotate: isHovered ? 6 : 0, scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MapPin className={`w-4 h-4 transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-slate-500'
                      }`} />
                    </motion.div>
                    <div>
                      <h3 className={`text-xl font-medium transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-slate-900'
                      }`}>{property.address}</h3>
                      {(property.size || property.specs) && (
                        <p className={`text-sm mt-1 transition-colors duration-500 ${
                          isHovered ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {[property.size, property.specs].filter(Boolean).join(' • ')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Financial Grid - Stack on mobile */}
                  <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t transition-colors duration-500 ${
                    isHovered ? 'border-slate-700' : 'border-slate-200'
                  }`}>
                    {property.acquisitionPrice && (
                      <div>
                        <p className={`text-[9px] sm:text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                          isHovered ? 'text-slate-500' : 'text-slate-400'
                        }`}>Acquisition</p>
                        <p className={`text-base sm:text-lg font-medium transition-colors duration-500 ${
                          isHovered ? 'text-white' : 'text-slate-900'
                        }`}>{property.acquisitionPrice}</p>
                      </div>
                    )}
                    {property.constructionCost && (
                      <div>
                        <p className={`text-[9px] sm:text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                          isHovered ? 'text-slate-500' : 'text-slate-400'
                        }`}>Build Cost</p>
                        <p className={`text-base sm:text-lg font-medium transition-colors duration-500 ${
                          isHovered ? 'text-white' : 'text-slate-900'
                        }`}>{property.constructionCost}</p>
                      </div>
                    )}
                    {property.projectedExitPrice && (
                      <div className={`relative col-span-2 sm:col-span-1 px-3 py-2 rounded transition-all duration-500 ${
                        isHovered ? 'bg-emerald-500/20' : 'bg-emerald-50'
                      }`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <TrendingUp className={`w-3 h-3 transition-colors duration-500 ${
                            isHovered ? 'text-emerald-400' : 'text-emerald-600'
                          }`} />
                          <p className={`text-[9px] sm:text-[10px] tracking-[0.15em] uppercase transition-colors duration-500 ${
                            isHovered ? 'text-emerald-400' : 'text-emerald-600'
                          }`}>Exit Target</p>
                        </div>
                        <motion.p 
                          className={`text-lg sm:text-xl font-bold transition-colors duration-500 ${
                            isHovered ? 'text-emerald-300' : 'text-emerald-700'
                          }`}
                          animate={{ scale: isHovered ? 1.08 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {property.projectedExitPrice}
                        </motion.p>
                      </div>
                    )}
                  </div>

                  {/* Bottom accent */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
