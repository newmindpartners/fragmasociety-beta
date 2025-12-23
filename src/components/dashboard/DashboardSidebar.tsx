import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Heart, 
  Building2, 
  FileText, 
  Wallet, 
  BarChart3, 
  Bell, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Zap,
  ShoppingCart,
  Crown,
  Briefcase,
  Rocket,
  Coins,
  Users,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import fragmaLogo from "@/assets/fragma-logo-new.png";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
}

interface NavSection {
  label: string;
  icon: LucideIcon;
  items: NavItem[];
}

// Dashboard specific items
const dashboardItems: NavItem[] = [
  { icon: LayoutDashboard, label: "My Portfolio", href: "/dashboard" },
  { icon: Heart, label: "Watchlist", href: "/dashboard/watchlist" },
  { icon: Building2, label: "Banking", href: "/dashboard/banking" },
  { icon: FileText, label: "Documents", href: "/dashboard/documents" },
  { icon: Wallet, label: "Wallet", href: "/dashboard/wallet" },
  { icon: BarChart3, label: "Secondary Market", href: "/dashboard/market" },
];

// Website menu structure
const navSections: NavSection[] = [
  {
    label: "Investors",
    icon: Users,
    items: [
      { icon: Zap, label: "Live Deals", href: "/live-deals", badge: "Hot" },
      { icon: ShoppingCart, label: "Buy & Sell", href: "/marketplace" },
      { icon: HelpCircle, label: "How It Works", href: "/how-it-works" },
      { icon: Crown, label: "Investor Membership", href: "/membership" },
      { icon: Briefcase, label: "Fragma One", href: "/strategy", badge: "New" },
    ],
  },
  {
    label: "Businesses",
    icon: Building2,
    items: [
      { icon: Rocket, label: "Launch Signature Deal", href: "/signature-deal" },
      { icon: Coins, label: "Tokenize Your Asset", href: "/tokenize" },
    ],
  },
  {
    label: "Learn",
    icon: HelpCircle,
    items: [
      { icon: Users, label: "Community Center", href: "/#partners" },
      { icon: FileText, label: "Documentation", href: "/#features" },
      { icon: HelpCircle, label: "FAQ", href: "/faq" },
    ],
  },
];

const bottomNavItems: NavItem[] = [
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const DashboardSidebar = ({ isCollapsed, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(["Investors"]);

  const toggleSection = (label: string) => {
    setExpandedSections(prev => 
      prev.includes(label) 
        ? prev.filter(s => s !== label)
        : [...prev, label]
    );
  };

  const NavLink = ({ item, index }: { item: NavItem; index: number }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 + index * 0.02 }}
      >
        <Link
          to={item.href}
          className={cn(
            "group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative",
            isCollapsed ? "justify-center" : "",
            isActive 
              ? "bg-white/10 text-white" 
              : "text-[hsl(var(--sidebar-muted))] hover:bg-white/5 hover:text-white"
          )}
        >
          <Icon 
            className={cn(
              "w-4 h-4 flex-shrink-0 transition-colors duration-200",
              isActive ? "text-white" : "text-[hsl(var(--sidebar-muted))] group-hover:text-white"
            )} 
            strokeWidth={1.75} 
          />
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm whitespace-nowrap overflow-hidden"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
          
          {item.badge && !isCollapsed && (
            <span className={cn(
              "ml-auto px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-full",
              item.badge === "Hot" 
                ? "bg-orange-500/20 text-orange-400" 
                : "bg-primary/20 text-primary"
            )}>
              {item.badge}
            </span>
          )}
        </Link>
      </motion.div>
    );
  };

  const SectionHeader = ({ section }: { section: NavSection }) => {
    const isExpanded = expandedSections.includes(section.label);
    const Icon = section.icon;

    return (
      <button
        onClick={() => !isCollapsed && toggleSection(section.label)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 text-[hsl(var(--sidebar-muted))] hover:text-white transition-colors duration-200",
          isCollapsed && "justify-center"
        )}
      >
        <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
        {!isCollapsed && (
          <>
            <span className="text-xs font-semibold uppercase tracking-wider flex-1 text-left">
              {section.label}
            </span>
            <ChevronDown 
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                isExpanded && "rotate-180"
              )} 
            />
          </>
        )}
      </button>
    );
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))] flex flex-col z-40"
    >
      {/* Logo Section */}
      <div className={cn(
        "p-4 border-b border-[hsl(var(--sidebar-border))] flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={fragmaLogo} 
            alt="Fragma" 
            className={cn(
              "transition-all duration-300 brightness-0 invert",
              isCollapsed ? "h-6 w-6 object-contain" : "h-6 w-auto"
            )} 
          />
        </Link>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          className={cn(
            "p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200",
            isCollapsed && "absolute -right-3 top-5 bg-[hsl(var(--sidebar-background))] border border-[hsl(var(--sidebar-border))] shadow-md"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-[hsl(var(--sidebar-muted))]" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-[hsl(var(--sidebar-muted))]" />
          )}
        </motion.button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {/* Dashboard Items */}
        <div className="space-y-0.5 mb-4">
          {!isCollapsed && (
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--sidebar-muted))]/60">
              Dashboard
            </p>
          )}
          {dashboardItems.map((item, index) => (
            <NavLink key={item.href} item={item} index={index} />
          ))}
        </div>

        <div className="border-t border-[hsl(var(--sidebar-border))] my-3" />

        {/* Website Navigation Sections */}
        {navSections.map((section) => (
          <div key={section.label} className="mb-2">
            <SectionHeader section={section} />
            <AnimatePresence>
              {(expandedSections.includes(section.label) || isCollapsed) && !isCollapsed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-3"
                >
                  {section.items.map((item, index) => (
                    <NavLink key={item.href} item={item} index={index} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="border-t border-[hsl(var(--sidebar-border))] my-3" />

        {/* Bottom Navigation */}
        <div className="space-y-0.5">
          {bottomNavItems.map((item, index) => (
            <NavLink key={item.href} item={item} index={index + dashboardItems.length} />
          ))}
        </div>
      </nav>

      {/* Connect Wallet Banner */}
      {!isCollapsed && (
        <div className="p-3 border-t border-[hsl(var(--sidebar-border))]">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-white">Connect Wallet</span>
            </div>
            <p className="text-[10px] text-[hsl(var(--sidebar-muted))] leading-relaxed mb-2">
              Link your wallet to access all features
            </p>
            <button className="w-full py-1.5 text-xs font-medium bg-primary hover:bg-primary/90 text-white rounded-md transition-colors">
              Connect
            </button>
          </div>
        </div>
      )}

      {/* User Profile Section */}
      <div className="p-3 border-t border-[hsl(var(--sidebar-border))]">
        <div 
          className={cn(
            "flex items-center gap-3 p-2 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-all duration-200",
            isCollapsed && "justify-center"
          )}
        >
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold",
              isCollapsed ? "w-7 h-7 text-[10px]" : "w-8 h-8 text-xs"
            )}>
              IN
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-[hsl(var(--sidebar-background))]" />
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-white truncate">Investor</p>
                <p className="text-[10px] text-[hsl(var(--sidebar-muted))] truncate">investor@fragma.io</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isCollapsed && (
            <LogOut className="w-4 h-4 text-[hsl(var(--sidebar-muted))]/60 hover:text-white transition-colors flex-shrink-0" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </motion.aside>
  );
};
