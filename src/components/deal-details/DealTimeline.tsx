import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, ArrowRight } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealTimelineProps {
  deal: DealData;
}

export const DealTimeline = ({ deal }: DealTimelineProps) => {
  if (!deal.timeline) return null;

  return (
    <section className="py-32 relative overflow-hidden bg-navy-deep">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-foreground/40 uppercase mb-4 block">
            Investment Timeline
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground mb-6">
            Development Timeline
          </h2>
          <p className="text-lg text-foreground/50 max-w-xl font-light">
            Expected project milestones over {deal.timeline.totalDuration}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Horizontal Timeline Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-foreground/10" />
            <motion.div
              className="hidden md:block absolute top-16 left-0 h-px bg-foreground/30"
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
                          ? "bg-foreground/5 border-foreground/30"
                          : phase.status === "current"
                          ? "bg-navy-surface border-foreground/40"
                          : "bg-navy border-foreground/10"
                      }`}
                    >
                      {phase.status === "completed" ? (
                        <CheckCircle className="w-6 h-6 text-foreground/60 mb-2" />
                      ) : phase.status === "current" ? (
                        <Clock className="w-6 h-6 text-foreground/70 mb-2" />
                      ) : (
                        <span className="text-3xl font-serif font-light text-foreground/30 mb-2">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      )}
                      <span className="text-[10px] text-foreground/40 uppercase tracking-[0.15em]">
                        {phase.status === "completed" ? "Complete" : phase.status === "current" ? "In Progress" : "Upcoming"}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="text-center md:text-left">
                    <p className="text-xs text-foreground/50 uppercase tracking-[0.2em] mb-2">
                      {phase.date}
                    </p>
                    <h4 className="text-lg font-serif font-light text-foreground mb-3">{phase.title}</h4>
                    {phase.description && (
                      <p className="text-sm text-foreground/40 font-light leading-relaxed">{phase.description}</p>
                    )}
                  </div>

                  {/* Arrow for mobile */}
                  {index < deal.timeline.phases.length - 1 && (
                    <div className="md:hidden flex justify-center mt-8">
                      <ArrowRight className="w-5 h-5 text-foreground/20 rotate-90" />
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
            <div className="inline-flex items-center gap-4 px-8 py-4 border border-foreground/10">
              <Clock className="w-4 h-4 text-foreground/40" />
              <span className="text-xs text-foreground/40 uppercase tracking-[0.2em]">Total Duration</span>
              <span className="text-sm font-medium text-foreground">{deal.timeline.totalDuration}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
