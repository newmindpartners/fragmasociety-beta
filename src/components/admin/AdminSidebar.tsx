import { useState } from "react";
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
  ChevronDown,
  LucideIcon,
  Shield,
  BarChart3,
  FileText,
  Scale,
  Globe,
  UserCheck,
  Bot,
  ClipboardList,
  Briefcase,
  Building2,
  PieChart,
  FolderOpen,
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

interface NavCategory {
  icon: LucideIcon;
  label: string;
  items: NavItem[];
}

const mainNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Early Access", href: "/admin/submissions" },
  { icon: Mail, label: "Newsletter", href: "/admin/newsletter" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: FileText, label: "Reports", href: "/admin/reports" },
];

const dealsCategory: NavCategory = {
  icon: Briefcase,
  label: "Deals",
  items: [
    { icon: FolderOpen, label: "All Deals", href: "/admin/deals" },
    { icon: Building2, label: "Issuers", href: "/admin/deals/issuers" },
    { icon: PieChart, label: "Cap Tables", href: "/admin/deals/cap-tables" },
  ],
};

const complianceCategory: NavCategory = {
  icon: Scale,
  label: "Compliance",
  items: [
    { icon: LayoutDashboard, label: "Overview", href: "/admin/compliance" },
    { icon: UserCheck, label: "Investors", href: "/admin/compliance/investors" },
    { icon: Briefcase, label: "Deal Compliance", href: "/admin/compliance/deals" },
    { icon: Globe, label: "Jurisdictions", href: "/admin/compliance/jurisdictions" },
    { icon: ClipboardList, label: "Audit Log", href: "/admin/compliance/audit" },
    { icon: Bot, label: "AI Assistant", href: "/admin/compliance/ai-assistant" },
  ],
};

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
  adminEmail = "hi@fragmasociety.com"
}: AdminSidebarProps) => {
  const location = useLocation();
  const [dealsOpen, setDealsOpen] = useState(() => 
    location.pathname.startsWith('/admin/deals')
  );
  const [complianceOpen, setComplianceOpen] = useState(() => 
    location.pathname.startsWith('/admin/compliance')
  );

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
              ? "bg-white/10 text-white border border-white/20" 
              : "text-[hsl(var(--sidebar-muted))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
          )}
        >
          <Icon 
            className={cn(
              "w-[18px] h-[18px] flex-shrink-0 transition-all duration-300",
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
              <motion.img 
                key="icon"
                src={fragmaIcon} 
                alt="Fragma Admin" 
                className="h-7 w-7 object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
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
                <span className="text-[10px] font-bold text-[hsl(var(--sidebar-primary))] bg-[hsl(var(--sidebar-primary))]/20 px-1.5 py-0.5 rounded">
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

        {/* Deals Category */}
        <div className="my-4 border-t border-[hsl(var(--sidebar-border))]" />
        
        {/* Deals Collapsible Header */}
        <motion.button
          onClick={() => !isCollapsed && setDealsOpen(!dealsOpen)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
            isCollapsed ? "justify-center" : "",
            location.pathname.startsWith('/admin/deals')
              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
              : "text-[hsl(var(--sidebar-muted))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
          )}
        >
          <Briefcase 
            className={cn(
              "w-[18px] h-[18px] flex-shrink-0 transition-all duration-300",
              location.pathname.startsWith('/admin/deals') 
                ? "text-blue-400" 
                : "text-[hsl(var(--sidebar-muted))] group-hover:text-[hsl(var(--sidebar-foreground))]"
            )} 
            strokeWidth={1.75} 
          />
          
          <AnimatePresence>
            {!isCollapsed && (
              <>
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-semibold text-sm whitespace-nowrap overflow-hidden flex-1 text-left"
                >
                  Deals
                </motion.span>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: dealsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-[hsl(var(--sidebar-muted))]" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Deals Submenu */}
        <AnimatePresence>
          {(dealsOpen || isCollapsed) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "overflow-hidden",
                !isCollapsed && "ml-3 pl-3 border-l border-blue-500/20"
              )}
            >
              <div className="space-y-0.5 pt-1">
                {dealsCategory.items.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link
                        to={item.href}
                        className={cn(
                          "group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
                          isCollapsed ? "justify-center" : "",
                          isActive 
                            ? "bg-blue-500/20 text-blue-300" 
                            : "text-[hsl(var(--sidebar-muted))] hover:bg-[hsl(var(--sidebar-accent))]/50 hover:text-[hsl(var(--sidebar-foreground))]"
                        )}
                      >
                        <Icon 
                          className={cn(
                            "w-4 h-4 flex-shrink-0",
                            isActive ? "text-blue-400" : "text-[hsl(var(--sidebar-muted))]"
                          )} 
                          strokeWidth={1.75} 
                        />
                        
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="whitespace-nowrap"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compliance Category */}
        <div className="my-4 border-t border-[hsl(var(--sidebar-border))]" />
        
        {/* Compliance Collapsible Header */}
        <motion.button
          onClick={() => !isCollapsed && setComplianceOpen(!complianceOpen)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
            isCollapsed ? "justify-center" : "",
            location.pathname.startsWith('/admin/compliance')
              ? "bg-violet-600/20 text-violet-400 border border-violet-500/30"
              : "text-[hsl(var(--sidebar-muted))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
          )}
        >
          <Scale 
            className={cn(
              "w-[18px] h-[18px] flex-shrink-0 transition-all duration-300",
              location.pathname.startsWith('/admin/compliance') 
                ? "text-violet-400" 
                : "text-[hsl(var(--sidebar-muted))] group-hover:text-[hsl(var(--sidebar-foreground))]"
            )} 
            strokeWidth={1.75} 
          />
          
          <AnimatePresence>
            {!isCollapsed && (
              <>
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-semibold text-sm whitespace-nowrap overflow-hidden flex-1 text-left"
                >
                  Compliance
                </motion.span>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: complianceOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-[hsl(var(--sidebar-muted))]" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Compliance Submenu */}
        <AnimatePresence>
          {(complianceOpen || isCollapsed) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "overflow-hidden",
                !isCollapsed && "ml-3 pl-3 border-l border-violet-500/20"
              )}
            >
              <div className="space-y-0.5 pt-1">
                {complianceCategory.items.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link
                        to={item.href}
                        className={cn(
                          "group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
                          isCollapsed ? "justify-center" : "",
                          isActive 
                            ? "bg-violet-500/20 text-violet-300" 
                            : "text-[hsl(var(--sidebar-muted))] hover:bg-[hsl(var(--sidebar-accent))]/50 hover:text-[hsl(var(--sidebar-foreground))]"
                        )}
                      >
                        <Icon 
                          className={cn(
                            "w-4 h-4 flex-shrink-0",
                            isActive ? "text-violet-400" : "text-[hsl(var(--sidebar-muted))]"
                          )} 
                          strokeWidth={1.75} 
                        />
                        
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="whitespace-nowrap"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
            "flex items-center gap-3 p-2.5 rounded-xl bg-[hsl(var(--sidebar-accent))]/50 cursor-pointer group transition-all duration-300 border border-[hsl(var(--sidebar-border))]",
            isCollapsed && "justify-center p-2"
          )}
        >
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full bg-gradient-to-br from-[hsl(var(--sidebar-primary))] to-[hsl(var(--sidebar-primary))]/70 flex items-center justify-center text-white font-semibold",
              isCollapsed ? "w-8 h-8 text-xs" : "w-9 h-9 text-sm"
            )}>
              {adminName.charAt(0).toUpperCase()}
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
                <p className="text-sm font-semibold text-[hsl(var(--sidebar-foreground))] truncate">{adminName}</p>
                <p className="text-xs text-[hsl(var(--sidebar-muted))] truncate">{adminEmail}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isCollapsed && (
            <button 
              onClick={handleLogout}
              className="p-1.5 rounded-lg hover:bg-[hsl(var(--sidebar-accent))] transition-colors"
            >
              <LogOut className="w-4 h-4 text-[hsl(var(--sidebar-muted))]/60 group-hover:text-[hsl(var(--sidebar-muted))] transition-colors flex-shrink-0" strokeWidth={1.5} />
            </button>
          )}
        </motion.div>
      </div>
    </motion.aside>
  );
};
