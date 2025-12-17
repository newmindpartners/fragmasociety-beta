import { motion } from "framer-motion";
import { Trophy, TrendingUp, CheckCircle, Award, Sparkles } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

interface DealTrackRecordProps {
  deal: DealData;
}

export const DealTrackRecord = ({ deal }: DealTrackRecordProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!deal.trackRecord || deal.trackRecord.length === 0) return null;

  return (
    <section className="py-32 relative overflow-hidden min-h-screen">
      {/* Studio Spotlight Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50">
        {/* Spotlight effects */}
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-gradient-radial from-white/90 via-slate-50/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-violet-100/30 via-slate-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-radial from-white/80 via-transparent to-transparent rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-slate-400" />
              <span className="text-xs tracking-[0.4em] uppercase text-slate-500 font-medium">
                Proven Performance
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.1]"
            >
              Track <span className="italic text-slate-500 font-serif">Record</span>
            </motion.h2>
          </div>
          
          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6"
          >
            {/* Total Profit Card - Highlighted */}
            <motion.div 
              className="p-6 text-center cursor-pointer group relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(30,41,59,0.97) 0%, rgba(51,65,85,0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.3)',
              }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Trophy className="w-5 h-5 text-violet-400 mx-auto mb-3 relative z-10" />
              <p className="text-3xl md:text-4xl font-light text-white relative z-10">{deal.totalPastProfit}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-violet-300/60 mt-2 relative z-10">Total Profit</p>
            </motion.div>
            
            {/* Completed Count Card */}
            <motion.div 
              className="p-6 text-center cursor-pointer group relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
              }}
            >
              <Award className="w-5 h-5 text-slate-400 group-hover:text-slate-700 mx-auto mb-3 transition-colors duration-500" />
              <p className="text-3xl md:text-4xl font-light text-slate-900 transition-colors duration-500">{deal.trackRecord.length}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mt-2 transition-colors duration-500">Completed</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Track Record Cards */}
        <div className="space-y-4">
          {deal.trackRecord.map((record, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer relative overflow-hidden group"
              >
                <motion.div
                  className="p-6 relative"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(135deg, rgba(30,41,59,0.97) 0%, rgba(51,65,85,0.95) 100%)'
                      : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isHovered 
                      ? '1px solid rgba(139, 92, 246, 0.3)' 
                      : '1px solid rgba(148, 163, 184, 0.15)',
                    boxShadow: isHovered 
                      ? '0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 30px -10px rgba(139, 92, 246, 0.2)'
                      : '0 4px 20px -5px rgba(0, 0, 0, 0.04)',
                  }}
                  animate={{ y: isHovered ? -6 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Decorative graphic */}
                  <div className={`absolute top-4 right-4 w-12 h-12 transition-opacity duration-500 ${isHovered ? 'opacity-10' : 'opacity-[0.03]'}`}>
                    <svg viewBox="0 0 48 48" className={`w-full h-full ${isHovered ? 'text-white' : 'text-slate-900'}`}>
                      <path d="M8 40 L20 28 L28 34 L40 16" stroke="currentColor" strokeWidth="2" fill="none" />
                      <circle cx="40" cy="16" r="4" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                    {/* Property Name */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                            isHovered ? 'bg-violet-500/20' : 'bg-white border border-slate-200'
                          }`}
                          animate={{ rotate: isHovered ? 6 : 0, scale: isHovered ? 1.1 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className={`w-4 h-4 transition-colors duration-500 ${
                            isHovered ? 'text-violet-400' : 'text-slate-400'
                          }`} />
                        </motion.div>
                        <div>
                          <p className={`font-medium text-sm transition-colors duration-500 ${
                            isHovered ? 'text-white' : 'text-slate-900'
                          }`}>{record.address}</p>
                          <p className={`text-xs transition-colors duration-500 ${
                            isHovered ? 'text-white/50' : 'text-slate-400'
                          }`}>Completed</p>
                        </div>
                      </div>
                    </div>

                    {/* Acquisition */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-white/40' : 'text-slate-400'
                      }`}>Acquisition</p>
                      <p className={`text-base transition-colors duration-500 ${
                        isHovered ? 'text-white/80' : 'text-slate-600'
                      }`}>{record.acquisitionPrice}</p>
                    </div>

                    {/* Investment */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-white/40' : 'text-slate-400'
                      }`}>Investment</p>
                      <p className={`text-base transition-colors duration-500 ${
                        isHovered ? 'text-white/80' : 'text-slate-600'
                      }`}>{record.totalInvestment}</p>
                    </div>

                    {/* Sale */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-white/40' : 'text-slate-400'
                      }`}>Sale</p>
                      <p className={`text-base font-medium transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-slate-900'
                      }`}>{record.salePrice}</p>
                    </div>

                    {/* Profit - Highlighted */}
                    <div className="text-center md:text-right">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-violet-300' : 'text-slate-500'
                      }`}>Profit</p>
                      <motion.div 
                        className={`text-lg font-semibold flex items-center gap-2 justify-center md:justify-end transition-all duration-500 ${
                          isHovered ? 'text-violet-300' : 'text-violet-600'
                        }`}
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sparkles className={`w-4 h-4 transition-colors duration-500 ${isHovered ? 'text-violet-300' : 'text-violet-500'}`} />
                        <span className="relative">
                          {record.profit}
                          {/* Profit glow effect */}
                          <motion.span 
                            className="absolute inset-0 bg-violet-400/30 blur-md -z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom accent line - violet gradient */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-slate-700 via-violet-500 to-slate-600"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Total Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01, y: -4 }}
          className="mt-8 cursor-pointer group relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(30,41,59,0.97) 0%, rgba(51,65,85,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.2)',
          }}
        >
          {/* Animated glow */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-violet-600/10"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% 100%' }}
          />
          
          <div className="p-8 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-14 h-14 bg-violet-500/20 flex items-center justify-center border border-violet-500/30"
                whileHover={{ rotate: 6, scale: 1.1 }}
              >
                <Trophy className="w-6 h-6 text-violet-400" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-white">Total Profit Generated</p>
                <p className="text-xs text-white/50">Across all completed deals</p>
              </div>
            </div>
            <div className="text-right">
              <motion.p 
                className="text-3xl md:text-4xl font-light text-violet-300"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {deal.totalPastProfit}
              </motion.p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-violet-400" />
                <span className="text-xs text-violet-400/80">Realized gains</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xs text-slate-400 mt-8"
        >
          Past performance is not indicative of future results. All investments carry risk.
        </motion.p>
      </div>
    </section>
  );
};
