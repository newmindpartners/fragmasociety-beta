import { motion } from "framer-motion";
import { Trophy, TrendingUp, CheckCircle, Award } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealTrackRecordProps {
  deal: DealData;
}

export const DealTrackRecord = ({ deal }: DealTrackRecordProps) => {
  if (!deal.trackRecord || deal.trackRecord.length === 0) return null;

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-50/50 to-transparent rounded-full blur-3xl" />
      </div>

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
              <div className="w-12 h-px bg-emerald-400" />
              <span className="text-xs tracking-[0.4em] uppercase text-emerald-600 font-medium">
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
              Track <span className="italic text-emerald-600">Record</span>
            </motion.h2>
          </div>
          
          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-8"
          >
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl p-6 text-center">
              <Trophy className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-3xl md:text-4xl font-light text-emerald-600">{deal.totalPastProfit}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mt-2">Total Profit</p>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 text-center">
              <Award className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-3xl md:text-4xl font-light text-neutral-900">{deal.trackRecord.length}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mt-2">Completed</p>
            </div>
          </motion.div>
        </div>

        {/* Track Record Cards */}
        <div className="space-y-4">
          {deal.trackRecord.map((record, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-lg transition-all group"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                {/* Property Name */}
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{record.address}</p>
                      <p className="text-xs text-neutral-400">Completed Deal</p>
                    </div>
                  </div>
                </div>

                {/* Acquisition */}
                <div className="text-center md:text-left">
                  <p className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-1">Acquisition</p>
                  <p className="text-lg text-neutral-600">{record.acquisitionPrice}</p>
                </div>

                {/* Investment */}
                <div className="text-center md:text-left">
                  <p className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-1">Investment</p>
                  <p className="text-lg text-neutral-600">{record.totalInvestment}</p>
                </div>

                {/* Sale */}
                <div className="text-center md:text-left">
                  <p className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-1">Sale</p>
                  <p className="text-lg font-medium text-neutral-900">{record.salePrice}</p>
                </div>

                {/* Profit */}
                <div className="text-center md:text-right">
                  <p className="text-xs tracking-[0.15em] uppercase text-emerald-600 mb-1">Profit</p>
                  <p className="text-xl font-semibold text-emerald-600 flex items-center gap-2 justify-center md:justify-end">
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
          className="mt-8 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-2xl p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-emerald-700 font-medium">Total Profit Generated</p>
                <p className="text-xs text-emerald-600/70">Across all completed deals</p>
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-semibold text-emerald-700">{deal.totalPastProfit}</p>
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
