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
      <div className="bg-white border border-border rounded-xl p-3 shadow-lg">
        <p className="text-xs font-medium text-muted-foreground mb-1.5">{label} 2024</p>
        <div className="space-y-0.5">
          <p className="text-base font-serif font-bold text-foreground">
            €{payload[0].value.toLocaleString()}
          </p>
          {payload[1] && (
            <p className={`text-xs font-medium ${payload[1].value >= 0 ? 'text-primary' : 'text-destructive'}`}>
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
      className="bg-card rounded-2xl border border-border p-5 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-serif font-semibold text-foreground">Performance</h3>
            <p className="text-xs text-muted-foreground">Portfolio growth over time</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-0.5 bg-muted/50 border border-border rounded-lg p-1">
          {timeRanges.map((range) => (
            <motion.button
              key={range}
              onClick={() => setSelectedRange(range)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                selectedRange === range
                  ? 'bg-card text-foreground border border-border shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-3 bg-muted/30 border border-border/50 rounded-xl">
          <p className="text-[10px] text-muted-foreground mb-1">Starting Value</p>
          <p className="text-lg font-serif font-bold text-foreground">€125,000</p>
        </div>
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl">
          <p className="text-[10px] text-muted-foreground mb-1">Current Value</p>
          <p className="text-lg font-serif font-bold text-primary">€143,750</p>
        </div>
        <div className="p-3 bg-muted/30 border border-border/50 rounded-xl">
          <p className="text-[10px] text-muted-foreground mb-1">Total Return</p>
          <p className="text-lg font-serif font-bold text-foreground">+15.0%</p>
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
              <linearGradient id="colorValueLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(280, 88%, 37%)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(280, 88%, 37%)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="4 4" 
              stroke="hsl(var(--border))" 
              opacity={0.6}
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              dy={8}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}K`}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(280, 88%, 37%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValueLight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
