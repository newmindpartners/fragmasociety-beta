import { motion } from "framer-motion";
import { Search, Wallet, ArrowRight, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onMenuToggle?: () => void;
}

export const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-100">
      {/* Connect Wallet Banner */}
      <motion.div 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-900 text-white py-2.5 px-6"
      >
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium text-slate-300">
            Connect Your Wallet — Step Into RWA Swaps
          </span>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-full h-7 px-4 text-xs font-medium group border border-slate-500/30"
          >
            <Wallet className="w-3 h-3 mr-1.5" />
            Connect Wallet
            <ArrowRight className="w-3 h-3 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </motion.div>

      {/* Main Header */}
      <div className="px-6 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 max-w-md"
          >
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-slate-500 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-all duration-200"
              />
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center gap-8"
          >
            {["Start Investing", "Businesses", "How It Works", "Learning Center"].map((item, index) => (
              <Link 
                key={item} 
                to="#" 
                className="text-sm font-medium text-slate-400 hover:text-slate-800 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </motion.nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 h-9 text-sm font-medium transition-all duration-200">
              Invest Now
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
