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
    <div className="min-h-screen bg-slate-50/50 flex">
      <DashboardSidebar isCollapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />

      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
      >
        <DashboardHeader />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-8"
          >
            {/* Total Invested Card - Full Width */}
            <TotalInvestedCard
              totalInvested={4250}
              totalEarnings={312.40}
              earningsPercent={7.3}
              nextPayoutDays={5}
              nextPayoutAmount={23.50}
              inProgress={89.10}
              upcomingThisMonth={78.10}
            />

            {/* Recent Payouts */}
            <RecentPayouts onViewAll={() => console.log("View all earnings")} />

            {/* Portfolio Table */}
            <WalletPortfolio />
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-white/50 backdrop-blur-sm py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2025 Fragma. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-700 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors">
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Earnings;