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
        className="bg-card rounded-2xl border border-border p-12"
      >
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
            <FolderOpen className="w-7 h-7 text-muted-foreground" />
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Statements Yet
          </h3>
          
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Your monthly trade statements will appear here once available.
            Start trading today to generate your first statement!
          </p>
          
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
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
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      <div className="divide-y divide-border">
        {statements.map((statement, index) => (
          <motion.div
            key={statement.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-5 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">
                  {statement.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  Generated on {statement.date}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => handleDownload(statement.id)}
              className="w-10 h-10 rounded-xl bg-muted hover:bg-primary flex items-center justify-center transition-all duration-200 group"
            >
              <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
