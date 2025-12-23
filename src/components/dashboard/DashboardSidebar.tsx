import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
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
  LucideIcon,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import fragmaLogo from "@/assets/fragma-logo-new.png";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "My Portfolio", href: "/dashboard" },
  { icon: Heart, label: "Watchlist", href: "/dashboard/watchlist" },
  { icon: Building2, label: "Banking", href: "/dashboard/banking" },
  { icon: FileText, label: "Documents", href: "/dashboard/documents" },
  { icon: Wallet, label: "Wallet", href: "/dashboard/wallet" },
  { icon: BarChart3, label: "Secondary Market", href: "/dashboard/market" },
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

  const NavLink = ({ item, index }: { item: NavItem; index: number }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

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
            isActive 
              ? "bg-slate-800 text-white shadow-lg shadow-slate-900/20" 
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          )}
        >
          <Icon 
            className={cn(
              "w-[18px] h-[18px] flex-shrink-0 transition-all duration-300",
              isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700",
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
                className="font-medium text-sm whitespace-nowrap overflow-hidden"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
          
          {item.badge && !isCollapsed && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto bg-slate-800 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
            >
              {item.badge}
            </motion.span>
          )}

          {item.badge && isCollapsed && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full" />
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
      className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200/80 flex flex-col z-40 shadow-sm"
    >
      {/* Logo Section */}
      <div className={cn(
        "p-4 border-b border-slate-100 flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={fragmaLogo} 
            alt="Fragma" 
            className={cn(
              "transition-all duration-300",
              isCollapsed ? "h-7 w-7 object-contain" : "h-7 w-auto"
            )} 
          />
        </Link>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          className={cn(
            "p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition-all duration-200",
            isCollapsed && "absolute -right-3 top-5 bg-white shadow-md"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
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
        <div className="my-4 border-t border-slate-100" />

        {/* Bottom Navigation */}
        <div className="space-y-0.5">
          {bottomNavItems.map((item, index) => (
            <NavLink key={item.href} item={item} index={index + mainNavItems.length} />
          ))}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-3 border-t border-slate-100">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className={cn(
            "flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 cursor-pointer group transition-all duration-300 border border-slate-100",
            isCollapsed && "justify-center p-2"
          )}
        >
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold",
              isCollapsed ? "w-8 h-8 text-xs" : "w-9 h-9 text-sm"
            )}>
              IN
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-slate-800 truncate">Investor</p>
                <p className="text-xs text-slate-400 truncate">investor@fragma.io</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isCollapsed && (
            <LogOut className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0" strokeWidth={1.5} />
          )}
        </motion.div>
      </div>
    </motion.aside>
  );
};
