import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealTrackRecordProps {
  deal: DealData;
}

export const DealTrackRecord = ({ deal }: DealTrackRecordProps) => {
  if (!deal.trackRecord || deal.trackRecord.length === 0) return null;

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-emerald-300" />
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
              Track <span className="italic">Record</span>
            </motion.h2>
          </div>
          
          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-12"
          >
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-light text-emerald-600">{deal.totalPastProfit}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mt-2">Total Profit</p>
            </div>
            <div className="w-px h-16 bg-neutral-200" />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-light text-neutral-900">{deal.trackRecord.length}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mt-2">Completed</p>
            </div>
          </motion.div>
        </div>

        {/* Track Record Table - Clean & Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-4 text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium">Property</th>
                <th className="text-right py-4 text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium">Acquisition</th>
                <th className="text-right py-4 text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium">Investment</th>
                <th className="text-right py-4 text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium">Sale</th>
                <th className="text-right py-4 text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium">Profit</th>
              </tr>
            </thead>
            <tbody>
              {deal.trackRecord.map((record, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-neutral-100 group hover:bg-neutral-50 transition-colors"
                >
                  <td className="py-6 text-neutral-900 font-medium">{record.address}</td>
                  <td className="py-6 text-right text-neutral-500">{record.acquisitionPrice}</td>
                  <td className="py-6 text-right text-neutral-500">{record.totalInvestment}</td>
                  <td className="py-6 text-right text-neutral-900 font-medium">{record.salePrice}</td>
                  <td className="py-6 text-right text-emerald-600 font-semibold">{record.profit}</td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-emerald-50">
                <td colSpan={4} className="py-6 text-neutral-900 font-semibold">Total Profit Generated</td>
                <td className="py-6 text-right text-emerald-700 text-xl font-bold">{deal.totalPastProfit}</td>
              </tr>
            </tfoot>
          </table>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs text-neutral-400 mt-8"
        >
          Past performance is not indicative of future results. All investments carry risk.
        </motion.p>
      </div>
    </section>
  );
};