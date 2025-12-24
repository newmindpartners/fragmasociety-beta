import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TotalInvestedCard } from "@/components/wallet/TotalInvestedCard";
import { RecentPayouts } from "@/components/wallet/RecentPayouts";
import { WalletPortfolio } from "@/components/wallet/WalletPortfolio";

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

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      <DashboardSidebar isCollapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />

      <div
        className="flex min-h-screen flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-out"
        style={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
      >
        <DashboardHeader onMenuToggle={handleToggleSidebar} />

        <main className="flex-1 min-w-0 bg-background px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
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

              {/* Portfolio Table */}
              <WalletPortfolio />
            </motion.div>
          </div>
        </main>

        <footer className="mt-auto border-t border-border/60 bg-card px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2024 Fragma Finance. All rights reserved.
            </p>
            <nav className="flex items-center gap-8">
              <a href="#" className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
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