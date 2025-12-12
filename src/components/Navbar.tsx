import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Zap, ShoppingCart, HelpCircle, Crown, Briefcase, Rocket, Coins, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
      { label: "Live Deals", href: "/#marketplace", description: "Browse current investment opportunities", icon: Zap, badge: "Hot" },
      { label: "Buy & Sell", href: "/#marketplace", description: "Secondary marketplace for trading", icon: ShoppingCart },
      { label: "How It Works", href: "/#features", description: "Understand the investment process", icon: HelpCircle },
      { label: "Investor Membership", href: "/membership", description: "Exclusive benefits for members", icon: Crown, isRoute: true },
      { label: "Fragma One", href: "/strategy", description: "Invest with us", icon: Briefcase, isRoute: true, badge: "New" },
    ],
  },
  {
    label: "Businesses",
    items: [
      { label: "Launch Your Signature Deal", href: "/#work-with-us", description: "Create and launch your investment opportunity", icon: Rocket },
      { label: "Tokenize & List Your Asset", href: "/#work-with-us", description: "Transform assets into tradeable tokens", icon: Coins },
    ],
  },
  {
    label: "Learn",
    items: [
      { label: "Community Center", href: "/#partners", description: "Connect with fellow investors", icon: Users },
      { label: "Documentation", href: "/#features", description: "Guides, FAQs and resources", icon: FileText },
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
          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
          onMouseLeave={onClose}
        >
          <div className="bg-background/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/20 overflow-hidden min-w-[320px]">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            
            <div className="relative p-2">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
                  >
                    {Icon && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                            item.badge === "Hot" 
                              ? "bg-orange-500/20 text-orange-400" 
                              : "bg-primary/20 text-primary"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 group-hover:text-muted-foreground/80 transition-colors">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 mt-1" />
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
      <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group">
        <span>{section.label}</span>
        <ChevronDown 
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
        <span className={`absolute bottom-1 left-4 right-4 h-px bg-primary transition-transform duration-300 origin-left ${isOpen ? "scale-x-100" : "scale-x-0"}`} />
      </button>
      <DropdownMenu section={section} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/5" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.img 
              src="/fragma-society-logo.png" 
              alt="Fragma Society" 
              className="h-7 lg:h-8 transition-transform duration-300 group-hover:scale-105"
              whileHover={{ opacity: 0.9 }}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {navSections.map((section) => (
              <NavDropdown key={section.label} section={section} />
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/strategy">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-foreground hover:bg-white/5"
                  >
                    Investor Portal
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="border-white/10 hover:border-white/20 hover:bg-white/5"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-foreground hover:bg-white/5 font-medium"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      Get Started
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="lg:hidden text-foreground p-2 -mr-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl overflow-hidden border-b border-white/[0.08]"
          >
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {navSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.05 }}
                  className="mb-4"
                >
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.label ? null : section.label)}
                    className="flex items-center justify-between w-full py-3 text-sm font-semibold text-foreground uppercase tracking-wider"
                  >
                    {section.label}
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        expandedSection === section.label ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {expandedSection === section.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-2 border-l border-white/[0.08]">
                          {section.items.map((item) => {
                            const Icon = item.icon;
                            const content = (
                              <div className="flex items-center gap-3 py-3 pl-4 text-muted-foreground hover:text-foreground transition-colors">
                                {Icon && <Icon className="w-4 h-4 text-primary/70" />}
                                <span className="text-sm">{item.label}</span>
                                {item.badge && (
                                  <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                                    item.badge === "Hot" 
                                      ? "bg-orange-500/20 text-orange-400" 
                                      : "bg-primary/20 text-primary"
                                  }`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            );

                            return item.isRoute ? (
                              <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)}>
                                {content}
                              </Link>
                            ) : (
                              <a key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                                {content}
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              
              <motion.div 
                className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/[0.08]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {user ? (
                  <>
                    <Link to="/strategy" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-white/10">
                        Investor Portal
                      </Button>
                    </Link>
                    <Button onClick={() => { signOut(); setIsOpen(false); }} variant="ghost">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-white/10 hover:border-white/20">
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90 font-semibold group">
                        <span className="flex items-center justify-center gap-2">
                          Get Started
                          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
