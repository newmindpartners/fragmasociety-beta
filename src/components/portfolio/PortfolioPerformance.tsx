import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, ChevronDown } from "lucide-react";
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
      <div className="bg-card border border-border rounded-xl p-4 shadow-xl">
        <p className="text-sm font-medium text-muted-foreground mb-2">{label} 2024</p>
        <div className="space-y-1">
          <p className="text-lg font-serif font-bold text-foreground">
            €{payload[0].value.toLocaleString()}
          </p>
          {payload[1] && (
            <p className={`text-sm font-medium ${payload[1].value >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
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
  const [selectedRange, setSelectedRange] = useState("1Y");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-card rounded-2xl border border-border p-6 h-full"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-foreground">Performance</h3>
            <p className="text-sm text-muted-foreground">Portfolio growth over time</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedRange === range
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/30 rounded-xl">
          <p className="text-xs text-muted-foreground mb-1">Starting Value</p>
          <p className="text-lg font-serif font-bold text-foreground">€125,000</p>
        </div>
        <div className="text-center p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
          <p className="text-xs text-muted-foreground mb-1">Current Value</p>
          <p className="text-lg font-serif font-bold text-emerald-600">€143,750</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-xl">
          <p className="text-xs text-muted-foreground mb-1">Total Return</p>
          <p className="text-lg font-serif font-bold text-foreground">+15.0%</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={performanceData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(262, 84%, 64%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(262, 84%, 64%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              opacity={0.5}
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}K`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(262, 84%, 64%)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
