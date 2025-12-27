import { motion } from "framer-motion";
import { Building2, Film, Music, Briefcase, TrendingUp } from "lucide-react";

const assets = [
  { 
    name: "Real Estate", 
    value: 65000, 
    percentage: 45, 
    color: "hsl(262, 84%, 64%)", // Primary violet
    icon: Building2,
    deals: 3,
  },
  { 
    name: "Film & Media", 
    value: 35000, 
    percentage: 24, 
    color: "hsl(340, 82%, 52%)", // Rose
    icon: Film,
    deals: 2,
  },
  { 
    name: "Music Rights", 
    value: 25000, 
    percentage: 18, 
    color: "hsl(47, 95%, 53%)", // Amber
    icon: Music,
    deals: 1,
  },
  { 
    name: "Private Credit", 
    value: 18750, 
    percentage: 13, 
    color: "hsl(160, 84%, 39%)", // Emerald
    icon: Briefcase,
    deals: 2,
  },
];

export const PortfolioAssetAllocation = () => {
  const total = assets.reduce((sum, asset) => sum + asset.value, 0);

  // Calculate cumulative angles for the donut chart
  let cumulativePercentage = 0;
  const segments = assets.map(asset => {
    const startAngle = (cumulativePercentage / 100) * 360;
    cumulativePercentage += asset.percentage;
    const endAngle = (cumulativePercentage / 100) * 360;
    return { ...asset, startAngle, endAngle };
  });

  const createArcPath = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) => {
    const startAngleRad = (startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = 100 + outerRadius * Math.cos(startAngleRad);
    const y1 = 100 + outerRadius * Math.sin(startAngleRad);
    const x2 = 100 + outerRadius * Math.cos(endAngleRad);
    const y2 = 100 + outerRadius * Math.sin(endAngleRad);
    const x3 = 100 + innerRadius * Math.cos(endAngleRad);
    const y3 = 100 + innerRadius * Math.sin(endAngleRad);
    const x4 = 100 + innerRadius * Math.cos(startAngleRad);
    const y4 = 100 + innerRadius * Math.sin(startAngleRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl border border-border p-6 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-serif font-semibold text-foreground">Asset Allocation</h3>
          <p className="text-sm text-muted-foreground">By investment category</p>
        </div>
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Donut Chart */}
      <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-6">
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
          {segments.map((segment, index) => (
            <motion.path
              key={segment.name}
              d={createArcPath(segment.startAngle, segment.endAngle, 85, 55)}
              fill={segment.color}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="hover:opacity-80 transition-opacity cursor-pointer"
              style={{ transformOrigin: 'center' }}
            />
          ))}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-serif font-bold text-foreground">€{(total / 1000).toFixed(0)}K</p>
          <p className="text-xs text-muted-foreground">Total Invested</p>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {assets.map((asset, index) => {
          const Icon = asset.icon;
          return (
            <motion.div
              key={asset.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between group hover:bg-muted/50 rounded-lg p-2 -mx-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: asset.color }}
                />
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{asset.name}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{asset.percentage}%</p>
                <p className="text-xs text-muted-foreground">{asset.deals} deals</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
