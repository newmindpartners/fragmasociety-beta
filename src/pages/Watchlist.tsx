import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { WatchlistContent } from "@/components/watchlist/WatchlistContent";

const Watchlist = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className="flex min-h-screen flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-out"
        style={{
          marginLeft: sidebarCollapsed ? 72 : 256,
        }}
      >
        <DashboardHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main className="flex-1 min-w-0 bg-background px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WatchlistContent />
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

export default Watchlist;