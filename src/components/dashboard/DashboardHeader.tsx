import { motion } from "framer-motion";
import { Search, Wallet, ArrowRight, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onMenuToggle?: () => void;
}

export const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-xl border-b border-border">
      {/* Connect Wallet Banner */}
      <motion.div 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-primary text-primary-foreground py-2.5 px-6"
      >
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium opacity-90">
            Connect Your Wallet — Step Into RWA Swaps
          </span>
          <Button 
            size="sm" 
            variant="secondary"
            className="rounded-full h-7 px-4 text-xs font-medium group"
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
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground/70" />
          </button>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 max-w-md"
          >
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 group-focus-within:text-foreground/70 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all duration-200 text-foreground"
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
            {["Start Investing", "Businesses", "How It Works", "Learning Center"].map((item) => (
              <Link 
                key={item} 
                to="#" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
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
            <Button className="rounded-full px-5 h-9 text-sm font-medium transition-all duration-200">
              Invest Now
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
