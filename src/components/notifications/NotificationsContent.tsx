import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Check, 
  CheckCheck, 
  TrendingUp, 
  Wallet, 
  FileText, 
  AlertCircle, 
  Gift, 
  Building2,
  ArrowUpRight,
  Settings2,
  Filter,
  Search,
  MoreHorizontal,
  Trash2,
  Archive,
  Eye,
  Clock,
  Sparkles
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NotificationPreferencesPanel } from "./NotificationPreferencesPanel";

type NotificationType = "investment" | "payout" | "document" | "alert" | "reward" | "system";
type NotificationFilter = "all" | "unread" | "investment" | "payout" | "document" | "alert";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: {
    amount?: string;
    asset?: string;
    change?: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "payout",
    title: "Quarterly Distribution Received",
    description: "Your Q4 2024 distribution from Malibu Luxury Villa Fund has been credited to your wallet.",
    timestamp: "2 hours ago",
    isRead: false,
    actionUrl: "/dashboard/wallet",
    actionLabel: "View Wallet",
    metadata: {
      amount: "$2,450.00",
      asset: "MLV"
    }
  },
  {
    id: "2",
    type: "investment",
    title: "Investment Confirmed",
    description: "Your investment of $10,000 in Naouri Malibu Villa Signature Deal has been confirmed.",
    timestamp: "5 hours ago",
    isRead: false,
    actionUrl: "/deal/naouri-malibu-villa",
    actionLabel: "View Deal",
    metadata: {
      amount: "$10,000",
      asset: "Naouri Signature Deal"
    }
  },
  {
    id: "3",
    type: "alert",
    title: "Price Alert Triggered",
    description: "MLV token price reached your target of $78.00. Current price: $78.52",
    timestamp: "Yesterday",
    isRead: false,
    actionUrl: "/dashboard/market",
    actionLabel: "Trade Now",
    metadata: {
      change: "+4.6%"
    }
  },
  {
    id: "4",
    type: "document",
    title: "New Tax Document Available",
    description: "Your 2024 Annual Tax Statement is ready for download.",
    timestamp: "2 days ago",
    isRead: true,
    actionUrl: "/dashboard/documents",
    actionLabel: "Download"
  },
  {
    id: "5",
    type: "reward",
    title: "Referral Bonus Earned!",
    description: "You earned €100 referral bonus! Your friend just made their first investment.",
    timestamp: "3 days ago",
    isRead: true,
    metadata: {
      amount: "€100"
    }
  },
  {
    id: "6",
    type: "system",
    title: "Security Update",
    description: "Two-factor authentication has been successfully enabled on your account.",
    timestamp: "1 week ago",
    isRead: true
  },
  {
    id: "7",
    type: "investment",
    title: "Order Partially Filled",
    description: "Your limit buy order for 5 MLV tokens at $74.50 has been partially filled (3/5 tokens).",
    timestamp: "1 week ago",
    isRead: true,
    actionUrl: "/dashboard/market",
    actionLabel: "View Order"
  },
  {
    id: "8",
    type: "payout",
    title: "Dividend Payment Scheduled",
    description: "Your next dividend payment of $890 is scheduled for January 15, 2025.",
    timestamp: "2 weeks ago",
    isRead: true,
    metadata: {
      amount: "$890"
    }
  }
];

const typeConfig: Record<NotificationType, { icon: React.ElementType; color: string; bgColor: string }> = {
  investment: { icon: Building2, color: "text-violet-600", bgColor: "bg-violet-100" },
  payout: { icon: Wallet, color: "text-emerald-600", bgColor: "bg-emerald-100" },
  document: { icon: FileText, color: "text-blue-600", bgColor: "bg-blue-100" },
  alert: { icon: AlertCircle, color: "text-amber-600", bgColor: "bg-amber-100" },
  reward: { icon: Gift, color: "text-pink-600", bgColor: "bg-pink-100" },
  system: { icon: Settings2, color: "text-slate-600", bgColor: "bg-slate-100" }
};

const filterOptions: { value: NotificationFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "investment", label: "Investments" },
  { value: "payout", label: "Payouts" },
  { value: "document", label: "Documents" },
  { value: "alert", label: "Alerts" }
];

export const NotificationsContent = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(n => {
    const matchesFilter = filter === "all" 
      ? true 
      : filter === "unread" 
        ? !n.isRead 
        : n.type === filter;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Bell className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-md"
                >
                  {unreadCount}
                </motion.div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notifications</h1>
              <p className="text-sm text-slate-500">
                {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setPreferencesOpen(true)}
            className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <Settings2 className="w-4 h-4" />
            Settings
          </Button>
        </div>

        {/* Preferences Panel */}
        <NotificationPreferencesPanel 
          open={preferencesOpen} 
          onOpenChange={setPreferencesOpen} 
        />
      </div>

      {/* Filters & Search Bar */}
      <Card className="p-4 border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {filterOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                  filter === option.value
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.label}
                {option.value === "unread" && unreadCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-red-500 text-white">
                    {unreadCount}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">No notifications</h3>
              <p className="text-sm text-slate-500">
                {filter === "all" ? "You're all caught up!" : `No ${filter} notifications found.`}
              </p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                index={index}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface NotificationCardProps {
  notification: Notification;
  index: number;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationCard = ({ notification, index, onMarkAsRead, onDelete }: NotificationCardProps) => {
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card 
        className={cn(
          "group relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:border-slate-300",
          notification.isRead 
            ? "bg-white border-slate-200" 
            : "bg-gradient-to-r from-violet-50/50 to-white border-violet-200/60"
        )}
      >
        {/* Unread indicator */}
        {!notification.isRead && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-purple-600" />
        )}

        <div className="p-4 lg:p-5 flex items-start gap-4">
          {/* Icon */}
          <motion.div 
            className={cn(
              "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
              config.bgColor
            )}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Icon className={cn("w-5 h-5", config.color)} strokeWidth={1.75} />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={cn(
                    "text-sm lg:text-base font-semibold truncate",
                    notification.isRead ? "text-slate-700" : "text-slate-900"
                  )}>
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <Badge className="bg-violet-500 text-white text-[10px] px-1.5 py-0 h-4">
                      New
                    </Badge>
                  )}
                </div>
                <p className={cn(
                  "text-sm leading-relaxed",
                  notification.isRead ? "text-slate-500" : "text-slate-600"
                )}>
                  {notification.description}
                </p>
                
                {/* Metadata */}
                {notification.metadata && (
                  <div className="flex items-center gap-3 mt-2">
                    {notification.metadata.amount && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-semibold">
                        {notification.metadata.amount}
                      </span>
                    )}
                    {notification.metadata.asset && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                        {notification.metadata.asset}
                      </span>
                    )}
                    {notification.metadata.change && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <TrendingUp className="w-3 h-3" />
                        {notification.metadata.change}
                      </span>
                    )}
                  </div>
                )}

                {/* Timestamp & Action */}
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {notification.timestamp}
                  </span>
                  {notification.actionUrl && notification.actionLabel && (
                    <a
                      href={notification.actionUrl}
                      className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors"
                    >
                      {notification.actionLabel}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="w-4 h-4 text-slate-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[160px]">
                  {!notification.isRead && (
                    <DropdownMenuItem onClick={() => onMarkAsRead(notification.id)}>
                      <Check className="w-4 h-4 mr-2" />
                      Mark as read
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onDelete(notification.id)}
                    className="!text-red-600 hover:!bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
