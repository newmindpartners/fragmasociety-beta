import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (placeholderRef.current) {
        const rect = placeholderRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 64);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check scroll position for fade indicators
  const updateScrollIndicators = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftFade(scrollLeft > 10);
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollIndicators();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollIndicators, { passive: true });
      window.addEventListener("resize", updateScrollIndicators);
      return () => {
        container.removeEventListener("scroll", updateScrollIndicators);
        window.removeEventListener("resize", updateScrollIndicators);
      };
    }
  }, []);

  const scrollTo = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const availableSections = sections.filter(s => s.available);

  return (
    <>
      {/* Placeholder */}
      <div ref={placeholderRef} className="h-[60px] bg-white" />
      
      {/* Navigation */}
      <div 
        className={cn(
          "w-full z-40 bg-white transition-shadow duration-300",
          isSticky 
            ? "fixed top-16 left-0 right-0 shadow-md shadow-slate-900/5 border-b border-slate-100" 
            : "absolute left-0 right-0 border-b border-slate-100"
        )}
        style={!isSticky ? { marginTop: '-60px' } : undefined}
      >
        <div className="relative">
          {/* Left fade & arrow - mobile only */}
          <div 
            className={cn(
              "absolute left-0 top-0 bottom-0 z-10 flex items-center transition-opacity duration-300 lg:hidden",
              showLeftFade ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
            <button 
              onClick={() => scrollTo("left")}
              className="relative ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Right fade & arrow - mobile only */}
          <div 
            className={cn(
              "absolute right-0 top-0 bottom-0 z-10 flex items-center transition-opacity duration-300 lg:hidden",
              showRightFade ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />
            <button 
              onClick={() => scrollTo("right")}
              className="relative mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex items-center lg:justify-center gap-1 md:gap-2 lg:gap-6 overflow-x-auto px-12 lg:px-6"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {availableSections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  "relative px-4 lg:px-5 py-5 text-[13px] font-medium whitespace-nowrap transition-all duration-200 tracking-wide flex-shrink-0",
                  activeSection === section.id
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-700"
                )}
              >
                {section.label}
                {activeSection === section.id && (
                  <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-violet-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
