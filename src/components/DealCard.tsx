import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface DealCardProps {
  name: string;
  role: string;
  title: string;
  tags: string[];
  price: string;
  gradientClass: string;
  initials: string;
}

export const DealCard = ({ name, role, title, tags, price, gradientClass, initials }: DealCardProps) => (
  <motion.div 
    whileHover={{ y: -10, boxShadow: "0 10px 30px -10px hsl(172 83% 50% / 0.2)" }}
    className="bg-card rounded-2xl overflow-hidden border border-foreground/5 group"
  >
    <div className={`h-48 ${gradientClass} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500" />
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl font-serif font-bold text-foreground/20 group-hover:text-foreground/40 transition-colors">
          {initials}
        </span>
      </div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-foreground font-bold text-xl">{name}</h3>
        <p className="text-sm text-foreground/70">{role}</p>
      </div>
    </div>
    <div className="p-6">
      <h4 className="text-foreground font-medium mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-wide px-2 py-1 bg-foreground/5 text-muted-foreground rounded border border-foreground/10">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-foreground/5">
        <span className="text-primary font-mono">From €{price}</span>
        <ArrowRight size={16} className="text-foreground group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
);
