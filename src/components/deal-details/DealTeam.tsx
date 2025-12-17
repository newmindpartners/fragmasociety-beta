import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, Award, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import type { DealData } from "@/types/deal";

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

  const teamMember = deal.team?.[0];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-neutral-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-neutral-400 font-medium">
              Leadership
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 leading-[1.1]"
          >
            Meet the <span className="italic">Team</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100">
              <video
                ref={videoRef}
                src={deal.teamVideoUrl}
                poster={teamMember?.image || deal.leaderImage}
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
                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl"
                  >
                    <Play className="w-7 h-7 text-neutral-900 ml-1" fill="currentColor" />
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
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:py-8"
          >
            {/* Leader Info */}
            <div className="mb-10">
              <h3 className="text-3xl md:text-4xl font-light text-neutral-900 mb-2">
                {teamMember?.name || deal.leaderName}
              </h3>
              <p className="text-lg text-neutral-500">
                {teamMember?.role || deal.leaderRole}
              </p>
            </div>
            
            <p className="text-lg text-neutral-600 leading-relaxed mb-10">
              {teamMember?.bio || ''}
            </p>

            {/* Credentials - Elegant list */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-5 h-5 text-amber-600" />
                <h4 className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-medium">
                  Credentials
                </h4>
              </div>
              <div className="space-y-4">
                {(teamMember?.credentials || []).map((credential, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-neutral-700">{credential}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-4 pt-10 border-t border-neutral-100">
              <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">KYC Verified</p>
                  <p className="text-xs text-neutral-500">Identity confirmed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Background</p>
                  <p className="text-xs text-neutral-500">Verified</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};