import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InvestmentOverview = () => {
  const portfolioData = {
    invested: 0,
    cash: 0,
    growth: 0,
  };

  // Generate tick marks for the gauge
  const tickMarks = Array.from({ length: 13 }, (_, i) => {
    const angle = -135 + (i * 270) / 12; // From -135deg to 135deg (270 degree arc)
    const isLong = i % 3 === 0;
    return { angle, isLong };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-card via-card to-primary/5 rounded-xl border border-primary/30 p-6 flex flex-col h-full shadow-lg shadow-primary/5 ring-1 ring-primary/10"
    >
      {/* Header */}
      <h3 className="text-2xl font-serif font-semibold text-foreground mb-6 leading-tight">
        Investment & Cash<br />Overview
      </h3>

      {/* Gauge Chart */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-56 h-32">
          {/* Tick marks */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120">
            <g transform="translate(100, 100)">
              {tickMarks.map((tick, i) => {
                const radians = (tick.angle * Math.PI) / 180;
                const innerRadius = tick.isLong ? 65 : 70;
                const outerRadius = 78;
                const x1 = innerRadius * Math.cos(radians);
                const y1 = innerRadius * Math.sin(radians);
                const x2 = outerRadius * Math.cos(radians);
                const y2 = outerRadius * Math.sin(radians);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="hsl(var(--border))"
                    strokeWidth={tick.isLong ? 2 : 1.5}
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
          </svg>

          {/* Main arc background */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <motion.path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ 
                strokeDashoffset: 251.2 - (portfolioData.growth / 100) * 251.2 
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-4xl font-serif font-bold text-foreground"
            >
              {portfolioData.growth}%
            </motion.span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-sm text-muted-foreground">Your Balance Growth</span>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between w-full max-w-xs mt-6">
          <div className="flex flex-col items-center">
            <span className="text-sm text-muted-foreground">Invest.</span>
            <span className="text-xl font-serif font-bold text-foreground">${portfolioData.invested}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-muted-foreground">Cash</span>
            <span className="text-xl font-serif font-bold text-foreground">${portfolioData.cash}</span>
          </div>
        </div>
      </div>

      {/* Deposit Button */}
      <Button variant="navy" className="w-full rounded-full h-14 text-lg">
        Deposit
      </Button>
    </motion.div>
  );
};
