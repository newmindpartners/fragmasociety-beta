import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

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
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`faq-category-${categoryId}`);
    if (element) {
      const offset = 100; // Account for any fixed headers
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
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
          
          {/* Scrollable container */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 sm:gap-2.5 pb-2 min-w-max sm:min-w-0 sm:flex-wrap">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};
