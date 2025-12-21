import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Home, CheckCircle } from "lucide-react";

const timelineItems = [
  { year: "2026", month: "January", title: "Acquisition", active: false },
  { year: "2026", month: "August", title: "Permit Accepted", active: true },
  { year: "2026", month: "September", title: "Construction Starts", active: false },
  { year: "2027", month: "October", title: "Sale Listing", active: false },
  { year: "2028", month: "January", title: "Exit", subtitle: "24 months", active: false },
];

const PhaseIllustration = ({ phase }: { phase: number }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Dashed border frame */}
      <div className="absolute inset-4 border-2 border-dashed border-slate-600 rounded-lg" />
      
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-slate-500" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-slate-500" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-slate-500" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-slate-500" />
      
      {/* House icon */}
      <motion.div
        key={phase}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <Home className="w-20 h-20 text-violet-400" strokeWidth={1} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export const OptionsTrading = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'optimistic' | 'downside'>('optimistic');

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % timelineItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-[#0f172a] relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight mb-20"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Development <span className="italic text-violet-300">Timeline</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-slate-600 to-slate-700" />
            
            <div className="space-y-8">
              {timelineItems.map((item, i) => {
                const isActive = i === activePhase;
                const isPast = i < activePhase;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setActivePhase(i)}
                    className="relative pl-10 cursor-pointer group"
                  >
                    {/* Dot */}
                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isActive 
                        ? 'border-violet-500 bg-violet-500' 
                        : isPast 
                          ? 'border-violet-500 bg-violet-500/50' 
                          : 'border-slate-600 bg-slate-800'
                    }`}>
                      {(isActive || isPast) && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    
                    {/* Content */}
                    <div className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}`}>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-2xl font-light ${isActive ? 'text-white' : 'text-slate-400'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                          {item.year}
                        </span>
                        <span className="text-sm text-violet-400 italic">{item.month}</span>
                      </div>
                      <h3 className={`text-lg font-medium ${isActive ? 'text-white' : 'text-slate-400'}`}>
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <span className="text-sm text-slate-500">{item.subtitle}</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Phase Detail Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden"
          >
            {/* Illustration */}
            <div className="h-64 bg-slate-800/50 relative">
              <PhaseIllustration phase={activePhase} />
            </div>
            
            {/* Content */}
            <div className="p-8">
              <p className="text-xs tracking-[0.2em] uppercase text-violet-400 mb-2">
                Phase {activePhase + 1} of {timelineItems.length}
              </p>
              <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {timelineItems[activePhase].title}
              </h3>
              
              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {timelineItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhase(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activePhase 
                        ? 'w-6 bg-violet-500' 
                        : i < activePhase 
                          ? 'w-2 bg-violet-500/50' 
                          : 'w-2 bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-t border-slate-700 flex">
              <button
                onClick={() => setSelectedTab('optimistic')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'optimistic' 
                    ? 'bg-[#1e293b] text-white border-b-2 border-violet-500' 
                    : 'bg-slate-800/50 text-slate-400 hover:text-slate-300'
                }`}
              >
                Optimistic
              </button>
              <button
                onClick={() => setSelectedTab('downside')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'downside' 
                    ? 'bg-[#1e293b] text-white border-b-2 border-violet-500' 
                    : 'bg-slate-800/50 text-slate-400 hover:text-slate-300'
                }`}
              >
                Downside
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
