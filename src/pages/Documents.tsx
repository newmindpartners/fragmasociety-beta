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
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "ml-[72px]" : "ml-[256px]"
      )}>
        <DashboardHeader />
        
        <main className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-slate-900">Documents</h1>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setActiveTab("statements")}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  activeTab === "statements"
                    ? "bg-[hsl(var(--primary))] text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                )}
              >
                Statements
              </button>
              <button
                onClick={() => setActiveTab("tax")}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  activeTab === "tax"
                    ? "bg-[hsl(var(--primary))] text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
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
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-slate-200 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2025 Fragma. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/faq" className="hover:text-slate-900 transition-colors">Help</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Documents;
