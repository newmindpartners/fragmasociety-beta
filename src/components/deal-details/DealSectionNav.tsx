import { useState, useEffect, useRef } from "react";
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
  const navRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (placeholderRef.current) {
        const rect = placeholderRef.current.getBoundingClientRect();
        // Account for the main navbar height (64px / top-16)
        setIsSticky(rect.top <= 64);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const availableSections = sections.filter(s => s.available);

  return (
    <>
      {/* Invisible placeholder that stays in document flow */}
      <div ref={placeholderRef} className="h-[72px] bg-white" />
      
      {/* Actual navigation - always positioned, changes between relative and fixed */}
      <div 
        ref={navRef}
        className={cn(
          "w-full z-40 bg-white transition-shadow duration-300",
          isSticky 
            ? "fixed top-16 left-0 right-0 shadow-md shadow-slate-900/5 border-b border-slate-100" 
            : "absolute left-0 right-0 border-b border-slate-100"
        )}
        style={!isSticky ? { marginTop: '-72px' } : undefined}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center gap-1 md:gap-2 lg:gap-8 overflow-x-auto scrollbar-hide">
            {availableSections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  "relative px-3 md:px-5 lg:px-6 py-6 text-[13px] md:text-sm font-medium whitespace-nowrap transition-all duration-200 tracking-wide",
                  activeSection === section.id
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-700"
                )}
              >
                {section.label}
                {activeSection === section.id && (
                  <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-violet-500 to-violet-400 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
