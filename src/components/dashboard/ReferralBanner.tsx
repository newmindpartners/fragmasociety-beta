import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReferralBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden rounded-xl bg-white border border-slate-200/80 p-6 lg:p-8 h-full flex items-center"
    >
      {/* Decorative background */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
        <svg 
          viewBox="0 0 400 300" 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[300px] opacity-[0.08]"
          fill="none"
        >
          {/* Abstract waveform pattern */}
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={i}
              x1={200 + i * 10}
              y1={150 - 30 - Math.sin(i * 0.5) * 40}
              x2={200 + i * 10}
              y2={150 + 30 + Math.sin(i * 0.5) * 40}
              stroke="#0d9488"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4 + i * 0.02, duration: 0.5 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 w-full">
        <div className="flex-1">
          {/* Heading */}
          <h3 className="text-xl lg:text-2xl font-serif text-slate-900 mb-3">
            Earn{" "}
            <span className="inline-flex items-center px-3 py-1 bg-teal-500 text-white rounded-md font-semibold text-lg">
              $10,000
            </span>
            {" "}for Referring a Founder!
          </h3>

          <p className="text-slate-500 text-sm max-w-md leading-relaxed">
            Do you know an inspiring entrepreneur or founder who could benefit from our program? If so, refer them to us, and you could earn a generous $10,000 reward!
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex-shrink-0"
        >
          <Button 
            variant="outline"
            className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-full px-5 h-10 font-medium group transition-all duration-200"
          >
            Learn How To Qualify
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
