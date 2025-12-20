import { motion } from "framer-motion";
import { Trophy, TrendingUp, CheckCircle, Award, Sparkles, ExternalLink } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState } from "react";

// Track record images
import filareeHeights from "@/assets/track-record/filaree-heights.jpg";
import coolOakWay from "@/assets/track-record/cool-oak-way.jpg";
import sunsetPlaza from "@/assets/track-record/sunset-plaza.jpg";
import seaboardRd from "@/assets/track-record/seaboard-rd.jpg";
import risingGlen from "@/assets/track-record/rising-glen.jpg";
import casianoRd from "@/assets/track-record/casiano-rd.jpg";
import lomaVista from "@/assets/track-record/loma-vista.jpg";
import calvinAve from "@/assets/track-record/calvin-ave.jpg";

// Map addresses to images
const trackRecordImages: Record<string, string> = {
  "5901 Filaree Heights, Malibu": filareeHeights,
  "20737 Cool Oak Way, Malibu": coolOakWay,
  "2460 Sunset Plaza Dr, Los Angeles": sunsetPlaza,
  "20647 Seaboard Rd, Malibu": seaboardRd,
  "8818 Rising Glen Place, Los Angeles": risingGlen,
  "1394 Casiano Rd, Los Angeles": casianoRd,
  "1061 Loma Vista Dr, Beverly Hills": lomaVista,
  "4965 Calvin Avenue, Tarzana": calvinAve,
};

// Map addresses to listing URLs
const trackRecordUrls: Record<string, string> = {
  "5901 Filaree Heights, Malibu": "https://www.zillow.com/homedetails/5901-Filaree-Heights-Ave-Malibu-CA-90265/20523887_zpid/",
  "20737 Cool Oak Way, Malibu": "https://www.zillow.com/homedetails/20737-Cool-Oak-Way-Malibu-CA-90265/20520649_zpid/",
  "2460 Sunset Plaza Dr, Los Angeles": "https://www.zillow.com/homedetails/2460-Sunset-Plaza-Dr-Los-Angeles-CA-90069/20795426_zpid/",
  "20647 Seaboard Rd, Malibu": "https://www.zillow.com/homedetails/20647-Seaboard-Rd-Malibu-CA-90265/20520561_zpid/",
  "8818 Rising Glen Place, Los Angeles": "https://www.zillow.com/homedetails/8818-Rising-Glen-Pl-Los-Angeles-CA-90069/20791579_zpid/",
  "1394 Casiano Rd, Los Angeles": "https://www.zillow.com/homedetails/1394-Casiano-Rd-Los-Angeles-CA-90049/20533179_zpid/",
  "1061 Loma Vista Dr, Beverly Hills": "https://www.zillow.com/homedetails/1061-Loma-Vista-Dr-Beverly-Hills-CA-90210/20533512_zpid/",
  "4965 Calvin Avenue, Tarzana": "https://www.zillow.com/homedetails/4965-Calvin-Ave-Tarzana-CA-91356/19969377_zpid/",
};

interface DealTrackRecordProps {
  deal: DealData;
}

