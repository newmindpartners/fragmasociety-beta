import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Quote, ChevronLeft, ChevronRight, Award, Briefcase } from "lucide-react";
import { useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);

  const teamMembers = (deal.team || []) as TeamMemberType[];
  const activeMember = teamMembers[activeIndex];

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
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-radial from-violet-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-radial from-amber-50/40 to-transparent rounded-full blur-3xl" />
        {/* Subtle pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Premium Header */}
        <div className="max-w-4xl mb-10 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-900" />
              <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            </div>
            <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-slate-500 font-semibold">
              Leadership
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-slate-900 leading-[1.05] mb-4 sm:mb-6"
          >
            Meet the <br className="sm:hidden" />
            <span className="relative inline-block">
              <span className="italic font-serif text-slate-700">Team</span>
              <motion.div 
                className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-slate-800 via-slate-600 to-transparent rounded-full"
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
            className="text-base sm:text-lg text-slate-500 font-light max-w-xl"
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
          className="flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {teamMembers.map((member, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`group relative flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-500 min-h-[48px] ${
                index === activeIndex
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:shadow-lg active:bg-slate-50'
              }`}
            >
              <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={getImage(member.image)} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                {index === activeIndex && (
                  <div className="absolute inset-0 ring-2 ring-white/30 rounded-lg sm:rounded-xl" />
                )}
              </div>
              <div className="text-left">
                <p className={`text-sm sm:text-base font-medium ${index === activeIndex ? 'text-white' : 'text-slate-900'}`}>
                  {member.name}
                </p>
                <p className={`text-xs sm:text-sm hidden sm:block ${index === activeIndex ? 'text-slate-300' : 'text-slate-500'}`}>
                  {member.role}
                </p>
              </div>
              {index === activeIndex && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-400"
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
            className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16"
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
                <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]">
                  {/* Decorative frame */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-black/5 z-10 pointer-events-none" />
                  
                  <img 
                    src={getImage(activeMember.image)} 
                    alt={activeMember.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Bottom Gradient Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-800 via-violet-500 to-slate-800" />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 border border-slate-100">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-900 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-slate-500">Experience</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">15+ Years</p>
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
              <div className="mb-6 sm:mb-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-2 sm:mb-3">
                  {activeMember.name}
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-slate-500 font-light">
                  {activeMember.role}
                </p>
              </div>

              {/* Bio with quote styling */}
              <div className="relative mb-8 sm:mb-12">
                <Quote className="absolute -left-1 sm:-left-2 -top-1 sm:-top-2 w-6 h-6 sm:w-8 sm:h-8 text-slate-200" />
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed pl-6 sm:pl-8 border-l-2 border-slate-200">
                  {activeMember.bio}
                </p>
              </div>

              {/* Credentials - Horizontal pills */}
              <div className="mb-8 sm:mb-12">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100 flex items-center justify-center">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                  </div>
                  <h4 className="text-xs sm:text-sm tracking-[0.2em] uppercase text-slate-400 font-semibold">
                    Credentials
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {(activeMember.credentials || []).map((credential, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="inline-flex items-center px-3 sm:px-5 py-2 sm:py-3 bg-slate-100 text-slate-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-slate-200 active:bg-slate-300 transition-colors"
                    >
                      {credential}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Press Links - Elegant cards */}
              {activeMember.pressLinks && activeMember.pressLinks.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-900 flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h4 className="text-xs sm:text-sm tracking-[0.2em] uppercase text-slate-400 font-semibold">
                      Featured In
                    </h4>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                        className="group relative bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-slate-300 hover:shadow-xl active:bg-slate-50 transition-all duration-300"
                      >
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative">
                          <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-1 sm:mb-2">
                            {link.source}
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
                            {link.title}
                          </p>
                          <div className="mt-2 sm:mt-3 flex items-center gap-1 text-slate-400 group-hover:text-slate-600 transition-colors">
                            <span className="text-[10px] sm:text-xs">Read article</span>
                            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
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
          <div className="flex justify-center gap-3 sm:gap-4 mt-10 sm:mt-16">
            <button
              onClick={prevMember}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:border-slate-300 hover:shadow-lg active:bg-slate-50 transition-all min-h-[48px]"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
            </button>
            <button
              onClick={nextMember}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:border-slate-300 hover:shadow-lg active:bg-slate-50 transition-all min-h-[48px]"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
