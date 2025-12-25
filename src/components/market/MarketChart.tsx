import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { InfoTooltip } from "@/components/ui/info-tooltip";

const timeRanges = ["1D", "7D", "1M", "6M", "1Y", "All"];

// Generate mock chart data
const generateChartData = (days: number) => {
  const data = [];
  const basePrice = 0.604;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const randomChange = (Math.random() - 0.5) * 0.02;
    const price = basePrice + randomChange + (Math.sin(i / 5) * 0.01);
    const volume = Math.floor(Math.random() * 50000) + 10000;
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: parseFloat(price.toFixed(4)),
      volume,
    });
  }
  return data;
};

export const MarketChart = () => {
  const [selectedRange, setSelectedRange] = useState("1M");
  const [showVolume, setShowVolume] = useState(true);
  
  const chartData = generateChartData(
    selectedRange === "1D" ? 1 : 
    selectedRange === "7D" ? 7 : 
    selectedRange === "1M" ? 30 : 
    selectedRange === "6M" ? 180 : 
    selectedRange === "1Y" ? 365 : 730
  );

  const currentPrice = chartData[chartData.length - 1]?.price || 0.604;
  const previousPrice = chartData[0]?.price || 0.604;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isPositive = priceChange >= 0;

  return (
    <Card className="p-6 bg-card border-border/50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Asset Icon */}
          <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">$</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>ADA / USDC</span>
              <button className="p-1 hover:bg-muted/50 rounded transition-colors">
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl lg:text-3xl font-bold text-foreground font-sans">
                {currentPrice.toFixed(8)}
              </span>
              <span className="text-lg text-muted-foreground">ADA</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-sm font-medium flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date().toLocaleString("en-US", { 
                  hour: "numeric", 
                  minute: "2-digit",
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedRange === range
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {range}
            </button>
          ))}
          <span className="ml-2 text-xs text-primary font-medium cursor-pointer hover:underline">
            See All
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setShowVolume(false)}
          className={`flex items-center gap-2 text-xs ${!showVolume ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <span className="w-2 h-2 rounded-full bg-primary/60" />
          Price per unit
        </button>
        <button
          onClick={() => setShowVolume(true)}
          className={`flex items-center gap-2 text-xs ${showVolume ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <span className="w-2 h-2 rounded-full bg-primary" />
          Volume
        </button>
        <InfoTooltip content="Toggle between price and volume chart views" />
      </div>

      {/* Chart */}
      <div className="h-[280px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="hsl(var(--border))" 
              opacity={0.3}
            />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              dy={10}
            />
            <YAxis 
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              domain={['dataMin - 0.002', 'dataMax + 0.002']}
              tickFormatter={(value) => value.toFixed(4)}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '12px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600, marginBottom: '4px' }}
              itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
              formatter={(value: number) => [value.toFixed(6), showVolume ? 'Volume' : 'Price']}
            />
            <Area
              type="monotone"
              dataKey={showVolume ? "volume" : "price"}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'white', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Price Line Indicator */}
      <div className="relative mt-2 h-1 bg-muted/30 rounded-full overflow-hidden">
        <motion.div 
          className="absolute left-0 top-0 h-full bg-primary/40 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "60%" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-2 h-2 bg-primary rounded-full shadow-sm" />
      </div>
    </Card>
  );
};
