import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TotalInvestedCard } from "@/components/wallet/TotalInvestedCard";
import { RecentPayouts } from "@/components/wallet/RecentPayouts";
import { PortfolioEarningsSelector } from "@/components/wallet/PortfolioEarningsSelector";
import { EarningsNotificationBanner } from "@/components/wallet/EarningsNotificationBanner";
import { toast } from "sonner";

const Earnings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) setSidebarCollapsed(JSON.parse(saved));
  }, []);

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(!prev));
      return !prev;
    });
  };

  const handleViewEarnings = (notification: { dealName: string; amount: number }) => {
    toast.success(`Viewing earnings for ${notification.dealName}`);
    // Scroll to portfolio section or open deal details
    const portfolioSection = document.querySelector('[data-portfolio-section]');
    portfolioSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReinvest = (notification: { dealName: string; amount: number }) => {
    toast.success(`Reinvesting €${notification.amount.toFixed(2)} from ${notification.dealName}`, {
      description: "Redirecting to investment options...",
    });
  };

  const handleDismissNotification = (id: string) => {
    console.log("Dismissed notification:", id);
  };

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      <DashboardSidebar isCollapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />

      <div
        className="flex min-h-screen flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-out"
        style={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
      >
        <DashboardHeader onMenuToggle={handleToggleSidebar} />

        <main className="flex-1 min-w-0 bg-slate-50 px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Earnings Notification Banner */}
              <EarningsNotificationBanner
                onViewEarnings={handleViewEarnings}
                onReinvest={handleReinvest}
                onDismiss={handleDismissNotification}
              />

              {/* Total Invested Card */}
              <div className="max-w-2xl">
                <TotalInvestedCard
                  totalInvested={4250}
                  totalEarnings={312.40}
                  earningsPercent={7.3}
                  nextPayoutDays={5}
                  nextPayoutAmount={23.50}
                  inProgress={89.10}
                  upcomingThisMonth={78.10}
                />
              </div>

              {/* Recent Payouts */}
              <RecentPayouts onViewAll={() => console.log("View all earnings")} />

              {/* Portfolio Earnings Selector */}
              <div data-portfolio-section>
                <PortfolioEarningsSelector />
              </div>
            </motion.div>
          </div>
        </main>

        <footer className="mt-auto border-t border-slate-200 bg-white px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-slate-500">
              © 2024 Fragma Finance. All rights reserved.
            </p>
            <nav className="flex items-center gap-8">
              <a href="#" className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-900">
                Privacy Policy
              </a>
              <a href="#" className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-900">
                Terms of Service
              </a>
              <a href="#" className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-900">
                Contact
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Earnings;