export const DealTrackRecord = ({ deal }: DealTrackRecordProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!deal.trackRecord || deal.trackRecord.length === 0) return null;

  const handleCardClick = (address: string) => {
    const url = trackRecordUrls[address];
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="py-32 relative overflow-hidden min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-slate-300" />
              <span className="text-xs tracking-[0.4em] uppercase text-slate-400 font-medium">
                Proven Performance
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.1]"
            >
              Track <span className="italic text-slate-400 font-serif">Record</span>
            </motion.h2>
          </div>
          
          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {/* Total Profit Card */}
            <motion.div 
              className="p-6 text-center cursor-pointer group relative overflow-hidden bg-slate-800"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Trophy className="w-5 h-5 text-slate-400 mx-auto mb-3 relative z-10" />
              <p className="text-3xl md:text-4xl font-light text-white relative z-10">{deal.totalPastProfit}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-slate-500 mt-2 relative z-10">Total Profit</p>
            </motion.div>
            
            {/* Completed Count Card */}
            <motion.div 
              className="p-6 text-center cursor-pointer group relative overflow-hidden bg-white border border-slate-200"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Award className="w-5 h-5 text-slate-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-light text-slate-900">{deal.trackRecord.length}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mt-2">Completed</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Track Record Cards */}
        <div className="space-y-4">
          {deal.trackRecord.map((record, index) => {
            const isHovered = hoveredIndex === index;
            const image = trackRecordImages[record.address];
            const hasUrl = !!trackRecordUrls[record.address];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(record.address)}
                className="cursor-pointer relative overflow-hidden group"
              >
                <motion.div
                  className={`p-5 relative transition-all duration-500 ${
                    isHovered 
                      ? 'bg-slate-800' 
                      : 'bg-white border border-slate-100'
                  }`}
                  animate={{ y: isHovered ? -4 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative z-10 grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                    {/* Property Image & Name */}
                    <div className="col-span-2 md:col-span-2">
                      <div className="flex items-center gap-4">
                        {/* Property Image */}
                        <motion.div 
                          className={`w-16 h-16 flex-shrink-0 overflow-hidden rounded transition-all duration-500 ${
                            isHovered ? 'ring-2 ring-slate-500' : 'ring-1 ring-slate-200'
                          }`}
                          animate={{ scale: isHovered ? 1.05 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {image ? (
                            <img 
                              src={image} 
                              alt={record.address}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center transition-colors duration-500 ${
                              isHovered ? 'bg-slate-700' : 'bg-slate-100'
                            }`}>
                              <CheckCircle className={`w-5 h-5 transition-colors duration-500 ${
                                isHovered ? 'text-slate-400' : 'text-slate-400'
                              }`} />
                            </div>
                          )}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`font-medium text-sm transition-colors duration-500 truncate ${
                              isHovered ? 'text-white' : 'text-slate-900'
                            }`}>{record.address}</p>
                            {hasUrl && (
                              <ExternalLink className={`w-3 h-3 flex-shrink-0 transition-colors duration-500 ${
                                isHovered ? 'text-slate-400' : 'text-slate-400'
                              }`} />
                            )}
                          </div>
                          <p className={`text-xs transition-colors duration-500 ${
                            isHovered ? 'text-slate-500' : 'text-slate-400'
                          }`}>Completed</p>
                        </div>
                      </div>
                    </div>

                    {/* Acquisition */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-slate-500' : 'text-slate-400'
                      }`}>Acquisition</p>
                      <p className={`text-base transition-colors duration-500 ${
                        isHovered ? 'text-slate-300' : 'text-slate-600'
                      }`}>{record.acquisitionPrice}</p>
                    </div>

                    {/* Investment */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-slate-500' : 'text-slate-400'
                      }`}>Investment</p>
                      <p className={`text-base transition-colors duration-500 ${
                        isHovered ? 'text-slate-300' : 'text-slate-600'
                      }`}>{record.totalInvestment}</p>
                    </div>

                    {/* Sale */}
                    <div className="text-center md:text-left">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-slate-500' : 'text-slate-400'
                      }`}>Sale</p>
                      <p className={`text-base font-medium transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-slate-900'
                      }`}>{record.salePrice}</p>
                    </div>

                    {/* Profit - Highlighted */}
                    <div className="text-center md:text-right">
                      <p className={`text-[10px] tracking-[0.15em] uppercase mb-1 transition-colors duration-500 ${
                        isHovered ? 'text-slate-400' : 'text-slate-500'
                      }`}>Profit</p>
                      <motion.div 
                        className={`text-lg font-semibold flex items-center gap-2 justify-center md:justify-end transition-all duration-500 ${
                          isHovered ? 'text-white' : 'text-slate-900'
                        }`}
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sparkles className={`w-4 h-4 transition-colors duration-500 ${isHovered ? 'text-slate-400' : 'text-slate-500'}`} />
                        <span>{record.profit}</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Total Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01, y: -4 }}
          className="mt-8 cursor-pointer group relative overflow-hidden bg-slate-800"
        >
          <div className="p-8 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-14 h-14 bg-slate-700 flex items-center justify-center"
                whileHover={{ rotate: 6, scale: 1.1 }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-white">Total Profit Generated</p>
                <p className="text-xs text-slate-500">Across all completed deals</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl md:text-4xl font-light text-white">
                {deal.totalPastProfit}
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-500">Realized gains</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xs text-slate-400 mt-8"
        >
          Past performance is not indicative of future results. All investments carry risk.
        </motion.p>
      </div>
    </section>
  );
};
