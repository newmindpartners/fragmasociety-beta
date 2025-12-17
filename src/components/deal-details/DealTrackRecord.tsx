import { motion } from "framer-motion";
import { Trophy, TrendingUp, CheckCircle, Award } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealTrackRecordProps {
  deal: DealData;
}

export const DealTrackRecord = ({ deal }: DealTrackRecordProps) => {
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
            <div className="bg-navy text-foreground border border-foreground/10 p-6 text-center">
              <Trophy className="w-5 h-5 text-foreground/50 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-light">{deal.totalPastProfit}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 mt-2">Total Profit</p>
            </div>
            <div className="bg-white border border-neutral-200 p-6 text-center">
              <Award className="w-5 h-5 text-neutral-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-light text-neutral-900">{deal.trackRecord.length}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-2">Completed</p>
            </div>
          </motion.div>
        </div>

        {/* Track Record Cards */}
        <div className="space-y-3">
          {deal.trackRecord.map((record, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-neutral-200 p-6 hover:shadow-md transition-all group"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                {/* Property Name */}
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 text-sm">{record.address}</p>
                      <p className="text-xs text-neutral-400">Completed</p>
                    </div>
                  </div>
                </div>

                {/* Acquisition */}
                <div className="text-center md:text-left">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-1">Acquisition</p>
                  <p className="text-base text-neutral-600">{record.acquisitionPrice}</p>
                </div>

                {/* Investment */}
                <div className="text-center md:text-left">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-1">Investment</p>
                  <p className="text-base text-neutral-600">{record.totalInvestment}</p>
                </div>

                {/* Sale */}
                <div className="text-center md:text-left">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-1">Sale</p>
                  <p className="text-base font-medium text-neutral-900">{record.salePrice}</p>
                </div>

                {/* Profit */}
                <div className="text-center md:text-right">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 mb-1">Profit</p>
                  <p className="text-lg font-medium text-neutral-800 flex items-center gap-2 justify-center md:justify-end">
                    <TrendingUp className="w-4 h-4" />
                    {record.profit}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-navy text-foreground p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-foreground/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-foreground/60" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Profit Generated</p>
                <p className="text-xs text-foreground/50">Across all completed deals</p>
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-light">{deal.totalPastProfit}</p>
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
