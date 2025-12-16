import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import type { DealData } from "@/pages/DealDetails";

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
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <span className="text-sm text-white font-medium">Video 2 of 4</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">The </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Asset
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the underlying asset through video walkthrough and gallery
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === 'video'
                ? 'bg-white text-background'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Play className="w-4 h-4" />
            Video Tour
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === 'gallery'
                ? 'bg-white text-background'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Photo Gallery
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Video Tab */}
          {activeTab === 'video' && (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10">
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
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={handlePlayClick}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center"
                  >
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                  </motion.div>
                </motion.div>
              )}

              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                {isPlaying && (
                  <button
                    onClick={handlePlayClick}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <div className="flex gap-1">
                      <div className="w-1 h-4 bg-white rounded-full" />
                      <div className="w-1 h-4 bg-white rounded-full" />
                    </div>
                  </button>
                )}
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                <motion.img
                  key={currentImageIndex}
                  src={deal.assetImages[currentImageIndex]}
                  alt={`Asset image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                  <span className="text-sm text-white">
                    {currentImageIndex + 1} / {deal.assetImages.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4 justify-center">
                {deal.assetImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-white scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
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
