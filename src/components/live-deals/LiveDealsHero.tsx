import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Leader data for the step-by-step animation
const leaders = [
  {
    name: "Bryan Balsinger",
    title: "Sports & Entertainment",
    image: "/src/assets/bryan-balsinger.png",
  },
  {
    name: "Philippe Naouri",
    title: "Private Credit",
    image: "/src/assets/philippe-naouri.png",
  },
  {
    name: "André Messika",
    title: "Luxury & Lifestyle",
    image: "/src/assets/andre-messika.png",
  },
  {
    name: "Tim Levy",
    title: "Real Estate",
    image: "/src/assets/tim-levy.png",
  },
];

export const LiveDealsHero = () => {
  const [currentLeader, setCurrentLeader] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'signature' | 'headline' | 'leaders'>('signature');

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Signature Deals (already showing)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnimationPhase('headline');
      
      // Phase 2: Show headline
      await new Promise(resolve => setTimeout(resolve, 2500));
      setAnimationPhase('leaders');
    };
    
    sequence();
  }, []);

  // Cycle through leaders
  useEffect(() => {
    if (animationPhase !== 'leaders') return;
    
    const interval = setInterval(() => {
      setCurrentLeader((prev) => (prev + 1) % leaders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [animationPhase]);

  return (
    <section className="relative h-[45vh] min-h-[380px] max-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Light mode gradient background - elegant cream/warm tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100" />
      
      {/* Subtle animated accents */}
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/40 via-transparent to-transparent rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-stone-200/30 via-transparent to-transparent rounded-full blur-3xl"
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fine line accents */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
        />
      </div>

      <div className="container relative z-10 text-center px-6">
        {/* Signature Deals - Elegant Script */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-4"
        >
          <span 
            className="text-2xl md:text-3xl text-stone-500 tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
          >
            Signature Deals
          </span>
        </motion.div>

        {/* Main headline with animated text */}
        <div className="relative h-[100px] md:h-[120px] flex items-center justify-center mb-4">
          <AnimatePresence mode="wait">
            {animationPhase === 'signature' && (
              <motion.h1
                key="invest"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="absolute text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Invest With{" "}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent font-medium">
                  Industry Leaders
                </span>
              </motion.h1>
            )}
            
            {animationPhase === 'headline' && (
              <motion.h1
                key="legacy"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="absolute text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                & <span className="text-stone-600">Legacy</span>{" "}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent font-medium">
                  Brands
                </span>
              </motion.h1>
            )}

            {animationPhase === 'leaders' && (
              <motion.div
                key="leaders"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute flex flex-col items-center"
              >
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 tracking-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Invest With{" "}
                  <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent font-medium">
                    Industry Leaders
                  </span>
                </h1>
                
                {/* Leader showcase */}
                <div className="flex items-center gap-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentLeader}
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.9 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="flex items-center gap-4 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-stone-200/60 shadow-lg shadow-stone-200/20"
                    >
                      <motion.img 
                        src={leaders[currentLeader].image}
                        alt={leaders[currentLeader].name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/30"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      />
                      <div className="text-left">
                        <motion.p 
                          className="text-stone-800 font-medium text-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          {leaders[currentLeader].name}
                        </motion.p>
                        <motion.p 
                          className="text-stone-500 text-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          {leaders[currentLeader].title}
                        </motion.p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Leader progress dots */}
                <div className="flex gap-2 mt-4">
                  {leaders.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentLeader 
                          ? 'w-6 bg-gradient-to-r from-amber-500 to-yellow-500' 
                          : 'w-1.5 bg-stone-300'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationPhase === 'leaders' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-stone-500 font-light tracking-wide max-w-xl mx-auto"
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
        transition={{ duration: 1.5, delay: 0.3 }}
      />
    </section>
  );
};
