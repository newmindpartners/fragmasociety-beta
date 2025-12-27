import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Shield, Wallet, BookOpen, Zap, Scale, Users, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface Category {
  id: string;
  icon: React.ElementType;
  title: string;
  faqs: FAQ[];
}

interface FAQCategoriesProps {
  categories: Category[];
  searchQuery: string;
}

// Helper component to highlight search terms
const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-turquoise/20 text-slate-900 rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export const FAQCategories = ({ categories, searchQuery }: FAQCategoriesProps) => {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 bg-slate-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(30,41,59,1) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <AnimatePresence mode="wait">
          {categories.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto"
            >
              {/* Category Grid - single column on mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {categories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.08, duration: 0.5 }}
                    className="group"
                  >
                    <div className="h-full bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300/80 transition-all duration-500 overflow-hidden">
                      {/* Category Header */}
                      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <motion.div
                            whileHover={{ scale: 1.05, rotate: 3 }}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-turquoise/10 border border-turquoise/20 flex items-center justify-center flex-shrink-0"
                          >
                            <category.icon className="w-4 h-4 sm:w-5 sm:h-5 text-turquoise" />
                          </motion.div>
                          <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">{category.title}</h3>
                            {searchQuery && (
                              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                                {category.faqs.length} {category.faqs.length === 1 ? "result" : "results"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* FAQ Accordion */}
                      <div className="p-3 sm:p-4">
                        <Accordion 
                          type="single" 
                          collapsible 
                          className="space-y-1.5 sm:space-y-2"
                          defaultValue={searchQuery ? `${category.id}-0` : undefined}
                        >
                          {category.faqs.map((faq, faqIndex) => (
                            <AccordionItem
                              key={faqIndex}
                              value={`${category.id}-${faqIndex}`}
                              className="border border-slate-100 rounded-lg sm:rounded-xl px-3 sm:px-4 bg-white hover:bg-slate-50/50 data-[state=open]:bg-slate-50 data-[state=open]:border-turquoise/20 transition-all duration-300"
                            >
                              <AccordionTrigger className="text-left text-xs sm:text-sm font-medium text-slate-700 hover:no-underline hover:text-turquoise transition-colors py-3 sm:py-4 [&[data-state=open]]:text-turquoise">
                                <HighlightText text={faq.question} highlight={searchQuery} />
                              </AccordionTrigger>
                              <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed pb-3 sm:pb-4 pr-2 sm:pr-4">
                                <HighlightText text={faq.answer} highlight={searchQuery} />
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12 sm:py-20"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">No results found</h3>
              <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto px-4">
                We couldn't find any questions matching your search. Try using different keywords.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
