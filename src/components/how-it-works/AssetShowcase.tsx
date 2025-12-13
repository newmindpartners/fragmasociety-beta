import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Import category background images
import categoryRealestate from "@/assets/category-realestate.jpg";
import categoryFilm from "@/assets/category-film.jpg";
import categorySports from "@/assets/category-sports.jpg";
import categoryLuxury from "@/assets/category-luxury.jpg";
import categoryCredit from "@/assets/category-credit.jpg";
import categoryEsg from "@/assets/category-esg.jpg";

const assets = [
  { 
    image: categoryRealestate, 
    category: "Real Estate",
    title: "Own a fraction of premium properties worldwide"
  },
  { 
    image: categoryFilm, 
    category: "Film & Entertainment",
    title: "Invest in blockbuster productions and streaming content"
  },
  { 
    image: categorySports, 
    category: "Sports",
    title: "Back elite athletes and sports ventures"
  },
  { 
    image: categoryLuxury, 
    category: "Luxury Goods",
    title: "Access rare collectibles and premium assets"
  },
  { 
    image: categoryCredit, 
    category: "Private Credit",
    title: "Participate in institutional-grade lending"
  },
  { 
    image: categoryEsg, 
    category: "ESG & Impact",
    title: "Fund sustainable projects with measurable impact"
  },
];

// Duplicate for seamless loop
const duplicatedAssets = [...assets, ...assets];

export const AssetShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Own pieces of{" "}
            <span className="bg-gradient-to-r from-white/80 to-white bg-clip-text text-transparent">
              the world
            </span>
          </h2>
          <p className="text-white/60 text-lg">
            Villas, films, sports, luxury goods & more
          </p>
        </motion.div>
      </div>

      {/* Horizontal scrolling marquee */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6 pl-6"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 80,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
          style={{ width: "max-content" }}
        >
          {duplicatedAssets.map((asset, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (index % assets.length) * 0.1 }}
              className="relative flex-shrink-0 w-[320px] md:w-[400px] h-[450px] md:h-[550px] rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <img
                src={asset.image}
                alt={asset.category}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <p className="text-white/70 text-sm italic mb-2 font-light">
                  {asset.category}
                </p>
                <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight">
                  {asset.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};