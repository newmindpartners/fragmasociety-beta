import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRightLeft, TrendingUp, TrendingDown, BarChart3, LineChart } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart, Customized } from "recharts";
import { InfoTooltip } from "@/components/ui/info-tooltip";

const timeRanges = ["1D", "7D", "1M", "6M", "1Y", "All"];

type ChartType = "line" | "candlestick";

interface OHLCData {
  date: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Generate mock chart data with OHLC for candlestick
const generateChartData = (days: number): OHLCData[] => {
  const data: OHLCData[] = [];
  const basePrice = 0.604;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const randomChange = (Math.random() - 0.5) * 0.02;
    const open = basePrice + randomChange + (Math.sin(i / 5) * 0.01);
    const close = open + (Math.random() - 0.5) * 0.01;
    const high = Math.max(open, close) + Math.random() * 0.005;
    const low = Math.min(open, close) - Math.random() * 0.005;
    const volume = Math.floor(Math.random() * 50000) + 10000;
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: parseFloat(close.toFixed(4)),
      open: parseFloat(open.toFixed(4)),
      high: parseFloat(high.toFixed(4)),
      low: parseFloat(low.toFixed(4)),
      close: parseFloat(close.toFixed(4)),
      volume,
    });
  }
  return data;
};

// Custom Candlestick SVG renderer
interface CandlestickRendererProps {
  data: OHLCData[];
  xAxisMap?: any;
  yAxisMap?: any;
  offset?: any;
}

const CandlestickRenderer = ({ data, xAxisMap, yAxisMap, offset }: CandlestickRendererProps) => {
  if (!xAxisMap || !yAxisMap || !offset) return null;
  
  const xAxis = Object.values(xAxisMap)[0] as any;
  const yAxis = Object.values(yAxisMap)[0] as any;
  
  if (!xAxis?.scale || !yAxis?.scale) return null;
  
  const yScale = yAxis.scale;
  
  // Calculate chart dimensions from offset
  const chartWidth = offset.width || 0;
  const chartLeft = offset.left || 0;
  const dataLength = data.length;
  
  if (dataLength === 0 || chartWidth === 0) return null;
  
  // Calculate bar width and spacing
  const barSpacing = chartWidth / dataLength;
  const candleWidth = Math.max(barSpacing * 0.6, 4);
  const padding = (barSpacing - candleWidth) / 2;
  
  return (
    <g className="candlestick-layer">
      {data.map((entry, index) => {
        const x = chartLeft + (index * barSpacing) + padding;
        
        const highY = yScale(entry.high);
        const lowY = yScale(entry.low);
        const openY = yScale(entry.open);
        const closeY = yScale(entry.close);
        
        // Check for valid coordinates
        if (isNaN(highY) || isNaN(lowY) || isNaN(openY) || isNaN(closeY)) return null;
        
        const isGreen = entry.close >= entry.open;
        const color = isGreen ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)";
        
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.max(Math.abs(openY - closeY), 2);
        const wickX = x + candleWidth / 2;
        
        return (
          <g key={`candle-${index}`}>
            {/* Wick (high to low line) */}
            <line
              x1={wickX}
              y1={highY}
              x2={wickX}
              y2={lowY}
              stroke={color}
              strokeWidth={1.5}
            />
            {/* Body (open to close rectangle) */}
            <rect
              x={x}
              y={bodyTop}
              width={candleWidth}
              height={bodyHeight}
              fill={color}
              rx={1}
            />
          </g>
        );
      })}
    </g>
  );
};

export const MarketChart = () => {
  const [selectedRange, setSelectedRange] = useState("1M");
  const [chartType, setChartType] = useState<ChartType>("line");
  const [showVolume, setShowVolume] = useState(false);
  
  const chartData = generateChartData(
    selectedRange === "1D" ? 1 : 
    selectedRange === "7D" ? 7 : 
    selectedRange === "1M" ? 30 : 
    selectedRange === "6M" ? 180 : 
    selectedRange === "1Y" ? 365 : 730
  );

  const currentPrice = chartData[chartData.length - 1]?.close || 0.604;
  const previousPrice = chartData[0]?.close || 0.604;
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

        {/* Chart Type & Time Range */}
        <div className="flex items-center gap-3">
          {/* Chart Type Toggle */}
          <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
            <button
              onClick={() => setChartType("line")}
              className={`p-1.5 rounded-md transition-all ${
                chartType === "line"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              title="Line Chart"
            >
              <LineChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType("candlestick")}
              className={`p-1.5 rounded-md transition-all ${
                chartType === "candlestick"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              title="Candlestick Chart"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
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
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setShowVolume(false)}
          className={`flex items-center gap-2 text-xs ${!showVolume ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <span className="w-2 h-2 rounded-full bg-primary/60" />
          Price
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
          {chartType === "line" ? (
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
                dataKey={showVolume ? "volume" : "close"}
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={false}
                activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'white', strokeWidth: 2 }}
              />
            </AreaChart>
          ) : (
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                yAxisId="price"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                domain={[(dataMin: number) => dataMin - 0.002, (dataMax: number) => dataMax + 0.002]}
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
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const isGreen = data.close >= data.open;
                    return (
                      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold text-foreground mb-2">{label}</p>
                        <div className="space-y-1 text-xs">
                          <p className="text-muted-foreground">Open: <span className="text-foreground">{data.open.toFixed(4)}</span></p>
                          <p className="text-muted-foreground">High: <span className="text-foreground">{data.high.toFixed(4)}</span></p>
                          <p className="text-muted-foreground">Low: <span className="text-foreground">{data.low.toFixed(4)}</span></p>
                          <p className="text-muted-foreground">Close: <span className={isGreen ? "text-green-600" : "text-red-500"}>{data.close.toFixed(4)}</span></p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {/* Custom SVG Candlestick Layer */}
              <Customized 
                component={(props: any) => (
                  <CandlestickRenderer 
                    data={chartData} 
                    xAxisMap={props.xAxisMap} 
                    yAxisMap={props.yAxisMap}
                    offset={props.offset}
                  />
                )}
              />
            </ComposedChart>
          )}
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
