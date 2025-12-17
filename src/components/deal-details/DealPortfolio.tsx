import { motion } from "framer-motion";
import { Building2, MapPin, TrendingUp, Hammer, CheckCircle, Clock } from "lucide-react";
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

export const DealPortfolio = ({ deal }: DealPortfolioProps) => {
  if (!deal.currentProperties || deal.currentProperties.length === 0) return null;

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "construction":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300">
            <Hammer className="w-3 h-3" /> Under Construction
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] text-green-300">
            <CheckCircle className="w-3 h-3" /> Completed
          </span>
        );
      case "listed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-300">
            <TrendingUp className="w-3 h-3" /> Listed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] text-white/70">
            <Clock className="w-3 h-3" /> Acquisition
          </span>
        );
    }
  };

  const getPropertyImage = (address: string, index: number) => {
    // Check exact match first
    if (propertyImages[address]) return propertyImages[address];
    
    // Fallback to index-based
    const fallbackImages = [propertyDeerhead, propertyNimes, propertyPalisades, propertyMalibu];
    return fallbackImages[index % fallbackImages.length];
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Building2 className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">Current Pipeline</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Portfolio </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Properties
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Properties currently in acquisition or development
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {deal.currentProperties.map((property, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Property Image */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={getPropertyImage(property.address, index)} 
                  alt={property.address}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(property.status)}
                </div>
              </div>

              <div className="p-6">
                {/* Address */}
                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-foreground">{property.address}</h3>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.size && (
                    <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground">
                      {property.size}
                    </span>
                  )}
                  {property.specs && (
                    <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground">
                      {property.specs}
                    </span>
                  )}
                </div>

                {/* Financial Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {property.acquisitionPrice && (
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">Acquisition</p>
                      <p className="text-sm font-bold text-foreground">{property.acquisitionPrice}</p>
                    </div>
                  )}
                  {property.constructionCost && (
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">Construction</p>
                      <p className="text-sm font-bold text-foreground">{property.constructionCost}</p>
                    </div>
                  )}
                  {property.projectedExitPrice && (
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <p className="text-[10px] text-primary uppercase mb-1">Exit Price</p>
                      <p className="text-sm font-bold text-primary">{property.projectedExitPrice}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
