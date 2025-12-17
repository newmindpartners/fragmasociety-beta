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
    <section className="py-32 relative overflow-hidden min-h-screen bg-slate-50">
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
              <div className="w-12 h-px bg-slate-300" />
              <span className="text-xs tracking-[0.4em] uppercase text-slate-400 font-medium">
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
              Track <span className="italic text-slate-400 font-serif">Record</span>
            </motion.h2>
          </div>
          
          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {/* Total Profit Card */}
            <motion.div 
              className="p-6 text-center cursor-pointer group relative overflow-hidden bg-slate-800"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Trophy className="w-5 h-5 text-slate-400 mx-auto mb-3 relative z-10" />
              <p className="text-3xl md:text-4xl font-light text-white relative z-10">{deal.totalPastProfit}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-slate-500 mt-2 relative z-10">Total Profit</p>
            </motion.div>
            
            {/* Completed Count Card */}
            <motion.div 
              className="p-6 text-center cursor-pointer group relative overflow-hidden bg-white border border-slate-200"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Award className="w-5 h-5 text-slate-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-light text-slate-900">{deal.trackRecord.length}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mt-2">Completed</p>
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
                  className={`p-6 relative transition-all duration-500 ${
                    isHovered 
                      ? 'bg-slate-800' 
                      : 'bg-white border border-slate-100'
                  }`}
                  animate={{ y: isHovered ? -4 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                    {/* Property Name */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                            isHovered ? 'bg-slate-700' : 'bg-slate-100'
                          }`}
                          animate={{ rotate: isHovered ? 6 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className={`w-4 h-4 transition-colors duration-500 ${
                            isHovered ? 'text-slate-400' : 'text-slate-400'
                          }`} />
                        </motion.div>
                        <div>
                          <p className={`font-medium text-sm transition-colors duration-500 ${
                            isHovered ? 'text-white' : 'text-slate-900'
                          }`}>{record.address}</p>
                          <p className={`text-xs transition-colors duration-500 ${
                            isHovered ? 'text-slate-500' : 'text-slate-400'
                          }`}>Completed</p>
                        </div>
                      </div>
                    </div>

                    {/* Acquisition */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-slate-500' : 'text-slate-400'
                      }`}>Acquisition</p>
                      <p className={`text-base transition-colors duration-500 ${
                        isHovered ? 'text-slate-300' : 'text-slate-600'
                      }`}>{record.acquisitionPrice}</p>
                    </div>

                    {/* Investment */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-slate-500' : 'text-slate-400'
                      }`}>Investment</p>
                      <p className={`text-base transition-colors duration-500 ${
                        isHovered ? 'text-slate-300' : 'text-slate-600'
                      }`}>{record.totalInvestment}</p>
                    </div>

                    {/* Sale */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-slate-500' : 'text-slate-400'
                      }`}>Sale</p>
                      <p className={`text-base font-medium transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-slate-900'
                      }`}>{record.salePrice}</p>
                    </div>

                    {/* Profit - Highlighted */}
                    <div className="text-center md:text-right">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-slate-400' : 'text-slate-500'
                      }`}>Profit</p>
                      <motion.div 
                        className={`text-lg font-semibold flex items-center gap-2 justify-center md:justify-end transition-all duration-500 ${
                          isHovered ? 'text-white' : 'text-slate-900'
                        }`}
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sparkles className={`w-4 h-4 transition-colors duration-500 ${isHovered ? 'text-slate-400' : 'text-slate-500'}`} />
                        <span>{record.profit}</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600"
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
          className="mt-8 cursor-pointer group relative overflow-hidden bg-slate-800"
        >
          <div className="p-8 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-14 h-14 bg-slate-700 flex items-center justify-center"
                whileHover={{ rotate: 6, scale: 1.1 }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-white">Total Profit Generated</p>
                <p className="text-xs text-slate-500">Across all completed deals</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl md:text-4xl font-light text-white">
                {deal.totalPastProfit}
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-500">Realized gains</span>
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
