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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-serif font-light text-slate-900">
              Welcome back, <span className="font-semibold">Investor</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Here's an overview of your portfolio and recent activity.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="mb-8">
            <DashboardStats />
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Open Transactions - Takes 2 columns */}
            <div className="lg:col-span-2">
              <OpenTransactions />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              <MyInvestments />
              <QuickActions />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-slate-200/60 bg-white/50">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <p>© 2024 Fragma Finance. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
