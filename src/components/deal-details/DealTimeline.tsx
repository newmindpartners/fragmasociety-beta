import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, ArrowRight } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealTimelineProps {
  deal: DealData;
}

export const DealTimeline = ({ deal }: DealTimelineProps) => {
  if (!deal.timeline) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Calendar className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">Investment Timeline</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Development </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expected project milestones over {deal.timeline.totalDuration}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Horizontal Timeline Line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-white/10" />
            <motion.div
              className="hidden md:block absolute top-8 left-0 h-0.5 bg-gradient-to-r from-primary to-[hsl(175,70%,50%)]"
              initial={{ width: "0%" }}
              whileInView={{ width: "50%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* Timeline Items */}
            <div className="grid md:grid-cols-4 gap-8">
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
                  <div className="flex justify-center mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 ${
                        phase.status === "completed"
                          ? "bg-green-500/20 border-2 border-green-500"
                          : phase.status === "current"
                          ? "bg-primary/20 border-2 border-primary animate-pulse"
                          : "bg-white/10 border-2 border-white/20"
                      }`}
                    >
                      {phase.status === "completed" ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : phase.status === "current" ? (
                        <Clock className="w-6 h-6 text-primary" />
                      ) : (
                        <span className="text-lg font-bold text-white/50">{index + 1}</span>
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                      {phase.date}
                    </p>
                    <h4 className="text-sm font-semibold text-foreground mb-2">{phase.title}</h4>
                    {phase.description && (
                      <p className="text-xs text-muted-foreground">{phase.description}</p>
                    )}
                  </div>

                  {/* Arrow for mobile */}
                  {index < deal.timeline.phases.length - 1 && (
                    <div className="md:hidden flex justify-center mt-4">
                      <ArrowRight className="w-5 h-5 text-white/30 rotate-90" />
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
            className="flex justify-center mt-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
              <Clock className="w-5 h-5 text-white/70" />
              <span className="text-sm text-muted-foreground">Total Duration:</span>
              <span className="text-sm font-semibold text-foreground">{deal.timeline.totalDuration}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
