import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Wallet, ArrowRight, Menu, ChevronDown, Zap, ShoppingCart, HelpCircle, Crown, Briefcase, Rocket, Coins, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MenuItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isRoute?: boolean;
  badge?: string;
}

interface NavSection {
  label: string;
  items: MenuItem[];
}

const navSections: NavSection[] = [
  {
    label: "Investors",
    items: [
      { label: "Live Deals", href: "/live-deals", description: "Browse current investment opportunities", icon: Zap, isRoute: true, badge: "Hot" },
      { label: "Buy & Sell", href: "/marketplace", description: "Secondary marketplace for trading", icon: ShoppingCart, isRoute: true },
      { label: "How It Works", href: "/how-it-works", description: "Understand the investment process", icon: HelpCircle, isRoute: true },
      { label: "Investor Membership", href: "/membership", description: "Exclusive benefits for members", icon: Crown, isRoute: true },
      { label: "Fragma One", href: "/strategy", description: "One click for broad RWA exposure", icon: Briefcase, isRoute: true, badge: "New" },
    ],
  },
  {
    label: "Businesses",
    items: [
      { label: "Launch Your Signature Deal", href: "/signature-deal", description: "Create and launch your investment opportunity", icon: Rocket, isRoute: true },
      { label: "Tokenize & List Your Asset", href: "/tokenize", description: "Transform assets into tradeable tokens", icon: Coins, isRoute: true },
    ],
  },
  {
    label: "Learn",
    items: [
      { label: "Community Center", href: "/#partners", description: "Connect with fellow investors", icon: Users },
      { label: "Documentation", href: "/#features", description: "Guides and resources", icon: FileText },
      { label: "FAQ", href: "/faq", description: "Frequently asked questions", icon: HelpCircle, isRoute: true },
    ],
  },
];

const DropdownMenu = ({ section, isOpen, onClose }: { section: NavSection; isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
          onMouseLeave={onClose}
        >
          <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden min-w-[280px]">
            <div className="p-2">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-all duration-200 cursor-pointer"
                  >
                    {Icon && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-all duration-200">
                        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                            item.badge === "Hot" 
                              ? "bg-orange-500/20 text-orange-500" 
                              : "bg-primary/20 text-primary"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );

                return item.isRoute ? (
                  <Link key={item.label} to={item.href} onClick={onClose}>
                    {content}
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} onClick={onClose}>
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NavDropdown = ({ section }: { section: NavSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group">
        <span>{section.label}</span>
        <ChevronDown 
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>
      <DropdownMenu section={section} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

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
        className="bg-primary text-white py-2.5 px-6"
      >
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium opacity-90">
            Connect Your Wallet — Step Into RWA Swaps
          </span>
          <Button 
            size="sm" 
            variant="secondary"
            className="rounded-full h-7 px-4 text-xs font-medium group bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Wallet className="w-3 h-3 mr-1.5" />
            Connect Wallet
            <ArrowRight className="w-3 h-3 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </motion.div>

      {/* Main Header */}
      <div className="px-6 py-3 bg-card">
        <div className="flex items-center justify-between gap-6">
          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 max-w-md"
          >
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200 text-foreground"
              />
            </div>
          </motion.div>

          {/* Navigation Links with Dropdowns */}
          <motion.nav 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center gap-1"
          >
            {navSections.map((section) => (
              <NavDropdown key={section.label} section={section} />
            ))}
          </motion.nav>
        </div>
      </div>
    </header>
  );
};
