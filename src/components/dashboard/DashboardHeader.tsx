import { motion } from "framer-motion";
import { Search, Wallet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
      {/* Connect Wallet Banner */}
      <motion.div 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2.5 px-6"
      >
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium">
            Connect Your Wallet — Step Into RWA Swaps
          </span>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-white rounded-full h-8 px-4 text-xs font-semibold group"
          >
            <Wallet className="w-3.5 h-3.5 mr-2" />
            Connect Wallet
            <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </motion.div>

      {/* Main Header */}
      <div className="px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 max-w-xl"
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search investments, documents..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center gap-6"
          >
            {["Start Investing", "Businesses", "How It Works", "Learning Center"].map((item) => (
              <Link 
                key={item} 
                to="#" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </motion.nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
              Invest Now
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
