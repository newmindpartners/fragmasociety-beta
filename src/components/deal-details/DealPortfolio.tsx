import { motion } from "framer-motion";
import { MapPin, Hammer, CheckCircle, TrendingUp, Clock, Building, Eye } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

// Property images
import propertyDeerhead from "@/assets/property-deerhead-ranch.jpg";
import propertyNimes from "@/assets/property-nimes-road.jpg";
import propertyPalisades from "@/assets/property-palisades-site.jpg";
import propertyMalibu from "@/assets/property-malibu.jpg";

// Background
import portfolioBg from "@/assets/rwa-commercial.jpg";

interface DealPortfolioProps {
  deal: DealData;
}

const propertyImages: Record<string, string> = {
  "Deerhead Ranch, Malibu": propertyDeerhead,
  "600 Nimes Road, Beverly Hills": propertyNimes,
  "Pacific Palisades Site": propertyPalisades,
  "22222 Malibu Road": propertyMalibu,
};

const getPropertyImage = (address: string, index: number) => {
  if (propertyImages[address]) return propertyImages[address];
  const fallbackImages = [propertyDeerhead, propertyNimes, propertyPalisades, propertyMalibu];
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

export const DealPortfolio = ({ deal }: DealPortfolioProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!deal.currentProperties || deal.currentProperties.length === 0) return null;

  return (
    <section className="py-32 relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={portfolioBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/97 via-white/95 to-white/97" />
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
              <div className="w-12 h-px bg-neutral-400" />
              <span className="text-xs tracking-[0.4em] uppercase text-neutral-500 font-medium">
                Current Pipeline
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 leading-[1.1]"
            >
              Portfolio <span className="italic text-neutral-600">Properties</span>
            </motion.h2>
          </div>

          {/* Stats - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="px-8 py-5 text-center cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(20,35,60,0.95) 0%, rgba(30,50,80,0.9) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <Building className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-light text-white">{deal.currentProperties.length}</p>
              <p className="text-xs text-white/50">Properties</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Portfolio Grid - Glassmorphism Cards */}
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
                className="cursor-pointer overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                {/* Large Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img 
                    src={getPropertyImage(property.address, index)} 
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-all duration-500"
                      style={{
                        background: isHovered ? 'hsl(172, 83%, 50%)' : 'rgba(255,255,255,0.9)',
                        color: isHovered ? 'hsl(225, 65%, 8%)' : 'rgb(64, 64, 64)',
                        backdropFilter: 'blur(10px)',
                      }}
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
                    <button 
                      className="w-14 h-14 flex items-center justify-center transition-colors"
                      style={{ background: 'hsl(172, 83%, 50%)' }}
                    >
                      <Eye className="w-5 h-5 text-navy" />
                    </button>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div 
                  className="p-8 relative"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(135deg, rgba(20,35,60,0.95) 0%, rgba(30,50,80,0.9) 100%)'
                      : 'transparent',
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Address */}
                  <div className="flex items-start gap-3 mb-6">
                    <motion.div 
                      className={`w-10 h-10 border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isHovered ? 'border-primary/40 bg-primary/10' : 'border-neutral-200/80 bg-white/50'
                      }`}
                      animate={{ rotate: isHovered ? 6 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MapPin className={`w-4 h-4 transition-colors duration-500 ${
                        isHovered ? 'text-primary' : 'text-neutral-400'
                      }`} />
                    </motion.div>
                    <div>
                      <h3 className={`text-xl font-medium transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-neutral-900'
                      }`}>{property.address}</h3>
                      {(property.size || property.specs) && (
                        <p className={`text-sm mt-1 transition-colors duration-500 ${
                          isHovered ? 'text-white/50' : 'text-neutral-500'
                        }`}>
                          {[property.size, property.specs].filter(Boolean).join(' • ')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Financial Grid */}
                  <div className={`grid grid-cols-3 gap-4 pt-6 border-t transition-colors duration-500 ${
                    isHovered ? 'border-white/10' : 'border-neutral-200/50'
                  }`}>
                    {property.acquisitionPrice && (
                      <div>
                        <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                          isHovered ? 'text-white/40' : 'text-neutral-400'
                        }`}>Acquisition</p>
                        <p className={`text-lg font-medium transition-colors duration-500 ${
                          isHovered ? 'text-white' : 'text-neutral-900'
                        }`}>{property.acquisitionPrice}</p>
                      </div>
                    )}
                    {property.constructionCost && (
                      <div>
                        <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                          isHovered ? 'text-white/40' : 'text-neutral-400'
                        }`}>Build Cost</p>
                        <p className={`text-lg font-medium transition-colors duration-500 ${
                          isHovered ? 'text-white' : 'text-neutral-900'
                        }`}>{property.constructionCost}</p>
                      </div>
                    )}
                    {property.projectedExitPrice && (
                      <div>
                        <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                          isHovered ? 'text-primary' : 'text-neutral-500'
                        }`}>Exit Target</p>
                        <motion.p 
                          className={`text-lg font-medium transition-colors duration-500 ${
                            isHovered ? 'text-primary' : 'text-neutral-800'
                          }`}
                          animate={{ scale: isHovered ? 1.05 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {property.projectedExitPrice}
                        </motion.p>
                      </div>
                    )}
                  </div>

                  {/* Bottom accent */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent"
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
