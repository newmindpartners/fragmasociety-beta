import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignatureDealCardProps {
  id: string;
  category: string;
  subcategory: string;
  leaderName: string;
  leaderRole: string;
  title: string;
  description: string;
  image: string;
  minTicket: string;
  targetReturn: string;
  term: string;
  risk: "Low" | "Medium" | "High";
  comingSoon?: boolean;
  onSeeDeal: () => void;
}

export const SignatureDealCard = ({
  category,
  leaderName,
  leaderRole,
  title,
  description,
  image,
  minTicket,
  targetReturn,
  term,
  risk,
  comingSoon = false,
  onSeeDeal,
}: SignatureDealCardProps) => {
  const riskStyles = {
    Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    High: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <motion.article
      className="group relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative h-full rounded-sm overflow-hidden border border-slate-700/30 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 transition-all duration-700">
        
        {/* Editorial Image Section - Dark navy base */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900">
          {/* Dark navy solid background behind image */}
          <div className="absolute inset-0 bg-slate-900" />
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          
          {/* Dark navy gradient overlay - only at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          {/* Subtle studio lighting - very light */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700/10 via-transparent to-transparent" />
          
          {/* Top badges */}
          <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
            <span className="px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] bg-white/95 text-slate-800 rounded-sm backdrop-blur-sm">
              {category}
            </span>
            {comingSoon && (
              <span className="px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] bg-slate-900/90 text-white rounded-sm backdrop-blur-sm">
                Coming Soon
              </span>
            )}
          </div>

          {/* Leader info - studio lighting on text */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-xs text-slate-400 uppercase tracking-[0.2em] mb-2 font-light">
                {leaderRole}
              </p>
              {/* Name with studio spotlight glow effect */}
              <h3 
                className="text-2xl md:text-3xl font-light text-white leading-tight tracking-tight relative"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  textShadow: "0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(139,92,246,0.1)"
                }}
              >
                {leaderName}
              </h3>
              {/* Subtle glow beneath name */}
              <div className="absolute bottom-4 left-0 right-0 h-16 bg-gradient-to-t from-violet-500/5 to-transparent blur-xl pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Content Section - Dark Navy */}
        <div className="p-6 lg:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
          {/* Title */}
          <h4 className="text-lg font-medium text-white mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h4>
          
          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">
            {description}
          </p>

          {/* Stats - refined grid */}
          <div className="grid grid-cols-4 gap-3 mb-6 py-5 border-y border-slate-700/50">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Entry</p>
              <p className="text-sm font-medium text-white">{minTicket}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Target</p>
              <p className="text-sm font-medium text-white">{targetReturn}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Duration</p>
              <p className="text-sm font-medium text-white">{term}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Risk</p>
              <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-sm border ${riskStyles[risk]}`}>
                {risk}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            variant="outline"
            className="w-full group/btn border-white/30 text-white hover:bg-white hover:text-slate-900 rounded-sm h-12 text-sm font-medium tracking-wide transition-all duration-300"
            onClick={onSeeDeal}
          >
            Explore Opportunity
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Subtle hover accent */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-slate-400 to-violet-500 origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.article>
  );
};
