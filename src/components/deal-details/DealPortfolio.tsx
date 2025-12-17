import { motion } from "framer-motion";
import { MapPin, Hammer, CheckCircle, TrendingUp, Clock, Building, Eye } from "lucide-react";
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
      return { icon: Hammer, label: "Construction", color: "bg-amber-100 text-amber-700 border-amber-200" };
    case "completed":
      return { icon: CheckCircle, label: "Completed", color: "bg-emerald-100 text-emerald-700 border-emerald-200" };
    case "listed":
      return { icon: TrendingUp, label: "Listed", color: "bg-blue-100 text-blue-700 border-blue-200" };
    default:
      return { icon: Clock, label: "Acquisition", color: "bg-purple-100 text-purple-700 border-purple-200" };
  }
};

export const DealPortfolio = ({ deal }: DealPortfolioProps) => {
  if (!deal.currentProperties || deal.currentProperties.length === 0) return null;

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-amber-50/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-l from-emerald-50/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-amber-300" />
              <span className="text-xs tracking-[0.4em] uppercase text-amber-600 font-medium">
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
              Portfolio <span className="italic text-amber-700">Properties</span>
            </motion.h2>
          </div>

          {/* Stats summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-6 py-4 text-center">
              <Building className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <p className="text-2xl font-light text-amber-700">{deal.currentProperties.length}</p>
              <p className="text-xs text-amber-600/70">Properties</p>
            </div>
          </motion.div>
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
                className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-2xl transition-all duration-500"
              >
                {/* Large Image */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={getPropertyImage(property.address, index)} 
                    alt={property.address}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* View button */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors">
                      <Eye className="w-5 h-5 text-neutral-900" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Address */}
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-neutral-900">{property.address}</h3>
                      {(property.size || property.specs) && (
                        <p className="text-sm text-neutral-500 mt-1">
                          {[property.size, property.specs].filter(Boolean).join(' • ')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Financial Grid - Clean */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
                    {property.acquisitionPrice && (
                      <div className="bg-neutral-50 rounded-xl p-4">
                        <p className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-1">Acquisition</p>
                        <p className="text-lg font-medium text-neutral-900">{property.acquisitionPrice}</p>
                      </div>
                    )}
                    {property.constructionCost && (
                      <div className="bg-neutral-50 rounded-xl p-4">
                        <p className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-1">Build Cost</p>
                        <p className="text-lg font-medium text-neutral-900">{property.constructionCost}</p>
                      </div>
                    )}
                    {property.projectedExitPrice && (
                      <div className="bg-amber-50 rounded-xl p-4">
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
