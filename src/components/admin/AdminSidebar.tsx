import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  Shield,
  BarChart3,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import fragmaLogo from "@/assets/fragma-logo-v2.png";
import fragmaIcon from "@/assets/fragma-icon.png";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Early Access", href: "/admin/submissions" },
  { icon: Mail, label: "Newsletter", href: "/admin/newsletter" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: FileText, label: "Reports", href: "/admin/reports" },
];

const bottomNavItems: NavItem[] = [
  { icon: Shield, label: "Admin Users", href: "/admin/users" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  adminName?: string;
  adminEmail?: string;
}

export const AdminSidebar = ({ 
  isCollapsed, 
  onToggle, 
  adminName = "Admin",
  adminEmail = "admin@fragma.io"
}: AdminSidebarProps) => {
  const location = useLocation();

  const NavLink = ({ item, index }: { item: NavItem; index: number }) => {
    const isActive = location.pathname === item.href || 
      (item.href !== "/admin" && location.pathname.startsWith(item.href));
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
              ? "bg-violet-600/20 text-violet-400 border border-violet-500/30" 
              : "text-[hsl(var(--sidebar-muted))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
          )}
        >
          <Icon 
            className={cn(
              "w-[18px] h-[18px] flex-shrink-0 transition-all duration-300",
              isActive ? "text-violet-400" : "text-[hsl(var(--sidebar-muted))] group-hover:text-[hsl(var(--sidebar-foreground))]",
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
              className="ml-auto bg-violet-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
            >
              {item.badge}
            </motion.span>
          )}

          {item.badge && isCollapsed && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-violet-500 rounded-full" />
          )}
        </Link>
      </motion.div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
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
        <Link to="/admin" className="flex items-center gap-3 relative h-7">
          <AnimatePresence mode="wait">
            {isCollapsed ? (
              <motion.div 
                key="icon"
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <img 
                  src={fragmaIcon} 
                  alt="Fragma Admin" 
                  className="h-7 w-7 object-contain"
                />
                <Shield className="absolute -bottom-1 -right-1 w-3 h-3 text-violet-400" />
              </motion.div>
            ) : (
              <motion.div 
                key="logo"
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <img 
                  src={fragmaLogo} 
                  alt="Fragma Admin" 
                  className="h-7 w-auto"
                />
                <span className="text-[10px] font-bold text-violet-400 bg-violet-500/20 px-1.5 py-0.5 rounded">
                  ADMIN
                </span>
              </motion.div>
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

      {/* Admin Profile Section */}
      <div className="p-3 border-t border-[hsl(var(--sidebar-border))]">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className={cn(
            "flex items-center gap-3 p-2.5 rounded-xl bg-violet-500/10 cursor-pointer group transition-all duration-300 border border-violet-500/20",
            isCollapsed && "justify-center p-2"
          )}
        >
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-white font-semibold",
              isCollapsed ? "w-8 h-8 text-xs" : "w-9 h-9 text-sm"
            )}>
              {adminName.charAt(0).toUpperCase()}
            </div>
            <Shield className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-violet-400" />
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-[hsl(var(--sidebar-foreground))] truncate">{adminName}</p>
                <p className="text-xs text-violet-400 truncate">{adminEmail}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isCollapsed && (
            <button 
              onClick={handleLogout}
              className="p-1.5 rounded-lg hover:bg-violet-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4 text-[hsl(var(--sidebar-muted))]/60 group-hover:text-[hsl(var(--sidebar-muted))] transition-colors flex-shrink-0" strokeWidth={1.5} />
            </button>
          )}
        </motion.div>
      </div>
    </motion.aside>
  );
};
