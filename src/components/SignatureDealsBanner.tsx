import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import bryanImage from "@/assets/bryan-balsinger.png";
import philippeImage from "@/assets/philippe-naouri.png";
import andreImage from "@/assets/andre-messika.png";
import timImage from "@/assets/tim-levy.png";

const leaders = [
  {
    name: "Bryan Balsinger",
    title: "Sports & Entertainment",
    image: bryanImage,
  },
  {
    name: "Philippe Naouri",
    title: "Private Credit",
    image: philippeImage,
  },
  {
    name: "André Messika",
    title: "Luxury & Lifestyle",
    image: andreImage,
  },
  {
    name: "Tim Levy",
    title: "Real Estate",
    image: timImage,
  },
];

export const SignatureDealsBanner = () => {
  const [currentLeader, setCurrentLeader] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'signature' | 'headline' | 'leaders'>('signature');

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1800));
      setAnimationPhase('headline');
      await new Promise(resolve => setTimeout(resolve, 2200));
      setAnimationPhase('leaders');
    };
    sequence();
  }, []);

  useEffect(() => {
    if (animationPhase !== 'leaders') return;
    const interval = setInterval(() => {
      setCurrentLeader((prev) => (prev + 1) % leaders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animationPhase]);

  return (
    <section className="relative h-[50vh] min-h-[420px] max-h-[550px] flex items-center justify-center overflow-hidden">
      {/* Light luxury gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-amber-50/40 to-stone-100" />
      
      {/* Animated ambient accents */}
      <motion.div 
        className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-amber-100/50 via-transparent to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-stone-200/40 via-transparent to-transparent rounded-full blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300/60 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300/60 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>

      <div className="container relative z-10 text-center px-6">
        {/* Signature Deals - Elegant Script */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-5"
        >
          <span 
            className="text-2xl md:text-3xl lg:text-4xl text-stone-500 tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
          >
            Signature Deals
          </span>
        </motion.div>

        {/* Main headline container */}
        <div className="relative h-[140px] md:h-[180px] flex items-center justify-center mb-4">
          <AnimatePresence mode="wait">
            {animationPhase === 'signature' && (
              <motion.h2
                key="invest"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-stone-800 tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Invest With{" "}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent font-medium">
                  Industry Leaders
                </span>
              </motion.h2>
            )}
            
            {animationPhase === 'headline' && (
              <motion.h2
                key="legacy"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-stone-800 tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                & <span className="text-stone-600">Legacy</span>{" "}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent font-medium">
                  Brands
                </span>
              </motion.h2>
            )}

            {animationPhase === 'leaders' && (
              <motion.div
                key="leaders"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute flex flex-col items-center w-full"
              >
                <h2 
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-stone-800 tracking-tight mb-8"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Invest With{" "}
                  <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent font-medium">
                    Industry Leaders
                  </span>
                </h2>
                
                {/* Leader showcase card */}
                <div className="flex items-center gap-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentLeader}
                      initial={{ opacity: 0, x: 60, scale: 0.92 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -60, scale: 0.92 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-5 bg-white/70 backdrop-blur-md px-8 py-4 rounded-full border border-stone-200/70 shadow-xl shadow-stone-200/30"
                    >
                      <motion.img 
                        src={leaders[currentLeader].image}
                        alt={leaders[currentLeader].name}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover ring-3 ring-amber-500/40 shadow-lg"
                        initial={{ scale: 0.85, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                      />
                      <div className="text-left">
                        <motion.p 
                          className="text-stone-800 font-semibold text-lg md:text-xl"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.25 }}
                        >
                          {leaders[currentLeader].name}
                        </motion.p>
                        <motion.p 
                          className="text-stone-500 text-sm md:text-base"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.35 }}
                        >
                          {leaders[currentLeader].title}
                        </motion.p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress dots */}
                <div className="flex gap-2 mt-6">
                  {leaders.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx === currentLeader 
                          ? 'w-8 bg-gradient-to-r from-amber-500 to-yellow-500' 
                          : 'w-1.5 bg-stone-300'
                      }`}
                      layoutId={`dot-${idx}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tagline - fades out when leaders show */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationPhase === 'leaders' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl text-stone-500 font-light tracking-wide max-w-2xl mx-auto"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
        >
          Own a Stake in Their Next Chapter
        </motion.p>
      </div>

      {/* Bottom decorative line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0.2 }}
      />
    </section>
  );
};
