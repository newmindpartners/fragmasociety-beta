import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight, Image as ImageIcon, Video, Camera } from "lucide-react";
import { useState, useRef } from "react";
import type { DealData } from "@/types/deal";

interface DealAssetProps {
  deal: DealData;
}

export const DealAsset = ({ deal }: DealAssetProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'gallery'>('video');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % deal.assetImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + deal.assetImages.length) % deal.assetImages.length);
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-b from-purple-50/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-purple-300" />
              <span className="text-xs tracking-[0.4em] uppercase text-purple-600 font-medium">
                Visual Tour
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 leading-[1.1]"
            >
              The <span className="italic text-purple-600">Asset</span>
            </motion.h2>
          </div>

          {/* Tab Navigation - Minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 lg:justify-end"
          >
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'video'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              <Video className="w-4 h-4" />
              Video Tour
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'gallery'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              <Camera className="w-4 h-4" />
              Gallery
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Video Tab */}
          {activeTab === 'video' && (
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-100 shadow-2xl">
              <video
                ref={videoRef}
                src={deal.assetVideoUrl}
                poster={deal.assetImages[0]}
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
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 via-black/20 to-transparent cursor-pointer"
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

              {/* Controls */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3">
                {isPlaying && (
                  <button
                    onClick={handlePlayClick}
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <div className="flex gap-1">
                      <div className="w-1 h-4 bg-neutral-900 rounded-full" />
                      <div className="w-1 h-4 bg-neutral-900 rounded-full" />
                    </div>
                  </button>
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

              {/* Info overlay */}
              <div className="absolute bottom-6 left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur text-sm font-medium text-neutral-900">
                  <Video className="w-4 h-4 text-purple-600" />
                  Property Walkthrough
                </span>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-100 shadow-2xl">
                <motion.img
                  key={currentImageIndex}
                  src={deal.assetImages[currentImageIndex]}
                  alt={`Asset image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6 text-neutral-900" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                >
                  <ChevronRight className="w-6 h-6 text-neutral-900" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur shadow-lg">
                  <span className="text-sm font-medium text-neutral-900">
                    {currentImageIndex + 1} / {deal.assetImages.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-6 justify-center">
                {deal.assetImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-28 h-20 rounded-xl overflow-hidden transition-all ${
                      index === currentImageIndex
                        ? 'ring-2 ring-purple-500 ring-offset-4 shadow-lg'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-purple-500/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
