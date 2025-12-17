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
      return { icon: Hammer, label: "Construction", color: "bg-neutral-100 text-neutral-600 border-neutral-200" };
    case "completed":
      return { icon: CheckCircle, label: "Completed", color: "bg-neutral-800 text-white border-neutral-700" };
    case "listed":
      return { icon: TrendingUp, label: "Listed", color: "bg-neutral-200 text-neutral-700 border-neutral-300" };
    default:
      return { icon: Clock, label: "Acquisition", color: "bg-neutral-100 text-neutral-600 border-neutral-200" };
  }
};

export const DealPortfolio = ({ deal }: DealPortfolioProps) => {
  if (!deal.currentProperties || deal.currentProperties.length === 0) return null;

  return (
    <section className="py-32 bg-white relative overflow-hidden">
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
              <div className="w-12 h-px bg-neutral-300" />
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

          {/* Stats summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <div className="bg-navy text-foreground border border-foreground/10 px-6 py-4 text-center">
              <Building className="w-5 h-5 text-foreground/50 mx-auto mb-2" />
              <p className="text-2xl font-light">{deal.currentProperties.length}</p>
              <p className="text-xs text-foreground/50">Properties</p>
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
                className="group bg-white overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-500"
              >
                {/* Large Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={getPropertyImage(property.address, index)} 
                    alt={property.address}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border ${statusInfo.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* View button */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-12 h-12 bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors">
                      <Eye className="w-5 h-5 text-neutral-900" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Address */}
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-neutral-400" />
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
                  <div className="grid grid-cols-3 gap-px bg-neutral-200 pt-6 border-t border-neutral-200">
                    {property.acquisitionPrice && (
                      <div className="bg-white pr-4 py-2">
                        <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-1">Acquisition</p>
                        <p className="text-lg font-medium text-neutral-900">{property.acquisitionPrice}</p>
                      </div>
                    )}
                    {property.constructionCost && (
                      <div className="bg-white px-4 py-2">
                        <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-1">Build Cost</p>
                        <p className="text-lg font-medium text-neutral-900">{property.constructionCost}</p>
                      </div>
                    )}
                    {property.projectedExitPrice && (
                      <div className="bg-white pl-4 py-2">
                        <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 mb-1">Exit Target</p>
                        <p className="text-lg font-medium text-neutral-800">{property.projectedExitPrice}</p>
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
