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
        "w-full z-40 transition-all duration-300",
        isSticky 
          ? "fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50 border-b border-slate-200" 
          : "relative bg-white border-b border-slate-200"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-center gap-2 lg:gap-4 overflow-x-auto scrollbar-hide">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "relative px-4 lg:px-6 py-5 text-sm font-medium whitespace-nowrap transition-all duration-300",
                activeSection === section.id
                  ? "text-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              {section.label}
              {activeSection === section.id && (
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-violet-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
