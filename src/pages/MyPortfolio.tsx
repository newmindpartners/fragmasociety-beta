import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioAssetAllocation } from "@/components/portfolio/PortfolioAssetAllocation";
import { PortfolioPerformance } from "@/components/portfolio/PortfolioPerformance";
import { PortfolioHoldings } from "@/components/portfolio/PortfolioHoldings";
import { PortfolioActivity } from "@/components/portfolio/PortfolioActivity";
import { PortfolioInsights } from "@/components/portfolio/PortfolioInsights";

const MyPortfolio = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div
        className="flex min-h-screen flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-out"
        style={{
          marginLeft: sidebarCollapsed ? 72 : 256,
        }}
      >
        <DashboardHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main className="flex-1 min-w-0 bg-background px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1400px]">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Live Portfolio</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground tracking-tight">
                My Portfolio
              </h1>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Track your investments, monitor performance, and manage your wealth in one place.
              </p>
            </motion.div>

            {/* Hero Section - Total Value & Quick Stats */}
            <div className="mb-8">
              <PortfolioHero />
            </div>

            {/* Two Column Layout - Performance & Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <PortfolioPerformance />
              </div>
              <div className="lg:col-span-1">
                <PortfolioAssetAllocation />
              </div>
            </div>

            {/* Holdings Section */}
            <div className="mb-8">
              <PortfolioHoldings />
            </div>

            {/* Bottom Row - Activity & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PortfolioActivity />
              <PortfolioInsights />
            </div>
          </div>
        </main>

        {/* Footer */}
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

export default MyPortfolio;
