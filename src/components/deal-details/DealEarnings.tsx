import { motion } from "framer-motion";
import { 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Clock, 
  CheckCircle2,
  Info,
  Download,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EarningsPeriod {
  period: string;
  grossAmount: number;
  withholdingTax: number;
  netAmount: number;
  status: "paid" | "pending" | "scheduled";
  paymentDate: string;
}

interface DealEarningsProps {
  dealId?: string;
  dealTitle?: string;
}

const mockEarningsPeriods: EarningsPeriod[] = [
  {
    period: "Q4 2024",
    grossAmount: 125.00,
    withholdingTax: 18.75,
    netAmount: 106.25,
    status: "paid",
    paymentDate: "Dec 15, 2024"
  },
  {
    period: "Q3 2024",
    grossAmount: 118.50,
    withholdingTax: 17.78,
    netAmount: 100.72,
    status: "paid",
    paymentDate: "Sep 15, 2024"
  },
  {
    period: "Q2 2024",
    grossAmount: 112.00,
    withholdingTax: 16.80,
    netAmount: 95.20,
    status: "paid",
    paymentDate: "Jun 15, 2024"
  },
  {
    period: "Q1 2024",
    grossAmount: 108.00,
    withholdingTax: 16.20,
    netAmount: 91.80,
    status: "paid",
    paymentDate: "Mar 15, 2024"
  },
];

const taxInfo = {
  taxResidence: "France",
  withholdingRate: "15%",
  taxTreatyApplied: "Yes",
  ytdGrossEarnings: 463.50,
  ytdWithholding: 69.53,
  ytdNetEarnings: 393.97,
};

export const DealEarnings = ({ dealId, dealTitle = "Investment" }: DealEarningsProps) => {
  const getStatusBadge = (status: EarningsPeriod["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-violet-50 text-violet-700 border border-violet-200">
            <Calendar className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        );
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl font-serif font-semibold text-slate-900 mb-2">
            Earnings Overview
          </h2>
          <p className="text-slate-600">
            Track your earnings, tax withholdings, and payout history for this investment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Summary & Tax Info */}
          <div className="space-y-6">
            {/* YTD Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white/80">Year-to-Date</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Gross Earnings</p>
                  <p className="text-2xl font-bold">€{taxInfo.ytdGrossEarnings.toFixed(2)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Withholding</p>
                    <p className="text-lg font-semibold">-€{taxInfo.ytdWithholding.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Net Received</p>
                    <p className="text-lg font-semibold text-emerald-300">€{taxInfo.ytdNetEarnings.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tax Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-slate-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Tax Information</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Tax Residence</span>
                  <span className="text-sm font-medium text-slate-900">{taxInfo.taxResidence}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Withholding Rate</span>
                  <span className="text-sm font-medium text-slate-900">{taxInfo.withholdingRate}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-500">Tax Treaty Applied</span>
                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {taxInfo.taxTreatyApplied}
                  </Badge>
                </div>
              </div>

              <div className="mt-5 p-3 bg-slate-50 rounded-xl flex items-start gap-2">
                <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-500">
                  Tax withholdings are based on your declared tax residence. You may be able to claim a tax credit in your home country.
                </p>
              </div>

              <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors">
                <Download className="w-4 h-4" />
                Download Tax Statement
              </button>
            </motion.div>
          </div>

          {/* Right Column - Period Breakdown & Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Period Breakdown Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">Period Breakdown</h3>
                <p className="text-sm text-slate-500 mt-1">Detailed earnings by distribution period</p>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-slate-50 text-xs font-medium text-slate-500 uppercase tracking-wider">
                <span>Period</span>
                <span className="text-right">Gross</span>
                <span className="text-right">Tax</span>
                <span className="text-right">Net</span>
                <span className="text-right">Status</span>
              </div>

              {/* Table Body */}
              {mockEarningsPeriods.map((period, index) => (
                <motion.div
                  key={period.period}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="grid grid-cols-5 gap-4 px-6 py-4 items-center border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-900">{period.period}</p>
                    <p className="text-xs text-slate-400">{period.paymentDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900">€{period.grossAmount.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-red-500">-€{period.withholdingTax.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">€{period.netAmount.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(period.status)}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Past Payouts Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="bg-white border border-slate-200 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-slate-900">Payout Timeline</h3>
                  <p className="text-sm text-slate-500 mt-1">Complete history of distributions</p>
                </div>
                <button className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-200" />

                {/* Timeline Items */}
                <div className="space-y-6">
                  {mockEarningsPeriods.map((period, index) => (
                    <motion.div
                      key={period.period}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="relative flex gap-4"
                    >
                      {/* Timeline Dot */}
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        period.status === "paid" 
                          ? "bg-emerald-100 text-emerald-600" 
                          : "bg-slate-100 text-slate-400"
                      }`}>
                        {period.status === "paid" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-slate-50 rounded-xl p-4 hover:bg-slate-100/80 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-slate-900">{period.period} Distribution</p>
                            <p className="text-sm text-slate-500 mt-0.5">{period.paymentDate}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-emerald-600">+€{period.netAmount.toFixed(2)}</p>
                            <p className="text-xs text-slate-400">net of tax</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-4 text-xs text-slate-500">
                          <span>Gross: €{period.grossAmount.toFixed(2)}</span>
                          <span>•</span>
                          <span>Withholding: €{period.withholdingTax.toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
