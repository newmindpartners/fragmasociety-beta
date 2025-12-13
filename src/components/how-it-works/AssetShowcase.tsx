import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Building, Film, Trophy, Gem, Briefcase, Leaf } from "lucide-react";

// Import background images
import rwaVilla from "@/assets/rwa-villa.jpg";
import rwaFilm from "@/assets/rwa-film.jpg";
import rwaLuxury from "@/assets/rwa-luxury.jpg";
import rwaCommercial from "@/assets/rwa-commercial.jpg";

const backgroundImages = [rwaVilla, rwaFilm, rwaLuxury, rwaCommercial];

const assets = [
  { icon: Building, label: "Real Estate", color: "from-blue-500 to-cyan-500" },
  { icon: Film, label: "Film & Entertainment", color: "from-purple-500 to-pink-500" },
  { icon: Trophy, label: "Sports", color: "from-orange-500 to-red-500" },
  { icon: Gem, label: "Luxury", color: "from-yellow-500 to-amber-500" },
  { icon: Briefcase, label: "Private Credit", color: "from-green-500 to-emerald-500" },
  { icon: Leaf, label: "ESG & Impact", color: "from-teal-500 to-green-500" },
];

export const AssetShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % assets.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Background image slider
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(bgInterval);
  }, []);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background image slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={backgroundImages[bgIndex]}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Own pieces of{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              the world
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Villas, films, sports, luxury goods & more
          </p>
        </motion.div>

        {/* Hexagonal grid */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {assets.map((asset, index) => {
            const isActive = hoveredIndex === index || (hoveredIndex === null && activeIndex === index);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group cursor-pointer"
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${asset.color} rounded-3xl blur-2xl`}
                  animate={{ opacity: isActive ? 0.4 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className={`relative w-36 h-36 md:w-44 md:h-44 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-br ${asset.color}` 
                      : "bg-card/80 border border-border/50"
                  }`}
                  animate={isActive ? { scale: 1.1, y: -10 } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <asset.icon className={`w-12 h-12 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                  </motion.div>
                  <span className={`text-sm font-semibold text-center px-2 ${isActive ? "text-white" : "text-foreground"}`}>
                    {asset.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
