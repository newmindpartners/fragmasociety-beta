import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { InvestmentOverview } from "@/components/dashboard/InvestmentOverview";
import { ReferralBanner } from "@/components/dashboard/ReferralBanner";
import { OpenTransactions } from "@/components/dashboard/OpenTransactions";
import { MyInvestments } from "@/components/dashboard/MyInvestments";


const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar - Fixed */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Wrapper - Flex child that takes remaining space */}
      <div
        className="flex min-h-screen flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-out"
        style={{
          marginLeft: sidebarCollapsed ? 72 : 256,
        }}
      >
        {/* Header */}
        <DashboardHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* Page Content */}
        <main className="flex-1 min-w-0 bg-background px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1400px]">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-serif text-foreground">
                Welcome back, <span className="font-semibold">Investor</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Here's an overview of your portfolio and recent activity.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="mb-6">
              <DashboardStats />
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
              {/* Left Column - Investment Overview (1 col) */}
              <div className="lg:col-span-1">
                <InvestmentOverview />
              </div>

              {/* Right Column - My Investments (2 cols) */}
              <div className="lg:col-span-2 h-full">
                <MyInvestments />
              </div>
            </div>

            {/* Lower Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
              {/* Open Transactions - Takes 1 column */}
              <div className="lg:col-span-1">
                <OpenTransactions />
              </div>

              {/* Referral Banner - Takes 2 columns */}
              <div className="lg:col-span-2 self-start">
                <ReferralBanner />
              </div>
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
              <a
                href="#"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
