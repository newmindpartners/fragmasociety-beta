import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Building, Film, Trophy, Gem, Briefcase, Leaf } from "lucide-react";

// Import category background images
import categoryRealestate from "@/assets/category-realestate.jpg";
import categoryFilm from "@/assets/category-film.jpg";
import categorySports from "@/assets/category-sports.jpg";
import categoryLuxury from "@/assets/category-luxury.jpg";
import categoryCredit from "@/assets/category-credit.jpg";
import categoryEsg from "@/assets/category-esg.jpg";

const assets = [
  { icon: Building, label: "Real Estate", image: categoryRealestate },
  { icon: Film, label: "Film & Entertainment", image: categoryFilm },
  { icon: Trophy, label: "Sports", image: categorySports },
  { icon: Gem, label: "Luxury", image: categoryLuxury },
  { icon: Briefcase, label: "Private Credit", image: categoryCredit },
  { icon: Leaf, label: "ESG & Impact", image: categoryEsg },
];

export const AssetShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % assets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background image that changes based on active category */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={assets[activeIndex].image}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Own pieces of{" "}
            <span className="bg-gradient-to-r from-white/80 to-white bg-clip-text text-transparent">
              the world
            </span>
          </h2>
          <p className="text-white/70 text-lg">
            Villas, films, sports, luxury goods & more
          </p>
        </motion.div>

        {/* Corporate grid layout - 4 columns top, 2 centered bottom */}
        <div className="max-w-5xl mx-auto">
          {/* Top row - 4 items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {assets.slice(0, 4).map((asset, index) => {
              const isActive = activeIndex === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="relative cursor-pointer group"
                >
                  <motion.div
                    className={`relative h-40 md:h-48 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-500 border ${
                      isActive 
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-400/50" 
                        : "bg-[hsl(220,30%,15%)] border-white/10 hover:border-white/20"
                    }`}
                    animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <asset.icon className={`w-10 h-10 md:w-12 md:h-12 ${isActive ? "text-white" : "text-white/60"}`} strokeWidth={1.5} />
                    <span className={`text-sm md:text-base font-medium text-center px-2 ${isActive ? "text-white" : "text-white/80"}`}>
                      {asset.label}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Bottom row - 2 centered items */}
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto md:max-w-md">
            {assets.slice(4, 6).map((asset, index) => {
              const actualIndex = index + 4;
              const isActive = activeIndex === actualIndex;
              
              return (
                <motion.div
                  key={actualIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (actualIndex) * 0.1 }}
                  onMouseEnter={() => setActiveIndex(actualIndex)}
                  className="relative cursor-pointer group"
                >
                  <motion.div
                    className={`relative h-40 md:h-48 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-500 border ${
                      isActive 
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-400/50" 
                        : "bg-[hsl(220,30%,15%)] border-white/10 hover:border-white/20"
                    }`}
                    animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <asset.icon className={`w-10 h-10 md:w-12 md:h-12 ${isActive ? "text-white" : "text-white/60"}`} strokeWidth={1.5} />
                    <span className={`text-sm md:text-base font-medium text-center px-2 ${isActive ? "text-white" : "text-white/80"}`}>
                      {asset.label}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};