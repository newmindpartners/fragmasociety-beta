import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, Award, Briefcase, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import type { DealData } from "@/pages/DealDetails";

interface DealTeamProps {
  deal: DealData;
}

export const DealTeam = ({ deal }: DealTeamProps) => {
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
    <section className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <span className="text-sm text-white font-medium">Video 3 of 4</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Meet the </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the leadership behind this opportunity
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/50 border border-white/10">
              <video
                ref={videoRef}
                src={deal.teamVideoUrl}
                poster={deal.image}
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
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center"
                  >
                    <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
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
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Profile Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={deal.image} 
                  alt={deal.leaderName}
                  className="w-20 h-20 rounded-xl object-cover border border-white/20"
                />
                <div>
                  <h3 className="text-xl font-bold text-foreground">{deal.leaderName}</h3>
                  <p className="text-sm text-muted-foreground">{deal.leaderRole}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {deal.teamBio}
              </p>

              {/* Credentials */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Key Credentials
                </h4>
                {deal.teamCredentials.map((credential, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{credential}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Briefcase className="w-5 h-5 text-white/70 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Verified Identity</p>
                <p className="text-sm font-semibold text-foreground">KYC Approved</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Award className="w-5 h-5 text-white/70 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Background</p>
                <p className="text-sm font-semibold text-foreground">Verified</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
