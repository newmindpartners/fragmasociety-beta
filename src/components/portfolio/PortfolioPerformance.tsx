import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { month: "Jan", value: 125000, returns: 0 },
  { month: "Feb", value: 127500, returns: 2500 },
  { month: "Mar", value: 129000, returns: 4000 },
  { month: "Apr", value: 131500, returns: 6500 },
  { month: "May", value: 128000, returns: 3000 },
  { month: "Jun", value: 133000, returns: 8000 },
  { month: "Jul", value: 136500, returns: 11500 },
  { month: "Aug", value: 138000, returns: 13000 },
  { month: "Sep", value: 140500, returns: 15500 },
  { month: "Oct", value: 139000, returns: 14000 },
  { month: "Nov", value: 142000, returns: 17000 },
  { month: "Dec", value: 143750, returns: 18750 },
];

const timeRanges = ["1M", "3M", "6M", "1Y", "All"];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[hsl(230,65%,12%)] border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-sm">
        <p className="text-xs font-medium text-white/50 mb-1.5">{label} 2024</p>
        <div className="space-y-0.5">
          <p className="text-base font-serif font-bold text-white">
            €{payload[0].value.toLocaleString()}
          </p>
          {payload[1] && (
            <p className={`text-xs font-medium ${payload[1].value >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {payload[1].value >= 0 ? '+' : ''}€{payload[1].value.toLocaleString()} returns
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const PortfolioPerformance = () => {
  const [selectedRange, setSelectedRange] = useState("All");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="relative rounded-2xl overflow-hidden h-full"
    >
      {/* Dark gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, hsl(230, 60%, 8%) 0%, hsl(230, 65%, 5%) 100%)
          `
        }}
      />
      
      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.08]" />
      
      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-serif font-semibold text-white">Performance</h3>
              <p className="text-xs text-white/40">Portfolio growth over time</p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-lg p-1">
            {timeRanges.map((range) => (
              <motion.button
                key={range}
                onClick={() => setSelectedRange(range)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  selectedRange === range
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {range}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <p className="text-[10px] text-white/40 mb-1">Starting Value</p>
            <p className="text-lg font-serif font-bold text-white/90">€125,000</p>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <p className="text-[10px] text-white/40 mb-1">Current Value</p>
            <p className="text-lg font-serif font-bold text-emerald-400">€143,750</p>
          </div>
          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <p className="text-[10px] text-white/40 mb-1">Total Return</p>
            <p className="text-lg font-serif font-bold text-white/90">+15.0%</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValueDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="4 4" 
                stroke="rgba(255,255,255,0.06)" 
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }}
                dy={8}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }}
                tickFormatter={(value) => `€${(value / 1000).toFixed(0)}K`}
                dx={-5}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="rgba(139, 92, 246, 1)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValueDark)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
