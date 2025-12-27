import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight, Camera, Film, Maximize2, X, Eye } from "lucide-react";
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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
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
    <>
      <section className="py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
        {/* Elegant background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-violet-100/40 via-violet-50/20 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-slate-100/60 to-transparent rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative">
          {/* Premium Header */}
          <div className="max-w-4xl mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-5 mb-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                <div className="w-12 h-px bg-gradient-to-r from-violet-400 to-transparent" />
              </div>
              <span className="text-xs tracking-[0.35em] uppercase text-violet-600 font-semibold">
                Visual Experience
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] mb-6"
            >
              Explore the <br />
              <span className="relative inline-block">
                <span className="italic font-serif text-violet-600">Asset</span>
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-violet-400 to-transparent rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 font-light max-w-xl"
            >
              Immerse yourself in an exclusive visual journey through this exceptional property
            </motion.p>
          </div>

          {/* Premium Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 mb-10"
          >
            <button
              onClick={() => setActiveTab('video')}
              className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-medium transition-all duration-500 overflow-hidden ${
                activeTab === 'video'
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/30'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {activeTab === 'video' && (
                <motion.div 
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
                />
              )}
              <Film className={`w-5 h-5 relative z-10 ${activeTab === 'video' ? 'text-violet-400' : ''}`} />
              <span className="relative z-10">Video Tour</span>
              {activeTab === 'video' && (
                <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse relative z-10" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-medium transition-all duration-500 overflow-hidden ${
                activeTab === 'gallery'
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/30'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {activeTab === 'gallery' && (
                <motion.div 
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
                />
              )}
              <Camera className={`w-5 h-5 relative z-10 ${activeTab === 'gallery' ? 'text-violet-400' : ''}`} />
              <span className="relative z-10">Photo Gallery</span>
              <span className={`relative z-10 text-xs px-2 py-0.5 rounded-full ${
                activeTab === 'gallery' ? 'bg-violet-500/20 text-violet-300' : 'bg-slate-100 text-slate-500'
              }`}>
                {deal.assetImages.length}
              </span>
            </button>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {/* Video Tab */}
              {activeTab === 'video' && (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* Main Video Container */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]">
                    {/* Decorative frame */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-white/10 pointer-events-none z-20" />
                    
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

                    {/* Cinematic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Play/Pause Overlay */}
                    {!isPlaying && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                        onClick={handlePlayClick}
                      >
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative"
                        >
                          {/* Animated rings */}
                          <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-white/30"
                            animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-white/20"
                            animate={{ scale: [1, 1.6, 1.6], opacity: [0.3, 0, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          />
                          
                          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                            <Play className="w-8 h-8 sm:w-10 sm:h-10 text-slate-900 ml-1" fill="currentColor" />
                          </div>
                        </motion.div>
                        
                        {/* Label - hidden on mobile */}
                        <motion.div 
                          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 hidden sm:block"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <span className="text-sm text-white/80 font-light tracking-wide">Play Video Tour</span>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Bottom Controls Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-end justify-between z-10">
                      {/* Left: Info - hidden on small mobile */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden sm:flex items-center gap-4"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                          <Film className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm sm:text-base">Property Walkthrough</p>
                          <p className="text-white/60 text-xs sm:text-sm">Exclusive virtual tour</p>
                        </div>
                      </motion.div>

                      {/* Right: Controls */}
                      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                        {isPlaying && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handlePlayClick}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                          >
                            <div className="flex gap-1">
                              <div className="w-1 h-3 sm:h-4 bg-white rounded-full" />
                              <div className="w-1 h-3 sm:h-4 bg-white rounded-full" />
                            </div>
                          </motion.button>
                        )}
                        <button
                          onClick={toggleMute}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          ) : (
                            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Gallery Tab */}
              {activeTab === 'gallery' && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* Main Image Display */}
                  <div 
                    className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] cursor-pointer group"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    {/* Decorative frame */}
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 pointer-events-none z-20" />
                    
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={deal.assetImages[currentImageIndex]}
                        alt={`Property view ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                      <motion.div 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center shadow-xl">
                          <Maximize2 className="w-6 h-6 text-slate-900" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    <motion.button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-xl opacity-0 group-hover:opacity-100"
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-6 h-6 text-slate-900" />
                    </motion.button>
                    <motion.button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-xl opacity-0 group-hover:opacity-100"
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="w-6 h-6 text-slate-900" />
                    </motion.button>

                    {/* Bottom bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/40 to-transparent">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white/90 text-sm font-medium">Click to expand</span>
                        </div>
                        
                        {/* Progress indicator */}
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1.5">
                            {deal.assetImages.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  idx === currentImageIndex 
                                    ? 'w-8 bg-white' 
                                    : 'w-1.5 bg-white/40 hover:bg-white/60'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-white/80 text-sm font-medium ml-2">
                            {currentImageIndex + 1} / {deal.assetImages.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="mt-8 flex gap-4 justify-center overflow-x-auto pb-2">
                    {deal.assetImages.map((img, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-32 h-24 rounded-2xl overflow-hidden transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'ring-2 ring-slate-900 ring-offset-4 shadow-xl scale-105'
                            : 'opacity-60 hover:opacity-100 hover:scale-102'
                        }`}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {index === currentImageIndex && (
                          <motion.div 
                            layoutId="activeThumb"
                            className="absolute inset-0 border-2 border-white/50 rounded-2xl"
                          />
                        )}
                        {/* Index badge */}
                        <div className="absolute bottom-2 right-2 w-6 h-6 rounded-lg bg-black/50 backdrop-blur flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{index + 1}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.img
              key={currentImageIndex}
              src={deal.assetImages[currentImageIndex]}
              alt={`Property view ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20">
              <span className="text-white font-medium">
                {currentImageIndex + 1} / {deal.assetImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
