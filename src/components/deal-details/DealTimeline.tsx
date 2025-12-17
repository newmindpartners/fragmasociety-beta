import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, ArrowRight } from "lucide-react";
import type { DealData } from "@/types/deal";

// Background image
import timelineBg from "@/assets/malibu-sea-view.jpg";

interface DealTimelineProps {
  deal: DealData;
}

export const DealTimeline = ({ deal }: DealTimelineProps) => {
  if (!deal.timeline) return null;

  return (
    <section className="py-32 relative overflow-hidden min-h-screen">
      {/* Photo Background with transparency */}
      <div className="absolute inset-0">
        <img 
          src={timelineBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/85" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-slate-500" />
            <span className="text-xs tracking-[0.4em] uppercase text-slate-400 font-medium">
              Investment Timeline
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
            Development <span className="italic text-slate-400 font-serif">Timeline</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl font-light">
            Expected project milestones over {deal.timeline.totalDuration}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Horizontal Timeline Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-slate-700" />
            <motion.div
              className="hidden md:block absolute top-16 left-0 h-px bg-slate-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "50%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* Timeline Items */}
            <div className="grid md:grid-cols-4 gap-12 md:gap-8">
              {deal.timeline.phases.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Node */}
                  <div className="flex justify-center md:justify-start mb-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-32 h-32 flex flex-col items-center justify-center relative z-10 border transition-colors duration-300 ${
                        phase.status === "completed"
                          ? "bg-slate-800/80 border-slate-500 backdrop-blur-sm"
                          : phase.status === "current"
                          ? "bg-slate-700/80 border-slate-400 backdrop-blur-sm"
                          : "bg-slate-900/80 border-slate-700 backdrop-blur-sm"
                      }`}
                    >
                      {phase.status === "completed" ? (
                        <CheckCircle className="w-6 h-6 text-slate-400 mb-2" />
                      ) : phase.status === "current" ? (
                        <Clock className="w-6 h-6 text-white mb-2" />
                      ) : (
                        <span className="text-3xl font-light text-slate-600 mb-2 font-serif">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 uppercase tracking-[0.15em]">
                        {phase.status === "completed" ? "Complete" : phase.status === "current" ? "In Progress" : "Upcoming"}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="text-center md:text-left">
                    <p className="text-xs text-slate-500 uppercase tracking-[0.2em] mb-2">
                      {phase.date}
                    </p>
                    <h4 className="text-lg font-light text-white mb-3">{phase.title}</h4>
                    {phase.description && (
                      <p className="text-sm text-slate-500 font-light leading-relaxed">{phase.description}</p>
                    )}
                  </div>

                  {/* Arrow for mobile */}
                  {index < deal.timeline.phases.length - 1 && (
                    <div className="md:hidden flex justify-center mt-8">
                      <ArrowRight className="w-5 h-5 text-slate-600 rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Duration Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mt-20"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 border border-slate-700 bg-slate-900/50 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-xs text-slate-500 uppercase tracking-[0.2em]">Total Duration</span>
              <span className="text-sm font-medium text-white">{deal.timeline.totalDuration}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
