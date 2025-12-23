import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { InvestmentOverview } from "@/components/dashboard/InvestmentOverview";
import { ReferralBanner } from "@/components/dashboard/ReferralBanner";
import { OpenTransactions } from "@/components/dashboard/OpenTransactions";
import { MyInvestments } from "@/components/dashboard/MyInvestments";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <motion.div 
        className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-out"
        animate={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
      >
        {/* Header */}
        <DashboardHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 bg-slate-50">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-serif text-slate-900">
              Welcome back, <span className="font-semibold">Investor</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Here's an overview of your portfolio and recent activity.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="mb-6">
            <DashboardStats />
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            {/* Left Column - Investment Overview */}
            <div className="lg:col-span-1">
              <InvestmentOverview />
            </div>

            {/* Right Column - Referral Banner */}
            <div className="lg:col-span-2">
              <ReferralBanner />
            </div>
          </div>

          {/* Lower Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Open Transactions - Takes 2 columns */}
            <div className="lg:col-span-2">
              <OpenTransactions />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-5">
              <MyInvestments />
              <QuickActions />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 lg:px-8 py-5 border-t border-slate-200 bg-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>© 2024 Fragma Finance. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default Dashboard;
