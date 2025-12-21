import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  const activeButtonRef = useRef<HTMLButtonElement>(null);

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

  // Scroll active button into view
  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeButtonRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      
      if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
        button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSection]);

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
      <div ref={placeholderRef} className="h-[48px] bg-white" />
      
      {/* Navigation */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "w-full z-40 bg-white/95 backdrop-blur-md transition-all duration-300",
          isSticky 
            ? "fixed top-16 left-0 right-0 shadow-lg shadow-slate-900/5 border-b border-slate-200/60" 
            : "absolute left-0 right-0 border-b border-slate-100"
        )}
        style={!isSticky ? { marginTop: '-48px' } : undefined}
      >
        <div className="relative">
          {/* Left fade & arrow */}
          <div 
            className={cn(
              "absolute left-0 top-0 bottom-0 z-10 flex items-center transition-opacity duration-300",
              showLeftFade ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none" />
            <button 
              onClick={() => scrollTo("left")}
              className="relative ml-1 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 shadow-sm border border-slate-200/60 text-slate-500 hover:text-violet-600 hover:border-violet-200 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Right fade & arrow */}
          <div 
            className={cn(
              "absolute right-0 top-0 bottom-0 z-10 flex items-center transition-opacity duration-300",
              showRightFade ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none" />
            <button 
              onClick={() => scrollTo("right")}
              className="relative mr-1 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 shadow-sm border border-slate-200/60 text-slate-500 hover:text-violet-600 hover:border-violet-200 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex items-center justify-start lg:justify-center gap-0.5 overflow-x-auto px-10 lg:px-4 scroll-smooth"
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
                ref={activeSection === section.id ? activeButtonRef : null}
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  "relative px-3 lg:px-3.5 py-3 text-[12px] font-medium whitespace-nowrap transition-all duration-200 tracking-wide flex-shrink-0 rounded-lg",
                  activeSection === section.id
                    ? "text-violet-700 bg-violet-50"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                )}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-violet-500 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            {/* Separator */}
            <div className="w-px h-5 bg-slate-200 mx-1.5 flex-shrink-0" />
            
            {/* FAQ Anchor Link */}
            <button
              onClick={() => {
                const faqElement = document.getElementById('section-faq');
                if (faqElement) {
                  faqElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="relative px-3 lg:px-3.5 py-3 text-[12px] font-medium whitespace-nowrap transition-all duration-200 tracking-wide flex-shrink-0 rounded-lg text-slate-500 hover:text-violet-600 hover:bg-violet-50"
            >
              FAQ
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};