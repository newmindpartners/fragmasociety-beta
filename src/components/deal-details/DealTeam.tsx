import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, Award, CheckCircle, Star, Verified } from "lucide-react";
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
    <section className="py-32 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-l from-blue-50/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-gradient-to-r from-amber-50/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-blue-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-blue-600 font-medium">
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
            Meet the <span className="italic text-blue-600">Team</span>
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
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 shadow-2xl">
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
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-black/20 to-transparent cursor-pointer"
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

              {/* Name overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-medium text-lg">{teamMember?.name || deal.leaderName}</p>
                <p className="text-white/70 text-sm">{teamMember?.role || deal.leaderRole}</p>
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
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-3xl md:text-4xl font-light text-neutral-900">
                  {teamMember?.name || deal.leaderName}
                </h3>
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Verified className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-lg text-neutral-500">
                {teamMember?.role || deal.leaderRole}
              </p>
            </div>
            
            <p className="text-lg text-neutral-600 leading-relaxed mb-10">
              {teamMember?.bio || ''}
            </p>

            {/* Credentials - Elegant cards */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <h4 className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-medium">
                  Credentials & Achievements
                </h4>
              </div>
              <div className="space-y-3">
                {(teamMember?.credentials || []).map((credential, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 bg-white border border-neutral-100 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="text-neutral-700">{credential}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-10 border-t border-neutral-100">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-800">KYC Verified</p>
                    <p className="text-xs text-emerald-600/70">Identity confirmed</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Background</p>
                    <p className="text-xs text-blue-600/70">Fully verified</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
