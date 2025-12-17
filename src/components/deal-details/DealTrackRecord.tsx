import { motion } from "framer-motion";
import { Trophy, TrendingUp, CheckCircle, Award } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

interface DealTrackRecordProps {
  deal: DealData;
}

export const DealTrackRecord = ({ deal }: DealTrackRecordProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!deal.trackRecord || deal.trackRecord.length === 0) return null;

  return (
    <section className="py-32 bg-[#F8F7F5] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-neutral-300" />
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
          
          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <motion.div 
              className="bg-navy text-foreground border border-foreground/10 p-6 text-center group cursor-pointer hover:bg-primary transition-colors duration-500"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Trophy className="w-5 h-5 text-foreground/50 group-hover:text-navy mx-auto mb-3 transition-colors duration-500" />
              <p className="text-3xl md:text-4xl font-light group-hover:text-navy transition-colors duration-500">{deal.totalPastProfit}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 group-hover:text-navy/60 mt-2 transition-colors duration-500">Total Profit</p>
            </motion.div>
            <motion.div 
              className="bg-white border border-neutral-200 p-6 text-center group cursor-pointer hover:bg-navy transition-colors duration-500"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Award className="w-5 h-5 text-neutral-400 group-hover:text-primary mx-auto mb-3 transition-colors duration-500" />
              <p className="text-3xl md:text-4xl font-light text-neutral-900 group-hover:text-white transition-colors duration-500">{deal.trackRecord.length}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 group-hover:text-white/50 mt-2 transition-colors duration-500">Completed</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Track Record Cards */}
        <div className="space-y-3">
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
                className="bg-white border border-neutral-200 p-6 cursor-pointer relative overflow-hidden transition-all duration-500 hover:border-transparent hover:shadow-xl group"
              >
                {/* Hover background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-navy via-navy-surface to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />

                <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                  {/* Property Name */}
                  <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className={`w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                          isHovered ? 'bg-primary/20' : 'bg-neutral-100'
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
            );
          })}
        </div>

        {/* Total Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01, y: -2 }}
          className="mt-8 bg-navy text-foreground p-8 cursor-pointer group hover:bg-primary transition-colors duration-500"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-12 h-12 bg-foreground/10 group-hover:bg-navy/20 flex items-center justify-center transition-colors duration-500"
                whileHover={{ rotate: 6 }}
              >
                <Trophy className="w-5 h-5 text-foreground/60 group-hover:text-navy transition-colors duration-500" />
              </motion.div>
              <div>
                <p className="text-sm font-medium group-hover:text-navy transition-colors duration-500">Total Profit Generated</p>
                <p className="text-xs text-foreground/50 group-hover:text-navy/60 transition-colors duration-500">Across all completed deals</p>
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-light group-hover:text-navy transition-colors duration-500">{deal.totalPastProfit}</p>
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
