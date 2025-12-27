import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Zap, ArrowLeftRight, HelpCircle, Crown, Briefcase, Rocket, Coins, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import fragmaLogo from "@/assets/fragma-logo-new.png";

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
      { label: "Trade", href: "/marketplace", description: "Secondary marketplace for trading", icon: ArrowLeftRight, isRoute: true, badge: "Coming Soon" },
      { label: "How It Works", href: "/how-it-works", description: "Understand the investment process", icon: HelpCircle, isRoute: true },
      { label: "Investor Membership", href: "/membership", description: "Exclusive benefits for members", icon: Crown, isRoute: true },
    ],
  },
  {
    label: "Businesses",
    items: [
      { label: "Launch Your Signature Deal", href: "/signature-deal", description: "Create and launch your investment opportunity", icon: Rocket, isRoute: true },
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
          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
          onMouseLeave={onClose}
        >
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-2xl border border-slate-700/50 rounded-xl shadow-2xl shadow-black/40 overflow-hidden min-w-[320px]">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
            
            <div className="relative p-2">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group flex items-start gap-4 p-4 rounded-lg hover:bg-slate-800/60 transition-all duration-300 cursor-pointer"
                  >
                    {Icon && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center group-hover:bg-slate-700 group-hover:border-violet-500/30 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-5 h-5 text-slate-400 group-hover:text-violet-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors duration-300">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                            item.badge === "Hot" 
                              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                              : item.badge === "Coming Soon"
                              ? "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                              : "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-slate-500 mt-0.5 group-hover:text-slate-400 transition-colors">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-violet-400 transition-all duration-300 mt-1" />
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
            
            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
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
      <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300 group">
        <span>{section.label}</span>
        <ChevronDown 
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
        <span className={`absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-violet-500/50 to-slate-400/50 transition-transform duration-300 origin-left ${isOpen ? "scale-x-100" : "scale-x-0"}`} />
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
          ? "bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-2xl border-b border-slate-700/50 shadow-lg shadow-black/20" 
          : "bg-slate-900/80 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none border-b border-slate-700/30 lg:border-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.img 
              src={fragmaLogo} 
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
                    className="text-slate-400 hover:text-white hover:bg-slate-800/50"
                  >
                    Investor Portal
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50 hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <a href="#request-access">
                <Button 
                  size="sm" 
                  className="bg-white hover:bg-slate-100 text-slate-900 font-semibold px-5 group relative overflow-hidden shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Register Your Interest
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </Button>
              </a>
            )}
          </div>

          {/* Mobile Menu Button - Always visible with solid background */}
          <motion.button 
            className="lg:hidden text-white p-3 -mr-2 bg-slate-800/90 hover:bg-slate-700 active:bg-slate-600 rounded-xl transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center border border-slate-700/50 shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <X size={24} strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Menu size={24} strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Slide from right with improved UX */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 top-16 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Slide-in menu panel */}
            <motion.div 
              initial={{ x: "100%", opacity: 0.5 }} 
              animate={{ x: 0, opacity: 1 }} 
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ 
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8
              }}
              className="lg:hidden fixed top-16 right-0 bottom-0 w-[85%] max-w-[360px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 backdrop-blur-2xl overflow-hidden border-l border-slate-700/50 shadow-2xl shadow-black/50 z-50"
            >
              <div className="h-full flex flex-col">
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto overscroll-contain py-4 px-5">
                  {navSections.map((section, sectionIndex) => (
                    <motion.div
                      key={section.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sectionIndex * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-2"
                    >
                      {/* Section header - larger tap target */}
                      <button
                        onClick={() => setExpandedSection(expandedSection === section.label ? null : section.label)}
                        className="flex items-center justify-between w-full py-4 px-3 text-sm font-semibold text-white uppercase tracking-wider rounded-xl hover:bg-slate-800/40 active:bg-slate-700/50 transition-colors min-h-[56px]"
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                            expandedSection === section.label ? 'bg-violet-500' : 'bg-slate-600'
                          }`} />
                          {section.label}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedSection === section.label ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        </motion.div>
                      </button>
                      
                      {/* Expandable section items */}
                      <AnimatePresence>
                        {expandedSection === section.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 border-l-2 border-slate-700/50">
                              {section.items.map((item, itemIndex) => {
                                const Icon = item.icon;
                                const content = (
                                  <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: itemIndex * 0.05, duration: 0.3 }}
                                    className="flex items-center gap-4 py-4 px-4 ml-2 text-slate-300 hover:text-white active:text-white hover:bg-slate-800/40 active:bg-slate-700/50 rounded-xl transition-all min-h-[56px] group"
                                  >
                                    {Icon && (
                                      <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-700 group-hover:border-violet-500/30 transition-all">
                                        <Icon className="w-5 h-5 text-slate-400 group-hover:text-violet-400 transition-colors" />
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-medium">{item.label}</span>
                                        {item.badge && (
                                          <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                                            item.badge === "Hot" 
                                              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                                              : item.badge === "Coming Soon"
                                              ? "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                                              : "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                          }`}>
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      {item.description && (
                                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                                      )}
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                  </motion.div>
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
                </div>
                
                {/* Fixed bottom CTA section */}
                <motion.div 
                  className="flex-shrink-0 p-5 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <Link to="/strategy" onClick={() => setIsOpen(false)} className="w-full">
                        <Button 
                          variant="outline" 
                          className="w-full h-14 border-slate-600 text-slate-200 hover:border-slate-500 hover:bg-slate-800/50 text-base font-medium"
                        >
                          Investor Portal
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => { signOut(); setIsOpen(false); }} 
                        variant="ghost" 
                        className="w-full h-12 text-slate-400 hover:text-white hover:bg-slate-800/50"
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <a href="#request-access" onClick={() => setIsOpen(false)} className="block">
                      <Button className="w-full h-14 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-semibold text-base group shadow-lg shadow-white/10">
                        <span className="flex items-center justify-center gap-2">
                          Register Your Interest
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Button>
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
