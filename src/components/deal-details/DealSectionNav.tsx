import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
  available: boolean;
}

interface DealSectionNavProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const DealSectionNav = ({ sections, activeSection, onSectionChange }: DealSectionNavProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const availableSections = sections.filter(s => s.available);

  return (
    <div 
      className={cn(
        "w-full z-40 transition-all duration-300 border-b border-slate-800",
        isSticky 
          ? "fixed top-16 left-0 right-0 bg-slate-950/95 backdrop-blur-md shadow-lg shadow-slate-950/50" 
          : "relative bg-slate-950"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300",
                activeSection === section.id
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              {section.label}
              {activeSection === section.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
