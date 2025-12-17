import { motion } from "framer-motion";
import { MapPin, Hammer, CheckCircle, TrendingUp, Clock } from "lucide-react";
import type { DealData } from "@/types/deal";

// Property images
import propertyDeerhead from "@/assets/property-deerhead-ranch.jpg";
import propertyNimes from "@/assets/property-nimes-road.jpg";
import propertyPalisades from "@/assets/property-palisades-site.jpg";
import propertyMalibu from "@/assets/property-malibu.jpg";

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
      return { icon: Hammer, label: "Construction", color: "text-amber-600 bg-amber-50" };
    case "completed":
      return { icon: CheckCircle, label: "Completed", color: "text-emerald-600 bg-emerald-50" };
    case "listed":
      return { icon: TrendingUp, label: "Listed", color: "text-blue-600 bg-blue-50" };
    default:
      return { icon: Clock, label: "Acquisition", color: "text-neutral-600 bg-neutral-100" };
  }
};

export const DealPortfolio = ({ deal }: DealPortfolioProps) => {
  if (!deal.currentProperties || deal.currentProperties.length === 0) return null;

  return (
    <section className="py-32 bg-neutral-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-neutral-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-neutral-400 font-medium">
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
            Portfolio <span className="italic">Properties</span>
          </motion.h2>
        </div>

        {/* Portfolio Grid - Large cards with photos */}
        <div className="grid md:grid-cols-2 gap-8">
          {deal.currentProperties.map((property, index) => {
            const statusInfo = getStatusInfo(property.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Large Image */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={getPropertyImage(property.address, index)} 
                    alt={property.address}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusInfo.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Address */}
                  <div className="flex items-start gap-3 mb-6">
                    <MapPin className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <h3 className="text-xl font-medium text-neutral-900">{property.address}</h3>
                  </div>

                  {/* Specs */}
                  {(property.size || property.specs) && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {property.size && (
                        <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-sm text-neutral-600">
                          {property.size}
                        </span>
                      )}
                      {property.specs && (
                        <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-sm text-neutral-600">
                          {property.specs}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Financial Grid - Clean */}
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-100">
                    {property.acquisitionPrice && (
                      <div>
                        <p className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-1">Acquisition</p>
                        <p className="text-lg font-medium text-neutral-900">{property.acquisitionPrice}</p>
                      </div>
                    )}
                    {property.constructionCost && (
                      <div>
                        <p className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-1">Build Cost</p>
                        <p className="text-lg font-medium text-neutral-900">{property.constructionCost}</p>
                      </div>
                    )}
                    {property.projectedExitPrice && (
                      <div>
                        <p className="text-xs tracking-[0.15em] uppercase text-amber-600 mb-1">Exit Target</p>
                        <p className="text-lg font-semibold text-amber-700">{property.projectedExitPrice}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};