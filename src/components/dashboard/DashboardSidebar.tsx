import { motion } from "framer-motion";
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
  LucideIcon
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

export const DashboardSidebar = () => {
  const location = useLocation();

  const NavLink = ({ item, index }: { item: NavItem; index: number }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 + index * 0.05 }}
      >
        <Link
          to={item.href}
          className={cn(
            "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
            isActive 
              ? "bg-primary/10 text-primary" 
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          {/* Active indicator */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          
          <Icon 
            className={cn(
              "w-5 h-5 transition-transform duration-300",
              isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600",
              "group-hover:scale-110"
            )} 
            strokeWidth={1.5} 
          />
          <span className="font-medium text-sm">{item.label}</span>
          
          {item.badge && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full"
            >
              {item.badge}
            </motion.span>
          )}
        </Link>
      </motion.div>
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200/80 flex flex-col z-40">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={fragmaLogo} alt="Fragma" className="h-8 w-auto" />
          <motion.div 
            whileHover={{ x: -4 }}
            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </motion.div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item, index) => (
            <NavLink key={item.href} item={item} index={index} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-slate-100" />

        {/* Bottom Navigation */}
        <div className="space-y-1">
          {bottomNavItems.map((item, index) => (
            <NavLink key={item.href} item={item} index={index + mainNavItems.length} />
          ))}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-100">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
              IN
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">Investor</p>
            <p className="text-xs text-slate-500 truncate">investor@fragma.io</p>
          </div>
          <LogOut className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" strokeWidth={1.5} />
        </motion.div>
      </div>
    </aside>
  );
};
