import { motion, useMotionValue, animate } from "framer-motion";
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Category {
  id: string;
  icon: LucideIcon;
  title: string;
  faqs: { question: string; answer: string }[];
}

interface FAQQuickJumpProps {
  categories: Category[];
}

export const FAQQuickJump = ({ categories }: FAQQuickJumpProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const dragX = useMotionValue(0);
  
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`faq-category-${categoryId}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scrollBy = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (scrollContainerRef.current) {
      const velocity = info.velocity.x;
      const offset = info.offset.x;
      
      // Apply momentum scrolling
      const scrollAmount = -(offset + velocity * 0.3);
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
    
    animate(dragX, 0, { type: "spring", stiffness: 400, damping: 30 });
  };

  return (
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="py-4"
        >
          {/* Mobile label */}
          <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider mb-3 px-1">
            Jump to category
          </p>
          
          {/* Swipeable container with arrows */}
          <div className="relative">
            {/* Left arrow - hidden on mobile, shown on tablet+ */}
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scrollBy('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md items-center justify-center hidden sm:flex hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </motion.button>
            )}
            
            {/* Scrollable container with drag */}
            <motion.div
              ref={scrollContainerRef}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
              className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 cursor-grab active:cursor-grabbing touch-pan-x"
            >
              <div className="flex gap-2 sm:gap-2.5 pb-2 min-w-max sm:min-w-0 sm:flex-wrap select-none">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 + 0.3 }}
                      onClick={() => scrollToCategory(category.id)}
                      className="group flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-full hover:border-turquoise/50 hover:bg-turquoise/5 transition-all duration-300 shadow-sm hover:shadow-md flex-shrink-0"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 group-hover:bg-turquoise/20 flex items-center justify-center transition-colors">
                        <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500 group-hover:text-turquoise transition-colors" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                        {category.title}
                      </span>
                      <span className="text-[10px] text-slate-400 group-hover:text-turquoise transition-colors">
                        ({category.faqs.length})
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
            
            {/* Right arrow - hidden on mobile, shown on tablet+ */}
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scrollBy('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md items-center justify-center hidden sm:flex hover:bg-slate-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
