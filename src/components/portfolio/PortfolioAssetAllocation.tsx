import { motion } from "framer-motion";
import { Building2, Film, Music, Landmark, TrendingUp } from "lucide-react";

const assets = [
  { 
    name: "Real Estate", 
    value: 65000, 
    percentage: 45, 
    color: "#8B5CF6", // Violet
    icon: Building2,
    deals: 3,
  },
  { 
    name: "Film & Media", 
    value: 35000, 
    percentage: 24, 
    color: "#EC4899", // Pink
    icon: Film,
    deals: 2,
  },
  { 
    name: "Music Rights", 
    value: 25000, 
    percentage: 18, 
    color: "#F59E0B", // Amber
    icon: Music,
    deals: 1,
  },
  { 
    name: "Private Credit", 
    value: 18750, 
    percentage: 13, 
    color: "#10B981", // Emerald
    icon: Landmark,
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
      className="relative rounded-2xl overflow-hidden h-full"
    >
      {/* Dark gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 80% 0%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
            linear-gradient(180deg, hsl(230, 60%, 8%) 0%, hsl(230, 65%, 5%) 100%)
          `
        }}
      />
      
      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.08]" />
      
      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-serif font-semibold text-white">Asset Allocation</h3>
            <p className="text-xs text-white/40">By investment category</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-violet-400" />
          </div>
        </div>

        {/* Donut Chart */}
        <div className="relative w-full aspect-square max-w-[160px] mx-auto mb-5">
          <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
            {segments.map((segment, index) => (
              <motion.path
                key={segment.name}
                d={createArcPath(segment.startAngle, segment.endAngle, 80, 50)}
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
            <p className="text-xl font-serif font-bold text-white">€{(total / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-white/40">Total Invested</p>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-1.5">
          {assets.map((asset, index) => {
            const Icon = asset.icon;
            return (
              <motion.div
                key={asset.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                whileHover={{ x: 2 }}
                className="flex items-center justify-between group hover:bg-white/[0.03] rounded-lg p-2 -mx-2 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: asset.color }}
                  />
                  <div className="w-7 h-7 rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-white/50" />
                  </div>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{asset.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white/90">{asset.percentage}%</p>
                  <p className="text-[10px] text-white/35">{asset.deals} deals</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
