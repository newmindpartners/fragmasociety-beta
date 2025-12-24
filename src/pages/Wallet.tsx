import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { WalletOnboarding } from "@/components/wallet/WalletOnboarding";
import { WalletDashboard } from "@/components/wallet/WalletDashboard";

const Wallet = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hasWallet, setHasWallet] = useState(false);

  // In a real app, this would check if the user has created a wallet
  useEffect(() => {
    const walletCreated = localStorage.getItem("fragma_wallet_created");
    setHasWallet(walletCreated === "true");
  }, []);

  const handleCreateWallet = () => {
    localStorage.setItem("fragma_wallet_created", "true");
    setHasWallet(true);
  };

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
              {hasWallet ? (
                <WalletDashboard />
              ) : (
                <WalletOnboarding onCreateWallet={handleCreateWallet} />
              )}
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

export default Wallet;
