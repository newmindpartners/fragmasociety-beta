import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DocumentsStatements } from "@/components/documents/DocumentsStatements";
import { DocumentsTaxDocuments } from "@/components/documents/DocumentsTaxDocuments";
import { cn } from "@/lib/utils";

type TabType = "statements" | "tax";

const Documents = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("statements");

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar - Fixed */}
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main Content Wrapper */}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Page Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-serif text-foreground">Documents</h1>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-8">
                <button
                  onClick={() => setActiveTab("statements")}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                    activeTab === "statements"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-muted-foreground hover:bg-muted border border-border"
                  )}
                >
                  Statements
                </button>
                <button
                  onClick={() => setActiveTab("tax")}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                    activeTab === "tax"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-muted-foreground hover:bg-muted border border-border"
                  )}
                >
                  Tax Documents
                </button>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "statements" ? (
                  <DocumentsStatements />
                ) : (
                  <DocumentsTaxDocuments />
                )}
              </motion.div>
            </motion.div>
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

export default Documents;
