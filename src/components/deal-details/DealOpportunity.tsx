import { motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";
import type { DealData } from "@/types/deal";

interface DealOpportunityProps {
  deal: DealData;
}

export const DealOpportunity = ({ deal }: DealOpportunityProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-neutral-300" />
              <span className="text-xs tracking-[0.4em] uppercase text-neutral-400 font-medium">
                The Pitch
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 leading-[1.1]"
            >
              The <span className="italic">Opportunity</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:pt-16"
          >
            <p className="text-lg text-neutral-500 leading-relaxed">
              Hear directly from {deal.leaderName} about why this opportunity represents a unique moment in the market.
            </p>
          </motion.div>
        </div>

        {/* Video Container - Full width elegant */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-100">
            <video
              ref={videoRef}
              src={deal.pitchVideoUrl}
              poster={deal.leaderImage}
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                onClick={handlePlayClick}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl"
                >
                  <Play className="w-8 h-8 text-neutral-900 ml-1" fill="currentColor" />
                </motion.div>
              </motion.div>
            )}

            {/* Controls - Minimal */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3">
              {isPlaying && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handlePlayClick}
                  className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                >
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-neutral-900 rounded-full" />
                    <div className="w-1 h-4 bg-neutral-900 rounded-full" />
                  </div>
                </motion.button>
              )}
              <button
                onClick={toggleMute}
                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-neutral-900" />
                ) : (
                  <Volume2 className="w-5 h-5 text-neutral-900" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Key Takeaways - Elegant numbered list */}
        <div className="mt-20 grid md:grid-cols-3 gap-12 lg:gap-20">
          {[
            { title: "Market Position", text: "Unique positioning and competitive advantage in an underserved segment" },
            { title: "Leadership", text: "Experienced team with proven track record of value creation" },
            { title: "Returns Path", text: "Clear and defined revenue streams with multiple exit opportunities" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <span className="text-6xl font-extralight text-neutral-200 group-hover:text-neutral-300 transition-colors block mb-4">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-neutral-500 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};