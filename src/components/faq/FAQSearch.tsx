import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FAQSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalResults: number;
}

export const FAQSearch = ({ searchQuery, setSearchQuery, totalResults }: FAQSearchProps) => {
  return (
    <section className="relative py-6 sm:py-8 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Search Container */}
          <div className="relative group">
            {/* Glow effect on focus */}
            <div className="absolute -inset-2 bg-turquoise/10 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-lg shadow-slate-100/50 overflow-hidden">
              <div className="relative flex items-center">
                <div className="absolute left-4 sm:left-5 flex items-center justify-center">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                </div>
                
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 sm:pl-14 pr-12 sm:pr-14 py-4 sm:py-5 h-12 sm:h-16 text-sm sm:text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-900 placeholder:text-slate-400"
                />
                
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 sm:right-5 p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Search Results Count */}
          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 sm:mt-6 text-center"
              >
                {totalResults === 0 ? (
                  <span className="text-sm sm:text-base text-slate-500">No results found for "{searchQuery}"</span>
                ) : (
                  <span className="text-sm sm:text-base text-slate-600">
                    Found <span className="font-semibold text-turquoise">{totalResults}</span> 
                    {totalResults === 1 ? " result" : " results"} for "{searchQuery}"
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
