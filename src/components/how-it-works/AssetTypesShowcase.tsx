import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Building2, Film, Briefcase, Gem, TrendingUp, Music } from "lucide-react";

import categoryRealEstate from "@/assets/category-realestate.jpg";
import categoryFilm from "@/assets/category-film.jpg";
import categoryCredit from "@/assets/category-credit.jpg";
import categoryLuxury from "@/assets/category-luxury.jpg";
import categoryMusic from "@/assets/category-music.jpg";
import categoryEquities from "@/assets/category-equities.jpg";

const assetTypes = [
  {
    id: "real-estate",
    icon: Building2,
    title: "Real Estate",
    subtitle: "Prime Properties Worldwide",
    description: "From luxury villas in Malibu to premium commercial developments—own fractional stakes in institutional-grade properties.",
    image: categoryRealEstate,
    stats: [
      { label: "Target Yield", value: "8-12%" },
      { label: "Typical Term", value: "3-7 years" }
    ]
  },
  {
    id: "film",
    icon: Film,
    title: "Film & Entertainment",
    subtitle: "Hollywood Productions",
    description: "Invest in major film productions and entertainment projects with revenue-sharing from theatrical, streaming, and ancillary rights.",
    image: categoryFilm,
    stats: [
      { label: "Target Return", value: "15-25%" },
      { label: "Typical Term", value: "2-4 years" }
    ]
  },
  {
    id: "credit",
    icon: Briefcase,
    title: "Private Credit",
    subtitle: "SME & Revenue-Based Financing",
    description: "Access institutional-quality credit deals previously reserved for banks and large funds—steady yields with structured protections.",
    image: categoryCredit,
    stats: [
      { label: "Target Yield", value: "10-15%" },
      { label: "Typical Term", value: "1-3 years" }
    ]
  },
  {
    id: "luxury",
    icon: Gem,
    title: "Luxury Assets",
    subtitle: "Art, Watches & Collectibles",
    description: "Diversify with tangible luxury assets—fine art, rare timepieces, and collectibles with appreciation potential.",
    image: categoryLuxury,
    stats: [
      { label: "Target Return", value: "12-20%" },
      { label: "Typical Term", value: "5-10 years" }
    ]
  },
  {
    id: "music",
    icon: Music,
    title: "Music Rights",
    subtitle: "Royalties & Catalogs",
    description: "Invest in music royalty streams and catalog acquisitions—earn ongoing income from streaming, licensing, and performance rights.",
    image: categoryMusic,
    stats: [
      { label: "Target Yield", value: "8-14%" },
      { label: "Typical Term", value: "5-15 years" }
    ]
  },
  {
    id: "equities",
    icon: TrendingUp,
    title: "Companies Equities",
    subtitle: "Private & Pre-IPO Stakes",
    description: "Access equity stakes in high-growth private companies and pre-IPO opportunities typically reserved for institutional investors.",
    image: categoryEquities,
    stats: [
      { label: "Target Return", value: "20-40%" },
      { label: "Typical Term", value: "3-7 years" }
    ]
  }
];

export const AssetTypesShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeAsset, setActiveAsset] = useState(0);

  const currentAsset = assetTypes[activeAsset];

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Dark Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Subtle accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-gradient-radial from-violet-900/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-radial from-slate-800/50 via-transparent to-transparent" />
      </div>
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-10 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-violet-400 to-transparent" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-slate-500 font-medium">
              Asset Classes
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6"
          >
            Curated Opportunities
            <span className="block font-serif italic text-slate-400 mt-1 sm:mt-2">Across Asset Classes</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl"
          >
            From prime real estate to Hollywood productions—diversify across 
            premium asset classes previously reserved for the ultra-wealthy.
          </motion.p>
        </div>

        {/* Asset Type Selector & Display */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Left: Asset Type Navigation */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
            {assetTypes.map((asset, index) => {
              const isActive = activeAsset === index;
              const Icon = asset.icon;
              
              return (
                <motion.button
                  key={asset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => setActiveAsset(index)}
                  className={`w-full text-left p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl transition-all duration-300 min-h-[60px] ${
                    isActive 
                      ? 'bg-white/10 border border-violet-500/30' 
                      : 'bg-white/[0.02] border border-slate-700/50 hover:border-slate-600 active:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      isActive ? 'bg-violet-500/20' : 'bg-slate-800/50'
                    }`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                        isActive ? 'text-violet-400' : 'text-slate-500'
                      }`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-xs sm:text-sm lg:text-base font-medium transition-colors duration-300 truncate ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}>
                        {asset.title}
                      </h4>
                      <p className={`text-[10px] sm:text-xs lg:text-sm transition-colors duration-300 truncate hidden sm:block ${
                        isActive ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {asset.subtitle}
                      </p>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="hidden lg:block w-1.5 h-8 bg-gradient-to-b from-violet-400 to-violet-600 rounded-full"
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Active Asset Display */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeAsset}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700/50"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-64 lg:h-80">
                <img 
                  src={currentAsset.image} 
                  alt={currentAsset.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                
                {/* Floating badge */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                    <currentAsset.icon className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400" />
                    <span className="text-xs sm:text-sm font-medium text-white">{currentAsset.title}</span>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-white mb-3 sm:mb-4">
                  {currentAsset.subtitle}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6 sm:mb-8">
                  {currentAsset.description}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  {currentAsset.stats.map((stat) => (
                    <div key={stat.label} className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <p className="text-xl sm:text-2xl font-light text-white mb-0.5 sm:mb-1">{stat.value}</p>
                      <p className="text-[10px] sm:text-xs tracking-wider uppercase text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};