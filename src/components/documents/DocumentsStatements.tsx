import { motion } from "framer-motion";
import { FileText, Download, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data - replace with real data from API
const statements = [
  {
    id: "1",
    title: "Trade Statement",
    date: "March 18, 2025",
    type: "pdf",
  },
  {
    id: "2",
    title: "Trade Statement",
    date: "March 18, 2025",
    type: "pdf",
  },
  {
    id: "3",
    title: "Trade Statement",
    date: "March 18, 2025",
    type: "pdf",
  },
];

// Set to true to show empty state, false to show documents list
const isEmpty = false;

export const DocumentsStatements = () => {
  const handleDownload = (id: string) => {
    console.log("Download statement:", id);
    // Implement download logic here
  };

  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 p-12"
      >
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
            <FolderOpen className="w-7 h-7 text-slate-400" />
          </div>
          
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Statements Yet
          </h3>
          
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Your monthly trade statements will appear here once available.
            Start trading today to generate your first statement!
          </p>
          
          <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 rounded-full px-6">
            <Link to="/live-deals">Start Trading Now</Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
    >
      <div className="divide-y divide-slate-100">
        {statements.map((statement, index) => (
          <motion.div
            key={statement.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-900">
                  {statement.title}
                </h4>
                <p className="text-xs text-slate-500">
                  Generated on {statement.date}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => handleDownload(statement.id)}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[hsl(var(--primary))] hover:text-white flex items-center justify-center transition-all duration-200 group"
            >
              <Download className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
