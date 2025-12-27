import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Heart, 
  Building2, 
  FileText, 
  Wallet,
  TrendingUp,
  BarChart3, 
  Bell, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LucideIcon,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import fragmaLogo from "@/assets/fragma-logo-new.png";
import fragmaIcon from "@/assets/fragma-icon.png";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
  children?: NavItem[];
}

const mainNavItems: NavItem[] = [
  { 
    icon: Briefcase, 
    label: "My Portfolio", 
    href: "/dashboard",
    children: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    ]
  },
  { icon: Heart, label: "Watchlist", href: "/dashboard/watchlist" },
  { icon: Building2, label: "Banking", href: "/dashboard/banking" },
  { icon: FileText, label: "Documents", href: "/dashboard/documents" },
  { icon: Wallet, label: "Wallet", href: "/dashboard/wallet" },
  { icon: TrendingUp, label: "Earnings", href: "/dashboard/earnings" },
  { icon: BarChart3, label: "Market", href: "/dashboard/market" },
];

const bottomNavItems: NavItem[] = [
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications", badge: 3 },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help Center", href: "/faq" },
];

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const DashboardSidebar = ({ isCollapsed, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["My Portfolio"]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const NavLink = ({ item, index, isChild = false }: { item: NavItem; index: number; isChild?: boolean }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);

    if (hasChildren) {
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + index * 0.03 }}
        >
          <button
            onClick={() => toggleExpanded(item.label)}
            className={cn(
              "w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 relative overflow-hidden",
              isCollapsed ? "justify-center" : "",
              "text-[hsl(var(--sidebar-muted))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
            )}
          >
            <Icon 
              className="w-[18px] h-[18px] flex-shrink-0 transition-all duration-300 text-[hsl(var(--sidebar-muted))] group-hover:text-[hsl(var(--sidebar-foreground))]"
              strokeWidth={1.75} 
            />
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium text-sm whitespace-nowrap overflow-hidden flex-1 text-left"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {!isCollapsed && (
              <ChevronDown 
                className={cn(
                  "w-4 h-4 transition-transform duration-200 text-[hsl(var(--sidebar-muted))]",
                  isExpanded && "rotate-180"
                )} 
              />
            )}
          </button>

          {/* Children */}
          <AnimatePresence>
            {isExpanded && !isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4 mt-1 space-y-0.5 border-l border-[hsl(var(--sidebar-border))] pl-3"
              >
                {item.children!.map((child, childIndex) => (
                  <NavLink key={child.href} item={child} index={childIndex} isChild />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 + index * 0.03 }}
      >
        <Link
          to={item.href}
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 relative overflow-hidden",
            isCollapsed ? "justify-center" : "",
            isChild ? "py-2" : "",
            isActive 
              ? "bg-white/10 text-white border border-white/20" 
              : "text-[hsl(var(--sidebar-muted))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
          )}
        >
          <Icon 
            className={cn(
              "flex-shrink-0 transition-all duration-300",
              isChild ? "w-4 h-4" : "w-[18px] h-[18px]",
              isActive ? "text-white" : "text-[hsl(var(--sidebar-muted))] group-hover:text-[hsl(var(--sidebar-foreground))]",
              !isCollapsed && "group-hover:scale-105"
            )} 
            strokeWidth={1.75} 
          />
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className={cn(
                  "font-medium whitespace-nowrap overflow-hidden",
                  isChild ? "text-xs" : "text-sm"
                )}
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
          
          {item.badge && !isCollapsed && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto bg-[hsl(var(--sidebar-primary))] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
            >
              {item.badge}
            </motion.span>
          )}

          {item.badge && isCollapsed && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Link>
      </motion.div>
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
        <Link to="/" className="flex items-center gap-3 relative h-7">
          <AnimatePresence mode="wait">
            {isCollapsed ? (
              <motion.img 
                key="icon"
                src={fragmaIcon} 
                alt="Fragma" 
                className="h-7 w-7 object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            ) : (
              <motion.img 
                key="logo"
                src={fragmaLogo} 
                alt="Fragma" 
                className="h-7 w-auto brightness-0 invert"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </Link>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          className={cn(
            "p-2 rounded-lg bg-[hsl(var(--sidebar-accent))] hover:bg-[hsl(var(--sidebar-accent))]/80 border border-[hsl(var(--sidebar-border))] transition-all duration-200",
            isCollapsed && "absolute -right-3 top-5 bg-[hsl(var(--sidebar-background))] shadow-md"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--sidebar-muted))]" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 text-[hsl(var(--sidebar-muted))]" />
          )}
        </motion.button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
        <div className="space-y-0.5">
          {mainNavItems.map((item, index) => (
            <NavLink key={item.href} item={item} index={index} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-[hsl(var(--sidebar-border))]" />

        {/* Bottom Navigation */}
        <div className="space-y-0.5">
          {bottomNavItems.map((item, index) => (
            <NavLink key={item.href} item={item} index={index + mainNavItems.length} />
          ))}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-3 border-t border-[hsl(var(--sidebar-border))]">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className={cn(
            "flex items-center gap-3 p-2.5 rounded-xl bg-[hsl(var(--sidebar-accent))]/50 cursor-pointer group transition-all duration-300 border border-[hsl(var(--sidebar-border))]",
            isCollapsed && "justify-center p-2"
          )}
        >
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full bg-gradient-to-br from-[hsl(var(--sidebar-primary))] to-[hsl(var(--sidebar-primary))]/70 flex items-center justify-center text-white font-semibold",
              isCollapsed ? "w-8 h-8 text-xs" : "w-9 h-9 text-sm"
            )}>
              IN
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[hsl(var(--sidebar-background))]" />
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-[hsl(var(--sidebar-foreground))] truncate">Investor</p>
                <p className="text-xs text-[hsl(var(--sidebar-muted))] truncate">investor@fragma.io</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isCollapsed && (
            <LogOut className="w-4 h-4 text-[hsl(var(--sidebar-muted))]/60 group-hover:text-[hsl(var(--sidebar-muted))] transition-colors flex-shrink-0" strokeWidth={1.5} />
          )}
        </motion.div>
      </div>
    </motion.aside>
  );
};
