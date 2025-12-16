import { motion } from "framer-motion";
import { Trophy, TrendingUp, DollarSign } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealTrackRecordProps {
  deal: DealData;
}

export const DealTrackRecord = ({ deal }: DealTrackRecordProps) => {
  if (!deal.trackRecord || deal.trackRecord.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Trophy className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300 font-medium">Proven Performance</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Track </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Record
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            15 years of successful real estate investments
          </p>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20 rounded-xl p-6 text-center"
          >
            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-400">{deal.totalPastProfit}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Profit</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
          >
            <Trophy className="w-8 h-8 text-white/70 mx-auto mb-2" />
            <p className="text-3xl font-bold text-foreground">{deal.trackRecord.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Completed Deals</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
          >
            <TrendingUp className="w-8 h-8 text-white/70 mx-auto mb-2" />
            <p className="text-3xl font-bold text-foreground">15</p>
            <p className="text-xs text-muted-foreground mt-1">Years Experience</p>
          </motion.div>
        </div>

        {/* Track Record Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-white/5 border-b border-white/10 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <div>Property</div>
              <div className="text-right">Acquisition</div>
              <div className="text-right">Total Investment</div>
              <div className="text-right">Sale Price</div>
              <div className="text-right">Profit</div>
            </div>

            {/* Table Rows */}
            {deal.trackRecord.map((record, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <div className="text-sm text-foreground font-medium truncate" title={record.address}>
                  {record.address}
                </div>
                <div className="text-sm text-muted-foreground text-right">{record.acquisitionPrice}</div>
                <div className="text-sm text-muted-foreground text-right">{record.totalInvestment}</div>
                <div className="text-sm text-foreground text-right font-medium">{record.salePrice}</div>
                <div className="text-sm text-green-400 text-right font-bold">{record.profit}</div>
              </motion.div>
            ))}

            {/* Total Row */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-green-500/10">
              <div className="col-span-4 text-sm font-semibold text-foreground">Total Profit</div>
              <div className="text-lg text-green-400 text-right font-bold">{deal.totalPastProfit}</div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[11px] text-muted-foreground text-center mt-6 max-w-2xl mx-auto"
        >
          Past performance is not indicative of future results. All investments carry risk and you may lose some or all of your capital.
        </motion.p>
      </div>
    </section>
  );
};
