import { motion } from "framer-motion";
import { Trophy, TrendingUp, CheckCircle, Award } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

// Background
import trackRecordBg from "@/assets/rwa-villa.jpg";

interface DealTrackRecordProps {
  deal: DealData;
}

export const DealTrackRecord = ({ deal }: DealTrackRecordProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!deal.trackRecord || deal.trackRecord.length === 0) return null;

  return (
    <section className="py-32 relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={trackRecordBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F7F5]/95 via-[#F8F7F5]/92 to-[#F8F7F5]/95" />
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
              <div className="w-12 h-px bg-neutral-400" />
              <span className="text-xs tracking-[0.4em] uppercase text-neutral-500 font-medium">
                Proven Performance
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 leading-[1.1]"
            >
              Track <span className="italic text-neutral-600">Record</span>
            </motion.h2>
          </div>
          
          {/* Summary Stats - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <motion.div 
              className="p-6 text-center cursor-pointer group"
              style={{
                background: 'linear-gradient(135deg, rgba(20,35,60,0.95) 0%, rgba(30,50,80,0.9) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <Trophy className="w-5 h-5 text-primary mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-light text-white">{deal.totalPastProfit}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mt-2">Total Profit</p>
            </motion.div>
            <motion.div 
              className="p-6 text-center cursor-pointer group"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,0,0,0.08)',
              }}
              whileHover={{ scale: 1.05, y: -4, background: 'linear-gradient(135deg, rgba(20,35,60,0.95) 0%, rgba(30,50,80,0.9) 100%)' }}
            >
              <Award className="w-5 h-5 text-neutral-400 group-hover:text-primary mx-auto mb-3 transition-colors duration-500" />
              <p className="text-3xl md:text-4xl font-light text-neutral-900 group-hover:text-white transition-colors duration-500">{deal.trackRecord.length}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 group-hover:text-white/40 mt-2 transition-colors duration-500">Completed</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Track Record Cards - Glassmorphism */}
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
                      ? 'linear-gradient(135deg, rgba(20,35,60,0.95) 0%, rgba(30,50,80,0.9) 100%)'
                      : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isHovered ? '1px solid rgba(0, 200, 180, 0.3)' : '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: isHovered 
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                      : '0 4px 20px -5px rgba(0, 0, 0, 0.06)',
                  }}
                  animate={{ y: isHovered ? -4 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                    {/* Property Name */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                            isHovered ? 'bg-primary/20' : 'bg-white/50 border border-neutral-200/50'
                          }`}
                          animate={{ rotate: isHovered ? 6 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className={`w-4 h-4 transition-colors duration-500 ${
                            isHovered ? 'text-primary' : 'text-neutral-400'
                          }`} />
                        </motion.div>
                        <div>
                          <p className={`font-medium text-sm transition-colors duration-500 ${
                            isHovered ? 'text-white' : 'text-neutral-900'
                          }`}>{record.address}</p>
                          <p className={`text-xs transition-colors duration-500 ${
                            isHovered ? 'text-white/50' : 'text-neutral-400'
                          }`}>Completed</p>
                        </div>
                      </div>
                    </div>

                    {/* Acquisition */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-white/40' : 'text-neutral-400'
                      }`}>Acquisition</p>
                      <p className={`text-base transition-colors duration-500 ${
                        isHovered ? 'text-white/80' : 'text-neutral-600'
                      }`}>{record.acquisitionPrice}</p>
                    </div>

                    {/* Investment */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-white/40' : 'text-neutral-400'
                      }`}>Investment</p>
                      <p className={`text-base transition-colors duration-500 ${
                        isHovered ? 'text-white/80' : 'text-neutral-600'
                      }`}>{record.totalInvestment}</p>
                    </div>

                    {/* Sale */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-white/40' : 'text-neutral-400'
                      }`}>Sale</p>
                      <p className={`text-base font-medium transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-neutral-900'
                      }`}>{record.salePrice}</p>
                    </div>

                    {/* Profit */}
                    <div className="text-center md:text-right">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-primary' : 'text-neutral-500'
                      }`}>Profit</p>
                      <motion.p 
                        className={`text-lg font-medium flex items-center gap-2 justify-center md:justify-end transition-colors duration-500 ${
                          isHovered ? 'text-primary' : 'text-neutral-800'
                        }`}
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TrendingUp className="w-4 h-4" />
                        {record.profit}
                      </motion.p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Total Summary - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01, y: -4 }}
          className="mt-8 cursor-pointer group"
          style={{
            background: 'linear-gradient(135deg, rgba(20,35,60,0.95) 0%, rgba(30,50,80,0.9) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-12 h-12 bg-white/10 flex items-center justify-center"
                whileHover={{ rotate: 6 }}
              >
                <Trophy className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-white">Total Profit Generated</p>
                <p className="text-xs text-white/50">Across all completed deals</p>
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-light text-white">{deal.totalPastProfit}</p>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xs text-neutral-400 mt-8"
        >
          Past performance is not indicative of future results. All investments carry risk.
        </motion.p>
      </div>
    </section>
  );
};
