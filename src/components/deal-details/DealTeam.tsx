import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, VolumeX, ExternalLink, Quote, ChevronLeft, ChevronRight, Award, Briefcase } from "lucide-react";
import { useState, useRef } from "react";
import type { DealData } from "@/types/deal";

// Local imports for team images
import philippeNaouri from "@/assets/philippe-naouri.png";
import jacobsenArquitetura from "@/assets/jacobsen-arquitetura.jpg";

interface DealTeamProps {
  deal: DealData;
}

interface TeamMemberType {
  name: string;
  role: string;
  bio: string;
  image?: string;
  credentials?: string[];
  pressLinks?: { title: string; source: string; url?: string }[];
}

const imageMap: Record<string, string> = {
  "/src/assets/philippe-naouri.png": philippeNaouri,
  "/src/assets/jacobsen-arquitetura.jpg": jacobsenArquitetura,
};

export const DealTeam = ({ deal }: DealTeamProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const teamMembers = (deal.team || []) as TeamMemberType[];
  const activeMember = teamMembers[activeIndex];

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

  const getImage = (imagePath?: string) => {
    if (!imagePath) return philippeNaouri;
    return imageMap[imagePath] || imagePath;
  };

  const nextMember = () => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  if (!activeMember) return null;

  return (
    <section className="py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-violet-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-radial from-amber-50/40 to-transparent rounded-full blur-3xl" />
        {/* Subtle pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '48px 48px'
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
              <div className="w-2 h-2 rounded-full bg-slate-900" />
              <div className="w-16 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            </div>
            <span className="text-xs tracking-[0.35em] uppercase text-slate-500 font-semibold">
              Leadership
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] mb-6"
          >
            Meet the <br />
            <span className="relative inline-block">
              <span className="italic font-serif text-slate-700">Team</span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-slate-800 via-slate-600 to-transparent rounded-full"
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
            World-class expertise driving exceptional returns in luxury real estate
          </motion.p>
        </div>

        {/* Team Member Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mb-12"
        >
          {teamMembers.map((member, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 ${
                index === activeIndex
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:shadow-lg'
              }`}
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                <img 
                  src={getImage(member.image)} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                {index === activeIndex && (
                  <div className="absolute inset-0 ring-2 ring-white/30 rounded-xl" />
                )}
              </div>
              <div className="text-left">
                <p className={`font-medium ${index === activeIndex ? 'text-white' : 'text-slate-900'}`}>
                  {member.name}
                </p>
                <p className={`text-sm ${index === activeIndex ? 'text-slate-300' : 'text-slate-500'}`}>
                  {member.role}
                </p>
              </div>
              {index === activeIndex && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-400"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-5 gap-12 lg:gap-16"
          >
            {/* Left: Video/Image - 2 columns */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Main Media */}
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-100 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]">
                  {/* Decorative frame */}
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 z-10 pointer-events-none" />
                  
                  {activeIndex === 0 && deal.teamVideoUrl ? (
                    <>
                      <video
                        ref={videoRef}
                        src={deal.teamVideoUrl}
                        poster={getImage(activeMember.image)}
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
                          className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent cursor-pointer z-10"
                          onClick={handlePlayClick}
                        >
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-2xl"
                          >
                            <Play className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" />
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Controls */}
                      <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
                        {isPlaying && (
                          <button
                            onClick={handlePlayClick}
                            className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                          >
                            <div className="flex gap-1">
                              <div className="w-1 h-4 bg-slate-900 rounded-full" />
                              <div className="w-1 h-4 bg-slate-900 rounded-full" />
                            </div>
                          </button>
                        )}
                        <button
                          onClick={toggleMute}
                          className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5 text-slate-900" />
                          ) : (
                            <Volume2 className="w-5 h-5 text-slate-900" />
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    <img 
                      src={getImage(activeMember.image)} 
                      alt={activeMember.name}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Bottom Gradient Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-800 via-violet-500 to-slate-800" />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Experience</p>
                      <p className="text-sm font-semibold text-slate-900">15+ Years</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Info - 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 lg:py-8"
            >
              {/* Name & Role */}
              <div className="mb-10">
                <h3 className="text-4xl md:text-5xl font-light text-slate-900 mb-3">
                  {activeMember.name}
                </h3>
                <p className="text-xl text-slate-500 font-light">
                  {activeMember.role}
                </p>
              </div>

              {/* Bio with quote styling */}
              <div className="relative mb-12">
                <Quote className="absolute -left-2 -top-2 w-8 h-8 text-slate-200" />
                <p className="text-lg text-slate-600 leading-relaxed pl-8 border-l-2 border-slate-200">
                  {activeMember.bio}
                </p>
              </div>

              {/* Credentials - Horizontal pills */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="text-sm tracking-[0.2em] uppercase text-slate-400 font-semibold">
                    Credentials
                  </h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {(activeMember.credentials || []).map((credential, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="inline-flex items-center px-5 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
                    >
                      {credential}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Press Links - Elegant cards */}
              {activeMember.pressLinks && activeMember.pressLinks.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-sm tracking-[0.2em] uppercase text-slate-400 font-semibold">
                      Featured In
                    </h4>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {activeMember.pressLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-xl transition-all duration-300"
                      >
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative">
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                            {link.source}
                          </p>
                          <p className="text-sm font-medium text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
                            {link.title}
                          </p>
                          <div className="mt-3 flex items-center gap-1 text-slate-400 group-hover:text-slate-600 transition-colors">
                            <span className="text-xs">Read article</span>
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows for multiple team members */}
        {teamMembers.length > 1 && (
          <div className="flex justify-center gap-4 mt-16">
            <button
              onClick={prevMember}
              className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:border-slate-300 hover:shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <button
              onClick={nextMember}
              className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:border-slate-300 hover:shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
